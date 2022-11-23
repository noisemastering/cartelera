import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Entypo, FontAwesome, MaterialIcons, Ionicons, EvilIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../common/styles';
import moment from 'moment';


const dimensions = Dimensions.get('window');

const ListEvent = (props) => {

    return (
        <View style={localStyles.postContainer}>
            <View style={localStyles.titleContainer}>
                <Image
                    style={localStyles.publisherImage}
                    source={{uri: props.publisherImage}}
                />
                <View style={localStyles.titleTextContainer}>
                    <Text style={localStyles.titleText}>{props.title}</Text>
                    <Text style={localStyles.publisherText}>{props.publihserName}</Text>
                    <Text style={localStyles.reputationText}>{props.publisherLevel}</Text>
                </View>
            </View>
            <Image
                style={styles.posterImage}
                source={{uri: props.poster}}
            />
            <View style={styles.eventTitleContainer}>
                <Text style={styles.labelEventTitle}>{props.title}</Text>
                <Text style={styles.labelEventCatergory}>{props.category}</Text>
            </View>
            <View style={styles.eventInfoContainer}>
                <Text style={styles.labelIcon}><Ionicons name="time-outline" size={24} color="black"/></Text>
                <Text style={styles.labelDateEvent}> {moment(props.date.toDate(), "YYYYMMDD").fromNow()}</Text>
            </View>
            <View style={styles.eventInfoContainer}>
                <EvilIcons name="location" size={24} color="black" />
                <Text style={styles.labelEvent}>{props.venueName}</Text>
            </View>
            <View style={{...styles.eventInfoContainer,marginBottom:5}}>
                <Entypo name="ticket" size={24} color="black" />
                <Text style={styles.labelEvent}>${props.priceLowest} – ${props.priceHighest}</Text>
            </View>
        </View>
    )

}

export default ListEvent;

const localStyles = StyleSheet.create({
    postContainer: {
        backgroundColor: 'white',
        width: '98%',
        borderWidth: 1,
        borderColor: '#22577A',
        marginTop: 15,
        marginLeft: '1%',
        justifyContent: 'center',
    },
    titleContainer:{
        backgroundColor: 'transparent',
        marginTop: 5,
        width: '100%',
        flexDirection: 'row',
        padding: 15
    },
    publisherImage: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: 'transparent'
    },
    titleTextContainer: {
        marginLeft: 15,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#22577A'
    },
    publisherText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666'
    },
    reputationText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#666'
    },
    commoditiesContainer: {
        padding: 20,
        justifyContent: 'center',
        flexDirection:'row',
        alignItems: 'center'
    },
    commodityButton: {
        backgroundColor: '#EEE',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        fontSize: 14,
        marginTop: 5,
        alignSelf: "flex-start",
        textAlign: "center",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "40%"
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
})