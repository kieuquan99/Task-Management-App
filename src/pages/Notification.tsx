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

interface NotificationItem {
  id: string;
  avatar: string;
  name: string;
  action: string;
  project: string;
  time: string;
}

const NotificationsScreen: React.FC = () => {
  const newNotifications: NotificationItem[] = [
    {
      id: '1',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      name: 'Olivia Anna',
      action: 'left a comment in task',
      project: 'Mobile App Design Project',
      time: '31 min',
    },
    {
      id: '2',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'Robert Brown',
      action: 'left a comment in task',
      project: 'Mobile App Design Project',
      time: '31 min',
    },
    {
      id: '3',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      name: 'Sophia',
      action: 'left a comment in task',
      project: 'Mobile App Design Project',
      time: '31 min',
    },
    {
      id: '4',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Anna',
      action: 'left a comment in task',
      project: 'Mobile App Design Project',
      time: '31 min',
    },
  ];

  const earlierNotifications: NotificationItem[] = [
    {
      id: '5',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'Robert Brown',
      action: 'marked the task',
      project: 'Mobile App Design Project',
      time: '4 hours',
    },
    {
      id: '6',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      name: 'Sophia',
      action: 'left a comment in task',
      project: 'Mobile App Design Project',
      time: '31 min',
    },
    {
      id: '7',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Anna',
      action: 'left a comment in task',
      project: 'Mobile App Design Project',
      time: '31 min',
    },
  ];

  const renderNotificationItem = (item: NotificationItem, index: number, isLast: boolean) => {
    const isRobertBrownMarked = item.id === '5';
    
    return (
      <View 
          key={item.id} 
          style={[
            styles.notificationItem,
            isLast ? null : styles.notificationItemBorder
          ]}
        >
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.notificationContent}>
            <View style={styles.notificationTextContainer}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.actionText}>
                {' '}{item.action}{' '}
                <Text style={styles.projectText}>{item.project}</Text>
                {isRobertBrownMarked ? ' as in process' : ''}
              </Text>
            </View>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
    );
  };

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1E2132" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* New Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>New</Text>
            <View style={styles.notificationsContainer}>
              {newNotifications.map((item, index) => 
                renderNotificationItem(
                  item, 
                  index, 
                  index === newNotifications.length - 1
                )
              )}
            </View>
          </View>
          
          {/* Earlier Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Earlier</Text>
            <View style={styles.notificationsContainer}>
              {earlierNotifications.map((item, index) => 
                renderNotificationItem(
                  item, 
                  index, 
                  index === earlierNotifications.length - 1
                )
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2132',
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
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  notificationsContainer: {
    backgroundColor: '#262A3D',
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
  },
  notificationItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#353A50',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  actionText: {
    fontSize: 14,
    color: '#B0B3B8',
  },
  projectText: {
    color: '#FFD54F',
  },
  timeText: {
    fontSize: 12,
    color: '#B0B3B8',
    alignSelf: 'flex-start',
  },
});

export default NotificationsScreen;