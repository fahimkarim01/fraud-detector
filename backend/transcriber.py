import os
from huggingface_hub import InferenceClient

def transcribe_audio(file_path: str) -> str:
    hf_token = os.environ.get("HF_TOKEN")
    if not hf_token:
        raise ValueError("HF_TOKEN environment variable is not set")
        
    client = InferenceClient(api_key=hf_token, provider="hf-inference")
    
    # InferenceClient automatically handles the correct endpoint routing, 
    # headers, and binary file streaming that the new API requires
    result = client.automatic_speech_recognition(
        file_path, 
        model="bangla-speech-processing/BanglaASR"
    )
    
    if hasattr(result, "text"):
        return result.text.strip()
    elif isinstance(result, dict) and "text" in result:
        return result["text"].strip()
    return str(result)
