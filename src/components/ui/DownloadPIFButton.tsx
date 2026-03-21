'use client';

import { useState } from 'react';
import { useToast } from './Toast';

interface DownloadPIFButtonProps {
  className?: string;
}

export default function DownloadPIFButton({ className = '' }: DownloadPIFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { showToast } = useToast();

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      // Lazy load @react-pdf/renderer (~600KB) solo cuando el usuario hace click
      const [{ pdf }, { default: PIFDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/components/pdf/PIFDocument'),
      ]);

      // Generar el PDF
      const blob = await pdf(<PIFDocument />).toBlob();

      // Crear URL y descargar
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Colores_del_Mundo_PIF.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast('PDF descargado correctamente', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showToast('Error al generar el PDF. Por favor, inténtalo de nuevo.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`btn-primary inline-flex items-center justify-center gap-2 ${className} ${
        isGenerating ? 'opacity-70 cursor-wait' : ''
      }`}
    >
      {isGenerating ? (
        <>
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Generando PDF...
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Descargar PIF (PDF)
        </>
      )}
    </button>
  );
}
