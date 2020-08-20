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

function Reader(props) {
	const [state, setState] = useState({ bookUrl: null, server: null });
	const [isDrawer, setDrawer] = useState(false);
	const webview = useRef();
	const { params } = props.route;

	useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<View>
					<Icon
						name="menu"
						size={22}
						color={contrastColor}
						style={{ paddingRight: 15 }}
						onPress={() => setDrawer(!isDrawer)}
					/>
					<Icon
						name="settings"
						size={22}
						color={contrastColor}
						style={{ paddingRight: 15 }}
						onPress={() => props.navigation.navigate('settings')}
					/>
				</View>
			)
		});
	}, [props.navigation]);

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
			case 'contents':
				return props.addMetadata(parsedData, params.index);
			default:
				return;
		}
	}

	if (!state.bookUrl) {
		return <Spinner />;
	}

	return (
		//<View style={wholeScreen}>
		<SideMenu menu={Drawer} isOpen={isDrawer} menuPosition="right">
			<WebView
				ref={webview}
				style={wholeScreen}
				source={{ uri: 'file:///android_asset/index.html' }}
				injectedJavaScriptBeforeContentLoaded={injectedJS}
				onMessage={handleMessage}
			/>
			<PageButton side="left" onPress={goPrev} />
			<PageButton side="right" onPress={goNext} />
		</SideMenu>
		// {/* </View> */}
	);
}

export default connect(
	null,
	actions
)(Reader);

const wholeScreen = { flex: 1 };
