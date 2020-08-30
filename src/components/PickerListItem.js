import React from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

function PickerListItem(props) {
	function getCurrentValue() {
		switch (props.id) {
			case 'theme':
				return { bg: props.settings.bg, fg: props.settings.fg };
			case 'lang':
				return { language: props.settings.language };
			case 'flow':
				return { flow: props.settings.flow };
			case 'font':
				return { font: props.settings.font };
			case 'size':
				return { size: props.settings.size };
			case 'height':
				return { height: props.settings.height };
		}
	}

	return (
		<View style={styles.wrapper}>
			<Text style={styles.text}>{props.text}</Text>
			<Picker
				prompt={props.title}
				selectedValue={'Classic'}
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
