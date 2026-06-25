import os

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from classifier import classify_text
from transcriber import transcribe_audio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TextInput(BaseModel):
    text: str


@app.get("/health")
def health():
    return {
        "status": "ok",
        "message": "Fraud Detector API is running"
    }


@app.post("/classify")
def classify(input: TextInput):
    try:
        return classify_text(input.text)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB limit


@app.post("/analyze-audio")
async def analyze_audio(file: UploadFile = File(...)):
    if file.size > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Max 5MB")

    temp_path = "temp_audio.wav"
    try:
        with open(temp_path, "wb") as buffer:
            buffer.write(await file.read())

        transcript = transcribe_audio(temp_path)
        result = classify_text(transcript)

        return {
            "transcript": transcript,
            "prediction": result["prediction"],
            "confidence": result["confidence"],
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)