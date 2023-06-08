import { createContext, useEffect, useState } from "react";
import {
  getBrainConfigFromLocalStorage,
  saveBrainConfigInLocalStorage,
} from "./helpers/brainConfigLocalStorage";
import { BrainConfig, ConfigContext } from "./types";
import { setEmptyStringsUndefined } from "../../helpers/setEmptyStringsUndefined";
import getApiDomain from "./helpers/getApiUrl";

export const BrainConfigContext = createContext<ConfigContext | undefined>(
  undefined
);

const defaultBrainConfig: BrainConfig = {
  model: "gpt-3.5-turbo",
  temperature: 0,
  maxTokens: 500,
  keepLocal: true,
  anthropicKey: undefined,
  backendUrl: getApiDomain(),
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
      try {
        conf = await getBrainConfigFromLocalStorage();
      } catch (e) {
        saveBrainConfigInLocalStorage(defaultBrainConfig);
      }
    };
    load();
    setBrainConfig(conf ?? defaultBrainConfig);
  }, []);

  return (
    <BrainConfigContext.Provider
      value={{ config: brainConfig, updateConfig, resetConfig }}
    >
      {children}
    </BrainConfigContext.Provider>
  );
};
