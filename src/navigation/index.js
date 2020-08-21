import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from '../screens/Home';
import EpubReader from '../screens/EpubReader';
import Settings from '../screens/Settings';
import { contrastColor } from '../constants';

const durationSpec = { config: { duration: 200 } };

const screenOptions = {
	...TransitionPresets.ScaleFromCenterAndroid,
	transitionSpec: {
		open: durationSpec,
		close: durationSpec
	},
	headerTitleStyle: {
		fontFamily: 'Circular',
		fontWeight: '400',
		fontSize: 18,
		color: contrastColor
	}
};

const Stack = createStackNavigator();
// const noHeader = { headerShown: false };

const readerTitle = ({ route }) => ({
	title: route.params.title,
	headerTitleStyle: { fontSize: 16 }
});

export default function Navigator() {
	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="home" component={Home} options={{ headerTitle: 'My Library' }} />
			<Stack.Screen name="epub-reader" component={EpubReader} options={readerTitle} />
			<Stack.Screen name="settings" component={Settings} options={{ headerTitle: 'Settings' }} />
		</Stack.Navigator>
	);
}
