'use client'

import { useEffect, useRef, useState } from 'react'
import { useFoodFinderStore } from '@/lib/store'
import { RESTAURANTS } from '@/lib/restaurants'

interface MapContainerProps {
  onRestaurantMarkerClick?: (id: string) => void
}

export function MapContainer({ onRestaurantMarkerClick }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [map, setMap] = useState<any>(null)
  const { userLocation, selectedRestaurant } = useFoodFinderStore()

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize basic map with canvas-based rendering
    const canvas = document.createElement('canvas')
    canvas.width = mapRef.current.clientWidth
    canvas.height = mapRef.current.clientHeight
    mapRef.current.appendChild(canvas)
    canvasRef.current = canvas

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawMap = () => {
      // Clear canvas with background
      const isDark = document.documentElement.classList.contains('dark')
      ctx.fillStyle = isDark ? '#0f172a' : '#f8fafc'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid
      ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(226, 232, 240, 0.6)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Draw user location
      if (userLocation) {
        const userX = (canvas.width * 2) / 3
        const userY = (canvas.height * 2) / 3

        // User location pulse animation
        const pulseRadius = 16 + Math.sin(animationRef.current * 0.05) * 4
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(userX, userY, pulseRadius, 0, Math.PI * 2)
        ctx.stroke()

        // User location circle
        ctx.fillStyle = '#3b82f6'
        ctx.beginPath()
        ctx.arc(userX, userY, 8, 0, Math.PI * 2)
        ctx.fill()

        // Inner highlight
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(userX, userY, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw restaurant markers
      RESTAURANTS.forEach((restaurant) => {
        const offsetX = 50 + (restaurant.lng + 74.01) * 3000 - (canvas.width / 3)
        const offsetY = (canvas.height / 3) + (40.71 - restaurant.lat) * 3000

        const isSelected = selectedRestaurant?.id === restaurant.id

        // Restaurant marker
        ctx.fillStyle = isSelected ? '#f97316' : '#ec4899'
        ctx.beginPath()
        ctx.arc(offsetX, offsetY, isSelected ? 6 : 4, 0, Math.PI * 2)
        ctx.fill()

        if (isSelected) {
          // Animated highlight ring for selected
          const ringSize = 12 + Math.sin(animationRef.current * 0.06) * 2
          ctx.strokeStyle = 'rgba(249, 115, 22, 0.5)'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(offsetX, offsetY, ringSize, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      // Draw route polyline if restaurant selected
      if (selectedRestaurant && userLocation) {
        const userX = (canvas.width * 2) / 3
        const userY = (canvas.height * 2) / 3
        const restX = 50 + (selectedRestaurant.lng + 74.01) * 3000 - (canvas.width / 3)
        const restY = (canvas.height / 3) + (40.71 - selectedRestaurant.lat) * 3000

        // Main route line
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)'
        ctx.lineWidth = 4
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.beginPath()
        ctx.moveTo(userX, userY)
        ctx.lineTo(restX, restY)
        ctx.stroke()

        // Animated dashed overlay
        ctx.strokeStyle = '#3b82f6'
        ctx.lineWidth = 2
        ctx.setLineDash([8, 8])
        ctx.lineDashOffset = -animationRef.current * 0.1
        ctx.beginPath()
        ctx.moveTo(userX, userY)
        ctx.lineTo(restX, restY)
        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    const animate = () => {
      animationRef.current++
      drawMap()
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = mapRef.current?.clientWidth || canvas.width
      canvas.height = mapRef.current?.clientHeight || canvas.height
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [userLocation, selectedRestaurant])

  return (
    <div
      ref={mapRef}
      className="relative w-full h-full bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl overflow-hidden"
    />
  )
}
