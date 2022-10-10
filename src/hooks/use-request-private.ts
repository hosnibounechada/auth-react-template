import { useEffect, useState } from "react";
import axiosPrivate from "../apis/axios";
import { useRefresh, useAuth } from ".";
import { UseRequestProps } from "../types/hooks";
import { ErrorApi } from "../types/errors";

const useRequestPrivate = ({ url, method, body, onSuccess, onFailure }: UseRequestProps) => {
  const { auth, setAuth } = useAuth();
  const { doRefresh } = useRefresh();
  const [errors, setErrors] = useState<ErrorApi>([]);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers!.Authorization = config.headers!.Authorization ?? `Bearer ${auth.user?.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await doRefresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, doRefresh, setAuth]);

  const doRequestPrivate = async () => {
    try {
      const controller = new AbortController();
      const response = await axiosPrivate[method](url, { signal: controller.signal }, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err: any) {
      if (onFailure) {
        onFailure(err);
      }
      if (err.response.status === 0) return setErrors([{ message: "No server response" }]);
      setErrors(err.response.data.errors);
    }
  };
  return { doRequestPrivate, errors };
};

export default useRequestPrivate;
