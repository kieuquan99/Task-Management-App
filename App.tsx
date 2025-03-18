import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './src/pages/Login';
import Home from './src/pages/home';
import Chat from './src/pages/chat';
import Notification from './src/pages/Notification';
import Calendar from './src/pages/Calendar';
import SignUp from './src/pages/SignUp';
import Profile from './src/components/Profile'
import FormChat from './src/pages/chat/FormChat'

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, login } = useAuth();
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log('tokennnn::::', token); 
      
      if (token) {
        login();
      }
    };

    checkToken();
  }, [login]);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
          <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }}/>
          <Stack.Screen name="FormChat" component={FormChat} options={{ headerShown: false }}/>
          <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }}/>
          <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;