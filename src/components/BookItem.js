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
		let { isConnected, isInternetReachable } = await NetInfo.fetch();
		if (isConnected && isInternetReachable) {
			props.navigation.navigate(`${props.type || 'epub'}-reader`, {
				title: props.title,
				url: props.url,
				index: props.index
			});
		} else showToast('No internet connection');
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
				{props.author || (props.type || 'EPUB').toUpperCase() + ' Document'}
			</Text>
			<OptionsModal
				isVisible={isModalVisible}
				onPressCancel={() => setModalVisible(false)}
				url={props.url}
				index={props.index}
			/>
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
		fontSize: 15,
		fontFamily: 'PlayfairDisplay-Bold',
		marginBottom: 3,
		color: contrastColor
	},
	author: {
		fontSize: 14,
		color: 'rgba(0, 0, 0, 0.8)'
	}
};
