import  React, {useState, useRef} from 'react';
import { Camera } from "expo-camera";
import { firebase } from '../../../services/authentication/authentication.context';

import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
 
    Image
  } from 'react-native';
  import * as ImagePicker from 'expo-image-picker';


export  const UploadScreen = ( props ) => {

  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    //const result = await ImagePicker.launchImageLibraryAsync({
      const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect: [4,3],
      quality:0,
    });

    console.log(result);
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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage} >
          <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image && <Image source={{uri: image}} style={{ width:300, height:300}} />}
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.buttonText}>
            Upload Image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadButton} onPress={props.displaySecrete(2+1)}>
        <Text style={styles.buttonText}>
          {props.name} Show Secret
        </Text>
      </TouchableOpacity>

      </View>
    </SafeAreaView>
  )

};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#bbded6',
      justifyContent:'center'
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
    }
  });

  
