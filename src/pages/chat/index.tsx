import React, { useState, useEffect } from 'react';
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
import firestore from "@react-native-firebase/firestore"
import { getAuth  } from '@react-native-firebase/auth';

interface ChatItem {
  displayNameOtherUser: string,
  uid: string,
  displayName: string,
  photoURL: string,
  lastMessage: string,
  createdAt: string,
  unread: boolean,
}
interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
}

const MessagesScreen: React.FC = () => {
  const navigation = useNavigation();
  const auth = getAuth()
  const currentUser = auth.currentUser
  const [activeTab, setActiveTab] = useState('Chat');

  const [listChat, setListChat] = useState<ChatItem[]>([]);
  
  // const chatData: ChatItem[] = [
  //   {
  //     id: '1',
  //     name: 'Olivia Anna',
  //     avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  //     message: 'Hi, please check the last task, that I...',
  //     time: '31 min',
  //     unread: true,
  //   },
  //   {
  //     name: 'Emma',
  //     avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  //     message: 'Hi, please check the last task, that I...',
  //     time: '43 min',
  //     unread: true,
  //   },
  //   {
  //     id: '3',
  //     name: 'Robert Brown',
  //     avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  //     message: 'Hi, please check the last task, that I...',
  //     time: '8 Nov',
  //     unread: false,
  //   }
  // ];
  const goToFormChat = (chatItem: ChatItem | undefined) => {

    if(chatItem) {
      navigation.navigate('FormChat', {
        uidOtherUser: chatItem.uid,
        displayNameOtherUser: chatItem.displayName,
        photoURLOtherUser: chatItem.photoURL,
      })
    }
  }
  useEffect(() => {
    if (!currentUser?.uid) return;

    const unsubscribe = firestore()
    .collection('conversation').doc(currentUser?.uid).collection('data').onSnapshot(
      (querySnapshot) => {
        const chats: ChatItem[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('datadatadatadatadata', doc.id, data);
          chats.push({
            uid: doc.id,
            displayNameOtherUser: data.displayNameOtherUser,
            displayName: data.displayName,
            photoURL: 'https://randomuser.me/api/portraits/men/32.jpg',
            lastMessage: data.lastMessage,
            createdAt: data.createdAt,
            unread: data.unread,
          } as ChatItem);
        });
        setListChat(chats)
        // if(!chats.length) {
        //   firestore().collection("user").get().then(res => {
        //     if(!res.empty){
        //       const items: ChatItem[] = []
        //       res.docs.filter(x => x.data().uid !== auth?.currentUser?.uid).forEach(x => {
        //         items.push({
        //           ...x.data(),
        //           photoURL: 'https://randomuser.me/api/portraits/men/32.jpg',
        //           lastMessage: '',
        //           createdAt: '30 min',
        //           unread: true,
        //         } as ChatItem)
        //       })
        //       setListChat(items)
        //     }
        //   })
        // }
        // setLoading(false);
      },
      (error) => {
        console.error('Error fetching messages:', error);
        // setLoading(false);
      }
    );
     

    return () => unsubscribe()
  }, []);

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => goToFormChat(item)}>
      <Image source={{ uri: item.photoURL || '' }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <Text style={styles.name}>{item.displayNameOtherUser}</Text>
        <Text style={styles.message} numberOfLines={1}>{item?.lastMessage}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>time</Text>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1E2132" />
        
        <View style={styles.header}>
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
          data={listChat}
          renderItem={renderChatItem}
          keyExtractor={item => item.uid}
          style={styles.chatList}
          showsVerticalScrollIndicator={false}
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