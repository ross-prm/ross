import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { getCurrentUserPeopleCollection } from "../../../core/config/firebase.config";
import { PersonBubble } from "./PersonBubble.component";
import { TagPicker } from './tagPicker.component';

export async function handleEnd({ steps }) {
  console.log(steps);
  const { name, meet_response } = steps;
  const peopleCollection = await getCurrentUserPeopleCollection();
  return await peopleCollection.add({
    name: name.value,
    phone: null,
    email: null,
    bio: meet_response.value,
    dateAdded: dayjs.utc().local().format(),
    interactions: [],
  });
}

export const steps = [
  {
    id: "0",
    message:
      "Hey, I'm Ross. I'm here to help you keep in touch with your acquaintances.",
    //trigger: "import_choice"
    trigger: "1",
  },
  /*{
      id: "import_choice",
      options: [
        { value: "import", label: "Import from contacts", trigger: "5" },
        { value: "manual", label: "Fill manually", trigger: "1" }
      ]
    },*/
  {
    id: "1",
    message: "First of all, tell me more about this new person.",
    trigger: "name",
  },
  {
    id: "name",
    component: <PersonBubble />
  },
  {
    id: "3",
    message: "Alright ! Tell me more about {previousValue}.",
    trigger: "meet",
  },

  {
    id: "meet",
    message: "How did you meet?",
    trigger: "meet_response",
  },
  {
    id: "meet_response",
    user: true,
    trigger: "end-message",
    /*validator: value => {
        if (isNaN(value)) {
          return "value must be a number";
        } else if (value < 0) {
          return "value must be positive";
        } else if (value > 120) {
          return `${value}? Come on!`;
        }
  
        return true;
      }*/
  },
  {
    id: "7",
    message: "Great! You also have to possibility to add tags so that it will be easier to filter later.",
    trigger: "8",
  },
  {
    id: "8",
    component: <TagPicker />
  },
  {
    id: "update-question",
    options: [
      { value: "yes", label: "Yes", trigger: "update-yes" },
      { value: "no", label: "No", trigger: "end-message" },
    ],
  },
  {
    id: "update-yes",
    message: "What field would you like to update?",
    trigger: "update-fields",
  },
  {
    id: "update-fields",
    options: [
      { value: "name", label: "Name", trigger: "update-name" },
      { value: "gender", label: "Gender", trigger: "update-gender" },
      { value: "age", label: "Age", trigger: "update-age" },
    ],
  },
  {
    id: "update-name",
    update: "name",
    trigger: "7",
  },
  {
    id: "update-gender",
    update: "gender",
    trigger: "7",
  },
  {
    id: "update-age",
    update: "age",
    trigger: "7",
  },
  {
    id: "end-message",
    message: "Fantastic! Your data was submitted successfully!",
    end: true,
  },
];
