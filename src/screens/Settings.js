import React from 'react';
import { View, Text, Picker } from 'react-native';

// themes
// font family
// font size
// line spacing

function Settings() {
	return <View />;
}

export default Settings;

const pickerSettings = [
	{
		text: 'Theme',
		title: 'Select theme',
		items: [
			{
				label: '',
				value: ''
			}
		]
	},
	{
		text: 'Font Family',
		title: 'Select font',
		items: [
			{
				label: '',
				value: ''
			}
		]
	},
	{
		text: 'Font Size',
		title: 'Select font size',
		items: [
			{
				label: '',
				value: ''
			}
		]
	},
	{
		text: 'Line Spacing',
		title: 'Select line spacing',
		items: [
			{
				label: '',
				value: ''
			}
		]
	}
];
