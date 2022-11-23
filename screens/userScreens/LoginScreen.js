import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../common/PureFirebase'
import styles from '../../common/styles'

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            console.log('Mirlette: ', user)
            navigation.goBack();
        })
        .catch(error => {
            alert(error.message)
        })
    }

    const resetPassword =  () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Contraseña enviada, revise su email")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode+' '+errorMessage)
        });
      };

    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
       >
        <View style={localStyles.headerTextContainer}>
            <Text style={localStyles.headerText}>Ingrese sus credenciales</Text>
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder= "Email"
                style={styles.input}
                value= {email}
                onChangeText= {text => setEmail(text)}
            />
            <View style={{height: 10}}></View>
            <TextInput
                placeholder= "Contraseña"
                style={styles.input}
                secureTextEntry
                value= {password}
                onChangeText= {text => setPassword(text)}
            />
        </View>
        <View style={localStyles.buttonsContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignIn}
            >
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={()=>{navigation.goBack()}}
            >
                <Text style={styles.buttonOutlineText}>Regresar</Text>
            </TouchableOpacity>
        </View>
        <View style={localStyles.buttonsContainer}>
        <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={resetPassword}
            >
                <Text style={styles.buttonOutlineText}>Restablecer contraseña</Text>
            </TouchableOpacity>
        </View>
       </KeyboardAvoidingView>
    )

}

export default LoginScreen;

const localStyles= StyleSheet.create({
    headerTextContainer: {
        padding: 15
    },
    headerText: {
        fontSize: 24
    },
    buttonsContainer: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})