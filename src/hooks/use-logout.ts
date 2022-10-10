import useAuth from "./use-auth";
import useRequestPrivate from "./use-request-private";

const useLogout = () => {
  const { setAuth } = useAuth();
  const { doRequestPrivate } = useRequestPrivate({ url: "/logout", method: "get" });

  const doLogout = async () => {
    await doRequestPrivate();
    setAuth({ user: null });
  };
  return { doLogout };
};

export default useLogout;
