import React from 'react';
import { Text, ScrollView, Dimensions } from 'react-native';
import ContentItem from './ContentItem';

const { height, width } = Dimensions.get('window');

function Drawer(props) {
	return (
		<ScrollView style={styles.wrapper}>
			{props.contents.map((item, i) => (
				<ContentItem {...item} key={i} />
			))}
		</ScrollView>
	);
}

export default Drawer;

const styles = {
	wrapper: {
		flex: 1,
		height,
		width: width * 0.6,
		padding: 15,
		alignItems: 'center'
	}
};
