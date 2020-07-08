import React, { useState, useEffect } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { Input } from "@ui-kitten/components";
import styled from "styled-components/native";

import { useDebounce } from "../../../utils/useDebounce";

const { width } = Dimensions.get("window");
const maxWidth = width * 0.7;

const Bubble = styled.View`
  borderWidth: 1;
  background-color: #fff;
  border-top-left-radius: 18;
  border-top-right-radius: 18;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 18;
  padding-top: 12;
  padding-bottom: 12;
  padding-left: 12;
  padding-right: 12;
  margin-top: 0;
  margin-right: 6
  margin-bottom: 10;
  margin-left: 6
  max-width: ${() => maxWidth};
  min-height: 42px;
`;

export default Bubble;

export const AddFromContacts = ({ triggerNextStep }) => {
    const [accessDenied, setAccessDenied ] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }
      }
      else {

      }
    })();
  }, []);

  return (
    <Bubble style={styles.container}>
      <Text>I would like to add </Text>
      <Input
        style={styles.input}
        placeholder="John Doe"
        value={value}
        disabled={isDisabled}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <Text>to my contacts.</Text>
    </Bubble>
  );
};
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Contacts Module Example</Text>
    </View>
  );
}