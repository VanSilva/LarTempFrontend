import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Feed from "../screens/Feed";
import UpdatePerson from "../screens/UpdatePerson";
import { SignOut } from "../screens/SignOut";

const Drawer = createDrawerNavigator();

export function AppRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Feed">
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="UpdatePerson" component={UpdatePerson} options={{ title: 'Editar Perfil' }} />
      <Drawer.Screen name="Sair" component={SignOut} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
