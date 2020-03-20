import React from "react";
import { View, StyleSheet } from "react-native";
import { Chatbot } from "../extra/chatbot.component";

export default ({ steps, onFinish = () => null, ...rest }) => {
  const { navigation } = rest;
  
  const handleEnd = async ({ steps, values }) => {
    await onFinish(values);
    return setTimeout(() => navigation.goBack(), 1500);
  };

  return (
    <View style={styles.container}>
      <Chatbot steps={steps} handleEnd={handleEnd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
