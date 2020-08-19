import { combineReducers } from 'redux';
import books from './books';
import locations from './locations';

export default combineReducers({ books, locations });
