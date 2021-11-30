import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { api } from "../../services/api";

import { styles } from "./styles";

interface ICity {
  _id: string;
  name: string;
}

type IProps = {
  navigation: {
    navigate: (scene: string) => void;
  };
};

export function SignUp(props: IProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<ICity[]>();

  useEffect(() => {
    api
      .get("/city")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function handleSignUp() {
    try {
      await api.post("/person/create", {
        name,
        email,
        password,
        city,
        eLar: true,
      });

      ToastAndroid.show("Usuário cadastrado com sucesso", ToastAndroid.SHORT);

      props.navigation.navigate("SignIn");
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
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Cidade</Text>
          <Picker
            style={styles.input}
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
          >
            {cities?.map((city) => (
              <Picker.Item key={city._id} label={city.name} value={city._id} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
