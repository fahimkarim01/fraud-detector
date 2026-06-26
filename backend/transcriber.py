import os
import requests

# Your Hugging Face Space URL
HF_SPACE_URL = "https://fahimakrim-bengali-asr-api.hf.space"

def transcribe_audio(file_path: str) -> str:
    """
    Sends an audio file to the HF Space (bangla-speech-processing/BanglaASR)
    and returns the transcribed Bengali text.
    """
    # Step 1: Upload the file to get a temporary URL from the Space
    upload_url = f"{HF_SPACE_URL}/upload"
    with open(file_path, "rb") as f:
        upload_response = requests.post(
            upload_url,
            files={"files": (os.path.basename(file_path), f, "audio/wav")},
            timeout=120
        )
    upload_response.raise_for_status()
    uploaded_files = upload_response.json()
    uploaded_path = uploaded_files[0]  # e.g. "/tmp/gradio/abc123/temp_audio.wav"

    # Step 2: Call the /run/predict endpoint with the uploaded file path
    predict_url = f"{HF_SPACE_URL}/run/predict"
    payload = {
        "data": [
            {"path": uploaded_path, "meta": {"_type": "gradio.FileData"}}
        ]
    }
    predict_response = requests.post(
        predict_url,
        json=payload,
        timeout=180  # Generous timeout for cold starts (model loading ~60s)
    )
    predict_response.raise_for_status()

    result = predict_response.json()
    # Gradio returns: {"data": ["transcribed text here"]}
    data = result.get("data", [])
    if data:
        return str(data[0]).strip()
    return "Error: No transcription returned from Space"
