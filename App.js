import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen'
import SportsScreen from './screens/SportsScreen';
import EventScreen from './screens/EventScreen';
import ArtsScreen from './screens/ArtsScreen';
import MusicScreen from './screens/MusicScreen';
import SearchScreen from './screens/SearcScreen';
import LoginScreen from './screens/userScreens/LoginScreen';
import ProfileScreen from './screens/userScreens/ProfileScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import WildcardScreen from './screens/WildcardScreen';
import WildcardScreenBis from './screens/WildcardScreenBis';
import SignupScreen from './screens/userScreens/SignupScreen';
import EditProfileScreen from './screens/userScreens/EditProfileScreen'
import EditProfileImageScreen from './screens/userScreens/EditProfileImageScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () =>{
  return(
    <Stack.Navigator>
        
        <Stack.Screen 
          name='Home' 
          component={HomeScreen}
          options={{
            title: 'Cartelera',
            headerStyle: {
              backgroundColor: '#FF6D00',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name='Event' 
          component={EventScreen}
          options={{
            title: 'Inicio',
            headerStyle: {
              backgroundColor: '#22577A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
      </Stack.Navigator>
  );
}

const SportsStack = () =>{
  return(
    <Stack.Navigator>
        <Stack.Screen 
          name='Sports' 
          component={SportsScreen}
          options={{
            title: 'Deportes',
            headerStyle: {
              backgroundColor: '#38A3A5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name='DetailSports' 
          component={EventScreen}
          options={{
            title: 'Detalle',
            headerStyle: {
              backgroundColor: '#22577A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
      </Stack.Navigator>
  );
}

const ArtsStack = () =>{
  return(
    <Stack.Navigator>
        <Stack.Screen 
          name='Arts' 
          component={ArtsScreen}
          options={{
            title: 'Cultura',
            headerStyle: {
              backgroundColor: '#38A3A5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name='DetailArts' 
          component={EventScreen}
          options={{
            title: 'Detalle',
            headerStyle: {
              backgroundColor: '#22577A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
      </Stack.Navigator>
  );
}

const MusicStack = () =>{
  return(
    <Stack.Navigator>
        <Stack.Screen 
          name='Conciertos' 
          component={MusicScreen}
          options={{
            title: 'Conciertos',
            headerStyle: {
              backgroundColor: '#38A3A5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name='DetailMusic' 
          component={EventScreen}
          options={{
            title: 'Detalle',
            headerStyle: {
              backgroundColor: '#22577A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
      </Stack.Navigator>
  );
}

const UserStack = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen 
          name='Perfil' 
          component={ProfileScreen}
          options={{
            title: 'Detalle',
            headerStyle: {
              backgroundColor: '#22577A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
      }} />
      <Stack.Screen 
          name='Login' 
          component={LoginScreen}
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#38A3A5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
      }}
      />
      <Stack.Screen 
          name='SignUp' 
          component={SignupScreen}
          options={{
            title: 'Registro',
            headerStyle: {
              backgroundColor: '#38A3A5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
      }}
      />
      <Stack.Screen 
          name='Edit' 
          component={EditProfileScreen}
          options={{
            title: 'Editar perfil',
            headerStyle: {
              backgroundColor: '#38A3A5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
      }}
      />
      <Stack.Screen 
          name='EditImage' 
          component={EditProfileImageScreen}
          options={{
            title: 'Editar imagen',
            headerStyle: {
              backgroundColor: '#38A3A5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
      }}
      />
    </Stack.Navigator>
  );
}

const SettingsThread = () =>{
  return(
    <Stack.Navigator>
        
        <Stack.Screen 
          name='SettingsScreen' 
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerStyle: {
              backgroundColor: '#38A354',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name='Wildcard' 
          component={WildcardScreen}
          options={{
            title: 'Wildcard',
            headerStyle: {
              backgroundColor: '#2257BA',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen 
          name='WildcardBis' 
          component={WildcardScreenBis}
          options={{
            title: 'WildcardBis',
            headerStyle: {
              backgroundColor: '#225713',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen 
          name='UserStack' 
          component={UserStack}
          options={{
            title: 'Usuario',
            headerStyle: {
              backgroundColor: '#225713',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
      </Stack.Navigator>
  );
}

const Tabs = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen 
          name="HomeStack" 
          component={HomeStack} 
          options={{
            headerShown: false,
            tabBarLabel: "Inicio",
            tabBarIcon: () => <Entypo name="home" size={24} color="black"/>
          }}
        />
        <Tab.Screen 
          name="Favorites" 
          component={FavoritesScreen} 
          options={{
            headerShown: false,
            tabBarLabel: "Recomendados",
            tabBarIcon: () => <FontAwesome name="star" size={24} color="black"/>
          }}
        />
        <Tab.Screen 
          name="SportsStack" 
          component={SportsStack} 
          options={{
            headerShown: false,
            tabBarLabel: "Deportes",
            tabBarIcon: () => <MaterialIcons name="sports-basketball" size={24} color="black"/>
          }}
        />
        <Tab.Screen 
          name="ArtsStack" 
          component={ArtsStack} 
          options={{
            headerShown: false,
            tabBarLabel: "Cultura",
            tabBarIcon: () => <MaterialIcons name="theater-comedy" size={24} color="black" />
          }}
        />
        <Tab.Screen 
          name="MusicStack" 
          component={MusicStack} 
          options={{
            headerShown: false,
            tabBarLabel: "Conciertos",
            tabBarIcon: () => <Entypo name="sound-mix" size={24} color="black" />
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{
            headerShown: false,
            tabBarLabel: "Buscar",
            tabBarIcon: () => <FontAwesome name="search" size={24} color="black"/>
          }}
        />
      </Tab.Navigator>
    );
}

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Root">
        <Drawer.Screen name="Eventos" options={{ headerShown:false }} component={Tabs} />
        <Drawer.Screen name="Mi perfil" component={UserStack} />
        <Drawer.Screen name="Ajustes" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
