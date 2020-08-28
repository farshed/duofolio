import React from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { languages, contrastColor } from '../constants';

function LangSelect(props) {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.notice}>Select a language that you would like to practice</Text>
			{languages.map((lang, i) => (
				<TouchableHighlight onPress={() => {}} key={i}>
					<View style={styles.itemWrapper}>
						<Image source={lang.image} style={styles.image} />
						<Text style={styles.text}>{lang.name}</Text>
					</View>
				</TouchableHighlight>
			))}
			<Text style={styles.notice}>It can be changed later</Text>
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
		justifyContent: 'space-evenly'
	},
	itemWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	image: {
		height: 50,
		width: 50
	},
	text: {
		fontSize: 18,
		fontFamily: 'CircularBold'
	},
	notice: {
		fontSize: 15,
		fontFamily: 'Circular',
		color: contrastColor
	}
};
