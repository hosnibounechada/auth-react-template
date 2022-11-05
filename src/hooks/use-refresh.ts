import { useAuth, useRequest } from ".";
import socket from "../services/socket";
const useRefresh = () => {
  const { setAuth } = useAuth();
  const { doRequest } = useRequest({ url: "/auth/refresh", method: "get" });

  const doRefresh = async () => {
    try {
      const { user, accessToken } = await doRequest();
      setAuth({ user: { ...user, accessToken } });
      return accessToken;
    } catch (error) {
      setAuth({ user: null });
      socket.disconnect();
    }
  };
  return { doRefresh };
};

export default useRefresh;
