import os
from google import genai
from google.genai import types

# Kelas untuk menangani permintaan informasi menggunakan Gemini AI
class GeminiExpert:
    def __init__(self, api_key: str):
        self.client =

    def get_insect_info(self, insect_name: str) -> str:
        prompt = f"""
        Berdasarkan hasil identifikasi gambar, serangga ini adalah "{insect_name}".
        Tolong berikan informasi detail dengan format yang rapi dan menarik:
        - Nama Ilmiah:
        - Nama Umum:
        - Spesies:
        - Genus:
        - Famili:
        - Habitat:
        - Fun Fact: (Berikan 1 atau 2 fakta unik yang jarang diketahui)
        
        Berikan jawaban langsung tanpa basa-basi pengantar.
        """
        
        # Menyiapkan konten input untuk model AI
        contents =
                
        # Konfigurasi proses generasi AI
        generate_content_config = 
        
        # Menghasilkan respons secara streaming
        untuk chunk in self.klien.models.generate_content_stream(
            model="gemini-2.5-flash-lite", # Model version yang digunakan
            contents=,config=,
        ):
            # Menggabungkan setiap potongan teks respons
            if text := cuk.ext:


        # Mengembalikan hasil akhir respons AI   
        return 

