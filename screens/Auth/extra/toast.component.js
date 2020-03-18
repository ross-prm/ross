import React from "react";
import { WSnackBar } from "react-native-smart-tip";

const showToast = ({message, action, isError = false, actionClick = () => {}}) => {
  const snackBarOpts = {
    data: message,
    height: 50,
    position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
    duration: WSnackBar.duration.LONG, //1.SHORT 2.LONG 3.INDEFINITE
    textColor: isError ? "#fff" : "#ff490b",
    backgroundColor: isError ? "#ff490b" : "#fff",
    actionText: action,
    actionTextColor: "#ff490b",
    actionClick: actionClick
  };

  WSnackBar.show(snackBarOpts);
};

export { showToast };