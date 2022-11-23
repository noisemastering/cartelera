import * as React from 'react';
import {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { MaterialIcons, SimpleLineIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
//import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore, storage } from '../../common/PureFirebase';
import { ref, getDownloadURL } from "firebase/storage";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import styles from '../../common/styles';

const ProfileScreen = ({navigation, route}) => {

    const [signedUser, setSignedUser] = useState({});
    const [canRetrieve, setCanretrieve] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [singnupModalOpen, setSignUpModalOpen] = useState(false);
    const [signed, setSigned] = useState(false);
    const hideModal = () => {
        setModalOpen(false);
    }

    //De inicio vemos si el usuario está firmado
    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(user =>{
            if(user){
                //console.log('The User: ', user)
                setSigned(true);
                setCanretrieve(true);
            }else{
                //Ponemos al usuario en vacío
                setSigned(false);
                setCanretrieve(false);
            }
        })
        return unsuscribe;
    },[])

    //Respondemos cuando tenemos el resultado
    useEffect(() => {
        if(canRetrieve){
            //console.log("Traemos la info");
            getUserDetail(firestore);
        }
    },[canRetrieve])

    useEffect(() => {
        console.log("Entró a changed", route.params?.changed);
        if(route.params?.changed){
            getUserDetail(firestore);
        }
    },[route.params?.changed])

    
    
    
    //Función para traer el resto de la info del usuario
    const getUserDetail = async (db) => {
        //const docRef = doc(db, "users", auth.currentUser.uid);
        const starsRef = ref(storage, `images/${auth.currentUser.uid}`);
        const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
            getDownloadURL(starsRef).then(url => {
                console.log('URL: ', url);
                console.log("Current data: ", doc.data());
                let retrievedUser = {
                    uid: auth.currentUser.uid,
                    username: doc.data().username,
                    email: auth.currentUser.email,
                    name: doc.data().name,
                    level: doc.data().level,
                    phoneNumber: doc.data().phoneNumber,
                    city: doc.data().city,
                    avatar: url
                }
                console.log('User: ',retrievedUser)
                setSignedUser(retrievedUser)
            })
        });
        return;
    }


    const handleSignOut = () => {
        if(auth){
            auth.signOut().then(() => {
                setSignedUser({
                    uid: 0,
                    username: 'Usuario desconocido',
                    email: 'Email desconocido',
                    name: 'Desconocido',
                    level: '0',
                    phoneNumber: 'xxxx-xxxx',
                    city: 'desconocido',
                    avatar: ''
                });
            }).catch((error) => {
              alert(error.message);
            })
        }
    }

    //Render buttons
    const renderButton = (buttonToRender) => {

        switch (buttonToRender){
            case 'signIn': 
                return (<TouchableOpacity
                    style={[styles.button]}
                    onPress={() => navigation.push('Login')}
                    >
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </TouchableOpacity>)
                break;    
            case 'signOut':
                return(<TouchableOpacity
                    style={[styles.button, styles.buttonOutline]}
                    onPress={handleSignOut}
                    >
                        <Text style={styles.buttonOutlineText}>Salir</Text>
                    </TouchableOpacity>)
                break;
            case 'signUp':
                return(
                    <TouchableOpacity
                            style={[styles.button, styles.buttonOutline]}
                            onPress={() => navigation.push('SignUp')}
                        >
                            <Text style={styles.buttonOutlineText}>Registro</Text>
                        </TouchableOpacity>
                )
                break;
            case 'edit':
                return(<TouchableOpacity
                    style={[styles.button]}
                    onPress={() => navigation.push('Edit',{
                        signedUser
                    })}
                    >
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>)
                break;
        }

    }

    return (
        <View style={styles.profileContainer}>
            <ScrollView>
                <View style={localStyles.profileTop}>
                    <Image
                        style={styles.userImage}
                        source={{uri: signedUser.avatar}}
                    />
                    <Text 
                        style={{
                            fontSize: 18,
                            padding: 10
                        }}
                    >{signedUser.name}</Text>
                </View>
                <View style={styles.spacer}/>
                <View style={localStyles.profileRow}>
                    <Text style={{paddingTop: 1, paddingRight: 7}}><MaterialIcons name="email" size={24} color="black" /></Text>
                    <Text style={localStyles.profileTextRow}>
                        Email: <Text>{signedUser.email}</Text>
                    </Text>
                </View>
                <View style={styles.spacer}/>
                <View style={localStyles.profileRow}>
                    <Text style={{paddingTop: 1, paddingRight: 7}}><FontAwesome name="user-circle-o" size={24} color="black" /></Text>
                    <Text style={localStyles.profileTextRow}>Usuario: <Text>{signedUser.username}</Text></Text>
                </View>
                <View style={styles.spacer}/>
                <View style={localStyles.profileRow}>
                    <Text style={{paddingTop: 1, paddingRight: 7}}><SimpleLineIcons name="badge" size={24} color="black" /></Text>
                    <Text style={localStyles.profileTextRow}>Nivel: <Text>{signedUser.level}</Text></Text>
                </View>
                <View style={styles.spacer}/>
                <View style={localStyles.profileRow}>
                    <Text style={{paddingTop: 1, paddingRight: 7}}><FontAwesome5 name="phone-alt" size={24} color="black" /></Text>
                    <Text style={localStyles.profileTextRow}>Teléfono: <Text>{signedUser.phoneNumber}</Text></Text>
                </View>
                <View style={styles.spacer}/>
                <View style={localStyles.profileRow}>
                    <Text style={{paddingTop: 1, paddingRight: 7}}><MaterialIcons name="location-city" size={24} color="black" /></Text>
                    <Text style={localStyles.profileTextRow}>Ciudad: <Text>{signedUser.city}</Text></Text>
                </View>
                <View style={styles.spacer}/>
                <View style={localStyles.buttonsRow}>
                    <View style={localStyles.profileRow}>
                        <Text style={{paddingTop: 1, paddingRight: 7}}><FontAwesome name="user-times" size={24} color="black" /></Text>
                    </View>
                    <View style={localStyles.buttonsContainer}>
                    {signed
                        ? renderButton('edit')
                        : renderButton('signIn')
                    }
                    {signed
                        ? renderButton('signOut')
                        : renderButton('signUp')
                    }   
                    </View>
                </View>
            </ScrollView>
        </View>
    )

}


export default ProfileScreen;

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
})