import "react-native-gesture-handler";
import React from "react";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";
import { LogBox } from "react-native";

LogBox.ignoreLogs(['Remote debugger']);


export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
