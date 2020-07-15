import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-native-datepicker";
import { Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import hdate from 'human-date';


import { Bubble } from './Bubble.component';

const TODAY = dayjs().format('YYYY-MM-DD')

export const Picker = ({ triggerNextStep }) => {
  const [date, setDate] = useState(null);
  const picker = useRef(null);

  let data = { value: date, trigger: "end-message" };

  useEffect(() => {
      if(picker.current) {
          console.log('picker', picker);
          picker.current.onPressDate();
      }
  }, [picker]);

  return (
      <React.Fragment>
    <Bubble style={{...styles.container }}>
      <Text>Please remind me on {hdate.prettyPrint(date)}</Text>
    </Bubble>
    <DatePicker
    ref={picker}
    showIcon={false}
    hideText={true}
    date={date}
    mode="date"
    placeholder="Select date"
    format="YYYY-MM-DD"
    minDate={TODAY}
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    onDateChange={date => {
        console.log('date changed', date);
        setDate(date)
    }}
  />
  </React.Fragment>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap"
    },
    input: {
      backgroundColor: "white",
      borderWidth: 0,
      borderColor: "white",
      borderBottomColor: 'black',
  
    },
  });