import React from 'react';
import { View, ActivityIndicator } from 'react-native';

function Spinner(props) {
	return (
		<View style={[styles.wrapper, { backgroundColor: props.bg }]}>
			<ActivityIndicator size="large" style={{ marginBottom: 15 }} color={props.fg} />
		</View>
	);
}

export default Spinner;

const styles = {
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
};
