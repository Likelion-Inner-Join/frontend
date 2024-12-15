import axios from "axios";

axios.defaults.withCredentials = true;

const ApiInstance = axios.create({
  baseURL: "https://innerjoin.duckdns.org/",
  headers: {
    "Content-Type": "application/json",
  },
});

const api = async ({
  method,
  url,
  data = {},
}: {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: object;
}) => {
  try {
    const response = await ApiInstance.request({
      method,
      url,
      data,
    });

    return response.data; // { isSuccess, code, message, result }
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data; // { isSuccess, code, message, result }
    }
    // 예외 처리: 예상치 못한 에러
    return {
      isSuccess: false,
      code: error.response?.status || 500,
      message: "Unexpected error occurred",
      result: null,
    };
  }
};

export const GET = async (url: string) => {
  return await api({ method: "get", url });
};

export const POST = async (url: string, data: object) => {
  return await api({ method: "post", url, data });
};

export const PUT = async (url: string, data: object) => {
  return await api({ method: "put", url, data });
};

export const DELETE = async (url: string) => {
  return await api({ method: "delete", url });
};
