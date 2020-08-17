import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import RNFileSelector from 'react-native-file-selector';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getStoragePermission, checkStoragePermissions } from '../utils/permissions';
import Icon from './Icon';
import { primaryColor } from '../constants';

function AddButton() {
	const navigation = useNavigation();

	async function selectFile() {
		let granted = await checkStoragePermissions();
		if (!granted) await getStoragePermission();
		RNFileSelector.Show({
			title: 'Select epub file',
			filter: '.*\\.(epub|EPUB)$',
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
		</TouchableWithoutFeedback>
	);
}

export default connect(
	null,
	actions
)(AddButton);

const styles = {
	view: {
		backgroundColor: primaryColor,
		position: 'absolute',
		bottom: 20,
		right: 20,
		height: 60,
		width: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	icon: {
		name: 'plus',
		type: 'feather',
		color: 'white',
		size: 28
	}
};
