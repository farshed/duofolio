import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Icon from './Icon';

const { height, width } = Dimensions.get('window');

function OptionsModal(props) {
	function onShare() {}

	function onRemove() {}

	return (
		<Modal
			style={styles.modal}
			isVisible={props.isVisible}
			deviceHeight={height}
			onBackButtonPress={props.onPressCancel}
			onBackdropPress={props.onPressCancel}
			onSwipeComplete={props.onPressCancel}
			backdropColor="rgba(0, 0, 0, 0.5)"
			swipeDirection="down"
			animationOutTiming={100}
			animationInTiming={100}
			hideModalContentWhileAnimating>
			<View style={styles.wrapper}>
				<TouchableOpacity style={styles.item} onPress={onShare}>
					<Icon {...icons.share} style={styles.icon} />
					<Text style={styles.text}>Share</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.item} onPress={onRemove}>
					<Icon {...icons.remove} style={styles.icon} />
					<Text style={styles.text}>Remove</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}

export default OptionsModal;

const styles = {
	modal: {
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	wrapper: {
		height: 172,
		width: width - 16,
		backgroundColor: '#F7F8FB',
		elevation: 5,
		justifyContent: 'space-evenly',
		marginBottom: -20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	item: {
		height: 60,
		width: '100%',
		flexDirection: 'row'
	},
	icon: {
		paddingLeft: 10,
		paddingRight: 10
	},
	text: {
		fontSize: 15
	}
};

const icons = {
	share: {
		name: 'share-2',
		type: 'feather',
		size: 20
	},
	remove: {
		name: 'trash-2',
		type: 'feather',
		size: 20
	}
};
