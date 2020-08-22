import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from './Icon';
import Contents from './Contents';
import BookSearch from './BookSearch';
import Settings from './Settings';
import { contrastColor } from '../constants';

const { height } = Dimensions.get('window');
const sections = [
	{ name: 'contents', icon: 'book-open' },
	{ name: 'search', icon: 'search' },
	{ name: 'settings', icon: 'settings' }
];

function Drawer(props) {
	const [currentSection, setCurrentSection] = useState('contents');

	function renderSection() {
		switch (currentSection) {
			case 'contents':
				return <Contents {...props} />;
			case 'search':
				return <BookSearch />;
			case 'settings':
				return <Settings />;
			default:
				return;
		}
	}

	return (
		<View style={styles.wrapper}>
			{sections.map(({ name, icon }, i) => (
				<TouchableOpacity
					onPress={() => setCurrentSection(name)}
					style={
						currentSection === name
							? [styles.sectionButton, styles.selectedSectionButton]
							: styles.sectionButton
					}
					key={i}>
					<Icon name={icon} size={22} color={contrastColor} />
				</TouchableOpacity>
			))}
			{renderSection()}
		</View>
	);
}

export default Drawer;

const styles = {
	wrapper: {
		flex: 1,
		height,
		padding: 15
	},
	sectionButton: {
		height: 40,
		width: '33%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	selectedSectionButton: {
		borderColor: contrastColor,
		borderBottomWidth: 2
	}
};
