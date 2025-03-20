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
import { ToastProvider } from "./src/components/Toast"
// import firebase from "@react-native-firebase/app"
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth"
// import firestore from "@react-native-firebase/firestore"

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const auth = getAuth();
  const { isAuthenticated, login, logout } = useAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (!!user) {
        login()
      } else {
        logout()
      }
    });
  }, [])
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Chat" component={Chat}/>
          <Stack.Screen name="FormChat" component={FormChat}/>
          <Stack.Screen name="Calendar" component={Calendar}/>
          <Stack.Screen name="Notification" component={Notification}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator/>
        </NavigationContainer>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;