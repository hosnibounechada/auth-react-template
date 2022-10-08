import { useEffect, useState } from "react";
import axios from "../apis/axios";
import useAuth from "./use-auth";

type Method = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

interface UseRequestProps {
  url: string;
  method: Method;
  body?: any;
  onSuccess?: CallableFunction;
  onFailure?: CallableFunction;
}

const useRequestPrivate = ({ url, method, body, onSuccess, onFailure }: UseRequestProps) => {
  const { auth } = useAuth();
  const [errors, setErrors] = useState<{ message: string; field?: string }[]>([]);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setToken(auth.user?.accessToken);
  }, [auth.user?.accessToken]);

  const doRequestPrivate = async () => {
    try {
      const response = await axios[method](url, { headers: { authorization: `Bearer ${token}` } }, body);
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
