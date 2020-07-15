import * as React from "react";
import { Button } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";

import PeopleDetails from "../screens/Root/PeopleDetails/";

const Stack = createStackNavigator();

export default function StackNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PeopleDetails"
        component={({
          route: {
            params: { user },
          },
        }) => <PeopleDetails user={user} navigation={navigation} />}
        stackAnimation={"fade"}
        options={({ navigation }) => ({
          headerTitle: null,
          headerLeft: () => (
            <Button
              appearance="ghost"
              status="basic"
              onPress={() => navigation.goBack()}
            >
              Back
            </Button>
          ),
          headerStyle: {
            borderWidth: 0,
          },
        })}
      />
    </Stack.Navigator>
  );
}
