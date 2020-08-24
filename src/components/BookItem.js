import React, { useState } from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import OptionsModal from './OptionsModal';
import showToast from './Toast';
import { contrastColor } from '../constants';

const ScreenWidth = Dimensions.get('window').width;

function BookItem(props) {
	const [isModalVisible, setModalVisible] = useState(false);

	async function onPress() {
		let { isConnected } = await NetInfo.fetch();
		if (isConnected) {
			props.navigation.navigate('epub-reader', {
				title: props.title,
				url: props.url,
				index: props.index,
				currentLocation: props.currentLocation,
				locations: props.locations || null
			});
		} else {
			showToast('No internet connection');
		}
	}

	return (
		<TouchableOpacity
			activeOpacity={0.4}
			style={styles.wrapper}
			onPress={onPress}
			onLongPress={() => setModalVisible(true)}
			key={props.index}>
			<Text style={styles.title} numberOfLines={1}>
				{props.title}
			</Text>
			<Text style={styles.author} numberOfLines={1}>
				{props.author || 'unknown'}
			</Text>
			<OptionsModal isVisible={isModalVisible} onPressCancel={() => setModalVisible(false)} />
		</TouchableOpacity>
	);
}

export default BookItem;

const styles = {
	wrapper: {
		height: 65,
		width: ScreenWidth,
		paddingLeft: 15,
		paddingRight: 15
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 3,
		color: contrastColor
	},
	author: {
		fontSize: 14,
		fontWeight: '300',
		color: 'rgba(0, 0, 0, 0.8)'
	}
};
