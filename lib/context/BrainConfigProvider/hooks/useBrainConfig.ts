import { useContext } from "react";
import { BrainConfigContext } from "../brain-config-provider";

export const useBrainConfig = () => {
  const context = useContext(BrainConfigContext);

  if (context === undefined) {
    throw new Error("useConfig must be used inside BrainConfigContext");
  }

  return context;
};
