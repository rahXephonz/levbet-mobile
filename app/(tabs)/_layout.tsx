import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from "@/constants/colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  let { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
