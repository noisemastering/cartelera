import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../common/PureFirebase'
import styles from '../../common/styles'

const SignupScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Usuario ${email} creado")
            const user = userCredential.user;
            console.log(user);
            navigation.goBack();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode+" "+errorMessage);
        });
    }

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
                onPress={handleSignUp}
            >
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={()=>{navigation.goBack()}}
            >
                <Text style={styles.buttonOutlineText}>Regresar</Text>
            </TouchableOpacity>
        </View>
       </KeyboardAvoidingView>
    )

}

export default SignupScreen;

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