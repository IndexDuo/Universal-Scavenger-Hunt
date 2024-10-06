import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

const UniqueDeviceIdScreen = () => {
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    // Combine device information to generate a unique identifier
    const generateUniqueId = () => {
      const id = `${Device.brand}-${Device.modelName}-${Constants.installationId}`;
      setUniqueId(id);
    };
    generateUniqueId();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generated Unique Device ID</Text>
      <Text style={styles.infoText}>{uniqueId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default UniqueDeviceIdScreen;
