// TaskList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onSelectTask, onDeleteTask }) => {
  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectTask(item)}>
            <TaskItem task={item} />
            <Button title="Delete" onPress={() => onDeleteTask(item.id)} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TaskList;