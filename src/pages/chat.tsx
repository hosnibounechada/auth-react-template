import "../components/chat/style.css";
import MessagingContainer from "../components/chat/messaging-container";
import Header from "../components/chat/header";
import MessagesList from "../components/chat/messages-list";
import MessageField from "../components/chat/message-field";
import { useState } from "react";
import FriendsList from "../components/chat/friends-list";
import { friendMessages } from "../components/chat/data";

const Chat = () => {
  const [user, setUser] = useState<{ id: string; fullName: string; description: string; image: string; status: boolean } | null>(null);
  const [messages, setMessages] = useState(!user ? [] : friendMessages[user.id]);

  const onSendMessage = (message: { mine: boolean; text: string; avatar: string }) => {
    if (!user) return;
    setMessages([...messages, message]);
    friendMessages[user.id].push(message);
  };

  const onSelect = (user: { id: string; fullName: string; description: string; image: string; status: boolean }) => {
    setUser(user);
    setMessages(friendMessages[user.id]);
  };

  return (
    <div className="flex">
      <FriendsList onSelect={onSelect} />
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
