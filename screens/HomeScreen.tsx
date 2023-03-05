import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

interface Consumption {
  water: string;
  time: string;
}

const HomeScreen = ({ navigation }: RootTabScreenProps<"HomeScreen">) => {
  const [water, setWater] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [data, setData] = useState<Consumption[]>([]);

  const handleSave = async () => {
    try {
      const consumption: Consumption = { water, time };
      const newData: Consumption[] = [...data, consumption];
      await AsyncStorage.setItem("waterConsumption", JSON.stringify(newData));
      setData(newData);
      console.log(`Saved water consumption data: ${JSON.stringify(newData)}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoad = async () => {
    try {
      const data = await AsyncStorage.getItem("waterConsumption");
      if (data !== null) {
        setData(JSON.parse(data));
        console.log(`Loaded water consumption data: ${data}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Water Tracker</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setWater(text)}
        value={water}
        placeholder="Enter water consumption (in oz)"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => setTime(text)}
        value={time}
        placeholder="Enter time of day (e.g. morning)"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLoad}>
        <Text style={styles.buttonText}>Load</Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        You drank {water} oz of water at {time}.
      </Text>

      {data.length > 0 && (
        <View>
          <Text style={styles.dataTitle}>Water Consumption Data</Text>
          {data.map((item, index) => (
            <Text key={index} style={styles.dataItem}>
              {item.water} oz in the {item.time}
            </Text>
          ))}
        </View>
      )}
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

export default HomeScreen;
