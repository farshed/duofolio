import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { primaryColor } from '../constants';

function Spinner() {
	return (
		<View style={styles.wrapper}>
			<ActivityIndicator size="large" style={{ marginBottom: 15 }} color={primaryColor} />
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
