import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

interface TabBarProps {
  onTabPress: (tabName: string) => void;
}

const BottomTabBar: React.FC<TabBarProps> = ({ onTabPress }) => {
    const route = useRoute();
    const [activeTab, setActiveTab] = useState('Home')
    console.log('route', route.name);
    useEffect(() => {
        setActiveTab(route.name)
    }, [route.name])

    return (
    <View style={styles.container}>
        <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => onTabPress('Home')}
        >
            <Icon 
            name="home" 
            size={20} 
            color={activeTab === 'Home' ? '#FFD700' : '#617D8A'} 
            />
            <Text style={[styles.tabText, activeTab === 'Home' && styles.activeText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => onTabPress('Chat')}
        >
            <Icon 
            name="wechat" 
            size={20} 
            color={activeTab === 'Chat' ? '#FFD700' : '#617D8A'} 
            />
            <Text style={[styles.tabText, activeTab === 'Chat' && styles.activeText]}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => onTabPress('Add')}
        >
            <Icon name="plus" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => onTabPress('Calendar')}
        >
            <Icon 
            name="calendar" 
            size={20} 
            color={activeTab === 'Calendar' ? '#FFD700' : '#617D8A'} 
            />
            <Text style={[styles.tabText, activeTab === 'Calendar' && styles.activeText]}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => onTabPress('Notification')}
        >
            <Icon 
            name="bell" 
            size={20} 
            color={activeTab === 'Notification' ? '#FFD700' : '#617D8A'} 
            />
            <Text style={[styles.tabText, activeTab === 'Notification' && styles.activeText]}>Notification</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 85,
    backgroundColor: '#263238',
    borderTopWidth: 1,
    borderTopColor: '#1A2942',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 10,
    marginTop: 2,
    color: '#617D8A',
  },
  activeText: {
    color: '#FFD700',
  },
  addButton: {
    width: 55,
    height: 55,
    backgroundColor: '#FED36A',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default BottomTabBar;