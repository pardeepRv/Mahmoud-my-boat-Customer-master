import React, { Component,useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';
import {
    Icon,
    Input,
    Card,
    AirbnbRating
} from 'react-native-elements';
import Header from '../../Components/Header';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import Ad from '../../Data/Ad';
import Outgoing from '../../Data/Outgoing';
import Upcoming from '../../Data/Upcoming';
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
import { renderNode } from 'react-native-elements/dist/helpers';
import { apifuntion } from '../../Provider/apiProvider';
import { config } from '../../Provider/configProvider';
import AsyncStorage  from "@react-native-community/async-storage";
import { Calendar } from 'react-native-calendars';
//import {SliderBox} from 'react-native-image-slider-box';

export default class TripTypeDetail extends Component {


  constructor(props) {
    super(props);
     this.state = {
      destinations:[],
      img:[],
      trips_arr:[],
      promotions_arr:[],
      advertisement:this.props.route.params.item,
      destinations_arr:[],
      img_arr:[],
      adver_arr:[],
      user:[],
      calender_arr:[],
      webviewshow:false
     }
    }


componentDidMount(){

    this.getData('user_arr');

    console.log(this.state.advertisement)
}


    getData = async (key) => {
            
        console.log('local '+key)
        try {
          const value = await AsyncStorage.getItem(key);

//          console.log('local '+value)
          
           //  console.log('array ',arrayData.email);
          if(value !== null) {
           
            const arrayData = JSON.parse(value);

          //  console.log(arrayData)
            this.setState({user:arrayData})
           this.ProfileDetail(arrayData.user_id)
          
          }
        } catch(e) {
          // error reading value
        }
      }


      async ProfileDetail(user_id) {

        console.log('user ',user_id)

        let url = config.baseURL +'advertisement_details.php?user_id_post='+user_id+'&advertisement_id='+this.state.advertisement.advertisement_id;
        try {
          const response = await fetch(url);
          const json = await response.json(); 
          console.log('json  ',json)

          this.setState({adver_arr:json.adver_arr,img_arr:json.adver_arr.img_arr})
         console.log(json.adver_arr.img_arr)

       json.adver_arr.img_arr.forEach(item => { 
        this.state.img.push('https://freshandfine.xyz/app/webservice/images/'+item.image)
      });
     if(json.success=='true'){

       
      }else{

      }
          
         // console.log(this.state.img)
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ isLoading: false });
        }
      }


      BookNow(){

        this.props.navigation.navigate('RequestPayment',{'user_id_post':this.state.user,'adver_arr':this.state.adver_arr,'advertisement':this.state.advertisement})
           

      }




    render(){
        return(

            <View style={{backgroundColor:Colors.white,flex:1}}> 

                           <TouchableOpacity onPress={()=>gotoBack()}  style={{marginBottom:-50,zIndex:1,alignItems:'flex-start',marginTop:20,marginLeft:20}}>
                                <Icon name="arrow-back" type="ionicons" size={26} color={Colors.white} />
                            </TouchableOpacity>

                             <TouchableOpacity onPress={()=>gotoBack()}  style={{marginBottom:-50,zIndex:1,alignItems:'flex-end',marginTop:20,marginRight:20}}>
                                <Icon name="share" type="ionicons" size={26} color={Colors.white} />
                            </TouchableOpacity>
         
                <ScrollView>
                <SliderBox
                ImageComponent={FastImage}
                images={this.state.img}
                sliderBoxHeight={300}
                sliderBoxWidth={400}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
                //currentImageEmitter={index => console.warn(`image ${index} pressed`)}
                dotColor={Colors.orange}
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={10}
                paginationBoxStyle={{
                  position: 'absolute',
                  bottom: -30,
                  padding: 0,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}
                dotStyle={{
                  width: 7,
                  height: 7,
                  borderRadius: 20,
                  marginHorizontal: -9,
            
                //  borderRadius:0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'rgba(128, 128, 128, 0.92)',
                  transform: [{ rotate: "40deg" }]
                }}
                 autoplay
                 circleLoop
                ImageComponentStyle={{borderRadius: 5, width: '99%', marginTop: 0}}
                imageLoadingColor="#2196F3"
              />

 
                     <View style={s.SEC3}>
                    <View style={{}}>
                      
                      <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
                        <Image style={{
                          height:40,
                          width:40,
                          borderRadius:20,
                          resizeMode:"cover",
                          }} 
                          source={{uri:'https://source.unsplash.com/400x400/?face'}}
                          PlaceholderContent={<ActivityIndicator size={30} color={Colors.orange} style={{alignSelf:"center"}} />} 
                          />
                        <View style={{marginLeft:'15%'}}>
                          <Text style={{color:Colors.orange,fontSize:18,fontWeight:'bold',fontFamily:FontFamily.default,marginLeft:5}}>Demo</Text>
                          <AirbnbRating 
                           showRating={false}
                           size={12}
                           isDisabled
                           defaultRating={4}
                           starContainerStyle={{alignSelf:"flex-start"}}
                            />
                           
                        </View>
                        
                      </View>
                      <View  style={{flexDirection:"row",marginLeft:65}}>
                        <Icon name="person" size={14}  />  
                      {/* <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:14,fontFamily:FontFamily.default}}>{this.state.adver_arr.captain_name}</Text> */}
                      <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:14,fontFamily:FontFamily.default,marginTop:-2}}>Captain</Text>
                         </View>
                    </View>
                 
                  </View>

                  <View  style={{flexDirection:'row',alignItems:"center",alignSelf:'flex-end'}}> 

<View style={{width:'50%',height:'50%',alignItems:'center'}} >
<View  style={{width:70,height:70,flexDirection:'row',alignItems:'center',backgroundColor:Colors.orange,borderRadius:80,padding:10}}> 
<Image source={require('../../../assets/icons/book.png')}  style={s.tool}  style={{marginLeft:15}} />     
<Image source={require('../../../assets/icons/mark.png')}   style={{marginLeft:-7,marginTop:-3}} />     
</View>
<Text>Sail </Text>
</View>


<View style={{width:'50%',height:'50%',alignItems:'center'}} >
<View  style={{width:70,height:70,alignItems:'center',backgroundColor:Colors.orange,borderRadius:80,padding:10}}> 
<Image source={require('../../../assets/icons/circle.png')}  style={{marginTop:10}} />
<Image source={require('../../../assets/icons/locate.png')}  style={{marginTop:-23}} />
</View>
<Text>Kuwait </Text>
</View>

{/* <View> ;
  <Text>
{this.state.adver_arr.city_name} </Text>
</View> */}
                  </View>
            
            <View style={s.categery}>

            <View style={s.container1,s.top_margin}> 
              
                <View  style={{width:100,height:100,marginLeft:-25,alignItems:'center'}}>
               <View style={{width:35,height:35,alignItems:'center',backgroundColor:'#fff',borderRadius:80,padding:4, flexDirection: 'row'}}> 
               <Image source={require('../../../assets/icons/boat_icon.png')}  style={{width:'80%',height:'80%',marginLeft:5}} />
               <Image source={require('../../../assets/icons/round_icon.png')}  style={{width:'20%',height:'20%',marginLeft:-10,marginTop:15}}  />
               </View>
               <Text style={{alignItems:'center',fontWeight:'bold',fontSize:12}}> Boat size </Text>
               <Text style={{alignItems:'center',fontWeight:'bold',fontSize:12}}>  {this.state.adver_arr.boat_capacity} </Text>
               </View>
              
               <View style={{width:100,height:100,marginLeft:'2%',alignItems:'center'}}> 
               <View style={{width:35,height:35,alignItems:'center',backgroundColor:'#fff',borderRadius:80,padding:4}}> 
               <Image source={require('../../../assets/icons/boat_icon.png')} style={s.tool1}   />
               </View>
               <Text style={{alignItems:'center',fontWeight:'bold',fontSize:12}}>  Boat brand </Text>
               <Text style={{alignItems:'center',fontWeight:'bold',fontSize:12}}>  {this.state.adver_arr.boat_name} </Text>
                 </View>

                 <View style={{width:100,height:100,marginLeft:'3%',alignItems:'center'}}> 
               <View style={{width:35,height:35,alignItems:'center',backgroundColor:'#fff',borderRadius:80,padding:10}} > 
               <Image source={require('../../../assets/icons/watch_icon2.png')}  style={{width:22,height:22,marginTop:-5}} />
               </View>
               <Text style={{alignItems:'center',fontWeight:'bold',fontSize:12}}> Trip Hours </Text>
               <Text style={{alignItems:'center',fontWeight:'bold',fontSize:12}}> {this.state.adver_arr.idle_time} </Text>
                 </View>

            </View>

            <View style={s.container1}> 
               <View style={{width:100,height:100,marginLeft:-25,alignItems:'center'}}>
               <View style={{width:35,height:35,alignItems:'center',backgroundColor:'#fff',borderRadius:80,padding:5}}> 
               <Image source={require('../../../assets/icons/equipment1.png')}  style={s.tool1} />
               </View>
               <Text style={{alignItems:'center',fontWeight:'bold',fontSize:12}}>  Equipment </Text>
               <Text style={{fontWeight:'bold',fontSize:12}}>{this.state.adver_arr.boat_capacity} </Text>
              </View>

              <View style={{width:100,height:100,marginLeft:'2%',alignItems:'center'}}>
               <View style={{width:35,height:35,alignItems:'center',backgroundColor:'#fff',borderRadius:80,padding:5}}> 
               <Image source={require('../../../assets/icons/entertainment.png')}  style={s.tool1} />
                </View>
                <Text style={{alignItems:'center',fontWeight:'bold',fontSize:12}}>  Entertainment </Text>
                  <Text style={{fontWeight:'bold',fontSize:12}}> {this.state.adver_arr.boat_name} </Text>
                 </View>

                <View style={{width:100,height:100,marginLeft:'3%',alignItems:'center'}}>
               <View style={{width:35,height:35,alignItems:'center',backgroundColor:'#fff',borderRadius:80,padding:5}} > 
               <Image source={require('../../../assets/icons/food.png')}  style={s.tool1} />
               </View>
               <Text style={{alignItems:'center',fontWeight:'bold',fontSize:12}}>  Food </Text>
               <Text style={{fontWeight:'bold',fontSize:12}}> {this.state.adver_arr.idle_time} </Text>
               </View>
              
            </View>

            <View style={s.container1}> 

            <View style={{width:100,height:100,marginLeft:-25,alignItems:'center'}}>
              <View style={{width:35,height:35,alignItems:'center',backgroundColor:'#fff',borderRadius:80,padding:5}}> 
               <Image source={require('../../../assets/icons/cabin.png')}  style={s.tool1} />
                 </View>
                 <Text style={{alignItems:'center',fontWeight:'bold',fontSize:12}}>Cabin  </Text>
                 <Text style={{fontWeight:'bold'}}>  {this.state.adver_arr.boat_capacity} </Text>
                 </View>

                <View style={{width:100,height:100,marginLeft:'2%',alignItems:'center',alignSelf:'center'}}>
               <View style={{width:35,height:35,alignItems:'center',alignSelf:'center',backgroundColor:'#fff',borderRadius:80,padding:5}}> 
               <Image source={require('../../../assets/icons/guest.png')}  style={s.tool1} />
                </View>
                <Text style={{alignItems:'center',fontWeight:'bold',fontSize:12}}> Number of guest  </Text>
                 <Text style={{fontWeight:'bold'}}> {this.state.adver_arr.boat_name} </Text>
               </View>

               <View style={{width:100,height:100,marginLeft:'3%',alignItems:'center'}}>
               <View style={{width:35,height:35,alignItems:'center',backgroundColor:'#fff',borderRadius:80,padding:5}} > 
               <Image source={require('../../../assets/icons/toilet.png')}  style={s.tool1} />
                </View>
                <Text style={{alignItems:'center',fontWeight:'bold'}}> Toilet</Text>
                <Text style={{fontWeight:'bold'}}> {this.state.adver_arr.idle_time} </Text>
               </View>

            </View>
            </View>

            <Text style={s.disc}>Discription :</Text>
            <Text style={s.detail}>
              {/* {this.state.adver_arr.discription_arr} */}
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
            </Text>
<Text style={s.borders}>

</Text>


<Text style={{marginLeft:'3%',fontSize:18,fontWeight:'bold'}}> Booking details:</Text>

<Text></Text>

<View style={s.container}>
  <View style={s.item}>
   <Text> No of Guests :</Text>
  </View>

  <View style={s.item}>
  <Text>{this.state.adver_arr.boat_capacity} </Text>
  </View>
</View>

<View style={s.container}>
  <View style={s.item}>
   <Text> Discount :</Text>
  </View>

  <View style={s.item}>
  <Text>{this.state.adver_arr.discount} </Text>
  </View>
</View>


<View style={s.container}>
  <View style={s.item}>
   <Text> Total Price :</Text>
  </View>

  <View style={s.item}>
  <Text>{this.state.adver_arr.price} </Text>
  </View>
</View>



<View style={s.container}>
  <View style={s.item}>
   <Text> Trip Type :</Text>
  </View>

  <View style={s.item}>
  <Text>{this.state.adver_arr.trip_type_name} </Text>
  </View>
</View>


<View style={s.container}>
  <View style={s.item}>
   <Text> Destination :</Text>
  </View>

  <View style={s.item}>
  <Text>{this.state.adver_arr.location_address} </Text>
  </View>
</View>


<View style={s.container}>
  <View style={s.item}>
   <Text> Trip Hour :</Text>
  </View>

  <View style={s.item}>
  <Text>{this.state.adver_arr.minimum_hours} </Text>
  </View>
</View>

         
<View style={{backgroundColor:Colors.orange,flexDirection: 'row',padding:10,marginTop:20}}>
  <View>
<TouchableOpacity style={s.Btn1} onPress={()=>this.BookNow()}>
                                 <Text style={s.Btn1Text}>
                                     Book Now
                                 </Text>
                             </TouchableOpacity>
                             </View>
                             <View style={{justifyContent: 'center',marginLeft:'20%'}}> 
                               <Text style={s.rent}>Rental Amount</Text>
                               <Text style={s.rent}>KWD 50</Text>
                             </View>
                </View>             

</ScrollView>


                      
            </View>
        )
    }



}


const s= StyleSheet.create({
  SEC2:{
      backgroundColor:Colors.white,
      borderTopLeftRadius:30,
      borderTopEndRadius:30,
      marginTop:-40,
    //   marginBottom:40,
      flex:1
  },
  borders:{
    borderBottomColor:'#000',
    borderBottomWidth:1,
    margin:20,
    marginTop:1
    //borderColor:'#000',
    //borderWidth:1
  },
  tool:{
 // width:'70%',
 // height:'70%',
  marginTop:5
  },
  top_margin:{
  marginTop:15,
  padding:0,
  marginLeft:'10%',
  flexWrap: "wrap",
  flexDirection: 'row',// set elements horizontally, try column.  
  },
  tool1:{
     width:'80%',
     height:'80%',
     marginTop:3
     },
  rent:{
   color:'#fff',
   fontSize:16,
   alignSelf:'flex-end'
  },
  Btn1:{
    height:48,
    width:175,
    backgroundColor:Colors.white,
    margin:5,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:30,
    elevation:3,
    overflow: 'hidden',
    shadowColor: Colors.orange,
    shadowRadius: 10,
    shadowOpacity: 1,
},
Btn1Text:{
    fontSize:20,
    fontFamily:FontFamily.semi_bold,
    color:Colors.orange
},

categery:{
backgroundColor:'#F3F9F9',
width:'84%',
height:'20%',
marginTop:'10%',
padding:0,
margin:'7%'
},
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  item: {
    width: '45%', // is 50% of container width
    marginLeft:'3%'
  },
  disc:{
   marginLeft:20,
   fontSize:18,
   fontWeight:'bold',
   textAlign: "justify"
  },
  detail:{
    marginTop:10,
marginLeft:20,
marginRight:20,
textAlign: "justify"
  },
  container1:{  
   // flex: 1,  
      marginTop:-15,
     padding:0,
    marginLeft:'10%',
    flexWrap: "wrap",
    flexDirection: 'row',// set elements horizontally, try column.  
},  
  btn1:{
    height:90,
    width:60,
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:7,
    elevation:5,
    margin:7
},
  btn1Text:{
    fontSize:10,
    fontFamily:FontFamily.semi_bold,
  },
  btn_1:{
      flexDirection:"row",
      justifyContent:"space-around",
  },
  Card:{
      borderRadius:20,
      elevation:3,
      marginHorizontal:10,
      marginTop:0,
      marginBottom:15
  },
  name:{
      fontFamily:FontFamily.semi_bold,
      fontSize:16,
      marginBottom:3
  },
  type:{
      fontFamily:FontFamily.default,
      fontSize:12,
      marginBottom:3,
    //   opacity:0.5
    color:Colors.gray1
  },
  id:{
      fontFamily:FontFamily.semi_bold,
      fontSize:13,
      marginBottom:3
  },
  price:{
      marginBottom:10,
      fontFamily:FontFamily.semi_bold,
      fontSize:15,
      color:Colors.price,
      textAlign:"right"
  },
  status:{
      color:Colors.orange,
      fontFamily:FontFamily.default,
      fontWeight:"500",
      fontSize:14,
      textAlign:"right"
  },
  ImageBackground:{
    height:215,
    width:"100%",
    borderRadius:15,
    alignSelf:"center",
    // marginHorizontal:10,
    elevation:0
  },
  imgStyle:{
    borderRadius:15,
    height:215,
    width:"100%",
    alignSelf:"center"
  },
  SEC3:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:10,
    paddingHorizontal:20,
    alignItems:'center',
    marginTop:'8%',
    backgroundColor:'#F3F9F9',
    margin:'5%'
  },
  title:{
    fontFamily:FontFamily.semi_bold,
    fontSize:18,
    color:Colors.orange,
    // lineHeight:20
  },
  type:{
    fontFamily:FontFamily.default,
    fontSize:15,
    lineHeight:20,
    color:Colors.black1
  },
  no:{
    fontFamily:FontFamily.default,
    fontSize:12,
    lineHeight:20,
    color:Colors.black1
  },
  dis:{
    fontFamily:FontFamily.default,
    fontSize:13,
    color:Colors.black1
  },
  place:{
    fontFamily:FontFamily.default,
    fontSize:16,
    color:Colors.orange
  },
  trapezoid_discount: {
    width: 115,
    height: 0,
    borderBottomWidth: 25,
    borderBottomColor: Colors.orange,
    borderLeftWidth: 25,
    borderLeftColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: "transparent",
    borderStyle: "solid",
    backgroundColor:'transparent',
    alignItems:"center",
    transform:[{rotate:"-45deg"}],
    marginTop:19.2,
    marginLeft:-26
  },
})

