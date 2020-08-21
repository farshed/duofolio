import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

function DictionaryModal(props) {
	return (
		<Modal style={styles.modal}>
			<View style={styles.wrapper} />
		</Modal>
	);
}

export default DictionaryModal;

const styles = {
	modal: {},
	wrapper: {}
};
