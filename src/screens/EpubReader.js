import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View } from 'react-native';
import StaticServer from 'react-native-static-server';
import { WebView } from 'react-native-webview';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Drawer from '../components/Drawer';
import showToast from '../components/Toast';
import Spinner from '../components/Spinner';
import PageButton from '../components/PageButton';
import Icon from '../components/Icon';
import { contrastColor } from '../constants';

function EpubReader(props) {
	const [state, setState] = useState({ bookUrl: null, server: null });
	const [isDrawer, setDrawer] = useState(false);
	const [searchResults, setSearchResults] = useState(null);
	const webview = useRef();
	const { params } = props.route;

	useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<Icon
					name="menu"
					size={20}
					color={contrastColor}
					style={styles.headerIcon}
					onPress={() => setDrawer(!isDrawer)}
				/>
			)
		});
	}, [props.navigation, isDrawer]);

	useEffect(() => {
		let unsubscribeFocus = props.navigation.addListener('focus', () => {
			showToast('Opening book');
			let trail = params.url.split('/');
			let path = trail.splice(0, trail.length - 1).join('/');
			let newServer = new StaticServer(0, path, { localOnly: true, keepAlive: true });
			newServer
				.start()
				.then((url) => setState({ bookUrl: `${url}/${trail[0]}`, server: newServer }));
		});
		let unsubscribeBlur = props.navigation.addListener('blur', () => {
			if (props.navigation.dangerouslyGetState().index > 1) return;
			props.sortBook(params.index);
			state.server && state.server.stop();
			setState({ bookUrl: null, server: null });
		});
		return () => {
			state.server && state.server.stop();
			unsubscribeFocus();
			unsubscribeBlur();
		};
	}, []);

	let injectedJS = `window.BOOK_PATH = '${state.bookUrl}';`;

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

	function goToLocation(href) {
		webview.current?.injectJavaScript(`window.rendition.display('${href}')`);
		setDrawer(false);
	}

	function onSearch(q) {
		webview.current?.injectJavaScript(`
		Promise.all(
			window.book.spine.spineItems.map((item) => {
				return item.load(window.book.load.bind(window.book)).then(() => {
					let results = item.find('${q}'.trim());
					item.unload();
					return Promise.resolve(results);
				});
			})
		).then((results) =>
			window.ReactNativeWebView.postMessage(
				JSON.stringify({ type: 'search', results: [].concat.apply([], results) })
			)
		)`);
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
			case 'contents':
				return props.addMetadata(parsedData, params.index);
			case 'search':
				return setSearchResults(parsedData.results);
			default:
				return;
		}
	}

	if (!state.bookUrl) {
		return <Spinner />;
	}
	const menu = (
		<Drawer
			index={params.index}
			goToLocation={goToLocation}
			onSearch={onSearch}
			searchResults={searchResults}
		/>
	);
	return (
		// <View style={styles.wholeScreen}>
		<SideMenu menu={menu} isOpen={isDrawer} menuPosition="right" onChange={setDrawer}>
			<WebView
				ref={webview}
				style={styles.wholeScreen}
				source={{ uri: 'file:///android_asset/index.html' }}
				injectedJavaScriptBeforeContentLoaded={injectedJS}
				onMessage={handleMessage}
			/>
			{isDrawer || <PageButton side="left" onPress={goPrev} />}
			{isDrawer || <PageButton side="right" onPress={goNext} />}
		</SideMenu>
		// {/* </View> */}
	);
}

export default connect(
	null,
	actions
)(EpubReader);

const styles = {
	wholeScreen: { flex: 1 },
	headerIcon: { paddingRight: 18, paddingLeft: 10 }
};
