import { combineReducers } from 'redux';
import books from './books';
import location from './location';

export default combineReducers({ books, location });
