import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider/index';
import { Slot, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import '@/global.css';

export default function RootLayout() {
  const router = useRouter();

  const [fontsLoaded, error] = useFonts({
    'Pretendard-Regular': require('@/assets/fonts/Pretendard-Regular.ttf'),
    'Pretendard-Medium': require('@/assets/fonts/Pretendard-Medium.ttf'),
    'Pretendard-Light': require('@/assets/fonts/Pretendard-Light.ttf'),
    'Pretendard-SemiBold': require('@/assets/fonts/Pretendard-SemiBold.ttf'),
    'Pretendard-Bold': require('@/assets/fonts/Pretendard-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    if (error) console.error(error);
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <StatusBar style="auto" />
        <Slot />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
