/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RoadTrip, Location} from './src/types';
import {theme} from './src/theme';

// Import screens
import {HomeScreen} from './src/screens/HomeScreen';
import {CreateTripScreen} from './src/screens/CreateTripScreen';
import {TripDetailsScreen} from './src/screens/TripDetailsScreen';
import {SearchLocationScreen} from './src/screens/SearchLocationScreen';
import {LocationDetailsScreen} from './src/screens/LocationDetailsScreen';

// Enable native screens
enableScreens();

export type RootStackParamList = {
  Home: {
    roadTrips: RoadTrip[];
    onDeleteTrip: (id: string) => void;
    onCreateTrip: (name: string, description: string) => void;
    onUpdateLocations: (tripId: string, locations: Location[]) => void;
    onDeleteLocation: (tripId: string, locationId: string) => void;
  };
  CreateTrip: {
    onCreateTrip: (name: string, description: string) => void;
  };
  TripDetails: {
    trip?: RoadTrip;
    onUpdateLocations: (tripId: string, locations: Location[]) => void;
    onDeleteLocation: (tripId: string, locationId: string) => void;
  };
  SearchLocation: {
    onSelectLocation: (location: Location) => void;
  };
  LocationDetails: {
    location: Location;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  const [roadTrips, setRoadTrips] = useState<RoadTrip[]>([]);

  const handleCreateTrip = (name: string, description: string) => {
    const newTrip: RoadTrip = {
      id: Date.now().toString(),
      name,
      description,
      locations: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRoadTrips([...roadTrips, newTrip]);
  };

  const handleDeleteTrip = (tripId: string) => {
    setRoadTrips(roadTrips.filter(trip => trip.id !== tripId));
  };

  const handleUpdateLocations = (tripId: string, locations: Location[]) => {
    setRoadTrips(
      roadTrips.map(trip =>
        trip.id === tripId
          ? {
              ...trip,
              locations,
              updatedAt: new Date().toISOString(),
            }
          : trip,
      ),
    );
  };

  const handleDeleteLocation = (tripId: string, locationId: string) => {
    setRoadTrips(
      roadTrips.map(trip =>
        trip.id === tripId
          ? {
              ...trip,
              locations: trip.locations.filter(loc => loc.id !== locationId),
              updatedAt: new Date().toISOString(),
            }
          : trip,
      ),
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.white,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'My Trips'}}
        initialParams={{
          roadTrips,
          onDeleteTrip: handleDeleteTrip,
          onCreateTrip: handleCreateTrip,
          onUpdateLocations: handleUpdateLocations,
          onDeleteLocation: handleDeleteLocation,
        }}
      />
      <Stack.Screen
        name="CreateTrip"
        component={CreateTripScreen}
        options={{title: 'Create New Trip'}}
        initialParams={{
          onCreateTrip: handleCreateTrip,
        }}
      />
      <Stack.Screen
        name="TripDetails"
        component={TripDetailsScreen}
        options={{title: 'Trip Details'}}
        initialParams={{
          onUpdateLocations: handleUpdateLocations,
          onDeleteLocation: handleDeleteLocation,
        }}
      />
      <Stack.Screen
        name="SearchLocation"
        component={SearchLocationScreen}
        options={{title: 'Search Location'}}
      />
      <Stack.Screen
        name="LocationDetails"
        component={LocationDetailsScreen}
        options={{title: 'Location Details'}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.primary,
            tabBarInactiveTintColor: theme.textSecondary,
            tabBarStyle: {
              backgroundColor: theme.white,
              borderTopColor: theme.border,
            },
            headerShown: false,
          }}>
          <Tab.Screen
            name="MainStack"
            component={MainStack}
            options={{
              tabBarLabel: 'Trips',
              tabBarIcon: ({color, size}) => (
                <Icon name="map-marker-multiple" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
