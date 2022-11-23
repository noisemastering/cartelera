import * as React from 'react';
import { StyleSheet } from 'react-native';

const styles = 
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#CCC',
                justifyContent: 'center',
                alignItems: 'center'
            },
            containerForScroll: {
                flex: 1,
                backgroundColor: '#CCC',
                justifyContent: 'center',
                alignItems: 'flex-start'
            },
            posterContainer:{
                marginTop: 5
            },
            posterImage:{
                marginTop: 5,
                width: '100%',
                height: undefined,
                aspectRatio: 2 / 3,
            },
            inputContainer: {
                width: '80%'
            },
            eventInfoContainer:{
                flexDirection:'row',
                marginTop: 5,
                marginLeft: 10,
                padding: 5,
                width: '100%'
            },
            eventTitleContainer:{
                flexDirection:'column',
                marginTop: 0,
                marginLeft: 10,
                padding: 5,
                width: '100%'
            },
            labelDateEvent:{
                marginTop: 2,
                padding: 0,
                marginLeft: 3,
                fontWeight: '600',
                fontSize: 16,
            },
            labelEvent:{
                padding: 0,
                marginLeft: 10,
                fontWeight: '500',
                fontSize: 16,
            },
            descEvent:{
                padding: 0,
                margin: 10,
                fontSize: 14,
            },
            labelEventTitle:{
                padding: 5,
                marginLeft: 0,
                fontWeight: '500',
                fontSize: 18
            },
            labelEventCatergory:{
                padding: 5,
                marginLeft: 0,
                fontWeight: '300',
                fontSize: 14
            },
            labelIcon:{
                padding: 0
            },
            buttonContainer: {
                width: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40
            },
            input: {
                backgroundColor: 'white',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 10,
                marginTop: 5,
                marginLeft: 10,
                marginRight: 10,
                height: 50,
                fontSize: 18,
            },
            errorText:{
                color: 'red',
                fontSize: 14,
                padding: 5,
                marginLeft:10,
                marginTop: 5
            },
            button: {
                backgroundColor: '#57CC99',
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                borderRadius: 10
            },
            buttonOutline: {
                backgroundColor: 'white',
                borderColor: '#57CC99',
                borderWidth: 2
            },
            buttonOutlineText: {
                color: '#57CC99',
                fontWeight: '700',
                fontSize: 16
            },
            buttonText: {
                color: 'white',
                fontWeight: '700',
                fontSize: 16
            },
            userImage: {
                height: 60,
                width: 60,
                borderRadius: 50,
                backgroundColor: 'transparent'
            },
            spacer:{
                margin: 0,
                height: 20,
                width: '100%',
                backgroundColor: 'transparent'
            }
        });

export default styles