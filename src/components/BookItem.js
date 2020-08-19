import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import showToast from './Toast';

const ScreenWidth = Dimensions.get('window').width;

function BookItem(props) {
	async function onPress() {
		let { isConnected } = await NetInfo.fetch();
		if (isConnected) {
			props.navigation.navigate('reader', { url: props.url, index: props.index });
		} else {
			showToast('No internet connection');
		}
	}

	// const cover = props.cover ? { uri: props.cover } : require('../../assets/placeholder.png');

	return (
		<TouchableOpacity
			activeOpacity={0.4}
			style={styles.wrapper}
			onPress={onPress}
			key={props.index}>
			{/* <Image source={cover} style={{ height: 100, width: 100 }} /> */}
			<Text style={styles.title} numberOfLines={1}>
				{props.title}
			</Text>
			<Text style={styles.author} numberOfLines={1}>
				{props.author || 'unknown'}
			</Text>
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
		color: '#000000'
	},
	author: {
		fontSize: 14,
		color: 'rgba(0, 0, 0, 0.8)'
	}
};
