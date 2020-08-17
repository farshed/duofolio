import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import StaticServer from 'react-native-static-server';
import { WebView } from 'react-native-webview';
import Spinner from '../components/Spinner';

const { height, width } = Dimensions.get('window');

function Reader(props) {
	const [bookUrl, setBookUrl] = useState(null);
	const [serverInstance, setServerInstance] = useState(null);
	React.useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', () => {
			serverInstance && serverInstance.stop();
			let server = new StaticServer(0, props.route.params.url, { localOnly: true });
			setServerInstance(server);
			server.start().then((url) => setBookUrl(url));
		});
		return unsubscribe;
	}, [props.route.params.url]);

	const injectedJS = `window.FLOW = "paginated";
	window.SCREEN_WIDTH = "${width}";
	window.SCREEN_HEIGHT = "${height}";
	window.BOOK_PATH = "${bookUrl}";
`;

	if (!bookUrl) {
		return <Spinner />;
	}

	return (
		<WebView
			// source={{ uri: 'https://farshed.me/linguify-epub-frame/' }}
			// source={{ uri: 'https://pgaskin.net/ePubViewer/' }}
			source={{ uri: 'file:///android_asset/index.html' }}
			injectedJavaScriptBeforeContentLoaded={injectedJS}
			mixedContentMode="always"
			originWhitelist={['*']}
			allowFileAccess
			allowUniversalAccessFromFileURLs
			domStorageEnabled
			style={{ flex: 1 }}
		/>
	);
}

export default Reader;
