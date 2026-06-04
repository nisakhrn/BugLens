'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import ResultCard from '@/components/ResultCard';

export default function DeteksiPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Terjadi kesalahan pada server');
      }

      setResult(data);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error: any) {
      console.error('Gagal menganalisis gambar:', error);
      alert(error.message || 'Terjadi kesalahan saat menghubungi server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #6366f1, #3b82f6)'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-800">Bug<span className="text-indigo-500">Lens</span></span>
          </Link>
          <Link
            href="/"
            className="border text-indigo-600 hover:bg-indigo-50 text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
            style={{borderColor: '#a5b4fc'}}
          >
            Kembali ke Beranda
          </Link>
        </div>
      </nav>

      <section className="pt-20 pb-6 px-4 relative overflow-hidden" style={{background: 'linear-gradient(160deg, #f5f3ff 0%, #eff6ff 50%, #e0f2fe 100%)'}}>
        <div className="absolute top-8 left-8 w-56 h-56 rounded-full opacity-50 blur-3xl pointer-events-none" style={{background: 'radial-gradient(circle, #a5b4fc, transparent)'}} />
        <div className="absolute bottom-8 right-8 w-72 h-72 rounded-full opacity-40 blur-3xl pointer-events-none" style={{background: 'radial-gradient(circle, #bae6fd, transparent)'}} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-600 mb-6 tracking-wide uppercase" style={{background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(59,130,246,0.08))', borderColor: '#a5b4fc'}}>
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Halaman Deteksi
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            Upload Foto Serangga
          </h1>
        </div>
      </section>

      <section className="px-4 pt-4 pb-12 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="bg-white border rounded-3xl p-5 sm:p-6 flex flex-col items-center gap-4" style={{borderColor: '#c7d2fe', boxShadow: '0 8px 40px rgba(99,102,241,0.06)'}}>
            <div className="w-full flex items-center justify-between text-xs text-slate-400 uppercase tracking-widest">
              <span>Upload Gambar</span>
              <span>JPG / PNG</span>
            </div>

            <label
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200
                ${dragOver ? 'scale-[1.01]' : ''}`}
              style={{
                borderColor: dragOver || preview ? '#818cf8' : '#a5b4fc',
                background: dragOver || preview ? 'linear-gradient(135deg, #f5f3ff, #eff6ff)' : 'linear-gradient(135deg, #fafaff, #f5f3ff)'
              }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Preview" className="h-full max-h-40 object-contain p-2 rounded-xl" />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-center px-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #eef2ff, #eff6ff)'}}>
                    <svg className="w-7 h-7" style={{color: '#6366f1'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-600"><span style={{color: '#6366f1'}}>Klik untuk upload</span> atau drag and drop</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG atau JPEG (Maks. 5MB)</p>
                  </div>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>

            {preview && (
              <button
                onClick={() => { setPreview(null); setImage(null); setResult(null); }}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors"
              >
                ✕ Hapus gambar
              </button>
            )}

            <button
              onClick={analyzeImage}
              disabled={!image || loading}
              className="w-full py-3.5 px-4 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold rounded-2xl transition-all duration-200 flex justify-center items-center gap-2 disabled:shadow-none"
              style={image && !loading ? {background: 'linear-gradient(135deg, #6366f1, #3b82f6)', boxShadow: '0 4px 20px rgba(99,102,241,0.3)'} : {}}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" style={{color: '#a5b4fc'}} fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Menganalisis...</span>
                </>
              ) : (
                'Analisis Serangga'
              )}
            </button>
          </div>

          <div ref={resultRef} className="min-h-[300px]">
            {result ? (
              <ResultCard result={result} />
            ) : (
              <div className="h-full border-2 border-dashed rounded-3xl p-8 flex items-center justify-center text-center" style={{borderColor: '#c7d2fe', background: 'linear-gradient(135deg, #fafaff, #f5f3ff)'}}>
                <div>
                  <p className="text-sm uppercase tracking-widest font-semibold mb-2" style={{color: '#6366f1'}}>Hasil Identifikasi</p>
                  <p className="text-slate-500">Hasil analisis akan muncul di panel ini setelah kamu upload gambar dan klik Analisis Serangga.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="text-slate-400 py-10 px-4 text-center" style={{background: '#0f172a'}}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{background: 'linear-gradient(135deg, #6366f1, #3b82f6)'}}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <span className="text-white font-bold">Bug<span className="text-indigo-400">Lens</span></span>
        </div>
        <p className="text-xs text-slate-500">Ditenagai oleh Machine Learning & Gemini AI · Final Project ML Lab</p>
      </footer>
    </main>
  );
}