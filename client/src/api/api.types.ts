import { AxiosRequestConfig, AxiosError } from "axios";

export type ErrorWrapper<T> = {
  status: number | string;
  message: string;
  requestData: AxiosRequestConfig | T;
};

export type RequestConfig = {
  config: AxiosRequestConfig;
  retryCodes: number[];
  retries: number;
};

export type CustomError =
  | {
      status?: number;
      message?: string;
      requestConfig: AxiosRequestConfig;
    }
  | AxiosError;

