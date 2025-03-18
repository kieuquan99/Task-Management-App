import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from "@react-native-firebase/firestore"
import { getAuth, signOut } from '@react-native-firebase/auth';
import { useAuth } from '../../AuthContext';
import { useNavigation } from '@react-navigation/native';
import { requestGalleryPermission } from '../uills/uploadImage';
import { ImagePickerResponse, launchImageLibrary, Asset } from 'react-native-image-picker';

const ProfileScreen: React.FC = () => {
    const auth = getAuth();
    const [avatar, setAvatar] = useState<Asset | null>(null)
    const navigation = useNavigation();
    const { logout } = useAuth();

    const goToHome = () => {
        navigation.navigate("Home" as never)
    }
    const handleLogout = async () => {
        // await AsyncStorage.removeItem('userToken');
        // logout();
        signOut(auth).then().catch(err => {
          console.log('logout err', err);
        })
    };
    const changeAvatar = async () => {
        await requestGalleryPermission();
        launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
            console.log('response.assets[0]', response.assets[0]);
            setAvatar(response.assets[0])
        }
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={goToHome}>
                    <Icon name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.placeholder} />
            </View>
            <ScrollView style={styles.content}>
                <View style={styles.profileImageContainer}>
                <View style={styles.profileImageWrapper}>
                    <Image
                    source={{ uri: avatar?.uri || '' }}
                    style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.cameraButton} onPress={changeAvatar}>
                        <Icon name="camera" size={16} color="white" />
                    </TouchableOpacity>
                </View>
                </View>

                <View style={styles.infoSection}>
                <TouchableOpacity style={styles.infoItem}>
                    <View style={styles.infoIconContainer}>
                    <Icon name="user" size={20} color="#8D9CB0" />
                    </View>
                    <Text style={styles.infoText}>Fazil Laghari</Text>
                    <TouchableOpacity style={styles.editButton}>
                    <Icon name="pencil-square-o" size={18} color="#8D9CB0" />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoItem}>
                    <View style={styles.infoIconContainer}>
                    <Icon name="address-book-o" size={20} color="#8D9CB0" />
                    </View>
                    <Text style={styles.infoText}>fazzzil72@gmail.com</Text>
                    <TouchableOpacity style={styles.editButton}>
                    <Icon name="pencil-square-o" size={18} color="#8D9CB0" />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoItem}>
                    <View style={styles.infoIconContainer}>
                    <Icon name="lock" size={20} color="#8D9CB0" />
                    </View>
                    <Text style={styles.infoText}>Password</Text>
                    <TouchableOpacity style={styles.editButton}>
                    <Icon name="pencil-square-o" size={18} color="#8D9CB0" />
                    </TouchableOpacity>
                </TouchableOpacity>
                </View>

                <View style={styles.menuSection}>
                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                    <Icon name="list" size={20} color="#8D9CB0" />
                    </View>
                    <Text style={styles.menuText}>My Tasks</Text>
                    <Icon name="chevron-down" size={20} color="#8D9CB0" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                    <Icon name="shield" size={20} color="#8D9CB0" />
                    </View>
                    <Text style={styles.menuText}>Privacy</Text>
                    <Icon name="chevron-down" size={20} color="#8D9CB0" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                    <Icon name="gears" size={20} color="#8D9CB0" />
                    </View>
                    <Text style={styles.menuText}>Setting</Text>
                    <Icon name="chevron-down" size={20} color="#8D9CB0" />
                </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name="sign-out" size={18} color="#333" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2430',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A3142',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#F9D949',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#C8F7D6',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#333',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E2430',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A3142',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  infoIconContainer: {
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  editButton: {
    padding: 4,
  },
  menuSection: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A3142',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  menuIconContainer: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9D949',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  logoutText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ProfileScreen;