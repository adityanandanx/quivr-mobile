import { createContext, useEffect, useState } from "react";
import {
  getBrainConfigFromLocalStorage,
  saveBrainConfigInLocalStorage,
} from "./helpers/brainConfigLocalStorage";
import { BrainConfig, ConfigContext } from "./types";
import { setEmptyStringsUndefined } from "../../helpers/setEmptyStringsUndefined";

export const BrainConfigContext = createContext<ConfigContext | undefined>(
  undefined
);

const defaultBrainConfig: BrainConfig = {
  model: "gpt-3.5-turbo",
  temperature: 0,
  maxTokens: 500,
  keepLocal: true,
  anthropicKey: undefined,
  backendUrl: process.env.BACKEND_URL,
  openAiKey: undefined,
  supabaseKey: undefined,
  supabaseUrl: undefined,
};

export const BrainConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [brainConfig, setBrainConfig] =
    useState<BrainConfig>(defaultBrainConfig);

  const updateConfig = (newConfig: Partial<BrainConfig>) => {
    setBrainConfig((config) => {
      const updatedConfig: BrainConfig = {
        ...config,
        ...setEmptyStringsUndefined(newConfig),
      };
      saveBrainConfigInLocalStorage(updatedConfig);

      return updatedConfig;
    });
  };

  const resetConfig = () => {
    updateConfig(defaultBrainConfig);
  };

  useEffect(() => {
    let conf;
    const load = async () => {
      conf = await getBrainConfigFromLocalStorage();
    };
    try {
      load();
      setBrainConfig(conf ?? defaultBrainConfig);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <BrainConfigContext.Provider
      value={{ config: brainConfig, updateConfig, resetConfig }}
    >
      {children}
    </BrainConfigContext.Provider>
  );
};
