import React, {Component} from 'react';
import {Text,TextInput,Button,Dimensions} from 'react-native';
import Modal from 'react-native-modalbox';


var screen = Dimensions.get('window');
export default class EditModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:'',
      name:'',
      releaseYear:''
    };
  }
  showEditModal = (item) => {
    this.setState({
      id: item.id.toString(),
      name: item.name,
      releaseYear: item.releaseYear.toString(),
    });
    this.refs.myModal.open();
  }
  render(){
    return (
      <Modal
        ref = {'myModal'}
        style = {{
          justifyContent: 'center', borderRadius: 0, shadowRadius: 10,
          width: screen.width - 80, height: 280
        }}
        position='center'
        coverScreen={true}
        backdrop={true}
        onClosed={() => {
          //alert("Modal closed");
        }}
      >
        <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 40
        }}>
           informations of the movie
        </Text>
        <TextInput
          style={{
            height: 40,
            borderBottomColor: 'gray',
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            marginBottom: 10,
            borderBottomWidth: 1,
          }}
          onChangeText={(text)=> this.setState({name:text})}
          placeholder="Movie's name"
          value={this.state.name}
        />
        <TextInput
          style={{
            height: 40,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            marginTop: 20,
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 10,
          }}
          onChangeText={(text)=> this.setState({releaseYear:text})}
          placeholder="Release Year"
          value={this.state.releaseYear}
        />
        <Button
          title='Save'
          color='mediumseagreen'
          onPress={()=>{
            if(this.state.name.length===0 || this.state.releaseYear===0){
              alert('You must enter movie name and release year!');
              return;
            }
            this.props.movieComponent.props.onUpdateMovie(this.state);
            this.refs.myModal.close();
          }}/>
      </Modal>
    );
  }
}
