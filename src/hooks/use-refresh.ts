import { useAuth, useRequest, useNavigate } from ".";

const useRefresh = () => {
  const { setAuth } = useAuth();
  const { doRequest } = useRequest({ url: "/refresh", method: "get" });
  const { doNavigate } = useNavigate();

  const doRefresh = async () => {
    try {
      const response = await doRequest();

      const { user, accessToken } = response;

      setAuth({ user: { ...user, accessToken } });

      return response.accessToken;
    } catch (error) {
      setAuth({ user: null });

      doNavigate({ page: "/login" });
    }
  };
  return { doRefresh };
};

export default useRefresh;
