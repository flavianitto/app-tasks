import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskList from './src/views/TaskList';

export default function App() {
  return (
    <View style={styles.container}>
      <TaskList></TaskList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
