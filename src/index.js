import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; 
import logger from 'redux-logger';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();


const bookList = (state = [], action) => {
  switch (action.type) {
    case 'SET_BOOK_LIST':
      // let newState = [...state, ...action.payload];
      // return newState;

      return action.payload;  // [📚,📚,📚] 

    default:
      return state;
  }
}

const reduxStore = createStore(
  combineReducers({
    bookList
  }),
  // Plug saga middleware into redux
  applyMiddleware(sagaMiddleware, logger)
);

function* fetchBooks() {
  console.log('bout to fetch some 📚');

  try {
    // `yield` pauses the function
    // until our AJAX request is complete
    const response = yield axios.get('/books');
    console.log('GET /books response.data', response.data);

    // dispatch (or "put") the action
    // to send our data to the
    // redux store.
    // This will call our `bookList` reducer!
    yield put({
      type: 'SET_BOOK_LIST',
      payload: response.data
    });
  }
  catch (err) {
    console.log('fetchBooks failed', err);
    alert('uh oh.... 🐒');
  }
}

function* addBook(action) {
  console.log('in addBook, heres the action', action);

  // POST the book to our server
  yield axios.post('/books', action.payload)

  // fetch our books again
  yield put({
    type: 'FETCH_BOOKS'
  });
}


// A really fancy function 🎩 🌟 🎩 🌟 🎩 
// A "generator function"
function* watcherSaga() {
  // Saga equivalent to
  // case 'FETCH_BOOKS':... 
  yield takeEvery('FETCH_BOOKS', fetchBooks);

  // Handle ADD_BOOK actions
  yield takeEvery('ADD_BOOK', addBook);
}

// Run the middleware
sagaMiddleware.run(watcherSaga);


ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
