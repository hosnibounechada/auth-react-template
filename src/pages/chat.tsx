import "../components/chat/style.css";
import { useEffect } from "react";
import { FriendsList, MessagingContainer, Header, MessagesList, MessageField } from "../components/chat";
import { useChat } from "../hooks";
import socket from "../services/socket";

const Chat = () => {
  const { user, messages, setMessages } = useChat();

  useEffect(() => {
    if (!user) return;
    console.log("socket useEffect");

    socket.on("messageToClient", (data) => {
      if (data.from === user?.id) {
        setMessages([...messages, { mine: false, text: data.content, avatar: user?.thumbnail! }]);
      }
    });
    return () => {
      socket.off("messageToClient");
    };
  }, [user]);

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
