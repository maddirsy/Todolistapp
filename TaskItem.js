// TaskItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskItem = ({ task }) => {
  return (
    <View style={styles.container}>
      <Text>{task.title}</Text>
      <Text>{task.dueDate}</Text>
      <Text>{task.category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TaskItem;