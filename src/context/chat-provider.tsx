import React, { createContext, useState } from "react";
import { UsersObj } from "../types/chat";

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
  users: UsersObj;
  setUsers: React.Dispatch<React.SetStateAction<UsersObj>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}>({
  users: {},
  setUsers: () => {},
  user: null,
  setUser: () => {},
  messages: [],
  setMessages: () => {},
  page: 0,
  setPage: () => {},
});

export const ChatProvider = ({ children }: ChatContextProps) => {
  const [users, setUsers] = useState<UsersObj>({});
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState<number>(0);

  return <ChatContext.Provider value={{ users, setUsers, user, setUser, messages, setMessages, page, setPage }}>{children}</ChatContext.Provider>;
};

export default ChatContext;
