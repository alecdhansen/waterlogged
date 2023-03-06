import { StyleSheet } from "react-native";
import { DAILYPROGRESS } from "../../screens/Home";
import StyleGuide from "../StyleGuide";
import { SIZE } from "./utils";

export const styles = StyleSheet.create({
  lower: {
    width: SIZE,
    height: DAILYPROGRESS,
    backgroundColor: StyleGuide.palette.primary,
  },
  svg: { backgroundColor: "transparent", marginBottom: -200 },
});
