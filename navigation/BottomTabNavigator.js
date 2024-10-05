// navigation/BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./StackNavigator"; // Import the StackNavigator for List Screen
import SouvenirScreen from "../screens/SouvenirScreen";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="ScavengerHuntList">
                <Tab.Screen
                    name="Scavenger Hunt List"
                    component={StackNavigator}
                    options={{ headerShown: false }}
                />
                <Tab.Screen name="Your Souvenirs" component={SouvenirScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default BottomTabNavigator;
