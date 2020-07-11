import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "@ui-kitten/components";
import Timeline from "react-native-beautiful-timeline";

export default ({ navigation, user }) => {
  const { name, bio, interactions } = user;
  return (
    <View>
      {interactions.length > 0 && <Timeline style={{paddingTop: 50, marginLeft: 0, width:Dimensions.get('window').width }} data={interactions} />}
      {interactions.length === 0 && <Text>Nothing to show here...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerModal: {
    flex: 1,
    height: "100%",
    paddingLeft: 5,
    paddingRight: 10,
  },
  title: {
    fontSize: 20,
    lineHeight: 19,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  buttonWrapper: {
    backgroundColor: "#2dbded",

    height: 40,
    justifyContent: "center",
    width: 200,
    borderRadius: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center",
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: "#FFF",
    borderColor: "black",
    borderWidth: 1,
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 14,
    color: "#333",
  },
  text: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
  },
  label: {
    textAlign: "left",
  },
});
