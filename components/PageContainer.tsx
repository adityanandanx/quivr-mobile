import { RefreshControl, ScrollView, ScrollViewProps } from "react-native";
import { FC, ReactNode, useCallback, useState } from "react";
import { ActivityIndicator, Portal, Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface PageContainerProps {
  children?: ReactNode;
  onRefresh?: () => void;
}

const PageContainer: FC<PageContainerProps> = ({ children, onRefresh }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshCalled = useCallback(() => {
    if (!onRefresh) return;
    setRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Surface elevation={0} style={{ height: "100%", flex: 1 }}>
      <Portal.Host>
        <ScrollView
          style={{
            position: "relative",
            flex: 1,
            padding: 16,
            paddingTop: 64,
          }}
          refreshControl={
            onRefresh && (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefreshCalled}
              />
            )
          }
        >
          {children}
        </ScrollView>
      </Portal.Host>
    </Surface>
  );
};

export default PageContainer;
