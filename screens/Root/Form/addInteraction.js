import React, { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { firebase, getCurrentUserInteractionsCollection } from "../../../core/config/firebase.config";

export async function handleEnd({ steps }) {
  console.log(steps);
  const { name, mean, about } = steps;
  const peopleDoc = await getCurrentUserInteractionsCollection(name.value);
  console.log(peopleDoc);
  return await peopleDoc.update({
    interactions: firebase.firestore.FieldValue.arrayUnion({
      mean: mean.value,
      about: about.value,
      dateAdded: dayjs.utc().local().format(),
    }),
  });
}

const NameSetter = ({ triggerNextStep, value }) => {
  let data = { value: value, trigger: 'end-message' };

  useEffect(() => {
    triggerNextStep(data);
  }, []);

  return null;
};

export const steps = (people) => [
  {
    id: "0",
    message: `I'm glad to hear you're keeping in touch!`,
    trigger: "1",
  },
  {
    id: "1",
    message: `How did you get in touch with ${people} ?`,
    trigger: "mean",
  },
  {
    id: "mean",
    options: [
      { value: "in_person", label: "In person", trigger: "3" },
      { value: "email", label: "By email", trigger: "3" },
      { value: "phonecall", label: "By phone", trigger: "3" },
    ],
  },
  {
    id: "3",
    message: "Great! And what did you discuss ?",
    trigger: "about",
  },
  {
    id: "about",
    user: true,
    trigger: "name",
  },
  {
    id: "name",
    component: <NameSetter value={people} />,
  },
  {
    id: "end-message",
    message: "Noted!",
    end: true,
  },
  
];
