import React, { useState } from 'react';
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
    Icon,
    Input,
    Card,
    Rating,
    AirbnbRating
} from 'react-native-elements';
import Header, { s } from '../../Components/Header';
import { back_img4, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import {Switch} from 'react-native-elements'


const Noti_Setting=()=>{
    const [sw,setsw]=useState(false)
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header
             backBtn={true}
             imgBack={true}
             headerHeight={300}
             />
             <View style={styles.SEC2}>
                 <View style={{marginTop:30}}>
                     {/* 1 */}
                    <View style={{marginBottom:1}}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                On Going Notifications
                                </Text>
                            </View>
                            <View>
                            <Switch
                                value={sw}
                                onChange={() => setsw(!sw)}
                                color="#fff"
                                trackColor={{
                                    true:Colors.orange,
                                    false:Colors.gray
                                }}
                                />
                            </View>
                            </View>
                        </Card>
                    </View>
                    {/* 2 */}
                    <View style={{marginBottom:1}}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                Chat Notifications
                                </Text>
                            </View>
                            <View>
                            <Switch
                                value={sw}
                                onChange={() => setsw(!sw)}
                                color="#fff"
                                trackColor={{
                                    true:Colors.orange,
                                    false:Colors.gray
                                }}
                                />
                            </View>
                            </View>
                        </Card>
                    </View>
                    {/* 3 */}
                    <View style={{marginBottom:1}}>
                        <Card containerStyle={{height:50,paddingVertical:2,justifyContent:"center",borderRadius:12}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:14,fontFamily:FontFamily.semi_bold,marginHorizontal:7}}>
                                Promotion
                                </Text>
                            </View>
                            <View>
                            <Switch
                                value={sw}
                                onChange={() => setsw(!sw)}
                                color="#fff"
                                trackColor={{
                                    true:Colors.orange,
                                    false:Colors.gray
                                }}
                                />
                            </View>
                            </View>
                        </Card>
                    </View>
                    {/*  */}
                 </View>
             </View>
        </View>
    )
}
const styles=StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        marginTop:-30,
        borderTopLeftRadius:30,
        borderTopEndRadius:30,
        flex:1,
        height:100
    },
})
export default Noti_Setting;