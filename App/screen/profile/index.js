import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,
	Image,
	StatusBar,
	Platform,
	ImageBackground,
	TouchableOpacity,
	ListView,
	BackHandler,
	I18nManager } from 'react-native';
	import {
	  Container,
	  Button,
	  Right,
	  Left,
	  Content,
	  Body,
	  Header,
	  Icon,
	  Title
	} from "native-base";

	import ReadMore from "react-native-read-more-text";
	import FontAwesome from "react-native-vector-icons/FontAwesome";
	import Ionicons from "react-native-vector-icons/Ionicons";
	import styles from "./styles";


	const profileImg =
	  "https://putitashd.000webhostapp.com/conex/0.jpg";


export default class profile extends Component{

static navigationOptions= ({navigation}) =>({
		  title: 'Bienvenido',
			header: null,
	});



	constructor(props){
		super(props)
		this.state={
			userName:'name',
			userEmail:'email',
			userPassword: ''
		}
	}

	userDetail (){

		fetch('http://192.168.0.16/conex/detail.php', {
			method: 'get',
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

	}



	render() {
		StatusBar.setBarStyle("light-content", true);
		if (Platform.OS === "android") {
			StatusBar.setBackgroundColor("#2d324f", true);
			StatusBar.setTranslucent(true);
		}

		return (
			<Container style={styles.main}>
				<Header androidStatusBarColor={"#2d324f"} style={styles.header}>
					<Left style={styles.left}>
						<TouchableOpacity
							style={styles.backArrow}
							onPress={() => this.props.navigation.navigate("Profile")}
						>
							<FontAwesome
								name={I18nManager.isRTL ? "angle-right" : "angle-left"}
								size={30}
								color="white"
							/>
						</TouchableOpacity>
					</Left>

					<Body style={styles.body}>
						<Title style={styles.title}>Mi perfil</Title>
					</Body>

					<Right style={styles.left}>
						<TouchableOpacity onPress={() => alert("mas opciones aqui puedo colocar")}>
							<Ionicons name="md-settings" size={22} color="white" />
						</TouchableOpacity>
					</Right>
				</Header>
				<Content>
					<Image source={{ uri: profileImg }} style={styles.profileImg} />
					<Text style={styles.nameTxt}>Andres Perez</Text>
					<Text style={styles.designationTxt}>Desarrollador full stack</Text>
					<Text style={styles.descTxt}>
						Ing de Sistemas, Desarrollador Front End & Backend (Full stack), android
						e Ios loading.
					</Text>

					<TouchableOpacity
						style={styles.connectWithFacebookBg}
						onPress={() => alert("CERRAR SESION")}
					>
						<Text style={styles.connectWithTwitterFbTxt}>
							CERRAR SESION
						</Text>
					</TouchableOpacity>

					<View style={styles.dividerHorizontal} />
					<View style={styles.accountInfoBg}>
						<Text style={styles.accountInfoTxt}>INFORMACION DE LA CUENTA</Text>
					</View>
					<View style={styles.dividerHorizontal} />
					<View style={{ flexDirection: "column" }}>
						<View style={styles.infoFieldBg}>
							<Text style={styles.infoFieldTitleTxt}>Name</Text>
							<Text style={styles.infoFieldDetailTxt}> {this.userDetail.name} Andres Perez {this.props.email} </Text>
						</View>
						<View style={styles.fieldDivider} />
					</View>
					<View style={{ flexDirection: "column" }}>
						<View style={styles.infoFieldBg}>
							<Text style={styles.infoFieldTitleTxt}>Email</Text>
							<Text style={styles.infoFieldDetailTxt}>
								andru@gmail.com
							</Text>
						</View>
						<View style={styles.fieldDivider} />
					</View>
					<View style={{ flexDirection: "column" }}>
						<View style={styles.infoFieldBg}>
							<Text style={styles.infoFieldTitleTxt}>Phone</Text>
							<Text style={styles.infoFieldDetailTxt}>+593 99 855 72 53</Text>
						</View>
						<View style={styles.fieldDivider} />
					</View>
					<View style={styles.infoFieldBg}>
						<Text style={styles.infoFieldTitleTxt}>Address</Text>
						<Text style={styles.infoFieldDetailTxt}>
							1201 Quito, Real audiencia 205 Bellavista, WA 98121 ECU
						</Text>
					</View>
				</Content>
			</Container>
		);
	}
	_renderTruncatedFooter = handlePress => {
    return (
      <Text style={styles.viewMoreLessTxt} onPress={handlePress}>
        View more
      </Text>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <Text style={styles.viewMoreLessTxt} onPress={handlePress}>
        View less
      </Text>
    );
  };



}



AppRegistry.registerComponent('profile', () => profile);
