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
  Picker,
} from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';

// Styles
import styles from './ProductStyle';
import font from '../Font';

const URL_STRING = 'http://192.168.1.237:3001/api/v1';

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTgyNjg3NjA0fQ.lqvHkkKjXB65ZSPLFQBQrrMs29QBRO7po5_1Vc93qAo',
      modalAddStock: false,
      modalDetail: false,
      modalAdd: false,
      modalEdit: false,
      modalDelete: false,
      productData: [],
      category: [],

      id_product: '',
      name_product: '',
      desc_product: '',
      price_product: 1000,
      stock_product: '',
      image: null,
      id_category: '1',
      name_category: '',

      add_stock_product: '1',
    };
  }

  setModalAddStock(visible) {
    this.setState({modalAddStock: visible});
  }
  setModalDetail(visible) {
    this.setState({modalDetail: visible});
  }
  setModalAdd(visible) {
    this.setState({modalAdd: visible});
  }
  setModalEdit(visible) {
    this.setState({modalEdit: visible});
  }
  setModalDelete(visible) {
    this.setState({modalDelete: visible});
  }

  getCategory = () => {
    axios
      .get(`${URL_STRING}/category`, {
        headers: {
          token: this.state.token,
        },
      })
      .then(response => {
        this.setState({
          category: response.data.result,
        });
      });
  };
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
  detailProduct = data => {
    this.setState({
      id_product: data.id_product,
      name_product: data.name_product,
      desc_product: data.desc_product,
      price_product: data.price_product,
      stock_product: data.stock_product,
      image: data.image,
      id_category: data.id_category,
      name_category: data.name_category,
    });
  };
  addStock = () => {
    let id = this.state.id_product;
    let stock = parseInt(this.state.add_stock_product);
    axios
      .patch(
        `${URL_STRING}/product/${id}/stock`,
        {stock},
        {
          headers: {
            token: this.state.token,
          },
        },
      )
      .then(
        res => {
          this.getProduct();
          this.setState({
            stock_product: this.state.stock_product + stock,
            add_stock_product: '1'
          });
        },
        err => {
          console.log('error: ', err);
        },
      );
  };
  handleSaveAdd = async () => {
    const dataFile = new FormData();
    dataFile.append('name_product', this.state.name_product);
    dataFile.append('desc_product', this.state.desc_product);
    dataFile.append('price_product', this.state.price_product);
    dataFile.append('id_category', this.state.id_category);
    dataFile.append('image', {
      uri: this.state.ImageUpload.uri,
      type: this.state.ImageUpload.type,
      name: this.state.ImageUpload.fileName,
    });
    await axios
      .post(`${URL_STRING}/product`, dataFile, {
        headers: {
          token: this.state.token,
        },
      })
      .then(res => {
        Alert.alert('Add product success!');
        this.getProduct();
        this.handleCancel();
      })
      .catch(() => {
        Alert.alert('add gagal ');
      });
  };
  handleSaveEdit = async () => {
    // console.warn('s');
    let dataFile = new FormData();
    if (this.state.ImageUpload) {
      dataFile.append('name_product', this.state.name_product);
      dataFile.append('desc_product', this.state.desc_product);
      dataFile.append('price_product', this.state.price_product);
      dataFile.append('id_category', this.state.id_category);
      dataFile.append('image', {
        uri: this.state.ImageUpload.uri,
        type: this.state.ImageUpload.type,
        name: this.state.ImageUpload.fileName,
      });
    } else {
      dataFile.append('name_product', this.state.name_product);
      dataFile.append('desc_product', this.state.desc_product);
      dataFile.append('price_product', this.state.price_product);
      dataFile.append('id_category', this.state.id_category);
    }
    await axios
      .patch(`${URL_STRING}/product/${this.state.id_product}`, dataFile, {
        headers: {
          token: this.state.token,
        },
      })
      .then(res => {
        Alert.alert('Edit product success!');
        this.handleCancel();
        this.getProduct();
      })
      .catch(() => {
        Alert.alert('add gagal ');
      });
  };
  handleDelete = async () => {
    await axios
      .delete(`${URL_STRING}/product/${this.state.id_product}`, {
        headers: {
          token: this.state.token,
        },
      })
      .then(
        res => {
          Alert.alert('Delete product success!');
          this.handleCancel();
          this.getProduct();
        },
        err => {
          console.log('error: ', err);
        },
      );
  };

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        const source = response.uri;

        this.setState({
          image: source,
          ImageUpload: response,
        });
      }
      // }
    });
  };
  handleCancel() {
    this.setState({
      id_product: '',
      name_product: '',
      desc_product: '',
      price_product: 1000,
      stock_product: '',
      image: null,
      id_category: '1',
      name_category: '',

      add_stock_product: '1',
    });
  }
  componentDidMount() {
    this.getCategory();
    this.getProduct();
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
          <View style={styles.wrapperBox}>
            <View style={{marginBottom: 20}}>
              <Text style={[{fontSize: 40}, font.Airbnb]}>
                List <Text style={{color: '#57CAD5'}}>Product</Text>.
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

            <ScrollView style={{height:460}}>
            <View style={{marginVertical: 10}}>
              <TextInput
                placeholder="Search name product"
                placeholderColor="#c4c3cb"
                style={[styles.input, font.Airbnb]}
              />
            </View>
            {this.state.productData.map(product => {
              return (
                <View
                  style={[styles.box, {marginVertical: 10}]}
                  key={product.id_product}>
                  <Image
                    source={{uri: product.image}}
                    style={styles.productImage}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalDetail(true);
                      this.detailProduct(product);
                    }}>
                    <Text
                      style={[
                        {width: 135, paddingHorizontal: 10, paddingVertical: 4},
                        font.Airbnb,
                      ]}
                      numberOfLines={1}>
                      <Text style={{color: '#57CAD5'}}>
                        {product.name_product}
                      </Text>
                    </Text>
                    <Text
                      style={[
                        {width: 135, paddingHorizontal: 10, paddingVertical: 0},
                        font.Airbnb,
                      ]}>
                      <Text style={{color: '#999'}}>
                        {product.name_category}
                        {'\n'}
                        Stock : {product.stock_product} pcs
                      </Text>
                    </Text>
                  </TouchableOpacity>
                  <View style={[styles.btn]}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalEdit(true);
                        this.detailProduct(product);
                      }}>
                      <Text
                        style={[
                          {
                            color: '#AB84C8',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            height: '100%',
                          },
                          font.Airbnb,
                        ]}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.btn]}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalDelete(true);
                        this.detailProduct(product);
                      }}>
                      <Text
                        style={[
                          {
                            color: '#F24F8A',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            height: '100%',
                          },
                          font.Airbnb,
                        ]}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
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
              <Text style={{color: '#fff', textAlign: 'center'}}>
                Add product
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Modal AddStock -- { */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalAddStock}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ScrollView>
            <View style={{padding: 20}}>
              <View>
                <View style={{marginBottom: 50}}>
                  <Text style={[{fontSize: 40}, font.Airbnb]}>
                    AddStock <Text style={{color: '#AB84C8'}}>Product</Text>.
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
                    ]}></View>
                </View>

                <View style={{marginVertical: 10}}>
                  <Text>(+) Add Stock</Text>
                  <TextInput
                    placeholder="Input stock product"
                    placeholderColor="#c4c3cb"
                    style={[styles.input]}
                    value={this.state.add_stock_product}
                    onChangeText={e => this.setState({add_stock_product: e})}
                    keyboardType={'numeric'}
                  />
                </View>
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
                this.setModalAddStock(!this.state.modalAddStock);
                this.addStock(this.state.id_product);
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Edit,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Add Stock
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setModalAddStock(!this.state.modalAddStock);
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Delete,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* } -- Modal AddStock */}

        {/* Modal Detail -- { */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalDetail}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ScrollView>
            <View style={{padding: 20}}>
              <View>
                <View style={{marginBottom: 50}}>
                  <Text style={[{fontSize: 40}, font.Airbnb]}>
                    Detail <Text style={{color: '#57CAD5'}}>Product</Text>.
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

                <View style={{marginVertical: 10}}>
                  <Text>Image</Text>
                  <Image
                    source={{uri: this.state.image}}
                    style={[
                      styles.productImage,
                      {width: 150, height: 150, marginTop: 10, margin: 5},
                    ]}
                  />
                </View>

                <View style={{marginVertical: 10}}>
                  <Text>Name</Text>
                  <Text style={[styles.textDetail, font.Airbnb]}>
                    {this.state.name_product}
                  </Text>
                </View>

                <View style={{marginVertical: 10}}>
                  <Text>Description</Text>
                  <Text style={[styles.textDetail, font.Airbnb]}>
                    {this.state.desc_product}
                  </Text>
                </View>

                <View style={{marginVertical: 10}}>
                  <Text>Stock</Text>
                  <Text
                    style={[
                      styles.textDetail,
                      font.Airbnb,
                      {color: '#AB84C8'},
                    ]}>
                    {this.state.stock_product} pcs
                  </Text>
                </View>

                <View style={{marginVertical: 10}}>
                  <Text>Price</Text>
                  <Text style={[styles.textDetail, font.Airbnb]}>
                    Rp {this.state.price_product}
                  </Text>
                </View>

                <View style={{marginVertical: 10}}>
                  <Text>Category</Text>
                  <Text style={[styles.textDetail, font.Airbnb]}>
                    {this.state.name_category}
                  </Text>
                </View>
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
                this.setModalAddStock(true);
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Edit,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Add Stock
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setModalDetail(!this.state.modalDetail);
                this.handleCancel();
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Delete,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* } -- Modal Detail */}

        {/* Modal Add -- { */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalAdd}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ScrollView>
            <View style={{padding: 20}}>
              <View>
                <View style={{marginBottom: 50}}>
                  <Text style={[{fontSize: 40}, font.Airbnb]}>
                    Add <Text style={{color: '#57CAD5'}}>Product</Text>.
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

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Name</Text>
                  <TextInput
                    placeholder="Input name product"
                    placeholderColor="#c4c3cb"
                    style={[styles.input]}
                    onChangeText={e => this.setState({name_product: e})}
                    value={this.state.name_product}
                  />
                </View>

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Description</Text>
                  <TextInput
                    placeholder="Input description product"
                    placeholderColor="#c4c3cb"
                    style={[styles.input]}
                    onChangeText={e => this.setState({desc_product: e})}
                    value={this.state.desc_product}
                  />
                </View>

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Price</Text>
                  <TextInput
                    placeholder="Input price product"
                    placeholderColor="#c4c3cb"
                    style={[styles.input]}
                    onChangeText={e => this.setState({price_product: e})}
                    value={this.state.price_product.toString()}
                    keyboardType={'numeric'}
                  />
                </View>

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Category</Text>
                  <Picker
                    selectedValue={this.state.id_category}
                    style={{height: 50, width: '100%'}}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({id_category: itemValue});
                      console.warn(this.state.id_category);
                    }}>
                    {this.state.category.map(category => {
                      return (
                        <Picker.Item
                          label={category.name_category}
                          value={category.id_category}
                        />
                      );
                    })}
                  </Picker>
                </View>

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Image</Text>
                  <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                    <View style={[styles.input]}>
                      <Text style={[{color: '#999', paddingVertical: 5}]}>
                        Take a picture or select from galery
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Image
                    source={{uri: this.state.image}}
                    style={[styles.productImage, {margin: 20}]}
                  />
                </View>
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
                this.setModalAdd(!this.state.modalAdd);
                this.handleSaveAdd();
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Detail,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Save</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setModalAdd(!this.state.modalAdd);
                this.handleCancel();
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Delete,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* } -- Modal Add */}

        {/* Modal Edit -- { */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalEdit}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ScrollView>
            <View style={{padding: 20}}>
              <View>
                <View style={{marginBottom: 50}}>
                  <Text style={[{fontSize: 40}, font.Airbnb]}>
                    Edit <Text style={{color: '#AB84C8'}}>Product</Text>.
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
                    ]}></View>
                </View>

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Name</Text>
                  <TextInput
                    placeholder="Input name product"
                    placeholderColor="#c4c3cb"
                    style={[styles.input]}
                    onChangeText={e => this.setState({name_product: e})}
                    value={this.state.name_product}
                  />
                </View>

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Description</Text>
                  <TextInput
                    placeholder="Input description product"
                    placeholderColor="#c4c3cb"
                    style={[styles.input]}
                    onChangeText={e => this.setState({desc_product: e})}
                    value={this.state.desc_product}
                  />
                </View>

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Price</Text>
                  <TextInput
                    placeholder="Input price product"
                    placeholderColor="#c4c3cb"
                    style={[styles.input]}
                    onChangeText={e => this.setState({price_product: e})}
                    value={this.state.price_product.toString()}
                    keyboardType={'numeric'}
                  />
                </View>

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Category</Text>
                  <Picker
                    selectedValue={this.state.id_category}
                    style={{height: 50, width: '100%'}}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({id_category: itemValue});
                      console.warn(this.state.id_category);
                    }}>
                    {this.state.category.map(category => {
                      return (
                        <Picker.Item
                          label={category.name_category}
                          value={category.id_category}
                        />
                      );
                    })}
                  </Picker>
                </View>

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Image</Text>
                  <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                    <View style={[styles.input]}>
                      <Text style={[{color: '#999', paddingVertical: 5}]}>
                        Take a picture or select from galery
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Image
                    source={{uri: this.state.image}}
                    style={[styles.productImage, {margin: 20}]}
                  />
                </View>
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
                this.setModalEdit(!this.state.modalEdit);
                this.handleSaveEdit();
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Edit,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Save</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setModalEdit(!this.state.modalEdit);
                this.handleCancel();
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Delete,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* } -- Modal Edit */}

        {/* Modal Delete -- { */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalDelete}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ScrollView>
            <View style={{padding: 20}}>
              <View>
                <View style={{marginBottom: 50}}>
                  <Text style={[{fontSize: 40}, font.Airbnb]}>
                    Delete <Text style={{color: '#F24F8A'}}>Product</Text>.
                  </Text>
                  <View
                    style={[
                      {
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#F24F8A',
                        width: 40,
                        marginTop: 10,
                      },
                    ]}></View>
                </View>

                <View style={{marginVertical: 100, alignItems: 'center'}}>
                  <Image
                    source={{uri: this.state.image}}
                    style={{borderRadius: 10, width: 100, height: 100}}
                  />
                  <Text style={{fontSize: 20, textAlign: 'center'}}>
                    {'\n'}
                    Are you sure want to delete{' '}
                    <Text style={{color: '#F24F8A'}}>
                      {this.state.name_product}
                    </Text>{' '}
                    ?
                  </Text>
                </View>
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
                this.setModalDelete(!this.state.modalDelete);
                this.handleDelete();
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Delete,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Delete</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setModalDelete(!this.state.modalDelete);
                this.handleCancel();
              }}>
              <View
                style={[
                  styles.btn,
                  styles.Detail,
                  {width: '100%', marginVertical: 10},
                ]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* } -- Modal Delete */}
      </KeyboardAvoidingView>
    );
  }
}
