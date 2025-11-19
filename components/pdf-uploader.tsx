'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, Loader } from 'lucide-react';

interface PDFUploaderProps {
  onUpload: (data: any) => void;
}

export default function PDFUploader({ onUpload }: PDFUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Fantasy');
  const [preview, setPreview] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const GENRES = ['Fantasy', 'Sci-Fi', 'Comedy', 'Drama', 'Horror', 'Romance'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      // Simulate PDF page count
      const pageCount = Math.floor(Math.random() * 150) + 30;
      if (!title) {
        setTitle(selectedFile.name.replace('.pdf', ''));
      }
    } else {
      alert('Por favor selecciona un archivo PDF válido');
    }
  };

  const handleUpload = () => {
    if (!file || !title) {
      alert('Por favor completa todos los campos');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time based on file size
    const processingTime = Math.min(3000 + (file.size / 1024 / 1024) * 500, 10000);
    
    setTimeout(() => {
      const pageCount = Math.floor(Math.random() * 150) + 30;
      onUpload({
        title,
        genre,
        pages: pageCount,
        file
      });

      // Reset form
      setFile(null);
      setTitle('');
      setGenre('Fantasy');
      setIsProcessing(false);
    }, processingTime);
  };

  if (isProcessing) {
    return (
      <div className="space-y-4 text-center py-12">
        <div className="flex justify-center">
          <Loader className="w-12 h-12 text-purple-400 animate-spin" />
        </div>
        <h3 className="text-xl font-bold text-white">Transformando tu PDF</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Estamos convirtiendo <strong>{title}</strong> a formato vertical optimizado para celular. Esto puede tomar unos momentos...
        </p>
        <div className="w-full bg-gray-800 rounded-full h-2 max-w-md mx-auto overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full animate-pulse" style={{
            animation: 'progress 2s ease-in-out infinite'
          }} />
        </div>
      </div>
    );
  }

  if (preview && file) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-6 mb-4">
          <h3 className="text-lg font-bold text-white mb-4">Vista Previa de tu Cómic</h3>
          <p className="text-gray-400 mb-4">
            Así se vería tu cómic <strong>{title}</strong> en un celular:
          </p>

          {/* Mobile Preview */}
          <div className="flex justify-center my-6">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-64 h-96 bg-black rounded-3xl border-8 border-gray-900 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gray-800 flex flex-col">
                  {/* Phone Top Bar */}
                  <div className="h-8 bg-black flex items-center justify-between px-6 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex gap-1">●●●●●</div>
                  </div>

                  {/* Comic Viewer */}
                  <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-900 to-black">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                      <p className="text-white font-bold text-sm">{title}</p>
                      <p className="text-gray-400 text-xs">Página 1 de {Math.floor(Math.random() * 150) + 30}</p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="h-12 bg-black flex items-center justify-between px-4">
                    <div className="text-white text-sm">←</div>
                    <div className="text-gray-400 text-xs">Anterior | Siguiente</div>
                    <div className="text-white text-sm">→</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm text-center">
            Tu cómic se convertirá automáticamente a formato vertical para una lectura cómoda en celular
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPreview(false)}
            className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
          >
            Volver
          </button>
          <button
            onClick={handleUpload}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition font-semibold"
          >
            Publicar Cómic
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* File Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Selecciona tu PDF</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-purple-500/50 rounded-lg p-8 cursor-pointer hover:border-purple-500 hover:bg-purple-500/5 transition text-center"
        >
          <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
          <p className="text-white font-semibold">Arrastra tu PDF aquí o haz clic</p>
          <p className="text-gray-400 text-sm mt-1">Soporta archivos de cualquier tamaño</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {file && (
        <>
          {/* File Info */}
          <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-400" />
            <div className="flex-1">
              <p className="text-white font-semibold">{file.name}</p>
              <p className="text-gray-400 text-sm">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Título del Cómic</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: El Eternauta"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Género</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            >
              {GENRES.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Info Box */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-300 text-sm font-semibold">Conversión automática</p>
              <p className="text-blue-200/70 text-xs">
                Tu PDF se convertirá automáticamente a formato vertical para lecturas óptimas en celular
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setFile(null);
                setTitle('');
              }}
              className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              onClick={() => setPreview(true)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition font-semibold"
            >
              Ver Vista Previa
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes progress {
          0%, 100% { width: 0%; }
          50% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
