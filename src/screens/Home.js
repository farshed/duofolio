import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AddButton from '../components/AddButton';
import BookItem from '../components/BookItem';

function Home(props) {
	function renderBooks() {
		if (props.books.length === 0) {
			return <Text>Wow! such empty</Text>;
		}
		return props.books.map((book, i) => <BookItem {...book} index={i} key={i.toString()} />);
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
