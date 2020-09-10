import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Stack from './Stack';
import Dictionary from '../screens/Dictionary';

const screenOptions = {
	...TransitionPresets.ModalPresentationIOS,
	gestureEnabled: true,
	cardOverlayEnabled: true
};

const noHeader = { headerShown: false };

function ModalNavigator() {
	const Modal = createStackNavigator();
	return (
		<Modal.Navigator mode="modal" headerMode="none" screenOptions={screenOptions}>
			<Modal.Screen name="stack" component={Stack} />
			<Modal.Screen name="dictionary" component={Dictionary} options={noHeader} />
		</Modal.Navigator>
	);
}

export default ModalNavigator;
