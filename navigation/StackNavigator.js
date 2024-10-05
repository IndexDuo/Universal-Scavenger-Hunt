// navigation/StackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "../screens/ListScreen"; // Shortened name for the List Screen
import HuntInfoScreen from "../screens/HuntInfoScreen"; // Detailed hunt info screen

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen
                name="List"
                component={ListScreen}
                options={{ title: "Scavenger Hunts" }}
            />
            <Stack.Screen
                name="HuntInfo"
                component={HuntInfoScreen}
                options={{ title: "Hunt Details" }}
            />
        </Stack.Navigator>
    );
}

export default StackNavigator;
