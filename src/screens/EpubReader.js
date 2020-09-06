import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import StaticServer from 'react-native-static-server';
import { ExternalStorageDirectoryPath } from 'react-native-fs';
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
import themeToStyles from '../utils/themeToStyles';

const serverConfig = { localOnly: true, keepAlive: true };

function EpubReader(props) {
  const [state, setState] = useState({ bookUrl: null, server: null });
  const [isDrawer, setDrawer] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [dictState, setDictState] = useState({
    isDictVisible: false,
    selected: '',
  });

  const webview = useRef();
  const { params } = props.route;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Icon
          name="menu"
          size={20}
          color={props.settings.fg}
          style={styles.headerIcon}
          onPress={() => setDrawer(!isDrawer)}
        />
      ),
    });
  }, [props.navigation, isDrawer]);

  useEffect(() => {
    showToast('Opening book');
    let newServer = new StaticServer(
      0,
      ExternalStorageDirectoryPath,
      serverConfig,
    );
    newServer.start().then((url) =>
      setState({
        bookUrl: url + params.url.replace(ExternalStorageDirectoryPath, ''),
        server: newServer,
      }),
    );
    return () => {
      props.sortBook(params.index);
      state.server && state.server.stop();
    };
  }, []);

  useEffect(() => {
    webview.current?.injectJavaScript(`
		window.rendition.themes.register({ theme: "${JSON.stringify(
      themeToStyles(props.settings),
    )}" });
		window.rendition.themes.select('theme');`);
    webview.current?.reload();
    StatusBar.setBackgroundColor(props.settings.bg, true);
    StatusBar.setBarStyle(
      `${props.settings.fg === '#000000' ? 'dark' : 'light'}-content`,
    );
  }, [props.settings]);

  let injectedJS = `window.BOOK_PATH = '${state.bookUrl}';
	window.LOCATIONS = ${params.locations};
	window.THEME = ${JSON.stringify(themeToStyles(props.settings))};
	`;

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
        return setDictState({
          isDictVisible: true,
          selected: parsedData.selected,
        });
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
    return <Spinner fg={props.settings.fg} bg={props.settings.bg} />;
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
    <SideMenu
      menu={menu}
      isOpen={isDrawer}
      menuPosition="right"
      onChange={setDrawer}
    >
      <WebView
        ref={webview}
        style={[styles.wholeScreen, { backgroundColor: props.settings.bg }]}
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
          onPressCancel={() =>
            setDictState({ isDictVisible: false, selected: '' })
          }
        />
      )}
    </SideMenu>
  );
}

function mapStateToProps(state) {
  return { settings: state.settings };
}

export default connect(mapStateToProps, actions)(EpubReader);

const styles = {
  wholeScreen: { flex: 1 },
  headerIcon: { paddingRight: 18, paddingLeft: 10 },
};
