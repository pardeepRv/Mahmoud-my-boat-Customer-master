import React, { Component,useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,StatusBar, SafeAreaView,
    Image,
    ActivityIndicator
} from 'react-native';
import {
    
    Input,
    Card,
    AirbnbRating
} from 'react-native-elements';
import Header from '../../Components/Header';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { localStorage } from '../../Provider/localStorageProvider';
import { firebaseprovider } from '../../Provider/FirebaseProvider';


export default class Splash  extends  Component{


    constructor(props) {
        super(props);
         this.state = {

              }
        
        }    
 

 componentDidMount(){

    firebaseprovider.getAllUsers()
    const timer = setTimeout(() => {
        this.NavigateTo();
    }, 2000);
    return () => clearTimeout(timer);
 }


 NavigateTo= async () =>{

      //let userdata = await localStorage.getItemObject('user_arr');

      let userdata = await localStorage.getItemString('user_arr');

        console.log(userdata);

       if(userdata!=null){

        this.props.navigation.navigate('Home');
      
       }

       else{
          
        this.props.navigation.navigate('Login');

       }

 }



render() {
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={styles.container}>
                <StatusBar hidden={true} backgroundColor={Colors.white} translucent={false}
                    networkActivityIndicatorVisible={true} />
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icons/splash.png')}></Image>
            </View>
        </SafeAreaView>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
});