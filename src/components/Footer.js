import React from 'react';
import { View, Text, TouchableWithoutFeedback, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from './Icon';
import { contrastColor } from '../constants';

const { width } = Dimensions.get('window');
function Progress(props) {
	const { progress = 0, totalPages = 0 } = props.books[props.index];
	return (
		<View style={styles.wrapper}>
			<TouchableWithoutFeedback onPress={props.goPrev}>
				<View style={styles.buttonWrapper}>
					<Icon name="chevron-left" size={24} color={contrastColor} />
				</View>
			</TouchableWithoutFeedback>
			<View style={styles.progressWrapper}>
				<Text style={styles.text}>{`${progress}/${totalPages}`}</Text>
				<Slider
					style={styles.slider}
					disabled={progress === 0 || totalPages === 0}
					step={1}
					value={progress || 1}
					minimumValue={1}
					maximumValue={totalPages || 1}
					minimumTrackTintColor={contrastColor}
					thumbTintColor={contrastColor}
					onSlidingComplete={(n) => props.goToLocation(JSON.parse(props.locations)[n - 1])}
				/>
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
		height: 52,
		width,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#ffffff'
	},
	buttonWrapper: {
		height: 52,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	progressWrapper: {
		flex: 1,
		height: 52,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	text: {
		fontSize: 14,
		fontFamily: 'Circular',
		marginBottom: 10
	},
	slider: {
		width: '95%',
		height: 3
	}
};
