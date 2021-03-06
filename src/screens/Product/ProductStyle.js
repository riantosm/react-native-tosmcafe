const React = require('react-native');

const { StyleSheet } = React;

export default {
  containerView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapperBox: {
    width: '100%',
    padding: 20,
  },
  box: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  productImage: {
    borderRadius: 2,
    width: 60,
    height: 60
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
  },

  btn: {
    borderRadius: 2,
    padding: 10,
    width: 60,
    textAlignVertical: 'center'
  },
  Detail: {
    backgroundColor: '#57CAD5'
  },
  Edit: {
    backgroundColor: '#AB84C8',
  },
  Delete: {
    backgroundColor: '#F24F8A'
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomColor: '#999',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  textDetail: {
    color: '#57CAD5',
    fontSize: 20,
    padding: 5,
  }
};