'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import ComicBrowser from '@/components/comic-browser';
import ComicReader from '@/components/comic-reader';
import CreatorDashboard from '@/components/creator-dashboard';
import { initializeDefaultComics } from '@/lib/storage';

export default function Home() {
  const [view, setView] = useState<'browser' | 'reader' | 'creator'>('browser');
  const [selectedComic, setSelectedComic] = useState<any>(null);

  useEffect(() => {
    initializeDefaultComics();
  }, []);

  const handleSelectComic = (comic: any) => {
    setSelectedComic(comic);
    setView('reader');
  };

  const handleBack = () => {
    setView('browser');
    setSelectedComic(null);
  };

  const handleCreatorClick = () => {
    setView('creator');
  };

  const handleBackToHome = () => {
    setView('browser');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
      {view === 'browser' && (
        <ComicBrowser 
          onSelectComic={handleSelectComic}
          onCreatorClick={handleCreatorClick}
        />
      )}
      {view === 'reader' && selectedComic && (
        <ComicReader comic={selectedComic} onBack={handleBack} />
      )}
      {view === 'creator' && (
        <CreatorDashboard onBack={handleBackToHome} />
      )}
    </div>
  );
}
