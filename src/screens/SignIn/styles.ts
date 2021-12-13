import { StyleSheet } from "react-native";
import { block } from "react-native-reanimated";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f0f2",
    alignItems: "center",
    justifyContent: "center",
  },

  imagem: {
    width: 150,
    height: 150,
  },

  formContainer: {
    width: '100%',
    paddingHorizontal: 50,

  },

  title: {
    fontFamily: 'fuzzy-regular',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 40,
  },

  inputBlock: {
    width: '100%',
    marginTop: 10,
  },

  label: {
    fontFamily: 'fuzzy-regular',
    fontSize: 20,
  },

  input: {
    fontFamily: 'fuzzy-regular',
    fontSize: 20,
    borderBottomColor: '#5c5a5c',
    borderBottomWidth: 2,
    backgroundColor: "#f2f0f2",
    width: '100%',
    height: 45,
    borderLeftColor: "#5c5a5c",
    borderBottomEndRadius: 1,
    borderColor: '#000',
    marginTop: 2,
  },

  button: {
    marginTop: 15,
    width: '100%',
    backgroundColor: '#eda75c',
    borderColor: "#8c6a42",
    borderWidth: 2,
    borderRadius: 10,
  },

  buttonText: {
    fontFamily: 'fuzzy-bold',
    color: '#5c5a5c',
    fontSize: 20,
    textAlign: "center",
    padding: 8,
  }
});
