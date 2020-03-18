import React from 'react'
import MainNavigators from './src/public/navigators/MainNavigators'
import Index from './src/screens/Index'
import Login from './src/screens/Login/Login'
import {Provider} from 'react-redux';
import store from './src/redux/Store'
const App = () => {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  )
}

export default App