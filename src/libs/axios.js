import axios from "axios";
import { toast } from "sonner";
import { toastPresets } from "../components/toasters";
import { getToken, setToken } from "./token";

const API_URL = import.meta.env.VITE_PORT_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
});

let isRefreshing = false;
let queue = [];

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(undefined, async (error) => {
  const status = error.response?.status;
  const errorMessage = error.response.data.message;
  const isNetworkError =
    !error.response ||
    error.code === "ERR_NETWORK" ||
    error.code === "ECONNABORTED";
  if (isNetworkError) {
    toast.error("Request timed out, please try again", {
      id: "network-error",
      ...toastPresets.authError(),
      position: "top-center",
    });
    throw error;
  }

  if (error?.response?.status == 401 && !error.config._retry) {
    if (error.config._isRefresh) {
      window.location.href = "/auth";
      console.log('unauthorized block reached')
      return Promise.reject(error);
    }

    error.config._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push((err) => {
          if (err) return reject(err);
          resolve(api(error.config));
        });
      });
    }

    isRefreshing = true;

    try {
      const { data } = await api.post(
        "/auth/refresh",
        {},
        { _isRefresh: true },
      );

      const accessToken = data.data;
      setToken(accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      queue.forEach((cb) => cb(null));
      queue = [];
      return api(error.config);
    } catch (err) {
      queue.forEach((cb) => cb(err));
      queue = [];

      const isNetworkError =
        !err.response ||
        err.code === "ERR_NETWORK" ||
        err.code === "ECONNABORTED";
      if (isNetworkError) {
        toast.error("No internet connection, please check your network", {
          id: "network-error-refresh",
          ...toastPresets.authError(),
          position: "top-center",
        });
      }

 console.log('unauthorized block reached')
      
      throw err;
    } finally {
      isRefreshing = false;
    }
  }

  switch (status) {
    case 403:
      switch (errorMessage) {
        case "UPLOAD_LIMIT_EXCEEDED":
          toast.dismiss("upload-file");
          toast.error("Monthly Resume Limit Reached", {
            ...toastPresets.generalError(
              "You've used all your resume uploads this month. Upgrade for unlimited uploads.",
            ),
          });
          break;
        case "APPLICATION_LIMIT_EXCEEDED":
          toast.error("Weekly Application Limit Reached", {
            ...toastPresets.generalError(
              "You've hit your weekly job application limit. Upgrade to increase your limit.",
            ),
          });
          break;
        case "STORAGE_LIMIT_EXCEEDED":
          toast.error("User storage Full", {
            ...toastPresets.generalError(
              "Your storage is full. Upgrade to get more space for your resumes and files.",
            ),
          });
          break;
        case "FEATURE_NOT_ALLOWED":
          toast.error("Feature Not Available", {
            ...toastPresets.generalError(
              "Feature Not Available	This feature requires a higher plan. Upgrade to unlock access.",
            ),
          });
          break;

        default:
          toast.error("Permission error", {
            id: "forbidden",
            ...toastPresets.generalError(
              "You do not have permission to do this",
            ),
          });
          break;
      }
      break;
    case 429:
      toast.error("Too many requests, please slow down", {
        id: "rate-limit",
        description:
          "You're doing that too quickly. Please wait a moment before trying again.",
        ...toastPresets.generalError(),
      });
      break;
    case 500:
    case 502:
    case 503:
      toast.error("Something went wrong, please try again", {
        id: "server-error",
        ...toastPresets.authError(),
        position: "top-center",
      });
      break;
  }

  throw error;
});
