import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../common/styles';

const EditProfileImageScreen = ({route, navigation}) => {

    const [image, setImage] = useState(null);

    useEffect(() => {
        checkForCameraRollPermission()
        console.log('Current image', image)
      }, []);

    const addImage = async () => { 
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });
        console.log(_image);
        if (!_image.cancelled) {
            setImage(_image.uri);
            //console.log('Picked image', image)
            //navigation.goBack({newUri: image});
          }
    }

    const  checkForCameraRollPermission = async () => {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert("Please grant camera roll permissions inside your system's settings");
        }else{
          console.log('Media Permissions are granted')
        }
  }

    return(
        <View style={styles.container}>
            <View style={imageUploaderStyles.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    );

} 
export default EditProfileImageScreen

const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})