import React from 'react';
import { ScrollView } from 'react-native';

function Settings(props) {
	return <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} />;
}

export default Settings;

const styles = {
	scrollView: { flex: 1 },
	scrollViewContent: {
		alignItems: 'flex-start',
		paddingBottom: 50
	}
};
