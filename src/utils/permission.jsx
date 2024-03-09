import { PermissionsAndroid, Platform } from 'react-native';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';

const Permissions = [
  Platform.OS === 'android'
    ? PermissionsAndroid.PERMISSIONS.CAMERA
    : PERMISSIONS.IOS.CAMERA,
  Platform.OS === 'android'
    ? PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    : PERMISSIONS.IOS.MICROPHONE,
];

export const requestPermissions = async () => {
  if (Platform.OS === 'ios') {
    requestMultiple(Permissions);
    return;
  }
  try {
    await PermissionsAndroid.requestMultiple(Permissions).then(results => {
      if (!(results['android.permission.CAMERA'] == 'granted')) {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'Story Time would like to Access the Camera',
          message:
            'Story Time requires access to the camera to add receipts to transactions and take photos of documents when requested.',
        });
      }
      //   if (!(results["android.permission.POST_NOTIFICATIONS"] == "granted")) {
      //     PermissionsAndroid.request(
      //       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      //       {
      //         title: "“Peacemaker” would like to Send You Notifications",
      //         message:
      //           "Notifications may include alerts, sounds, and icons badges. These can be configured in Settings.",
      //       }
      //     );
      //   }
      if (!(results['android.permission.RECORD_AUDIO'] == 'granted')) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Story Time would like to Access the Microphone',
            message:
              'Story Time requires access to your microphone so you can use your voice to search for anythings, tracking your progress and more. ',
          },
        );
      }
    });
  } catch (err) {
    console.warn(err);
  }
};

export async function hasAndroidPermission() {
  const permission =
    Platform.Version >= '33'
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export async function hasIosPermission() {
  const permission = PERMISSIONS.IOS.PHOTO_LIBRARY;

  const permissionStatus = await check(permission);

  if (permissionStatus === RESULTS.GRANTED) {
    return true;
  }

  const requestStatus = await request(permission);

  return requestStatus === RESULTS.GRANTED;
}