"use client"
import { useEffect, useState } from "react"


export default function LoadingPageComponent() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 10)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-8">
        {/* Honey Jar Container */}
        <div className="relative h-80 w-56">
          {/* Jar Body */}
          <div className="absolute inset-x-0 bottom-0 top-16 rounded-[2.5rem] border-4 border-primary/20 bg-linear-to-br from-white/40 to-white/10 backdrop-blur-md shadow-2xl">
            {/* Honey Fill */}
            <div
              className="absolute inset-x-0 bottom-0 rounded-[2.5rem] bg-linear-to-br from-accent to-primary transition-all duration-300 ease-out"
              style={{
                height: `${progress}%`,
              }}
            >
              {/* Honey Shine Effect */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-br from-white/20 via-transparent to-transparent" />
              {/* Honey Bubbles */}
              {progress > 20 && (
                <>
                  <div
                    className="absolute left-1/4 h-3 w-3 animate-bounce rounded-full bg-white/20"
                    style={{
                      bottom: `${Math.random() * 30 + 10}%`,
                      animationDelay: "0s",
                      animationDuration: "2s",
                    }}
                  />
                  <div
                    className="absolute right-1/4 h-2 w-2 animate-bounce rounded-full bg-white/15"
                    style={{
                      bottom: `${Math.random() * 40 + 20}%`,
                      animationDelay: "0.5s",
                      animationDuration: "2.5s",
                    }}
                  />
                  <div
                    className="absolute left-1/3 h-2.5 w-2.5 animate-bounce rounded-full bg-white/10"
                    style={{
                      bottom: `${Math.random() * 30 + 15}%`,
                      animationDelay: "1s",
                      animationDuration: "3s",
                    }}
                  />
                </>
              )}
            </div>

            {/* Glass Reflection Effect */}
            <div className="absolute inset-2 rounded-[2.3rem] bg-linear-to-br from-white/30 via-white/5 to-transparent pointer-events-none" />
          </div>

          {/* Jar Neck - Open Top */}
          <div className="absolute inset-x-8 top-8 h-10 rounded-t-2xl border-4 border-b-0 border-primary/20 bg-linear-to-br from-white/40 to-white/10 backdrop-blur-md shadow-lg">
            {/* Inner rim for open jar effect */}
            <div className="absolute inset-0 rounded-t-2xl bg-linear-to-b from-primary/5 to-transparent" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-3">
          <div className="text-2xl font-semibold tracking-tight text-foreground">Loading...</div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -left-16 top-12 h-16 w-16 animate-pulse rounded-full bg-accent/10 blur-xl" />
        <div className="absolute -right-20 bottom-24 h-20 w-20 animate-pulse rounded-full bg-primary/10 blur-xl" />
      </div>
    </div>
  )
}
