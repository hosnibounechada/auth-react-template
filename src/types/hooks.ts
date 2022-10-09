import { Method } from "./apis";

export type UseRequestProps = {
  url: string;
  method: Method;
  body?: any;
  onSuccess?: CallableFunction;
  onFailure?: CallableFunction;
};
