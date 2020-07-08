import React from "react";
import { View, StyleSheet } from "react-native";
import { Chatbot } from "../extra/chatbot.component";

export default ({ steps, handleEnd = () => null, ...rest }) => {
  const { navigation } = rest;

  return (
    <View style={styles.container}>
      <Chatbot
        steps={steps}
        handleEnd={async ({ steps }) => {
          await handleEnd({ steps });
          return navigation.goBack();
        }}
        customStyle={styles.custom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  custom: {
    borderWidth: 0,
    backgroundColor: "red",
  },
});
