import "react-native-gesture-handler";
import React from "react";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";
import { LogBox } from "react-native";

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

LogBox.ignoreLogs(['Remote debugger']);


export default function App() {
  const [fontsLoaded] = useFonts({
    'montserrat-extralight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
    'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'fuzzy-bold': require('./assets/fonts/FuzzyBubbles-Bold.ttf'),
    'fuzzy-regular': require('./assets/fonts/FuzzyBubbles-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <AppLoading />
    )
  } else {
    return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
    );
  }
}
