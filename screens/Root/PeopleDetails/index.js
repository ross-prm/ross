import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Layout, Button } from "@ui-kitten/components";
import TextAvatar from "react-native-text-avatar";
import Timeline from "react-native-beautiful-timeline";

const renderTitle = (title ) => {
  switch(title) {
    case 'in_person':
      return "You discussed in person about"
    case 'email':
      return "You discussed by e-mail about"
    case 'phonecall':
      return "You discussed over the phone about"
    default:
      break;
  }
}

export default ({ navigation, user }) => {
  const addInteraction = () =>
    navigation &&
    navigation.navigate("Add", {
      screen: "NewInteraction",
      params: { user: user },
    });

  const addReminder = () =>
    navigation &&
    navigation.navigate("Add", {
      screen: "NewReminder",
      params: { user: user },
    });


  const { name, bio, interactions } = user;
  const isInteractions = interactions.length > 0;

  return (
    <Layout style={styles.container} level="2">
      <Layout style={styles.header} level="1">
        <View style={styles.profileContainer}>
          <TextAvatar size={40} type={"circle"}>
            {name}
          </TextAvatar>
          <View style={styles.profileDetailsContainer}>
            <Text category="h4">{name}</Text>
          </View>
        </View>
        <Text style={styles.bioText} appearance="hint">
          {bio}
        </Text>
        <Button style={styles.interactionButton} onPress={addInteraction}>
          Add a new interaction
        </Button>
        <Button style={styles.interactionButton} onPress={addReminder}>
          Add a reminder
        </Button>
      </Layout>
      <View>
      {isInteractions && <Timeline style={{paddingTop: 50}} data={interactions} renderTitle={renderTitle} />}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  profileContainer: {
    flexDirection: "row",
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  interactionButton: {
    marginTop: 24,
  },
  bioText: {
    marginTop: 24,
    marginBottom: 8,
  }
});
