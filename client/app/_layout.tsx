import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { NativeBaseProvider, extendTheme } from "native-base";
import React, { useEffect } from 'react';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};


export default function RootLayout() {
  // const [error] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  //   ...FontAwesome.font,
  // });

  const error = false;

  const theme = extendTheme({
    colors: {
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      bg: {
        shade: "#2870F1",
        shadeDark: "#1E60D5"
      }
    },
    config: {
      initialColorMode: 'dark',
    },
  });

  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);

    return () => {
      setLoaded(false);
    }
    
  }, []);


  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      <NativeBaseProvider theme={theme}>
        {!loaded && <SplashScreen />}
        {loaded && <RootLayoutNav />}
      </NativeBaseProvider>
    </>
  );
}

function RootLayoutNav() {
  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="permission/index" options={{ headerShown: false }} />
        <Stack.Screen name="integrations/index" options={{ headerShown: false }} />
        <Stack.Screen name="integrations/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
