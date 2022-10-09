import { useState } from "react";
import axios from "../apis/axios";
import { UseRequestProps } from "../types/hooks";
import { ErrorApi } from "../types/errors";

const useRequest = ({ url, method, body, onSuccess, onFailure }: UseRequestProps) => {
  const [errors, setErrors] = useState<ErrorApi>([]);
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
