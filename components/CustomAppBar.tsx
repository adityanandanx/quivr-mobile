import { FC, useContext } from "react";
import { Appbar, Switch, useTheme } from "react-native-paper";
import { usePreferences } from "../providers/Paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";
import { StatusBar } from "expo-status-bar";

interface CustomAppBarProps extends NativeStackHeaderProps {}

const CustomAppBar: FC<CustomAppBarProps> = ({
  navigation,
  options,
  route,
  back,
}) => {
  const theme = useTheme();
  const { darkMode, toggleDarkMode } = usePreferences();
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header elevated>
      {options.headerBackVisible ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} />
      <Switch value={darkMode} onValueChange={toggleDarkMode} />
      <StatusBar style={darkMode ? "light" : "dark"} />
    </Appbar.Header>
  );
};

export default CustomAppBar;
