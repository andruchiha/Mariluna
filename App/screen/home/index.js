import React, { Component } from 'react';
import { Text, View, Image,  Keyboard, StyleSheet, AppRegistry, TextInput, TouchableOpacity, ImageBackground, Platform, StatusBar, BackHandler, I18nManager } from 'react-native';
import { Container, Button, Icon, Right, Item, Input, Header, Left, Body, Title } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box';

// Screen Styles
import styles from './styles';
import { Images } from '../../Themes/';

//import { StackNavigator } from 'react-navigation';


export default class login extends Component {



  static navigationOptions= ({navigation}) =>({
  			title:'App Apolys ingresar',
  		  header: null,
  	});

    constructor(props) {
        super(props)
        this.state = {
            userEmail: '',
            userPassword: ''
        }
    }

    login = () => {
        const { userEmail, userPassword } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (userEmail == "") {
            //alert("Please enter Email address");
            this.setState({ email: 'Ingrese un correo' })

        } else if (reg.test(userEmail) === false) {
            //alert("Email is Not Correct");
            this.setState({ email: 'El Correo no es correcto' })
            return false;
        } else if (userPassword == "") {
            this.setState({ email: 'Ingrese la contraseña' })
        } else {
            fetch('https://putitashd.000webhostapp.com/conex/login.php', {
                    method: 'post',
                    header: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        // we will pass our input data to server
                        email: userEmail,
                        password: userPassword,
                    })

                })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson == "ok") {
                        // redirect to profile page
                        alert("Bienvenido al sistema");
                        this.props.navigation.navigate("Login");
                    } else {
                        alert("Error al ingresar al sistema");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }


        Keyboard.dismiss();
    }

    /*render() {
    return (
	<View style={styles.container}>
	<Text style={{padding:10,margin:10,color:'red'}}>{this.state.email}</Text>

	<TextInput
	placeholder="Enter Email"
	style={{width:200, margin:10}}
	onChangeText={userEmail => this.setState({userEmail})}
	/>

	<TextInput
	placeholder="Enter Password"
	style={{width:200, margin:10}}
	onChangeText={userPassword => this.setState({userPassword})}

	/>


	<TouchableOpacity
	onPress={this.login}
	style={{width:200,padding:10,backgroundColor:'magenta',alignItems:'center'}}>
	<Text style={{color:'white'}}>Login</Text>
	</TouchableOpacity>


     </View>

   );
  }*/
    render() {
        StatusBar.setBarStyle('light-content', true);
    if(Platform.OS === 'android') {
            StatusBar.setBackgroundColor('transparent',true);
            StatusBar.setTranslucent(true);
    }
        var temp = [
        {
        "path": "Android",
        "name": "Android",
        "checked": true
      },
    ]
    var leftText = temp.name;

    const imageUri = "https://antiqueruby.aliansoftware.net/Images/signin/image_bg_signin_eight.jpg";
    let logo13 = { uri: 'https://putitashd.000webhostapp.com/conex/apolys-01-01.png' };
        return (
            <Container>
                <ImageBackground style={styles.imgContainer} source={{uri:imageUri}}>
                    <Header style={styles.header}>
                        <Left style={styles.left}>
                            <TouchableOpacity style={styles.backArrow} onPress={()=>this.props.navigation.navigate('Home')}>
                                <FontAwesome name={I18nManager.isRTL ? "angle-right" : "angle-left"} size={30} color="#fff"/>
                            </TouchableOpacity>
                        </Left>
                        <Body style={styles.body}>
                            <Text style={styles.textTitle}></Text>
                        </Body>
                        <Right style={styles.right}/>
                    </Header>
                    <View>
            <Image source={logo13} style={styles.logostyle}/>
                        <View style={styles.inputFieldSec}>
              <Item underline style={styles.itememail}>
                <Input placeholderTextColor='#929597' textAlign={I18nManager.isRTL ? 'right' : 'left'} placeholder='Correo' keyboardType="email-address" style={styles.inputemail} onChangeText={userEmail => this.setState({userEmail})} />
              </Item>
              <Item underline style={styles.itempassword}>
                <Input placeholderTextColor='#929597' textAlign={I18nManager.isRTL ? 'right' : 'left'} placeholder='Contraseña' secureTextEntry={true} style={styles.inputpassword} onChangeText={userPassword => this.setState({userPassword})} />
              </Item>
                        </View>

                        <View style={styles.signInSec}>
              <TouchableOpacity info style={styles.buttondialogsignup} onPress={this.login}>
                <Text autoCapitalize="words" style={styles.buttonsignin}>Ingresar</Text>
              </TouchableOpacity>
                        </View>
                        <Text style={{padding:10,margin:10,color:'red'}}>{this.state.email}</Text>
                        <View>
                            <TouchableOpacity onPress={()=>alert("Olvido contrase;a")}>
                                <Text style={styles.forgotpass}>Olvido contraseña?</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>
            </Container>
        );
    }
}



AppRegistry.registerComponent('login', () => login);
