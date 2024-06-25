import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import messaging from '@react-native-firebase/messaging';

export default function App(){

  const[token,setToken] = useState();

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log(token);
      setToken(token);
    }
  }

  useEffect(()=>{
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  },[])

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>Hello world</Text>
      {token && <Text style={{width:"90%"}}>Device token : {token}</Text>}
    </View>
  )
}