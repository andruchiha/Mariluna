import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet
,Button,TouchableOpacity,StatusBar,Image } from 'react-native';


export default class home extends Component{
static navigationOptions= ({navigation}) =>({
			title:'App Apolys inicio',
		  header: null,
	});

	render(){
		const { navigate } = this.props.navigation;
		return(

	  <View style={styles.container}>
	  <Text style={styles.pageName} >App de guardias Apolys</Text>




		<TouchableOpacity
		onPress={() => navigate('Login')}
		style={styles.btn1}>
		<Text style={styles.btnText}>Ingresar</Text>
		</TouchableOpacity>

		<TouchableOpacity
		onPress={()=> navigate('Register')}
		style={styles.btn2}>
		<Text style={styles.btnText}>ver incidentes</Text>
		</TouchableOpacity>


		<TouchableOpacity
		onPress={()=> navigate('Eventos')}
		style={styles.btn3}>
		<Text style={styles.btnText}>Enviar ubicacion</Text>
		</TouchableOpacity>


		<TouchableOpacity
		onPress={()=> navigate('Upload')}
		style={styles.btn2}>
		<Text style={styles.btnText}>Enviar incidente</Text>
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
