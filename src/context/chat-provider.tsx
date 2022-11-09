import React, { createContext, useState, useEffect } from "react";
import { useRequestPrivate } from "../hooks";

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

interface UserAPI {
  displayName: string;
  id: string;
  lastMessage: string;
  sender: string;
  status: boolean;
  thumbnail: string;
  updatedAt: Date;
  viewed: boolean;
}

interface UsersObj {
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

export const MessagesProvider = ({ children }: ChatContextProps) => {
  const [users, setUsers] = useState<UsersObj>({});
  const { doRequestPrivate: doGetFriends } = useRequestPrivate({ url: "/users/messages/friendsMessages", method: "get" });

  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState<number>(0);

  const getUsers = async () => {
    const { result } = await doGetFriends();
    const res = result.reduce((r: UsersObj, e: UserAPI) => {
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

  useEffect(() => {
    console.log("initial useEffect");
    getUsers();
  }, []);

  return <ChatContext.Provider value={{ users, setUsers, user, setUser, messages, setMessages, page, setPage }}>{children}</ChatContext.Provider>;
};

export default ChatContext;
