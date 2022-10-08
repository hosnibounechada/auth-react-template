import useAuth from "./use-auth";
import useRequest from "./use-request";

const useRefresh = ({ onFailure }: { onFailure: CallableFunction }) => {
  const { auth, setAuth } = useAuth();

  const { doRequest } = useRequest({ url: "/refresh", method: "get" });

  const doRefresh = async () => {
    const response = await doRequest();

    if (!response.accessToken || !auth.user) return onFailure();

    setAuth({ ...auth, user: { ...auth.user, accessToken: response.accessToken } });

    return response.accessToken;
  };
  return { doRefresh };
};

export default useRefresh;
