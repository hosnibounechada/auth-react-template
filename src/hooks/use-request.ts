import { useState } from "react";
import axios from "../apis/axios";
import { UseRequestProps } from "../types/hooks";
import { ErrorApi } from "../types/errors";
// import { useNavigate } from "react-router-dom";

const useRequest = ({ url, method, body, onSuccess, onFailure }: UseRequestProps) => {
  // const navigate = useNavigate();
  const [errors, setErrors] = useState<ErrorApi>([]);
  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err: any) {
      if (err.response.status === 401 && onFailure) return onFailure();
      if (err.response.status === 0) setErrors([{ message: "No server response" }]);
      if (err.response.status === 401) setErrors([{ message: "Not authorized" }]);
      setErrors(err.response.data.errors);
    }
  };
  return { doRequest, errors };
};

export default useRequest;
