import "../components/chat/style.css";
import MessagingContainer from "../components/chat/messaging-container";
import Header from "../components/chat/header";
import MessagesList from "../components/chat/messages-list";
import MessageField from "../components/chat/message-field";
import { useState, useEffect } from "react";
import FriendsList from "../components/chat/friends-list";
import { friendsMessages } from "../components/chat/data";
import { useAuth, useRequestPrivate } from "../hooks";
import socket from "../services/socket";

interface UsersMessages {
  displayName: string;
  id: string;
  lastMessage: string;
  sender: string;
  status: boolean;
  thumbnail: string;
  updatedAt: Date;
  viewed: boolean;
}

const Chat = () => {
  const { auth } = useAuth();
  const [usersMessages, setUsersMessages] = useState<UsersMessages[]>([]);
  const [user, setUser] = useState<{ id: string; fullName: string; description: string; image: string; status: boolean } | null>(null);
  const [messages, setMessages] = useState(!user ? [] : friendsMessages[user.id]);
  const { doRequestPrivate } = useRequestPrivate({ url: "/users/messages/friendsMessages", method: "get" });

  useEffect(() => {
    const getUsersMessages = async () => {
      const { result } = await doRequestPrivate();
      setUsersMessages([...result]);
      console.log(result);
    };
    getUsersMessages();
    socket.on("messageToClient", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("messageToClient");
    };
  }, []);

  const onSendMessage = (message: { mine: boolean; text: string; avatar: string }) => {
    if (!user) return;
    setMessages([...messages, message]);
    socket.emit("messageToServer", { from: auth.user?.id, to: "6345b9b0997c36baae413430", type: "text", content: message.text });
    friendsMessages[user.id].push(message);
  };

  const onSelect = (user: { id: string; fullName: string; description: string; image: string; status: boolean }) => {
    setUser(user);
    setMessages(friendsMessages[user.id]);
  };

  return (
    <div className="flex">
      <FriendsList usersMessages={usersMessages} onSelect={onSelect} />
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
