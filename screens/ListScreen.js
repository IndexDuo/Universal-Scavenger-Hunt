import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import huntsData from "../data/huntsData.json";

function ListScreen({ navigation }) {
  const [hunts, setHunts] = useState([]);
  const [completedHunts, setCompletedHunts] = useState({});

  useEffect(() => {
    setHunts(huntsData);

    async function loadCompletedHunts() {
      try {
        const storedStatus = await AsyncStorage.getItem("completedHunts");
        if (storedStatus) {
          setCompletedHunts(JSON.parse(storedStatus));
        }
      } catch (e) {
        console.error("Failed to load completed hunts", e);
      }
    }
    loadCompletedHunts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={hunts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HuntInfoScreen", { huntId: item.id })
            }
          >
            <Card style={styles.card}>
              <Text>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginVertical: 10,
    padding: 10,
  },
});

export default ListScreen;
