'use client'

import { useState } from 'react'
import { useFoodFinderStore } from '@/lib/store'
import { getTimeBasedSuggestion, getRestaurantsByCategory } from '@/lib/restaurants'
import { Moon, Sun, Sparkles, Search } from 'lucide-react'

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { isDarkMode, setIsDarkMode, categoryFilter, setCategoryFilter, setSelectedRestaurant } = useFoodFinderStore()

  const categories = [
    { id: 'all', label: 'All', emoji: '🍽️' },
    { id: 'veg', label: 'Veg', emoji: '🥗' },
    { id: 'fast-food', label: 'Fast Food', emoji: '🍔' },
    { id: 'cafe', label: 'Cafe', emoji: '☕' },
    { id: 'fine-dining', label: 'Fine Dining', emoji: '🍷' },
  ]

  const handleSurpriseMe = () => {
    const suggestion = getTimeBasedSuggestion(categoryFilter)
    setSelectedRestaurant(suggestion)
  }

  const handleCategoryChange = (id: string) => {
    setCategoryFilter(id as any)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (typeof document !== 'undefined') {
      if (!isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  return (
    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-card via-card to-transparent backdrop-blur-sm border-b border-border p-4 space-y-4 rounded-b-2xl shadow-sm z-10">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          FoodFinder
        </h1>

        <button
          onClick={toggleDarkMode}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Surprise Me Button */}
      <button
        onClick={handleSurpriseMe}
        className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95 duration-200"
      >
        <Sparkles className="w-4 h-4" />
        Surprise Me
      </button>

      {/* Category Filter */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full transition-all font-medium text-sm whitespace-nowrap ${
                categoryFilter === cat.id
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search restaurants or location..."
          className="w-full pl-10 pr-4 py-2.5 bg-muted text-foreground placeholder-muted-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>
    </div>
  )
}
