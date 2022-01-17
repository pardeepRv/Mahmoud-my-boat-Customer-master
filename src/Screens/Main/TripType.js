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
    
    Input,
    Card,
    AirbnbRating
} from 'react-native-elements';
import Header from '../../Components/Header';
import Header2 from '../../Components/Header2';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import Ad from '../../Data/Ad';
import Outgoing from '../../Data/Outgoing';
import Upcoming from '../../Data/Upcoming';
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
import { renderNode } from 'react-native-elements/dist/helpers';
import { apifuntion } from '../../Provider/apiProvider';
import { config } from '../../Provider/configProvider';
import Icon from 'react-native-vector-icons/dist/FontAwesome';



export default class TripType extends Component {


  constructor(props) {
    super(props);
     this.state = {
      destinations:[],
      img:[],
      trips_arr:[],
      promotions_arr:[],
      trip_type:this.props.route.params.item,
      destinations_arr:[]
     }

    // console.log(this.props.navigation.state.params.item)
    }

    componentDidMount(){
       // const text = this.props.navigation.getParams('item');


       console.log('did ',this.state.trip_type)

       this.TripType()
       
    }


    async TripType() {

         let url = config.baseURL +'destination_list_filter.php?user_id_post=82&trip_type_id_post='+this.state.trip_type.trip_id;
         try {
           const response = await fetch(url);
           const json = await response.json(); 
           console.log('json  ',json)
           this.setState({destinations_arr:json.destinations_arr})
       
           
          // console.log(this.state.img)
         } catch (error) {
           console.log(error);
         } finally {
           this.setState({ isLoading: false });
         }
       }

    render(){
        
        return(
            <View style={{backgroundColor:Colors.white,flex:1}}> 

          
            <Header2
             imgBack={true}
             backBtn={true}
             backImgSource={config.baseURL+'images/'+this.state.trip_type.cover_image}
             name={this.state.trip_type.trip_type_name}
             searchBtn={false}
             headerHeight={300}
             />


             <View style={{backgroundColor:'#fff',height:40,width:'82%',marginTop:'-45%',alignSelf:'center',borderRadius:30,
          flexDirection:"row",borderColor:Colors.orange,borderWidth:1, shadowColor: '#fff',
          shadowOffset: { width: 500, height: 500 },
          shadowOpacity: 0.8,
          shadowRadius: 0,  
          elevation: 5}}> 
           <View style={{width:'37%',flexDirection:"row"}}> 
            {/* <Icon name="sort"  size={25} color={Colors.orange}  style={{padding:7}}/>  */}
            <Image source={require('../../../assets/icons/up.png')}  style={{marginTop:10,marginLeft:10}} />
            <Image source={require('../../../assets/icons/down.png')}  style={{marginTop:10}} />
             <Text style={{margin:6,padding:5,fontSize:11,marginLeft:-4,color:'#0A8481',fontFamily:'Montserrat-Regular'}}>  Sort By </Text> 
             </View>
             <Text style={{width:1,height:'100%',borderColor:'#39DCE5',borderWidth:1,marginLeft:-10,marginRight:'4%'}}></Text>
             <View style={{width:'37%',flexDirection:"row"}}>
               {/* <Icon name="filter" size={25}  color={Colors.orange}  style={{padding:7}}/>  */}
               <Image source={require('../../../assets/icons/filter_icon.png')}  style={{marginTop:10,marginLeft:13}} />
               <Text style={{margin:7,fontSize:11,padding:5,color:'#0A8481',fontFamily:'Montserrat-Regular'}} >Filter </Text>
              </View>
              <Text style={{width:1,height:'100%',borderColor:'#39DCE5',borderWidth:1,marginLeft:-14,marginRight:'4%'}}></Text>
      
              <View style={{width:'37%',flexDirection:"row"}}> 
              {/* <Icon name="map-marker"  size={25} color={Colors.orange}  style={{padding:7}} />
               */}
               <Image source={require('../../../assets/icons/map_icon.png')}  style={{marginTop:10,marginLeft:8}} />
              <Text style={{margin:7,fontSize:11,marginLeft:-1,padding:5,color:'#0A8481',fontFamily:'Montserrat-Regular'}} > Map</Text>
              </View>
             </View>


             <View style={{backgroundColor:'#fff',height:40,width:'82%',marginTop:10 ,alignSelf:'center',borderRadius:30,
          borderColor:Colors.orange,
           shadowColor: '#fff',
          shadowOffset: { width: 500, height: 500 },
          shadowOpacity: 0.8,
          shadowRadius: 0,  
          elevation: 5}}> 
           <Text  style={s.select_date}> Choose Trip Date</Text>
             </View>

          <View style={{marginTop:'15%',marginBottom:'60%',borderRadius:20,backgroundColor:Colors.white}}>
                <FlatList

                
            data={this.state.destinations_arr}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>{
              return(
                <View style={{padding:5}}>
                  <TouchableOpacity  onPress={()=> this.props.navigation.navigate('DestinationList',{'item':item,'trip_type':this.state.trip_type.trip_id})} >
                  <Card containerStyle={{padding:0,borderRadius:15,paddingHorizontal:0,margin:7.5,marginHorizontal:10,elevation:5}}>
                  <ImageBackground
                   style={s.ImageBackground}
                   imageStyle={s.imgStyle}
                   source={{uri:config.baseURL+'images/'+item.image}}
                   >
                     {/* Discount */}
                     {/* <View style={[{
                       justifyContent:'center'
                       },s.trapezoid_discount]}>
                       <Text style={{
                         position:"absolute",
                         fontFamily:FontFamily.semi_bold,
                         fontSize:11,
                         alignSelf:"center",
                         color:Colors.white
                         }}>
                         {item.discount} OFF
                       </Text>
                     </View> */}
                     {/* Three dots */}
                     {/* <TouchableOpacity style={{position:"absolute",right:10,top:10}}>
                       <Icon name="heart" type="entypo" size={20}  color={Colors.white} />
                     </TouchableOpacity>
                     <TouchableOpacity style={{position:"absolute",right:50,top:10}}>
                       <Icon name="share" type="entypo" size={20} color={Colors.white} />
                     </TouchableOpacity> */}
                     {/* Price */}
                     <View
                      style={[{
                       height:40,
                      //  width:97,
                       backgroundColor:Colors.white,
                       flexDirection:"row",
                       alignItems:"center",
                       justifyContent:"space-around",
                       position:"absolute",
                       right:20,
                       bottom:-1,
                       paddingHorizontal:10,
                       borderTopLeftRadius:12,
                       borderTopRightRadius:12
                       }]}
                       >
                        
                       <Text style={s.place}>
                        <Text style={{marginLeft:'15%',marginRight:-50}}>   starting  {'\n'} </Text>
                           KD {item.min_price}
                       </Text>
                     </View>
                  </ImageBackground>
                  {/*  */}
                  <View style={s.SEC3}>
                    <View style={{}}>
                      <Text style={s.title}>
                        {item.destination_name}
                      </Text>
                      <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
                                      {/* <View style={{marginLeft:5}}>
                          <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:14,fontFamily:FontFamily.default}}>{item.type}</Text>
                          <AirbnbRating 
                           showRating={false}
                           size={12}
                           isDisabled
                           defaultRating={4}
                           starContainerStyle={{alignSelf:"flex-start"}}
                            />
                        </View> */}
                      </View>
                    </View>
                    {/* <View>
                      <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:12,fontFamily:FontFamily.default}}>
                        Destination
                      </Text>
                      <View style={{flexDirection:'row',alignItems:"center",alignSelf:'flex-end'}}>
                      <Icon name="person" size={14} />  
                      <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:10,fontFamily:FontFamily.default}}>10 Person</Text>
                      </View>
                    </View> */}
                  </View>
                  </Card>
                  </TouchableOpacity>
              </View>
              )
            }}
            keyExtractor={(i,ind)=>ind}
              style={{
                  // marginTop:30
              }}
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={{ 
                   paddingBottom: 10,
                  //  height:"100%"
                }}
            />
            <Text>{'\n'}{'\n'}</Text>
            <Text>{'\n'}{'\n'}</Text>
            <Text>{'\n'}{'\n'}</Text>
            </View>

            
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
          alignItems:'center'
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

        select_date:{
          fontSize:13,
          color:Colors.orange,
          alignSelf:'center',
          padding:9,
          fontWeight:'900',
          fontFamily:'Montserrat-SemiBold'
        }
      })
      
      