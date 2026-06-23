'use client'

import { useEffect } from 'react'
import { useFoodFinderStore } from '@/lib/store'
import { Header } from '@/components/Header'
import { MapContainer } from '@/components/MapContainer'
import { RestaurantCard } from '@/components/RestaurantCard'
import { getGeolocation, getAddressFromCoords } from '@/lib/geo'
import { RESTAURANTS } from '@/lib/restaurants'

export default function Page() {
  const { userLocation, setUserLocation, setIsLoadingLocation, setSelectedRestaurant, isLoadingLocation } =
    useFoodFinderStore()

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        setIsLoadingLocation(true)
        const coords = await getGeolocation()
        const address = await getAddressFromCoords(coords.latitude, coords.longitude)

        setUserLocation({
          lat: coords.latitude,
          lng: coords.longitude,
          address,
        })

        // Auto-select a random restaurant after location is set
        const randomRestaurant = RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)]
        setSelectedRestaurant(randomRestaurant)
      } catch (error) {
        console.log('[v0] Geolocation error:', error)
        // Fallback to NYC Times Square
        setUserLocation({
          lat: 40.758,
          lng: -73.9855,
          address: 'Times Square, New York',
        })
        const randomRestaurant = RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)]
        setSelectedRestaurant(randomRestaurant)
      } finally {
        setIsLoadingLocation(false)
      }
    }

    if (!userLocation) {
      initializeLocation()
    }
  }, [userLocation, setUserLocation, setIsLoadingLocation, setSelectedRestaurant])

  // Initialize dark mode on first load
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <main className="relative w-full h-screen bg-background text-foreground overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0">
        <MapContainer />
      </div>

      {/* Loading Overlay */}
      {isLoadingLocation && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Getting your location...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Restaurant Card */}
      <RestaurantCard />
    </main>
  )
}
