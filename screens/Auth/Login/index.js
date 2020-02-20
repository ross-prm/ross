import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { ImageOverlay } from "../extra/image-overlay.component";
import {
  EyeIcon,
  EyeOffIcon,
  FacebookIcon,
  GoogleIcon,
  PersonIcon,
  TwitterIcon
} from "../extra/icons";
import { KeyboardAvoidingView } from "../extra/3rd-party";

import { Loader } from "../../../components/Loader/";

import { useAuthState } from "react-firebase-hooks/auth";
import { firebase } from "../../../core/config/firebase.config";

export default ({ navigation }) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [user, loading, error] = useAuthState(firebase.auth());
  const [isVisible, setIsLoaderVisible] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setIsLoaderVisible(false);
      navigation.navigate("Root");
    }
  }, [user]);

  const onSignInPress = () => {
    firebase.auth().signInWithEmailAndPassword(email, password);
    setIsLoaderVisible(true);
  };

  const onSignInWithGooglePress = async () => {
    const result = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log('result', result);
    setIsLoaderVisible(true);
  };

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate("Signup");
    setIsLoaderVisible(false);
  };

  const onForgotPasswordButtonPress = () => {
    navigation && navigation.navigate("ForgotPassword");
    setIsLoaderVisible(false);
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <React.Fragment>
      <Loader visible={isVisible} />
      <KeyboardAvoidingView>
        <ImageOverlay
          style={styles.container}
          source={require("../assets/image-background.jpg")}
        >
          <View style={styles.headerContainer}>
            <Text category="h1" status="control">
              Hello
            </Text>
            <Text style={styles.signInLabel} category="s1" status="control">
              Sign in to your account
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Input
              type="email"
              status="control"
              placeholder="Email"
              icon={PersonIcon}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              type="password"
              style={styles.passwordInput}
              status="control"
              placeholder="Password"
              icon={passwordVisible ? EyeIcon : EyeOffIcon}
              value={password}
              secureTextEntry={!passwordVisible}
              onChangeText={setPassword}
              onIconPress={onPasswordIconPress}
            />
            <View style={styles.forgotPasswordContainer}>
              <Button
                style={styles.forgotPasswordButton}
                appearance="ghost"
                status="control"
                onPress={onForgotPasswordButtonPress}
              >
                Forgot your password?
              </Button>
            </View>
          </View>
          <Button
            style={styles.signInButton}
            size="giant"
            onPress={onSignInPress}
          >
            SIGN IN
          </Button>
          
          <Button
            style={styles.signUpButton}
            appearance="ghost"
            status="control"
            onPress={onSignUpButtonPress}
          >
            Don't have an account? Sign Up
          </Button>
        </ImageOverlay>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: "center",
    alignItems: "center"
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  signInLabel: {
    marginTop: 16
  },
  passwordInput: {
    marginTop: 16
  },
  signInButton: {
    marginHorizontal: 16
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  forgotPasswordButton: {
    paddingHorizontal: 0
  },
  signUpButton: {
    marginVertical: 12
  },
  socialAuthContainer: {
    opacity: 0,
    marginTop: 32
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16
  }
});
