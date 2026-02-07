import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "FunnelDisplay-Bold": require("../assets/fonts/Funnel_Display/FunnelDisplay-Bold.ttf"),
    "FunnelDisplay-Medium": require("../assets/fonts/Funnel_Display/FunnelDisplay-Medium.ttf"),
    "FunnelDisplay-Regular": require("../assets/fonts/Funnel_Display/FunnelDisplay-Regular.ttf"),
    "FunnelDisplay-SemiBold": require("../assets/fonts/Funnel_Display/FunnelDisplay-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter/Inter-Bold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </KeyboardProvider>
  );
}
