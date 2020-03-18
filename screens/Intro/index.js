import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SvgUri from "expo-svg-uri";
import { Ionicons } from "@expo/vector-icons";
import AppIntroSlider from "react-native-app-intro-slider";

import { useAuthState } from "react-firebase-hooks/auth";
import { firebase } from "../../core/config/firebase.config";

const slides = [
  {
    key: "welcome",
    title: "Welcome to Ross",
    text: "Your personal relationship manager",
    svg: require("./assets/welcome.svg"),
    colors: ["#FFFFFF", "#FFFFFF"]
  },
  {
    key: "slide-2",
    title: "Keep track of the people that matter",
    text: "From coworkers to dates, along with friends and family",
    svg: require("./assets/track.svg"),
    colors: ["#A3A1FF", "#3A3897"]
  },
  {
    key: "slide-3",
    title: "Write down your interactions",
    text: "And remember what you talked about last time",
    svg: require("./assets/notes.svg"),
    colors: ["#A3A1FF", "#3A3897"]
  },
  {
    key: "end",
    title: "Be a better friend",
    text: "Be reminded of calling your loved ones.",
    svg: require('./assets/friends.svg'),
    colors: ["#29ABE2", "#4F00BC"]
  }
];

export default ({ navigation }) => {
  const [user, loading] = useAuthState(firebase.auth());

  React.useEffect(() => {
    if (user) {
      navigation && navigation.navigate("Root");
    }
  }, [user]);

  _renderItem = ({ item, dimensions }) => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          flex: 1,
          paddingTop: item.topSpacer,
          paddingBottom: item.bottomSpacer,
          width: dimensions.width
        }
      ]}
      colors={item.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      {item.svg && <SvgUri width="320" height="320" style={styles.image} source={item.svg} />}
      {item.image && <Image style={styles.image} source={item.image} />}
      {item.icon && (
        <Ionicons
          style={{ backgroundColor: "transparent" }}
          name={item.icon}
          size={200}
          color="white"
        />
      )}
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </LinearGradient>
  );

  _renderNextButton = () => {
    return (
      !loading && (
        <View style={styles.buttonCircle}>
          <Ionicons
            name="md-arrow-round-forward"
            color="rgba(255, 255, 255, .9)"
            size={24}
            style={{ backgroundColor: "transparent" }}
          />
        </View>
      )
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  };

  _onDone = () => {
    navigation && navigation.navigate("Signup");
  };

  return (
    <AppIntroSlider
      renderItem={this._renderItem}
      slides={slides}
      onDone={this._onDone}
      renderDoneButton={this._renderDoneButton}
      renderNextButton={this._renderNextButton}
    />
  );
};

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 320,
    height: 320
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  text: {
    color: "rgba(0, 0, 0, 0.8)",
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    color: "black",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16
  }
});
