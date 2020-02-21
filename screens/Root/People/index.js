import React from "react";
import { ScrollView, View, Dimensions, StyleSheet } from "react-native";
import {
  Input,
  Layout,
  List,
  Text,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";
import { useList } from "react-hooks-lib";
import Modal from "react-native-modalbox";
import { MessageItem } from "../extra/message-item.component";
import { PersonAddIcon, SearchIcon } from "../extra/icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  getCurrentUserPeopleCollection
} from "../../../core/config/firebase.config";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState();
  const [values, loading, error] = useCollectionData(
    getCurrentUserPeopleCollection()
  );

  let modal = React.createRef();

  const onItemPress = index => {
    //navigation && navigation.navigate('Chat1');
  };

  const createNewPeople = async ({ name, phone, email, bio, dateAdded }) => {
    const peopleCollection = await getCurrentUserPeopleCollection();
    return await peopleCollection.add({
      name,
      phone,
      email,
      bio,
      dateAdded: dayjs
        .utc()
        .local()
        .format(),
      interactions: []
    });
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={PersonAddIcon} onPress={() => modal.open()} />
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

  const renderAddPerson = () => {
    const renderCancel = () => (
      <TouchableOpacity onPress={() => modal.close()}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    );

    return (
      <Modal
        ref={ref => (modal = ref)}
        swipeToClose={true}
        position={"bottom"}
        swipeArea={20}
      >
        <ScrollView>
          <View style={styles.headerModal}>
            <Layout style={styles.headerModal} level="1">
              <TopNavigation
                leftControl={[renderCancel()]}
                title="New Person"
                alignment="center"
                rightControls={
                  <TopNavigationAction
                    icon={SearchIcon}
                    onPress={async () =>
                      {
                          await createNewPeople({
                        name: "Jérémie",
                        phone: "0836656565",
                        email: "zz@zz.com",
                        bio: "Mec trop cool"
                      })
                      return modal.close()
                    }
                    }
                  >
                    Add
                  </TopNavigationAction>
                }
              />
            </Layout>
          </View>
        </ScrollView>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {values && (
        <ListComponent
          data={values.filter(item => !item.isDev)}
          searchQuery={searchQuery}
        />
      )}
      {renderAddPerson()}
    </View>
  );
};

const ListComponent = ({ data, searchQuery }) => {
  const { list, filter, reset } = useList(data);

  React.useEffect(() => {
    if (searchQuery) {
      filter(people => people.name.indexOf(searchQuery) > -1);
    } else {
      reset();
    }
  }, [searchQuery]);

  const renderItem = info => (
    <MessageItem
      style={styles.item}
      people={info.item}
      onPress={() => null}
    />
  );

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
    flex: 1
  },
  list: {
    flex: 1
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8
  },
  headerModal: {
    width: Dimensions.get("screen").width,
    padding: 5
  },
  title: {
    fontSize: 20,
    lineHeight: 19
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey"
  }
});
