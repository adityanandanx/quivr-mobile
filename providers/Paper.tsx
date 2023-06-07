import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";

import { isReadyRef, navigationRef } from "react-navigation-helpers";
import SupabaseProvider from "./supabase-provider";
import { BrainConfigProvider } from "../lib/context/BrainConfigProvider/brain-config-provider";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

// PREFERENCES
const defaultPreferences = { toggleDarkMode: () => {}, darkMode: false };
const PreferencesContext = createContext(defaultPreferences);
export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error(
      "usePreferences must be used within PreferencesContext.Provider"
    );
  }
  return context;
};

interface PaperProps {
  children?: ReactNode;
}

const Paper: FC<PaperProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  let theme = darkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleDarkMode = useCallback(() => {
    return setDarkMode(!darkMode);
  }, [darkMode]);

  const preferences = useMemo(
    () => ({
      toggleDarkMode,
      darkMode,
    }),
    [toggleDarkMode, darkMode]
  );

  useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  return (
    <SupabaseProvider>
      <BrainConfigProvider>
        <PreferencesContext.Provider value={preferences}>
          <PaperProvider theme={theme}>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                isReadyRef.current = true;
              }}
              theme={theme}
            >
              {children}
            </NavigationContainer>
          </PaperProvider>
        </PreferencesContext.Provider>
      </BrainConfigProvider>
    </SupabaseProvider>
  );
};

export default Paper;
