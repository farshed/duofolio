import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { elevatedBG } from '../constants';
import frenchDict from '../../assets/dicts/fra-en.json';
import spanishDict from '../../assets/dicts/es-en.json';

const { height, width } = Dimensions.get('window');

function DictionaryModal(props) {
	function searchDict() {
		let q = ` ${props.selected.toLowerCase()} `;
		let dict;
		switch (props.language) {
			case 'french':
				dict = frenchDict;
				break;
			case 'spanish':
				dict = spanishDict;
				break;
			default:
				break;
		}
		return dict
			.filter((word) => {
				word = ` ${word[0].split('[')[0].toLowerCase()} `;
				return word.indexOf(q) > -1;
			})
			.sort((a, b) => a[0].length - b[0].length);
	}

	function renderResults() {
		let results = searchDict();
		if (results.length > 0) {
			return results.map((item, i) => (
				<View style={styles.itemWrapper} key={i}>
					<Text style={styles.word}>{item.word}</Text>
					<Text style={styles.meaning}>{item.meaning}</Text>
				</View>
			));
		}
		return;
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
			animationOutTiming={200}
			animationInTiming={200}
			hideModalContentWhileAnimating>
			<View style={styles.wrapper}>
				<ScrollView style={styles.scrollView}>
					{props.results.map((item, i) => (
						<View style={styles.itemWrapper} key={i}>
							<Text style={styles.word}>{item.word}</Text>
							<Text style={styles.meaning}>{item.meaning}</Text>
						</View>
					))}
				</ScrollView>
			</View>
		</Modal>
	);
}

export default DictionaryModal;

const styles = {
	modal: {
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	wrapper: {
		height: 300,
		width: width,
		backgroundColor: elevatedBG,
		elevation: 5,
		justifyContent: 'space-evenly',
		marginBottom: -20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	scrollView: { flex: 1 },
	itemWrapper: {},
	word: {},
	meaning: {}
};
