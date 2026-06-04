import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #6366f1, #3b82f6)'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-800">Bug<span className="text-indigo-500">Lens</span></span>
          </div>
          <Link
            href="/deteksi"
            className="text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200"
            style={{background: 'linear-gradient(135deg, #6366f1, #3b82f6)', boxShadow: '0 4px 15px rgba(99,102,241,0.3)'}}
          >
            Coba Deteksi
          </Link>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-4 relative overflow-hidden" style={{background: 'linear-gradient(160deg, #f5f3ff 0%, #eff6ff 50%, #e0f2fe 100%)'}}>
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-50 blur-3xl pointer-events-none" style={{background: 'radial-gradient(circle, #a5b4fc, transparent)'}} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-40 blur-3xl pointer-events-none" style={{background: 'radial-gradient(circle, #bae6fd, transparent)'}} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-600 mb-8 tracking-wide uppercase" style={{background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(59,130,246,0.08))', borderColor: '#a5b4fc'}}>
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            AI-Powered Insect Identifier
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Identifikasi Serangga<br />
            <span style={{background: 'linear-gradient(135deg, #6366f1, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Dalam Sekejap</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Upload foto serangga yang kamu temukan, dan BugLens akan mengidentifikasi spesies, taksonomi, habitat, serta fakta uniknya menggunakan AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/deteksi"
              className="text-white font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-200 inline-flex items-center justify-center"
              style={{background: 'linear-gradient(135deg, #6366f1, #3b82f6)', boxShadow: '0 8px 25px rgba(99,102,241,0.35)'}}
            >
              Mulai Identifikasi →
            </Link>
            <a
              href="#cara-kerja"
              className="border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-200 bg-white/70"
            >
              Cara Kerja
            </a>
          </div>
        </div>

        <div className="absolute top-24 left-16 h-2 w-2 rounded-full bg-indigo-300 opacity-40" />
        <div className="absolute top-36 right-24 h-1.5 w-1.5 rounded-full bg-sky-300 opacity-30" />
        <div className="absolute top-52 left-1/3 h-2.5 w-2.5 rounded-full bg-indigo-200 opacity-30" />
        <div className="absolute bottom-20 left-1/4 h-1.5 w-1.5 rounded-full bg-slate-300 opacity-20" />
        <div className="absolute bottom-28 right-1/4 h-2 w-2 rounded-full bg-sky-200 opacity-25" />
      </section>

      <section id="cara-kerja" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-500 font-semibold text-sm uppercase tracking-widest mb-2">Cara Kerja</p>
            <h2 className="text-3xl font-bold text-slate-800">Teknologi di Balik BugLens</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Upload Foto', desc: 'Upload gambar serangga yang kamu temukan ke BugLens.' },
              { step: '02', title: 'Analisis AI', desc: 'Model ML dan Gemini AI memproses gambar untuk identifikasi spesies.' },
              { step: '03', title: 'Lihat Insight', desc: 'Baca nama ilmiah, habitat, taksonomi, dan informasi singkat lainnya.' },
            ].map((f, i) => (
              <div key={i} className="border rounded-2xl p-6 transition-all duration-200 group hover:shadow-lg hover:shadow-indigo-100" style={{background: 'linear-gradient(135deg, #f5f3ff, #eff6ff)', borderColor: '#c7d2fe'}}>
                <div className="w-12 h-12 rounded-full text-white font-bold text-lg flex items-center justify-center mb-4" style={{background: 'linear-gradient(135deg, #6366f1, #3b82f6)'}}>{f.step}</div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
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