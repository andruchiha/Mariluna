import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class GeolocationExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      created_at: new Date(),
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }


  userRegister = () =>{
		//alert('ok'); // version 0.48

		const {latitude} = this.state;
		const {longitude} = this.state;
	//	const {userPassword} = this.state;
  //  const {gender} = this.state;
    const {created_at} = this.state;


		fetch('http://192.168.0.16/conex/registerloca.php', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				latitude: latitude,
        longitude: longitude,
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
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

        <TouchableOpacity onPress={this.userRegister}>
          <Text >Enviar ubicacion</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default GeolocationExample;
