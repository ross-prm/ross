import * as React from "react";
import Chatbot from '../screens/Root/Form/index';
import {
    Text,
    Button
} from "@ui-kitten/components";
import {createStackNavigator} from '@react-navigation/stack';

import PeopleDetails from '../screens/Root/People/peopleDetails.component';

const Stack = createStackNavigator();

export default function StackNavigator({ navigation }) {
  return (
    <Stack.Navigator>
    <Stack.Screen
        name="PeopleDetails"
        component={({route:{params:{user}}}) => <PeopleDetails user={user} navigation={navigation} />}
        stackAnimation={"fade"}
        options={({ navigation, route }) => ({
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
            headerRight: () => {
                const {params:{user} } = route;
                return (
                <Button
                    appearance="ghost"
                    status="basic"
                    onPress={() => navigation && navigation.navigate("Add", {
                        screen: 'NewInteraction',
                        params: { user: user }
                      })}
                >
                    Add interaction
                </Button>
            )},
            headerStyle: {
              borderWidth: 0
            }
          })}
      />
    </Stack.Navigator>
  );
}
