import React, { useState } from "react";

import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useAuth } from "../../contexts/auth";
import { api } from "../../services/api";

import { styles } from "./styles";

type IProps = {
  navigation: {
    navigate: (scene: string) => void;
  };
};

export function SignIn(props: IProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleSetPerson } = useAuth();

  async function handleSignIn() {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      handleSetPerson(
        {
          id: response.data.id,
          signed: true,
          eLar: response.data.eLar,
          token: response.data.token,
        },
        "signIn"
      );
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

  function handleNavigateToSignUp() {
    props.navigation.navigate("SignUp");
  }

  return (
    <View style={styles.container}>
      <Image style={styles.imagem} source={require('../../../assets/logo_animal.png')} />
        <View style={styles.formContainer}>
        <View style={styles.inputBlock}>
          {/*<Text style={styles.label}>E-mail</Text> */}
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder={"E-mail"}
            style={styles.input}
          />
        </View>

        <View style={styles.inputBlock}>
          {/*<Text style={styles.label}>Senha</Text> */}
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder={"Senha"}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToSignUp}
        >
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
