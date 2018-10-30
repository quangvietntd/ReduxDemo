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
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';

//----------------------

const AppNavigator = createStackNavigator({
  Login: LoginComponent,
  Movie: MovieContainer, //thay MovieContainer cho MovieComponent
},
{
  initialRouteName: 'Login',
});

export const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  movieReducers: movieReducers,

});

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const App2 = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav,

});


const AppWithNavigationState = connect(mapStateToProps)(App2);

// const store = createStore(
//   appReducer,
//   applyMiddleware(middleware),
// );
// class Root extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <AppWithNavigationState />
//       </Provider>
//     );
//   }
//}
//-----------------


const sagaMiddleware = createSagaMiddleware();
let store = createStore(appReducer,applyMiddleware(sagaMiddleware,middleware));
const App = () => (
  <Provider store={store}>
    <View style={{flex: 1}}>
      <AppWithNavigationState/>
    </View>
  </Provider>
);
sagaMiddleware.run(rootSaga);

AppRegistry.registerComponent(appName, () => App);
