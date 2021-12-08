import Ionicons from "@expo/vector-icons/build/Ionicons";
import React, { useEffect, useState } from "react";

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
  route: {
    params: {
      cityId: string;
    };
  };
};

export function CityUpdate(props: IProps) {
  const [name, setName] = useState("");

  const { person } = useAuth();

  useEffect(() => {
    api
      .get(`/city/${props.route.params.cityId}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      })
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.route.params.cityId]);

  async function handleRegister() {
    try {
      await api.put(
        `/city/update/${props.route.params.cityId}`,
        {
          name,
        },
        {
          headers: {
            authorization: `Bearer ${person?.token}`,
          },
        }
      );

      ToastAndroid.show("Cidade atualizada com sucesso", ToastAndroid.SHORT);

      props.navigation.navigate("CitiesList");
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
        <View style={styles.formContainer}>
          <Text style={styles.title}>Edição</Text>

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
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
