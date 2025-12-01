'use client';

import { useState } from 'react';
import { Calendar, CheckCircle, X } from 'lucide-react';

interface PublicationSchedulerProps {
  comic: any;
  onSchedule: (date: string, autoPublish: boolean) => void;
  onClose: () => void;
}

export default function PublicationScheduler({
  comic,
  onSchedule,
  onClose
}: PublicationSchedulerProps) {
  const [date, setDate] = useState(comic.scheduledDate || '');
  const [autoPublish, setAutoPublish] = useState(comic.autoPublish || false);

  const handleSchedule = () => {
    if (!date) {
      alert('Por favor selecciona una fecha');
      return;
    }
    onSchedule(date, autoPublish);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md border border-purple-500/30">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            Programar Publicación
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <p className="text-white font-semibold mb-2">Cómic: {comic.title}</p>
            <p className="text-gray-400 text-sm">Selecciona cuándo deseas publicar</p>
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Fecha de Publicación
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Auto Publish Checkbox */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 flex items-start gap-3">
            <input
              type="checkbox"
              id="auto-publish"
              checked={autoPublish}
              onChange={(e) => setAutoPublish(e.target.checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <label
                htmlFor="auto-publish"
                className="flex items-center gap-2 text-purple-300 font-semibold cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                Publicación Automática
              </label>
              <p className="text-purple-200/70 text-sm mt-1">
                El cómic se publicará automáticamente en la fecha y hora seleccionadas
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="text-sm text-gray-400 bg-gray-800/50 rounded-lg p-3">
            {autoPublish && date ? (
              <p>
                Tu cómic se publicará automáticamente el <strong>{date}</strong> a las 00:00
              </p>
            ) : date ? (
              <p>
                Puedes publicar tu cómic manualmente en cualquier momento a partir del <strong>{date}</strong>
              </p>
            ) : (
              <p>Selecciona una fecha para continuar</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSchedule}
            className="flex-1 px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition font-semibold"
          >
            Programar
          </button>
        </div>
      </div>
    </div>
  );
}
