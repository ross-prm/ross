import * as React from "react";
import Chatbot from '../screens/Root/Form/index';
import {
    Text,
    Button
} from "@ui-kitten/components";
import {createStackNavigator} from '@react-navigation/stack';

import * as addPeople from '../screens/Root/Form/addPeople';
import * as addInteraction from '../screens/Root/Form/addInteraction';

const Stack = createStackNavigator();

export default function StackNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewPeople"
        component={() => <Chatbot steps={addPeople.steps} navigation={navigation} handleEnd={addPeople.handleEnd} />}
        stackAnimation={"fade"}
        options={{
            headerTitle: null,
            headerLeft: () => (
                <Button
                    appearance="ghost"
                    status="basic"
                    onPress={() => navigation.goBack()}
                >
                    Cancel
                </Button>
            ),
            headerStyle: {
              borderWidth: 0
            }
          }}
      />

    <Stack.Screen
        name="NewInteraction"
        component={({route:{params:{user}}}) => <Chatbot steps={addInteraction.steps(user.name)} navigation={navigation} handleEnd={addInteraction.handleEnd} />}
        stackAnimation={"fade"}
        options={{
            headerTitle: null,
            headerLeft: () => (
                <Button
                    appearance="ghost"
                    status="basic"
                    onPress={() => navigation.goBack()}
                >
                    Cancel
                </Button>
            ),
            headerStyle: {
              borderWidth: 0
            }
          }}
      />
    </Stack.Navigator>
  );
}
