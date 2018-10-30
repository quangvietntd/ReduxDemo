//MovieContainer connect Redux with MovieComponent
import {connect} from 'react-redux';
import MovieComponent from '../components/MovieComponent.js';



//Actions
import {addMovieAction,fetchMoviesAction,fetchFailedAction,fetchSuccessAction,
  updateItemSuccessAction,updateItemAction,
  deleteItemAction,deleteItemSuccessAction} from '../actions/actions.js';

const mapStateToProps = (state) => {
  return {
    movies: state.movieReducers,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMovies: (page) => {
      dispatch(fetchMoviesAction(page));

    },
    onAddMovie: (newMovie) => {
      dispatch(addMovieAction(newMovie));
    },
    onUpdateMovie: (updatedMovie) => {
      dispatch(updateItemAction(updatedMovie));
    },
    // onUpdateItemSuccess: (updateMovie) => {
    //   dispatch(updateItemSuccessAction(updatedMovie));
    // } //not neccessary
    onDeleteItemAction: (deletedMovieId) => {
      dispatch(deleteItemAction(deletedMovieId));
    }
  }
}


const MovieContainer = connect(mapStateToProps,mapDispatchToProps)(MovieComponent);
export default MovieContainer;
