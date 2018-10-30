/** @format */
//Actions

import React,{Component} from 'react';
import {AppRegistry,View} from 'react-native';
import {name as appName} from './app.json';
//redux
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
//redux-saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga.js';
//Reducers
import {combineReducers} from 'redux';
import {connect} from 'react-redux';
import allReducers from './reducers/allReducers.js';
import movieReducers from './reducers/movieReducers.js';
//Containers
import MovieContainer from './containers/MovieContainer.js';

import LoginComponent from './components/LoginComponent.js';
import MovieComponent from './components/MovieComponent.js';


//react-navigation
import {createStackNavigator} from 'react-navigation';


const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginComponent,
    navigationOptions: {header:null},
  },
  Movie:{
    screen: MovieContainer, //thay MovieContainer cho MovieComponent
    navigationOptions: {header:null},
  },  
},
{
  initialRouteName: 'Login',
});

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers,applyMiddleware(sagaMiddleware));
const App = () => (
  <Provider store={store}>
      <AppNavigator />
  </Provider>
);
sagaMiddleware.run(rootSaga);
AppRegistry.registerComponent(appName, () => App);
