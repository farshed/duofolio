import { combineReducers } from 'redux';
import books from './books';
import locations from './locations';
import settings from './settings';

export default combineReducers({ books, locations, settings });
