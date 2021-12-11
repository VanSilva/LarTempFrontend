import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  image: {
    width: "50%",
    height: 200,
  },

  scrollView: {
    width: "100%",
  },

  posts: {
    width: "100%",
    paddingHorizontal: 10,
  },

  post: {
    backgroundColor: "#F4A460",
    padding: 10,
    marginTop: 10,
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
    width: "75%",
  },

  dateText: {
    width: "25%",
  },

  defaultText: {
    marginTop: 2,
    fontSize: 16,
  },

  reaction: {
    flexDirection: "row",
    alignItems: "center",
  },

  reactionText: {
    marginTop: 2,
    fontSize: 16,
  },

  qtdText: {
    textAlign: "center",
    marginTop: 10,
  },

  buttonWhatsapp: {
    marginTop: 2,
    fontSize: 16,
    color: "#F4A460",
    textDecorationLine: "underline",
  },
});
