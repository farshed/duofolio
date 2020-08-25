import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { elevatedBG } from '../constants';

const { width } = Dimensions.get('window');

function DictionaryModal(props) {
	return (
		<Modal style={styles.modal}>
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
