import React, {  PropTypes, Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,TextInput,TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  ImageBackground,
  ScrollView,
  BackHandler,
  I18nManager
} from 'react-native';
import {
  Container,
  Content,
  Right,
  Form,
  Item,
  Icon,
  Label,
  Input,
  Header,
  Left,
  Body,
  Title
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from 'react-native-material-dropdown';

// Screen Styles
import styles from "./styles";
import { Fonts, Metrics, Colors } from "../../Themes/";


export default class register extends Component {



  static navigationOptions= ({navigation}) =>({
  			title:'App Apolys registro',
  		  header: null,
  	});

	constructor(props){
		super(props)
		this.state={
			userName:'',
		//	userEmail:'',
		//	userPassword:'',
      gender: '',
      created_at: new Date(),
      data: [
				{
					value: 'Computadoras encendidas',
				},
				{
					value: 'Puerta Abierta',
				},
        {
					value: 'llaves perdidas',
				},
				{
					value: 'Retraso de personal',
				},
        {
					value: 'alarmas desactivadas',
				},
				{
					value: 'personal no reconocido',
				},
        {
					value: 'Agresion',
				},
				{
					value: 'Aulas desordenadas',
				},
        {
					value: 'No hay empleados',
				},
				{
					value: 'No llego compa;ero',
				},
        {
					value: 'Fugas de gas',
				},
				{
					value: 'Puerta esta cerrada',
				},
			],
		}
	}


	userRegister = () =>{
		//alert('ok'); // version 0.48

		const {userName} = this.state;
	//	const {userEmail} = this.state;
	//	const {userPassword} = this.state;
    const {gender} = this.state;
    const {created_at} = this.state;


		fetch('http://192.168.1.109/conex/register.php', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				name: userName,
			//	email: userEmail,
			//	password: userPassword,
        gender:gender,
        created_at:created_at,
			})

		})
		.then((response) => response.json())
			.then((responseJson) =>{
				alert("incidente Registrado con exito");
        this.props.navigation.navigate('home');
			})
			.catch((error)=>{
				console.error(error);
			});

	}



 render() {
   StatusBar.setBarStyle("light-content", true);

   if (Platform.OS === "android") {
     StatusBar.setBackgroundColor("transparent", true);
     StatusBar.setTranslucent(true);
   }

   const imageUri =
     "https://antiqueruby.aliansoftware.net/Images/signin/image_bg_signin_eight.jpg";
   return (
     <Container style={styles.container}>
       <ImageBackground style={styles.imgContainer} source={{ uri: imageUri }}>
         <Header style={styles.header}>
           <Left style={styles.left}>
             <TouchableOpacity
               style={styles.backArrow}
               onPress={() => this.props.navigation.navigate('Home')}
             >
               <FontAwesome
                 name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                 size={30}
                 color="white"
               />
             </TouchableOpacity>
           </Left>
           <Body style={styles.body}>
             <Text style={styles.textTitle}></Text>
           </Body>
           <Right style={styles.right} />
         </Header>
       </ImageBackground>



       <ScrollView>
         <TextInput
           style={styles.textInput}
           placeholder="Descripcion del incidente"
           placeholderTextColor={Colors.shadows}
           underlineColorAndroid="transparent"
           autoCapitalize="none"
           keyboardType="default"
           textAlign={I18nManager.isRTL ? "right" : "left"}
           tiniColor={Colors.loginBlue}
           onChangeText= {userName => this.setState({userName})}

         />


         <View style={styles.textInput2}>
           <Dropdown
             label="Seleccion incidente"
             data={this.state.data}
             textColor={'#959595'}
             onChangeText= {gender => this.setState({gender})}
           />
         </View>


         <TouchableOpacity
           style={styles.buttonSignUp}
           onPress={this.userRegister}
         >
           <Text style={styles.textWhite}>Enviar incidente</Text>
         </TouchableOpacity>




       </ScrollView>
     </Container>
   );
 }


}


AppRegistry.registerComponent('register', () => register);
