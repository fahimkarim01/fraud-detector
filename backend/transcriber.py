import os
import requests

API_URL = "https://router.huggingface.co/hf-inference/models/bangla-speech-processing/BanglaASR"

def transcribe_audio(file_path: str) -> str:
    hf_token = os.environ.get("HF_TOKEN")
    if not hf_token:
        raise ValueError("HF_TOKEN environment variable is not set")
        
    headers = {"Authorization": f"Bearer {hf_token}"}
    
    with open(file_path, "rb") as f:
        data = f.read()
        
    response = requests.post(API_URL, headers=headers, data=data)
    response.raise_for_status()
    
    result = response.json()
    if isinstance(result, dict) and "text" in result:
        return result["text"].strip()
    return str(result)
