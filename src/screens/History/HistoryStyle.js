const React = require('react-native');

const { StyleSheet } = React;

export default {
  containerView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapperBox: {
    // backgroundColor: 'red',
    // alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  box: {
    alignItems: 'center',
    width: '100%',
    height: 150,
    marginTop: 0,
    marginBottom: 20,
    borderRadius: 4,
  },
  table: {
    marginVertical: 20,
    flex: 1,
  },
  tr: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopColor: '#bababa',
    borderTopWidth: 0.25,
    // width: 100,
  }
};