import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Input,
  Layout,
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

import { useList } from "react-hooks-lib";
import { MessageItem } from "../extra/message-item.component";
import { PersonAddIcon, SearchIcon } from "../extra/icons";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { getCurrentUserPeopleCollection } from "../../../core/config/firebase.config";

export default ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState();
  const [values, loading, error] = useCollectionData(
    getCurrentUserPeopleCollection(),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [valuesCount, setValuesCount] = React.useState(0);

  React.useEffect(() => {
    if (values && values.length !== valuesCount) {
      console.log("values", values);
      setValuesCount(values.length);
    }
  }, [values]);

  let modal = React.useRef(null);

  const renderMenuAction = () => (
    <TopNavigationAction icon={PersonAddIcon} onPress={() => addPerson()} />
  );

  const renderHeader = () => (
    <Layout style={styles.header} level="1">
      <TopNavigation
        leftControl={<Text style={styles.title}>People</Text>}
        rightControls={renderMenuAction()}
      />
      <Input
        placeholder="Search"
        value={searchQuery}
        icon={SearchIcon}
        onChangeText={setSearchQuery}
      />
    </Layout>
  );

  const addPerson = () =>
    navigation && navigation.navigate("Add", {
      screen: 'NewPeople',
    });

  return (
    <View style={styles.container}>
      {renderHeader()}
      {values && (
        <ListComponent
          data={values.filter((item) => !item.isDev)}
          searchQuery={searchQuery}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const ListComponent = ({ navigation, data, searchQuery }) => {
  const { list, set, filter, reset } = useList(data);

  React.useEffect(() => {
    if (data) {
      set(data);
    }
  }, [data]);

  React.useEffect(() => {
    if (searchQuery) {
      filter((people) => people.name.indexOf(searchQuery) > -1);
    } else {
      reset();
    }
  }, [searchQuery]);

  const renderItem = (info) => (
    <MessageItem
      style={styles.item}
      people={info.item}
      onPress={() => addInteraction(info.item)}
    />
  );

  const addInteraction = (item) => {
    navigation && navigation.navigate("Add", {
      screen: 'NewInteraction',
      params: { user: item }
    });
  };

  return (
    <List
      style={styles.list}
      data={list}
      renderItem={renderItem}
      searchQuery={searchQuery}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerModal: {
    flex: 1,
    height: "100%",
    paddingLeft: 5,
    paddingRight: 10,
  },
  title: {
    fontSize: 20,
    lineHeight: 19,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  buttonWrapper: {
    backgroundColor: "#2dbded",

    height: 40,
    justifyContent: "center",
    width: 200,
    borderRadius: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center",
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: "#FFF",
    borderColor: "black",
    borderWidth: 1,
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 14,
    color: "#333",
  },
  text: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
  },
  label: {
    textAlign: "left",
  },
});
