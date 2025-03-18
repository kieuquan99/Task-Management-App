import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Layout from '../../components/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import FormChat from './FormChat'

interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  unread: boolean;
}

const MessagesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Chat');
  
  const chatData: ChatItem[] = [
    {
      id: '1',
      name: 'Olivia Anna',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '31 min',
      unread: true,
    },
    {
      id: '2',
      name: 'Emma',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '43 min',
      unread: true,
    },
    {
      id: '3',
      name: 'Robert Brown',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '8 Nov',
      unread: false,
    },
    {
      id: '4',
      name: 'James',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '8 Dec',
      unread: false,
    },
    {
      id: '5',
      name: 'Sophia',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '27 Dec',
      unread: false,
    },
    {
      id: '6',
      name: 'Isabella',
      avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '31 min',
      unread: false,
    },
    {
      id: '7',
      name: 'Olivia Anna',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '31 min',
      unread: true,
    },
    {
      id: '8',
      name: 'Emma',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '43 min',
      unread: true,
    },
    {
      id: '9',
      name: 'Robert Brown',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '8 Nov',
      unread: false,
    },
    {
      id: '10',
      name: 'James',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '8 Dec',
      unread: false,
    },
    {
      id: '11',
      name: 'Sophia',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '27 Dec',
      unread: false,
    },
    {
      id: '12',
      name: 'Isabella',
      avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
      message: 'Hi, please check the last task, that I...',
      time: '31 min',
      unread: false,
    },
  ];

  const goToFormChat = (id: string) => {
    navigation.navigate("FormChat" as never)
  }

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => goToFormChat(item.id)}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message} numberOfLines={1}>{item.message}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1E2132" />
        
        <View style={styles.header}>
          {/* <TouchableOpacity style={styles.backButton}>
            <Icon name="chevron-left" size={24} color="white" />
          </TouchableOpacity> */}
          <View style={{width: 24}} />
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity style={styles.composeButton}>
            <Icon name="pencil-square-o" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Chat' && styles.activeTab]}
            onPress={() => setActiveTab('Chat')}
          >
            <Text style={[styles.tabText, activeTab === 'Chat' && styles.activeTabText]}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Groups' && styles.activeTab]}
            onPress={() => setActiveTab('Groups')}
          >
            <Text style={[styles.tabText, activeTab === 'Groups' && styles.activeTabText]}>Groups</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={chatData}
          renderItem={renderChatItem}
          keyExtractor={item => item.id}
          style={styles.chatList}
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.startChatButton}>
            <Text style={styles.startChatText}>Start chat</Text>
          </TouchableOpacity>
        </View>
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
    height: 56,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  composeButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#FFD54F',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  activeTabText: {
    color: '#000000',
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatContent: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#B0B3B8',
  },
  timeContainer: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  time: {
    fontSize: 12,
    color: '#B0B3B8',
    marginBottom: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD54F',
  },
  buttonContainer: {
    padding: 16,
  },
  startChatButton: {
    backgroundColor: '#FFD54F',
    paddingVertical: 14,
    alignItems: 'center',
  },
  startChatText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export default MessagesScreen;