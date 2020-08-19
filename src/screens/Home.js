import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import AddButton from '../components/AddButton';
import BookItem from '../components/BookItem';

function Home(props) {
	function renderBooks() {
		const { books, locations } = props;
		if (props.books.length === 0) {
			return (
				<View style={styles.wrapper}>
					<Text style={styles.message}>Your library is empty!</Text>
					<Text style={styles.message}>Add some books to get started</Text>
				</View>
			);
		}
		return (
			<FlatList
				contentContainerStyle={styles.flatlist}
				data={props.books}
				renderItem={({ item, index }) => (
					<BookItem
						{...item}
						navigation={props.navigation}
						location={locations[books[index].key]}
						index={index}
					/>
				)}
			/>
		);
	}

	return (
		<View style={styles.wrapper}>
			<AddButton />
			{renderBooks()}
		</View>
	);
}

function mapStateToProps(state) {
	return {
		books: state.books,
		locations: state.locations
	};
}

export default connect(
	mapStateToProps,
	null
)(Home);

const styles = {
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	flatlist: {
		paddingTop: 15,
		paddingBottom: 10
	},
	message: {
		fontSize: 16,
		fontFamily: 'Circular',
		marginBottom: 5
	}
};
