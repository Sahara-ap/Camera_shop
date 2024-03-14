import axios, { AxiosError, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

const BASE_URL = 'https://camera-shop.accelerator.htmlacademy.pro';
const REQUEST_TIMEOUT = 5000;

type DetailMessageError = {
  type: string;
  messages: string;
}

const StatusCodesMapping: Record<number, boolean> = {
  // [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};
function shouldDisplayError(response: AxiosResponse) {
  return Boolean(StatusCodesMapping[response.status]);
}

function createApi() {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageError>) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.data.messages[1]);
      }

      throw error;
    });

  return api;
}

export {
  createApi
};
