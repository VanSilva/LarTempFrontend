import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

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

export function AnimalTypeRegister(props: IProps) {
  const [description, setDescription] = useState("");

  const { person } = useAuth();

  async function handleRegister() {
    try {
      await api.post(
        "/animalType/create",
        {
          description,
        },
        {
          headers: {
            authorization: `Bearer ${person?.token}`,
          },
        }
      );

      ToastAndroid.show("Raça cadastrada com sucesso", ToastAndroid.SHORT);

      props.navigation.navigate("AnimalTypesList");
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

  function handleNavigateToBack(){
    props.navigation.navigate("AnimalTypesList");
  }

  return (
    <>
    <View style={styles.viewArrow}>
      <TouchableOpacity style={styles.buttonBack} onPress={handleNavigateToBack}>
        <Ionicons name="md-arrow-back" size={30} color="black" />
      </TouchableOpacity>
    </View>
      <View style={styles.container}>
      <Image style={styles.imagem} source={require('../../../../assets/logo_animal.png')} />
        <View style={styles.formContainer}>
          <View style={styles.inputBlock}>
            <TextInput
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder={"Raça"}
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar Raça</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
