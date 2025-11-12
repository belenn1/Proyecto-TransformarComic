"use client"

import type React from "react"

import { ArrowLeft, Upload, Search } from "lucide-react"
import { useState } from "react"

interface CreatorPageProps {
  onBack: () => void
  onComicSelect: (comicId: string) => void
}

const mockCreatorComics = [
  {
    id: "creator-1",
    title: "El Eternauta",
    description: "Una historia de ciencia ficción y misterio",
    pages: 24,
  },
  {
    id: "creator-2",
    title: "La Ciudad Perdida",
    description: "Aventura en las ruinas antiguas",
    pages: 18,
  },
  {
    id: "creator-3",
    title: "Neon Dreams",
    description: "Un viaje por el futuro",
    pages: 32,
  },
]

export default function CreatorPage({ onBack, onComicSelect }: CreatorPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const filteredComics = mockCreatorComics.filter((comic) =>
    comic.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Back">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Mi Estudio</h1>
      </header>

      {/* Upload Section */}
      <div className="px-4 py-6 border-b border-border">
        <div className="bg-card rounded-lg border border-border p-6 text-center">
          <label className="cursor-pointer block">
            <div className="flex flex-col items-center gap-3 text-center">
              <Upload className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold">Subir Archivo ↑</p>
                <p className="text-sm text-muted-foreground mt-1">Haz clic o arrastra tus archivos aquí</p>
              </div>
            </div>
            <input type="file" multiple accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Archivos cargados:</p>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="text-sm text-foreground truncate">
                📄 {file.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="px-4 py-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscador"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Comics List */}
      <div className="flex-1 px-4 py-6 space-y-4">
        {filteredComics.length > 0 ? (
          filteredComics.map((comic) => (
            <div key={comic.id} className="bg-card rounded-lg border border-border p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground">{comic.title}</h3>
                <p className="text-sm text-muted-foreground">{comic.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{comic.pages} páginas</span>
                <button
                  onClick={() => onComicSelect(comic.id)}
                  className="px-4 py-1 bg-primary text-primary-foreground text-sm rounded-lg hover:opacity-90 transition-opacity"
                >
                  Leer
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron cómics</p>
          </div>
        )}
      </div>
    </div>
  )
}
