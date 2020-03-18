// Library
import React, {Component} from 'react';
import {
  ScrollView,
  Keyboard,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// Styles
import styles from './HistoryStyle';
import font from '../Font';

const URL_STRING = 'http://192.168.1.237:3001/api/v1';

export default class History extends Component {
  state = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTgyNjg3NjA0fQ.lqvHkkKjXB65ZSPLFQBQrrMs29QBRO7po5_1Vc93qAo',
    cart: [],
  };
  getToken = async () => {
    try {
      const tokens = await AsyncStorage.getItem('Token');
      const newToken = tokens.replace('"', '');
      if (newToken !== null) {
        // We have data!!
        this.setState({
          token: newToken,
        });
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  getCart = () => {
    axios
      .get(`${URL_STRING}/cart`, {
        headers: {
          token: this.state.token,
        },
      })
      .then(response => {
        this.setState({
          cart: response.data.result,
        });
      });
  };
  getHistory = () => {
    axios
      .get(`${URL_STRING}/history`, {
        headers: {
          token: this.state.token,
        },
      })
      .then(response => {
        let today, week, year, todays, weeks, years;
        if (response.data.TodaysIncome === null) {
          today = 0;
        } else {
          today = response.data.TodaysIncome;
        }
        if (response.data.OrdersWeek === null) {
          week = 0;
        } else {
          week = response.data.OrdersWeek;
        }
        if (response.data.YearsIncome === null) {
          year = 0;
        } else {
          year = response.data.YearsIncome;
        }
        if (response.data.yesterdayIncomes === null) {
          todays = 0;
        } else {
          todays = response.data.yesterdayIncomes;
        }
        if (response.data.OrdersWeeks === null) {
          weeks = 0;
        } else {
          weeks = response.data.OrdersWeeks;
        }
        if (response.data.YearsIncomes === null) {
          years = 0;
        } else {
          years = response.data.YearsIncomes;
        }
        this.setState({
          today,
          week,
          year,
          todays,
          weeks,
          years,
        });
      });
  };
  componentDidMount() {
    // this.getToken();
    // setTimeout(() => {
    this.getHistory();
    this.getCart();
    // }, 500);
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <View>
          <View style={{padding: 20}}>
            <Text style={[{fontSize: 40}, font.Airbnb]}>
              <Text style={{color: '#F24F8A'}}>Dashboard</Text>.
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
          </View>
          <ScrollView style={[styles.wrapperBox, {height: 540}]}>
            <View style={[styles.box, styless.bgAqua]}>
              <View style={{width: '100%', paddingHorizontal: 20}}>
                <Text style={[styless.textBoxTitle, font.Airbnb]}>
                  Todays Incomes
                </Text>
                <Text style={[styless.textBoxCount, font.Airbnb]}>
                  Rp 562500
                </Text>
              </View>
            </View>
            <View style={[styles.box, styless.bgPurple]}>
              <View style={{width: '100%', paddingHorizontal: 20}}>
                <Text style={[styless.textBoxTitle, font.Airbnb]}>
                  Weeks Orders
                </Text>
                <Text style={[styless.textBoxCount, font.Airbnb]}>789</Text>
              </View>
            </View>
            <View style={[styles.box, styless.bgPink]}>
              <View style={{width: '100%', paddingHorizontal: 20}}>
                <Text style={[styless.textBoxTitle, font.Airbnb]}>
                  Years Incomes
                </Text>
                <Text style={[styless.textBoxCount, font.Airbnb]}>
                  Rp {this.state.year}
                </Text>
              </View>
            </View>
            {/* Recent Orders */}
            <View>
              <Text style={[font.Airbnb, {marginTop: 20}]}>Recent Orders</Text>
              {/* Table */}
              <View style={[styles.table]}>
                <View style={[styles.tr, {width: '100%', marginBottom: 10}]}>
                  <Text style={{width: 20}}>#</Text>
                  <Text style={{width: 110}}>Invoice</Text>
                  <Text style={{width: 90}}>Total Order</Text>
                  <Text style={{width: 80}}>Date</Text>
                </View>

                {this.state.cart.map((cart, i) => {
                  if (i < 10) {
                    var date = new Date(cart.created_at);
                    return (
                      <View
                        style={[styles.tr, {width: '100%'}]}
                        key={cart.id_cart}>
                        <Text style={{width: 20}}>{i + 1}</Text>
                        <Text style={{width: 110}}>{cart.name_customer}</Text>
                        <Text style={{width: 90}}>
                          Rp {cart.total_price_cart}
                        </Text>
                        <Text style={{width: 80}}>
                          {date.getUTCFullYear()} - 0{date.getUTCMonth() + 1} -{' '}
                          {date.getUTCDate() + 1}
                        </Text>
                      </View>
                    );
                  }
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styless = StyleSheet.create({
  textBoxTitle: {
    color: '#fff',
    paddingTop: 20,
    textAlign: 'left',
  },
  textBoxCount: {
    color: '#fff',
    paddingTop: 15,
    textAlign: 'center',
    fontSize: 50,
  },
  bgPink: {
    backgroundColor: '#F24F8A',
  },
  bgAqua: {
    backgroundColor: '#57CAD5',
  },
  bgPurple: {
    backgroundColor: '#AB84C8',
  },
});
