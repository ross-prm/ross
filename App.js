import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping, light as lightTheme } from "@eva-design/eva";

import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import StackNavigator from "./navigation/StackNavigator";
import ModalNavigator from './navigation/ModalNavigator';
import PeopleNavigator from './navigation/PeopleNavigator';
import useLinking from "./navigation/useLinking";

import "./core/config/firebase.config";

const Stack = createNativeStackNavigator();
console.disableYellowBox = true;

enableScreens();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <NavigationContainer
              ref={containerRef}
              initialState={initialNavigationState}
            >
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen name="Auth" component={StackNavigator} />
                <Stack.Screen name="Root" component={BottomTabNavigator} />
                <Stack.Screen name="People" component={PeopleNavigator} />
                <Stack.Screen name="Add" component={ModalNavigator} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </ApplicationProvider>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
