import { useSupabase } from "../providers/supabase-provider";
import axios from "axios";
import { useBrainConfig } from "./context/BrainConfigProvider/hooks/useBrainConfig";
import getApiDomain from "./context/BrainConfigProvider/helpers/getApiUrl";

const axiosInstance = axios.create({
  baseURL: `${getApiDomain()}`,
});

export const useAxios = () => {
  const { session } = useSupabase();
  const {
    config: { backendUrl },
  } = useBrainConfig();

  axiosInstance.interceptors.request.clear();
  axiosInstance.interceptors.request.use(
    async (config) => {
      config.headers["Authorization"] = "Bearer " + session?.access_token;
      config.baseURL = backendUrl ?? config.baseURL;

      return config;
    },
    (error) => {
      console.error({ error });
      void Promise.reject(error);
    }
  );

  return {
    axiosInstance,
  };
};
