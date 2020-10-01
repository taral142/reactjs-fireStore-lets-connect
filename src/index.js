import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import {Provider} from 'react-redux'
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyD9Kz2yKA7cqVdnM3iml0VeC1bmBR-JddE",
  authDomain: "online-chating-app.firebaseapp.com",
  databaseURL: "https://online-chating-app.firebaseio.com",
  projectId: "online-chating-app",
  storageBucket: "online-chating-app.appspot.com",
  messagingSenderId: "748775564473",
  appId: "1:748775564473:web:590876040b64c4efdea768",
  measurementId: "G-7ER85TEJ19"
};

firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
