import React from "react";

import { Alert, Text, ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../../contexts/auth";
import { api } from "../../services/api";

import { styles } from "./styles";

function DeletePerson() {
  const { person, handleSetPerson } = useAuth();

  function handleDeletePress() {
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja apagar a conta?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => handleDelete(),
        },
      ],
      { cancelable: false }
    );
  }

  async function handleDelete() {
    try {
      await api.delete(`/person/delete/${person?.id}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });

      handleSetPerson(null, "signOut");

      ToastAndroid.show("Usuário apagado com sucesso", ToastAndroid.SHORT);
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

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDeletePress}>
          <Text style={styles.buttonText}>Apagar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DeletePerson;
