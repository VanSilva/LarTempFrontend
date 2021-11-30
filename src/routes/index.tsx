import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { useAuth } from "../contexts/auth";
// import { View, ActivityIndicator } from 'react-native';

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

// import { useAuth } from '../contexts/auth';

export function Routes() {
  const { person } = useAuth();

  return (
    <NavigationContainer>
      {person?.signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
