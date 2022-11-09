import "../components/chat/style.css";
import { useEffect } from "react";
import { FriendsList, MessagingContainer, Header, MessagesList, MessageField } from "../components/chat";
import { useChat } from "../hooks";
import socket from "../services/socket";

const Chat = () => {
  const { user, messages, setMessages } = useChat();

  useEffect(() => {
    console.log("socket useEffect");

    socket.on("messageToClient", (data) => {
      if (data.from === user?.id) {
        setMessages([...messages, { mine: false, text: data.content, avatar: user?.thumbnail! }]);
      }
    });
    return () => {
      socket.off("messageToClient");
    };
  }, [messages, setMessages, user?.id, user?.thumbnail]);

  return (
    <div className="flex">
      <FriendsList />
      <MessagingContainer>
        {!user ? (
          <></>
        ) : (
          <>
            <Header />
            <MessagesList />
            <MessageField />
          </>
        )}
      </MessagingContainer>
    </div>
  );
};

export default Chat;
