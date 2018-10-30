import React,{Component} from 'react';
import {View,Text,Button,Alert,TextInput} from 'react-native';
import Swipeout from 'react-native-swipeout';

export default class FlatListItem extends Component<Props>{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    const swipeSettings = {
      autoClose : true,
      right: [
        { //Button Edit
          text: 'Edit',
          type: 'primary',
          onPress: () => {
            const {movieComponent} = this.props; //don't understand
            //show edit modal here!
            movieComponent.refs.editModal.showEditModal({...this.props});

          }
        },
        { //Button Delete
          text: 'Delete',
          type: 'delete',
          onPress: () => {
            Alert.alert('Alert',
                        'Are you sure you want to delete this movie?',
                        [
                          {text:'No',onPress: ()=> console.log('cancel press'),style: 'cancel'},
                          {text: 'Yes',onPress: ()=> {
                              const {movieComponent} = this.props; //don't understand
                              movieComponent.props.onDeleteItemAction(this.props.id);
                          }}
                        ],
                        {cancelable: true}
            );
          }
        }
      ],
      sectionId:1,
      rowId:this.props.id
    };
    return(
      <Swipeout {...swipeSettings}>
        <View style={{flex: 1}}>
          <Text style={{
            padding:10,
            fontWeight: 'bold',
            fontSize: 17,
            color: 'white',
            backgroundColor: (this.props.itemIndex % 2 ===0)?'dodgerblue':'mediumseagreen'
          }}>
            {this.props.name}, Release Year: {this.props.releaseYear}
          </Text>
        </View>
      </Swipeout>
    );
  }
}
