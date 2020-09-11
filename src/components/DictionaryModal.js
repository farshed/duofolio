import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Picker } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import { connect } from 'react-redux';
import Icon from './Icon';
import Spinner from './Spinner';
import showToast from './Toast';
import { primaryColor, elevatedBG } from '../constants';
import { translateApiUrl } from '../constants/private';

const { width } = Dimensions.get('window');

function DictionaryModal(props) {
	const [translation, setTranslation] = useState('');

	useEffect(() => {
		axios
			.get(translateApiUrl(props.sLang, props.tLang, props.selected))
			.then((res) => setTranslation(res.data[0][0][0]))
			.catch(() => showToast('An error occurred. Please try again later.'));
	}, []);

	if (translation) {
		return (
			<Modal style={styles.modal}>
				<View style={styles.contentWrapper}>
					<View style={styles.langWrapper}>
						<Picker />
						<Icon name="swap" type="antdesign" size={20} color={primaryColor} />
						<Picker />
					</View>
					<Text>{translation}</Text>
					<Icon />
				</View>
			</Modal>
		);
	}
	return (
		<Modal style={styles.modal}>
			<View style={styles.contentWrapper}>
				<Spinner />
			</View>
		</Modal>
	);
}

function mapStateToProps(state) {
	return {
		sLang: state.settings.sLang,
		tLang: state.settings.tLang
	};
}

export default connect(
	mapStateToProps,
	null
)(DictionaryModal);

const styles = {
	modal: {
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	contentWrapper: {
		height: 180,
		width: width - 16,
		backgroundColor: elevatedBG,
		elevation: 5,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginBottom: -20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	langWrapper: {
		width: width - 20,
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: primaryColor,
		borderRadius: 5
	}
};
