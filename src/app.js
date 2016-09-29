import React, { Component } from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm'

class App extends Component {

  state = { loggedIn: null };

  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyCB7tghg3_sgYJsS48wigxZT1whiH8tu9U",
      authDomain: "authentication-e28fc.firebaseapp.com",
      databaseURL: "https://authentication-e28fc.firebaseio.com",
      storageBucket: "authentication-e28fc.appspot.com",
      messagingSenderId: "374445691737"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false});
      }
    });
  }

  renderContent() {

    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out 
          </Button>
        );
      case false:
        return <LoginForm />
      default:
        return <Spinner size="large" />
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication"/>
        {this.renderContent()}
      </View>
    )
  }
}

export default App;
