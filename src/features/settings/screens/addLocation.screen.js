import React, { useState, useRef, useContext } from 'react';
import { Link, NativeRouter, Route,Redirect, Routes  } from "react-router-native";

//import { collection, addDoc } from "firebase/firestore";
//import * as firebase from 'firebase/app';
import firebase from 'firebase/compat/app'

import 'firebase/compat/storage'

import uuid from "uuid";
//import { firebaseA } from '../../../services/authentication/authentication.context';

import 'firebase/compat/firestore';
import { getFirestore, collection, addDoc, query, where, getDoc, doc, getDocs, setDoc  } from "firebase/firestore";
import { db } from '../../../services/authentication/authentication.context';
import { Camera } from "expo-camera";
import * as Location from 'expo-location';


import { CameraScreen } from '../../account/screens/camera.screen';
import { TodoContainer } from './styleLoc';
import { Todo } from './styleLoc';
import { List, Avatar } from "react-native-paper";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { LocationContext } from '../../../services/location/location.context';

import { colors } from '../../../infrastructure/theme/colors';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Alert,
    Image
    
  } from 'react-native';
  import styled from "styled-components/native";
  import { SafeArea } from "../../../components/utility/safe-area.component";
  import * as ImagePicker from 'expo-image-picker';

  import { Button } from 'react-native-elements';
import { AddLocationNavigator } from '../../../infrastructure/navigation/addLocation.navigator';
import { Header } from './styleLoc';
import { Todocontent } from './styleLoc';
import { Btncontainer } from './styleLoc';
import { Btn } from './styleLoc';
import { async } from '@firebase/util';

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;



export const AddLocationScreen = ({navigation}) => {
  const { keyword, area, city } = useContext(LocationContext);

  const [image, setImage] = useState(null)
  const [img, setImg] = useState(null)

  
  const [uploading, setUploading] = useState(false);

     const [todo, setTodo] = useState("")

     const [mahalAddress, setMahalAddress]= useState("")
     const [TaghsosProducts, setTaghsosProducts]= useState("")
     const [mahalTaghsos, setMahalTaghsos]= useState("")
     const [phone1, setPhone1]= useState("")
     const [phone2, setPhone2]= useState("")
     const [note, setNote]= useState("")

     
     const cameraRef = useRef();
     const [permission, requestPermission] = useState('')

     const { user } = useContext(AuthenticationContext);
     const [photomahal, setPhoto ] = useState(null);
     const [locations, setMapLocation] = useState([]);
     const [location, setLocation] = useState(null);

     const MahalCamera = styled(Camera)`
    width: 30%;
    height: 30%;
   
`;
 


const [pin, setPin] = useState({
  latitude: 15.3255132,
  longitude:44.225112
})
const InnerSnap = styled.View`
  width: 100%;
  height: 50%;
  z-index: 999;
`;
const AvatarContainer = styled.View`
  align-items: center;
`;
/*
const snap = async () => {
  if (cameraRef) {
    const photomahal = await cameraRef.current.takePictureAsync();
    console.log(photomahal.uri);
    setPhoto(photomahal.uri);
    requestPermission(Camera.useCameraPermissions())
    if (!permission) console.log('لم تمنح صلاحيات الكاميرا')
    //navigation.goBack();

  }
};
*/
      const pickImage = async () => {
        console.log("keyword city:", city)
        console.log("area:", area)

        //const result = await ImagePicker.launchImageLibraryAsync({
          const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing:true,
          //aspect: [1,4],
          aspect: [4,3],
          quality:0,
        });

        console.log(result);
        getLoc()
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

      const uploadImage = async () => {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', image, true);
          xhr.send(null);
        })
        //const ref = firebase.storage().ref().child(`Pictures/Image1`)
        const ref = firebase.storage().ref().child(`Pictures/`+image)
    
        const snapshot = ref.put(blob)
        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            setUploading(true)
          },
          (error) => {
            setUploading(false)
            console.log(error)
            blob.close()
            return 
          },
          () => {
            snapshot.snapshot.ref.getDownloadURL().then((url) => {
              setUploading(false)
              console.log("Download URL: ", url)
              setImage(url)
              blob.close()
              return url
            })
          }
          )
      };

   

      const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          console.log(errorMsg)
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setPin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
        setLocation(location);
        console.log('location:',location)
        console.log("pin", pin)
      
      }
      
      const addTodo = async (e) => {
          e.preventDefault();
          getCurrentLocation();
          try {

            //const citiesRef = collection(db, "todos");
            //const citiesRef = collection(db, "mocks");
            //const citiesRef = collection(db, "mocks");

            //const docRef = await setDoc(collection(db, "todos"), {
              /*
              const docRef = setDoc(doc(citiesRef,todo), {
              todo: todo,
              mahalAddress: mahalAddress,
              mahalTaghsos: mahalTaghsos,
              phone1: phone1,
              phone2: phone2,
              note: note,
              imageUrl: image,
              latitude: pin.latitude,
              longitude: pin.longitude
            });
            */
           //const docRef = setDoc(doc(citiesRef,"antwerp"), {
          // Create an initial document to update
          //const newCityRef = collection(db, "mocks").doc('antwerp').collection('hadaArea').doc('street1')
          //const docRef = setDoc(doc(citiesRef,"antwerp"), {
           
            //const docRef = setDoc(doc(citiesRef,"antwerp"), {
              /* صالح بيانات اوبجكت
              const docRef = setDoc(doc(db, "mocks","antwerp",'hadaArea',"mahal"), {
              
              name: todo,
              address: mahalAddress,
              //mahalTaghsos: mahalTaghsos,
              //phone1: phone1,
             // phone2: phone2,
             // note: note,
              photos: image,
              location: [
               pin.latitude,
                pin.longitude
              ],
            
          })
          */
      
          const data = 
            {
            "name": todo,
            "address": mahalAddress,
            mahalTaghsos: mahalTaghsos,
            TaghsosProducts: TaghsosProducts,
            phone1: phone1,
            phone2: phone2,
            note: note,
            "photos": image,
            "location" : [
              {
             "latitude" : pin.latitude,
              "longitude" : pin.longitude
              }
            ],
          }
          
          /* add fields
          const citiesRe = collection(db, 'antwerp');

          addDoc(collection(citiesRe, 'SF', 'landmarks'), {
            name: 'Legion of Honor',
            type: 'museum'
        }),
        */
     
      
        /*
        const docRef = addDoc(collection(db,"mocks","antwerp", 'taizstr'), {
          data
       })
       */
       //const docRef = collection(db,"hadaStreet")
      // const docRef = collection(db,"sanaa", "hadastreet", todo)
      //صالح
       //const docRef = collection(db,"sanaa", "hadastreet", "hadastreet")

       // السابق صالح
       //const docRef = collection(db,keyword, area, area)

       const docRef = collection(db,city, area, area)
       addDoc(docRef, data)
       .then(docRef => {
           console.log("Document has been added successfully");
       })
       .catch(error => {
           console.log(error);
       })

             // const docRef = setDoc(doc(db, "mocks","antwerp",'hadaArea',todo),data)
             
            console.log("Document written with ID: ", docRef.id);

          } catch (e) {
            console.error("Error adding document: ", e);

          }
       
        };

        // get data from locations
        const getLoc = async () => {
          const docRef = doc(db, "locations", "taizstr");
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            //setLoc(docSnap.data().imageUrl)
            console.log("Document data taizstr:", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    }

        const getImage = async () => {
          const docRef = doc(db, "todos", todo);
          //const docRef = doc(db, "todos", "todos");

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setImg(docSnap.data().imageUrl)
            console.log("Document data:", docSnap.data().imageUrl);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    }
      return (
        <SafeAreaView style={styles.container}>     
          
                <Text>
                    Todo-App
                </Text>
                <ScrollView style={styles.scrollView}>
                <TextInput style={styles.input}
                    placeholder="اسم المحل"
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    onChangeText={todo => setTodo(todo)}
                    value= {todo}
                />
                 <View style={styles.viweMultiline}>
                <TextInput 
                    placeholder="عنوان المحل"
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    multiline
                    onChangeText={mahalAddress => setMahalAddress(mahalAddress)}
                    value= {mahalAddress}
                />
                </View>

                   <TextInput 
                    placeholder="تخصص المحل"
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    defaultValue='شامل'
                    onChangeText={mahalTaghsos => setMahalTaghsos(mahalTaghsos)}
                    value= {mahalTaghsos}

                />
                    <TextInput 
                    placeholder="اصناف المنتجات"
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    defaultValue='بطاريات'
                    onChangeText={TaghsosProducts => setTaghsosProducts(TaghsosProducts)}
                    value= {TaghsosProducts}

                />
                   <TextInput 
                    placeholder="رقم التلفون"
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    
                    onChangeText={phone1 => setPhone1(phone1)}
                    value= {phone1}
                />
                 <TextInput 
                    placeholder="رقم التلفون"
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    onChangeText={phone2 => setPhone2(phone2)}
                    value= {phone2}
                />
                <Text>
                    حمل صورة المحل
                </Text>
                <View style={styles.viweMultiline}>
                <TextInput 
                    placeholder="ملاحظات"
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    multiline
                    width='80%'
                    onChangeText={note => setNote(note)}
                    value= {note}
                />
                </View>
                <StatusBar barStyle="dark-content" />
      <View style={styles.imageContainer}>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage} >
          <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>

        {image && <Image source={{uri: image}} style={{ width:300, height:300}} />}
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.buttonText}>
            Upload Image
          </Text>
        </TouchableOpacity>
        {img && <Image source={{uri: img}} style={{ width:300, height:300}} />}

           <TouchableOpacity style={styles.uploadButton} onPress={getImage}>
          <Text style={styles.buttonText}>
            Get Data
          </Text>
        </TouchableOpacity>
        <Button
             title="حفظ"
             type="solid"
             onPress= {addTodo} 
                />
         
      </View>
      </ScrollView>
  
    </SafeAreaView>
    
      )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor: '#ffffff',
    },
    input: {
      width: 300,
      height: 44,
      padding: 10,
      marginTop: 20,
      marginBottom: 10,
      backgroundColor: '#e8e8e8'
    },
   viweMultiline: {
    backgroundColor: colors.ui.secondary,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
   },
    selectButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#8ac6d1',
      alignItems: 'center',
      justifyContent: 'center'
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 300,
      height: 300
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
      horizontal: true,
      vertical: true
    },
  });
