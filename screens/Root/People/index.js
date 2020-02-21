import React from "react";
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  TextInput
} from "react-native";
import {
  Input,
  Layout,
  List,
  Text,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";
import Textarea from "react-native-textarea";

import { useList } from "react-hooks-lib";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-native-modalbox";
import { MessageItem } from "../extra/message-item.component";
import { PersonAddIcon, SearchIcon } from "../extra/icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { getCurrentUserPeopleCollection } from "../../../core/config/firebase.config";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState();
  const { control, handleSubmit, errors } = useForm();
  const [values, loading, error] = useCollectionData(
    getCurrentUserPeopleCollection()
  );

  const [valuesCount, setValuesCount] = React.useState(0);

  React.useEffect(() => {
    if (values && values.length !== valuesCount) {
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
      return (
        <View style={styles.container}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
          />
          <Input
            label="E-mail"
            placeholder="john@doe.com"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Phone Number"
            placeholder="08 36 65 65 65"
            value={phone}
            onChangeText={setPhone}
          />
          <Text style={[styles.text, styles.label]}>Bio</Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={setBio}
            defaultValue={bio}
            maxLength={240}
            placeholder={"Works at Microsoft, etc..."}
            underlineColorAndroid={"transparent"}
          />
        </View>
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
                rightControls={renderAdd(modal)}
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
  const { list, filter, reset } = useList(data);

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
