import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, ListItem, Text } from "@ui-kitten/components";
import TextAvatar from "react-native-text-avatar";

export const MessageItem = props => {
  const { people, ...listItemProps } = props;

  /*const renderMessageDate = (style, index) => (
    <View style={styles.dateContainer}>
      {message.isRead && <DoneAllIcon />}
      <Text style={styles.dateText} appearance="hint" category="c1">
        {message.date}
      </Text>
    </View>
  );*/

  const renderProfileAvatar = () =>
    people.photo ? (
      <Avatar style={styles.avatar} source={people.photo} />
    ) : (
      <TextAvatar size={40} type={"circle"}>
        {people.name}
      </TextAvatar>
    );

  return (
    <ListItem
      {...listItemProps}
      title={people.name}
      description={people.dateAdded}
      icon={renderProfileAvatar}
      //accessory={renderMessageDate}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: null
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  dateText: {
    textAlign: "right",
    minWidth: 64
  }
});
