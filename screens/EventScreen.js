import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import firestore from '../firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import DetailEvent from '../components/DetailEvent';

const commoditiesArray = [
    {commodity:'Estacionamiento', icon:'car', iconFamily:'FontAwesome5'},
    {commodity:'Tarjetas', icon:'ios-card', iconFamily:'Ionicons'},
    {commodity:'Familiar', icon:'human-male-female-child', iconFamily:'MaterialCommunityIcons'},
    {commodity:'ATM', icon:'local-atm', iconFamily:'MaterialIcons'},
    {commodity:'Accesibilidad', icon:'accessible-icon', iconFamily:'FontAwesome5'},
    {commodity:'Transporte', icon:'bus-alt', iconFamily:'FontAwesome5'},
];




const EventScreen = ({route, navigation}) => {

    const [eventCategory, setEventCategory] = useState({});
    const [eventDate, setEventDate] = useState({});
    const [eventPriceRange, setEventPriceRange] = useState({});
    const [eventPublisher, setEventPublisher] = useState({});
    const [eventVenue, setEventVenue] = useState({});
    const eventId = route.params.eventId;
    const [event, setEvent] = useState({});
    const getEvent = async (dbx) => {
        const eventDoc = doc(dbx, 'events', eventId);
        const eventSnapshot = await getDoc(eventDoc);
        const fetchedEvent = eventSnapshot.data();
        setEvent(fetchedEvent);
        setEventCategory (fetchedEvent.category);
        setEventDate (()=>({
            start: fetchedEvent.date.start,
            end: fetchedEvent.date.end
        }));
        setEventPriceRange (fetchedEvent.prices);
        setEventPublisher (fetchedEvent.publisher);
        setEventVenue (fetchedEvent.venue);
        return fetchedEvent;
    }    

    useEffect(  
        () => {
            getEvent(firestore);
        }
    ,[eventId])

    return ( 
        <DetailEvent

            publisherImage= {eventPublisher.image}
            publihserName= {eventPublisher.name}
            publisherLevel= {eventPublisher.level}
            poster= {event.poster}
            dateStart= {eventDate.start}
            dateEnd= {eventDate.end}
            venueName= {eventVenue.name}
            venueId= {eventVenue.id}
            priceLowest= {eventPriceRange.lowest}
            priceHighest= {eventPriceRange.highest}
            title= {event.title}
            category= {eventCategory.name}
            eventDescription= {event.abstract}
            commodities= {commoditiesArray}

        />
    ) 

}

export default EventScreen;

const localStyles = StyleSheet.create({
    
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