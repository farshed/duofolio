import React from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { primaryColor } from '../constants';

function PickerListItem(props) {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.text}>{props.text}</Text>
			<View style={styles.pickerWrapper}>
				<Picker
					prompt={props.title}
					selectedValue={props.settings[props.id]}
					onValueChange={(val) => props.updateSettings({ [props.id]: val })}
					style={styles.picker}>
					{props.items.map((item, i) => (
						<Picker.Item label={item.label} value={item.value} key={i} />
					))}
				</Picker>
			</View>
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
		height: 70,
		justifyContent: 'space-evenly',
		marginTop: 15
	},
	pickerWrapper: {
		height: 35,
		width: '90%',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: primaryColor,
		borderRadius: 4
	},
	text: {
		fontSize: 16,
		fontFamily: 'CircularBold',
		paddingLeft: 2,
		paddingBottom: 6
	},
	picker: {
		width: '100%'
	}
};
