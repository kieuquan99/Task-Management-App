import { Platform, PermissionsAndroid } from 'react-native';
import { launchImageLibrary, launchCamera, ImagePickerResponse, Asset } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('xxxxxx', granted);
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      if (result === RESULTS.DENIED) {
        await request(PERMISSIONS.IOS.CAMERA);
      }
    }
  };

  export  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Gallery Permission',
            message: 'This app needs access to your gallery.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('yyyyyyyy', granted);
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Gallery permission granted');
        } else {
          console.log('Gallery permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (result === RESULTS.DENIED) {
        await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }
    }
  };

// const ImageUploader = {
//   handleSelectImage: async () => {
//     let image: Asset | null = null
//     await requestGalleryPermission();
//     launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else if (response.assets && response.assets.length > 0) {
//         image = response.assets[0]
//       }
//     });
//     return image
//   },
//     handleTakePhoto: async () => {
//         let image: Asset | null = null
//         await requestCameraPermission();
//         launchCamera({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
//         if (response.didCancel) {
//             console.log('User cancelled camera');
//         } else if (response.errorCode) {
//             console.log('Camera Error: ', response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//             return response.assets[0]
//         }
//         })
//     }
// };

// export default ImageUploader;