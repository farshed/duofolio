import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import StaticServer from 'react-native-static-server';
import { WebView } from 'react-native-webview';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Drawer from '../components/Drawer';
import showToast from '../components/Toast';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import DictionaryModal from '../components/DictionaryModal';
import Icon from '../components/Icon';
import { contrastColor } from '../constants';

function EpubReader(props) {
	const [state, setState] = useState({ bookUrl: null, server: null });
	const [isDrawer, setDrawer] = useState(false);
	const [searchResults, setSearchResults] = useState(null);
	const [dictState, setDictState] = useState({ isDictVisible: false, selected: '' });

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
			// if (props.navigation.dangerouslyGetState().index > 1) return;
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

	let injectedJS = `window.BOOK_PATH = '${state.bookUrl}';
	window.LOCATIONS = ${params.locations};`;

	if (params.currentLocation) {
		injectedJS = `${injectedJS}
		window.BOOK_LOCATION = '${params.currentLocation}';
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
		isDrawer && setDrawer(false);
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
				return setDictState({ isDictVisible: true, selected: parsedData.selected });
			}
			case 'loc': {
				const { progress, totalPages } = parsedData;
				props.addMetadata({ progress, totalPages }, params.index);
				delete parsedData.progress;
				delete parsedData.totalPages;
				return props.addLocation(parsedData);
			}
			case 'key':
			case 'metadata':
			case 'contents':
			case 'locations':
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
		<SideMenu menu={menu} isOpen={isDrawer} menuPosition="right" onChange={setDrawer}>
			<WebView
				ref={webview}
				style={styles.wholeScreen}
				source={{ uri: 'file:///android_asset/index.html' }}
				injectedJavaScriptBeforeContentLoaded={injectedJS}
				onMessage={handleMessage}
			/>
			<Footer
				goNext={goNext}
				goPrev={goPrev}
				locations={params.locations}
				goToLocation={goToLocation}
				index={params.index}
			/>
			{dictState.isDictVisible && (
				<DictionaryModal
					isVisible={dictState.isDictVisible}
					selected={dictState.selected}
					onPressCancel={() => setDictState({ isDictVisible: false, selected: '' })}
				/>
			)}
		</SideMenu>
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
