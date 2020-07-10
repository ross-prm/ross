import React, { useState } from "react";

import { StyleSheet, Dimensions } from "react-native";
import { Button } from "@ui-kitten/components";
import { Bubble } from "./Bubble.component";

import TagInput from 'react-native-tags-input'; 

const { width } = Dimensions.get("window");
const maxWidth = width * 0.7;

import { useCollectionData } from "react-firebase-hooks/firestore";
import { getCurrentUserTagsCollection } from "../../../core/config/firebase.config";

export const TagPicker = ({ triggerNextStep }) => {
const [tags, setTags] = useState({
    tag: '',
    tagsArray: []
    })
  const [text, setText] = useState("");
  const [values, loading, error] = useCollectionData(
    getCurrentUserTagsCollection(),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  let data = { value: tags.tagsArray, trigger: "end-message" };

  const onButtonPress = () => {
    triggerNextStep(data);
  };

  return (
    <Bubble style={styles.container}>
      <TagInput
          updateState={setTags}
          tags={tags}
          containerStyle={styles.container}
          autoCorrect={false}
          keysForTag={', '}/>
      <Button status="control" onPress={onButtonPress}>
        Done
      </Button>
    </Bubble>
  );
};

const styles = StyleSheet.create({
  container: {
      minWidth: maxWidth,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
