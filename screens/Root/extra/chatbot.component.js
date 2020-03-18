import React from "react";
import {
    Dimensions
} from 'react-native';
import ChatBot from "react-native-chatbot-expo";

export const Chatbot = ({ steps }) => (
  <ChatBot
    steps={steps}
    style={{
        flex: 1,
        flexDirection: "column",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width
    }}
    contentStyle={{
        flex: 1,
      paddingBottom: 50,
      flex: 1,
      backgroundColor: "white",
      overflow: 'hidden',
      position: 'absolute'
    }}
    botBubbleColor={"#BEE1ED"}
    botFontColor={"#000"}
    hideSubmitButton={true}
    enableMobileAutoFocus={true}
    hideUserAvatar={true}
    userDelay={0}
    footerStyle={{ padding: 5, flex: 1 }}
    textInputStyle={{ flex:1, width: Dimensions.get("screen").width - 450 }}
    submitButtonStyle={{ width: 200 }}
    submitButtonContent="S"
  />
);
