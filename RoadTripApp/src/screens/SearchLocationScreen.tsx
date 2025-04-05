import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Location, SearchResult} from '../types';
import {theme} from '../theme';

interface SearchLocationScreenProps {
  navigation: any;
  route: {
    params: {
      onSelectLocation: (location: Location) => void;
    };
  };
}

export const SearchLocationScreen: React.FC<SearchLocationScreenProps> = ({
  navigation,
  route,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual location search using a geocoding service
      // For now, we'll use mock data
      const mockResults: SearchResult[] = [
        {
          id: '1',
          name: 'Eiffel Tower',
          description: 'Famous iron lattice tower on the Champ de Mars in Paris',
          latitude: 48.8584,
          longitude: 2.2945,
          rating: 4.8,
          address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
        },
        {
          id: '2',
          name: 'Louvre Museum',
          description: 'World\'s largest art museum and historic monument',
          latitude: 48.8606,
          longitude: 2.3376,
          rating: 4.7,
          address: 'Rue de Rivoli, 75001 Paris, France',
        },
      ];

      setSearchResults(mockResults);
    } catch (error) {
      console.error('Error searching locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (result: SearchResult) => {
    const location: Location = {
      id: result.id,
      name: result.name,
      description: result.description,
      latitude: result.latitude,
      longitude: result.longitude,
      photos: [],
      rating: result.rating,
      reviews: [],
      address: result.address,
    };

    route.params.onSelectLocation(location);
    navigation.goBack();
  };

  const renderSearchResult = ({item}: {item: SearchResult}) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => handleSelectLocation(item)}>
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultDescription}>{item.description}</Text>
        <Text style={styles.resultAddress}>{item.address}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color={theme.primary} />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      <Icon name="chevron-right" size={24} color={theme.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color={theme.textSecondary} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={text => {
            setSearchQuery(text);
            handleSearch(text);
          }}
          placeholder="Search for a location"
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.white,
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: theme.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  resultCard: {
    backgroundColor: theme.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadow,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 4,
  },
  resultAddress: {
    fontSize: 12,
    color: theme.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: theme.text,
    marginLeft: 4,
  },
}); 