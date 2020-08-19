import React from 'react';
import { View, TouchableWithoutFeedback, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

function PageButton(props) {
	let extraStyle = props.side === 'left' ? { left: 0 } : { right: 0 };
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={[styles.wrapper, extraStyle]} />
		</TouchableWithoutFeedback>
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
