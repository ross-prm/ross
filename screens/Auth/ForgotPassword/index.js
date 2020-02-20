import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { ImageOverlay } from "../extra/image-overlay.component";
import { EmailIcon } from "../extra/icons";
import { KeyboardAvoidingView } from "../extra/3rd-party";

import { Loader } from "../../../components/Loader/";

import { firebase } from "../../../core/config/firebase.config";

export default ({ navigation }) => {
  const [email, setEmail] = React.useState();
  const [isVisible, setIsVisible] = React.useState(false);

  const onResetPress = async () => {
    setIsVisible(true);
    await firebase.auth().sendPasswordResetEmail(email);
    setIsVisible(false);
    navigation.navigate("Login");
  };

  const isButtonDisabled = () => !email;

  const onRememberPasswordButtonPress = () => navigation.navigate("Login");

  return (
    <React.Fragment>
      <Loader visible={isVisible} />
      <KeyboardAvoidingView>
        <ImageOverlay
          style={styles.container}
          source={require("../assets/image-background.jpg")}
        >
          <Text
            style={styles.forgotPasswordLabel}
            category="h4"
            status="control"
          >
            Forgot Password
          </Text>
          <Text style={styles.enterEmailLabel} status="control">
            Please enter your email address
          </Text>
          <View style={styles.formContainer}>
            <Input
              status="control"
              placeholder="Email"
              icon={EmailIcon}
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.forgotPasswordContainer}>
              <Button
                style={styles.forgotPasswordButton}
                appearance="ghost"
                status="control"
                onPress={onRememberPasswordButtonPress}
              >
                Remember your password?
              </Button>
            </View>
          </View>
          <Button
            disabled={isButtonDisabled()}
            size="giant"
            onPress={onResetPress}
          >
            RESET PASSWORD
          </Button>
        </ImageOverlay>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingTop: 50
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 24
  },
  forgotPasswordLabel: {
    zIndex: 1,
    alignSelf: "center",
    marginTop: 24
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  forgotPasswordButton: {
    paddingHorizontal: 0
  },
  enterEmailLabel: {
    zIndex: 1,
    alignSelf: "center",
    marginTop: 64
  }
});
