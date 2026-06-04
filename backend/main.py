from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ml_service import InsectClassifier
from gemini_service import GeminiExpert
import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Memuat environment variable dari backend/.env lalu fallback ke root/.env
load_dotenv(os.path.join(BASE_DIR, ".env"))
load_dotenv(os.path.join(os.path.dirname(BASE_DIR), ".env"), override=False)

MODEL_PATH = os.path.join(BASE_DIR, "artifacts", "model_torchscript.pt")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# Inisialisasi aplikasi FastAPI
app = FastAPI(title="BugLens Backend")

# Konfigurasi CORS agar frontend dapat mengakses API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inisialisasi kebutuhan model klasifikasi
classifier = InsectClassifier(
    model_path=MODEL_PATH
)

# Inisialisasi layanan Gemini AI
gemini_expert = GeminiExpert(GEMINI_API_KEY) if GEMINI_API_KEY else None


@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):

    # Validasi apakah file yang diunggah berupa gambar
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar")
    
    try:
        
        # Membaca file gambar
        image_bytes = await file.read()
        if not image_bytes:
            raise HTTPException(status_code=400, detail="File gambar kosong")

        # Prediksi jenis serangga menggunakan model ML
        predictions = classifier.predict(image_bytes, top_k=3)
        if not predictions:
            raise HTTPException(status_code=500, detail="Model tidak mengembalikan prediksi")
        
        # Mengambil hasil prediksi terbaik
        top_prediction = predictions[0]["class"]
        
        # Mengambil informasi detail dari Gemini AI
        try:
            if gemini_expert is None:
                ai_insight = (
                    f"Model lokal mengidentifikasi serangga ini sebagai {top_prediction}. "
                    "Tambahkan GEMINI_API_KEY pada file .env untuk mendapatkan insight detail dari Gemini AI."
                )
            else:
                ai_insight = gemini_expert.get_insect_info(top_prediction)
        except Exception as gemini_error:
            print(f"Peringatan Gemini API: {gemini_error}")
            # Contoh template pesan ketika Gemini gagal memberikan response
            ai_insight = (
                f"Sistem lokal kami berhasil mengidentifikasi serangga ini sebagai {top_prediction}. "
                "Namun, layanan AI Explorer (Gemini) saat ini sedang mengalami lonjakan permintaan (High Demand) dari server pusat Google.\n\n"
                "Silakan klik tombol analisis lagi dalam beberapa saat untuk memuat fakta unik dan detail famili serangga ini."
            )
        
        # Mengembalikan hasil prediksi dan insight AI
        return {
            "predictions": predictions,
            "top_prediction": top_prediction,
            "ai_insight": ai_insight
        }
        
    # Menangani error umum pada server
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
