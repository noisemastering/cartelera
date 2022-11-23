import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { auth, firestore, storage } from '../../common/PureFirebase';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AntDesign } from '@expo/vector-icons';
import styles from '../../common/styles';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import * as yup from 'yup'

const profileSchema = yup.object({
    username: yup.string().required().min(4), 
    name: yup.string().required().min(3), 
    phoneNumber: yup.string().required().length(10), 
    city: yup.string().required().min(2)
})


const EditProfileScreen = ({navigation, route}) => {

    const [signedUser, setSignedUser] = useState(route.params.signedUser);
    const [image, setImage] = useState(route.params.signedUser.avatar);
    const [changed, setChanged] = useState(false);

    const addImage = async () => { 
        setChanged(true)
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });
        console.log(_image);
        if (!_image.cancelled) {
            setImage(_image.uri);
          }
    }

    const handleSubmit = (values) => {
        const docData = {
            username: values.username,
            name: values.name,
            level: 0,
            modificado: new Date(),
            phoneNumber: values.phoneNumber,
            city: values.city
        };
        const docRef = doc(firestore, "users", signedUser.uid);
        setDoc(docRef, docData)
        .then(() => {
            updateProfile(auth.currentUser, {
                displayName: values.name
              }).then(() => {
                    uploadImage(image)
                    console.log("Document has been added successfully");
              }).catch((error) => {
                console.log(error);
              });
            
        })
        .catch(error => {
            console.log(error);
        })

        
    }

    const uploadImage = async (theImage) => {

        const response = await fetch(theImage);
        const file = await response.blob();
        const storageRef = ref(storage, `images/${signedUser.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;

            // ...

            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                navigation.goBack({
                    params: { changed: true },
                    merge: true,
                  });
                navigation.goBack();
            });
        }
        );
    }

    return (
        <View style={styles.profileContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
                <View style= {localStyles.profileTop}>
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
                <View style={styles.spacer}/>
                    <Formik
                        initialValues={{
                            username: signedUser.username, 
                            name: signedUser.name, 
                            phoneNumber: signedUser.phoneNumber, 
                            city: signedUser.city
                        }}
                        validationSchema= {profileSchema}
                        onSubmit={(values, actions) => {
                            actions.resetForm();
                            handleSubmit(values)
                        }}
                    >
                        {(props) => (
                            <View>
                                <TextInput
                                    style= {styles.input}
                                    placeholder='Nombre de usuario'
                                    onChangeText= {props.handleChange('username')}
                                    value={props.values.username}
                                    onBlur= {props.handleBlur('username')}
                                />
                                <Text style={styles.errorText}>{ props.touched.username && props.errors.username }</Text>
                                <View style={styles.spacer}/>
                                <TextInput
                                    style= {styles.input}
                                    placeholder='Nombre'
                                    onChangeText= {props.handleChange('name')}
                                    value={props.values.name}
                                    onBlur= {props.handleBlur('name')}
                                />
                                <Text style={styles.errorText}>{ props.touched.name && props.errors.name }</Text>
                                <View style={styles.spacer}/>
                                <TextInput
                                    style= {styles.input}
                                    placeholder='Teléfono'
                                    onChangeText= {props.handleChange('phoneNumber')}
                                    value={props.values.phoneNumber}
                                    onBlur= {props.handleBlur('phoneNumber')}
                                    keyboardType= 'numeric'
                                />
                                <Text style={styles.errorText}>{ props.touched.phoneNumber && props.errors.phoneNumber }</Text>
                                <View style={styles.spacer}/>
                                <TextInput
                                    style= {styles.input}
                                    placeholder='Ciudad'
                                    onChangeText= {props.handleChange('city')}
                                    value={props.values.city}
                                    onBlur= {props.handleBlur('city')}
                                />
                                <Text style={styles.errorText}>{ props.touched.city && props.errors.city }</Text>
                                <View style={styles.spacer}/>
                                <View style={localStyles.buttonsRow}>
                                    <View style={localStyles.buttonsContainer}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={props.handleSubmit}
                                    >
                                        <Text style={styles.buttonText}>Enviar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonOutline]}
                                        onPress={() => navigation.goBack()}
                                        >
                                            <Text style={styles.buttonOutlineText}>Regresar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    </Formik>
            </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    )

}
export default EditProfileScreen

const localStyles= StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#CCC'
    },
    profileTop: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        marginTop: 0,
        padding: 15,
        alignItems: 'center'
        
    },
    profileRow: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        marginTop: 0,
        padding: 15,
        alignItems: 'center'
        
    },
    profileTextRow:{
        fontSize: 14
    },
    buttonsRow: {
        backgroundColor: '#FFF',
        marginTop: 0
    },
    buttonsContainer: {
        flex: 1,
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});

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