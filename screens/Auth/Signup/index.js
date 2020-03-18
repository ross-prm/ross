import React from "react";
import { View } from "react-native";
import {
  Button,
  CheckBox,
  Input,
  Text,
  StyleService,
  useStyleSheet
} from "@ui-kitten/components";
import { ImageOverlay } from "../extra/image-overlay.component";
import { ProfileAvatar } from "../extra/profile-avatar.component";
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  PersonIcon,
  PlusIcon
} from "../extra/icons";
import { KeyboardAvoidingView } from "../extra/3rd-party";

import { Loader } from "../../../components/Loader/";

import { useAuthState } from "react-firebase-hooks/auth";
import {
  firebase,
  getCurrentUserCollection,
  getCurrentUserPeopleCollection
} from "../../../core/config/firebase.config";

export default ({ navigation }) => {
  const [userName, setUserName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const styles = useStyleSheet(themedStyles);

  const [user, loading, error] = useAuthState(firebase.auth());
  const [updated, setUpdated] = React.useState(false);
  const [isVisible, setIsLoaderVisible] = React.useState(false);

  const setUserDetailsInFirestore = async ({ email, userName }) => {
    const userDocRef = await getCurrentUserCollection();
    return userDocRef.set({
      email,
      userName
    });
  };

  const createPeopleCollection = async () => {
    const peopleCollection = await getCurrentUserPeopleCollection();
    return await peopleCollection.add({
      isDev: true
    });
  };

  React.useEffect(() => {
    if (updated && user) {
      setIsLoaderVisible(false);
      navigation.navigate("Root");
    }
  }, [updated]);

  React.useEffect(() => setIsLoaderVisible(loading), [loading]);
  React.useEffect(() => (error ? setIsLoaderVisible(false) : () => null), [
    error
  ]);

  const isFormCompleted = () => termsAccepted && email && password && userName;

  const onSignUpPress = async () => {
    setIsLoaderVisible(true);
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await Promise.all([updateProfile(), createPeopleCollection()]);
    return setUpdated(true);
  };

  const updateProfile = async () =>
    await setUserDetailsInFirestore({ email, userName });

  const onSignInButtonPress = () => {
    navigation && navigation.navigate("Login");
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPhotoButton = () => (
    <Button style={styles.editAvatarButton} size="small" icon={PlusIcon} />
  );

  return (
    <React.Fragment>
      <Loader visible={isVisible} />
      <KeyboardAvoidingView>
        <ImageOverlay
          style={styles.container}
          source={require("../assets/image-background.jpg")}
        >
          <View style={styles.headerContainer}>
            <ProfileAvatar
              style={styles.profileAvatar}
              resizeMode="center"
              source={require("../assets/ross.png")}
            />
            <Text style={[styles.termsCheckBoxText, styles.title]}>Let's start by creating an account</Text>
          </View>
          <View style={styles.formContainer}>
            <Input
              status="control"
              autoCapitalize="none"
              placeholder="Your Name"
              icon={PersonIcon}
              value={userName}
              onChangeText={setUserName}
            />
            <Input
              style={styles.formInput}
              status="control"
              autoCapitalize="none"
              placeholder="Email"
              icon={EmailIcon}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              style={styles.formInput}
              status="control"
              autoCapitalize="none"
              secureTextEntry={!passwordVisible}
              placeholder="Password"
              icon={passwordVisible ? EyeIcon : EyeOffIcon}
              value={password}
              onChangeText={setPassword}
              onIconPress={onPasswordIconPress}
            />
            <CheckBox
              style={styles.termsCheckBox}
              textStyle={styles.termsCheckBoxText}
              text="I read and agree to Terms & Conditions"
              checked={termsAccepted}
              onChange={checked => setTermsAccepted(checked)}
            />
          </View>
          <Button
            disabled={!isFormCompleted()}
            style={styles.signUpButton}
            size="giant"
            onPress={onSignUpPress}
          >
            SIGN UP
          </Button>
          <Button
            style={styles.signInButton}
            appearance="ghost"
            status="control"
            onPress={onSignInButtonPress}
          >
            Already have account? Sign In
          </Button>
        </ImageOverlay>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  headerContainer: {
    marginTop: 25,
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: 176
  },
  profileAvatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignSelf: "center",
    backgroundColor: "background-basic-color-1"
    //tintColor: "text-hint-color"
  },
  editAvatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16
  },
  formInput: {
    marginTop: 16
  },
  termsCheckBox: {
    marginTop: 24
  },
  termsCheckBoxText: {
    color: "text-control-color"
  },
  signUpButton: {
    marginHorizontal: 16
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16
  },
  socialAuthContainer: {
    marginTop: 24
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16
  },
  title: {
    fontSize: 22,
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16
  }
});
