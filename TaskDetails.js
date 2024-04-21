// TaskDetails.js
import React from 'react';
import { View, Text } from 'react-native';

const TaskDetails = ({ task }) => {
  return (
    <View>
      <Text>Title: {task.title}</Text>
      <Text>Description: {task.description}</Text>
      <Text>Due Date: {task.dueDate}</Text>
      <Text>Category: {task.category}</Text>
      {/* Add more details here */}
    </View>
  );
};

export default TaskDetails;