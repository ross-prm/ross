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
import { Chatbot } from '../extra/chatbot.component';
import { TouchableOpacity } from "react-native-gesture-handler";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { getCurrentUserPeopleCollection } from "../../../core/config/firebase.config";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState();
  const [values, loading, error] = useCollectionData(
    getCurrentUserPeopleCollection(),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const [valuesCount, setValuesCount] = React.useState(0);

  React.useEffect(() => {
    if (values && values.length !== valuesCount) {
      console.log("values", values);
      setValuesCount(values.length);
      modal.close();
    }
  }, [values]);

  let modal = React.useRef(null);

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
    const [isAddEnabled, setAddEnabled] = React.useState(false);
    const [name, setName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [bio, setBio] = React.useState(null);

    React.useEffect(() => {
      return setAddEnabled(!!name);
    }, [name]);

    const renderCancel = () => (
      <TouchableOpacity onPress={() => modal.close()}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    );

    const renderAdd = () => (
      <TouchableOpacity
        disabled={!isAddEnabled}
        onPress={async () => {
          setAddEnabled(false);
          await createNewPeople({
            name: name,
            phone: phone,
            email: email,
            bio: bio,
            interactions: []
          });
        }}
      >
        <Text style={{ color: isAddEnabled ? "green" : "black" }}>Add</Text>
      </TouchableOpacity>
    );

    const renderAddPersonForm = () => {
      const steps = [
        {
          id: "0",
          message: "Welcome to react chatbot!",
          trigger: "1"
        },
        {
          id: "1",
          message: "What is your name?",
          trigger: "name"
        },
        {
          id: "name",
          user: true,
          trigger: "3"
        },
        {
          id: "3",
          message: "Hi {previousValue}! What is your gender?",
          trigger: "gender"
        },
        {
          id: "gender",
          options: [
            { value: "male", label: "Male", trigger: "5" },
            { value: "female", label: "Female", trigger: "5" }
          ]
        },
        {
          id: "5",
          message: "How old are you?",
          trigger: "age"
        },
        {
          id: "age",
          user: true,
          trigger: "7",
          validator: value => {
            if (isNaN(value)) {
              return "value must be a number";
            } else if (value < 0) {
              return "value must be positive";
            } else if (value > 120) {
              return `${value}? Come on!`;
            }

            return true;
          }
        },
        {
          id: "7",
          message: "Great! Check out your summary",
          trigger: "update"
        },
        {
          id: "update",
          message: "Would you like to update some field?",
          trigger: "update-question"
        },
        {
          id: "update-question",
          options: [
            { value: "yes", label: "Yes", trigger: "update-yes" },
            { value: "no", label: "No", trigger: "end-message" }
          ]
        },
        {
          id: "update-yes",
          message: "What field would you like to update?",
          trigger: "update-fields"
        },
        {
          id: "update-fields",
          options: [
            { value: "name", label: "Name", trigger: "update-name" },
            { value: "gender", label: "Gender", trigger: "update-gender" },
            { value: "age", label: "Age", trigger: "update-age" }
          ]
        },
        {
          id: "update-name",
          update: "name",
          trigger: "7"
        },
        {
          id: "update-gender",
          update: "gender",
          trigger: "7"
        },
        {
          id: "update-age",
          update: "age",
          trigger: "7"
        },
        {
          id: "end-message",
          message: "Thanks! Your data was submitted successfully!",
          end: true
        }
      ];
      return (
        <Chatbot steps={steps} />
      );
    };

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
                leftControl={renderCancel()}
                title="New Person"
                alignment="center"
                //rightControls={renderAdd(modal)}
              />
            </Layout>
            {renderAddPersonForm()}
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
  const { list, set, filter, reset } = useList(data);

  React.useEffect(() => {
    if (data) {
      set(data);
    }
  }, [data]);

  React.useEffect(() => {
    if (searchQuery) {
      filter(people => people.name.indexOf(searchQuery) > -1);
    } else {
      reset();
    }
  }, [searchQuery]);

  const renderItem = info => (
    <MessageItem style={styles.item} people={info.item} onPress={() => null} />
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
    paddingLeft: 5,
    paddingRight: 10
  },
  title: {
    fontSize: 20,
    lineHeight: 19
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey"
  },
  buttonWrapper: {
    backgroundColor: "#2dbded",

    height: 40,
    justifyContent: "center",
    width: 200,
    borderRadius: 24
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center"
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: "#FFF",
    borderColor: "black",
    borderWidth: 1
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 14,
    color: "#333"
  },
  text: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto"
  },
  label: {
    textAlign: "left"
  }
});
