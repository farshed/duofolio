import React, { useState } from 'react';
import { TextInput, ScrollView } from 'react-native';
import SearchItem from './SearchItem';
import { contrastColor } from '../constants';

function BookSearch(props) {
	const [input, setInput] = useState('');

	function renderResults() {
		return input && props.searchResults
			? props.searchResults.map((result, i) => (
					<SearchItem {...result} onPress={props.goToLocation} key={i} />
			  ))
			: null;
	}

	return (
		<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
			<TextInput
				value={input}
				onChangeText={setInput}
				placeholder="Search"
				allowFontScaling={false}
				returnKeyType="search"
				style={styles.input}
				onSubmitEditing={() => props.onSearch(input)}
			/>
			{renderResults()}
		</ScrollView>
	);
}

export default BookSearch;

const styles = {
	scrollView: { flex: 1 },
	scrollViewContent: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingBottom: 50
	},
	input: {
		fontSize: 15,
		height: 36,
		width: '95%',
		color: contrastColor,
		paddingRight: 15,
		paddingLeft: 15,
		paddingTop: 0,
		paddingBottom: 0,
		borderWidth: 1,
		borderColor: contrastColor,
		borderRadius: 20
	}
};
