import {FETCH_MOVIE,FETCH_FAILED,FETCH_SUCCEEDED,ADD_MOVIE,UPDATE_MOVIE,UPDATE_SUCCEEDED,
  DELETE_MOVIE, DELETE_SUCCEEDED} from '../actions/actionTypes.js';
//Saga effects
import {put,takeLatest,takeEvery} from 'redux-saga/effects';
import {Api} from './Api';

function* fetchMovies(){
  console.log("hello--------fetch--------------------");
  try{
    const receivedMovies = yield Api.getMoviesFromApi();
    console.log("In ra object");
    console.log(JSON.stringify(receivedMovies));
    yield put({type: FETCH_SUCCEEDED,receivedMovies: receivedMovies});

  }catch(error){
    console.log(error);
    yield put({type: FETCH_FAILED,error});
  }
}
export function* watchFetchMovies(){
  yield takeLatest(FETCH_MOVIE,fetchMovies);
}

// function* hello(){
//   console.log("Xin chao");
// }
// export function* watchHello(){
//   yield takeEvery(FETCH_MOVIE,hello);
//
// }

// Add new movie
function* addNewMovie(action){
  try{
    const result = yield Api.insertNewMovieFromApi(action.newMovie);
    if (result=== true){
      yield put({type: FETCH_MOVIE, sort:''});
    }
  }catch(error){
    //do nothing

  }
}
export function* watchAddNewMovie(){
  yield takeLatest(ADD_MOVIE,addNewMovie);
}
//Update a Movie
function* updateMovie(action){
  try{
    const result = yield Api.updateMovieFromApi(action.updatedMovie);
    if (result===true) {
      console.log("update_succeed------------------------------------------");
      yield put({type:UPDATE_SUCCEEDED,updatedMovie:action.updatedMovie});
    }
  }catch(error){
      //do nothing
      console.log("loi day------------------------------------------");
      console.log(error);
  }
}

export function* watchUpdateMovie(){
  yield takeLatest(UPDATE_MOVIE,updateMovie);
}

function* deleteMovie(action){
  try{
    const result = yield Api.deleteMovieFromApi(action.deletedMovieId);
    if(result===true){
      console.log('delete_succeeded--------------------');
      yield put({type: DELETE_SUCCEEDED,deletedMovieId:action.deletedMovieId});
    }
  }catch(error){
    //do nothing
  }
}

export function* watchDeleteMovie(){
  yield takeLatest(DELETE_MOVIE,deleteMovie);
}
