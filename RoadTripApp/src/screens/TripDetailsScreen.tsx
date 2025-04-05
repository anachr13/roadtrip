import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../../App';
import {Location} from '../types';
import {theme} from '../theme';

type TripDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TripDetails'
>;

export const TripDetailsScreen: React.FC<TripDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const {trip, onUpdateLocations, onDeleteLocation} = route.params;

  if (!trip) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Trip not found</Text>
      </View>
    );
  }

  const handleAddLocation = () => {
    navigation.navigate('SearchLocation', {
      onSelectLocation: (location: Location) => {
        onUpdateLocations(trip.id, [...trip.locations, location]);
      },
    });
  };

  const handleDeleteLocation = (locationId: string) => {
    Alert.alert(
      'Delete Location',
      'Are you sure you want to delete this location?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDeleteLocation(trip.id, locationId),
        },
      ],
    );
  };

  const handleLocationPress = (location: Location) => {
    navigation.navigate('LocationDetails', {location});
  };

  const renderLocation = ({item}: {item: Location}) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleLocationPress(item)}>
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteLocation(item.id)}>
        <Icon name="delete" size={24} color={theme.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{trip.name}</Text>
        <Text style={styles.description}>{trip.description}</Text>
      </View>

      <FlatList
        data={trip.locations}
        renderItem={renderLocation}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddLocation}>
        <Icon name="plus" size={24} color={theme.white} />
        <Text style={styles.addButtonText}>Add Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    padding: 16,
    backgroundColor: theme.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  description: {
    fontSize: 16,
    color: theme.textSecondary,
    marginTop: 8,
  },
  list: {
    padding: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    ...theme.shadow,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.text,
  },
  locationDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: theme.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 16,
    color: theme.error,
    textAlign: 'center',
    marginTop: 20,
  },
}); 