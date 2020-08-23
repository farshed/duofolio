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
	{ name: 'settings', icon: 'settings' },
	{ name: 'bookmark', icon: 'bookmark' }
];

function Drawer(props) {
	const [currentSection, setCurrentSection] = useState('contents');

	function renderSection() {
		switch (currentSection) {
			case 'contents':
				return <Contents {...props} />;
			case 'search':
				return <BookSearch {...props} />;
			case 'settings':
				return <Settings />;
			default:
				return null;
		}
	}

	return (
		<View style={styles.wrapper}>
			<View style={styles.iconWrapper}>
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
			</View>
			{renderSection()}
		</View>
	);
}

export default Drawer;

const styles = {
	wrapper: {
		flex: 1,
		height,
		paddingTop: 10,
		paddingLeft: 15
	},
	iconWrapper: {
		flexDirection: 'row',
		paddingRight: 15,
		paddingBottom: 10
	},
	sectionButton: {
		height: 50,
		width: '33.33%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	selectedSectionButton: {
		borderColor: contrastColor,
		borderBottomWidth: 2
	}
};
