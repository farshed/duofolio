import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import AddButton from '../components/AddButton';
import BookItem from '../components/BookItem';

function Home(props) {
	function renderBooks() {
		if (props.books.length === 0) {
			return <Text>Wow! such empty</Text>;
		}
		return (
			<FlatList
				contentContainerStyle={styles.flatlist}
				data={props.books}
				renderItem={({ item, index }) => (
					<BookItem {...item} navigation={props.navigation} index={index} />
				)}
			/>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<AddButton />
			{renderBooks()}
		</View>
	);
}

function mapStateToProps(state) {
	return { books: state.books };
}

export default connect(
	mapStateToProps,
	null
)(Home);

const styles = {
	flatlist: {
		paddingTop: 15,
		paddingBottom: 10
	}
};
