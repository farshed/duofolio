import React from 'react';
import { View, Text, TouchableWithoutFeedback, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from './Icon';

const { width } = Dimensions.get('window');
function Progress(props) {
	const { progress, type, totalPages = 0 } = props.books[props.index];

	function goTo(n) {
		props.goToLocation(type === 'pdf' ? n : JSON.parse(props.locations)[n - 1]);
	}

	return (
		<View style={[styles.wrapper, { backgroundColor: props.bg }]}>
			<TouchableWithoutFeedback onPress={props.goPrev}>
				<View style={styles.buttonWrapper}>
					<Icon name="chevron-left" size={24} color={props.fg} />
				</View>
			</TouchableWithoutFeedback>
			<View style={styles.progressWrapper}>
				<Text style={[styles.text, { color: props.fg }]}>{`${
					progress === undefined ? 'Loading' : progress + (type === 'pdf' ? 0 : 1)
				} / ${totalPages}`}</Text>
				<Slider
					style={styles.slider}
					disabled={progress === undefined || totalPages === 0}
					step={1}
					value={progress || 1}
					minimumValue={1}
					maximumValue={totalPages || 1}
					minimumTrackTintColor={props.fg}
					thumbTintColor={props.fg}
					onSlidingComplete={goTo}
				/>
			</View>
			<TouchableWithoutFeedback onPress={props.goNext}>
				<View style={styles.buttonWrapper}>
					<Icon name="chevron-right" size={24} color={props.fg} />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		books: state.books,
		bg: state.settings.bg,
		fg: state.settings.fg
	};
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
		alignItems: 'center'
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
		marginBottom: 10
	},
	slider: {
		width: '95%',
		height: 6
	}
};
