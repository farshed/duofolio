import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Home from '../screens/Home';
import EpubReader from '../screens/EpubReader';

const Stack = createStackNavigator();

const screenOptions = {
	headerTitleStyle: {
		fontFamily: 'Circular',
		fontWeight: '400',
		fontSize: 18,
		color: ''
	},
	headerStyle: {
		elevation: 0,
		backgroundColor: ''
	},
	headerTintColor: ''
};

const readerTitle = ({ route }) => ({
	title: route.params.title,
	headerTitleStyle: { fontSize: 16 }
});

function Navigator(props) {
	screenOptions.headerTitleStyle.color = props.fg;
	screenOptions.headerStyle.backgroundColor = props.bg;
	screenOptions.headerTintColor = props.fg;

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen name="home" component={Home} options={{ headerTitle: 'My Library' }} />
			<Stack.Screen name="epub-reader" component={EpubReader} options={readerTitle} />
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
