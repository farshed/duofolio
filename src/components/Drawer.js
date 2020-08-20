import React from 'react';
import { Text, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ContentItem from './ContentItem';

const { height } = Dimensions.get('window');

function Drawer(props) {
	return (
		<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
			{props.books[props.index].contents?.map((item, i) => <ContentItem {...item} key={i} />)}
		</ScrollView>
	);
}

function mapStateToProps(state) {
	return { books: state.books };
}

export default connect(
	mapStateToProps,
	null
)(Drawer);

const styles = {
	scrollView: {
		flex: 1,
		height,
		padding: 15
	},
	scrollViewContent: {
		alignItems: 'flex-start',
		paddingBottom: 50
	}
};
