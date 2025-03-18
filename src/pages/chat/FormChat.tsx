import React, { useState } from 'react';
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
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const FormChat: React.FC = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    
    const messages = [
        {
        id: 1,
        text: 'Hi, please check the new task.',
        sender: 'other',
        time: '09:41',
        },
        {
        id: 2,
        text: 'Hi, please check the new task.',
        sender: 'me',
        time: 'Sent',
        },
        {
        id: 3,
        text: 'Got it. Thanks.',
        sender: 'other',
        time: '09:42',
        },
        {
        id: 4,
        text: 'Hi, please check the last task, that I have completed.',
        sender: 'other',
        time: '09:45',
        },
        {
        id: 5,
        type: 'image',
        imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9kUfmL3b9LeI1AfhNk2TItkiACTg3V.png',
        sender: 'other',
        time: '09:46',
        },
        {
        id: 6,
        text: 'Got it. Will check it soon.',
        sender: 'me',
        time: 'Sent',
        },
  ];
  const goToChat = () => {
    navigation.navigate("Chat" as never)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goToChat}>
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Olivia Anna</Text>
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.messagesContainer}>
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
              {msg.sender === 'me' && (
                <Text style={styles.messageTime}>{msg.time}</Text>
              )}
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
            value={message}
            onChangeText={setMessage}
          />
          
          <TouchableOpacity style={styles.sendButton}>
            <Icon name="send" size={24} color="#F9D949" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.micButton}>
            <Icon name="microphone" size={24} color="#F9D949" />
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