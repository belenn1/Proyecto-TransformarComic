"use client"

import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"
import ComicCard from "@/components/comic-card"

const mockComics = [
  { id: "1", title: "El Eternauta", author: "Oesterheld", cover: "/comic-cover-el-eternauta.jpg" },
  { id: "2", title: "Superman", author: "Autor", cover: "/comic-cover-superman.jpg" },
  { id: "3", title: "Spider-Man", author: "Stan Lee", cover: "/396px-Spider-Man50.jpg" },
  { id: "4", title: "Batman", author: "DC Comics", cover: "/batman-comic-cover.png" },
]

interface HomePageProps {
  onComicSelect: (comicId: string) => void
  onCreatorClick: () => void
}

export default function HomePage({ onComicSelect, onCreatorClick }: HomePageProps) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("comics-carousel")
    if (container) {
      const scrollAmount = 280
      const newPosition =
        direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount
      container.scrollLeft = newPosition
      setScrollPosition(newPosition)
    }
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-background border-b border-border px-4 py-4 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">ComicHub</h1>
          <button
            onClick={onCreatorClick}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Crear</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Bienvenido a ComicHub</h2>
          <p className="text-muted-foreground mb-8">Descubre y lee cómics optimizados para tu dispositivo móvil</p>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="px-4 py-8">
        <h3 className="text-lg font-semibold mb-4">Cómics Destacados</h3>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div
            id="comics-carousel"
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 hide-scrollbar"
          >
            {mockComics.map((comic) => (
              <button key={comic.id} onClick={() => onComicSelect(comic.id)} className="flex-shrink-0 snap-start">
                <ComicCard comic={comic} />
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-4 py-8">
        <h3 className="text-lg font-semibold mb-4">Nuevas Publicaciones</h3>
        <div className="space-y-3">
          {mockComics.slice(0, 2).map((comic) => (
            <button
              key={comic.id}
              onClick={() => onComicSelect(comic.id)}
              className="w-full p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors text-left"
            >
              <h4 className="font-semibold">{comic.title}</h4>
              <p className="text-sm text-muted-foreground">por {comic.author}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
