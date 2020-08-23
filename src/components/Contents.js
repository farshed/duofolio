import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ContentItem from './ContentItem';

function Drawer(props) {
	return (
		<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
			{props.books[props.index].contents?.map((item, i) => (
				<ContentItem {...item} key={i} onPress={props.goToLocation} />
			))}
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
	scrollView: { flex: 1 },
	scrollViewContent: {
		alignItems: 'flex-start',
		paddingBottom: 50
	}
};
