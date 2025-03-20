import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore, { FieldValue } from '@react-native-firebase/firestore';
import { getAuth } from "@react-native-firebase/auth"

type RouteParams = {
  uidOtherUser?: string;
  displayNameOtherUser?: string;
  photoURLOtherUser?: string;
};


type Message = {
  id: string;
  text: string;
  createdAt: any;
  userId: string;
  userName: string;
  imageUrl?: string,
  type?: string,
  sender: 'me' | 'other'
};

const FormChat: React.FC = () => {
   const auth = getAuth();
    const currentUser = auth.currentUser
    const navigation = useNavigation();
    const route = useRoute();



    const { uidOtherUser, displayNameOtherUser, photoURLOtherUser } = route.params as RouteParams 
    const scrollViewRef = useRef<ScrollView>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    
    // const messages = [];
  const goToChat = () => {
    navigation.navigate("Chat" as never)
  }

  const getIdChat = (uidCurrentUser: string, uidOtherUser: string) => {
    if(uidCurrentUser > uidOtherUser) {
      return uidOtherUser+'-'+uidCurrentUser
    }else {
      return uidCurrentUser+'-'+uidOtherUser
    }
  }

  useEffect(() => {
    if (!uidOtherUser) return;

    const unsubscribe = firestore()
      .collection('chats')
      .doc(getIdChat(currentUser?.uid || '', uidOtherUser || ''))
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(
        (querySnapshot) => {
          
          const messageList: Message[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            messageList.push({
              id: doc.id,
              text: data.text,
              createdAt: data.createdAt,
              userId: data.userId,
              userName: data.userName,
              sender: currentUser?.uid == data.userId ? 'me' : 'other'
            });
          });
          setMessages(messageList)
          if(scrollViewRef.current) {
            setTimeout(() => {
              scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 50)
          }
          const dataLastMessage = querySnapshot.docs[0].data()
          if(dataLastMessage.uid !== currentUser?.uid){
            setReadLastMessage(dataLastMessage.text, dataLastMessage.createdAt)
          }
          // setLoading(false);
        },
        (error) => {
          console.error('Error fetching messages:', error);
          // setLoading(false);
        }
      );

    return () => unsubscribe()
  }, [uidOtherUser]);

  const handleSend = async () => {
    try {
      // Add message to Firestore
      const timetamp = firestore.FieldValue.serverTimestamp()

      // set last message
      setLastMessage(timetamp)

      const messageRef = firestore()
        .collection('chats')
        .doc(getIdChat(currentUser?.uid || '', uidOtherUser || ''))
        .collection('messages');

      await messageRef.add({
        text: messageInput,
        createdAt: timetamp,
        userId: currentUser?.uid,
        userName: currentUser?.displayName,
      });
      setMessageInput("")
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 50)
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const setLastMessage = (timetamp: FieldValue) => {
    const lastMessageRefofCurrentUser = firestore().collection('conversation').doc(currentUser?.uid).collection('data').doc(uidOtherUser || '')
    const lastMessageRefofOtherUser = firestore().collection('conversation').doc(uidOtherUser || '').collection('data').doc(currentUser?.uid)

    if(messages.length){
      lastMessageRefofCurrentUser.update({
        displayNameOtherUser: displayNameOtherUser,
        uid: currentUser?.uid,
        lastMessage: messageInput,
        createdAt: timetamp,
        displayName: currentUser?.uid,
        unread: false
      })
      lastMessageRefofOtherUser.update({
        displayNameOtherUser: currentUser?.displayName,
        uid: currentUser?.uid,
        lastMessage: messageInput,
        createdAt: timetamp,
        displayName: currentUser?.displayName,
        unread: true
      })
    }else {
      lastMessageRefofCurrentUser.set({
        displayNameOtherUser: displayNameOtherUser,
        uid: currentUser?.uid,
        lastMessage: messageInput,
        createdAt: timetamp,
        displayName: currentUser?.uid,
        unread: false
      })
      lastMessageRefofOtherUser.set({
        displayNameOtherUser: currentUser?.displayName,
        uid: currentUser?.uid,
        lastMessage: messageInput,
        createdAt: timetamp,
        displayName: currentUser?.displayName,
        unread: true
      })
    }
  }

  const setReadLastMessage = (lastMessage: string, timetamp: FieldValue) => {
    const lastMessageRefofCurrentUser = firestore().collection('conversation').doc(currentUser?.uid).collection('data').doc(uidOtherUser || '')
    const data = {
      uid: uidOtherUser,
      displayName: displayNameOtherUser,
      lastMessage: lastMessage,
      createdAt: timetamp,
      unread: false
    }
    if(messages.length){
      lastMessageRefofCurrentUser.update(data)
    }else {
      lastMessageRefofCurrentUser.set(data)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goToChat}>
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: photoURLOtherUser }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{ displayNameOtherUser }</Text>
            <Text style={styles.profileStatus}>Online</Text>
          </View>
        </View>
        
        <View style={styles.callButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="video-camera" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="phone" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior="padding"
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.messagesContainer} ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          {messages.map((msg) => (
            <View 
              key={msg.id} 
              style={[
                styles.messageWrapper,
                msg.sender === 'me' ? styles.myMessageWrapper : styles.otherMessageWrapper
              ]}
            >
              {msg.type === 'image' ? (
                <View style={[styles.message, styles.imageMessage, msg.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
                  <Image source={{ uri: msg.imageUrl }} style={styles.attachedImage} />
                </View>
              ) : (
                <View style={[styles.message, msg.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
                  <Text style={[styles.messageText, msg.sender === 'me' ? styles.myMessageText : styles.otherMessageText]}>
                    {msg.text}
                  </Text>
                </View>
              )}
              {/* {msg.sender === 'me' && (
                <Text style={styles.messageTime}>msg.time</Text>
              )} */}
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Icon name="file" size={24} color="#F9D949" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            placeholderTextColor="#8D8D8D"
            value={messageInput}
            onChangeText={setMessageInput}
          />
          
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Icon name="send" size={24} color="#F9D949" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.micButton}>
            <Icon name="microphone" size={24} color="#F9D949"/>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212832',
    padding: 20,
    paddingBottom: 0
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2A3142',
  },
  backButton: {
    padding: 5,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9D949',
  },
  profileInfo: {
    marginLeft: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  profileStatus: {
    color: '#8D8D8D',
    fontSize: 12,
  },
  callButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  messagesContainer: {
    flex: 1,
    paddingVertical: 10
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessageWrapper: {
    alignSelf: 'flex-end',
  },
  otherMessageWrapper: {
    alignSelf: 'flex-start',
  },
  message: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  myMessage: {
    backgroundColor: '#F9D949',
  },
  otherMessage: {
    backgroundColor: '#2A3142',
  },
  imageMessage: {
    padding: 0,
    overflow: 'hidden',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#000',
  },
  otherMessageText: {
    color: 'white',
  },
  messageTime: {
    fontSize: 10,
    color: '#8D8D8D',
    alignSelf: 'flex-end',
    marginTop: 4,
    marginRight: 4,
  },
  attachedImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#2A3142',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#2A3142',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    color: 'white',
  },
  sendButton: {
    padding: 8,
  },
  micButton: {
    padding: 8,
  },
});

export default FormChat;