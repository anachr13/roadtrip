export interface Location {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  photos: string[];
  rating: number;
  reviews: Review[];
  address: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

export interface RoadTrip {
  id: string;
  name: string;
  description: string;
  locations: Location[];
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  rating: number;
  address: string;
} 