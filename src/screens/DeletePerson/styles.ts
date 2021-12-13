import { StyleSheet } from "react-native";

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
    width: "100%",
    paddingHorizontal: 50,
  },

  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 40,
  },

  inputBlock: {
    width: "100%",
    marginTop: 10,
  },

  label: {
    fontSize: 17,
  },

  input: {
    width: "100%",
    height: 35,
    borderWidth: 1,
    borderColor: "#000",
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
  },
});
