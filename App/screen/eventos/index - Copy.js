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
import ImagePicker from 'react-native-image-picker';
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Screen Styles
import styles from "./styles";
import { Fonts, Metrics, Colors } from "../../Themes/";


const options = {
  title: 'Select Avatar',
  takePhotoButtonTitle:'Take a photo',
  chooseFromLibraryButtonTitle:'Choose from gallery',
  quality: 1
};



export default class register extends Component {

  constructor(){
		super()
		this.state={
      imageSource: null,
      data:null

		}
	}


  selectPhoto (){
    ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else {
    let source = { uri: response.uri };
    this.setState({
      imageSource: source,
      data: response.data
    });
  }
});

  }

  static navigationOptions= ({navigation}) =>({
  			title:'App Apolys registro',
  		  header: null,
  	});


	/*userRegister = () =>{
		//alert('ok'); // version 0.48

		const {userName} = this.state;
		const {userEmail} = this.state;
		const {userPassword} = this.state;


		fetch('https://putitashd.000webhostapp.com/conex/register.php', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				name: userName,
				email: userEmail,
				password: userPassword,
			})

		})
		.then((response) => response.json())
			.then((responseJson) =>{
				alert("Usuario registrado con exito");
        this.props.navigation.navigate('home');
			})
			.catch((error)=>{
				console.error(error);
			});

	}
*/





/*
  uploadPhoto(){


    RNFetchBlob.fetch('POST', 'https://putitashd.000webhostapp.com/conex/upload.php', {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
  }, [

    { name : 'image', filename : 'image.png', type:'image/png', data: this.state.data},

  ]).then((resp) => {
    // ...
  }).catch((err) => {
    // ...
  })


  }
*/



uploadPhoto() {
    const { navigation, user } = this.props;

    const obj = {
      uploadUrl: 'http://192.168.0.16/conex/upload.php',
      method: 'POST', // default 'POST',support 'POST' and 'PUT'
      headers: {
        Accept: 'application/json',
        Authorization: 'jwt ${user.token}',
      },
      files: [
        {
          name: 'image',
          filename: 'image.png',
          filetype: 'image/jpeg',
          data: this.state.data,
        },
      ],
      fields: {
      },
    };


    console.log(obj);
  }







 render() {
   StatusBar.setBarStyle("light-content", true);

   if (Platform.OS === "android") {
     StatusBar.setBackgroundColor("transparent", true);
     StatusBar.setTranslucent(true);
   }

   const imageUri =
     "https://antiqueruby.aliansoftware.net//Images/signup/title_pic_s03.png";
   return (
     <Container style={styles.container}>

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


       <ScrollView>


       <Image style={styles.image}
         source={this.state.imageSource != null ? this.state.imageSource :
         require('./image/blogSix.png')}
       />


          <TouchableOpacity style={styles.buttonSignUp} onPress={this.selectPhoto.bind(this)}>
            <Text style={styles.textWhite}>Select</Text>
          </TouchableOpacity>

         <TouchableOpacity
           style={styles.buttonSignUp}
           onPress={this.userRegister}
         >
           <Text style={styles.textWhite} onPress={this.uploadPhoto.bind(this)}>Subir</Text>
         </TouchableOpacity>

         <View style={styles.tandcView}>




         </View>
       </ScrollView>
     </Container>
   );
 }


}


AppRegistry.registerComponent('eventos', () => eventos);
