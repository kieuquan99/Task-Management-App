import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from './BottomTabBar';
interface Layout {
    children: ReactNode;
}
const Layout: React.FC<Layout> = ({children}) => {
  const navigation = useNavigation();
  const onTabPress = (tab: string) => {
    navigation.navigate(tab as never)
  }
  return (
    <View style={styles.layout}>
      {children}
      <View style={styles.layoutTabs}>
        <BottomTabBar onTabPress={(tab)=>onTabPress(tab)}/>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    layout:{
        position: 'relative',
        height: '100%',
        paddingVertical: 28,
        paddingHorizontal: 22,
        paddingBottom: 90,
        backgroundColor: '#263238',
    },
    layoutTabs: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    }
})
export default Layout;