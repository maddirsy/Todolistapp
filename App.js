import React, { useState } from 'react';
import { View, Button, TextInput, SafeAreaView, StyleSheet, Animated, Easing } from 'react-native';
import TaskList from './TaskList';
import TaskDetails from './TaskDetails';

let taskIdCounter = 1; // Initial counter for task IDs

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [showInputFields, setShowInputFields] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleBackToList = () => {
    setSelectedTask(null);
  };

  const addTask = () => {
    setShowInputFields(true);
  };

  const saveTask = () => {
    const newTask = {
      id: taskIdCounter++,
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      time: taskTime,
      category: taskCategory,
    };
    setTasks([...tasks, newTask].sort((a, b) => {
      const dateA = new Date('${a.dueDate} ${a.time}');
      const dateB = new Date('${b.dueDate} ${b.time}');
      return dateA - dateB;
    }));
    // Clear input fields
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskTime('');
    setTaskCategory('');
    setShowInputFields(false); // Hide input fields after saving
    // Animate task item
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    // Animate task item
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        {!selectedTask ? (
          <View style={styles.content}>
            {showInputFields && (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Task Title"
                  value={taskTitle}
                  onChangeText={text => setTaskTitle(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Task Description"
                  value={taskDescription}
                  onChangeText={text => setTaskDescription(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Due Date (mm/dd/yyyy)"
                  value={taskDueDate}
                  onChangeText={text => setTaskDueDate(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Time (hh:mm)"
                  value={taskTime}
                  onChangeText={text => setTaskTime(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Category"
                  value={taskCategory}
                  onChangeText={text => setTaskCategory(text)}
                />
                <Button title="Done" onPress={saveTask} color="#32CD32" />
              </View>
            )}
            <TaskList tasks={tasks} onSelectTask={handleTaskSelect} onDeleteTask={deleteTask} fadeAnim={fadeAnim} />
          </View>
        ) : (
          <View style={styles.content}>
            <TaskDetails task={selectedTask} />
            <Button title="Back to List" onPress={handleBackToList} />
          </View>
        )}
      </View>
      <View style={styles.addButtonContainer}>
        <Button title="Add Task" onPress={addTask} color="#32CD32" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 8,
    paddingHorizontal: 10,
  },
  addButtonContainer: {
    padding: 10,
  },
});

export default App;