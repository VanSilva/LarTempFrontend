import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8c6a42",
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  image: {
    width: "80%",
    height: 200,
    borderColor: "#eda75c",
    borderWidth: 5,
    borderRadius: 20,
  },

  scrollView: {
    width: "100%",
  },

  posts: {
    width: "100%",
    paddingHorizontal: 10,
  },

  post: {
    backgroundColor: "#eda75c",
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
  },

  content: {
    backgroundColor: "#f2f0f2",
    padding: 10,
    borderRadius: 20,
  },

  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  titleText: {
    fontFamily: 'fuzzy-bold',
    fontWeight: "bold",
    fontSize: 22,
    width: "75%",
  },

  dateText: {
    fontFamily: 'fuzzy-bold',
    width: "25%",
  },

  defaultText: {
    fontFamily: 'fuzzy-regular',
    fontSize: 16,
  },

  reaction: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  reactionText: {
    fontFamily: 'fuzzy-bold',
    marginTop: 2,
    fontSize: 12,
  },

  qtdText: {
    fontFamily: 'fuzzy-bold',
    textAlign: "center",
    marginTop: 10,
  },

  buttonWhatsapp: {
    alignSelf: "center",
    fontFamily: 'fuzzy-bold',
    marginTop: 2,
    fontSize: 20,
    color: "#8c6a42",
    textDecorationLine: "underline",
  },
});
