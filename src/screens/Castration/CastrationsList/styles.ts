import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    width: "100%",
  },

  castrations: {
    width: "100%",
    paddingHorizontal: 10,
  },

  castration: {
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "#000",
  },

  castrationText: {
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
});
