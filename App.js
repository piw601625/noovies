import React, { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, useColorScheme } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import Root from './navigation/Root';
import { darkTheme, lightTheme } from './themestyled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const [loaded] = Font.useFonts(Ionicons.font);

  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    async function prepare() {
      try {
        // 강의의 startLoading과 동일하게 동작
      } catch (error) {
        // 강의의 onError와 동일하게 동작
        console.warn(error);
      } finally {
        // 강의의 onFinish와 동일하게 동작
        setReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (loaded) await SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <View onLayout={onLayoutRootView}></View>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
