import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import AddButton from '../components/AddButton';
import BookItem from '../components/BookItem';
import SearchBar from '../components/SearchBar';
import Icon from '../components/Icon';
import { contrastColor } from '../constants';

function Home(props) {
	const [isSearchBar, setSearchBar] = useState(false);
	const [input, setInput] = useState('');

	useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<Icon
					name="search"
					size={22}
					color={contrastColor}
					style={styles.searchIcon}
					onPress={() => setSearchBar(true)}
				/>
			)
		});
	}, [props.navigation]);

	function listFilter() {
		if (input) {
			return props.books.filter((book) => {
				let itemData = ` ${book.title} ${book.author}`.toUpperCase();
				let searchData = ' ' + input.toUpperCase();
				return itemData.indexOf(searchData) > -1;
			});
		}
		return props.books;
	}

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
				data={listFilter()}
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
			<SearchBar
				isVisible={isSearchBar}
				value={input}
				setValue={setInput}
				hide={() => {
					setSearchBar(false);
					setInput('');
				}}
			/>
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
	},
	searchIcon: {
		paddingRight: 15
	}
};
