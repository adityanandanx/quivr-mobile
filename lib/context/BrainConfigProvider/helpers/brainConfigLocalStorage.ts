import localStorage from "../../../localStorage";
import { BrainConfig } from "../types";

const BRAIN_CONFIG_LOCAL_STORAGE_KEY = "userBrainConfig";

export const saveBrainConfigInLocalStorage = (updatedConfig: BrainConfig) => {
  try {
    localStorage.save({
      key: BRAIN_CONFIG_LOCAL_STORAGE_KEY,
      data: updatedConfig,
    });
  } catch (e) {
    console.log(e);
  }
};
export const getBrainConfigFromLocalStorage = async (): Promise<
  BrainConfig | undefined
> => {
  const persistedBrainConfig = await localStorage.load({
    key: BRAIN_CONFIG_LOCAL_STORAGE_KEY,
  });
  if (persistedBrainConfig === null) return;
  return JSON.parse(persistedBrainConfig);
};
