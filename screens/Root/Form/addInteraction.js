import React, { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import {
  firebase,
  getCurrentUserInteractionsCollection,
} from "../../../core/config/firebase.config";

import { Picker } from './Datepicker.component';

const checkIfInteractionAtDate = (interactions, date) =>
  interactions.findIndex((interaction) =>
    interaction.date && dayjs(interaction.date).isSame(date, "day")
  );

export async function handleEnd({ steps }) {
  console.log(steps);
  const { name, mean, about } = steps;
  const now = dayjs.utc().local().valueOf();
  const { ref, records } = await getCurrentUserInteractionsCollection(name.value);
  console.log('records', records);
  const isSameDayInteractionIndex = checkIfInteractionAtDate(
    records.interactions,
    now
  );
  if (isSameDayInteractionIndex > -1) {
    let sameDayInteraction = records.interactions[isSameDayInteractionIndex];
    sameDayInteraction.data = [
      {
        title: mean.value,
        subtitle: about.value,
        date: now,
      },
      ...sameDayInteraction.data,
    ];
    return await ref.update({
      interactions: [
        ...records.interactions.slice(0, isSameDayInteractionIndex),
        sameDayInteraction,
        ...records.interactions.slice(isSameDayInteractionIndex + 1),
      ],
    });
  } else {
    return await ref.update({
      interactions: firebase.firestore.FieldValue.arrayUnion({
        date: now,
        data: [
          {
            title: mean.value,
            subtitle: about.value,
            date: now,
          },
        ],
      }),
    });
  }
}

const NameSetter = ({ triggerNextStep, value }) => {
  let data = { value: value, trigger: "end-message" };

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
    trigger: 'ask-reminder'
  },
  {
    id: "ask-reminder",
    message: "Would you like to be reminded to follow up on this ?",
    trigger: "ask-reminder-choice"
  },
  {
    id: 'ask-reminder-choice',
    options: [
      { value: "yes", label: 'Yes', trigger: 'ask-reminder-date' },
      { value: "no", label: 'No', trigger: 'end-message' },
    ],
  },
  {
    id: "ask-reminder-date",
    message: "When would you like to be reminded ?",
    trigger: "set-reminder-date"
  },
  {
    id: "set-reminder-date",
    component: <Picker />,
    waitAction: true,
    end: true
  }

];
