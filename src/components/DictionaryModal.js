import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { elevatedBG, contrastColor } from '../constants';
import frenchDict from '../../assets/dicts/fra-en.json';
import spanishDict from '../../assets/dicts/es-en.json';

const { height, width } = Dimensions.get('window');

function DictionaryModal(props) {
	function searchDict() {
		let q = ` ${props.selected.toLowerCase()} `;
		let dict;
		switch (props.language) {
			case 'FR':
				dict = frenchDict;
				break;
			case 'ES':
				dict = spanishDict;
				break;
			case 'NL':
				break;
			case 'RU':
				break;
			default:
				dict = frenchDict;
				break;
		}
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
						<View style={styles.itemWrapper} key={i}>
							<Text style={styles.word} numberOfLines={1}>
								{item[0]}
								{item[2] && <Text style={styles.part}>{`  [${item[2]}]`}</Text>}
							</Text>
							<Text style={styles.meaning} numberOfLines={1}>
								{item[1]}
							</Text>
						</View>
					))}
				</View>
			);
		}
		return (
			<View style={styles.placeholderWrapper}>
				<Text style={styles.placeholder}>No matches found!</Text>
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

export default DictionaryModal;

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
		justifyContent: 'space-evenly',
		alignItems: 'flex-start',
		marginTop: 8,
		paddingLeft: 20,
		paddingRight: 15
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
		fontFamily: 'Circular'
	}
};
