import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth, useRefresh } from "../hooks";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { doRefresh } = useRefresh();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await doRefresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth.user?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [auth.user?.accessToken, doRefresh]);

  return <>{!persist ? <Outlet /> : isLoading ? <p>is loading ...</p> : <Outlet />}</>;
};

export default PersistLogin;
