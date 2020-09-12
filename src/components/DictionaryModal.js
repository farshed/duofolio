import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Tts from 'react-native-tts';
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
	const [isTtsAvailable, setTtsAvailable] = useState(true);

	useEffect(() => {
		axios
			.get(translateApiUrl(props.sLang, props.tLang, props.selected))
			.then((res) => setTranslation(res.data[0][0][0]))
			.catch(() => showToast('An error occurred. Please try again later.'));
		let langIndex = languages.findIndex((lang) => lang.value === props.sLang);
		if (languages[langIndex].bcp) Tts.setDefaultLanguage(languages[langIndex].bcp);
		else setTtsAvailable(false);
	}, [props.sLang, props.tLang]);

	function speak() {
		if (isTtsAvailable) Tts.speak(props.selected);
		else showToast('Pronunciation not available');
	}

	function openWithGoogle() {
		props.hide();
		props.onTranslation();
	}

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
					{/* <View style={styles.langWrapper}>
						<Text style={styles.langName}>
							{languages.filter((lang) => lang.value === props.sLang)[0].label}
						</Text>
						<Icon name="arrow-right" size={16} color={primaryColor} style={styles.swapIcon} />
						<Text style={styles.langName}>
							{languages.filter((lang) => lang.value === props.tLang)[0].label}
						</Text>
					</View> */}
					<TouchableOpacity style={styles.itemWrapper} onPress={speak}>
						<Icon
							name="volume-2"
							color={isTtsAvailable ? primaryColor : 'rgba(15, 36, 57, 0.3)'}
							size={22}
						/>
						<View style={styles.textWrapper}>
							<Text style={styles.word}>{props.selected}</Text>
							<Text style={styles.translation}>{translation}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttonWrapper} onPress={openWithGoogle}>
						<Icon name="g-translate" type="material" size={18} color={primaryColor} />
						<Text style={styles.buttonText}>Open in Google Translate</Text>
					</TouchableOpacity>
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
		height: 200,
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
	itemWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
		width: width - 20,
		paddingLeft: 15,
		paddingRight: 15
	},
	textWrapper: {
		height: 50,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		paddingLeft: 10
	},
	word: {
		fontSize: 16,
		fontWeight: 'bold',
		color: primaryColor,
		paddingLeft: 10,
		paddingRight: 10
	},
	translation: {
		fontSize: 15,
		color: primaryColor,
		paddingLeft: 10,
		paddingRight: 10
	},
	swapIcon: {
		paddingLeft: 10,
		paddingRight: 10
	},
	buttonWrapper: {
		height: 45,
		width: 235,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: 'rgba(15, 36, 57, 0.07)',
		borderRadius: 8
	},
	buttonText: {
		fontSize: 15,
		fontFamily: 'CircularLight'
	}
};
