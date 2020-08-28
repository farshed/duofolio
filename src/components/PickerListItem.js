import React from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

function PickerListItem(props) {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.text}>{props.text}</Text>
			<Picker
				prompt={props.title}
				selectedValue={props.items[0].value}
				onValueChange={props.updateSettings}
				style={styles.picker}>
				{props.items.map((item, i) => (
					<Picker.Item label={item.label} value={item.value} key={i} />
				))}
			</Picker>
		</View>
	);
}

function mapStateToProps(state) {
	return { settings: state.settings };
}

export default connect(
	mapStateToProps,
	actions
)(PickerListItem);

const styles = {
	wrapper: {
		width: '100%',
		height: 60,
		justifyContent: 'space-evenly',
		marginTop: 15
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold',
		paddingLeft: 8
	},
	picker: {
		width: '65%'
	}
};
