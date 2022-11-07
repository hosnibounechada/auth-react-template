import React, { createContext, useState } from "react";

type MessagesContextProps = {
  children: React.ReactNode;
};

interface Message {
  mine: boolean;
  text: string;
  avatar: string;
}

interface User {
  id: string;
  displayName: string;
  lastMessage: string;
  thumbnail: string;
  status: boolean;
}

const MessagesContext = createContext<{
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}>({
  messages: [],
  setMessages: () => {},
});

export const MessagesProvider = ({ children }: MessagesContextProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  return <MessagesContext.Provider value={{ messages, setMessages }}>{children}</MessagesContext.Provider>;
};

export default MessagesContext;
