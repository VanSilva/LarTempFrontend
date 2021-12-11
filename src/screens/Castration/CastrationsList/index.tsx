import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
} from "react-native";
import { useAuth } from "../../../contexts/auth";
import { api } from "../../../services/api";
import { styles } from "./styles";

type TCastration = {
  _id: string;
  description: string;
}

export function CastrationsList() {
  const [castrations, setCastrations] = useState<TCastration[]>([]);
  
  const isFocused = useIsFocused();
  const { person } = useAuth();

  useEffect(() => {
    api
      .get("/animalCastration", {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      })
      .then((response) => {
        setCastrations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [person, isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.imagem} source={require('../../../../assets/logo_animal.png')} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.castrations}>
          {castrations?.map((castration) => (
            <View key={castration._id} style={styles.castration}>
              <Text style={styles.castrationText}>{castration.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
