// library
import React, {Component} from 'react';
import {
  Keyboard,
  Text,
  Image,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
// const { StyleSheet } = React;
// import { Button } from 'react-native-elements';

import Index from '../Index';

// styles
import styles from './LoginStyle';

const URL_STRING = 'http://192.168.1.237:3001/api/v1';

class Login extends Component {
  state = {
    id_user: '',
    username: '',
    password: '',
    login: false,
  };

  // handleFormChange = (e) => {
  //   let formCategoryNew = {...this.state.formUser};
  //   formCategoryNew[e.target.id] = e.target.value;

  //   this.setState({
  //     formUser: formCategoryNew
  //   })
  //   console.warn(formCategoryNew);
  // }
  saveToken = async Token => {
    try {
      const token = JSON.stringify(Token);
      await AsyncStorage.setItem('Token', token);
    } catch (error) {
      console.log(error.message);
    }
  };

  _handleLogin = () => {
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post(`${URL_STRING}/login`, data).then(res => {
      if (!res.data.token) {
        this.setState({
          msg: res.data.msg,
          show: true,
        });
        Alert.alert('Salah, user: ', this.state.password);
      } else {
        this.saveToken(res.data.token);
        // Alert.alert(
        //   res
        // )
        this.setState({
          login: true,
        });
      }
    });
  };
  render() {
    if (this.state.login) {
      return <Index />;
    } else {
      return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <View style={styles.logo}>
                <Image
                  style={styles.logoImage}
                  source={require('../../../assets/img/segi6_pink.png')}
                />
                <Text style={[styles.logoText, styless.fontAirbnb]}>
                  Tosm Cafe
                </Text>
              </View>
              <TextInput
                placeholder="Username"
                placeholderColor="#c4c3cb"
                style={[styles.loginFormTextInput]}
                onChangeText={e => this.setState({username: e})}
                value={this.state.username}
              />
              <TextInput
                placeholder="Password"
                placeholderColor="#c4c3cb"
                style={[styles.loginFormTextInput]}
                secureTextEntry={true}
                onChangeText={e => this.setState({password: e})}
                value={this.state.password}
              />

              <TouchableOpacity onPress={() => this._handleLogin()}>
                <View style={[styles.loginButton, styless.shadow]}>
                  <Text style={[styles.loginButtonText, styless.fontAirbnb]}>
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
            />
            <Button
              buttonStyle={styles.fbLoginButton}
              onPress={() => this.onFbLoginPress()}
              title="Login with Facebook"
              color="#3897f1"
            /> */}
            </View>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}

export default Login;

const styless = StyleSheet.create({
  fontAirbnb: {
    fontFamily: 'Airbnb Cereal App',
  },
  shadow: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  textShadow: {
    textShadowColor: 'rgb(168, 168, 168)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 5,
  },
});
