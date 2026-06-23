import { Location, TravelMode } from './store'

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return Math.round(distance * 10) / 10
}

export function estimateETA(distanceKm: number, mode: TravelMode): number {
  // Average speeds in km/h
  const speeds: Record<TravelMode, number> = {
    driving: 40,
    walking: 5,
    bicycling: 15,
  }

  const speed = speeds[mode]
  const timeInHours = distanceKm / speed
  const timeInMinutes = Math.round(timeInHours * 60)
  return Math.max(1, timeInMinutes)
}

export function getGeolocation(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords)
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    )
  })
}

export function getAddressFromCoords(lat: number, lng: number): Promise<string> {
  // Mock reverse geocoding - in production, use Google Maps Geocoding API
  // For now, return formatted coordinates
  return Promise.resolve(`${lat.toFixed(4)}, ${lng.toFixed(4)}`)
}

export function openNavigation(lat: number, lng: number, name: string) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = /Android/.test(navigator.userAgent)

  if (isIOS) {
    // Apple Maps
    window.open(`maps://maps.apple.com/?daddr=${lat},${lng}&dirfl=d`, '_blank')
  } else if (isAndroid) {
    // Google Maps
    window.open(`https://maps.google.com/?dir=&destination=${lat},${lng}`, '_blank')
  } else {
    // Fallback to Google Maps web
    window.open(`https://maps.google.com/?dir=&destination=${lat},${lng}`, '_blank')
  }
}
