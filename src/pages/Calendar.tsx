import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '../components/Layout';

interface DayProps {
  day: number;
  name: string;
  isActive: boolean;
}

interface TaskProps {
  title: string;
  timeStart: string;
  timeEnd: string;
  isHighlighted: boolean;
  participants: string[];
}

const ScheduleScreen: React.FC = () => {
  const days: DayProps[] = [
    { day: 1, name: 'Mon', isActive: false },
    { day: 2, name: 'Tue', isActive: false },
    { day: 3, name: 'Wed', isActive: false },
    { day: 4, name: 'Thu', isActive: true },
    { day: 5, name: 'Fri', isActive: false },
    { day: 6, name: 'Sat', isActive: false },
    { day: 7, name: 'Sun', isActive: false },
  ];

  const tasks: TaskProps[] = [
    {
      title: 'User Interviews',
      timeStart: '16:00',
      timeEnd: '18:30',
      isHighlighted: true,
      participants: [
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://randomuser.me/api/portraits/men/22.jpg',
      ],
    },
    {
      title: 'Wireframe',
      timeStart: '16:00',
      timeEnd: '18:30',
      isHighlighted: false,
      participants: [
        'https://randomuser.me/api/portraits/women/28.jpg',
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/women/44.jpg',
      ],
    },
    {
      title: 'Icons',
      timeStart: '16:00',
      timeEnd: '18:30',
      isHighlighted: false,
      participants: [
        'https://randomuser.me/api/portraits/men/22.jpg',
      ],
    },
    {
      title: 'Mockups',
      timeStart: '16:00',
      timeEnd: '18:30',
      isHighlighted: false,
      participants: [
        'https://randomuser.me/api/portraits/women/28.jpg',
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/women/44.jpg',
      ],
    },
    {
      title: 'Testing',
      timeStart: '16:00',
      timeEnd: '18:30',
      isHighlighted: false,
      participants: [
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/women/44.jpg',
      ],
    },
  ];

  const renderDay = (day: DayProps) => (
    <TouchableOpacity 
      key={day.day} 
      style={[styles.dayItem, day.isActive && styles.activeDayItem]}
    >
      <Text style={[styles.dayNumber, day.isActive && styles.activeDayText]}>{day.day}</Text>
      <Text style={[styles.dayName, day.isActive && styles.activeDayText]}>{day.name}</Text>
    </TouchableOpacity>
  );

  const renderTask = (task: TaskProps, index: number) => (
    <View 
      key={index} 
      style={[
        styles.taskItem, 
        task.isHighlighted && styles.highlightedTaskItem
      ]}
    >
      <View style={styles.taskLeftBar} />
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskTime}>{task.timeStart} - {task.timeEnd}</Text>
      </View>
      <View style={styles.participantsContainer}>
        {task.participants.map((participant, idx) => (
          <Image 
            key={idx} 
            source={{ uri: participant }} 
            style={[
              styles.participantAvatar,
              { marginLeft: idx > 0 ? -10 : 0 }
            ]} 
          />
        ))}
      </View>
    </View>
  );

  return (
    <Layout>

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1E2132" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Schedule</Text>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="plus-square-o" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Month */}
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>November</Text>
        </View>
        
        {/* Days */}
        <View style={styles.daysContainer}>
          {days.map(renderDay)}
        </View>
        
        {/* Tasks Header */}
        <View style={styles.tasksHeaderContainer}>
          <Text style={styles.tasksHeaderText}>Today's Tasks</Text>
        </View>
        
        {/* Tasks List */}
        <ScrollView style={styles.tasksContainer} showsVerticalScrollIndicator={false}>
          {tasks.map(renderTask)}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  addButton: {
    padding: 8,
  },
  monthContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  monthText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  daysContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  dayItem: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDayItem: {
    backgroundColor: '#FED36A',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  dayName: {
    fontSize: 12,
    color: '#B0B3B8',
  },
  activeDayText: {
    color: '#1E2132',
  },
  tasksHeaderContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tasksHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#2A2E43',
    marginBottom: 12,
    overflow: 'hidden',
  },
  highlightedTaskItem: {
    backgroundColor: '#FED36A',
  },
  taskLeftBar: {
    width: 4,
    backgroundColor: '#FED36A',
  },
  taskContent: {
    flex: 1,
    padding: 16,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 14,
    color: '#B0B3B8',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  participantAvatar: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#2A2E43',
  },
});

export default ScheduleScreen;