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
			navigation.navigate('reader', { url: props.url });
		} else {
			showToast('No internet connection');
		}
	}

	return (
		<TouchableOpacity activeOpacity={0.4} style={styles.wrapper} onPress={onPress}>
			{/* <Image /> */}
			<Text>{props.title}</Text>
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
