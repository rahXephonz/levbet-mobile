import "../polyfills";

import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useRef } from "react";
import { useColorScheme } from "nativewind";
import * as SplashScreen from "expo-splash-screen";
import { transformToCamelCase } from "transform-obj";
import "react-native-reanimated";

import "../global.css";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "aeonik-bold": require("../assets/fonts/aeonik-bold.ttf"),
    "aeonik-regular": require("../assets/fonts/aeonik-regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 0,
          select: data => transformToCamelCase(data),
        },
      },
    });
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClientRef.current}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
