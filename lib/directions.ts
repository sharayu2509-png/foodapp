import { TravelMode, DirectionInfo } from './store'
import { calculateDistance, estimateETA } from './geo'

export interface RouteStep {
  instruction: string
  distance: number
  duration: number
  lat: number
  lng: number
}

export interface Route {
  summary: string
  distance: number
  duration: number
  polyline: Array<{ lat: number; lng: number }>
  steps: RouteStep[]
}

/**
 * Mock implementation of Google Directions API
 * In production, replace with actual Google Directions API calls
 */
export async function getDirections(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number,
  mode: TravelMode = 'driving',
): Promise<Route> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const distance = calculateDistance(originLat, originLng, destLat, destLng)
  const duration = estimateETA(distance, mode)

  // Generate mock polyline points between origin and destination
  const steps = 5
  const polyline: Array<{ lat: number; lng: number }> = [{ lat: originLat, lng: originLng }]

  for (let i = 1; i < steps; i++) {
    const fraction = i / steps
    polyline.push({
      lat: originLat + (destLat - originLat) * fraction,
      lng: originLng + (destLng - originLng) * fraction,
    })
  }

  polyline.push({ lat: destLat, lng: destLng })

  // Generate mock steps
  const mockSteps: RouteStep[] = [
    {
      instruction: `Head ${getMockDirection(originLng, destLng)} on current street`,
      distance: distance * 0.3,
      duration: Math.round((duration * 0.3) / 60),
      lat: originLat,
      lng: originLng,
    },
    {
      instruction: `Continue ${getMockDirection(originLng, destLng)} for ${Math.round(distance * 0.4)} km`,
      distance: distance * 0.4,
      duration: Math.round((duration * 0.4) / 60),
      lat: originLat + (destLat - originLat) * 0.5,
      lng: originLng + (destLng - originLng) * 0.5,
    },
    {
      instruction: `Turn and head towards the destination`,
      distance: distance * 0.3,
      duration: Math.round((duration * 0.3) / 60),
      lat: destLat,
      lng: destLng,
    },
  ]

  return {
    summary: `${distance} km by ${mode}`,
    distance,
    duration,
    polyline,
    steps: mockSteps,
  }
}

function getMockDirection(lng1: number, lng2: number): string {
  const directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest']
  const index = lng2 > lng1 ? 2 : 6 // Simplified for demo
  return directions[index] || 'straight'
}

export function getDirectionInfo(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number,
  mode: TravelMode,
): DirectionInfo {
  const distance = calculateDistance(originLat, originLng, destLat, destLng)
  const duration = estimateETA(distance, mode)

  return {
    distance,
    duration,
  }
}
