import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { CustomError, ErrorWrapper, RequestConfig } from "./api.types";
import { Requests, SERVER_URL } from "./const";

const requestConfigs: Map<Requests, RequestConfig> = new Map();
requestConfigs.set(Requests.getData, {
  config: {
    url: SERVER_URL,
    method: "get",
  },
  retryCodes: [500, 502, 204],
  retries: 3,
});

async function retryAxiosRequest<T>({
  config,
  retries,
  retryCodes,
}: RequestConfig): Promise<AxiosResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.request<T>(config);
    if (retryCodes.includes(response.status) && retries > 0) {
      return retryAxiosRequest<T>({
        config,
        retries: retries - 1,
        retryCodes,
      });
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      return retryAxiosRequest<T>({
        config,
        retries: retries - 1,
        retryCodes,
      });
    }
    throw error as CustomError;
  }
}

async function handleAxiosError<T>(
  error: CustomError,
  requestData: AxiosRequestConfig
): Promise<ErrorWrapper<T>> {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return {
      status: axiosError.response?.status || "unknown status",
      message: axiosError.message,
      requestData: requestData,
    };
  } else {
    return {
      status: 0,
      message: error.message || "unknown error",
      requestData: requestData,
    };
  }
}

export async function executeRequest<T>(
  requestName: Requests,
  customConfig?: AxiosRequestConfig
): Promise<T | void> {
  const requestConfig = requestConfigs.get(requestName);
  if (!requestConfig) {
    throw new Error(`Request configuration not found for ${requestName}`);
  }

  const mergedConfig: AxiosRequestConfig = {
    ...requestConfig.config,
    ...customConfig,
  };

  try {
    const response = await retryAxiosRequest<T>({
      config: mergedConfig,
      retryCodes: requestConfig.retryCodes,
      retries: requestConfig.retries,
    });

    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    const errorWrapper = await handleAxiosError<T>(e, mergedConfig);
    console.error(errorWrapper);
  }
}
