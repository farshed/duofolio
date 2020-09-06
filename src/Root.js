import React from 'react';
import { connect } from 'react-redux';
import Navigator from './navigation';
import LangSelect from './screens/LangSelect';

function Root(props) {
  return props.language ? <Navigator /> : <LangSelect />;
}

function mapStateToProps(state) {
  return { language: state.settings.language };
}

export default connect(mapStateToProps, null)(Root);
