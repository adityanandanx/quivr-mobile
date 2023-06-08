import { FC, useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Upload from "../pages/dashboard/Upload";
import Chat from "../pages/dashboard/Chat";
import Explore from "../pages/dashboard/Explore";
import User from "../pages/dashboard/User";

interface DashboardNavigationProps {}

const DashboardNavigation: FC<DashboardNavigationProps> = ({}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "upload",
      title: "Upload",
      focusedIcon: "upload",
      unfocusedIcon: "upload-outline",
    },
    { key: "chat", title: "Chat", focusedIcon: "chat" },
    { key: "explore", title: "Explore", focusedIcon: "compass" },
    {
      key: "account",
      title: "Account",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    upload: () => <Upload />,
    chat: () => <Chat />,
    explore: () => <Explore />,
    account: () => <User />,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      // keyboardHidesNavigationBar={false}
      // sceneAnimationEnabled={true}
    />
  );
};

export default DashboardNavigation;
