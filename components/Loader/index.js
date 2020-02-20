import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const screen = Dimensions.get("window");
const ITEM_WIDTH = screen.width / 2;

export const Loader = ({ visible }) => (
  <AnimatedLoader
    visible={visible}
    overlayColor="rgba(255,255,255,0.75)"
    source={require("./animation.json")}
    animationStyle={styles.lottie}
    speed={1}
  />
);

const styles = StyleSheet.create({
  lottie: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH
  }
});
