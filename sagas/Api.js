// Make Saga to send GET, POST api requests to server
//const urlGetMovies = 'http://localhost:3000/movies'; not worked!
//const urlGetMovies = 'http://192.168.1.103/movies'; not worked!
//const urlGetMovies = 'http://127.0.0.1:3000/movies'; not worked!
//const urlGetMovies = 'http://facebook.github.io/react-native/movies.json'


// Thay localhost bằng IP address, sử dụng 10.0.2.2 cho máy ảo mặc định của google,
// 10.0.3.2 cho máy ảo Genymotion

const urlGetMovies = 'http://10.0.3.2:3000/movies';
const urlPostMovies = 'http://10.0.3.2:3000/movies';
const urlUpdateMovie = 'http://10.0.3.2:3000/movies';
const urlDeleteMovie = 'http://10.0.3.2:3000/movies';
function* getMoviesFromApi() {
  //const urlLink = urlGetMovies+'?_page='+page.toString();
  const urlLink = urlGetMovies;
  const response = yield fetch(urlLink);

  const movies = yield response.status === 200? JSON.parse(response._bodyInit): [];
  return movies;

// Cách khác:

// return yield fetch(urlGetMovies)
//     .then((response)=>response.json())
//     .then((responseJson)=>{
//       return responseJson;
//     })
//     .catch((error) => {
//       console.log(error);
//     });



}

//send POST request to add new movie.
function* insertNewMovieFromApi(newMovie){
  const response = yield fetch(urlPostMovies,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({
      name: newMovie.name,
      releaseYear: newMovie.releaseYear,
    }),
  });
  console.log(response);
  return yield (response.status ===201);//true or false
}
//Send PUT request to update existing Movie
function* updateMovieFromApi(updatedMovie){
  const urlLink = urlUpdateMovie+'/'+updatedMovie.id.toString();
  const response = yield fetch(urlLink,{
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: updatedMovie.name,
        releaseYear: updatedMovie.releaseYear,
    }),
  });
  return yield (response.status ===200);
}

//Send DELETE request to update existing Movie
function* deleteMovieFromApi(deletedMovieId){
  const urlLink = urlDeleteMovie+'/'+deletedMovieId.toString();
  console.log('---------------deleteMovieFromApi----------------');
  console.log(urlLink);
  const response = yield fetch(urlLink,{
    method: 'DELETE'
  });
  return yield (response.status ===200);
}


export const Api = {
  getMoviesFromApi,
  insertNewMovieFromApi,
  updateMovieFromApi,
  deleteMovieFromApi,
};
