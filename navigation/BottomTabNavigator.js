import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import PeopleScreen from '../screens/Root/People/';
import RemindersScreen from '../screens/Root/Reminders/';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions();

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={PeopleScreen}
        options={{
          title: 'People',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={RemindersScreen}
        options={{
          title: 'Reminders',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-clock" />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={LinksScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />,
        }}
      />
    </BottomTab.Navigator>
  );
}