import React, { useState, useRef } from 'react';
import { TextInput, TouchableOpacity, Animated, Dimensions } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { contrastColor } from '../constants';
import useDidUpdate from '../hooks/useDidUpdate';

const { width } = Dimensions.get('window');
const HEIGHT = 56;
const HIDDEN_POSITION = -(HEIGHT * 2);
const DURATION = 150;

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

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
			<TouchableOpacity style={styles.touchable} onPress={props.hide}>
				<FeatherIcon name="arrow-left" size={24} color={contrastColor} />
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
	touchable: {
		height: HEIGHT,
		width: 50,
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
