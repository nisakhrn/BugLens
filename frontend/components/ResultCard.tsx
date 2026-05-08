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
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-8 shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="mb-6 pb-6 border-b border-neutral-800">
          <h2 className="text-xs font-bold tracking-widest text-emerald-500 uppercase mb-1">Hasil Prediksi Utama</h2>
          <div className="text-3xl font-medium text-white capitalize">
            {result.top_prediction.replace(/_/g, ' ')}
          </div>
          <div className="flex gap-2 mt-3">
            {result.predictions.map((p, idx) => (
              <span key={idx} className="px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full text-xs font-mono">
                {p.class}: {(p.prob * 100).toFixed(1)}%
              </span>
            ))}
          </div>
        </div>
  
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Informasi Spesies (AI Insights)</h3>
          <div className="prose prose-invert prose-emerald max-w-none text-neutral-300 leading-relaxed whitespace-pre-wrap">
            <ReactMarkdown>
              {result.ai_insight}  
            </ReactMarkdown>  
          </div>
        </div>
        
      </div>
    );
  }