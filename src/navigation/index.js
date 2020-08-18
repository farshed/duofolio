import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Reader from '../screens/Reader';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();
const noHeader = { headerShown: false };

export default function Navigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="home" component={Home} options={noHeader} />
			<Stack.Screen name="reader" component={Reader} />
			<Stack.Screen name="settings" component={Settings} />
		</Stack.Navigator>
	);
}
