import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { languages, contrastColor } from '../constants';

function LangSelect(props) {
	return (
		<View style={styles.wrapper}>
			{languages.map((lang, i) => (
				<TouchableOpacity
					style={styles.itemWrapper}
					onPress={() => props.updateSettings({ language: lang.value })}
					key={i}>
					<Image source={lang.image} style={styles.image} />
					<Text style={styles.text}>{lang.label}</Text>
				</TouchableOpacity>
			))}
			<View style={styles.textWrapper}>
				<Text style={styles.notice}>Select a language that you would like to practice.</Text>
				<Text style={styles.subtitle}>(It can be changed later)</Text>
			</View>
		</View>
	);
}

export default connect(
	null,
	actions
)(LangSelect);

const styles = {
	wrapper: {
		flex: 1,
		justifyContent: 'space-evenly',
		backgroundColor: '#ffffff'
	},
	itemWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 2,
		padding: 15,
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 45
	},
	image: {
		height: 50,
		width: 50
	},
	text: {
		fontSize: 24,
		fontFamily: 'Circular',
		color: contrastColor,
		marginLeft: 25
	},
	textWrapper: {
		height: 50,
		justifyContent: 'space-evenly'
	},
	notice: {
		fontSize: 16,
		fontFamily: 'Circular',
		color: contrastColor,
		textAlign: 'center',
		lineHeight: 20
	},
	subtitle: {
		fontSize: 14,
		fontFamily: 'CircularLight',
		color: contrastColor,
		paddingLeft: 20,
		paddingRight: 20,
		textAlign: 'center',
		lineHeight: 20
	}
};
