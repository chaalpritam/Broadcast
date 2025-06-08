import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DummyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dummy Screen</Text>
      <Text style={styles.subtitle}>This is a test screen</Text>
      <View style={styles.box}>
        <Text>Test Content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  box: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default DummyScreen; 