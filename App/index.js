import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './screen/home';
import Login from './screen/login';
import Register from './screen/register';
import Profile from './screen/profile';
import Eventos from './screen/eventos';
import Upload from './screen/upload';

const UsersManager = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: Login },
  Register: {screen: Register},
  Profile: {screen: Profile},
  Eventos: {screen: Eventos},
  Upload: {screen: Upload}

 });
export default UsersManager;
