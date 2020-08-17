import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import Navigator from './src/navigation';
import Splash from './src/components/Splash';

export default function App() {
	const [timePassed, setTimePassed] = useState(false);

	useEffect(() => {
		setTimeout(() => setTimePassed(true), 700);
	}, []);

	function renderApp(isReady) {
		if (isReady && timePassed) {
			return (
				<NavigationContainer>
					<Navigator />
				</NavigationContainer>
			);
		}
		return <Splash />;
	}

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{renderApp}</PersistGate>
		</Provider>
	);
}
