import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import AddButton from '../components/AddButton';
import BookItem from '../components/BookItem';
import SearchBar from '../components/SearchBar';
import Icon from '../components/Icon';
import { contrastColor } from '../constants';

function Home(props) {
	const [isSearchBar, setSearchBar] = useState(false);
	const [input, setInput] = useState('');

	useEffect(() => {
		StatusBar.setBackgroundColor('#ffffff', true);
		StatusBar.setBarStyle('dark-content');
		const unsubscribe = props.navigation.addListener('blur', hideSearchBar);
		return unsubscribe;
	}, []);

	useLayoutEffect(() => {
		if (isSearchBar) {
			props.navigation.setOptions({
				header: () => (
					<SearchBar
						isVisible={isSearchBar}
						value={input}
						setValue={setInput}
						hide={hideSearchBar}
					/>
				)
			});
		} else {
			props.navigation.setOptions({
				header: undefined,
				headerRight: () => (
					<View style={styles.headerIconsWrapper}>
						<Icon
							name="help-circle"
							size={20}
							color={contrastColor}
							style={styles.helpIcon}
							onPress={() => props.navigation.navigate('help')}
						/>
						<Icon
							name="search"
							size={20}
							color={contrastColor}
							style={styles.searchIcon}
							onPress={() => setSearchBar(true)}
						/>
					</View>
				)
			});
		}
	}, [props.navigation, isSearchBar, input, setInput, setSearchBar]);

	function hideSearchBar() {
		setSearchBar(false);
		setInput('');
	}

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
		if (props.books.length === 0) {
			return (
				<View style={styles.wrapper}>
					<Text style={styles.message}>Your library is empty!</Text>
					<Text style={styles.message}>Add some books to get started</Text>
					<Text style={[styles.message, { fontSize: 13, fontStyle: 'italic' }]}>
						(Only EPUB files supported)
					</Text>
				</View>
			);
		}
		return (
			<FlatList
				contentContainerStyle={styles.flatlist}
				data={listFilter()}
				renderItem={({ item, index }) => (
					<BookItem {...item} navigation={props.navigation} index={index} />
				)}
				keyExtractor={(item, i) => i.toString()}
			/>
		);
	}

	return (
		<View style={styles.wrapper}>
			<AddButton navigation={props.navigation} />
			{renderBooks()}
		</View>
	);
}

function mapStateToProps(state) {
	return {
		books: state.books
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
		alignItems: 'center',
		backgroundColor: '#ffffff'
	},
	flatlist: {
		paddingTop: 15,
		paddingBottom: 10
	},
	message: {
		fontSize: 16,
		fontFamily: 'CircularLight',
		marginBottom: 5
	},
	searchIcon: { paddingRight: 20 },
	helpIcon: { paddingRight: 25 },
	headerIconsWrapper: { flexDirection: 'row' }
};
