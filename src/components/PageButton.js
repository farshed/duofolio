import React from 'react';
import { View, TouchableHighlight, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

function PageButton(props) {
	let extraStyle = props.side === 'left' ? { left: 0 } : { right: 0 };
	return (
		<TouchableHighlight
			style={[styles.wrapper, extraStyle]}
			onPress={props.onPress}
			underlayColor="rgba(0, 0, 0, 0.1)">
			<View />
		</TouchableHighlight>
	);
}

export default PageButton;

const styles = {
	wrapper: {
		height,
		width: width / 4,
		position: 'absolute',
		top: 0,
		bottom: 0,
		zIndex: 1
	}
};
