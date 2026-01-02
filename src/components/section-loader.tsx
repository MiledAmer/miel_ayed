"use client"

export default function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative flex items-center justify-center">
        {/* Hexagon container */}
        <div className="relative h-16 w-16">
          {/* Animated hexagons */}
          <div className="absolute inset-0 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <polygon
                points="50 1 95 25 95 75 50 99 5 75 5 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[#D4A574] opacity-40"
              />
            </svg>
          </div>

          <div className="absolute inset-0 animate-spin-reverse">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <polygon
                points="50 1 95 25 95 75 50 99 5 75 5 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[#F4B860]"
              />
            </svg>
          </div>

          {/* Center honeycomb */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 animate-pulse">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="currentColor" className="text-[#E8A040]" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
