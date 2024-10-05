// screens/ListScreen.js
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";

const DATA = [
    { id: "1", title: "Tutorial - How to Use This App", isTutorial: true },
    { id: "2", title: "Hunt #1: Find the Minion" },
    { id: "3", title: "Hunt #2: The shark from Jaws" },
];

function ListScreen() {
    function renderItem({ item }) {
        return (
            <TouchableOpacity
                style={styles.huntItem}
                onPress={() => alert(item.title)}
            >
                <Text
                    style={[
                        styles.huntTitle,
                        item.isTutorial && styles.tutorialText,
                    ]}
                >
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scavenger Hunt List</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    huntItem: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    huntTitle: {
        fontSize: 18,
    },
    tutorialText: {
        fontWeight: "bold",
        color: "blue",
    },
});

export default ListScreen;
