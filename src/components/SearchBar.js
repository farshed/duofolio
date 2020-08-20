// import React, { Component } from 'react';
// import {
// 	StyleSheet,
// 	Dimensions,
// 	Platform,
// 	View,
// 	TextInput,
// 	TouchableOpacity,
// 	Animated
// } from 'react-native';
// import Icon from './Icon';

// const INITIAL_TOP = Platform.OS === 'ios' ? -80 : -60;
// const SCREEN_WIDTH = Dimensions.get('window').width;

// export default class Search extends Component {
// 	static defaultProps = {
// 		data: [],
// 		placeholder: 'Search',
// 		backButtonAccessibilityLabel: 'Navigate up',
// 		closeButtonAccessibilityLabel: 'Clear search text',
// 		heightAdjust: 0,
// 		backgroundColor: 'white',
// 		iconColor: 'gray',
// 		textColor: 'gray',
// 		selectionColor: 'lightskyblue',
// 		placeholderTextColor: 'lightgray',
// 		animate: true,
// 		animationDuration: 200,
// 		showOnLoad: false,
// 		hideBack: false,
// 		hideX: false,
// 		iOSPadding: true,
// 		iOSPaddingBackgroundColor: 'transparent',
// 		iOSHideShadow: false,
// 		clearOnShow: false,
// 		clearOnHide: true,
// 		clearOnBlur: false,
// 		focusOnLayout: true,
// 		autoCorrect: true,
// 		autoCapitalize: 'sentences',
// 		keyboardAppearance: 'default',
// 		fontFamily: 'System',
// 		allDataOnEmptySearch: false,
// 		backCloseSize: 28,
// 		fontSize: 20,
// 		editable: true
// 	};

// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			input: '',
// 			top: new Animated.Value(props.showOnLoad ? 0 : INITIAL_TOP + props.heightAdjust)
// 		};
// 	}

// 	getValue = () => {
// 		return this.state.input;
// 	};

// 	setValue = (input) => {
// 		return this.setState({ input });
// 	};

// 	show = () => {
// 		const { animate, animationDuration, clearOnShow } = this.props;
// 		if (clearOnShow) {
// 			this.setState({ input: '' });
// 		}
// 		this.setState({ show: true });
// 		if (animate) {
// 			Animated.timing(this.state.top, {
// 				toValue: 0,
// 				duration: animationDuration,
// 				useNativeDriver: true
// 			}).start();
// 		} else {
// 			this.setState({ top: new Animated.Value(0) });
// 		}
// 	};

// 	hide = () => {
// 		const { onHide, animate, animationDuration } = this.props;
// 		if (onHide) {
// 			onHide(this.state.input);
// 		}
// 		if (animate) {
// 			Animated.timing(this.state.top, {
// 				toValue: INITIAL_TOP,
// 				duration: animationDuration,
// 				useNativeDriver: true
// 			}).start();
// 			const timerId = setTimeout(() => {
// 				this._doHide();
// 				clearTimeout(timerId);
// 			}, animationDuration);
// 		} else {
// 			this.setState({ top: new Animated.Value(INITIAL_TOP) });
// 			this._doHide();
// 		}
// 	};

// 	_doHide = () => {
// 		const { clearOnHide } = this.props;
// 		this.setState({ show: false });
// 		if (clearOnHide) {
// 			this.setState({ input: '' });
// 		}
// 	};

// 	_handleX = () => {
// 		const { onX } = this.props;
// 		this._clearInput();
// 		if (onX) onX();
// 	};

// 	_handleBlur = () => {
// 		const { onBlur, clearOnBlur } = this.props;
// 		if (onBlur) {
// 			onBlur();
// 		}
// 		if (clearOnBlur) {
// 			this._clearInput();
// 		}
// 	};

// 	_clearInput = () => {
// 		this.setState({ input: '' });
// 		this._onChangeText('');
// 	};

// 	_onChangeText = (input) => {
// 		const { handleChangeText } = this.props;
// 		this.setState({ input });
// 		if (handleChangeText) {
// 			handleChangeText(input);
// 		}
// 	};

// 	render = () => {
// 		const {
// 			placeholder,
// 			heightAdjust,
// 			backgroundColor,
// 			iconColor,
// 			textColor,
// 			selectionColor,
// 			placeholderTextColor,
// 			onBack,
// 			hideBack,
// 			hideX,
// 			iOSPadding,
// 			iOSPaddingBackgroundColor,
// 			iOSHideShadow,
// 			onSubmitEditing,
// 			onFocus,
// 			focusOnLayout,
// 			autoCorrect,
// 			autoCapitalize,
// 			keyboardAppearance,
// 			fontFamily,
// 			backButton,
// 			backButtonAccessibilityLabel,
// 			closeButton,
// 			closeButtonAccessibilityLabel,
// 			backCloseSize,
// 			fontSize,
// 			editable
// 		} = this.props;
// 		return (
// 			<Animated.View
// 				style={[
// 					styles.container,
// 					{
// 						transform: [
// 							{
// 								translateY: this.state.top
// 							}
// 						],
// 						shadowOpacity: iOSHideShadow ? 0 : 0.7
// 					}
// 				]}>
// 				{this.props.showOnLoad && (
// 					<View style={[{ backgroundColor }, { width: SCREEN_WIDTH }]}>
// 						{Platform.OS === 'ios' && iOSPadding && (
// 							<View style={{ height: 20, backgroundColor: iOSPaddingBackgroundColor }} />
// 						)}
// 						<View
// 							style={[
// 								styles.nav,
// 								{ height: (Platform.OS === 'ios' ? 52 : 62) + heightAdjust }
// 							]}>
// 							{!hideBack && (
// 								<TouchableOpacity
// 									accessible={true}
// 									accessibilityComponentType="button"
// 									accessibilityLabel={backButtonAccessibilityLabel}
// 									onPress={onBack || this.hide}>
// 									{backButton ? (
// 										<View style={{ width: backCloseSize, height: backCloseSize }}>
// 											{backButton}
// 										</View>
// 									) : (
// 										<Icon
// 											name="arrow-back"
// 											size={backCloseSize}
// 											style={{
// 												color: iconColor,
// 												padding: heightAdjust / 2 + 10
// 											}}
// 										/>
// 									)}
// 								</TouchableOpacity>
// 							)}
// 							<TextInput
// 								ref={(ref) => (this.textInput = ref)}
// 								onLayout={() => focusOnLayout && this.textInput.focus()}
// 								style={[
// 									styles.input,
// 									{
// 										width: SCREEN_WIDTH - 120,
// 										fontSize: fontSize,
// 										color: textColor,
// 										fontFamily: fontFamily,
// 										marginLeft: hideBack ? 30 : 0,
// 										marginTop: Platform.OS === 'ios' ? heightAdjust / 2 + 10 : 0
// 									}
// 								]}
// 								selectionColor={selectionColor}
// 								onChangeText={(input) => this._onChangeText(input)}
// 								onSubmitEditing={() => (onSubmitEditing ? onSubmitEditing() : null)}
// 								onFocus={() => (onFocus ? onFocus() : null)}
// 								onBlur={this._handleBlur}
// 								placeholder={placeholder}
// 								placeholderTextColor={placeholderTextColor}
// 								value={this.state.input}
// 								underlineColorAndroid="transparent"
// 								returnKeyType="search"
// 								autoCorrect={autoCorrect}
// 								autoCapitalize={autoCapitalize}
// 								keyboardAppearance={keyboardAppearance}
// 								editable={editable}
// 							/>
// 							<TouchableOpacity
// 								accessible={true}
// 								accessibilityComponentType="button"
// 								accessibilityLabel={closeButtonAccessibilityLabel}
// 								onPress={hideX || this.state.input === '' ? null : this._handleX}>
// 								{closeButton ? (
// 									<View style={{ width: backCloseSize, height: backCloseSize }}>
// 										{closeButton}
// 									</View>
// 								) : (
// 									<Icon
// 										name={'close'}
// 										size={backCloseSize}
// 										style={{
// 											color:
// 												hideX || this.state.input == '' ? backgroundColor : iconColor,
// 											padding: heightAdjust / 2 + 10
// 										}}
// 									/>
// 								)}
// 							</TouchableOpacity>
// 						</View>
// 					</View>
// 				)}
// 			</Animated.View>
// 		);
// 	};
// }

// const styles = {
// 	container: {
// 		flex: 1,
// 		zIndex: 10,
// 		position: 'absolute',
// 		elevation: 2,
// 		shadowRadius: 5
// 	},
// 	nav: {
// 		...Platform.select({
// 			android: {
// 				borderBottomColor: 'lightgray',
// 				borderBottomWidth: StyleSheet.hairlineWidth
// 			}
// 		}),
// 		flex: 1,
// 		flexBasis: 1,
// 		flexDirection: 'row',
// 		justifyContent: 'space-around',
// 		alignItems: 'center'
// 	},
// 	input: {
// 		...Platform.select({
// 			ios: { height: 30 },
// 			android: { height: 50 }
// 		}),
// 		width: Dimensions.get('window').width - 120
// 	}
// };

import React, { useState, useEffect, useRef } from 'react';
import { TextInput, TouchableOpacity, Animated, Dimensions } from 'react-native';
// import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from './Icon';
import { contrastColor } from '../constants';
import useDidUpdate from '../hooks/useDidUpdate';
import { TapGestureHandler } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const HEIGHT = 56;
const HIDDEN_POSITION = -(HEIGHT * 2);
const DURATION = 200;

const AnimatedInput = Animated.createAnimatedComponent(TextInput);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function SearchBar(props) {
	const [position] = useState(new Animated.Value(HIDDEN_POSITION));
	const inputRef = useRef(null);

	useDidUpdate(() => {
		if (props.isVisible) {
			Animated.timing(position, {
				toValue: -HEIGHT,
				duration: DURATION,
				useNativeDriver: true
			}).start(() => inputRef.current?.focus());
		} else {
			Animated.timing(position, {
				toValue: HIDDEN_POSITION,
				duration: DURATION,
				useNativeDriver: true
			}).start();
		}
	}, [props.isVisible]);

	return (
		<Animated.View style={[styles.wrapper, { transform: [{ translateY: position }] }]}>
			<TouchableOpacity style={styles.backArrow} onPress={props.hide}>
				<Icon name="arrow-left" size={24} color={contrastColor} />
			</TouchableOpacity>
			<AnimatedInput
				ref={inputRef}
				style={styles.input}
				placeholder="Search"
				allowFontScaling={false}
				clearButtonMode="always"
				placeholderTextColor="rgba(0, 0, 0, 0.7)"
				autoCorrect={false}
				autoFocus={props.isVisible}
				returnKeyType="search"
				value={props.value}
				onChangeText={props.setValue}
				onBlur={props.hide}
			/>
		</Animated.View>
	);
}

export default SearchBar;

const styles = {
	wrapper: {
		height: HEIGHT,
		width,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		elevation: 5,
		backgroundColor: '#ffffff',
		position: 'absolute',
		top: 0
	},
	backArrow: {
		paddingLeft: 15,
		paddingRight: 15,
		height: HEIGHT,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		flex: 1,
		fontSize: 17,
		height: HEIGHT,
		color: contrastColor,
		paddingRight: 30,
		alignItems: 'center'
	}
};
