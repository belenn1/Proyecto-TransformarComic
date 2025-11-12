interface ComicCardProps {
  comic: {
    id: string
    title: string
    author: string
    cover: string
  }
}

export default function ComicCard({ comic }: ComicCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-40 h-56 rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
        <img src={comic.cover || "/placeholder.svg"} alt={comic.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 hover:opacity-100 transition-opacity" />
      </div>
      <div className="w-40">
        <h4 className="font-semibold text-sm truncate">{comic.title}</h4>
        <p className="text-xs text-muted-foreground truncate">{comic.author}</p>
      </div>
    </div>
  )
}
