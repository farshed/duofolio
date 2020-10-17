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
	const [langIndex, setLangIndex] = useState({ src: 0, trg: 0 });

	useEffect(() => {
		axios
			.get(translateApiUrl(props.sLang, props.tLang, props.selected))
			.then((res) => setTranslation(res.data[0][0][0]))
			.catch(() => showToast('An error occurred. Please try again later.'));
		let srcIndex = languages.findIndex((lang) => lang.value === props.sLang);
		let trgIndex = languages.findIndex((lang) => lang.value === props.tLang);
		setLangIndex({ src: srcIndex, trg: trgIndex });
	}, [props.sLang, props.tLang]);

	function speakSrc() {
		if (langIndex.src > -1 && languages[langIndex.src].bcp) {
			Tts.setDefaultLanguage(languages[langIndex.src].bcp);
			Tts.speak(props.selected);
		} else showToast('Pronunciation not available for this language');
	}

	function speakTrg() {
		if (langIndex.trg > -1 && languages[langIndex.trg].bcp) {
			Tts.setDefaultLanguage(languages[langIndex.trg].bcp);
			Tts.speak(translation);
		} else showToast('Pronunciation not available for this language');
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
					<TouchableOpacity style={styles.itemWrapper} onPress={speakSrc}>
						<Icon
							name="volume-2"
							color={langIndex.src > -1 ? primaryColor : 'rgba(15, 36, 57, 0.3)'}
							size={18}
						/>
						<Text style={styles.langName}>
							{languages.filter((lang) => lang.value === props.sLang)[0].label}
						</Text>
					</TouchableOpacity>
					<View style={styles.wordWrapper}>
						<Text style={styles.word} numberOfLines={2}>
							{props.selected}
						</Text>
						<Icon />
					</View>
					<TouchableOpacity style={styles.itemWrapper} onPress={speakTrg}>
						<Icon
							name="volume-2"
							color={langIndex.trg > -1 ? primaryColor : 'rgba(15, 36, 57, 0.3)'}
							size={18}
						/>
						<Text style={styles.langName}>
							{languages.filter((lang) => lang.value === props.tLang)[0].label}
						</Text>
					</TouchableOpacity>
					<View style={styles.translationWrapper}>
						<Text style={styles.translation} numberOfLines={2}>
							{translation}
						</Text>
					</View>
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
		height: 300,
		width: width - 16,
		backgroundColor: elevatedBG,
		elevation: 5,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginBottom: -20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		paddingTop: 10
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
		fontFamily: 'CircularBold',
		fontSize: 15,
		color: primaryColor,
		paddingLeft: 12
	},
	itemWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		width: width - 50
	},
	textWrapper: {
		height: 50,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		paddingLeft: 10
	},
	wordWrapper: {
		height: 60,
		width: width - 40,
		borderWidth: 1,
		borderColor: primaryColor,
		borderRadius: 5
	},
	translationWrapper: {
		height: 60,
		width: width - 40,
		backgroundColor: primaryColor,
		borderRadius: 5
	},
	word: {
		fontSize: 16,
		color: primaryColor,
		padding: 10
	},
	translation: {
		fontSize: 16,
		color: '#ffffff',
		padding: 10
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
