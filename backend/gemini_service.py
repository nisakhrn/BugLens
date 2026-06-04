from google import genai
from google.genai import types

# Kelas untuk menangani permintaan informasi menggunakan Gemini AI
class GeminiExpert:
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("GEMINI_API_KEY belum di-set")
        self.client = genai.Client(api_key=api_key)

    def get_insect_info(self, insect_name: str) -> str:
        prompt = f"""
        Berdasarkan hasil identifikasi gambar, serangga ini adalah "{insect_name}".
        Tolong berikan informasi SINGKAT dengan format yang rapi:
        - Nama Ilmiah:
        - Nama Umum:
        - Spesies:
        - Genus:
        - Famili:
        - Habitat:
        - Fun Fact: (cukup 1 fakta unik, 1 kalimat saja)
        
        Batasan:
        - Maksimal 8 baris total.
        - Tiap baris singkat dan langsung ke poin.
        - Jangan tulis paragraf panjang.
        """

        contents = [
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=prompt)],
            )
        ]

        generate_content_config = types.GenerateContentConfig(
            temperature=0.4,
            max_output_tokens=260,
        )

        result_parts = []
        for chunk in self.client.models.generate_content_stream(
            model="gemini-2.5-flash-lite",
            contents=contents,
            config=generate_content_config,
        ):
            if chunk.text:
                result_parts.append(chunk.text)

        result = "".join(result_parts).strip()
        return result or f"Informasi detail untuk {insect_name} belum tersedia saat ini."

