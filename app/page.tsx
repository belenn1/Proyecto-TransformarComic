"use client"

import { useState } from "react"
import HomePage from "@/components/pages/home-page"
import ReaderPage from "@/components/pages/reader-page"
import CreatorPage from "@/components/pages/creator-page"

type PageView = "home" | "reader" | "creator"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageView>("home")
  const [selectedComicId, setSelectedComicId] = useState<string | null>(null)

  const handleComicSelect = (comicId: string) => {
    setSelectedComicId(comicId)
    setCurrentPage("reader")
  }

  const handleBackHome = () => {
    setCurrentPage("home")
    setSelectedComicId(null)
  }

  const handleGoToCreator = () => {
    setCurrentPage("creator")
  }

  return (
    <main className="bg-background min-h-screen text-foreground">
      {currentPage === "home" && <HomePage onComicSelect={handleComicSelect} onCreatorClick={handleGoToCreator} />}
      {currentPage === "reader" && selectedComicId && <ReaderPage comicId={selectedComicId} onBack={handleBackHome} />}
      {currentPage === "creator" && <CreatorPage onBack={handleBackHome} onComicSelect={handleComicSelect} />}
    </main>
  )
}
