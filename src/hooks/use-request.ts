import { useState } from "react";
// import axios from "axios";
import axios from "../apis/axios";

type Method = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

interface UseRequestProps {
  url: string;
  method: Method;
  body?: any;
  onSuccess?: CallableFunction;
  onFailure?: CallableFunction;
}

const useRequest = ({ url, method, body, onSuccess, onFailure }: UseRequestProps) => {
  const [errors, setErrors] = useState<{ message: string; field?: string }[]>([]);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
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
  return { doRequest, errors };
};

export default useRequest;
