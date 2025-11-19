interface Comic {
  id: string;
  title: string;
  author: string;
  genre: string;
  pages: number;
  uploadDate: string;
  scheduledDate?: string;
  autoPublish: boolean;
  views: number;
  likes: number;
  pdf?: File;
  cover?: string;
  pageImages?: string[];
}

interface UserLike {
  comicId: string;
  userId: string;
  timestamp: number;
}

const COMICS_KEY = 'comicverse_comics';
const LIKES_KEY = 'comicverse_likes';
const USER_ID_KEY = 'comicverse_user_id';

const DEFAULT_COMICS = [
  {
    title: 'El Eternauta',
    author: 'Héctor Germán Oesterheld',
    genre: 'Sci-Fi',
    pages: 62,
    views: 1250,
    likes: 342,
    cover: '/comics/eternauta-cover.jpg',
    pageImages: Array.from({ length: 62 }, (_, i) => `/comics/eternauta-page-${i + 1}.jpg`),
  },
  {
    title: 'Mafalda',
    author: 'Quino',
    genre: 'Comedy',
    pages: 45,
    views: 890,
    likes: 456,
    cover: '/comics/mafalda-cover.jpg',
    pageImages: Array.from({ length: 45 }, (_, i) => `/comics/mafalda-page-${i + 1}.jpg`),
  },
  {
    title: 'Persépolis',
    author: 'Marjane Satrapi',
    genre: 'Drama',
    pages: 368,
    views: 756,
    likes: 523,
    cover: '/comics/persepolis-cover.jpg',
    pageImages: Array.from({ length: 368 }, (_, i) => `/comics/persepolis-page-${i + 1}.jpg`),
  },
  {
    title: 'Akira',
    author: 'Katsuhiro Otomo',
    genre: 'Sci-Fi',
    pages: 2182,
    views: 2100,
    likes: 1890,
    cover: '/comics/akira-cover.jpg',
    pageImages: Array.from({ length: 100 }, (_, i) => `/comics/akira-page-${i + 1}.jpg`),
  },
  {
    title: 'Watchmen',
    author: 'Alan Moore',
    genre: 'Fantasy',
    pages: 405,
    views: 1650,
    likes: 987,
    cover: '/comics/watchmen-cover.jpg',
    pageImages: Array.from({ length: 405 }, (_, i) => `/comics/watchmen-page-${i + 1}.jpg`),
  },
  {
    title: 'V de Vendetta',
    author: 'Alan Moore',
    genre: 'Drama',
    pages: 296,
    views: 1340,
    likes: 765,
    cover: '/comics/vendetta-cover.jpg',
    pageImages: Array.from({ length: 296 }, (_, i) => `/comics/vendetta-page-${i + 1}.jpg`),
  },
  {
    title: 'Sandman',
    author: 'Neil Gaiman',
    genre: 'Fantasy',
    pages: 1352,
    views: 1560,
    likes: 1203,
    cover: '/comics/sandman-cover.jpg',
    pageImages: Array.from({ length: 100 }, (_, i) => `/comics/sandman-page-${i + 1}.jpg`),
  },
  {
    title: 'The Walking Dead',
    author: 'Robert Kirkman',
    genre: 'Horror',
    pages: 3072,
    views: 2890,
    likes: 2145,
    cover: '/comics/walking-dead-cover.jpg',
    pageImages: Array.from({ length: 100 }, (_, i) => `/comics/walking-dead-page-${i + 1}.jpg`),
  },
  {
    title: 'Corto Maltés',
    author: 'Hugo Pratt',
    genre: 'Adventure',
    pages: 160,
    views: 567,
    likes: 341,
    cover: '/comics/corto-maltes-cover.jpg',
    pageImages: Array.from({ length: 160 }, (_, i) => `/comics/corto-maltes-page-${i + 1}.jpg`),
  },
  {
    title: 'La Casa de los Espíritus',
    author: 'Isabel Allende (adaptación)',
    genre: 'Drama',
    pages: 128,
    views: 432,
    likes: 267,
    cover: '/comics/casa-espiritus-cover.jpg',
    pageImages: Array.from({ length: 128 }, (_, i) => `/comics/casa-espiritus-page-${i + 1}.jpg`),
  },
  {
    title: 'Maus',
    author: 'Art Spiegelman',
    genre: 'Drama',
    pages: 295,
    views: 789,
    likes: 612,
    cover: '/comics/maus-cover.jpg',
    pageImages: Array.from({ length: 295 }, (_, i) => `/comics/maus-page-${i + 1}.jpg`),
  },
  {
    title: 'Saga',
    author: 'Brian K. Vaughan',
    genre: 'Sci-Fi',
    pages: 960,
    views: 1203,
    likes: 834,
    cover: '/comics/saga-cover.jpg',
    pageImages: Array.from({ length: 100 }, (_, i) => `/comics/saga-page-${i + 1}.jpg`),
  },
];

// Obtener o crear ID de usuario único
export function getUserId(): string {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

// Obtener todos los cómics
export function getAllComics(): Comic[] {
  try {
    const data = localStorage.getItem(COMICS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Inicializar cómics predeterminados si no hay ninguno
export function initializeDefaultComics(): void {
  const existingComics = getAllComics();
  
  // Solo inicializar si no hay cómics guardados
  if (existingComics.length === 0) {
    const comicsToAdd = DEFAULT_COMICS.map(comic => ({
      ...comic,
      uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      scheduledDate: undefined,
      autoPublish: true,
      id: `comic_${Math.random().toString(36).substr(2, 9)}`,
    }));
    
    localStorage.setItem(COMICS_KEY, JSON.stringify(comicsToAdd));
  }
}

// Guardar cómic nuevo
export function addComic(comic: Omit<Comic, 'id'>): Comic {
  const comics = getAllComics();
  const newComic: Comic = {
    ...comic,
    id: `comic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
  comics.push(newComic);
  localStorage.setItem(COMICS_KEY, JSON.stringify(comics));
  return newComic;
}

// Actualizar cómic
export function updateComic(id: string, updates: Partial<Comic>): Comic | null {
  const comics = getAllComics();
  const index = comics.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  comics[index] = { ...comics[index], ...updates };
  localStorage.setItem(COMICS_KEY, JSON.stringify(comics));
  return comics[index];
}

// Eliminar cómic
export function deleteComic(id: string): boolean {
  const comics = getAllComics().filter(c => c.id !== id);
  localStorage.setItem(COMICS_KEY, JSON.stringify(comics));
  return true;
}

// Obtener cómic por ID
export function getComicById(id: string): Comic | null {
  const comics = getAllComics();
  return comics.find(c => c.id === id) || null;
}

// Incrementar views
export function incrementViews(comicId: string): void {
  const comic = getComicById(comicId);
  if (comic) {
    updateComic(comicId, { views: comic.views + 1 });
  }
}

// Obtener likes del usuario actual
export function getUserLikes(): string[] {
  try {
    const userId = getUserId();
    const likes = localStorage.getItem(LIKES_KEY);
    const likesList: UserLike[] = likes ? JSON.parse(likes) : [];
    return likesList
      .filter(l => l.userId === userId)
      .map(l => l.comicId);
  } catch {
    return [];
  }
}

// Toggle like de un cómic
export function toggleComicLike(comicId: string): boolean {
  const userId = getUserId();
  const likes = localStorage.getItem(LIKES_KEY);
  let likesList: UserLike[] = likes ? JSON.parse(likes) : [];
  
  const existingLikeIndex = likesList.findIndex(
    l => l.comicId === comicId && l.userId === userId
  );

  if (existingLikeIndex > -1) {
    // Remover like
    likesList.splice(existingLikeIndex, 1);
    updateComic(comicId, { likes: Math.max(0, (getComicById(comicId)?.likes || 0) - 1) });
  } else {
    // Agregar like
    likesList.push({
      comicId,
      userId,
      timestamp: Date.now()
    });
    updateComic(comicId, { likes: (getComicById(comicId)?.likes || 0) + 1 });
  }

  localStorage.setItem(LIKES_KEY, JSON.stringify(likesList));
  return existingLikeIndex === -1;
}

// Buscar cómics
export function searchComics(query: string, genre: string = 'All'): Comic[] {
  const comics = getAllComics();
  return comics.filter(comic => {
    const matchesSearch = query === '' || 
      comic.title.toLowerCase().includes(query.toLowerCase()) ||
      comic.author.toLowerCase().includes(query.toLowerCase());
    
    const matchesGenre = genre === 'All' || comic.genre === genre;
    
    return matchesSearch && matchesGenre;
  });
}

// Obtener cómics publicados (para vista de usuarios)
export function getPublishedComics(genre: string = 'All'): Comic[] {
  const comics = getAllComics();
  const now = new Date().toISOString().split('T')[0];
  
  return comics.filter(comic => {
    const isPublished = !comic.scheduledDate || comic.scheduledDate <= now;
    const matchesGenre = genre === 'All' || comic.genre === genre;
    return isPublished && matchesGenre;
  });
}
