import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "../screens/ListScreen";
import HuntInfoScreen from "../screens/HuntInfoScreen";
import CameraScreen from "../screens/CameraScreen";
import { useTheme } from "react-native-paper";

const Stack = createStackNavigator();

function StackNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0368D9",
          height: 103,
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontFamily: "Avenir Next",
          fontWeight: "700",
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ title: "Scavenger Hunts" }}
      />
      <Stack.Screen
        name="HuntInfoScreen"
        component={HuntInfoScreen}
        options={{
          headerShown: false, // Hide the header for custom implementation
        }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          headerShown: false, // Hide the header for custom implementation
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
