
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../AuthContext';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}
// type HomeScreenProps = {
//     navigation: StackNavigationProp<any>;
// };
const Home: React.FC = () => {
    const navigation = useNavigation();
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = () => {
        if (task) {
        setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
        setTask('');
        }
    };

    const toggleTaskCompletion = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const { logout } = useAuth();
    const handleLogout = async () => {
      await AsyncStorage.removeItem('userToken');
      logout();
    };
    return (
        <View style={styles.container}>
            <Button
                title="Go to Info"
                onPress={() =>
                    navigation.navigate('Info' as never)
                }
            />
            <Button title="Logout" onPress={handleLogout} />
        <Text style={styles.title}>Todo List</Text>
        <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={task}
            onChangeText={setTask}
        />
        <Button title="Add Task" onPress={addTask} />
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.taskContainer}>
                <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
                <Text style={[styles.taskText, item.completed && styles.completed]}>{item.text}</Text>
                </TouchableOpacity>
                <Button title="Remove" onPress={() => removeTask(item.id)} />
            </View>
            )}
        />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  taskText: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default Home;