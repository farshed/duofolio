import React from 'react';
import { ScrollView } from 'react-native';
import PickerListItem from './PickerListItem';

const settings = [
	{
		text: 'Themes',
		title: 'Choose theme',
		items: [{ label: '', value: '' }]
	},
	{
		text: 'Language',
		title: 'Choose language'
	},
	{
		text: 'Page Flow',
		title: 'Choose page flow'
	},
	{
		text: 'Font Family',
		title: 'Choose font'
	},
	{
		text: 'Font Size',
		title: 'Choose font size'
	},
	{
		text: 'Line Height',
		title: 'Choose line height'
	}
];

function Settings(props) {
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
