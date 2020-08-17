import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import RNFileSelector from 'react-native-file-selector';
import { useNavigation } from '@react-navigation/native';
// import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getStoragePermission, checkStoragePermissions } from '../utils/permissions';
import Icon from './Icon';
import { primaryColor } from '../constants';

function AddButton(props) {
	const navigation = useNavigation();

	async function selectFile() {
		let granted = await checkStoragePermissions();
		if (!granted) await getStoragePermission();
		RNFileSelector.Show({
			title: 'Select epub file',
			onDone: (path) => {
				navigation.navigate('reader', { url: path });
			},
			onCancel: () => {}
		});
	}

	return (
		<TouchableWithoutFeedback onPress={selectFile}>
			<View style={styles.view}>
				<Icon {...styles.icon} />
			</View>
			{/* <WebView
				source={{
					uri: 'file:///android_asset/button.html',
					baseUrl: 'file:///android_asset/'
				}}
				mixedContentMode="always"
				originWhitelist={['*']}
				allowFileAccess
				allowUniversalAccessFromFileURLs
				scrollEnabled={false}
				onMessage={(e) => {
				}}
					console.log(JSON.parse(e.nativeEvent.data)['0']);
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				style={{ flex: 1 }}
			/> */}
		</TouchableWithoutFeedback>
	);
}

export default connect(null, actions)(AddButton);

const styles = {
	view: {
		backgroundColor: primaryColor,
		position: 'absolute',
		bottom: 20,
		right: 20,
		height: 60,
		width: 60,
		borderRadius: 30,
		overflow: 'hidden'
	},
	icon: {
		name: 'plus',
		type: 'feather',
		color: 'white',
		size: 28,
		style: {
			position: 'absolute',
			bottom: 16,
			right: 16
		}
	}
};
