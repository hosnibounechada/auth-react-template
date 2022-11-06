import "../components/chat/style.css";
import MessagingContainer from "../components/chat/messaging-container";
import Header from "../components/chat/header";
import MessagesList from "../components/chat/messages-list";
import MessageField from "../components/chat/message-field";
import { useState, useEffect } from "react";
import FriendsList from "../components/chat/friends-list";
import { useAuth, useRequestPrivate } from "../hooks";
import socket from "../services/socket";

interface User {
  displayName: string;
  id: string;
  lastMessage: string;
  sender: string;
  status: boolean;
  thumbnail: string;
  updatedAt: Date;
  viewed: boolean;
}

interface UsersList {
  [id: string]: {
    id: string;
    sender: string;
    displayName: string;
    thumbnail: string;
    lastMessage: string;
    time: Date;
    viewed: boolean;
    status: boolean;
  };
}

interface Message {
  from: string;
  to: string;
  type: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

interface MessageProps {
  mine: boolean;
  text: string;
  avatar: string;
}

const Chat = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState<UsersList>({});
  const [user, setUser] = useState<{ id: string; displayName: string; lastMessage: string; thumbnail: string; status: boolean } | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const { doRequestPrivate: doGetFriends } = useRequestPrivate({ url: "/users/messages/friendsMessages", method: "get" });
  const { doRequestPrivate: doGetMessages } = useRequestPrivate({ url: `/messages/private/${user?.id}?page=0`, method: "get" });

  useEffect(() => {
    const getUsers = async () => {
      const { result } = await doGetFriends();
      const res = result.reduce((r: UsersList, e: User) => {
        r[e.id] = {
          id: e.id,
          sender: e.sender,
          displayName: e.displayName,
          thumbnail: e.thumbnail,
          lastMessage: e.lastMessage,
          time: e.updatedAt,
          viewed: e.viewed,
          status: e.status,
        };
        return r;
      }, {});
      setUsers({ ...res });
      if (result.length > 0) setUser(result[0]);
    };
    getUsers();

    socket.on("messageToClient", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("messageToClient");
    };
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      if (!user) return;
      const { messages: userMessages } = await doGetMessages();
      if (!userMessages) return;
      const reversedArray = userMessages.reverse();
      const result = reversedArray.map((message: Message) => {
        return {
          mine: message.from === auth.user?.id,
          text: message.content,
          avatar: user.thumbnail,
        };
      });
      setMessages([...result]);
    };

    getMessages();
  }, [user]);

  const onSendMessage = (message: { mine: boolean; text: string; avatar: string }) => {
    if (!user) return;
    socket.emit("messageToServer", { from: auth.user?.id, to: user.id, type: "text", content: message.text });
    setMessages([...messages, message]);
  };

  const onSelect = async (user: { id: string; displayName: string; lastMessage: string; thumbnail: string; status: boolean }) => {
    setUser(user);
  };

  return (
    <div className="flex">
      <FriendsList users={users} onSelect={onSelect} />
      <MessagingContainer>
        {!user ? (
          <></>
        ) : (
          <>
            <Header user={user} />
            <MessagesList messages={messages} />
            <MessageField user={user} onSendMessage={onSendMessage} />
          </>
        )}
      </MessagingContainer>
    </div>
  );
};

export default Chat;
