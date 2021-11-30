import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Feed from "../screens/Feed";
import UpdatePerson from "../screens/UpdatePerson";
import { SignOut } from "../screens/SignOut";
import DeletePerson from "../screens/DeletePerson";
import { useAuth } from "../contexts/auth";
import { AnimalHeightList } from "../screens/AnimalHeight/AnimalHeightList";
import { AnimalTypesList } from "../screens/AnimalType/AnimalTypesList";
import { CastrationsList } from "../screens/Castration/CastrationsList";
import { CitiesList } from "../screens/City/CitiesList";
import { VacinesList } from "../screens/Vacine/VacinesList";
import { AnimalTypeRegister } from "../screens/AnimalType/AnimalTypeRegister";
import { createStackNavigator } from "@react-navigation/stack";
import { AnimalTypeUpdate } from "../screens/AnimalType/AnimalTypeUpdate";
import { CityRegister } from "../screens/City/CityRegister";
import { CityUpdate } from "../screens/City/CityUpdate";
import { VaccineRegister } from "../screens/Vacine/VaccineRegister";
import { VaccineUpdate } from "../screens/Vacine/VaccineUpdate";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AnimalTypesStack = () => (
  <Stack.Navigator
    initialRouteName="AnimalTypesList"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Drawer.Screen name="AnimalTypesList" component={AnimalTypesList} />

    <Stack.Screen name="AnimalTypeRegister" component={AnimalTypeRegister} />

    <Stack.Screen name="AnimalTypeUpdate" component={AnimalTypeUpdate} />
  </Stack.Navigator>
);

const CityStack = () => (
  <Stack.Navigator
    initialRouteName="CitiesList"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Drawer.Screen name="CitiesList" component={CitiesList} />

    <Stack.Screen name="CityRegister" component={CityRegister} />

    <Stack.Screen name="CityUpdate" component={CityUpdate} />
  </Stack.Navigator>
);

const VaccineStack = () => (
  <Stack.Navigator
    initialRouteName="VaccinesList"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Drawer.Screen name="VaccinesList" component={VacinesList} />

    <Stack.Screen name="VaccineRegister" component={VaccineRegister} />

    <Stack.Screen name="VaccineUpdate" component={VaccineUpdate} />
  </Stack.Navigator>
);

export function AppRoutes() {
  const { person } = useAuth();

  return (
    <Drawer.Navigator initialRouteName="Feed" 
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#3C4D4C',
        width: 240,
      },
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3C4D4C',
      }
    }}>
      
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen 
        name="UpdatePerson"
        component={UpdatePerson}
        options={{ title: "Editar Perfil", drawerStyle: {},
      }}
      />
      <Drawer.Screen
        name="DeletePerson"
        component={DeletePerson}
        options={{ title: "Apagar Perfil" }}
      />

      {!person?.eLar && (
        <>
          <Drawer.Screen
            name="AnimalHeightList"
            component={AnimalHeightList}
            options={{ title: "Lista de Portes" }}
          />

          <Drawer.Screen
            name="CastrationsList"
            component={CastrationsList}
            options={{ title: "Lista de Castrações" }}
          />

          <Drawer.Screen
            name="AnimalTypes"
            component={AnimalTypesStack}
            options={{ title: "Manutenção de Raça" }}
          />

          <Drawer.Screen
            name="Cities"
            component={CityStack}
            options={{ title: "Manutenção de Cidade" }}
          />
          <Drawer.Screen
            name="Vacines"
            component={VaccineStack}
            options={{ title: "Manutenção de Vacina" }}
          />
        </>
      )}

      <Drawer.Screen
        name="Sair"
        component={SignOut}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
