import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";

import { Text, ToastAndroid, View, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../../contexts/auth";
import { api } from "../../services/api";

import { styles } from "./styles";

interface ICity {
  _id: string;
  name: string;
}

function UpdatePerson() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<ICity[]>();

  const { person } = useAuth();

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

  useEffect(() => {
    if (person === null) return;

    api
      .get(`/person/${person?.id}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      })
      .then((response) => { 
        setName(response.data.name);
        setCity(response.data.city);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [person]);

  async function handleUpdate() {
    if(password !== confirmPassword){
      ToastAndroid.show(
        "As senhas não conferem",
        ToastAndroid.SHORT
      );
      return
    }

    try {
      await api.put(`/person/update/${person?.id}`, {
        name,
        city,
        password,
      }, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });      

      ToastAndroid.show("Usuário atualizado com sucesso", ToastAndroid.SHORT);
    } catch (error: any) {
      console.log(error);
      
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
      <Image style={styles.imagem} source={require('../../../assets/logo_animal.png')} />
      <View style={styles.formContainer}>

        <View style={styles.inputBlock}>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder={"Nome"}
            style={styles.input}
          />
        </View>

        <View style={styles.inputBlock}>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder={"Senha"}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.inputBlock}>
          <TextInput
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
            placeholder={"Confirmar Senha"}
            style={styles.input}
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

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UpdatePerson;
