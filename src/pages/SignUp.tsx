import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert, Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword,  } from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"
import { useNavigation } from '@react-navigation/native';
import ButtonCM from '../components/common/ButtonCM';
import InputCM from '../components/common/InputCM';
import { useToast } from "../hooks/use-toast"

const SignUp: React.FC = () => {
    const auth = getAuth();
    const navigation = useNavigation();
    const toast = useToast()
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignUp = async () => {
        if (username && email && password) {
            try {
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    auth.currentUser?.updateProfile({
                      displayName: username,
                    })
                    toast.success("User account created & signed in!")
                    firestore().collection("user").add({
                        displayName: username,
                        uid: userCredential.user.uid,
                        email: userCredential.user.email,
                        photoURL: userCredential.user.photoURL
                    })
                    setUsername("")
                    setEmail("")
                    setPassword("")
                })
                .catch(error => {
                    if (error.code === 'auth/weak-password') {
                        toast.error("Password should be at least 6 characters")
                    }
                    if (error.code === 'auth/invalid-email') {
                        toast.error("That email address is invalid!")
                    }
                    if (error.code === 'auth/email-already-in-use') {
                        toast.error("That email address is already in use!")
                    }
                });
            } catch (error) {
                toast.error("Failed to save the token.")
            }
        }
    };

    const goToLogin = () => {
        navigation.navigate('Login' as never);
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
                <Text style={styles.welcom}>Create your account</Text>
                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.label}>Email Address</Text>
                        <InputCM
                            placeholder="Full name"
                            value={username}
                            iconName='user-o'
                            onChangeText={setUsername}
                        />
                    </View>
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
                <ButtonCM style={styles.buttonLogin} title="Sign Up" onPress={handleSignUp} />
                <View style={styles.orContinueWith}>
                    <View style={styles.orContinueWithLineLeft}/>
                    <Text style={styles.orContinueWithText}>Or continue with</Text>
                    <View style={styles.orContinueWithLineRight}/>
                </View>
                <ButtonCM style={styles.buttonLoginGG} title="Google" iconName="google" onPress={handleSignUp} type="outline" />
                <View style={styles.bottomPage}>
                    <Text style={styles.bottomPageDontHave}>Already have an account?</Text>
                    <Text style={styles.bottomPageSignUp} onPress={goToLogin}>Log In</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 26,
        paddingVertical: 37,
        backgroundColor: '#263238',
    },
    logo: {
        width:139,
        objectFit: 'contain',
    },
    welcom: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'flex-start',
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
        flexDirection: 'row',
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

export default SignUp;