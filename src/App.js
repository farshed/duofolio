import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Navigator from './navigation';

export default function App() {
	useEffect(() => {
		if (Text.defaultProps == null) Text.defaultProps = {};
		Text.defaultProps.allowFontScaling = false;
	}, []);

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<NavigationContainer>
					<Navigator />
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
