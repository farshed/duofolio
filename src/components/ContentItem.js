import React from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

function ContentItem(props) {
	return (
		<TouchableOpacity onPress={() => props.onPress(props.href)} style={styles.wrapper}>
			<Text style={styles.text} numberOfLines={1}>
				{props.label}
			</Text>
		</TouchableOpacity>
	);
}

export default ContentItem;

const styles = {
	wrapper: {
		height: 40,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	text: {
		width: width * 0.6,
		fontSize: 15
	}
};
