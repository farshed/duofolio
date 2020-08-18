import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import showToast from './Toast';

const ScreenWidth = Dimensions.get('window').width;

function BookItem(props) {
	const navigation = useNavigation();

	async function onPress() {
		let { isConnected } = await NetInfo.fetch();
		if (isConnected) {
			navigation.navigate('reader', { url: props.url, index: props.index });
		} else {
			showToast('No internet connection');
		}
	}

	// const cover = props.cover ? { uri: props.cover } : require('../../assets/placeholder.png');

	return (
		<TouchableOpacity activeOpacity={0.4} style={styles.wrapper} onPress={onPress}>
			{/* <Image source={cover} style={{ height: 100, width: 100 }} /> */}
			<Text>{props.title}</Text>
			<Text>{props.author || 'unknown'}</Text>
		</TouchableOpacity>
	);
}

export default BookItem;

const styles = {
	wrapper: {
		height: 65,
		width: ScreenWidth / 2
	}
};
