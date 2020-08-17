import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import epub from 'epubjs';

const ScreenWidth = Dimensions.get('window').width;

function BookItem(props) {
	const navigation = useNavigation();

	// let book = epub(props.url, {});
	// console.log(book);
	return (
		<TouchableOpacity
			activeOpacity={0.4}
			style={styles.wrapper}
			onPress={() => navigation.navigate('reader', { url: props.url })}>
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
