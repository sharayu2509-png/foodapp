'use client'

export function LoadingSkeleton() {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-card/80 backdrop-blur-sm border-t border-border rounded-t-2xl p-6 shadow-2xl">
      <div className="flex items-start gap-4 px-2">
        {/* Image skeleton */}
        <div className="w-16 h-16 rounded-xl bg-muted animate-shimmer flex-shrink-0" />

        <div className="flex-1 space-y-2">
          {/* Title skeleton */}
          <div className="h-5 bg-muted rounded-lg w-2/3 animate-shimmer" />

          {/* Subtitle skeleton */}
          <div className="flex gap-2 mt-1">
            <div className="h-4 bg-muted rounded w-1/4 animate-shimmer" />
            <div className="h-4 bg-muted rounded w-1/4 animate-shimmer" />
          </div>

          {/* Info skeleton */}
          <div className="flex gap-3 mt-2">
            <div className="h-4 bg-muted rounded w-1/4 animate-shimmer" />
            <div className="h-4 bg-muted rounded w-1/4 animate-shimmer" />
          </div>
        </div>

        {/* Chevron skeleton */}
        <div className="w-5 h-5 rounded bg-muted animate-shimmer flex-shrink-0" />
      </div>
    </div>
  )
}
