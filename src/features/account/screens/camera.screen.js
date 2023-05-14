import React, {useEffect, useRef, useState, useContext} from "react";
import { Camera } from "expo-camera";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";

const MahalCamera = styled(Camera)`
    width: 100%;
    height: 100%;
   
`;

const InnerSnap = styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
`;
export const CameraScreen = ({navigation}) => {
    //const [permission, requestPermission] = Camera.useCameraPermissions();

    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef();
    
    const { user } = useContext(AuthenticationContext);

    const snap = async () => {
        if (cameraRef) {
          const photo = await cameraRef.current.takePictureAsync();
          console.log(photo);
          AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
          navigation.goBack();

        }
      };
    
      useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === "granted");
        })();
      }, []);
    
      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
    return (
      <MahalCamera
      ref={(camera) => {(cameraRef.current = camera)}}
      type={Camera.Constants.Type.front}
      >
      <TouchableOpacity onPress={snap}>
      <InnerSnap />
      </TouchableOpacity>
      </MahalCamera>
    );
} 