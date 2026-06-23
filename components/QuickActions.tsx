'use client'

import { useEffect, useState } from 'react'
import { useFoodFinderStore } from '@/lib/store'
import { Heart, History, MapPin } from 'lucide-react'

export function QuickActions() {
  const [recentRestaurants, setRecentRestaurants] = useState<string[]>([])
  const { setSelectedRestaurant } = useFoodFinderStore()

  useEffect(() => {
    // Load recent restaurants from localStorage
    const saved = localStorage.getItem('recentRestaurants')
    if (saved) {
      try {
        setRecentRestaurants(JSON.parse(saved).slice(0, 3))
      } catch (e) {
        console.error('[v0] Error loading recent restaurants:', e)
      }
    }
  }, [])

  const handleRecent = (id: string) => {
    // This would be enhanced in a full implementation
    console.log('[v0] Clicked recent restaurant:', id)
  }

  return (
    <div className="absolute top-[280px] left-4 right-4 space-y-3 z-10 pointer-events-none">
      {recentRestaurants.length > 0 && (
        <div className="pointer-events-auto bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase">Recent</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {recentRestaurants.map((id) => (
              <button
                key={id}
                onClick={() => handleRecent(id)}
                className="flex-shrink-0 px-3 py-1.5 bg-muted rounded-lg text-xs font-medium text-foreground hover:bg-muted/80 transition-all"
              >
                Restaurant #{id}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="pointer-events-auto flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary/20 transition-colors">
          <Heart className="w-4 h-4" />
          <span className="hidden sm:inline">Favorites</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-accent/10 text-accent rounded-lg font-medium text-sm hover:bg-accent/20 transition-colors">
          <MapPin className="w-4 h-4" />
          <span className="hidden sm:inline">Nearby</span>
        </button>
      </div>
    </div>
  )
}
