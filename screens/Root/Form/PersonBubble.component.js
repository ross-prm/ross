import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { Input } from "@ui-kitten/components";

import { Bubble } from './Bubble.component';
import { useDebounce } from "../../../utils/useDebounce";

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
    borderRadius: 0,
    borderColor: "white",
    borderBottomColor: 'black',

  },
});
