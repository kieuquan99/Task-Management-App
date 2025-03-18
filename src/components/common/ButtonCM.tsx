import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
interface ButtonCMProps {
    title?: string;
    style?: ViewStyle;
    type?: 'solid' | 'outline';
    iconName?: string;
    iconSize?: number;
    onPress: () => void;
}

const ButtonCommon: React.FC<ButtonCMProps> = ({
  title = '',
  style,
  type,
  iconName,
  iconSize = 20,
  onPress,
}) => {
    const backgroundColor = type === 'outline' ? 'transparent' : '#FED36A';
    const textColor = type === 'outline' ? '#FFFFFF' : '#000000';
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, style, type === 'outline' && styles.buttonOutline ]}
            onPress={onPress}
            >
            {!!iconName && <Icon style={styles.icon} name={iconName} size={iconSize} color={textColor} />}
            {!!title && <Text style={[styles.text, { color: textColor }]}>
                {title}
            </Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 67,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    buttonOutline: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    icon: {
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ButtonCommon;