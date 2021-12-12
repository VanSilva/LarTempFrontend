import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f0f2",
    alignItems: "center",
    justifyContent: "center",
  },

  imagem: {
    alignSelf: "center", 
    width: 150,
    height: 150,
  },

  scrollView: {
    width: "100%",
  },

  animalTypes: {
    width: "100%",
    paddingHorizontal: 10,
  },

  animalType: {
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "#000",
  },

  animalTypeText: {
    fontFamily: 'montserrat-regular',
    fontSize: 20,
  },

  buttons: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginRight: 5,
  },

  content: {
    backgroundColor: "#fff",
    padding: 10,
  },

  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  titleText: {
    fontWeight: "bold",
    fontSize: 22,
  },

  registerButton: {
    marginTop: 15,
    width: '100%',
    backgroundColor: '#eda75c',
    borderColor: "#8c6a42",
    borderWidth: 2,
    borderRadius: 10,
  },

  registerButtonContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },

  registerButtonText: {
    fontFamily: 'montserrat-regular',
    color: '#5c5a5c',
    fontSize: 20,
    textAlign: "center",
    padding: 8,
  },

  icons: {
    color: "#8c6a42",
  },
});
