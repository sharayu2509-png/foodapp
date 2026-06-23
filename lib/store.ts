import { create } from 'zustand'

export interface Location {
  lat: number
  lng: number
  address: string
}

export interface Restaurant {
  id: string
  name: string
  rating: number
  cuisine: string
  category: 'veg' | 'fast-food' | 'cafe' | 'fine-dining'
  image: string
  distance?: number
  eta?: number
  lat: number
  lng: number
}

export type TravelMode = 'driving' | 'walking' | 'bicycling'

export interface DirectionInfo {
  distance: number
  duration: number
}

interface FoodFinderStore {
  userLocation: Location | null
  selectedRestaurant: Restaurant | null
  travelMode: TravelMode
  directionInfo: DirectionInfo | null
  isLoadingLocation: boolean
  isLoadingDirections: boolean
  isDarkMode: boolean
  categoryFilter: 'all' | 'veg' | 'fast-food' | 'cafe' | 'fine-dining'

  setUserLocation: (location: Location) => void
  setSelectedRestaurant: (restaurant: Restaurant | null) => void
  setTravelMode: (mode: TravelMode) => void
  setDirectionInfo: (info: DirectionInfo | null) => void
  setIsLoadingLocation: (loading: boolean) => void
  setIsLoadingDirections: (loading: boolean) => void
  setIsDarkMode: (dark: boolean) => void
  setCategoryFilter: (filter: typeof FoodFinderStore.prototype.categoryFilter) => void
}

export const useFoodFinderStore = create<FoodFinderStore>((set) => ({
  userLocation: null,
  selectedRestaurant: null,
  travelMode: 'driving',
  directionInfo: null,
  isLoadingLocation: false,
  isLoadingDirections: false,
  isDarkMode: false,
  categoryFilter: 'all',

  setUserLocation: (location) => set({ userLocation: location }),
  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
  setTravelMode: (mode) => set({ travelMode: mode }),
  setDirectionInfo: (info) => set({ directionInfo: info }),
  setIsLoadingLocation: (loading) => set({ isLoadingLocation: loading }),
  setIsLoadingDirections: (loading) => set({ isLoadingDirections: loading }),
  setIsDarkMode: (dark) => set({ isDarkMode: dark }),
  setCategoryFilter: (filter) => set({ categoryFilter: filter }),
}))
