import React, { createContext, useState } from "react";

type ChatContextProps = {
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
  thumbnail: string;
  status: boolean;
  lastMessage: string;
}

const ChatContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}>({
  user: null,
  setUser: () => {},
  messages: [],
  setMessages: () => {},
  page: 0,
  setPage: () => {},
});

export const MessagesProvider = ({ children }: ChatContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState<number>(0);

  return <ChatContext.Provider value={{ user, setUser, messages, setMessages, page, setPage }}>{children}</ChatContext.Provider>;
};

export default ChatContext;
