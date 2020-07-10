import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");
const maxWidth = width * 0.7;

export const Bubble = styled.View`
  borderWidth: 1;
  background-color: #fff;
  border-top-left-radius: 18;
  border-top-right-radius: 18;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 18;
  padding-top: 12;
  padding-bottom: 12;
  padding-left: 12;
  padding-right: 12;
  margin-top: 0;
  margin-right: 6
  margin-bottom: 10;
  margin-left: 6
  max-width: ${() => maxWidth};
  min-height: 42px;
`;