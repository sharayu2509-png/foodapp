'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useFoodFinderStore } from '@/lib/store'
import { calculateDistance, estimateETA, openNavigation } from '@/lib/geo'
import { ChevronUp, ChevronDown, MapPin, Star, Clock, Fuel, Footprints } from 'lucide-react'

export function RestaurantCard() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { userLocation, selectedRestaurant, travelMode, setTravelMode } = useFoodFinderStore()

  if (!selectedRestaurant || !userLocation) {
    return (
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-card/80 backdrop-blur-sm border-t border-border rounded-t-2xl p-6 shadow-2xl">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Select a restaurant to get started</p>
        </div>
      </div>
    )
  }

  const distance = calculateDistance(userLocation.lat, userLocation.lng, selectedRestaurant.lat, selectedRestaurant.lng)
  const eta = estimateETA(distance, travelMode)

  return (
    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card via-card to-card/80 backdrop-blur-sm border-t border-border rounded-t-3xl shadow-2xl transition-all duration-300 ease-out ${
      isExpanded ? 'max-h-[90vh]' : 'max-h-32'
    }`}>
      {/* Collapsed View */}
      <div className="p-4 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start gap-4 px-2">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
            <Image
              src={selectedRestaurant.image}
              alt={selectedRestaurant.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{selectedRestaurant.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-sm font-medium">{selectedRestaurant.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{selectedRestaurant.cuisine}</span>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium">{distance} km</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">{eta} min</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="border-t border-border px-4 py-4 space-y-4 animate-in slide-in-from-bottom-3 duration-200">
          {/* Travel Mode Selector */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Travel Mode</p>
            <div className="grid grid-cols-3 gap-2">
              {(['driving', 'walking', 'bicycling'] as const).map((mode) => {
                const icons = {
                  driving: <Fuel className="w-5 h-5" />,
                  walking: <Footprints className="w-5 h-5" />,
                  bicycling: <span className="text-lg">🚴</span>,
                }

                const modeEta = estimateETA(distance, mode)
                const modeLabels = {
                  driving: 'Drive',
                  walking: 'Walk',
                  bicycling: 'Bike',
                }

                return (
                  <button
                    key={mode}
                    onClick={() => setTravelMode(mode)}
                    className={`p-3 rounded-xl transition-all font-semibold text-sm flex flex-col items-center gap-2 duration-200 active:scale-95 ${
                      travelMode === mode
                        ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg scale-105'
                        : 'bg-muted/60 text-muted-foreground hover:bg-muted/80 hover:scale-102'
                    }`}
                  >
                    {icons[mode]}
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-xs opacity-75">{modeLabels[mode]}</span>
                      <span>{modeEta} min</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigation Button */}
          <button
            onClick={() => openNavigation(selectedRestaurant.lat, selectedRestaurant.lng, selectedRestaurant.name)}
            className="w-full py-3 px-4 bg-accent text-accent-foreground rounded-xl font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl active:scale-95 duration-200"
          >
            Navigate Now
          </button>

          {/* More Info */}
          <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium capitalize">{selectedRestaurant.category.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Cuisine</span>
              <span className="font-medium">{selectedRestaurant.cuisine}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
