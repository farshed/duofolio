import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function Icon(props) {
	switch (props.type) {
		case 'material':
			return <MaterialIcon {...props} />;
		default:
			return <FeatherIcon {...props} />;
	}
}
