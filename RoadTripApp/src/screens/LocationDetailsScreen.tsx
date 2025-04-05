import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Location} from '../types';
import {theme} from '../theme';
import {RootStackParamList} from '../../App';

type LocationDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'LocationDetails'>;

export const LocationDetailsScreen: React.FC<LocationDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const {location} = route.params;

  const handleOpenMaps = () => {
    const url = `maps://app?daddr=${location.latitude},${location.longitude}&q=${encodeURIComponent(
      location.name,
    )}`;
    Linking.openURL(url);
  };

  const handleOpenDirections = () => {
    const url = `maps://app?daddr=${location.latitude},${location.longitude}&q=${encodeURIComponent(
      location.name,
    )}&dirflg=d`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
          />
        </MapView>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{location.name}</Text>
        <Text style={styles.description}>{location.description}</Text>
        <Text style={styles.address}>{location.address}</Text>

        <View style={styles.ratingContainer}>
          <Icon name="star" size={20} color={theme.primary} />
          <Text style={styles.rating}>{location.rating}</Text>
          <Text style={styles.reviewCount}>
            ({location.reviews.length} reviews)
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.mapButton]}
            onPress={handleOpenMaps}>
            <Icon name="map-marker" size={24} color={theme.white} />
            <Text style={styles.actionButtonText}>Open in Maps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.directionsButton]}
            onPress={handleOpenDirections}>
            <Icon name="directions" size={24} color={theme.white} />
            <Text style={styles.actionButtonText}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        {location.photos.length > 0 && (
          <View style={styles.photosSection}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.photosContainer}>
              {location.photos.map((photo, index) => (
                <Image
                  key={index}
                  source={{uri: photo}}
                  style={styles.photo}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>
        )}

        {location.reviews.length > 0 && (
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {location.reviews.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewAuthor}>{review.author}</Text>
                  <View style={styles.reviewRating}>
                    <Icon name="star" size={16} color={theme.primary} />
                    <Text style={styles.reviewRatingText}>{review.rating}</Text>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
                <Text style={styles.reviewDate}>
                  {new Date(review.date).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  mapContainer: {
    height: 200,
    width: '100%',
  },
  map: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: theme.textSecondary,
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  mapButton: {
    backgroundColor: theme.primary,
  },
  directionsButton: {
    backgroundColor: theme.secondary,
  },
  actionButtonText: {
    color: theme.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  photosSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 16,
  },
  photosContainer: {
    paddingRight: 16,
  },
  photo: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  reviewsSection: {
    marginBottom: 24,
  },
  reviewCard: {
    backgroundColor: theme.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...theme.shadow,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    fontSize: 14,
    color: theme.text,
    marginLeft: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: theme.text,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: theme.textSecondary,
  },
}); 