import { useContext } from "react";
import MessagesContext from "../context/messages-provider";

const useAuth = () => {
  return useContext(MessagesContext);
};

export default useAuth;
