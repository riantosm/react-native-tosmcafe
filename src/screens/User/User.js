// Library
import React, { Component } from 'react'
import { connect } from "react-redux";
import { ScrollView, Keyboard, Text, View, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, StyleSheet, Image, Modal, TouchableOpacity, Alert } from 'react-native'
import { getAllUser, postNewUser } from '../../redux/actions/user';
import axios from "axios";

// Styles
import styles from './UserStyle'
import font from '../Font'

const URL_STRING = 'http://192.168.1.237:3001/api/v1';

class User extends Component {
  constructor() {
    super();
    this.state = {
      modalAdd: false,
      userData: [],
      name_user: '',
      username: '',
      password: '',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTgyNjk5ODIyfQ.mkFr20iOMVJq3wSrIrPxw5qyHkojt2TxlsJNdtR7xNQ',
    }
  }
  // getUser = async () => {
  //   await this.props.dispatch(getAllUser())
  //   this.setState({
  //     userData: this.props.user.userData
  //   });
  // };
  getUser = () => {
    axios.get(`${URL_STRING}/user`, {
      headers: {
        token: this.state.token
      }
    }).then(response => {
      this.setState({
        userData: response.data.result
      })
    })
  }
  // postUser = () => {
  //   let data = {
  //     name_user: this.state.name_user,
  //     username: this.state.username,
  //     password: this.state.password
  //   }
  //   this.props.dispatch(postNewUser(data));
  //   setTimeout(this.getUser, 1000);
  // };
  postUser = async () => {
    console.warn(this.state.name_user);
    await axios.post(`${URL_STRING}/user` , {
      name_user: this.state.name_user,
      username: this.state.username,
      password: this.state.password,
    }, {
      headers: {
        token: this.state.token
      }  
    }).then((res) => {
      console.warn('ok: ',res);
      this.getUser();
      this.handleCancel();
    }, (err) => {
      console.warn('error: ', err);
    })
  }
  handleCancel(){
    this.setState({
      name_user: '',
      username: '',
      password: '',
    })
  }

  setModalAdd(visible) {
    this.setState({ modalAdd: visible });
  }
  componentDidMount() {
    setTimeout(this.getUser, 2000);
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <ScrollView>
          <View style={styles.wrapperBox}>
            <View style={{ marginBottom: 20 }}>
              <Text style={[{ fontSize: 40 }, font.Airbnb]}>
                List <Text style={{ color: '#57CAD5' }}>User</Text>.
              </Text>
              <View style={[{ borderWidth: 1, borderRadius: 10, borderColor: '#57CAD5', width: 40, marginTop: 10 }]}></View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <TextInput placeholder="Search User" placeholderColor="#c4c3cb" style={[styles.input, font.Airbnb]} />
            </View>


            <View style={[styles.table]}>
              <View style={[styles.tr, { width: '100%', marginBottom: 10 }]}>
                <Text style={[{ width: 20 }, font.Airbnb]}>
                  #
                </Text>
                <Text style={[{ width: 160 }, font.Airbnb]}>
                  Full Name
                </Text>
                <Text style={[{ width: 100 }, font.Airbnb]}>
                  Username
                </Text>
              </View>


              {!this.props.user.isPending ? (
                this.state.userData.map((user, i) => {
                  return (
                    <View style={[styles.tr, { width: '100%' }]} key={user.id_user}>
                      <Text style={[{ width: 20 }, font.Airbnb]}>
                        {i+1}
                      </Text>
                      <Text style={[{ width: 160 }, font.Airbnb]}>
                        {user.name_user}
                      </Text>
                      <Text style={[{ width: 100 }, font.Airbnb]}>
                        {user.username}
                      </Text>
                    </View>
                  );
                })
                ) : (
                  <Text style={{textAlign:'center', padding:20}}>Wait</Text>
                )
              }

              <View style={[styles.tr, { width: '100%' }]}>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
          <TouchableOpacity onPress={() => { this.setModalAdd(true); }}>
            <View style={[styles.btn, styles.Detail, { width: '100%', marginVertical: 10 }]}>
              <Text style={[{ color: '#fff', textAlign: 'center' }, font.Airbnb]}>
                Add User
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
            <View style={{ padding: 20 }}>
              <View>
                <View style={{ marginBottom: 50 }}>
                  <Text style={[{ fontSize: 40 }, font.Airbnb]}>
                    Add <Text style={{ color: '#57CAD5' }}>User</Text>.
                  </Text>
                  <View style={[{ borderWidth: 1, borderRadius: 10, borderColor: '#57CAD5', width: 40, marginTop: 10 }, font.Airbnb]}></View>
                </View>

                <View style={{ marginVertical: 10 }}>
                  <Text style={font.Airbnb}>
                    Full Name
                  </Text>
                  <TextInput placeholder="Input Full Name User" placeholderColor="#c4c3cb" style={[styles.input, font.Airbnb]} onChangeText={(e) => this.setState({ name_user: e })} value={this.state.name_user}  />
                </View>

                <View style={{ marginVertical: 10 }}>
                  <Text style={font.Airbnb}>
                    Username
                  </Text>
                  <TextInput placeholder="Input username" placeholderColor="#c4c3cb" style={[styles.input, font.Airbnb]} onChangeText={(e) => this.setState({ username: e })} value={this.state.username}  />
                </View>

                <View style={{ marginVertical: 10 }}>
                  <Text style={font.Airbnb}>
                    Password
                  </Text>
                  <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={[styles.input, font.Airbnb]} secureTextEntry={true} onChangeText={(e) => this.setState({ password: e })} value={this.state.password}  />
                </View>

              </View>
            </View>
          </ScrollView>

          <View style={{ width: '100%', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingVertical: 10 }}>
            <TouchableOpacity onPress={() => { this.postUser(); this.setModalAdd(!this.state.modalAdd); }}>
              <View style={[styles.btn, styles.Detail, { width: '100%', marginVertical: 10 }]}>
                <Text style={[{ color: '#fff', textAlign: 'center' }, font.Airbnb]}>
                  Save
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.setModalAdd(!this.state.modalAdd); }}>
              <View style={[styles.btn, styles.Delete, { width: '100%', marginVertical: 10 }]}>
                <Text style={[{ color: '#fff', textAlign: 'center' }, font.Airbnb]}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* } -- Modal Add */}

      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user // user: user
  };
};

// export default connect(mapStateToProps)(User);
export default connect(mapStateToProps)(User);