import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useAuth } from "../../../contexts/auth";
import { api } from "../../../services/api";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

type IProps = {
  navigation: {
    navigate: (scene: string, props?: object) => void;
  };
};

type TCity = {
  _id: string;
  name: string;
};

export function CitiesList(props: IProps) {
  const [cities, setCities] = useState<TCity[]>([]);
  const isFocused = useIsFocused();

  const { person } = useAuth();

  function handleGetAllCities() {
    api
      .get("/city", {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      })
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleGetAllCities();
  }, [person, isFocused]);

  function handleNavigateToRegister() {
    props.navigation.navigate("CityRegister");
  }

  function handleNavigateToUpdate(id: string) {
    props.navigation.navigate("CityUpdate", {
      cityId: id,
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
          onPress: () => handleDeleteCity(id),
        },
      ],
      { cancelable: false }
    );
  }

  async function handleDeleteCity(id: string) {
    try {
      await api.delete(`/city/delete/${id}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });

      ToastAndroid.show("Cidade apagada com sucesso", ToastAndroid.SHORT);
      handleGetAllCities();
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
      <Image style={styles.imagem} source={require('../../../../assets/logo_animal.png')} />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleNavigateToRegister}
        >
          <Text style={styles.registerButtonText}>Cadastrar Cidade</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.cities}>
            {cities?.map((city) => (
              <View key={city._id} style={styles.city}>
                <Text style={styles.cityText}>{city.name}</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNavigateToUpdate(city._id)}
                  >
                    <Ionicons name="md-pencil" size={30} style={styles.icons} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => callConfirmationDialog(city._id)}
                  >
                    <Ionicons name="md-trash" size={30} style={styles.icons} />
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
