'use client';

import { useState } from 'react';
import ResultCard from '@/components/ResultCard';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null); // Reset hasil jika ganti gambar
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null); // Kosongkan hasil sebelumnya
    
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();

      // CEK STATUS RESPONSE
      if (!response.ok) {
        throw new Error(data.detail || "Terjadi kesalahan pada server");
      }
      
      setResult(data);
    } catch (error: any) {
      console.error("Gagal menganalisis gambar:", error);
      alert(error.message || "Terjadi kesalahan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 font-sans flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Lens<span className="text-emerald-400">Arthropoda</span>
          </h1>
          <p className="text-neutral-400">Identifikasi serangga dan temukan fakta uniknya.</p>
        </div>

        {/* Upload Section */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center gap-6">
          <label 
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${preview ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/50'}`}
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Preview" className="h-full object-contain p-2 rounded-lg" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="mb-2 text-sm text-neutral-400"><span className="font-semibold">Klik untuk upload</span> atau drag and drop</p>
                <p className="text-xs text-neutral-500">PNG, JPG or JPEG (MAX. 5MB)</p>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>

          <button 
            onClick={analyzeImage}
            disabled={!image || loading}
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-medium rounded-xl transition-all duration-200 flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse">Menganalisis...</span>
            ) : (
              "Analisis Serangga"
            )}
          </button>
        </div>

        {/* Result Section */}
        {result && <ResultCard result={result} />}

      </div>
    </main>
  );
}