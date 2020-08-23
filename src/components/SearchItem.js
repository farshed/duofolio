import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { contrastColor } from '../constants';

function SearchItem(props) {
	return (
		<TouchableOpacity style={styles.wrapper} onPress={() => props.onPress(props.cfi)}>
			<Text style={styles.text}>{props.excerpt.trim()}</Text>
		</TouchableOpacity>
	);
}

export default SearchItem;

const styles = {
	wrapper: {
		width: '90%',
		padding: 5,
		borderWidth: 1,
		borderColor: contrastColor,
		borderRadius: 3,
		marginTop: 15
	},
	text: {
		fontSize: 15
	}
};
