import { Alert, PermissionsAndroid } from 'react-native';

export const getStoragePermission = async () => {
	let permissions = await PermissionsAndroid.requestMultiple(
		[
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
		],
		{
			title: 'Duofolio Storage Permission',
			message: 'Duofolio needs to access your storage'
		}
	);

	if (permissions['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
		return;
	} else {
		Alert.alert(
			'Permission required',
			'Allow Duofolio to access your storage',
			[{ text: 'OK', onPress: async () => await getStoragePermission() }],
			{ cancelable: false }
		);
	}
};

export const checkStoragePermissions = async () => {
	let granted = await PermissionsAndroid.check(
		PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
	);
	return granted;
};
