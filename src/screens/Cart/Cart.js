// Library
import React, {Component} from 'react';
import {
  ScrollView,
  Keyboard,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

// Styles
import styles from './CartStyle';
import font from '../Font';

const URL_STRING = 'http://192.168.1.237:3001/api/v1';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTgyNjg3NjA0fQ.lqvHkkKjXB65ZSPLFQBQrrMs29QBRO7po5_1Vc93qAo',

      productData: [],
      modalAdd: false,
      modalCheckout: false,
    };
  }

  setModalAdd(visible) {
    this.setState({modalAdd: visible});
  }
  setModalCheckout(visible) {
    this.setState({modalCheckout: visible});
  }
  getProduct = async () => {
    await axios
      .get(`${URL_STRING}/product`, {
        headers: {
          token: this.state.token,
        },
      })
      .then(response => {
        this.setState({
          productData: response.data.result,
        });
      });
  };
  componentDidMount() {
    this.getProduct();
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <View style={styles.wrapperBox}>
          <View style={{marginBottom: 20}}>
            <Text style={[{fontSize: 40}, font.Airbnb]}>
              Add <Text style={{color: '#57CAD5'}}>Items</Text>.
            </Text>
            <View
              style={[
                {
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#57CAD5',
                  width: 40,
                  marginTop: 10,
                },
              ]}></View>
          </View>
          <ScrollView style={{height: 460}}>
            <View style={{marginVertical: 10}}>
              <TextInput
                placeholder="Search Item"
                placeholderColor="#c4c3cb"
                style={[styles.input]}
              />
            </View>
            <View style={styles.listBox}>
              {this.state.productData.map(product => {
                return (
                  <TouchableOpacity style={styles.listPrdct}>
                    <View>
                      <Image
                        source={{uri: product.image}}
                        style={styles.productImageList}
                      />
                      <View style={{width: '100%'}}>
                        <Text
                          numberOfLines={1}
                          style={{
                            paddingHorizontal: 10,
                            paddingTop: 5,
                          }}>
                          <Text style={styles.productNameList}>
                            {product.name_product}
                          </Text>
                        </Text>
                        <Text style={styles.productPriceList}>
                          Rp {product.price_product}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
          <TouchableOpacity
            onPress={() => {
              this.setModalAdd(true);
            }}>
            <View
              style={[
                styles.btn,
                styles.Detail,
                {width: '100%', marginVertical: 10},
              ]}>
              <Text style={[{color: '#fff', textAlign: 'center'}, font.Airbnb]}>
                View Cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Modal Add -- { */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalAdd}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{padding: 20}}>
            <View>
              <View style={{marginBottom: 50}}>
                <Text style={[{fontSize: 40}, font.Airbnb]}>
                  Your <Text style={{color: '#AB84C8'}}>Cart</Text>.
                </Text>
                <View
                  style={[
                    {
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: '#AB84C8',
                      width: 40,
                      marginTop: 10,
                    },
                    font.Airbnb,
                  ]}></View>
              </View>
              <ScrollView style={{height: 420}}>
                <View style={[styles.box, {marginVertical: 10}]}>
                  <Image
                    source={require('../../../assets/img/exp1.png')}
                    style={styles.productImage}
                  />
                  <Text
                    style={[
                      {width: 135, paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#AB84C8'}}>Coffe Latte</Text>
                    {'\n'}
                    <Text style={{color: '#999'}}>
                      Drink
                      {'\n'}
                      Stock : 21 pcs
                    </Text>
                  </Text>
                  <View style={[styles.boxCartQty]}>
                    <View style={[styles.boxQty, styles.cartReduc]}>
                      <Text style={[styles.textQty, font.Airbnb]}>-</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartQty]}>
                      <Text style={[styles.textQty, font.Airbnb]}>2</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartAdd]}>
                      <Text style={[styles.textQty, font.Airbnb]}>+</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.box, {marginVertical: 10}]}>
                  <Image
                    source={require('../../../assets/img/exp2.png')}
                    style={styles.productImage}
                  />
                  <Text
                    style={[
                      {width: 135, paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#AB84C8'}}>Coffe Latte</Text>
                    {'\n'}
                    <Text style={{color: '#999'}}>
                      Drink
                      {'\n'}
                      Stock : 46 pcs
                    </Text>
                  </Text>
                  <View style={[styles.boxCartQty]}>
                    <View style={[styles.boxQty, styles.cartReduc]}>
                      <Text style={[styles.textQty, font.Airbnb]}>-</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartQty]}>
                      <Text style={[styles.textQty, font.Airbnb]}>7</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartAdd]}>
                      <Text style={[styles.textQty, font.Airbnb]}>+</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.box, {marginVertical: 10}]}>
                  <Image
                    source={require('../../../assets/img/exp3.png')}
                    style={styles.productImage}
                  />
                  <Text
                    style={[
                      {width: 135, paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#AB84C8'}}>Coffe Latte</Text>
                    {'\n'}
                    <Text style={{color: '#999'}}>
                      Drink
                      {'\n'}
                      Stock : 33 pcs
                    </Text>
                  </Text>
                  <View style={[styles.boxCartQty]}>
                    <View style={[styles.boxQty, styles.cartReduc]}>
                      <Text style={[styles.textQty, font.Airbnb]}>-</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartQty]}>
                      <Text style={[styles.textQty, font.Airbnb]}>1</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartAdd]}>
                      <Text style={[styles.textQty, font.Airbnb]}>+</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.box, {marginVertical: 10}]}>
                  <Image
                    source={require('../../../assets/img/exp4.png')}
                    style={styles.productImage}
                  />
                  <Text
                    style={[
                      {width: 135, paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#AB84C8'}}>Coffe Latte</Text>
                    {'\n'}
                    <Text style={{color: '#999'}}>
                      Drink
                      {'\n'}
                      Stock : 56 pcs
                    </Text>
                  </Text>
                  <View style={[styles.boxCartQty]}>
                    <View style={[styles.boxQty, styles.cartReduc]}>
                      <Text style={[styles.textQty, font.Airbnb]}>-</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartQty]}>
                      <Text style={[styles.textQty, font.Airbnb]}>2</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartAdd]}>
                      <Text style={[styles.textQty, font.Airbnb]}>+</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.box, {marginVertical: 10}]}>
                  <Image
                    source={require('../../../assets/img/exp5.png')}
                    style={styles.productImage}
                  />
                  <Text
                    style={[
                      {width: 135, paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#AB84C8'}}>Coffe Latte</Text>
                    {'\n'}
                    <Text style={{color: '#999'}}>
                      Drink
                      {'\n'}
                      Stock : 76 pcs
                    </Text>
                  </Text>
                  <View style={[styles.boxCartQty]}>
                    <View style={[styles.boxQty, styles.cartReduc]}>
                      <Text style={[styles.textQty, font.Airbnb]}>-</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartQty]}>
                      <Text style={[styles.textQty, font.Airbnb]}>7</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartAdd]}>
                      <Text style={[styles.textQty, font.Airbnb]}>+</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.box, {marginVertical: 10}]}>
                  <Image
                    source={require('../../../assets/img/exp1.png')}
                    style={styles.productImage}
                  />
                  <Text
                    style={[
                      {width: 135, paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#AB84C8'}}>Coffe Latte</Text>
                    {'\n'}
                    <Text style={{color: '#999'}}>
                      Drink
                      {'\n'}
                      Stock : 46 pcs
                    </Text>
                  </Text>
                  <View style={[styles.boxCartQty]}>
                    <View style={[styles.boxQty, styles.cartReduc]}>
                      <Text style={[styles.textQty, font.Airbnb]}>-</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartQty]}>
                      <Text style={[styles.textQty, font.Airbnb]}>7</Text>
                    </View>
                    <View style={[styles.boxQty, styles.cartAdd]}>
                      <Text style={[styles.textQty, font.Airbnb]}>+</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              left: 0,
              right: 0,
              bottom: 0,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setModalAdd(!this.state.modalAdd);
                this.setModalCheckout(!this.state.modalCheckout);
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Edit,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text
                  style={[{color: '#fff', textAlign: 'center'}, font.Airbnb]}>
                  Checkout
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalAdd(!this.state.modalAdd);
                }}
                style={[
                  styles.btn,
                  styles.Delete,
                  {width: '47%', marginVertical: 10},
                ]}>
                <View>
                  <Text
                    style={[{color: '#fff', textAlign: 'center'}, font.Airbnb]}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setModalAdd(!this.state.modalAdd);
                }}
                style={[
                  styles.btn,
                  styles.Detail,
                  {width: '47%', marginLeft: 20, marginVertical: 10},
                ]}>
                <View>
                  <Text
                    style={[{color: '#fff', textAlign: 'center'}, font.Airbnb]}>
                    Back
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* } -- Modal Add */}

        {/* Modal Checkout -- { */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalCheckout}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ScrollView>
            <View style={{padding: 20}}>
              <View>
                <View style={{marginBottom: 50}}>
                  <Text style={[{fontSize: 40}, font.Airbnb]}>
                    Invoice {'\n'}
                    <Text style={{color: '#F24F8A'}}>#123512512</Text>.
                  </Text>
                  <View
                    style={[
                      {
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#000',
                        width: 40,
                        marginTop: 10,
                      },
                    ]}></View>
                  <Text
                    style={[
                      {fontSize: 15, color: '#999', marginTop: 10},
                      font.Airbnb,
                    ]}>
                    Cashire : rian
                  </Text>
                </View>

                {/* this */}
                <View style={[styles.box, {marginVertical: 10}]}>
                  <Text
                    style={[
                      {width: '60%', paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#999'}}>
                      ( 1x ) -{' '}
                      <Text style={{color: '#F24F8A'}}>Coffe Latte</Text>
                    </Text>
                  </Text>
                  <Text
                    style={[
                      {width: '40%', paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#999'}}>Rp 5500</Text>
                  </Text>
                </View>
                {/* this */}

                <View style={[styles.box, {marginVertical: 10}]}>
                  <Text
                    style={[
                      {width: '60%', paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#999'}}>
                      ( 4x ) -{' '}
                      <Text style={{color: '#F24F8A'}}>Chicken double</Text>
                    </Text>
                  </Text>
                  <Text
                    style={[
                      {width: '40%', paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#999'}}>Rp 20500</Text>
                  </Text>
                </View>
                <View style={[styles.box, {marginVertical: 10}]}>
                  <Text
                    style={[
                      {width: '60%', paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#999'}}>
                      ( 2x ) - <Text style={{color: '#F24F8A'}}>Pizza</Text>
                    </Text>
                  </Text>
                  <Text
                    style={[
                      {width: '40%', paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#999'}}>Rp 52000</Text>
                  </Text>
                </View>

                {/* this */}
                <View style={[styles.box, {marginVertical: 10}]}>
                  <Text
                    style={[
                      {
                        width: '60%',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        textAlign: 'right',
                      },
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#999'}}>PPN 10% :</Text>
                  </Text>
                  <Text
                    style={[
                      {width: '40%', paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#F24F8A'}}>Rp 2000</Text>
                  </Text>
                </View>
                <View
                  style={[
                    styles.box,
                    {marginVertical: 10, borderBottomWidth: 0},
                  ]}>
                  <Text
                    style={[
                      {
                        width: '60%',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        textAlign: 'right',
                      },
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#999'}}>Total :</Text>
                  </Text>
                  <Text
                    style={[
                      {width: '40%', paddingHorizontal: 10, paddingVertical: 5},
                      font.Airbnb,
                    ]}>
                    <Text style={{color: '#F24F8A'}}>Rp 52000</Text>
                  </Text>
                </View>
                {/* this */}
              </View>
            </View>
          </ScrollView>

          <View
            style={{
              width: '100%',
              left: 0,
              right: 0,
              bottom: 0,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setModalCheckout(!this.state.modalCheckout);
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Edit,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text
                  style={[{color: '#fff', textAlign: 'center'}, font.Airbnb]}>
                  Print
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setModalCheckout(!this.state.modalCheckout);
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Delete,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text
                  style={[{color: '#fff', textAlign: 'center'}, font.Airbnb]}>
                  Send Email
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* } -- Modal Checkout */}
      </KeyboardAvoidingView>
    );
  }
}
