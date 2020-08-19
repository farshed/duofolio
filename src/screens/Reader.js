import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import StaticServer from 'react-native-static-server';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import * as actions from '../actions';
import showToast from '../components/Toast';
import Spinner from '../components/Spinner';
import PageButton from '../components/PageButton';

function Reader(props) {
	const [bookUrl, setBookUrl] = useState(null);
	const [serverInstance, setServerInstance] = useState(null);

	const webview = useRef();

	const { location, books, route } = props;

	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', () => {
			showToast('Parsing book');
			serverInstance && serverInstance.stop();
			let trail = route.params.url.split('/');
			let path = trail.splice(0, trail.length - 1).join('/');
			let server = new StaticServer(0, path, { localOnly: true, keepAlive: true });
			setServerInstance(server);
			server.start().then((url) => setBookUrl(`${url}/${trail[0]}`));
		});
		return () => {
			serverInstance && serverInstance.stop();
			unsubscribe();
		};
	}, []);

	let injectedJS = `window.FLOW = "paginated";
	window.BOOK_PATH = "${bookUrl}";
	window.BOOK_LOCATION = '${location[books[route.params.index].key]}';
`;

	console.log(injectedJS);

	function goPrev() {
		webview.current?.injectJavaScript(`window.rendition.prev()`);
	}

	function goNext() {
		webview.current?.injectJavaScript(`window.rendition.next()`);
	}

	function handleMessage(e) {
		let parsedData = JSON.parse(e.nativeEvent.data);
		let { type } = parsedData;
		delete parsedData.type;
		switch (type) {
			case 'loc':
				return props.addLocation(parsedData);
			case 'key':
			case 'metadata':
				return props.addMetadata(parsedData, route.params.index);
			case 'cover': {
				if (parsedData.cover) {
					parsedData.cover = bookUrl + parsedData.cover;
				}
				return props.addMetadata(parsedData, route.params.index);
			}
			default:
				return;
		}
	}

	if (!bookUrl) {
		return <Spinner />;
	}

	return (
		<View style={{ flex: 1 }}>
			<WebView
				ref={webview}
				source={{ uri: 'file:///android_asset/index.html' }}
				injectedJavaScriptBeforeContentLoaded={injectedJS}
				mixedContentMode="always"
				originWhitelist={['*']}
				allowFileAccess
				allowUniversalAccessFromFileURLs
				domStorageEnabled
				style={{ flex: 1 }}
				onMessage={handleMessage}
			/>
			<PageButton side="left" onPress={goPrev} />
			<PageButton side="right" onPress={goNext} />
		</View>
	);
}

function mapStateToProps(state) {
	return {
		books: state.books,
		location: state.location
	};
}

export default connect(
	mapStateToProps,
	actions
)(Reader);
