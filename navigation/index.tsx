import { FontAwesome } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import Home from "../screens/Home";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import StyleGuide from "../components/StyleGuide";

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const nav = useNavigation();

  return (
    <Drawer.Navigator
      id="DrawerNavigator"
      initialRouteName="Home"
      screenOptions={{
        drawerPosition: "right",
        headerLeftContainerStyle: { display: "none" },
        headerTitleStyle: {
          display: "none",
        },
        headerRight: () => (
          <DrawerToggleButton tintColor={StyleGuide.palette.primary} />
        ),
        drawerStyle: { width: "100%", backgroundColor: "#ccc" },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) => {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
};
