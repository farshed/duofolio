import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { languages, contrastColor } from '../constants';
import { FontFamilies } from '../theme';

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
		fontFamily: FontFamilies.Circular,
		color: contrastColor,
		marginLeft: 25
	},
	textWrapper: {
		height: 50,
		justifyContent: 'space-evenly'
	},
	notice: {
		fontSize: 16,
		fontFamily: FontFamilies.Circular,
		color: contrastColor,
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		lineHeight: 20,
		marginBottom: 8
	},
	subtitle: {
		fontSize: 14,
		fontFamily: FontFamilies.CircularLight,
		color: contrastColor,
		paddingLeft: 20,
		paddingRight: 20,
		textAlign: 'center',
		lineHeight: 20
	}
};
