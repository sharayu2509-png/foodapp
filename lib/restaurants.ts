import { Restaurant } from './store'

export const RESTAURANTS: Restaurant[] = [
  // Veg Restaurants
  {
    id: '1',
    name: 'Green Leaf Bistro',
    rating: 4.8,
    cuisine: 'Vegetarian',
    category: 'veg',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: '2',
    name: 'Harvest Bowl',
    rating: 4.6,
    cuisine: 'Health & Wellness',
    category: 'veg',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    lat: 40.7158,
    lng: -74.0008,
  },
  {
    id: '3',
    name: 'Veggie Haven',
    rating: 4.5,
    cuisine: 'Vegetarian',
    category: 'veg',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
    lat: 40.7089,
    lng: -74.0012,
  },

  // Fast Food
  {
    id: '4',
    name: 'Speed Burger',
    rating: 4.4,
    cuisine: 'Burgers & Fries',
    category: 'fast-food',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
    lat: 40.7180,
    lng: -74.0020,
  },
  {
    id: '5',
    name: 'Quick Pizza Co',
    rating: 4.3,
    cuisine: 'Pizza',
    category: 'fast-food',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=200&fit=crop',
    lat: 40.7160,
    lng: -73.9950,
  },
  {
    id: '6',
    name: 'Taco Express',
    rating: 4.5,
    cuisine: 'Mexican',
    category: 'fast-food',
    image: 'https://images.unsplash.com/photo-1565045666747-29f6b64642ca?w=300&h=200&fit=crop',
    lat: 40.7110,
    lng: -73.9970,
  },
  {
    id: '7',
    name: 'Noodle House',
    rating: 4.6,
    cuisine: 'Asian Noodles',
    category: 'fast-food',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=300&h=200&fit=crop',
    lat: 40.7140,
    lng: -74.0030,
  },

  // Cafes
  {
    id: '8',
    name: 'Brew & Bean',
    rating: 4.7,
    cuisine: 'Coffee & Pastries',
    category: 'cafe',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=200&fit=crop',
    lat: 40.7200,
    lng: -74.0010,
  },
  {
    id: '9',
    name: 'Morning Glory Cafe',
    rating: 4.5,
    cuisine: 'Breakfast & Brunch',
    category: 'cafe',
    image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=300&h=200&fit=crop',
    lat: 40.7100,
    lng: -74.0025,
  },
  {
    id: '10',
    name: 'The Cozy Corner',
    rating: 4.6,
    cuisine: 'Desserts & Coffee',
    category: 'cafe',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
    lat: 40.7170,
    lng: -73.9990,
  },

  // Fine Dining
  {
    id: '11',
    name: 'Elegance Fine Dining',
    rating: 4.9,
    cuisine: 'French',
    category: 'fine-dining',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=300&h=200&fit=crop',
    lat: 40.7090,
    lng: -74.0002,
  },
  {
    id: '12',
    name: 'Sushi Artistry',
    rating: 4.8,
    cuisine: 'Japanese',
    category: 'fine-dining',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
    lat: 40.7145,
    lng: -73.9955,
  },
  {
    id: '13',
    name: 'La Stella',
    rating: 4.7,
    cuisine: 'Italian',
    category: 'fine-dining',
    image: 'https://images.unsplash.com/photo-1559339352-11d034aa65d5?w=300&h=200&fit=crop',
    lat: 40.7175,
    lng: -74.0035,
  },
  {
    id: '14',
    name: 'The Chef\'s Table',
    rating: 4.9,
    cuisine: 'Contemporary',
    category: 'fine-dining',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
    lat: 40.7120,
    lng: -73.9980,
  },
]

export function getRestaurantsByCategory(category: string): Restaurant[] {
  if (category === 'all') return RESTAURANTS
  return RESTAURANTS.filter((r) => r.category === category)
}

export function getRandomRestaurant(category: string): Restaurant {
  const filtered = getRestaurantsByCategory(category)
  if (filtered.length === 0) return RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)]
  return filtered[Math.floor(Math.random() * filtered.length)]
}

export function getTimeBasedSuggestion(category: string): Restaurant {
  const hour = new Date().getHours()
  const filtered = getRestaurantsByCategory(category)

  if (filtered.length === 0) return RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)]

  // Breakfast (6-11): suggest cafes
  if (hour >= 6 && hour < 11 && category === 'all') {
    const cafes = RESTAURANTS.filter((r) => r.category === 'cafe')
    if (cafes.length > 0) return cafes[Math.floor(Math.random() * cafes.length)]
  }

  // Lunch (11-14): suggest fast food or veg
  if (hour >= 11 && hour < 14 && category === 'all') {
    const lunch = RESTAURANTS.filter((r) => r.category === 'fast-food' || r.category === 'veg')
    if (lunch.length > 0) return lunch[Math.floor(Math.random() * lunch.length)]
  }

  // Dinner (18-23): suggest fine dining or casual
  if (hour >= 18 && hour < 24 && category === 'all') {
    const dinner = RESTAURANTS.filter((r) => r.category !== 'cafe')
    if (dinner.length > 0) return dinner[Math.floor(Math.random() * dinner.length)]
  }

  return filtered[Math.floor(Math.random() * filtered.length)]
}
