// navigation/BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import LandingScreen from "../screens/LandingScreen";
import ListScreen from "../screens/ListScreen";
import SouvenirScreen from "../screens/SouvenirScreen";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Hunt">
                <Tab.Screen name="Hunt" component={LandingScreen} />
                <Tab.Screen name="Hunt List" component={ListScreen} />
                <Tab.Screen name="Souvenirs" component={SouvenirScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default BottomTabNavigator;
