import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../../types";
import React from "react";
import Wave from "../../components/Wave";
import WaterIntakeCalculator from "../../components/WaterIntakeCalculator";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
    minWidth: "80%",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
    minWidth: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  info: {
    marginTop: 20,
  },
  dataTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  dataItem: {
    marginVertical: 5,
  },
});

export default Home;
