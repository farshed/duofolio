import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Picker } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import { connect } from 'react-redux';
import Icon from './Icon';
import Spinner from './Spinner';
import showToast from './Toast';
import { primaryColor, elevatedBG, languages } from '../constants';
import { translateApiUrl } from '../constants/private';

const { height, width } = Dimensions.get('window');

function DictionaryModal(props) {
	const [translation, setTranslation] = useState('');

	useEffect(() => {
		axios
			.get(translateApiUrl(props.sLang, props.tLang, props.selected))
			.then((res) => setTranslation(res.data[0][0][0]))
			.catch(() => showToast('An error occurred. Please try again later.'));
	}, [props.sLang, props.tLang]);

	if (translation) {
		return (
			<Modal
				style={styles.modal}
				isVisible={props.isVisible}
				deviceHeight={height}
				onBackButtonPress={props.hide}
				onBackdropPress={props.hide}
				onSwipeComplete={props.hide}
				backdropColor="rgba(0, 0, 0, 0.5)"
				swipeDirection="down"
				animationOutTiming={100}
				animationInTiming={100}
				hideModalContentWhileAnimating>
				<View style={styles.contentWrapper}>
					<View style={styles.langWrapper}>
						<Text style={styles.langName}>
							{languages.filter((lang) => lang.value === props.sLang)[0].label}
						</Text>
						<Icon
							name="swap"
							type="antdesign"
							size={20}
							color={primaryColor}
							style={styles.swapIcon}
						/>
						<Text style={styles.langName}>
							{languages.filter((lang) => lang.value === props.tLang)[0].label}
						</Text>
					</View>
					<Text style={styles.translation}>{translation}</Text>
					{/* <Icon /> */}
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
		height: 150,
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
		height: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 8
	},
	langName: {
		fontFamily: 'CircularLight',
		fontSize: 14,
		color: primaryColor
	},
	translation: {
		fontFamily: 'Circular',
		fontSize: 20,
		color: primaryColor,
		paddingLeft: 10,
		paddingRight: 10
	},
	swapIcon: {
		paddingLeft: 10,
		paddingRight: 10
	}
};
