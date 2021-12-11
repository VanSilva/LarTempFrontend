import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../contexts/auth";
import { api } from "../../../services/api";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/core";

type IProps = {
  navigation: {
    navigate: (scene: string, props?: object) => void;
  };
};

type TAnimalType = {
  _id: string;
  description: string;
};

export function AnimalTypesList(props: IProps) {
  const [animalTypes, setAnimalType] = useState<TAnimalType[]>([]);
  const isFocused = useIsFocused();

  const { person } = useAuth();

  function handleGetAllAnimalTypes() {
    api
      .get("/animalType", {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      })
      .then((response) => {
        setAnimalType(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleGetAllAnimalTypes();
  }, [person, isFocused]);

  function handleNavigateToRegister() {
    props.navigation.navigate("AnimalTypeRegister");
  }

  function handleNavigateToUpdate(id: string) {
    props.navigation.navigate("AnimalTypeUpdate", {
      animalTypeId: id,
    });
  }

  function callConfirmationDialog(id: string) {
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja apagar?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => handleDeleteAnimalType(id),
        },
      ],
      { cancelable: false }
    );
  }

  async function handleDeleteAnimalType(id: string) {
    try {
      await api.delete(`/animalType/delete/${id}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });

      ToastAndroid.show("Raça apagada com sucesso", ToastAndroid.SHORT);
      handleGetAllAnimalTypes();
    } catch (error: any) {
      if (error.response?.status === 400) {
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
    <>
      <View style={styles.registerButtonContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleNavigateToRegister}
        >
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.animalTypes}>
            {animalTypes?.map((animalType) => (
              <View key={animalType._id} style={styles.animalType}>
                <Text style={styles.animalTypeText}>
                  {animalType.description}
                </Text>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNavigateToUpdate(animalType._id)}
                  >
                    <Ionicons name="md-pencil" size={30} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => callConfirmationDialog(animalType._id)}
                  >
                    <Ionicons name="md-trash" size={30} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
