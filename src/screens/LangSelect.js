import React, { useState } from 'react';
import { View, Text, Picker, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import showToast from '../components/Toast';
import { languages, primaryColor } from '../constants';

function LangSelect(props) {
	const [sLang, setSLang] = useState('');
	const [tLang, setTLang] = useState('');

	function onSave() {
		if (sLang && tLang) {
			if (sLang === tLang) {
				showToast('Source and target languages cannot be same');
			} else props.updateSettings({ sLang, tLang });
		} else showToast('Please choose source & target languages');
	}

	return (
		<View style={styles.wrapper}>
			<Text style={styles.label}>Choose source language</Text>
			<View style={styles.pickerWrapper}>
				<Picker
					prompt="Choose source language"
					selectedValue={sLang}
					onValueChange={setSLang}
					style={{ flex: 1 }}>
					{languages.map((lang, i) => (
						<Picker.Item label={lang.label} value={lang.value} key={i} />
					))}
				</Picker>
			</View>
			<Text style={styles.label}>Choose target language</Text>
			<View style={styles.pickerWrapper}>
				<Picker
					prompt="Choose target language"
					selectedValue={tLang}
					onValueChange={setTLang}
					style={{ flex: 1 }}>
					{languages.map((lang, i) => (
						<Picker.Item label={lang.label} value={lang.value} key={i} />
					))}
				</Picker>
			</View>
			<TouchableNativeFeedback onPress={onSave}>
				<View style={styles.buttonWrapper}>
					<Text style={styles.buttonText}>Save</Text>
				</View>
			</TouchableNativeFeedback>
			<View style={styles.textWrapper}>
				<Text style={styles.notice}>Select your source and target languages</Text>
				<Text style={styles.subtitle}>(These can be changed later)</Text>
			</View>
		</View>
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
	actions
)(LangSelect);

const styles = {
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff'
	},
	pickerWrapper: {
		height: 60,
		width: '80%',
		borderColor: primaryColor,
		borderWidth: 1,
		borderRadius: 5,
		paddingLeft: 10,
		marginBottom: 40
	},
	label: {
		marginBottom: 20,
		fontFamily: 'CircularBold',
		fontSize: 17
	},
	textWrapper: {
		height: 50,
		justifyContent: 'space-evenly',
		marginBottom: 10,
		marginTop: 35
	},
	notice: {
		fontSize: 16,
		fontFamily: 'Circular',
		color: primaryColor,
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		lineHeight: 20,
		marginBottom: 5
	},
	subtitle: {
		fontSize: 14,
		fontFamily: 'CircularLight',
		color: primaryColor,
		paddingLeft: 20,
		paddingRight: 20,
		textAlign: 'center',
		lineHeight: 20
	},
	buttonWrapper: {
		height: 42,
		width: 100,
		borderRadius: 6,
		backgroundColor: primaryColor,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		fontFamily: 'Circular',
		fontSize: 16,
		color: '#ffffff'
	}
};
