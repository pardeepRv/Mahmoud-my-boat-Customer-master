
import React, { Component,useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    SafeAreaView,
    Image,
    ActivityIndicator
} from 'react-native';
import {
    Icon,
    Input,
    Card,
    AirbnbRating
} from 'react-native-elements';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Header from '../../Components/Header';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import Ad from '../../Data/Ad';
import { renderNode } from 'react-native-elements/dist/helpers';
import { apifuntion } from '../../Provider/apiProvider';
import { Lang_chg } from '../../Provider/Language_provider'
import { config } from '../../Provider/configProvider';
import { TextInput } from 'react-native';
//import Header from '../../Components/Header';
global.city_lat = 29.3117;
global.city_long = 47.4818;


export default class GoogleMap extends Component {


    constructor(props) {
        super(props)
        this.state = {
            user_id: 0,
            loading: false,
            isConnected: false,
            aboutus: '',
            latitude: '29.3117',
            longitude: '47.4818',
            latdelta: '0.0922',
            longdelta: '0.0421',
            addressbar2: '',
            addressselected: '',
            address_selected: '',
            input_search: '',
            adver_arr: this.props.route.params.adver_arr,
            mapRegion: {
                latitude: parseFloat(city_lat),
                longitude: parseFloat(city_long),
                latitudeDelta: parseFloat(5),
                longitudeDelta: parseFloat(5),
            },
            initialRegion: {
                latitude: parseFloat(city_lat),
                longitude: parseFloat(city_long),
                latitudeDelta: parseFloat(5),
                longitudeDelta: parseFloat(5),
            },
            markers:[],
            search:''
        }
        this.setMarkers();
    }
    setMarkers=()=>{
        var adver_arr = this.state.adver_arr;
        if(adver_arr!='NA'){
            for (let index = 0; index < adver_arr.length; index++) {
                const location_lat = adver_arr[index].location_lat;
                const location_lng = adver_arr[index].location_lng;
                if(location_lat && location_lng){
                    let x = {latitude:parseFloat(location_lat),longitude:parseFloat(location_lng)};
                    this.state.markers.push(x)
                }   
            } 
        }
        console.log('this.state.markers',this.state.markers)
    }
    goToInitialLocation = async () => {
        // let initialRegion = Object.assign({}, this.state.initialRegion);
        // initialRegion["latitudeDelta"] = 0.9;
        // initialRegion["longitudeDelta"] = 0.9;
        // this.mapView.animateToRegion(initialRegion, 2000);
        this.mapView.fitToCoordinates(this.state.markers, {
            edgePadding: {
              bottom: 200, right: 50, top: 150, left: 50,
            },
            animated: true})
    }

    goAnotherPage = () =>{
        // this.mapView.clear();
        this.props.navigation.goBack();
    }





  render(){

   return(
    <View style={{ flex: 1}}>
<View>
         <ImageBackground
                style={{width:'100%',height:250}}
                source={require('../../Images/backgd2.jpg')}
              
                />
     <View style={{backgroundColor:'#fff',width:'82%',marginTop:'-30%',alignSelf:'center',padding:7,borderRadius:30,
          flexDirection:"row",borderColor:Colors.orange,borderWidth:1}}> 
           <View style={{width:'57%',flexDirection:"row"}}> 
           <TextInput style={{height:40,padding:10}}  
           placeholder="Search"  
              onChangeText={(txt) => { this.setState({ search: txt }) }}
              value={this.state.email}
           > </TextInput>
             </View>
             
             <Text style={{width:1,height:'100%',borderColor:Colors.orange,borderWidth:1,marginLeft:'27%'}}></Text>
              <View style={{width:'37%',flexDirection:"row",alignSelf:'center',marginLeft:'5%'}}> 
              <Icon name="search"  size={35} color={Colors.orange} />
              </View>
             </View>
  
</View>
        {/* <Loader loading={this.state.loading} /> */}

        <View style={{width:'100%',height:'100%',marginTop:'16%'}}>
        <MapView
            style={{ flex: 1,borderRadius:40,width:'100%' }}
            //region={this.state.mapRegion}
            followUserLocation={true}
            ref={ref => (this.mapView = ref)}
            zoomEnabled={true}
            showsUserLocation={true}
            onMapReady={()=>{this.goToInitialLocation()}}
            // onMapReady={() => {}}
            initialRegion={this.state.initialRegion}>
            {this.state.adver_arr != 'NA' && this.state.adver_arr.map((item,index) => (
                 (item.location_lat && item.location_lng)?
                    <Marker.Animated
                    coordinate={{
                        latitude: parseFloat(item.location_lat),
                        longitude: parseFloat(item.location_lng)
                    }}
                    isPreselected={true}
                     
                    onPress={() => { this.props.navigation.navigate('Detail_boat', { advertisement_id: item.advertisement_id }) }}
                    description={'Your are here location'}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} activeOpacity={0.9} >
                         <Image resizeMode="contain" style={{ width: 40, height: 40 }} source={require('../../../assets/icons/offer.png')}></Image> 
                        <View style={{ backgroundColor: '#ccc', height: 37, justifyContent: 'center', borderRadius: 2 }}><Text style={styles.map_kwd}>{Lang_chg.KWD_txt[config.language]} {item.rental_price}</Text></View>
                    </TouchableOpacity>
                </Marker.Animated>
                 
                 :
                 null
                ))}
            {/* <Marker
                coordinate={{
                    latitude: parseFloat(city_lat),
                    longitude: parseFloat(city_long),
                    latitudeDelta: parseFloat(this.state.latdelta),
                    longitudeDelta: parseFloat(this.state.longdelta),
                }}
                isPreselected={true}
            /> */}
        </MapView>
       
    </View>
</View>

   )
 }
}

const styles = StyleSheet.create({
    terms_main_view: {
        backgroundColor: Colors.white,
        height: '100%',
        flex: 1,
    },
    Input:{
        borderBottomColor:Colors.white,
        width:Sizes.width*0.85,
        color:Colors.white
    },
    notification_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: Colors.black,
        paddingTop: 15,
        paddingBottom: 15,
    },
    hole_top_l1: {
        width: 20,
        height: 20,
    },
    Notifications_title: {
        fontFamily: "Ubuntu-Regular",
        fontSize: 20,
        color: '#000000',
    },
    back_buttn_top: {
        padding: 5
    },
    ImageBackground:{
        backgroundColor:Colors.black
    },
    ImageBackground_Img:{
        resizeMode:"cover",
        //opacity:0.5
    }
})