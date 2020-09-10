import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { translateUrl } from '../constants';

function Dictionary(props) {
	return (
		<View style={styles.wrapper}>
			<WebView
				style={styles.webview}
				source={{ uri: translateUrl(props.sLang, props.tLang, props.route.params.selected) }}
			/>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		sLang: state.settings.sLang,
		tLang: state.settings.tLang
	};
}

export default connect(
	mapStateToProps,
	null
)(Dictionary);

const styles = {
	wrapper: {
		flex: 1,
		marginTop: -56,
		padding: 5,
		paddingTop: 10
	},
	webview: { flex: 1 }
};
