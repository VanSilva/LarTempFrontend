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

type TVacine = {
  _id: string;
  description: string;
};

export function VacinesList(props: IProps) {
  const [vacines, setVacines] = useState<TVacine[]>([]);
  const isFocused = useIsFocused();

  const { person } = useAuth();

  function handleGetAllVaccines() {
    api
      .get("/animalVaccine", {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      })
      .then((response) => {
        setVacines(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleGetAllVaccines();
  }, [person, isFocused]);

  function handleNavigateToRegister() {
    props.navigation.navigate("VaccineRegister");
  }

  function handleNavigateToUpdate(id: string) {
    props.navigation.navigate("VaccineUpdate", {
      vaccineId: id,
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
          onPress: () => handleDeleteVaccine(id),
        },
      ],
      { cancelable: false }
    );
  }

  async function handleDeleteVaccine(id: string) {
    try {
      await api.delete(`/animalVaccine/delete/${id}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });

      ToastAndroid.show("Vacina apagada com sucesso", ToastAndroid.SHORT);
      handleGetAllVaccines();
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
          <View style={styles.vacines}>
            {vacines?.map((vaccine) => (
              <View key={vaccine._id} style={styles.vacine}>
                <Text style={styles.vacineText}>{vaccine.description}</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNavigateToUpdate(vaccine._id)}
                  >
                    <Ionicons name="md-pencil" size={30} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => callConfirmationDialog(vaccine._id)}
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
