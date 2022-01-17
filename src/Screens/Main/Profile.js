import React, {Component, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    I18nManager
} from 'react-native';
import {
    
    Input,
    Card,
    Rating,
    AirbnbRating
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { s } from '../../Components/Header';
import { back_img4, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import { localStorage } from '../../Provider/localStorageProvider';
import { renderNode } from 'react-native-elements/dist/helpers';
import AsyncStorage  from "@react-native-community/async-storage";

const CustomHeader=({name})=>{
    const nav=useNavigation();
    
    return(
        <ImageBackground
        style={[s.ImageBackground,{height:300}]}
        source={back_img4}
        imageStyle={[s.ImageBackground_Img,{opacity:0.8}]}
        >
            <View style={{width:"90%",marginTop:30,alignSelf:"center",backgroundColor:"transparent",alignItems:"center"}}>
                <Text style={{fontFamily:FontFamily.semi_bold,color:Colors.white,textAlign:"center"}}>
                    {name}
                </Text>
            </View> 
        </ImageBackground>
    )
}


export default class Login extends Component {
 
    constructor(props) {
        super(props);
         
     //   this.api = new service();
        
        this.state = {
         localData:[]
        };
      }


     

    componentDidMount(){

   

   //console.log('user ',v);

   this.getData('user_arr');

    }

 


    getData = async (key) => {
       
        console.log('local '+key)
        try {
          const value = await AsyncStorage.getItem(key);

//          console.log('local '+value)
          
           //  console.log('array ',arrayData.email);
          if(value !== null) {
           
            const arrayData = JSON.parse(value);
            this.setState({localData:arrayData})
          
          }
        } catch(e) {
          // error reading value
        }
      }

      Logout= async() => {
        AsyncStorage.clear();
          
        this.props.navigation.navigate('Login')
    }


  //this.getData();
 

  render(){

    const  localData= this.state.localData;
  
   // let v= localData.localData;
  //  console.log('v ',email)
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <CustomHeader name="Profile" />
            <View style={sb.SEC2}>
                <Image
                 source={{uri:"https://bestprofilepictures.com/wp-content/uploads/2020/06/Anonymous-Profile-Picture-1024x1024.jpg"}}
                 style={{
                     height:150,
                     width:150,
                     borderRadius:20,
                     alignSelf:"center",
                     marginTop:-100
                 }} />
                 <View style={{alignSelf:"center",alignItems:"center"}}>
                    <Text style={{fontSize:20,fontFamily:FontFamily.semi_bold}}>
                        {localData.name}
                    </Text>
                    <Text style={[sb.Text,{fontSize:13,fontStyle:"italic",color:"#333",opacity:0.4}]}>
                    {localData.email}
                    </Text>
                    <Text style={[sb.Text,{fontSize:14}]}>
                    {localData.user_id}
                    </Text>
                 </View>
                 <ScrollView showsVerticalScrollIndicator={false}>                     
                     <View>
                         {/* 1 option */}
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Edit_Profile')}>
                            <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Image  source={require('../../../assets/icons/edit.png')}  style={{width:20,height:20}}/>
                                    <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:15}}>
                                        Edit Profile
                                    </Text>
                                </View>
                                <Icon name="arrow-right" type="evilicon"  />
                                </View>
                            </Card>
                        </TouchableOpacity>
                        {/* 2 */}
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Settings')}>
                            <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Image  source={require('../../../assets/icons/setting.png')}  style={{width:20,height:20}}/>
       
                                    <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:15}}>
                                        Settings
                                    </Text>
                                </View>
                                <Icon name="arrow-right" type="evilicon"  />
                                </View>
                            </Card>
                        </TouchableOpacity>
                        {/* 3 */}
                        {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyWallet')}>
                            <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                <View style={{flexDirection:"row",alignItems:"center"}}>
                                    <Icon name="settings" type="octicon"  />
                                    <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                        My Wallet
                                    </Text>
                                </View>
                                <Icon name="arrow-right" type="evilicon"  />
                                </View>
                            </Card>
                        </TouchableOpacity> */}
                        {/* 4 */}
                        <TouchableOpacity onPress={()=>{this.Logout()}}>
                            <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                <View style={{flexDirection:"row",alignItems:"center"}}>
                                    <Image  source={require('../../../assets/icons/logout.png')}  style={{width:20,height:20}}/>
                                    <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:15}}>
                                        Log Out
                                    </Text>
                                </View>
                                <Icon name="arrow-right" type="evilicon"  />
                                </View>
                            </Card>
                        </TouchableOpacity>
                        {/*  */}
                     </View>
                 </ScrollView>
            </View>
        </View>
    )
}
}

const sb=StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        marginTop:-50,
        borderTopLeftRadius:30,
        borderTopEndRadius:30,
        flex:1
      },
      Text:{
          fontFamily:FontFamily.default
      }
})
//export default Profile;