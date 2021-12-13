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

  scrollView: {
    width: "100%",
  },

  animalHeights: {
    width: "100%",
    paddingHorizontal: 10,
  },

  animalHeight: {
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "#000",
  },

  animalHeightText: {
    fontFamily: 'fuzzy-bold',
    fontSize: 30,
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
});
