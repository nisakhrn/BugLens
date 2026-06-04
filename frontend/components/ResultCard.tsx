import ReactMarkdown from 'react-markdown';

interface ResultProps {
  result: {
    top_prediction: string;
    predictions: { class: string; prob: number }[];
    ai_insight: string;
  };
}

export default function ResultCard({ result }: ResultProps) {
  return (
    <div className="bg-white border rounded-3xl p-5 lg:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{borderColor: '#c7d2fe', boxShadow: '0 8px 40px rgba(99,102,241,0.08)'}}>

      {/* Top prediction */}
      <div className="mb-3 pb-3 border-b" style={{borderColor: '#e0e7ff'}}>
        <p className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{color: '#6366f1'}}>Hasil Prediksi Utama</p>
        <div className="text-xl lg:text-2xl font-extrabold text-slate-900 capitalize mt-1 leading-tight">
          {result.top_prediction.replace(/_/g, ' ')}
        </div>

        {/* Probability badges */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {result.predictions.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] lg:text-[11px] font-semibold"
              style={idx === 0
                ? { background: 'linear-gradient(135deg, #6366f1, #3b82f6)', color: '#fff' }
                : { background: '#eef2ff', color: '#4338ca', border: '0.5px solid #c7d2fe' }
              }
            >
              <span className="capitalize">{p.class.replace(/_/g, ' ')}</span>
              <span style={{opacity: idx === 0 ? 0.85 : 0.65}}>
                {(p.prob * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>

        {/* Confidence bar */}
        <div className="mt-2.5">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
            <span>Confidence</span>
            <span className="font-semibold" style={{color: '#6366f1'}}>{(result.predictions[0]?.prob * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{background: '#e0e7ff'}}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(result.predictions[0]?.prob * 100).toFixed(1)}%`,
                background: 'linear-gradient(90deg, #6366f1, #3b82f6)'
              }}
            />
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs" style={{background: 'linear-gradient(135deg, #eef2ff, #eff6ff)'}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="18" cy="6" r="3"/>
            </svg>
          </div>
          <h3 className="text-sm lg:text-base font-bold text-slate-800">Informasi Spesies (AI Insights)</h3>
        </div>
        <div className="prose prose-indigo max-w-none text-slate-600 leading-snug text-[12px] lg:text-[13px]">
          <ReactMarkdown>
            {result.ai_insight}
          </ReactMarkdown>
        </div>
      </div>

    </div>
  );
}