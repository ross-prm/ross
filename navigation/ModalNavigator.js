import * as React from "react";
import Chatbot from '../screens/Root/Form/index';
import {
    Text,
    Button
} from "@ui-kitten/components";
import {createStackNavigator} from '@react-navigation/stack';

import { createNewPeople, steps} from '../screens/Root/Form/addPeople';
import addInteractionConvo from '../screens/Root/Form/addInteraction';

const Stack = createStackNavigator();

export default function StackNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewPeople"
        component={() => <Chatbot steps={steps} handleEnd={createNewPeople} navigation={navigation} />}
        stackAnimation={"fade"}
        options={{
            headerTitle: () => <Text>New People</Text>,
            headerLeft: () => (
                <Button
                    appearance="ghost"
                    status="basic"
                    onPress={() => navigation.goBack()}
                >
                    Cancel
                </Button>
            ),
          }}
      />

    <Stack.Screen
        name="NewInteraction"
        component={() => <Chatbot steps={addInteractionConvo} />}
        stackAnimation={"fade"}
        options={{
            headerTitle: () => <Text>New Interaction</Text>,
            headerLeft: () => (
                <Button
                    appearance="ghost"
                    status="basic"
                    onPress={() => navigation.goBack()}
                >
                    Cancel
                </Button>
            ),
          }}
      />
    </Stack.Navigator>
  );
}
