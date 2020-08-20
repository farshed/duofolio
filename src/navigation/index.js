import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from '../screens/Home';
import Reader from '../screens/Reader';
import Settings from '../screens/Settings';
import Icon from '../components/Icon';
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
		color: contrastColor,
		marginLeft: 30,
		marginRight: 30
	},
	headerTitleAlign: 'center'
	// headerBackImage: () => <Icon name="chevron-left" color={contrastColor} size={26} />
};

const Stack = createStackNavigator();
// const noHeader = { headerShown: false };
const headerTitle = ({ route }) => ({ title: route.params.title });

export default function Navigator() {
	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="home" component={Home} options={{ headerTitle: 'My Library' }} />
			<Stack.Screen name="reader" component={Reader} options={headerTitle} />
			<Stack.Screen name="settings" component={Settings} />
		</Stack.Navigator>
	);
}
