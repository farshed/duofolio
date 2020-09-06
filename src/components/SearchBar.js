// import React, { useState, useRef } from 'react';
// import { TextInput, Animated } from 'react-native';
// import Icon from './Icon';
// import { contrastColor } from '../constants';
// import useDidUpdate from '../hooks/useDidUpdate';

// const HEIGHT = 56;
// const HIDDEN_POSITION = -(HEIGHT * 2);
// const DURATION = 150;
// const AnimatedInput = Animated.createAnimatedComponent(TextInput);

// function SearchBar(props) {
// 	const [shouldRender, setShouldRender] = useState(false);
// 	const [position] = useState(new Animated.Value(HIDDEN_POSITION));
// 	const inputRef = useRef(null);

// 	useDidUpdate(() => {
// 		if (props.isVisible) {
// 			setShouldRender(true);
// 			inputRef.current?.focus();
// 			Animated.timing(position, {
// 				toValue: -HEIGHT,
// 				duration: DURATION,
// 				useNativeDriver: true
// 			}).start();
// 		} else {
// 			inputRef.current?.blur();
// 			Animated.timing(position, {
// 				toValue: HIDDEN_POSITION,
// 				duration: DURATION,
// 				useNativeDriver: true
// 			}).start(() => setShouldRender(false));
// 		}
// 	}, [props.isVisible]);

// 	return shouldRender ? (
// 		<Animated.View style={[styles.wrapper, { transform: [{ translateY: position }] }]}>
// 			<Icon
// 				name="arrow-left"
// 				size={24}
// 				color={contrastColor}
// 				onPress={props.hide}
// 				style={styles.icon}
// 			/>
// 			<AnimatedInput
// 				ref={inputRef}
// 				style={styles.input}
// 				placeholder="Search"
// 				allowFontScaling={false}
// 				placeholderTextColor="rgba(0, 0, 0, 0.7)"
// 				autoCorrect={false}
// 				autoFocus={props.isVisible}
// 				returnKeyType="search"
// 				value={props.value}
// 				onChangeText={props.setValue}
// 				// onBlur={props.hide}
// 			/>
// 			<Icon
// 				name="x"
// 				size={24}
// 				color={contrastColor}
// 				onPress={() => props.setValue('')}
// 				style={styles.icon}
// 			/>
// 		</Animated.View>
// 	) : null;
// }

// export default SearchBar;

// const styles = {
// 	wrapper: {
// 		height: HEIGHT,
// 		flexDirection: 'row',
// 		justifyContent: 'flex-start',
// 		alignItems: 'center',
// 		elevation: 5,
// 		backgroundColor: '#ffffff',
// 		position: 'absolute',
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		zIndex: 1
// 	},
// 	icon: {
// 		paddingLeft: 14,
// 		paddingRight: 14
// 	},
// 	input: {
// 		flex: 1,
// 		fontSize: 17,
// 		height: HEIGHT,
// 		color: contrastColor,
// 		paddingLeft: 10,
// 		paddingRight: 5
// 	}
// };
import React from 'react';
import { View, TextInput, Dimensions } from 'react-native';
import Icon from './Icon';
import { contrastColor } from '../constants';

const HEIGHT = 56;
const WIDTH = Dimensions.get('window').width;

function SearchBar(props) {
	return (
		<View style={styles.wrapper}>
			<Icon
				name="arrow-left"
				size={24}
				color={contrastColor}
				onPress={props.hide}
				style={styles.icon}
			/>
			<TextInput
				style={styles.input}
				placeholder="Search"
				allowFontScaling={false}
				placeholderTextColor="rgba(0, 0, 0, 0.7)"
				autoCorrect={false}
				autoFocus={true}
				returnKeyType="search"
				value={props.value}
				onChangeText={props.setValue}
				onBlur={() => !props.value && props.hide()}
			/>
			<Icon
				name="x"
				size={24}
				color={contrastColor}
				onPress={() => props.setValue('')}
				style={styles.icon}
			/>
		</View>
	);
}

export default SearchBar;

const styles = {
	wrapper: {
		height: HEIGHT,
		width: WIDTH,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		elevation: 5,
		backgroundColor: '#ffffff'
	},
	icon: {
		paddingLeft: 14,
		paddingRight: 14
	},
	input: {
		flex: 1,
		fontSize: 17,
		height: HEIGHT,
		color: contrastColor,
		paddingLeft: 10,
		paddingRight: 5
	}
};
