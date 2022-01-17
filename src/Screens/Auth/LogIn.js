import React,{ Component } from 'react';
import { 
    Text,
    Linking,
    ScrollView,
    View,
    Dimensions,
    StyleSheet,Image,
    ImageBackground,
    TouchableOpacity,Keyboard
} from 'react-native';
import { 
    Input,SocialIcon
} from 'react-native-elements';
import { apifuntion } from '../../Provider/apiProvider';
import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
import { backgd,back_img,google_icon, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import { config } from '../../Provider/configProvider';
import { SocialLogin } from '../../Provider/SocialLoginProvider';
import { localStorage } from '../../Provider/localStorageProvider';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
//import {Picker} from '@react-native-picker/picker';
import {Picker} from '@react-native-community/picker';
//import { msgProvider, msgTitle, msgText } from '../../Provider/messageProvider';
//import AsyncStorage  from "@react-native-community/async-storage";
import { Lang_chg } from '../../Provider/Language_provider'
import { firebaseprovider } from '../../Provider/FirebaseProvider';


export default class Login extends Component {

//  WelComeNote=()=>{
//     return(
//         <View style={styles.WelComeNote}>
//             <Text style={styles.myboat}>
//                 My Boat
//             </Text>
//             <Text style={styles.Wlcome}>
//                 Welcome
//             </Text>
//         </View>
//     )
// }

constructor(props) {
   super(props);
    this.state = {
       // language_id: config.language,
        password: '',
        HidePassword: true,
        email: '',
        loading: false,
        isConnected: true,
        checked: false,
        timer: null,
        otp: '',
        minutes_Counter: '01',
        seconds_Counter: '59',
        startDisable: false,
        modalVisible2: false,
        user_id: 0,
        player_id: 123456,
        admin_email: '',
        template:[{'lang':'Eng'},{'lang':'Arb'}],
        branch:[],
    }
}

componentDidMount(){

         
     //let data={'lang':'Eng','lang':'Arb'};

    //this.setState({ template: data});

    
        firebaseprovider.getAllUsers()
      
}

goHomePage = () => {
    this.props.navigation.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [
                { name: 'Home' },
            ],
        })
    );
}

onValueChange(value){

    console.log('change ' +value)

 }


 selectedValue(value){
    console.log('change ' +value)

 }


 GoogleLogin=(navigation)=>{
   // SocialLoginProvider.btnSocialLoginGoogle(navigation);
   SocialLogin.btnSocialLoginGoogle(navigation);
   
 }


 storeData = async (value) => {

          
    try {
      console.log(value)
      await AsyncStorage.setItem('user_arr', value)
    //  this.getData();
    } catch (e) {
      // saving error
    }
  }


_btnSubmiLogin = () => {
    console.log('login');
 
    console.log('this.state.player_id', this.state.player_id);
    // return false; 
    // alert(this.state.paye);
    Keyboard.dismiss()
    let { email, password } = this.state;
    //remember me=============

    //email============================
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
    //password===================
    if (password.length <= 0) {
        msgProvider.toast(Lang_chg.emptyPassword[config.language], 'center')
        return false
    }
    if (password.length <= 5) {
        msgProvider.toast(Lang_chg.PasswordMinLength[config.language], 'center')
        return false
    }
    if (password.length > 16) {
        msgProvider.toast(Lang_chg.PasswordMaxLength[config.language], 'center')
        return false
    }

    if (this.state.isConnected === true) {
        console.log('state')
        let url = config.baseURL + "login.php";
        var data = new FormData();

        data.append('email', email)
        data.append('password', password)
        data.append("device_type", config.device_type)
        data.append("player_id", this.state.player_id)
        data.append("user_login_type", 0)
        data.append("action_type", 'normal_login')
        data.append("language_id", config.language)
        data.append("country_code", 965)
        data.append("user_type", 1)
        this.setState({ loading: true })
        console.log('user array====', data)
        apifuntion.postApi(url, data).then((obj) => {
            console.log(obj)
            this.setState({ loading: false });
            return obj.json();
        }).then((obj) => {
            console.log('user array', obj)
            //  alert(JSON.stringify(obj))
            if (obj.success == 'true') {
                localStorage.setItemString('guest_user', 'no');
                localStorage.setItemString('password', this.state.password);
                localStorage.setItemString('email', this.state.email);
                if (this.state.checked) {
                    localStorage.setItemString('remember_me', 'yes');
                } else {
                    localStorage.setItemString('remember_me', 'no');
                }
                console.log('password', password);
                console.log('email', email);
                console.log('user data===', obj);
                var user_arr = obj.user_details;
                var email_arr = obj.email_arr;
                let user_type = user_arr.user_type;
                let signup_step = user_arr.signup_step;
                let user_id = user_arr.user_id;
                let email = user_arr.email;
                let otp = user_arr.otp;
                if (user_type == 1) {
                    if (signup_step == 0) {
                        this.setState({
                            modalVisible2: true,
                            user_id: user_id,
                            email: email,
                        })
                        this.onButtonStart();
                    }
                    if (signup_step == 1) {
                        localStorage.setItemString('user_id', JSON.stringify(user_id));
                        this.setState({ modalVisible2: false })
                        localStorage.setItemObject('user_arr', user_arr);
                        this.storeData(user_arr);
                     //   firebaseprovider.firebaseUserCreate();
                      //  firebaseprovider.getMyInboxAllData();
                        this.goHomePage()
                    }

                    // for mail send
                    if (typeof email_arr !== 'undefined') {
                        if (email_arr != 'NA') {
                            this.mailsendfunction(email_arr);
                        }
                    }
                    if (obj.notification_arr != 'NA') {
                        notification.oneSignalNotificationSendCall(obj.notification_arr)
                    }
                }
            } else {
                if (obj.account_active_status == "deactivate") {
                    config.checkUserDeactivate(this.props.navigation);
                    return false;
                }
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                return false;
            }

            
        }).catch((error) => {
            console.log("-------- error ------- " + error);
            this.setState({ loading: false });
        });
    }
    else {
        msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
    }
  

}



render(){
    const  template =this.state.template;
    const { width, height } = Dimensions.get("window");

    console.log(template);

    return(
        <View style={{flex:1}}>
            <ImageBackground
             style={styles.ImageBackground}
             source={backgd}
             imageStyle={styles.ImageBackground_Img}
             >
                 <View  style={styles.lang}   > 
                 <Icon 
  name='globe'
  color='#fff' 
  size={20}
  style={{marginTop:12}}
  />
   <Text style={{color:'#fff',marginTop:12,margin:5}}>
                Eng
            </Text>

<Icon
  name='caret-down'
  color='#fff' 
  size={20}
  style={{marginTop:12}}
  />
              {/* <Picker
            selectedValue={this.state.branch}
            style={{color:'#fff',flex: 0,width: 90,zIndex:5}}
            dropdownIconColor='#fff'
            mode="dropdown"
            itemStyle={{backgroundColor:'#fff'}}
            onValueChange={(itemValue, itemIndex) =>
              this.selectedValue(itemValue)
            }>

          
                {this.state.template.map((item, id) => 
                      {
                      return <Picker.Item key={id} value={item} label={item.lang} style={{color:'#fff',marginRight:100}} />;
                      }
                      )
                }



          </Picker> */}
          </View>

                 <View style={{top:height/3, position:"absolute",paddingHorizontal:20}}>
                     {/* <WelComeNote /> */}

                     <View style={styles.WelComeNote}>
            <Text style={styles.myboat}>
                My Boat
            </Text>
            <Text style={styles.Wlcome}>
                Welcome
            </Text>
        </View>
                     <View>
                         
                         <Text style={styles.Login}>
                             Login
                         </Text>
                         <Input
                            placeholder="Login"
                            containerStyle={styles.Input}
                            inputContainerStyle={styles.Input}
                            placeholderTextColor={Colors.white}
                            inputStyle={{color:Colors.white}}
                             autoCapitalize={false}
                            returnKeyType='done'
                            onSubmitEditing={() => { Keyboard.dismiss() }}
                            onChangeText={(txt) => { this.setState({ email: txt }) }}
                            maxLength={50}
                            minLength={6}
                            value={this.state.email}
                            />
                         <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Input
                                placeholder="Password"
                                containerStyle={styles.Input}
                                inputContainerStyle={styles.Input}
                                placeholderTextColor={Colors.white}
                                inputStyle={{color:Colors.white}}
                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                onChangeText={(txt) => { this.setState({ password: txt }) }}
                                maxLength={16}
                                minLength={6}
                                value={this.state.password}
                                keyboardType='default'
                                secureTextEntry={this.state.HidePassword}

                                />
                            <TouchableOpacity style={{marginLeft:-100,marginTop:-13}}  onPress={()=>this.props.navigation.navigate("Forgot")} >
                                <Text style={styles.FGPASS}>
                                    Forgot Password ?
                                </Text>
                            </TouchableOpacity>
                         </View>
                     </View>
                     <View style={styles.SEC3}>
                         <View style={{alignItems:"center"}}>
                             <TouchableOpacity style={styles.Btn1} onPress={()=>this._btnSubmiLogin()}>
                                 <Text style={styles.Btn1Text}>
                                     Login
                                 </Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.Btn1} onPress={()=>this.props.navigation.navigate("Home")}>
                                 <Text style={styles.Btn1Text} >
                                     Guest
                                 </Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={{marginTop:25}}  onPress={() => Linking.openURL('mailto:myboat667@gmail.com')}>
                                 <Text style={styles.contact_admin}>
                                     Contact admin ?
                                 </Text>
                             </TouchableOpacity>
                         </View>
                         <View style={{height:80,borderWidth:1,borderColor:Colors.white,marginTop:-50,marginHorizontal:20}} />
                         <View style={{alignItems:"center",marginHorizontal:20}}>
                             <TouchableOpacity onPress={()=>this.props.navigation.navigate("SignUp")}>
                                 <Text style={styles.Text1}>Sign Up ?</Text>
                             </TouchableOpacity>
                             <View style={styles.OR}>
                                 <Text style={{fontFamily:FontFamily.bold,color:Colors.orange,fontSize:10}}>OR</Text>
                             </View>
                             <View>
                                 <Text style={styles.Text1}>Sign up with</Text>
                                 <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:24}}>
                                     <TouchableOpacity style={styles.LoginIcon}>
                                         <Icon name="apple" type="fontisto" size={20}  color={Colors.white} />
                                     </TouchableOpacity>
                                     <TouchableOpacity style={styles.LoginIcon}  onPress={()=>this.GoogleLogin(this.props.navigation)}  >
                                        {/* <Icon name="google" type="antdesign" size={20} color={Colors.white}  style={{}} /> */}
                                        <Image  source={google_icon} style={{width:22,height:22}} ></Image>
                                     </TouchableOpacity>
                                 </View>
                             </View>
                         </View>
                     </View>
                 </View>
                 
                 
            </ImageBackground>
        </View>
    )
}
}
const styles=StyleSheet.create({

    pickerIcon: {
        color: '#fff',
        position: "absolute",
        bottom: 15,
        right: 10,
        fontSize: 20
     },
     lang:{
        flexDirection: "row",
        padding:10,
        marginLeft:'75%'
     },
    ImageBackground:{
        height:"100%",
        width:Sizes.width,
        backgroundColor:Colors.black
    },
    ImageBackground_Img:{
        opacity:0.5,
        resizeMode:'cover'
        // height:Sizes.height+100
    },
    myboat:{
        fontFamily:FontFamily.default,
        color:Colors.white
    },
    Wlcome:{
        fontFamily:FontFamily.bold,
        fontSize:42,
        color:Colors.white
    },
    SEC2:{
        position:"absolute",
        top:"40%",
        paddingHorizontal:20
    },
    Login:{
        fontFamily:FontFamily.semi_bold,
        fontSize:28,
        color:Colors.white
    },
    Input:{
        borderBottomColor:Colors.white,
        width:Sizes.width*0.85,
        color:Colors.white
    },
    FGPASS:{
        fontFamily:FontFamily.semi_bold,
        color:Colors.white,
        fontSize:12,
        lineHeight:15
    },
    Btn1:{
        height:48,
        width:175,
        backgroundColor:Colors.orange,
        margin:5,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        elevation:3,
        overflow: 'hidden',
        shadowColor: '#fff',
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    Btn1Text:{
        fontSize:20,
        fontFamily:FontFamily.semi_bold,
        color:Colors.white
    },
    contact_admin:{
        fontFamily:FontFamily.default,
        textDecorationStyle:"solid",
        color:Colors.white,
        textDecorationColor:Colors.white,
        textDecorationLine:"underline"
    },
    SEC3:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    OR:{
        height:30,
        width:30,
        borderRadius:30,
        backgroundColor:Colors.white,
        alignItems:"center",
        justifyContent:"center",
        marginVertical:5
    },
    Text1:{
        fontSize:16,
        fontFamily:FontFamily.semi_bold,
        color:Colors.white
    },
    LoginIcon:{
        height:50,
        width:50,
        borderRadius:25,
        borderColor:Colors.white,
        borderWidth:1.5,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:3,
        shadowColor: '#808080',
        shadowRadius: 10,
        shadowOpacity: 1,
       // box-shadow: 0px 0px 10px 2px ;
    }
})

//export default Login;