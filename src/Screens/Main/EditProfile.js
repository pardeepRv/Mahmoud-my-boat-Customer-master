import React, { useState,Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    SafeAreaView, StatusBar,
    Modal,
    I18nManager,
    TextInput
} from 'react-native';
import {
    Icon,
    Input,
    Card
} from 'react-native-elements';
import {Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import Header from '../../Components/Header';
import AsyncStorage  from "@react-native-community/async-storage";
import { config } from '../../Provider/configProvider';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
import { Lang_chg } from '../../Provider/Language_provider'
import { apifuntion } from '../../Provider/apiProvider';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';

export default class EditProfile extends Component {
  //  const [date, setDate] = useState(new Date());

    // const onChange = (event, selectedDate) => {
    // const currentDate = selectedDate || date;
    // setDate(currentDate);
    // };


    constructor(props) {
        super(props);
         this.state = {
            user_details:[],
            name:[],
            email:[],
            phone_number:[],
            password:[],
            confirm_password:[],
            date:'09-10-2020',
            address:[],
            dob:[],
            city_name:'',
            gender:'',
            city_arr:[],
            city:[],
            city_arr1: 'NA',
            modalVisible:false,
            gender_selection:false
            //template:[{'lang':'Eng'},{'lang':'Arb'}],
         }
        }


    componentDidMount(){

   

        //console.log('user ',v);
     
        this.getData('user_arr');
     
         }
     
      
         selectedValue(value){
            console.log('change ' +value)
        
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
                 //this.setState({localData:arrayData})
                this.ProfileDetail(arrayData.user_id)
                this.GetCityList(arrayData.phone_code)
               
               }
             } catch(e) {
               // error reading value
             }
           }



           async GetCityList(phone_code) {

            console.log('user ',phone_code)

            let url = config.baseURL +'city_list.php?country_code='+phone_code;
            try {
              const response = await fetch(url);
              const json = await response.json(); 
             // console.log('citylist  ',json)
   
         if(json.success=='true'){
            this.setState({city_arr:json.city_arr})
           // this.setState({name:json.user_details.f_name})

           console.log('citylist ',this.state.city_arr)
          }else{

          }
              
             // console.log(this.state.img)
            } catch (error) {
              console.log(error);
            } finally {
              this.setState({ isLoading: false });
            }
          }





           async ProfileDetail(user_id) {

            console.log('user ',user_id)

            let url = config.baseURL +'getUserDetails.php?user_id_post='+user_id;
            try {
              const response = await fetch(url);
              const json = await response.json(); 
              console.log('json  ',json)
   
         if(json.success=='true'){

            this.setState({user_details:json.user_details})
            this.setState({name:json.user_details.f_name})

          }else{

          }
              
             // console.log(this.state.img)
            } catch (error) {
              console.log(error);
            } finally {
              this.setState({ isLoading: false });
            }
          }

     UpdateProfile(){

      //  this.setState({modalVisible:true})

        let { name,dob,gender,city_name,address, email, phone_number } = this.state;

        if (name.length <= 0) {
            msgProvider.toast(Lang_chg.MobileMaxLength[config.language], 'center')
            return false
        }
        if (email.length <= 0) {
            msgProvider.toast(Lang_chg.emptyEmail[config.language], 'center')
            return false
        }
        if (email.length > 50) {
            msgProvider.toast(Lang_chg.emailMaxLength[config.language], 'center')
            return false
        }
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(email) !== true) {
            msgProvider.toast(Lang_chg.validEmail[config.language], 'center')
            return false
        }
        if (phone_number.length <= 0) {
            msgProvider.toast(Lang_chg.emptyMobile[config.language], 'center')
            return false
        }
        if (phone_number.length < 10) {
            msgProvider.toast(Lang_chg.MobileMinLength[config.language], 'center')
            return false
        }
        if (phone_number.length > 10) {
            msgProvider.toast(Lang_chg.MobileMaxLength[config.language], 'center')
            return false
        }


        var data = new FormData();
        data.append('user_id_post', this.state.user_details.user_id)
        data.append('user_type_post', 1)
        data.append('user_name', name)
        data.append('email', email)
        data.append('phone_number', phone_number)
        data.append('gender', gender)
        data.append('dob', dob)
        data.append('city', city_name)
        data.append('address', address)
        data.append("user_type", 1)
        data.append('f_name', '')
        data.append('l_name', '')
        data.append('business_name', '')
        data.append("profile_pic", '')
        data.append("about", '')

        this.setState({ loading: true });
        let url = config.baseURL + "edit_profile.php";
        apifuntion.postApi(url,data).then((obj) => {
         // console.log(obj)
          this.setState({ loading: false });
          return obj.json();
           }).then((obj) => {
      
          console.log(obj);
      
          if (obj.success == 'true') {

            
          }
      }).catch((error) => {
          console.log("-------- error ------- " + error);
          this.setState({ loading: false });
      });
      

     }


     setDate(date1){

        console.log(date1)

        this.setState({date:date1})


     }

     _selectCity(index){

        let data = this.state.city_arr;
        let len = this.state.city_arr.length;
        for (let i = 0; i < len; i++) {
            data[i].status = false;
        }

        data[index].status = !data[index].status;
        this.setState({
            city_name       : data[index].city[config.language],
            city_id         : data[index].city_id,
            modalVisible    : false,
        })

        // let data =this.state.city_arr[index];
        // console.log(data)

     }

     _selectGender(s_gender){
         console.log(s_gender)

        this.setState({gender:s_gender,gender_selection: false})
     }

     _searchCity = (textToSearch) =>{
        this.setState({
            city_arr : this.state.city_arr1.filter(i =>
                    i.city[config.language].toLowerCase().includes(textToSearch.toLowerCase()),
            ),
        })
    }



    render(){
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header imgBack={true} backBtn={true} name="Edit Profile" />

            <Modal animationType="slide" transparent visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false }) 
                    }}>
                        <StatusBar  barStyle='default' hidden={false} translucent={false}
                    networkActivityIndicatorVisible={true} />
                      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
                    <View style={s.select_city}>
                       
                        <Text style={s.select_city_title}>{Lang_chg.Choose_City[config.language]}</Text>
                        <Text></Text>
                    </View>
                    
                    <View style={s.search_bar}>
                        <TextInput placeholder={Lang_chg.ssearch12[config.language]} style={{height:50}} onChangeText={text=>this._searchCity(text)}></TextInput>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'white', }}>
                        <FlatList style={{ marginBottom: 10, }}
                            showsVerticalScrollIndicator={false}
                            data={this.state.city_arr}
                            renderItem={({ item, index }) => {
                                // this.state.city_id == item.city_id && alert('match') 
                                return (
                                    <TouchableOpacity activeOpacity={.7} onPress={() => { this._selectCity(index) }} >
                                        <View style={s.main_view_flag}>
                                            <Text style={s.flag_text_detail}>
                                                {item.city[config.language]}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </Modal>


                <Modal animationType="slide" transparent visible={this.state.gender_selection}
                    onRequestClose={() => {
                        this.setState({ gender_selection: false }) 
                    }}>
                       
                    <View style={{ flex: 1, backgroundColor: 'white', }}>
                    <Text style={s.select_city_title}>{Lang_chg.Choose_Gender[config.language]}</Text>
                    <TouchableOpacity activeOpacity={.7} onPress={() => { this._selectGender(Lang_chg.male_txt[config.language]) }} >
                       
                    <Text style={s.flag_text_detail}>{Lang_chg.male_txt[config.language]}</Text>

                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.7} onPress={() => { this._selectGender(Lang_chg.female_txt[config.language]) }} >
                       
                    <Text style={s.flag_text_detail}>{Lang_chg.female_txt[config.language]}</Text>
                    </TouchableOpacity>
                    </View>
                </Modal>

                
            <View style={s.SEC2}>
                <ImageBackground
                    style={{height:108,width:108,borderRadius:7,position:'absolute',top:-70,alignSelf:"center"}}
                    source={{uri:'https://source.unsplash.com/240x320/?face'}}
                    imageStyle={{resizeMode:"cover",borderRadius:7}} >
                        <TouchableOpacity style={{
                            height:30,
                            width:30,
                            borderRadius:4,
                            backgroundColor:"#fff",
                            alignItems:"center",
                            justifyContent:"center",
                            position:'absolute',
                            bottom:-7,
                            right:-10,
                            borderWidth:0.7,
                            borderColor:"rgba(0, 0, 0, 0.75)",
                            elevation:3
                            }}>
                        <Icon name="edit" type="feather" size={24} color={Colors.orange} />
                        </TouchableOpacity>
                </ImageBackground>
                <ScrollView>
                <View style={{marginTop:50,paddingHorizontal:10}}>
                    
                    <Input
                        placeholder="Name"
                        containerStyle={s.Input}
                        inputContainerStyle={s.Input}
                        placeholderTextColor={Colors.inputFieldEditProfile}
                        inputStyle={{color:Colors.inputFieldEditProfile}}
                        onChangeText={(txt) => { this.setState({ name: txt }) }}
                        defaultValue={this.state.user_details.f_name}
                        />
                    <Input
                        placeholder="Email"
                        containerStyle={s.Input}
                        inputContainerStyle={s.Input}
                        placeholderTextColor={Colors.inputFieldEditProfile}
                        inputStyle={{color:Colors.inputFieldEditProfile}}
                        keyboardType="email-address"
                        onChangeText={(txt) => { this.setState({ email: txt }) }}
                        defaultValue={this.state.user_details.email}
      
                        />

            {/* <Picker
            selectedValue={this.state.city}
           // style={{color:'#000',flex: 0,width: 90,zIndex:5}}
            dropdownIconColor='#000'
            mode="dropdown"
            itemStyle={{backgroundColor:'#000'}}
            >

                {this.state.city_arr.map((item, id) => 
                      {
                      return <Picker.Item key={id} value={item.city_id} label={item.city_id}  />;
                      }
                      )
                }



          </Picker>    */}


                    <Input
                        placeholder="Mobile"
                        containerStyle={s.Input}
                        inputContainerStyle={s.Input}
                        placeholderTextColor={Colors.inputFieldEditProfile}
                        inputStyle={{color:Colors.inputFieldEditProfile}}
                        keyboardType="phone-pad"
                        onChangeText={(txt) => { this.setState({ phone_number: txt }) }}
                        defaultValue={this.state.user_details.mobile}
                        />

                       <Input
                        placeholder="Birthday"
                        containerStyle={s.Input}
                        inputContainerStyle={s.Input}
                        placeholderTextColor={Colors.inputFieldEditProfile}
                        inputStyle={{color:Colors.inputFieldEditProfile}}
                        rightIcon={
                            <Icon name="calendar" type="antdesign" />
                        }

                        onChangeText={(txt) => { this.setState({ dob: txt }) }}
                        defaultValue={this.state.user_details.dob}
                        
                        />

                  <TouchableOpacity   onPress={() => { this.setState({ gender_selection: true }) }}>
          
                    <Input
                        editable={false}
                        placeholder="Gender"
                        containerStyle={s.Input}
                        inputContainerStyle={s.Input}
                        placeholderTextColor={Colors.inputFieldEditProfile}
                        inputStyle={{color:Colors.inputFieldEditProfile}}
                        onChangeText={(txt) => { this.setState({ gender: txt }) }}
                        defaultValue={(this.state.gender == '') ? 'Choose Gender' : this.state.gender}
                        />
                        </TouchableOpacity>

                        <TouchableOpacity   onPress={() => { this.setState({ modalVisible: true }) }}>
                    <Input
                    editable={false}
                    //placeholder="Gender"
                    containerStyle={s.Input}
                    inputContainerStyle={s.Input}
                    placeholderTextColor={Colors.inputFieldEditProfile}
                    inputStyle={{color:Colors.inputFieldEditProfile}}
                    //onChangeText={(txt) => { this.setState({ city_name: txt }) }}
                    defaultValue={(this.state.city_name == '') ? 'Choose City' : this.state.city_name}
                
                    >
                        
                        </Input>
                        </TouchableOpacity>

                    <Input
                        placeholder="Address"
                        containerStyle={s.Input}
                        inputContainerStyle={s.Input}
                        placeholderTextColor={Colors.inputFieldEditProfile}
                        inputStyle={{color:Colors.inputFieldEditProfile}}
                        onChangeText={(txt) => { this.setState({ address: txt }) }}
                        defaultValue={this.state.user_details.address}
                        />
                

                    {/* <DatePicker
          style={s.datePickerStyle}
          date={this.state.date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="25-10-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            this.setDate(date)
          }}
        /> */}


                     {/* {this.state.city_arr.map((item, id) => 
                      {
                      return <Text>{item.city_id}</Text>
                      }
                      )
                } */}

                      
                </View>
                </ScrollView>
            </View>
            <View>
                <TouchableOpacity style={s.btn1} onPress={()=>this.UpdateProfile()} >
                    <Text style={s.btn1Text}>
                        Update
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
}
const s=StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        marginTop:-50,
        borderTopLeftRadius:30,
        borderTopEndRadius:30,
        flex:1
      },
      Text:{
          fontFamily:FontFamily.default
      },
      datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
      Input1:{
        borderBottomColor:Colors.inputFieldEditProfile,
        width:Sizes.width*0.42,
        marginLeft:-5
    },
    Input:{
        borderBottomColor:Colors.inputFieldEditProfile,
        marginTop:-10
    },
    btn1:{
        height:48,
        width:"95%",
        backgroundColor:Colors.orange,
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:25,
        marginVertical:10,
        elevation:5
    },
    btn1Text:{
        fontSize:20,
        fontFamily:FontFamily.semi_bold,
        color:Colors.white
    }
    ,select_city:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:25,
        paddingRight:25,
        backgroundColor:'#fff',
        paddingTop:20,
        paddingBottom:20,
    },
    select_back_city:{
        width:30,
        resizeMode:'contain',
        height:30,
        tintColor:'#000',
    },
    edit_select_txt:{
        textAlign:'left',
        fontFamily:"Ubuntu-Regular",
        fontSize:14,
        color:'#b8b8b8',
        marginRight:25,
        marginTop:0,
        marginBottom:10,
        marginLeft:14,
        borderBottomWidth :1,
        borderBottomColor: '#000', 
    },
    edit_select_txt1:{
        textAlign:'left',
        fontFamily:"Ubuntu-Regular",
        fontSize:16,
        color:'#b9b9b9',
        marginRight:16,
        marginTop:0,
        marginBottom:14,
        marginLeft:10,
        borderBottomWidth :1,
        borderBottomColor: '#b9b9b9', 
    },
    select_city_title:{
        fontFamily:"Ubuntu-Bold",
        fontSize:20,
        color:'#000',
        fontWeight:'bold',
    },
    flag_text_detail:{
        color:'#333232',
        fontSize:16,
        fontFamily:"Ubuntu-Regular",
    },
    
})
//export default EditProfile;