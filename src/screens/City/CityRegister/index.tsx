import Ionicons from "@expo/vector-icons/build/Ionicons";
import React, { useState } from "react";

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Image,
} from "react-native";
import { useAuth } from "../../../contexts/auth";

import { api } from "../../../services/api";
import { styles } from "./styles";

type IProps = {
  navigation: {
    navigate: (scene: string) => void;
  };
};

export function CityRegister(props: IProps) {
  const [name, setName] = useState("");

  const { person } = useAuth();

  async function handleRegister() {
    try {
      await api.post(
        "/city/create",
        {
          name,
        },
        {
          headers: {
            authorization: `Bearer ${person?.token}`,
          },
        }
      );

      ToastAndroid.show("Cidade cadastrada com sucesso", ToastAndroid.SHORT);

      props.navigation.navigate("CitiesList");
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 400) {
        ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          "Ocorreu um erro, tente novamente",
          ToastAndroid.SHORT
        );
      }
    }
  }

  function handleNavigateToBack() {
    props.navigation.navigate("CitiesList");
  }

  return (
    <>
      <View style={styles.viewArrow}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={handleNavigateToBack}
        >
          <Ionicons name="md-arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
      <Image style={styles.imagem} source={require('../../../../assets/logo_animal.png')} />
        <View style={styles.formContainer}>
          <View style={styles.inputBlock}>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder={"Cidade"}
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar Cidade</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
