import MessagingContainer from "../components/chat/messaging-container";
import Header from "../components/chat/header";
import Messages from "../components/chat/Messages";
import MessageField from "../components/chat/message-field";
import "../components/chat/style.css";
import { useState } from "react";

const localUser: { fullName: string; description: string; image: string } = {
  fullName: "Anderson Aveyron",
  description: "Junior Developer",
  image:
    "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
};

const localMessage: { mine: boolean; text: string; avatar: string } = {
  mine: true,
  text: "Can be verified on any platform using docker",
  avatar:
    "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
};

const localMessages: { mine: boolean; text: string; avatar: string }[] = [
  {
    mine: false,
    text: "Can be verified on any platform using docker",
    avatar:
      "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
  },
  {
    mine: true,
    text: "Your error message says permission denied, npm global installs must be given root privileges.",
    avatar:
      "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
  },
  {
    mine: false,
    text: "Can be verified on any platform using docker",
    avatar:
      "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
  },
];

const Chat = () => {
  const [user, setUser] = useState(localUser);
  const [message, setMessage] = useState(localMessage);
  const [messages, setMessages] = useState(localMessages);

  const onSendMessage = () => {
    setMessages([...messages, message]);
  };

  return (
    <MessagingContainer>
      <Header user={user} />
      <Messages messages={messages} />
      <MessageField onSendMessage={onSendMessage} />
    </MessagingContainer>
  );
};

export default Chat;
