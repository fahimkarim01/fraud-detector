from gradio_client import Client, handle_file

# HF Space identifier (username/space-name format)
SPACE_ID = "fahimakrim/bengali-asr-api"

def transcribe_audio(file_path: str) -> str:
    """
    Sends audio to the HF Space running bangla-speech-processing/BanglaASR
    and returns the transcribed Bengali text.
    """
    client = Client(SPACE_ID)
    result = client.predict(
        audio_path=handle_file(file_path),
        api_name="/predict"
    )
    if result:
        return str(result).strip()
    return "Error: No transcription returned from Space"
