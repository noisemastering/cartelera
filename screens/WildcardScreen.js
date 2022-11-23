import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const WildcardScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is Wildcard 1</Text>
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Regresar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default WildcardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#57CC30',
        justifyContent: 'center',
        alignItems: 'center'
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
        marginTop: 5
    },
    button: {
        backgroundColor: '#57CC99',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10
    },
    buttonOutline: {
        backgroundColor: 'white',
        borderColor: '#57CC99',
        marginTop: 5,
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
    }
})