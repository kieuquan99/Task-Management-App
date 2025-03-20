import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CircularProgressIndicator from '../../components/common/CircularProcess';

type Tasks = {
    id: string;
    name: string;
    completed: boolean
};

const TaskDetailsScreen = () => {
  const tasks: Tasks[] = [
    { id: '1', name: 'User Interviews', completed: true },
    { id: '2', name: 'Wireframes', completed: true },
    { id: '3', name: 'Design System', completed: true },
    { id: '4', name: 'Icons', completed: false },
    { id: '5', name: 'Final Mockups', completed: false },
  ];

  const teamMembers = [
    { id: 1, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="pencil-square-o" size={22} color="white" />
        </TouchableOpacity>
      </View>

        <Text style={styles.projectTitle}>Real Estate App Design</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <View style={styles.iconContainer}>
              <Icon name="calendar" size={20} color="#333" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Due Date</Text>
              <Text style={styles.infoValue}>20 June</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.iconContainer}>
              <Icon name="group" size={20} color="#333" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Project Team</Text>
              <View style={styles.avatarContainer}>
                {teamMembers.map((member, index) => (
                  <Image
                    key={member.id}
                    source={{ uri: member.avatar }}
                    style={[
                      styles.avatar,
                      { marginLeft: index > 0 ? -10 : 0 },
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Details</Text>
          <Text style={styles.detailsText}>
            Lorem ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled
          </Text>
        </View>

        <View style={styles.projectProgress}>
          <Text style={styles.projectProgressTitle}>Project Progress</Text>
          <CircularProgressIndicator 
            progress={80} 
            size={60}
            strokeWidth={2}
            progressColor="#F9D56E"
            backgroundColor="#2A3942"
          />
        </View>

        <View style={styles.allTasks}>
          <Text style={styles.allTasksTitle}>All Tasks</Text>
          <FlatList
                style={styles.tasksList}
                data={tasks}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{width: 10}} />}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <View key={item.id} style={styles.taskItem}>
                        <Text style={styles.taskName}>{item.name}</Text>
                        <View style={styles.taskStatus}>
                        {item.completed ? (
                            <Icon name="check-circle-o" size={20} color="#333" />
                        ) : (
                            <Icon name="circle-o" size={20} color="#333" />
                        )}
                        </View>
                    </View>
                )}
            />
        </View>
    </SafeAreaView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#2A3142',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  editButton: {
    padding: 4,
  },
  projectTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F9D949',
    borderRadius: 8,
    padding: 12,
    width: '48%',
  },
  iconContainer: {
    marginRight: 8,
    justifyContent: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F9D949',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  projectProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  projectProgressTitle: { 
    fontSize: 18,
    color: 'white',
  },
  detailsText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#B4B9C6',
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#F9D949',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9D949',
  },
  allTasks: {
    flex: 1,
    marginTop: 20,
  },
  allTasksTitle: {
    fontSize: 18,
    color: 'white',
  },
  tasksList: {
    marginTop: 8,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#455A64',
    padding: 16,
    marginBottom: 8,
  },
  taskName: {
    fontSize: 16,
    color: 'white',
  },
  taskStatus: {
    backgroundColor: '#F9D949',
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskDetailsScreen;