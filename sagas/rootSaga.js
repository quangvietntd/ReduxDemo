import {call, all,fork} from 'redux-saga/effects';
import {watchFetchMovies,watchHello,watchAddNewMovie,watchUpdateMovie,watchDeleteMovie} from './movieSagas.js';


export default function* rootSaga(){
//  yield call(watchFetchMovies);
// yield all([
//   watchHello(),
//   watchFetchMovies()
// ]);

 yield [
   fork(watchFetchMovies),
   fork(watchAddNewMovie),
   fork(watchUpdateMovie),
   fork(watchDeleteMovie),
   ];
}
