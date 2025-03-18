import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Hoặc thư viện biểu tượng bạn muốn sử dụng

interface CustomInputProps {
  placeholder: string;
  value: string;
  iconName?: string;
  type?: string
  style?: ViewStyle;
  onChangeText: (text: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  iconName,
  style,
  type = 'text'
}) => {
const [isPass, setIsPass] = useState(true)

  return (
    <View style={[styles.container, style]}>
      {!!iconName && <Icon name={iconName} size={20} color="#FFFFFF" style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#B0BEC5"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type === 'password' && isPass}
      />
      {type === 'password' && <Icon name={isPass ? 'eye-slash' : 'eye'} size={20} color="#FFFFFF" style={styles.icon} onPress={() => setIsPass(!isPass)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    backgroundColor: '#455A64',
    paddingHorizontal: 20,
  },
  icon: {
    width: 30,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
  },
});

export default CustomInput;