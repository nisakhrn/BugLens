from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ml_service import InsectClassifier
from gemini_service import GeminiExpert
import os
from dotenv import load_dotenv

# Memuat environment variable dari file .env
load_dotenv()

# Inisialisasi aplikasi FastAPI
app = FastAPI(title="")

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
    model_path=""
)

# Inisialisasi layanan Gemini AI
gemini_expert = # dapatkan API Key

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):

    # Validasi apakah file yang diunggah berupa gambar
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar")
    
    try:
        
        # Membaca file gambar
        image_bytes = 

        # Prediksi jenis serangga menggunakan model ML
        predictions = 
        
        # Mengambil hasil prediksi terbaik
        top_prediction = 
        
        # Mengambil informasi detail dari Gemini AI
        try:
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
