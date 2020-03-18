//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { View, Image, TouchableOpacity } from 'react-native';
// import all basic components
 
//For React Navigation 3+
//import {
//  createStackNavigator,
//  createDrawerNavigator,
//  createAppContainer,
//} from 'react-navigation';
 
//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import ScreenHistory from './History/History';
import ScreenProduct from './Product/Product';
import ScreenCategory from './Category/Category';
import ScreenUser from './User/User';
import ScreenCart from './Cart/Cart';
import ScreenLogin from './Login/Login';
 
class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
    console.disableYellowBox = true;
  };
  render() {
    return (
      <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
        <View style={{ flexDirection: 'row' }}>
            {/*Donute Button Image */}
            <Image
              source={require('../../assets/img/drawer_black.png')}
              style={{ width: 25, height: 25, marginLeft: 15 }}
            />
        </View>
      </TouchableOpacity>
    );
  }
}
 
// const FirstActivity_StackNavigator = createStackNavigator({
//   //All the screen from the Screen1 will be indexed here
//   First: {
//     screen: ScreenLogin,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Login',
//       // headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#F24F8A',
//       },
//       headerTintColor: '#F24F8A',
//     }),
//   },
// });
 
const ScreenHistory_StackNavigator = createStackNavigator({
  Second: {
    screen: ScreenHistory,
    navigationOptions: ({ navigation }) => ({
      title: 'Tosm Cafe',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
    }),
  },
});
const ScreenProduct_StackNavigator = createStackNavigator({
  Second: {
    screen: ScreenProduct,
    navigationOptions: ({ navigation }) => ({
      title: 'Tosm Cafe',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
    }),
  },
});
const ScreenCategory_StackNavigator = createStackNavigator({
  Second: {
    screen: ScreenCategory,
    navigationOptions: ({ navigation }) => ({
      title: 'Category',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
    }),
  },
});
const ScreenUser_StackNavigator = createStackNavigator({
  Second: {
    screen: ScreenUser,
    navigationOptions: ({ navigation }) => ({
      title: 'Tosm Cafe',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
    }),
  },
});
const ScreenCart_StackNavigator = createStackNavigator({
  Second: {
    screen: ScreenCart,
    navigationOptions: ({ navigation }) => ({
      title: 'Tosm Cafe',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
    }),
  },
});
 
const DrawerNavigatorExample = createDrawerNavigator({
  //Drawer Optons and indexing
  ScreenHistory: {
    //Title
    screen: ScreenHistory_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Dashboard',
    },
  },
  ScreenProduct: {
    //Title
    screen: ScreenProduct_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Product',
    },
  },
  ScreenCategory: {
    //Title
    screen: ScreenCategory_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Category',
    },
  },
  ScreenUser: {
    //Title
    screen: ScreenUser_StackNavigator,
    navigationOptions: {
      drawerLabel: 'User',
    },
  },
  ScreenCart: {
    //Title
    screen: ScreenCart_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Cart',
    },
  },
  // ScreenLogin: {
  //   //Title
  //   screen: FirstActivity_StackNavigator,
  //   navigationOptions: {
  //     drawerLabel: 'Login Screen',
  //   },
  // },
});
 
export default createAppContainer(DrawerNavigatorExample);