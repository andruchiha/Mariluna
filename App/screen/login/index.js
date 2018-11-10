import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet
,Button,TouchableOpacity,StatusBar,Image } from 'react-native';


export default class home extends Component{

	static navigationOptions= ({navigation}) =>({
				title:'App Apolys inicio',
			  header: null,
		});

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

	render(){
		const { navigate } = this.props.navigation;
		return(

	  <View style={styles.container}>
	  <Text style={styles.pageName} >Este es el menu donde estaran las opciones</Text>



		<Text>Latitude: {this.state.latitude}</Text>
		<Text>Longitude: {this.state.longitude}</Text>

		<TouchableOpacity
		onPress={() => navigate('Login')}
		style={styles.btn1}>
		<Text style={styles.btnText}>Ingresar(Sera pantalla principal, necesito que me pases el menu)</Text>
		</TouchableOpacity>

		<TouchableOpacity
		onPress={()=> navigate('Register')}
		style={styles.btn2}>
		<Text style={styles.btnText}>Ver incidente</Text>
		</TouchableOpacity>


		<TouchableOpacity
		onPress={()=> navigate('Eventos')}
		style={styles.btn3}>
		<Text style={styles.btnText}>Enviar Ubicacion</Text>
		</TouchableOpacity>


		<TouchableOpacity
		onPress={()=> navigate('Upload')}
		style={styles.btn2}>
		<Text style={styles.btnText}>Subir incidente</Text>
		</TouchableOpacity>


      </View>
		);
	}
}
const styles = StyleSheet.create({
	container:{
		display:'flex',alignItems:'center',
		justifyContent:'center'
	},
	btn1:{
		backgroundColor:'#f04d4d',
		padding:10,margin:10,width:'95%'
	},
	btn2:{
		backgroundColor:'#0691ce',
		padding:10,margin:10,width:'95%'
	},
	btn3:{
		backgroundColor:'#8956FF',
		padding:10,margin:10,width:'95%'
	},
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},
	btnText:{
		color:'#fff',fontWeight:'bold'
	},

	display2:{
		display:'none',
	},

});


AppRegistry.registerComponent('home', () => home);
