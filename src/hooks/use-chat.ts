import { useContext } from "react";
import ChatContext from "../context/chat-provider";

const useChat = () => {
  return useContext(ChatContext);
};

export default useChat;
