import React,{Component} from 'react';
import {View,Text,TextInput,Button,FlatList,Alert} from 'react-native';
import FlatListItem from './FlatListItem.js';
import EditModal from './EditModal.js';
//Containers
import MovieContainer from '../containers/MovieContainer.js';


export default class MovieComponent extends Component<Props>{
  constructor(props){
    super(props);
    this.state = {
      movieName : '',
      releaseYear: '',
    };
  }


  render(){
    return(

      <View style={{flex:1}}>
        <Text style={{margin:10,color: 'forestgreen',fontSize: 20,fontWeight: 'bold'}}>
          Redux Saga tutorials - Movies list
        </Text>
        <Text style={{margin:10,fontSize: 20,color: 'black'}}>
          New movie information
        </Text>
        <View style={{height:100,margin: 10}}>
          <TextInput style={{flex:1,margin:5,padding: 10,borderColor: 'gray',borderWidth: 1}}
            onChangeText = {(text) => this.setState({movieName:text})}
            value = {this.state.movieName}
            placeholder = 'Enter new movie name'
          />
          <TextInput style={{flex:1,margin:5,padding:10,borderColor: 'gray',borderWidth: 1,width: 120}}
            onChangeText = {(text) => this.setState({releaseYear:text})}
            value = {this.state.releaseYear}
            placeholder = 'Release Year'
            keyboardType = 'numeric'
          />
        </View>
        <View style={{flexDirection: 'row',height: 40,marginLeft: 20}}>
            <Button
              title='Fetch movies'
              color='darkviolet'
              onPress={()=>{
                this.props.onFetchMovies(this.state.page);
              }}
            />
            <View style={{margin:30}}></View>
            <Button
              title='Add movie'
              color='darkviolet'
              onPress={()=>{
                const {movieName,releaseYear} = this.state;
                if(movieName.length ===0 || releaseYear.length ===0){
                  Alert.alert('You must enter movie name and release year!');
                  return;
                }
                this.props.onAddMovie({name:movieName,releaseYear:releaseYear});
              }}
            />
        </View>
        <View style={{flex: 1, paddingTop:20}}>
          <FlatList
            data={this.props.movies}
            keyExtractor = {(item) => item.id} //don't understand
            renderItem = {({item,index})=> <FlatListItem {...item} itemIndex={index} movieComponent={this}/>} //don't understand
          />
        </View>
        <EditModal ref={'editModal'} movieComponent={this}/>

    </View>


    );
  }
}
