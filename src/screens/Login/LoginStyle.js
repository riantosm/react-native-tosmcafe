const React = require("react-native");

const { StyleSheet } = React;

export default {
  containerView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginScreenContainer: {
    flex: 1,
  },
  logo: {
    marginTop: 140,
    marginBottom: 30,
    alignItems: 'center',
  },
  logoImage: {
    width: 70,
    height: 70,
  },
  logoText: {
    fontSize: 40,
    textAlign: 'center',
    color: '#F24F8A',
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomColor: '#F24F8A',
    backgroundColor: '#fff',
    color: '#F24F8A',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "Airbnb Cereal App",
  },
  loginButton: {
    backgroundColor: '#F24F8A',
    borderColor: '#ffbdd5',
    borderWidth: 1,
    borderRadius: 3,
    height: 45,
    marginTop: 50,
    padding: 12,
    margin: 15,
    alignItems: 'center',
    textAlign: 'center',
  },
  loginButtonText: {
    color: '#fff',
  },
};