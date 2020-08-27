import React from 'react';
import { View, Text, Picker } from 'react-native';

function PickerListItem(props) {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.text}>{props.text}</Text>
			<Picker
				prompt={props.title}
				selectedValue={props.items[0].value}
				onValueChange={console.log}
				style={styles.picker}
				itemStyle={styles.pickerItem}>
				{props.items.map((item, i) => (
					<Picker.Item {...item} key={i} />
				))}
			</Picker>
		</View>
	);
}

export default PickerListItem;

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
		paddingLeft: 10
	},
	picker: {
		width: '65%'
	},
	pickerItem: {
		marginLeft: 200,
		backgroundColor: 'red'
	}
};
