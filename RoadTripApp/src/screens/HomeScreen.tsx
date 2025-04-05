import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RoadTrip, Location} from '../types';
import {theme} from '../theme';
import {RootStackParamList} from '../../App';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  route: {
    params: {
      roadTrips: RoadTrip[];
      onDeleteTrip: (id: string) => void;
      onUpdateLocations: (tripId: string, locations: Location[]) => void;
      onDeleteLocation: (tripId: string, locationId: string) => void;
      onCreateTrip: (name: string, description: string) => void;
    };
  };
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  route,
}) => {
  const {roadTrips, onDeleteTrip} = route.params;

  const handleCreateTrip = () => {
    navigation.navigate('CreateTrip', {
      onCreateTrip: route.params.onCreateTrip,
    });
  };

  const handleDeleteTrip = (tripId: string) => {
    Alert.alert(
      'Delete Trip',
      'Are you sure you want to delete this trip?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => onDeleteTrip(tripId), style: 'destructive'},
      ],
    );
  };

  const renderTripItem = ({item}: {item: RoadTrip}) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => navigation.navigate('TripDetails', {
        trip: item,
        onUpdateLocations: route.params.onUpdateLocations,
        onDeleteLocation: route.params.onDeleteLocation,
      })}>
      <View style={styles.tripInfo}>
        <Text style={styles.tripName}>{item.name}</Text>
        <Text style={styles.tripDescription}>{item.description}</Text>
        <Text style={styles.tripStats}>
          {item.locations.length} locations • Created{' '}
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTrip(item.id)}>
        <Icon name="delete" size={24} color={theme.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={roadTrips}
        renderItem={renderTripItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.fab} onPress={handleCreateTrip}>
        <Icon name="plus" size={24} color={theme.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContent: {
    padding: 16,
  },
  tripCard: {
    backgroundColor: theme.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tripInfo: {
    flex: 1,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  tripDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 8,
  },
  tripStats: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  deleteButton: {
    padding: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: theme.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 