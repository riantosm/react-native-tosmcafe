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
import styles from './CategoryStyle';
import font from '../Font';

const URL_STRING = 'http://192.168.1.237:3001/api/v1';

export default class Category extends Component {
  constructor() {
    super();
    this.state = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTgyNjg3NjA0fQ.lqvHkkKjXB65ZSPLFQBQrrMs29QBRO7po5_1Vc93qAo',
      category: [],
      id_category: '',
      name_category: '',
      modalAdd: false,
      modalEdit: false,
      modalDelete: false,
    };
  }

  setModalAdd(visible) {
    this.setState({modalAdd: visible});
    this.handleCancel();
  }
  setModalEdit(visible) {
    this.setState({modalEdit: visible});
    this.handleCancel();
  }
  setModalDelete(visible) {
    this.setState({modalDelete: visible});
    this.handleCancel();
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
  addCategory = () => {
    axios
      .post(
        `${URL_STRING}/category`,
        {name_category: this.state.name_category},
        {
          headers: {
            token: this.state.token,
          },
        },
      )
      .then(
        res => {
          this.getCategory();
          this.handleCancel();
        },
        err => {
          console.log('error: ', err);
        },
      );
  };
  editCategory = (id, name) => {
    this.setState({
      id_category: id,
      name_category: name,
    });
  };
  editIt = () => {
    axios
      .patch(
        `${URL_STRING}/category/${this.state.id_category}`,
        {name_category: this.state.name_category},
        {
          headers: {
            token: this.state.token,
          },
        },
      )
      .then(
        res => {
          this.getCategory();
          this.handleCancel();
        },
        err => {
          console.log('error: ', err);
        },
      );
  };
  deleteCategory = (id, name) => {
    this.setState({
      id_category: id,
      name_category: name,
    });
  };
  deleteIt = () => {
    axios
      .delete(`${URL_STRING}/category/${this.state.id_category}`, {
        headers: {
          token: this.state.token,
        },
      })
      .then(
        res => {
          this.getCategory();
          this.handleCancel();
        },
        err => {
          console.log('error: ', err);
        },
      );
  };
  handleCancel() {
    this.setState({
      name_category: '',
    });
  }
  componentDidMount() {
    this.getCategory();
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <ScrollView>
          <View style={styles.wrapperBox}>
            <View style={{ marginBottom: 20 }}>
              <Text style={[{ fontSize: 40 }, font.Airbnb]}>
                List <Text style={{ color: '#57CAD5' }}>Category</Text>.
              </Text>
              <View style={[{ borderWidth: 1, borderRadius: 10, borderColor: '#57CAD5', width: 40, marginTop: 10 }]}></View>
            </View>
            <View style={{marginVertical: 10}}>
              <TextInput
                placeholder="Search category"
                placeholderColor="#c4c3cb"
                style={[styles.input, font.Airbnb]}
              />
            </View>

            <View style={[styles.table]}>
              <View style={[styles.tr, {width: '100%', marginBottom: 10}]}>
                <Text style={[{width: 20}, font.Airbnb]}>#</Text>
                <Text style={[{width: 160}, font.Airbnb]}>Name</Text>
                <Text style={[{width: 100}, font.Airbnb]}>Action</Text>
              </View>

              {this.state.category.map((category, i) => {
                return (
                  <View
                    style={[styles.tr, {width: '100%'}]}
                    key={category.id_category}>
                    <Text style={{width: 20}}>{i + 1}</Text>
                    <Text style={[{width: 150}, font.Airbnb]}>
                      {category.name_category}
                    </Text>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setModalEdit(true);
                          this.editCategory(
                            category.id_category,
                            category.name_category,
                          );
                        }}>
                        <Text
                          style={[
                            {
                              color: '#AB84C8',
                              textAlign: 'center',
                              width: 50,
                              height: '100%',
                            },
                            font.Airbnb,
                          ]}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setModalDelete(true);
                          this.deleteCategory(
                            category.id_category,
                            category.name_category,
                          );
                        }}>
                        <Text
                          style={[
                            {
                              color: '#F24F8A',
                              textAlign: 'center',
                              width: 50,
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

              <View style={[styles.tr, {width: '100%'}]}></View>
            </View>
          </View>
        </ScrollView>
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
                Add category
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
          <ScrollView>
            <View style={{padding: 20}}>
              <View>
                <View style={{marginBottom: 50}}>
                  <Text style={[{fontSize: 40}, font.Airbnb]}>
                    Add <Text style={{color: '#57CAD5'}}>Category</Text>.
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
                      font.Airbnb,
                    ]}></View>
                </View>

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Category</Text>
                  <TextInput
                    placeholder="Input category"
                    placeholderColor="#c4c3cb"
                    style={[styles.input, font.Airbnb]}
                    onChangeText={e => this.setState({name_category: e})}
                    value={this.state.name_category}
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
                this.addCategory();
                this.setModalAdd(!this.state.modalAdd);
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
                    Edit <Text style={{color: '#AB84C8'}}>Category</Text>.
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

                <View style={{marginVertical: 10}}>
                  <Text style={font.Airbnb}>Category</Text>
                  <TextInput
                    placeholder="Input category"
                    placeholderColor="#c4c3cb"
                    style={[styles.input]}
                    onChangeText={e => this.setState({name_category: e})}
                    value={this.state.name_category}
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
                this.editIt();
                this.setModalEdit(!this.state.modalEdit);
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
                    Delete <Text style={{color: '#F24F8A'}}>Category</Text>.
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
                      font.Airbnb,
                    ]}></View>
                </View>

                <View style={{marginVertical: 150, alignItems: 'center'}}>
                  <Text style={{fontSize: 20, textAlign: 'center'}}>
                    {'\n'}
                    Are you sure want to delete{' '}
                    <Text style={{color: '#F24F8A'}}>
                      {this.state.name_category}
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
                this.deleteIt();
                this.setModalDelete(!this.state.modalDelete);
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
