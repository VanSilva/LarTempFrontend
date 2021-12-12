import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image
} from "react-native";
import { useAuth } from "../../../contexts/auth";
import { api } from "../../../services/api";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

type IProps = {
  navigation: {
    navigate: (scene: string) => void;
  };
};

type TAnimalHeight = {
  _id: string;
  description: string;
}

export function AnimalHeightList(props: IProps) {
  const [animalHeights, setAnimalHeights] = useState<TAnimalHeight[]>([]);

  const isFocused = useIsFocused();
  const { person } = useAuth();

  useEffect(() => {
    api
      .get("/animalHeight", {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      })
      .then((response) => {
        setAnimalHeights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [person, isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.imagem} source={require('../../../../assets/logo_animal.png')} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.animalHeights}>
          {animalHeights?.map((animalHeight) => (
            <View key={animalHeight._id} style={styles.animalHeight}>
              <Text style={styles.animalHeightText}>
                {animalHeight.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
