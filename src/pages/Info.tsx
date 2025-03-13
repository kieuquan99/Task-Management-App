import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Info: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Button  title="Go to Home" onPress={() => navigation.navigate('Home' as never)} />
            <Text style={styles.title}>mmmmmmmmmmmmmmmmmmmg</Text>
            <Text style={styles.text}>fffffffffffffffff</Text>
            <Text style={styles.text}>nnnnnnnnnnn</Text>
            <Text style={styles.text}>Enbnbnbnm</Text>
            <Text style={styles.text}>Mnnnnnnnnnnnnnnnnnnnnnve.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Info;