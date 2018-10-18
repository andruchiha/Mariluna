import React, { Component } from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image} from 'react-native';

import ImagePicker from 'react-native-image-picker';

const options={
    title:'select a photo',
    takePhotoButtonTitle:'Take a Photo',
    chooseFrmoLibraryButtonTitle:'Choose from Gallery',
    quality:1
};




class InputUsers extends Component{

//constructor have a state that conatains the properties that will recieve the values from Text Inputes
    constructor(props){
       super(props)
        this.state = {
            TextInputName:'',
            TextInputEmail:'',
            TextInputPhoneNumber:'',
            iamgeSource: null,
        }
    }

    selectPhoto(){
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
                iamgeSource: source
              });
            }
          });
    }

//arrow function that will fire when press on save button to save data in database via API
InsertUser = ()=>{
//constant varaibles that equal propertes in state
const {TextInputName} = this.state;
const {TextInputEmail} = this.state;
const {TextInputPhoneNumber} = this.state;
const {iamgeSource} = this.state;

const formData = new FormData();
//Add your input data
formData.append('name', TextInputName);
formData.append('email', TextInputEmail);
formData.append('phone_number', TextInputPhoneNumber);

//Add your photo
//this, retrive the file extension of your photo
const uriPart = iamgeSource.uri.split('.');
const fileExtension = uriPart[uriPart.length - 1];

formData.append('photo', {
    uri: iamgeSource.uri,
    name: 'photo',
    type: 'image/jpeg'
});

//API that use fetch to input data to database via backend php script
fetch('http://192.168.0.16/conex/insert.php',{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
  })
  .then((response) => response.json())
  .then((responseJson) => {
   // return responseJson
     alert(responseJson);
     this.props.navigation.navigate('seconde');
    })
    .catch((error) => {
        console.error(error);
      });

//alert('Pressed!!');
}


        ViewUsersList = ()=>{
            this.props.navigation.navigate('seconde');
        }


    render(){
        return(
            <View style ={styles.container}>
                <TextInput
                // value = {this.TextInputName}
                 placeholder = 'Enter Name'
                 onChangeText = {TextInputValue=>this.setState({TextInputName:TextInputValue}) }
                 underlineColorAndroid = 'transparent'
                 style = {styles.TextInputStyle}
                />
                <TextInput
                 //value = {this.TextInputEmail}
                 placeholder = 'Enter E-mail'
                 onChangeText = {TextInputValue=>this.setState({TextInputEmail:TextInputValue}) }
                 underlineColorAndroid = 'transparent'
                 style = {styles.TextInputStyle2}
                />

                <TextInput
                 //value = {this.TextInputPhoneNumber}
                 placeholder = 'Enter Phone Number'
                 onChangeText = {TextInputValue=>this.setState({TextInputPhoneNumber:TextInputValue}) }
                 underlineColorAndroid = 'transparent'
                 style = {styles.TextInputStyle2}
                />

                <Image style={styles.image}
                    source={this.state.iamgeSource != null ? this.state.iamgeSource : require('./image/blogSix.png')}
                />

                <TouchableOpacity style = {styles.TouchableOpacityStyle} onPress={this.selectPhoto.bind(this)}>
                    <Text style = {styles.TextStyle}>Select Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity = {.4} style = {styles.TouchableOpacityStyle} onPress={this.InsertUser}>
                    <Text style = {styles.TextStyle}>Save</Text>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity = {.4} style = {styles.TouchableOpacityStyle} onPress={this.ViewUsersList}>
                    <Text style = {styles.TextStyle}>View Users</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container : {
        alignItems:'center',
        flex:1,
        marginTop:5,
        backgroundColor:'#fff'
    },

    TextInputStyle :{
        textAlign:'center',
        marginBottom:7,
        width:'90%',
        height:40,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#FF5722'
    },

    TextInputStyle2 :{
        textAlign:'center',
        marginBottom:7,
        marginTop:20,
        width:'90%',
        height:40,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#FF5722'
    },

    TextStyle : {
        color:'#fff',
        textAlign:'center'
    },

    TouchableOpacityStyle:{
        paddingTop:10,
        paddingBottom:10,
        marginTop:20,
        borderRadius:5,
        marginBottom:7,
        width:'90%',
        backgroundColor:'#00BCD4'
    },

    button:{
        width:250,
        height:50,
        backgroundColor:"#330066"
    },

    text:{
        color:'white',
        fontSize:30,
        textAlign:'center'
    },

    image:{
        width:200,
        height:200,
        marginTop:30
    }

});

export default InputUsers;
