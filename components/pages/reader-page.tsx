"use client"

import type React from "react"

import { ArrowLeft, Settings } from "lucide-react"
import { useState } from "react"

interface ReaderPageProps {
  comicId: string
  onBack: () => void
}

// Mock comic pages
const comicPages = [
  "/comic-page-1.jpg",
  "/comic-page-2.jpg",
  "/comic-page-3.jpg",
  "/comic-page-4.jpg",
]

export default function ReaderPage({ comicId, onBack }: ReaderPageProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [showControls, setShowControls] = useState(true)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(comicPages.length - 1, prev + 1))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevPage()
    if (e.key === "ArrowRight") handleNextPage()
  }

  return (
    <div className="flex flex-col h-screen bg-black" onKeyDown={handleKeyPress} tabIndex={0}>
      {/* Header - Visible always */}
      <header className="bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Back">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-sm font-medium">
          {currentPage + 1} / {comicPages.length}
        </span>
        <button
          onClick={() => setShowControls(!showControls)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle controls"
        >
          <Settings className="w-6 h-6" />
        </button>
      </header>

      {/* Main Comic Display */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={comicPages[currentPage] || "/placeholder.svg"}
            alt={`Comic page ${currentPage + 1}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="bg-background border-t border-border p-4 space-y-4">
        {showControls && (
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              ← Anterior
            </button>
            <div className="flex items-center justify-center">
              <input
                type="range"
                min="0"
                max={comicPages.length - 1}
                value={currentPage}
                onChange={(e) => setCurrentPage(Number.parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === comicPages.length - 1}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              Siguiente →
            </button>
          </div>
        )}

        {/* Page Indicator */}
        <div className="flex gap-1 justify-center">
          {comicPages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentPage ? "bg-primary w-8" : "bg-muted w-2 hover:bg-muted-foreground"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        #hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
