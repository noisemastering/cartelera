import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Entypo, FontAwesome, MaterialIcons, Ionicons, EvilIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS
} from 'react-native-reanimated';
import styles from '../common/styles';
import moment from 'moment';

const DetailEvent = (props) => {

    const dimensions = Dimensions.get('window');
    const imageScale = useSharedValue(1);
    const focusX = useSharedValue(0);
    const focusY = useSharedValue(0);
    moment.locale("es-mx"); 
    
    let dateStart = '';
    if(props.dateStart){
        dateStart= moment(props.dateStart.toDate()).format('lll')
    }
    let dateEnd = '';
    if(props.dateEnd){
        dateEnd= moment(props.dateEnd.toDate()).format('lll')
    }
    

    const imageCenter = {
        x: dimensions.width/2,
        y: (dimensions.width + (dimensions.width/2))/2
    }

    const PinchGestureHandler = Gesture.Pinch()
        .onStart((e)=>{
            'worklet';
            focusX = e.focalX;
            focusY = e.focalY;
            console.log("Start")
        })
        .onUpdate((e) => {
            'worklet';
            imageScale.value = e.scale;
            console.log("Update")
        })
        .onEnd(() => {
            'worklet';
            imageScale.value = withTiming(1, {duration: 200})
            console.log("End")
        });

    const pinchedStyle = useAnimatedStyle(()=>(
        'worklet',
        {
        transform: [
            {translateX: focusX.value},
            {translateY: focusY.value},
            {translateX: -imageCenter.x},
            {translateY: -imageCenter.y},
            {scale: imageScale.value},
            {translateX: -focusX.value},
            {translateY: -focusY.value},
            {translateX: imageCenter.x},
            {translateY: imageCenter.y}
        ]
    }));

    const PreviewLayout = ({
        label,
        children,
        values,
        selectedValue,
        setSelectedValue,
      }) => (
        <View style={{ padding: 10, flex: 1 }}>
          <View style={localStyles.row}>
            {values.map((value) => (
              <TouchableOpacity
                key={value.commodity}
                onPress={() => setSelectedValue(value)}
                style={localStyles.commodityButton}
              >
                <Text>
                  {value.commodity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );

    return (
        <View style={styles.containerForScroll}>
            <ScrollView style={localStyles.scrollView}>
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
                    <GestureHandlerRootView>
                    <GestureDetector
                        gesture={PinchGestureHandler}
                    >
                        <Animated.Image
                            style={[
                                styles.posterImage,
                                pinchedStyle 
                            ]}
                            source={{uri: props.poster}}
                        />
                    </GestureDetector>
                    </GestureHandlerRootView>
                    <View style={styles.eventTitleContainer}>
                        <Text style={styles.labelIcon}><Ionicons name="time-outline" size={24} color="black"/></Text>
                        <Text style={styles.labelDateEvent}> Inicia: {dateStart}</Text>
                        <Text style={styles.labelDateEvent}> Termina: {dateEnd}</Text>
                    </View>
                    <View style={styles.eventTitleContainer}>
                        <Text style={styles.labelEventTitle}>{props.title}</Text>
                        <Text style={styles.labelEventCatergory}>{props.category}</Text>
                    </View>
                    <View style={styles.eventInfoContainer}>
                        <Text style={styles.descEvent}>
                            {props.eventDescription}
                        </Text>
                    </View>
                    <View style={styles.eventInfoContainer}>
                        <EvilIcons name="location" size={24} color="black" />
                        <Text style={styles.labelEvent}>{props.venueName}</Text>
                    </View>
                    <View style={{...styles.eventInfoContainer,marginBottom:5}}>
                        <Entypo name="ticket" size={24} color="black" />
                        <Text style={styles.labelEvent}>${props.priceLowest} – ${props.priceHighest}</Text>
                    </View>
                    <View style={localStyles.commoditiesContainer}>
                        <PreviewLayout
                            values={props.commodities}
                        ></PreviewLayout>
                    </View>
                </View>
            </ScrollView>
        </View>

            
            
    )

}

export default DetailEvent;

const localStyles = StyleSheet.create({
    scrollView:{
        backgroundColor: 'transparent',
        width: '100%',
        centerContent: true
    },
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