import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";

export default class App extends Component {
  state = {
    location: null,
    created_at: new Date(),
  };

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };



  userRegister = () =>{
		//alert('ok'); // version 0.48

		const {location} = this.state;
		const {created_at} = this.state;
	//	const {userPassword} = this.state;
  //  const {gender} = this.state;
  //  const {created_at} = this.state;


		fetch('http://192.168.0.16/conex/registerloca.php', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				location: location,
			//	email: userEmail,
			//	password: userPassword,
      //  gender:gender,
        created_at:created_at,
			})

		})
		.then((response) => response.json())
			.then((responseJson) =>{
				alert("Ubicacion Registrado con exito");
        this.props.navigation.navigate('home');
			})
			.catch((error)=>{
				console.error(error);
			});

	}



  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Mi ubicacion?</Text>
          <Text onChangeText= {location => this.setState({location})}>Estoy en: {this.state.location}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.userRegister}>
          <Text style={styles.welcome}>Evniar ubicacion</Text>
          <Text onChangeText= {location => this.setState({location})}>{this.state.location}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
