import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';
import Icon from './Icon';
import { elevatedBG, contrastColor, LANG } from '../constants';
import { FontFamilies } from '../theme';
import frenchDict from '../../assets/dicts/fra-en.json';
import spanishDict from '../../assets/dicts/es-en.json';
import dutchDict from '../../assets/dicts/nl-en.json';
import russianDict from '../../assets/dicts/ru-en.json';

const { height, width } = Dimensions.get('window');

function DictionaryModal(props) {
	function searchDict() {
		let q = ` ${props.selected.toLowerCase()} `;
		let dict;
		switch (props.language) {
			case LANG.FRENCH:
				dict = frenchDict;
				break;
			case LANG.SPANISH:
				dict = spanishDict;
				break;
			case LANG.DUTCH:
				dict = dutchDict;
				break;
			case LANG.RUSSIAN:
				dict = russianDict;
				break;
			default:
				return [];
		}
		Tts.setDefaultLanguage(props.language);
		return dict
			.filter((word) => {
				word = ` ${word[0].split('[')[0].toLowerCase()} `;
				return word.indexOf(q) > -1;
			})
			.sort((a, b) => a[0].length - b[0].length)
			.splice(0, 5);
	}

	function renderResults() {
		let results = searchDict();
		if (results.length > 0) {
			return (
				<View style={styles.mainWrapper}>
					{results.map((item, i) => (
						<TouchableOpacity
							style={styles.itemWrapper}
							onPress={() =>
								Tts.speak(item[0].replace(/\s?\{[^}]+\}/g, '').replace(/ *\[[^\]]*]/, ''))
							}
							key={i}>
							<Icon name="volume-2" size={22} color={contrastColor} style={styles.icon} />
							<View style={styles.textWrapper}>
								<Text style={styles.word} numberOfLines={1}>
									{item[0]}
									{item[2] && <Text style={styles.part}>{`  [${item[2]}]`}</Text>}
								</Text>
								<Text style={styles.meaning} numberOfLines={1}>
									{item[1]}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>
			);
		}
		return (
			<View style={styles.placeholderWrapper}>
				<Text style={styles.placeholder}>No matches found!</Text>
				<Text style={styles.placeholderSubtitle}>
					Make sure you have the right language selected in the settings
				</Text>
			</View>
		);
	}

	return (
		<Modal
			style={styles.modal}
			isVisible={props.isVisible}
			deviceHeight={height}
			swipeDirection="down"
			onBackButtonPress={props.onPressCancel}
			onBackdropPress={props.onPressCancel}
			onSwipeComplete={props.onPressCancel}
			backdropColor="rgba(0, 0, 0, 0.5)"
			animationOutTiming={120}
			animationInTiming={120}
			hideModalContentWhileAnimating>
			<View style={styles.wrapper}>{renderResults()}</View>
		</Modal>
	);
}

function mapStateToProps(state) {
	return { language: state.settings.language };
}

export default connect(
	mapStateToProps,
	null
)(DictionaryModal);

const styles = {
	placeholderWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal: {
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	wrapper: {
		height: 310,
		width: width - 16,
		backgroundColor: elevatedBG,
		elevation: 5,
		justifyContent: 'space-evenly',
		marginBottom: -20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	mainWrapper: {
		flex: 1,
		paddingTop: 5,
		paddingBottom: 10
	},
	itemWrapper: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8,
		paddingLeft: 20,
		paddingRight: 15
	},
	textWrapper: {
		flexDirection: 'column',
		justifyContent: 'space-evenly'
	},
	icon: {
		paddingRight: 10
	},
	word: {
		fontSize: 16,
		fontWeight: 'bold',
		color: contrastColor
	},
	meaning: {
		fontSize: 15,
		color: contrastColor
	},
	part: {
		fontSize: 13,
		fontStyle: 'italic',
		color: 'rgba(0, 0, 0, 0.7)'
	},
	placeholder: {
		fontSize: 16,
		fontFamily: FontFamilies.Circular
	},
	placeholderSubtitle: {
		fontSize: 14,
		paddingLeft: 50,
		paddingRight: 50,
		textAlign: 'center',
		marginTop: 15,
		lineHeight: 16,
		fontStyle: 'italic',
		fontFamily: FontFamilies.CircularLight
	}
};
