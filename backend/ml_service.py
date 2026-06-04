import json
import io
import os

import torch
from PIL import Image
import torchvision.transforms as transforms

# Kelas untuk klasifikasi gambar
class InsectClassifier:
    def __init__(self, model_path):
        self.model_path = model_path
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.metadata_path = os.path.join(base_dir, "artifacts", "model_metadata.json")

        with open(self.metadata_path, "r", encoding="utf-8") as f:
            metadata = json.load(f)

        self.class_names = metadata["class_names"]
        img_size = metadata.get("img_size", 224)
        mean = metadata.get("imagenet_mean", [0.485, 0.456, 0.406])
        std = metadata.get("imagenet_std", [0.229, 0.224, 0.225])

        self.transform = transforms.Compose(
            [
                transforms.Resize((img_size, img_size)),
                transforms.ToTensor(),
                transforms.Normalize(mean=mean, std=std),
            ]
        )

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = torch.jit.load(self.model_path, map_location=self.device)
        self.model.eval()


    def predict(self, image_bytes, top_k=1):
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)

        with torch.inference_mode():
            logits = self.model(input_tensor)
            probs = torch.softmax(logits, dim=1)[0]

            top_k = max(1, min(top_k, len(self.class_names)))
            values, indices = torch.topk(probs, k=top_k)

        predictions = []
        for prob, idx in zip(values.tolist(), indices.tolist()):
            predictions.append({"class": self.class_names[idx], "prob": float(prob)})

        return predictions
