import React, { useState, useEffect } from 'react';
import StaticServer from 'react-native-static-server';
import { WebView } from 'react-native-webview';
import Spinner from '../components/Spinner';

function Reader(props) {
	const [bookUrl, setBookUrl] = useState(null);
	const [serverInstance, setServerInstance] = useState(null);

	useEffect(() => {
		let unsubscribe = props.navigation.addListener('focus', () => {
			serverInstance && serverInstance.stop();
			let trail = props.route.params.url.split('/');
			let path = trail.splice(0, trail.length - 1).join('/');
			let server = new StaticServer(0, path, { localOnly: true, keepAlive: true });
			setServerInstance(server);
			server.start().then((url) => setBookUrl(`${url}/${trail[0]}`));
		});
		return unsubscribe;
	}, [props.route.params.url]);

	const injectedJS = `window.FLOW = "paginated";
	window.BOOK_PATH = "${bookUrl}";
`;

	if (!bookUrl) {
		return <Spinner />;
	}

	return (
		<WebView
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
