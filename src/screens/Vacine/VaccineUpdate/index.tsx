import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/build/Ionicons";

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
  route: {
    params: {
      vaccineId: string;
    };
  };
};

export function VaccineUpdate(props: IProps) {
  const [description, setDescription] = useState("");

  const { person } = useAuth();

  useEffect(() => {
    api
      .get(`/animalVaccine/${props.route.params.vaccineId}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      })
      .then((response) => {
        setDescription(response.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.route.params.vaccineId]);

  async function handleRegister() {
    try {
      await api.put(
        `/animalVaccine/update/${props.route.params.vaccineId}`,
        {
          description,
        },
        {
          headers: {
            authorization: `Bearer ${person?.token}`,
          },
        }
      );

      ToastAndroid.show("Vacina atualizada com sucesso", ToastAndroid.SHORT);

      props.navigation.navigate("VaccinesList");
    } catch (error: any) {
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
      <Image style={styles.imagem} source={require('../../../../assets/logo_animal.png')} />
        <View style={styles.formContainer}>
          <View style={styles.inputBlock}>
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
