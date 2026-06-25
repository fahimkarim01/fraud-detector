from transformers import pipeline
import os

model = pipeline(
    "automatic-speech-recognition",
    model="bangla-speech-processing/BanglaASR",
    device=-1,
)


def transcribe_audio(file_path: str) -> str:
    result = model(file_path)
    return result["text"].strip()
