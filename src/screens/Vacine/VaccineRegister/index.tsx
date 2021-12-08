import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/build/Ionicons";

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { useAuth } from "../../../contexts/auth";

import { api } from "../../../services/api";
import { styles } from "./styles";

type IProps = {
  navigation: {
    navigate: (scene: string) => void;
  };
};

export function VaccineRegister(props: IProps) {
  const [description, setDescription] = useState("");

  const { person } = useAuth();

  async function handleRegister() {
    try {
      await api.post(
        "/animalVaccine/create",
        {
          description,
        },
        {
          headers: {
            authorization: `Bearer ${person?.token}`,
          },
        }
      );

      ToastAndroid.show("Vacina cadastrada com sucesso", ToastAndroid.SHORT);

      props.navigation.navigate("VaccinesList");
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
    props.navigation.navigate("VaccinesList");
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
        <View style={styles.formContainer}>
          <Text style={styles.title}>Cadastro</Text>

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              value={description}
              onChangeText={(text) => setDescription(text)}
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}