import React, { useEffect, useState } from "react";
import { TextInput, Button, DatePickerIOSComponent } from "react-native";
import { View, Text } from "../Themed";
import { DatePickerOptions } from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

type WaterData = {
  date: string;
  weight: string;
  height: string;
  age: string;
  dailyIntake: string;
  drankToday: string;
};

const WaterIntakeCalculator = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [waterIntake, setWaterIntake] = useState<string>("");
  const [dailyIntake, setDailyIntake] = useState<string>("");
  const [drankToday, setDrankToday] = useState<string>("");
  const [waterData, setWaterData] = useState<WaterData[]>([]);

  useEffect(() => {
    const loadFromStorage = async () => {
      const data = await AsyncStorage.getItem("waterData");
      if (data) {
        const parsedData: WaterData[] = JSON.parse(data);
        setWaterData(parsedData);
        const latestEntry = parsedData[parsedData.length - 1];
        setSelectedDate(new Date(latestEntry.date));
        setWeight(latestEntry.weight);
        setHeight(latestEntry.height);
        setAge(latestEntry.age);
        setDailyIntake(latestEntry.dailyIntake);
        setDrankToday(latestEntry.drankToday);
        const result = calculateWaterIntake(
          Number(latestEntry.weight),
          Number(latestEntry.height),
          Number(latestEntry.age)
        );
        setWaterIntake(result.toFixed(2));
      }
    };
    loadFromStorage();
  }, []);

  // Save data to AsyncStorage when user inputs are changed
  useEffect(() => {
    const saveToStorage = async () => {
      const updatedData = waterData.map((data) =>
        data.date === selectedDate.toISOString()
          ? {
              date: selectedDate.toISOString(),
              weight,
              height,
              age,
              dailyIntake,
              drankToday,
            }
          : data
      );
      await AsyncStorage.setItem("waterData", JSON.stringify(updatedData));
      setWaterData(updatedData);
    };
    saveToStorage();
  }, [weight, height, age, dailyIntake, drankToday, selectedDate]);

  const calculateWaterIntake = (
    weight: number,
    height: number,
    age: number
  ) => {
    // Formula for calculating recommended daily water intake based on weight, height, and age
    // This is just an example, the actual formula may vary based on the source and factors considered
    const waterIntake =
      (weight / 2.2) * (30 / 1000) + (height / 100) * 10 + (age / 100) * 5;
    return waterIntake;
  };

  const handleCalculate = () => {
    const result = calculateWaterIntake(
      Number(weight),
      Number(height),
      Number(age)
    );
    setWaterIntake(result.toFixed(2));
  };

  const handleDrankToday = (value: string) => {
    setDrankToday(value);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const selectedEntry = waterData.find(
      (data) => data.date === date.toISOString()
    );
    if (selectedEntry) {
      setWeight(selectedEntry.weight);
      setHeight(selectedEntry.height);
      setAge(selectedEntry.age);
      setDailyIntake(selectedEntry.dailyIntake);
      setDrankToday(selectedEntry.drankToday);
    } else {
      setWeight("");
      setHeight("");
      setAge("");
      setDailyIntake("");
      setDrankToday("");
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const selectedEntry = waterData.find(
      (data) => data.date === date.toISOString()
    );
    if (selectedEntry) {
      setWeight(selectedEntry.weight);
      setHeight(selectedEntry.height);
      setAge(selectedEntry.age);
      setDailyIntake(selectedEntry.dailyIntake);
      setDrankToday(selectedEntry.drankToday);
    } else {
      setWeight("");
      setHeight("");
      setAge("");
      setDailyIntake("");
      setDrankToday("");
      const result = calculateWaterIntake(
        Number(weight),
        Number(height),
        Number(age)
      );
      setWaterIntake(result.toFixed(2));
    }
  };

  return (
    <View>
      <Text>Select date:</Text>
      {/* <DatePickerIOSComponent
        date={selectedDate}
        onDateChange={handleDateSelect}
      /> */}
      <Text>Weight (kg):</Text>
      <TextInput
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        placeholder="Enter weight"
      />
      <Text>Height (cm):</Text>
      <TextInput
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        placeholder="Enter height"
      />
      <Text>Age (years):</Text>
      <TextInput
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholder="Enter age"
      />
      <Button title="Calculate" onPress={handleCalculate} />
      <Text>Daily water intake (L): {waterIntake}</Text>
      <Text>How much did you drink today (L):</Text>
      <TextInput
        keyboardType="numeric"
        value={drankToday}
        onChangeText={handleDrankToday}
        placeholder="Enter amount"
      />
      <Text>
        {drankToday && `You drank ${drankToday}L today. `}
        {dailyIntake && `Your daily intake is ${dailyIntake}L. `}
        {drankToday && dailyIntake && Number(drankToday) >= Number(dailyIntake)
          ? "Good job!"
          : "You need to drink more."}
      </Text>
    </View>
  );
};

export default WaterIntakeCalculator;
