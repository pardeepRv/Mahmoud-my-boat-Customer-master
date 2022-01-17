import React, { Component,useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Modal,
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
import PremotionDetail from './PremotionDetail';
import { firebaseprovider } from '../../Provider/FirebaseProvider';
import AsyncStorage  from "@react-native-community/async-storage";



export default class Login extends Component {


  constructor(props) {
    super(props);
     this.state = {
      destinations:[],
      img:[],
      trips_arr:[],
      promotions_arr:[],
      backgroundColor:1,
      modalVisible:false

     }
  




//const Home = () => {
    // const [btn1Style,setBtn1Style]=useState({
    //     backColor:Colors.orange,
    //     textCOlor:Colors.white
    // })
    // const [btn2Style,setBtn2Style]=useState({
    //     backColor:Colors.white,
    //     textCOlor:Colors.black
    // });
    // const OutgoingData = Outgoing ;
    // const UpcomingData = Upcoming ;
    // const [data,setData]=useState(OutgoingData);

  }

  componentDidMount(){

   this.Promotion(); 
   //firebaseprovider.getAllUsers();
   //firebaseprovider.messagecountforfooter();

   
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

       console.log(arrayData)
       firebaseprovider.getMyInboxAllData(arrayData);
       firebaseprovider.firebaseUserGetInboxCount(arrayData);
      
      
      }
    } catch(e) {
      // error reading value
    }
  }



  ChangeColor(index,item) {

    console.log('color')

    this.setState({modalVisible:false})

    this.setState({backgroundColor:index})

    this.props.navigation.navigate('TripType',{'item':item})
  }




  async Promotion() {

   // let url = config.baseURL +'destination_list.php?user_id_post=82';
    try {
      const response = await fetch(config.baseURL +'destination_list.php?user_id_post=82');
      const json = await response.json();

      this.setState({ destinations: json.destinations_arr,trips_arr : json.trips_arr,promotions_arr:json.promotions_arr });


    //  console.log('response ',json)
  
      json.promotions_arr.forEach(item => { 
        this.state.img.push('https://freshandfine.xyz/app/webservice/images/'+item.image)
      });

     // console.log(this.state.img)
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  ModalClick(){

    console.log('modal')
    this.setState({modalVisible:true})
  }

  Premotion(index){

    console.log(index)

  let v = this.state.promotions_arr[index];

//let d = v.findIndex(index);

console.log(v)

this.props.navigation.navigate('PremotionDetail',{'item':v})

  }

    // --------------------------------------- //
    // const OutgoingBtn=()=>{
    //     setBtn2Style({
    //         backColor:Colors.white,
    //         textCOlor:Colors.black
    //     })
    //     setBtn1Style({
    //         backColor:Colors.orange,
    //         textCOlor:Colors.white
    //     })
    //     setData(OutgoingData)
    // };
    // -------------------------------------- //
    // const UpcomingBtn =()=>{
    //     setBtn1Style({
    //         backColor:Colors.white,
    //         textCOlor:Colors.black
    //     })
    //     setBtn2Style({
    //         backColor:Colors.orange,
    //         textCOlor:Colors.white
    //     })
    //     setData(UpcomingData)
    // };



  //   const UpcomingBtn =()=>{
  //     setBtn1Style({
  //         backColor:Colors.white,
  //         textCOlor:Colors.black
  //     })
  //     setBtn2Style({
  //         backColor:Colors.orange,
  //         textCOlor:Colors.white
  //     })
  //     setData(UpcomingData)
  // };
// --------------------------------- //


render(){

  const  destinations = this.state.destinations.image;
  //const images = {this.state.destinations}

  //console.log('des',this.state.destinations)

  var images=[
    require('../../Images/boat.jpg'),
    require('../../Images/back.jpg'),
  require('../../Images/back1.jpg'),
  require('../../Images/back2.jpg'),
  require('../../Images/back3.jpg'),
  require('../../Images/back4.jpg')
  ]

    return(

        <View style={{backgroundColor:Colors.white,flex:1}}>
            <Header
             imgBack={true}
             notiBtn={true}
             searchBtn={false}
             headerHeight={300}
             />
             {/* Buttons */}
             <View style={{position:"absolute",width:"100%",top:135}}>
             <TouchableOpacity onPress={()=> this.ModalClick()}>
               <Text  style={{marginLeft:17,color:Colors.white,textDecorationLine:"underline"}}>View All</Text>
                </TouchableOpacity>
  
             <View style={s.btn_1}>
                       
                        <ScrollView
               horizontal={true}
                >
             


                {  this.state.trips_arr.map((item, index) => (
                
                <TouchableOpacity
                  style={[s.btn1,{backgroundColor:this.state.backgroundColor=== index ? 'rgba(10, 132, 129, 1)':'#fff',width:80,borderRadius:20,alignItems:'center',alignSelf:'center',alignContent:'center'}]}
                  onPress={()=>this.ChangeColor(index,item)}
                  activeOpacity={0.8}
                  >
                    
                           
                    {
                      (this.state.backgroundColor==index) ?
                       <Image    source={{uri:config.baseURL+'images/'+item.icon_white}} style={{height:50,width:50,resizeMode:'contain'}} />
              
                       :
                      <Image    source={{uri:config.baseURL+'images/'+item.icon_green}} style={{height:50,width:50,resizeMode:'contain'}} />
                        }
                     
                     
                     <Text style={[s.btn1Text,{color:this.state.backgroundColor=== index ? '#fff':'rgba(10, 132, 129, 1)',fontSize:10,padding:2,alignSelf:'center',alignItems:'center',alignContent:'center',fontWeight:'bold'}]}>
                         {item.trip_type_name}
                     </Text>
                     <Text style={{color:'#b6b6b6',fontSize:10}} > {item.no_of_boat} Boats</Text>


        
                 </TouchableOpacity> 

                 



                 
                ))}
                        </ScrollView>
                           </View>
             </View>
             {/* View */}
             <View style={s.SEC2}>
               <ScrollView style={{marginTop:10,}}>
               <View
                style={{
                  flexDirection:"row",
                  justifyContent:'space-between',
                  margin:13,
                  width:"95%",
                  alignSelf:'center'
                  }}>
                    <TouchableOpacity>
                      <Text
                        style={{
                          textDecorationStyle:'dashed',
                          textDecorationLine:'underline',
                          fontFamily:FontFamily.default,
                          color:Colors.orange,
                          marginLeft:10,
                          fontWeight:'bold'
                          }}>
                        Promotion
                      </Text>
                    </TouchableOpacity>
                           </View>
               
             <SliderBox
                ImageComponent={FastImage}
                images={this.state.img}
                sliderBoxHeight={200}
                slidderBoxWidth={280}
                autoplayInterval={3000}
                onCurrentImagePressed={index =>
                 // console.warn(`image ${index} pressed`)
                  this.Premotion(index)
                }
                //currentImageEmitter={index => console.warn(`image ${index} pressed`)}
                dotColor={Colors.orange}
                resizeMethod={'resize'}
                 resizeMode={'cover'}
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
                  width: 9,
                  height: 9,
                  // borderRadius: 5,
                  marginHorizontal: -9,
                  borderRadius:20,
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'rgba(128, 128, 128, 0.92)',
                  transform: [{ rotate: "45deg" }]
                }}
                 autoplay
                 circleLoop
                ImageComponentStyle={{borderRadius: 0, width: '90%', marginTop: 2}}
                imageLoadingColor="#2196F3"
              />
              <View
                style={{
                  flexDirection:"row",
                  justifyContent:'space-between',
                  marginTop:20,
                  width:"95%",
                  alignSelf:'center'
                  }}>
                    <TouchableOpacity>
                      <Text
                        style={{
                          textDecorationStyle:'dashed',
                          textDecorationLine:'underline',
                          fontFamily:FontFamily.default,
                          color:Colors.orange,
                          marginLeft:10,
                          fontWeight:'bold'
                          }}>
                        Popular Destination
                      </Text>
                    </TouchableOpacity>
                    
               </View>
            <View>
            <FlatList
            data={this.state.destinations}
         
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>{
              return(
                <View style={{padding:5}}  >
                  <Card containerStyle={{padding:0,borderRadius:15,paddingHorizontal:0,margin:7.5,marginHorizontal:10,elevation:5}}>
                  <TouchableOpacity onPress={() => this.ModalClick()}>
                  <ImageBackground
                   style={s.ImageBackground}
                   imageStyle={s.imgStyle}
                   source={{uri:'https://freshandfine.xyz/app/webservice/images/'+item.image}}
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
                       <Icon name="heart-outlined" type="entypo" color={Colors.white} />
                     </TouchableOpacity>
                     <TouchableOpacity style={{position:"absolute",right:50,top:10}}>
                       <Icon name="share" type="entypo" color={Colors.white} />
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
                       <Text style={{marginLeft:'15%',marginRight:-40}}>   starting  {'\n'} </Text>
                          KD {item.min_price}
                       </Text>
                     </View>
                  </ImageBackground>  
                  </TouchableOpacity>
                  {/*  */}
                  <View style={s.SEC3}>
                     <View style={{}}>
                      <Text style={s.title}>
                        {item.destination_name}
                      </Text>
                    {/*  <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
                        <Image style={{
                          height:40,
                          width:40,
                          borderRadius:20,
                          resizeMode:"cover",
                          }} 
                          source={{uri:'https://source.unsplash.com/400x400/?face'}}
                          PlaceholderContent={<ActivityIndicator size={30} color={Colors.orange} style={{alignSelf:"center"}} />} 
                          />
                        <View style={{marginLeft:5}}>
                          <Text style={{color:"rgba(51, 51, 51, 1)",fontSize:14,fontFamily:FontFamily.default}}>{item.type}</Text>
                          <AirbnbRating 
                           showRating={false}
                           size={12}
                           isDisabled
                           defaultRating={4}
                           starContainerStyle={{alignSelf:"flex-start"}}
                            />
                        </View>
                      </View> */}
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
                </View>

                
                </ScrollView>
             </View>



             <Modal
  animationType="slide"
  transparent={true}
  visible={this.state.modalVisible}
  onRequestClose={() => {
    // this.closeButtonFunction()
    this.setState({modalVisible:false})
  }}>

    
  <View
    style={{
      height: '50%',
      marginTop: 'auto',
      backgroundColor:'#fff',
      borderRadius:30
    }}>
    {/* <View >
      <Text>This is Half Modal</Text>
    </View>
    <TouchableOpacity
      onPress={() => {
        this.setState({modalVisible:false});
      }}>
      <Text>Close</Text>
    </TouchableOpacity> */}

<Text  style={{color:Colors.orange,alignSelf:'center',fontSize:18,fontWeight:'bold',padding:8}} >Type Of Trip</Text>
<FlatList
  data={this.state.trips_arr}
  //  horizontal={true}
  numColumns={3}
  //  keyExtractor={(item, index) => console.log(item)}
  renderItem={({item,index}) => (

    
  <View  style={{ flex: 1,alignSelf:'center',alignItems:'center',backgroundColor:Colors.white,margin:15,borderRadius:8,padding:10,
     shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5 }}>
     <TouchableOpacity
           
           onPress={() => 
            this.ChangeColor(index,item)
         //  this.handleClick(item)
       } 
       >
        

  <Image source={{uri:config.baseURL+'images/'+item.icon_green}} style={{height:40,width:40,resizeMode:'contain'}}  />
  </TouchableOpacity>
  <Text style={{color:Colors.orange,fontWeight:'bold',fontSize:16}} >{item.trip_type_name.slice(0, 8)}</Text>
  
  <Text style={{color:'#b6b6b6'}} > {item.no_of_boat} Boats</Text>
  </View>
  )}/>
  </View>
</Modal>
        </View>
    )

              }
}
const s= StyleSheet.create({
  SEC2:{
      backgroundColor:Colors.white,
      borderTopLeftRadius:30,
      borderTopEndRadius:30,
      marginTop:-30,
    //   marginBottom:40,
      flex:1
  },
  btn1:{
    height:100,
    width:70,
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
    marginLeft:15,
    alignSelf:'flex-end',
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




//export default Home;

