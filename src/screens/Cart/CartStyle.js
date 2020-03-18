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
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomColor: '#999',
    paddingHorizontal: 15,
    paddingVertical: 5,
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
  listBox: {
    width: '100%',
    flexDirection: 'row',
    flex:1,
    flexWrap: 'wrap',
  },
  listPrdct: {
    width: '50%',
    height: 210,
    alignItems: 'center',
  },
  productImageList: {
    width: 150,
    height: 150,
    borderRadius: 2,
  },
  productNameList: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlign: 'left'
  },
  productPriceList: {
    fontSize: 14,
    paddingHorizontal: 10,
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
    height: 60,
  },
  boxCartQty: {
    width: 125,
    height: 41.6,
    flexDirection: 'row',
    marginVertical: 10
  },
  boxQty: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 41.6,
    height: 41.6,
    borderWidth: 2,
    borderColor: '#82DE3A',
    backgroundColor: 'rgba(130, 222, 58, 0.2)',
  },
  cartAdd: {
    borderLeftWidth: 0,
  },
  cartQty: {
  },
  cartReduc: {
    borderRightWidth: 0,
  },
  textQty: {
    color: '#73b83d',
    fontWeight: '800',
  }
};