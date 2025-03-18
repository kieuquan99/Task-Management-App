import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../AuthContext';
import ButtonCM from '../components/common/ButtonCM';
import InputCM from '../components/common/InputCM';
import { useToast } from "../hooks/use-toast"

const Login: React.FC = () => {
    const toast = useToast()
    const navigation = useNavigation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const { login } = useAuth();

    const handleLogin = async () => {
        if (email && password) {
            auth().signInWithEmailAndPassword(email, password).then().catch(err => {
                toast.error(err.message)
            })
            // const token = 'b1946ac92492d234c7c6235b4d2611184'
            // try {
            //     await AsyncStorage.setItem('userToken', token);
            //     login(); 
            // } catch (error) {
            //     Alert.alert("Error", "Failed to save the token.");
            // }
        }
    };

    const goToSignUp = () => {
        navigation.navigate('SignUp' as never)
    }
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
            <Text style={styles.welcom}>Welcome Back!</Text>
            <View style={styles.form}>
                <View style={styles.input}>
                    <Text style={styles.label}>Email Address</Text>
                    <InputCM
                        placeholder="Email"
                        value={email}
                        iconName='address-book-o'
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.input}>
                    <Text style={styles.label}>Password</Text>
                    <InputCM
                        placeholder="password"
                        value={password}
                        iconName='lock'
                        type='password'
                        onChangeText={setPassword}
                    />
                </View>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </View>
            <ButtonCM style={styles.buttonLogin} title="Log In" onPress={handleLogin} />
            <View style={styles.orContinueWith}>
                <View style={styles.orContinueWithLineLeft}/>
                <Text style={styles.orContinueWithText}>Or continue with</Text>
                <View style={styles.orContinueWithLineRight}/>
            </View>
            <ButtonCM style={styles.buttonLoginGG} title="Google" iconName="google" onPress={handleLogin} type="outline" />
            <View style={styles.bottomPage}>
                <Text style={styles.bottomPageDontHave}>Don’t have an account?</Text>
                <Text style={styles.bottomPageSignUp} onPress={goToSignUp}>Sign Up</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 26,
        paddingVertical: 37,
        backgroundColor: '#263238'
    },
    logo: {
        width:139,
        objectFit: 'contain'
    },
    welcom: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'flex-start'
    },
    form: {
        width: '100%',
    },
    input: {
        marginTop: 25,
    },
    label: {
        fontSize: 18,
        color: '#8CAAB9',
        marginBottom: 16
    },
    forgot: {
        alignSelf: 'flex-end',
        color: '#8CAAB9',
        fontSize: 16,
        marginTop: 11,
    },
    buttonLogin: {
        marginTop: 38,
    },
    orContinueWith: {
        position: 'relative',
        marginVertical: 38,
        width: '100%',
    },
    orContinueWithLineLeft: {
        position: 'absolute',
        width: 110,
        height: 1,
        backgroundColor: '#8CAAB9',
        top: '50%',
        left: 0,
    },
    orContinueWithLineRight: {
        position: 'absolute',
        width: 110,
        height: 1,
        backgroundColor: '#8CAAB9',
        top: '50%',
        right: 0,
    },
    orContinueWithText: {
        color: '#8CAAB9',
        margin: 'auto'
    },
    buttonLoginGG: {
    },
    bottomPage: {
        width: '100%',
        flexDirection: "row",
        marginTop: 25,
        justifyContent: 'center'
    },
    bottomPageDontHave: {
        color: '#8CAAB9',
        marginRight: 5,
    },
    bottomPageSignUp: {
        color: '#FED36A',
        fontWeight: 'bold',
    },
});

export default Login;