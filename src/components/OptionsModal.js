import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from './Icon';
import { elevatedBG } from '../constants';

const { height, width } = Dimensions.get('window');

function OptionsModal(props) {
	function onShare() {
		props.onPressCancel();
		Share.open({
			url: `file://${props.url}`,
			type: 'application/epub+zip',
			failOnCancel: false
		});
	}

	function onRemove() {
		props.onPressCancel();
		props.removeBook(props.index);
	}

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

export default connect(
	null,
	actions
)(OptionsModal);

const styles = {
	modal: {
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	wrapper: {
		height: 140,
		width: width - 16,
		backgroundColor: elevatedBG,
		elevation: 5,
		justifyContent: 'space-evenly',
		marginBottom: -20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	item: {
		height: 50,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	icon: {
		paddingLeft: 20,
		paddingRight: 20
	},
	text: {
		fontFamily: 'Circular',
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
