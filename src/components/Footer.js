import React from 'react';
import { View, Text, TouchableWithoutFeedback, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from './Icon';
import { contrastColor } from '../constants';

const { width } = Dimensions.get('window');

function Progress(props) {
	const { progress = 0, totalPages = 0 } = props.books[props.index];
	console.log(progress, totalPages);
	return (
		<View style={styles.wrapper}>
			<TouchableWithoutFeedback onPress={props.goPrev}>
				<View style={styles.buttonWrapper}>
					<Icon name="chevron-left" size={24} color={contrastColor} />
				</View>
			</TouchableWithoutFeedback>
			<View style={styles.progressWrapper}>
				<Text>{`${progress}/${totalPages}`}</Text>
				<Slider />
			</View>
			<TouchableWithoutFeedback onPress={props.goNext}>
				<View style={styles.buttonWrapper}>
					<Icon name="chevron-right" size={24} color={contrastColor} />
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
		justifyContent: 'space-between',
		backgroundColor: '#ffffff'
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
