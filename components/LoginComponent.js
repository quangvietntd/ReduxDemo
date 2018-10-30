import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View>
        <Text style={styles.header}>Login Information</Text>
        <TextInput placeholder='Enter your email' style={styles.textInputStyle} />
        <TextInput placeholder='Enter your password' style={styles.textInputStyle} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Movie')}>
          <View style={styles.button}>
            <Text style={styles.text}>LOG IN</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    textInputStyle: {
      height: 40,
      margin: 10,
      padding: 10,
      borderRadius: 4,
      backgroundColor: 'white',
    },
    header: {
        fontSize: 20,
        alignSelf: "center",
    },
    button: {
      height: 40,
      margin: 10,
      borderRadius: 4,
      alignItems: 'center',
      padding: 5,
      backgroundColor: 'darkviolet',
      borderColor: 'white',
      borderWidth: 1,
    },
    text: {
      color: 'white',
      fontSize: 20,
    },

  });
  