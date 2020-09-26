import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Home from '../screens/Home';
import EpubReader from '../screens/EpubReader';
import PdfReader from '../screens/PdfReader';
import Help from '../screens/Help';

const Stack = createStackNavigator();

const screenOptions = {
	headerTitleStyle: {
		fontSize: 18
	}
};

function Navigator(props) {
	const readerTitle = ({ route }) => ({
		title: route.params.title,
		headerTitleStyle: {
			fontSize: 16,
			fontFamily: 'PlayfairDisplay-Bold',
			color: props.fg,
			marginRight: 25,
			marginBottom: 4,
			marginLeft: -5
		},
		headerStyle: {
			elevation: 0,
			backgroundColor: props.bg
		},
		headerTintColor: props.fg
	});

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="home" component={Home} options={{ headerTitle: 'My Library' }} />
			<Stack.Screen name="epub-reader" component={EpubReader} options={readerTitle} />
			<Stack.Screen name="pdf-reader" component={PdfReader} options={readerTitle} />
			<Stack.Screen name="help" component={Help} options={{ headerTitle: 'How to use?' }} />
		</Stack.Navigator>
	);
}

function mapStateToProps(state) {
	return {
		bg: state.settings.bg,
		fg: state.settings.fg
	};
}

export default connect(
	mapStateToProps,
	null
)(Navigator);
