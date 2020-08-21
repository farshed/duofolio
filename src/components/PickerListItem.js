import React from 'react';
import { View, Text, Picker, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

function PickerListItem(props) {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.text}>{props.text}</Text>
			<Picker title={props.title} onValueChange={props.onChange}>
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
		width,
		height: 65,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold'
	}
};
