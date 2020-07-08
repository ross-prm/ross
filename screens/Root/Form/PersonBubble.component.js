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

export const PersonBubble = ({ triggerNextStep }) => {
  const [value, setValue] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const debouncedValue = useDebounce(value, 1000);

  let data = { value: value, trigger: "3" };

  useEffect(
    () => {
      if (debouncedValue) {
        setDisabled(true);
        triggerNextStep(data);
      }
    },
    [debouncedValue] // Only call effect if debounced search term changes
  );

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  input: {
    backgroundColor: "white",
    borderWidth: 0,
    borderColor: "white",
    borderBottomColor: 'black',

  },
});
