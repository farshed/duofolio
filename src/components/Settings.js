import React from 'react';
import { ScrollView } from 'react-native';
import PickerListItem from './PickerListItem';
import { settings } from '../constants';

function Settings() {
	return (
		<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
			{settings.map((item, i) => (
				<PickerListItem {...item} key={i} />
			))}
		</ScrollView>
	);
}

export default Settings;

const styles = {
	scrollView: { flex: 1 },
	scrollViewContent: {
		alignItems: 'flex-start',
		paddingBottom: 50
	}
};
