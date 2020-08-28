import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { languages } from '../constants';

function LangSelect(props) {
	return (
		<View style={styles.wrapper}>
			{languages.map((lang, i) => (
				<View style={styles.itemWrapper} key={i}>
					<Image source={lang.image} style={styles.image} />
					<Text style={styles.text}>{lang.name}</Text>
				</View>
			))}
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
	}
};
