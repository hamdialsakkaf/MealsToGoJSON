import React, { useState, useRef, useContext, useEffect } from 'react';

//import { collection, addDoc } from "firebase/firestore";
//import * as firebase from 'firebase/app';
import firebase from 'firebase/compat/app'

import 'firebase/compat/storage'

//import { firebaseA } from '../../../services/authentication/authentication.context';

import 'firebase/compat/firestore';
import { getFirestore, collection, addDoc, query, where, getDoc, doc, getDocs, setDoc  } from "firebase/firestore";
import { db } from '../../../services/authentication/authentication.context';
import * as Location from 'expo-location';
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { LocationContext } from '../../../services/location/location.context';

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList
} from 'react-native';


import { TodoContainer } from './styleLoc';
import { List, Avatar } from "react-native-paper";

import { colors } from '../../../infrastructure/theme/colors';
  import styled from "styled-components/native";
  import { Picker } from '@react-native-picker/picker';
  import { Button } from 'react-native-elements';


const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;



export const AddInvoiseScreen = ({navigation}) => {
    const { email }= useContext(AuthenticationContext)

  const { keyword, area, city } = useContext(LocationContext);


    // const [todo, setTodo] = useState("")

     const [mahalName, setMahalName]= useState("")
     //const [email, setEmail]= useState("")
     //const [city, setCity]= useState("")
     const [selectedClass, setSelectedClass] = useState("");
     const [selectedItems, setItems] = useState([]);
     const [product, setProduct]= useState("")

     const [item, setItem]= useState("")
     const [quantity, setQuantity]= useState('')
     const [prise, setPrise]= useState('')
     const [notes, setNotes]= useState("")
     const [invoisePrise, setInvoisePrise]= useState('الاجمالي')

    const suminvoise = async () => {
      const suminvoise =  parseInt(prise) * parseInt(quantity)
      //const suminvoise = 50;
      console.log('suminvoise:',suminvoise.toString())
      setInvoisePrise(suminvoise.toString())

      //return suminvoise
    }
    /*
     useEffect(()=> {
      suminvoise()
      
     },[quantity])
     */

     
     //const [photomahal, setPhoto ] = useState(null);
     //const [locations, setMapLocation] = useState([]);
     //const [location, setLocation] = useState(null);


 /*
const [pin, setPin] = useState({
  latitude: 15.3255132,
  longitude:44.225112
})
const InnerSnap = styled.View`
  width: 100%;
  height: 50%;
  z-index: 999;
`;
*/
const AvatarContainer = styled.View`
  align-items: center;
`;

const getItems = async () => {
  console.log('selectedClass:', selectedClass)

  //const docRef = doc(db, "items", selectedClass,selectedClass);
  const docRef = collection(db,"items", selectedClass,selectedClass)
  //const docSnap = await  getDoc(docRef);
  const docSnap = await  getDocs(docRef);
  const items = docSnap.docs.map(doc => doc.data())
  setItems(items);
  //setProducts(items)
  console.log('selectedItems:', selectedItems)
  //return items
  //console.log('products:', products)

  //console.log("locations docSnap docSnap:", docSnap.data());
  //if (docSnap) {
  /*
    return new Promise((resolve, reject) => {
      const items = docSnap.docs.map(doc => doc.data() )
      setItems(items);
      setProducts(items)

      console.log('selectedItems:', selectedItems)
      if (!items) {
        reject("not found");
      }
      resolve(items);
    })
    */
  //}
  // صالح
    //const docRef = doc(db, "items", selectedClass);
    //const docRef = doc(db, "todos", "todos");
  //console.log('selectedClass:', selectedClass.toString())
  //setClass(selectedClass);
     // console.log('selectedClass:', selectedClass);

    //const docSnap = await getDoc(docRef);

    //if (docSnap.exists()) {
      //if (docSnap) {

  
    // شغال مع ارورا
      //setItems(docSnap.data().aurora);
      //شغال مع selectedClass
      //setItems(docSnap.data());
      /*
      //setItems(docSnap);
      //console.log('selectedItems:', selectedItems)
      //const locationString = `${location.viewport[0].location[0].latitude},${location.viewport[0].location[0].longitude}`;
      //const locationString =[ `${selectedItems[selectedClass]}`];
      //setProducts(locationString)
      console.log('products', products)

      console.log('locationString:', locationString)


      ////data2 = docSnap.data()
     // setItems(data2);
      //console.log("Document data selectedClass:", docSnap.data());
     // console.log("Document data selected Items:", docSnap.data());

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    //return docSnap.data()
    */
}

      const addInvoise = async (e) => {
          e.preventDefault();
          try {
      
          const data = 
            {
            //"name": todo,
            "mahalName": mahalName,
            "email": email,
            "city": city,
            "class1": selectedClass,
            "product": product,
            "quantity": parseInt(quantity),
            "prise": parseInt(prise),
            "invoisePrise":invoisePrise,
            "notes": notes,
          }
          
          console.log('data:', data)
       //const docRef = collection(db,"hadaStreet")
      // const docRef = collection(db,"sanaa", "hadastreet", todo)
      //صالح
       //const docRef = collection(db,"sanaa", "hadastreet", "hadastreet")
       const docRef = collection(db,"invoices")
       addDoc(docRef, data)
       .then(docRef => {
           console.log(" تم حفظ الفاتورة بنجاح");
           alert('تم حفظ الفاتروة بنجاح')
           setMahalName('');
           setQuantity('')
           setPrise('')

       })
       .catch(error => {
           console.log(error);
       })

             // const docRef = setDoc(doc(db, "mocks","antwerp",'hadaArea',todo),data)
             
            console.log("تم حفظ الفاتورة بنجاح", docRef.id);

          } catch (e) {
            console.error("Error adding document: ", e);

          }
       
        };

     
         
        const products = () => {
          return selectedItems.map(element => {
            return (
                <Picker.Item label={element.name} value={element.name} key={element.name} /> 
              
            );
          });
        };
    
      

      return (
        <SafeAreaView style={styles.container}>       
                <Text>
                    Invoises
                </Text>
                <ScrollView style={styles.scrollView}>
              
                 <View style={styles.viweMultiline}>
                <TextInput 
                    placeholder="اسم المحل"
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    multiline
                    onChangeText={mahalName => setMahalName(mahalName)}
                    value= {mahalName}
                />
                </View>
                   <TextInput 
                    placeholder=" ايميل المستخدم"
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    defaultValue='الايميل'
                    onChangeText={email => setEmail(email)}
                    value= {email}

                />
                   <TextInput 
                    placeholder="المدينة"
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    
                    onChangeText={city => setCity(city)}
                    value= {city}
                />
              
                <Picker
                selectedValue={selectedClass}
                //onTouchMove={getItems}
                onBlur={getItems}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedClass(itemValue)
                    //getItems(itemValue)
                }
                
                >
                 <Picker.Item label="اختر فئة" />
                <Picker.Item label="بطاريات ارورا" value="aurora" key="aurora" />
                <Picker.Item label="اطارات جي تي" value="GT" key="GT" />
                <Picker.Item label="اطارات Giti " value="Giti" key="Giti" />
                </Picker>  
                <Picker
                    selectedValue={product}
                    onValueChange={(itemValue, itemIndex) =>
                      setProduct(itemValue)
                      //getItems(itemValue)
                  }
                    > 
                    
                  {   
                  products()     
                  /*     
                  selectedItems.map((i) => {
                    
                   return(
                      <Picker.Item label={i.name} value={i.name} key={i} />  
                   )
                   })   
     */
                }      
                 </Picker>  
                
                 <TextInput 
                    
                    placeholder=" سعر الحبة "
                    
                    keyboardType="number-pad"
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    onChangeText={prise => setPrise(prise)}
                    value= {prise}
                  
                />
                
                 <TextInput 
                    placeholder=" الكمية "
                    keyboardType="number-pad"
                    //onPointerLeave={suminvoise}
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    onChangeText={quantity => setQuantity(quantity)}
                    onBlur={suminvoise}
                    //onChangeText={suminvoise}

                    //onChangeText={quantity => setQuantity(quantity)}
                    value= {quantity}
                   
                />
             
                <TextInput 
                  
                  keyboardType="number-pad"
                  // placeholder=" اجمالي الفاتورة "
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    //onChangeText={suminvoise}
                    value= {invoisePrise}
                  
                />
         
                 <TextInput 
                    placeholder=" ملاحظات  "
                    //onChangeText={(e)=>setTodo(e.target.value)}
                    onChangeText={notes => setNotes(notes)}
                    value= {notes}
                />  
          <Button
             title="اصدار فاتورة"
             type="solid"
             onPress= {addInvoise} 
                />
                <StatusBar barStyle="dark-content" />
    
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
