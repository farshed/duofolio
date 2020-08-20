import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

function ContentItem(props) {
	return (
		<TouchableHighlight onPress={props.onPress} underlayColor="rgba(0, 0, 0, 0.5)">
			<View style={styles.wrapper}>
				<Text style={styles.text}>{props.label}</Text>
			</View>
		</TouchableHighlight>
	);
}

export default ContentItem;

const styles = {
	wrapper: {
		height: 35,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	text: {
		fontSize: 15
	}
};
