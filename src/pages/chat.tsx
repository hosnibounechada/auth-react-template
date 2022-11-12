import "../components/chat/style.css";
import { useEffect } from "react";
import { FriendsList, MessagingContainer, Header, MessagesList, MessageField } from "../components/chat";
import { useChat } from "../hooks";
import socket from "../services/socket";

const Chat = () => {
  const { user, setUser, users, setUsers, messages, setMessages } = useChat();

  useEffect(() => {
    if (!user) return;

    socket.on("statusNotification", (data) => {
      const temp = { [data.id]: { ...users[data.id], status: data.status } };
      setUsers({ ...users, ...temp });
      setUser({ ...user, status: data.status });
    });
    return () => {
      socket.off("statusNotification");
    };
  }, [setUser, setUsers, user, users]);

  useEffect(() => {
    if (!user) return;

    socket.on("messageToClient", (data) => {
      if (data.from === user?.id) {
        setMessages([...messages, { mine: false, text: data.content, avatar: user?.thumbnail! }]);

        const temp = { [user.id]: { ...users[user.id], lastMessage: data.content, time: data.createdAt, sender: user.id, viewed: true } };
        setUsers({ ...users, ...temp });
      } else {
        const temp = { [data.from]: { ...users[data.from], lastMessage: data.content, time: data.createdAt, sender: data.from, viewed: false } };
        setUsers({ ...users, ...temp });
      }
    });
    return () => {
      socket.off("messageToClient");
    };
  }, [user, messages, users, setMessages, setUsers]);

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
