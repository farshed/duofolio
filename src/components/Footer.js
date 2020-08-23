import React from 'react';
import { View, Text, TouchableWithoutFeedback, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from './Icon';
import { contrastColor } from '../constants';

const { width } = Dimensions.get('window');

function Progress(props) {
	const { progress = 0, totalPages = 0 } = props.books[props.index];
	return (
		<View>
			<TouchableWithoutFeedback onPress={props.goPrev}>
				<View style={styles.buttonWrapper}>
					<Icon name="chevron-left" size={22} color={contrastColor} />
				</View>
			</TouchableWithoutFeedback>
			<View>
				<Text>{`${progress}/${totalPages}`}</Text>
				<Slider />
			</View>
			<TouchableWithoutFeedback onPress={props.goNext}>
				<View style={styles.buttonWrapper}>
					<Icon name="chevron-right" size={22} color={contrastColor} />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}

function mapStateToProps(state) {
	return { books: state.books };
}

export default connect(
	mapStateToProps,
	null
)(Progress);

const styles = {
	wrapper: {
		height: 60,
		width,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	buttonWrapper: {
		height: 60,
		width: '15%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	progressWrapper: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	}
};
