import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Pressable, RefreshControl, StatusBar, ActivityIndicator } from 'react-native';
import firestore from '../firebase';
import {
    collection,
    onSnapshot,
    query,
    where,
    collectionGroup
} from 'firebase/firestore'
import ListEvent from '../components/ListEvent';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const ArtsScreen = ({navigation}) => {

    const [events, setEvents] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [doneState, setDone] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {setRefreshing(false)
          getEvents(firestore);});
      }, []);  

    const getEvents = async (dbx) => {
        
        const colRef = collection(dbx, 'events');
        const queryGlobalCategory = query(colRef, where('globalcategory', '==', 'Cultura'));

        onSnapshot(queryGlobalCategory, 
            (snapshot)=>{
                let evs = [];
                snapshot.docs.forEach((doc)=>{
                    evs.push({...doc.data(), key: doc.id})
                })
                setEvents(evs)
                return evs;
            });
    }
   
    const renderItem = ({item}) => {
        let items = [];
    
        //Prices
        let priceHighest='';
        let priceLowest='';
        if(item.prices) {
            
              priceHighest = item.prices.highest
              priceLowest = item.prices.lowest
          } 
    
        //Date
        let date='';
        if(item.date) {
              date = item.date.start;
          } 
        //Venue
        let venueName='';
        let venueLatitude='';
        let venueLongitude='';
        if(item.venue) {
              venueName = item.venue.name;
              venueLatitude = item.venue.latitude;
              venueLongitude = item.venue.longitude;
          } 
    
        //Publihser
        let publisherName = '';
        let publisherLevel;
        let publisherImage= '';
    
        if(item.publisher) {
            publisherName = item.publisher.name
            publisherLevel = item.publisher.level
            publisherImage = item.publisher.image
        } 
        
        return (
            <Pressable onPress={() => navigation.push('Event', {eventId: item.key})}>
                <ListEvent
                    title = {item.title}
                    poster= {item.poster} 
                    publihserName= {publisherName}
                    publisherLevel= {publisherLevel}
                    publisherImage = {publisherImage}
                    category = {item.globalcategory}
                    date= {date}
                    venueName= {venueName}
                    priceHighest = {priceHighest}
                    priceLowest = {priceLowest}
                />
            </Pressable>
        )
    }
    

   useEffect(() => {
        getEvents(firestore)
   })

return (
    <SafeAreaView style={localStyles.flatListContainer}>
        <StatusBar
        animated={true}
        barStyle="light-content" />
        <FlatList
            data = {events}
            renderItem = {renderItem}        
            keyExtractor = {(item) => item.key} 
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
            }
        />
    </SafeAreaView>
)

}
export default ArtsScreen;

const localStyles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});