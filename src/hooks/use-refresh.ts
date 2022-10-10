import { useNavigate } from "react-router-dom";
import { useAuth, useRequest } from ".";
const useRefresh = () => {
  const { setAuth } = useAuth();
  const { doRequest } = useRequest({ url: "/refresh", method: "get" });
  const navigate = useNavigate();

  const doRefresh = async () => {
    try {
      const { user, accessToken } = await doRequest();

      setAuth({ user: { ...user, accessToken } });

      return accessToken;
    } catch (error) {
      setAuth({ user: null });
      navigate("/login");
    }
  };
  return { doRefresh };
};

export default useRefresh;
