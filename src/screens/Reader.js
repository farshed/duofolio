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
	const [state, setState] = useState({ bookUrl: null, server: null });

	const webview = useRef();

	const { params } = props.route;

	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', () => {
			showToast('Opening book');
			state.server && state.server.stop();
			let trail = params.url.split('/');
			let path = trail.splice(0, trail.length - 1).join('/');
			let newServer = new StaticServer(0, path, { localOnly: true, keepAlive: true });
			newServer
				.start()
				.then((url) => setState({ bookUrl: `${url}/${trail[0]}`, server: newServer }));
		});
		return () => {
			state.server && state.server.stop();
			unsubscribe();
		};
	}, []);

	let injectedJS = `window.BOOK_PATH = "${state.bookUrl}";`;

	if (params.location) {
		injectedJS = `${injectedJS}
		window.BOOK_LOCATION = '${params.location}';
		`;
	}

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
			case 'selected': {
				return;
			}
			case 'loc':
				return props.addLocation(parsedData);
			case 'key':
			case 'metadata':
				return props.addMetadata(parsedData, params.index);
			default:
				return;
		}
	}

	if (!state.bookUrl) {
		return <Spinner />;
	}

	return (
		<View style={wholeScreen}>
			<WebView
				ref={webview}
				style={wholeScreen}
				overScrollMode="never"
				scrollEnabled={false}
				source={{ uri: 'file:///android_asset/index.html' }}
				injectedJavaScriptBeforeContentLoaded={injectedJS}
				onMessage={handleMessage}
			/>
			<PageButton side="left" onPress={goPrev} />
			<PageButton side="right" onPress={goNext} />
		</View>
	);
}

export default connect(
	null,
	actions
)(Reader);

const wholeScreen = { flex: 1 };
