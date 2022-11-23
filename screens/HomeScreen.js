import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Pressable, RefreshControl, StatusBar, ActivityIndicator } from 'react-native';
import styles from '../common/styles';
//import firestore from '../firebase';
import {auth, firestore} from '../common/PureFirebase'
import {
  getDocs,
  collection,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import * as Location from 'expo-location';
import getHashesNear from 'geohashes-near';
import ListEvent from '../components/ListEvent'
import { getTimestamp } from 'react-native-reanimated/lib/reanimated2/core';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({navigation}) => {

  const [locationAcquired, setLocationAcquired] = useState(false);
  const [neighborsAcquired, setNeighborsAcquired] = useState(false);
  
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [neighbours, setNeighbours] = useState([]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {setRefreshing(false)
      getEvents(firestore);});
  }, []);

  const getEvents = async (dbx) => {

    let end = new Date(Date.now() + ( 3600 * 1000 * 25 ));
    console.log("Date: ", end)
    const colRef = collection(dbx, 'events');
    //const queryEvents = query(colRef, where('neighborhood', 'in', neighbours));
    //const queryEvents = query(colRef, where('curfew', '>', end));
    const queryEvents = query(colRef, where('neighborhood', 'in', neighbours), where('curfew', '>', end), orderBy('curfew', 'desc'));
    onSnapshot(queryEvents, 
            (snapshot)=>{
                let evs = [];
                snapshot.docs.forEach((doc)=>{
                    evs.push({...doc.data(), key: doc.id})
                })
                setEvents(evs)
                return evs;
            });
  }

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let localLocation = await Location.getCurrentPositionAsync({});
    setLocation(localLocation);
    setLocationAcquired(true);
    return location;
  }

  const getNeighbours = () => {
    if(location!=null){
      const position = { latitude: location.coords.latitude, longitude: location.coords.longitude };
      const radius = 7500; // 20 meters
      const units = 'meters';
      const precision = 5;
      const hashesInRadius = getHashesNear(position, precision, radius, units); 
      setNeighbours(hashesInRadius);
      setNeighborsAcquired(true)
      return;
    }
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
    getLocation() //cNI0y3jOVq4Ja1hF android emulator token 20.543457851796997, -100.4160351587708
  }, []);

  useEffect(() => {
    if(locationAcquired===true){
        getNeighbours();
      }
  },[locationAcquired]);

  useEffect(() => {
    
    if(neighborsAcquired===true){
      getEvents(firestore)
    }
  }, [neighborsAcquired]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


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
export default HomeScreen;

const localStyles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});