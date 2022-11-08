import "../components/chat/style.css";
import { useState, useEffect } from "react";
import { FriendsList, MessagingContainer, Header, MessagesList, MessageField } from "../components/chat";
import { useAuth, useChat, useRequestPrivate } from "../hooks";
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

const Chat = () => {
  const { auth } = useAuth();
  const { user, setUser, messages, setMessages, page, setPage } = useChat();
  const [users, setUsers] = useState<UsersList>({});
  const { doRequestPrivate: doGetFriends } = useRequestPrivate({ url: "/users/messages/friendsMessages", method: "get" });
  const { doRequestPrivate: doGetMessages } = useRequestPrivate({ url: `/messages/private/${user?.id}?page=${page}`, method: "get" });

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
  }, []);

  useEffect(() => {
    socket.on("messageToClient", (data) => {
      if (data.from === user?.id) setMessages([...messages, { mine: false, text: data.content, avatar: user?.thumbnail! }]);
    });
    return () => {
      socket.off("messageToClient");
    };
  }, [messages, setMessages, user?.id, user?.thumbnail]);

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
    setPage(0);
    getMessages();
  }, [user]);

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
      setMessages([...result, ...messages]);
    };

    getMessages();
  }, [page]);

  const onScrollTop = () => {
    setPage((prev) => ++prev);
  };

  return (
    <div className="flex">
      <FriendsList users={users} />
      <MessagingContainer>
        {!user ? (
          <></>
        ) : (
          <>
            <Header />
            <MessagesList onScrollTop={onScrollTop} />
            <MessageField />
          </>
        )}
      </MessagingContainer>
    </div>
  );
};

export default Chat;
