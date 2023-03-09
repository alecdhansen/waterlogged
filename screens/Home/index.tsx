import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../../types";
import React from "react";
import Wave from "../../components/Wave";
import WaterIntakeCalculator from "../../components/WaterIntakeCalculator";
import styles from "./style";

const myProgress = 0 / 450;

const screenHeight = Dimensions.get("screen").height;
export const DAILYPROGRESS = myProgress * screenHeight;

const Home = ({ navigation }: RootTabScreenProps<"Home">) => {
  return (
    <ScrollView style={styles.container}>
      <WaterIntakeCalculator />
      <Wave />
    </ScrollView>
  );
};

export default Home;
