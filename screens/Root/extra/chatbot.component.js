import React from "react";
import { Dimensions } from "react-native";
import ChatBot from "react-native-chatbot-expo";

export const Chatbot = ({ steps, handleEnd }) => (
  <ChatBot
    steps={steps}
    contentStyle={{
      backgroundColor: "white"
    }}
    botBubbleColor={"#BEE1ED"}
    botFontColor={"#000"}
    hideSubmitButton={true}
    enableMobileAutoFocus={true}
    hideUserAvatar={true}
    userDelay={0}
    footerStyle={{ marginBottom: 25 }}
    submitButtonContent="Send"
    handleEnd={handleEnd}
    //botAvatar={require('../assets/image-profile-1.jpg')}
  />
);
