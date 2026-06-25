# 🛡️ Bengali Fraud Detector

Detect fraud calls and SMS in Bengali language. A free, open-source web tool to identify scam messages and audio calls.

## Features

- 📱 Analyze Bengali text messages (SMS, copy-paste)
- 🎤 Analyze audio recordings of calls
- ⚠️ Instant fraud detection with confidence scores
- 🔒 No data collection, works offline
- 🇧🇩 Bengali language support
- 🎨 Simple, user-friendly interface

## Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Next.js, TypeScript, Tailwind CSS |
| **Backend** | FastAPI, Python |
| **Speech-to-Text** | OpenAI Whisper, BanglaASR |
| **Classification** | Rule-based keyword matching |
| **Deployment** | Vercel (frontend), Render (backend) |

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`

### Backend

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

API available at `http://localhost:8000`

## Usage

### Text Analysis

1. Paste Bengali message in textarea
2. Click "📱 টেক্সট পরীক্ষা করুন"
3. See result: Fraud or Normal with confidence score

### Audio Analysis

1. Upload MP3/WAV file
2. Click "🎤 অডিও পরীক্ষা করুন"
3. See transcript + fraud detection result

## How It Works

The system uses keyword matching to detect fraud patterns:

- Scans for fraud keywords: OTP, PIN, password, account closure, prize, loan, etc.
- Applies weighted scoring based on keyword importance
- Checks for safety phrases to reduce false positives
- Returns: Fraud/Normal with confidence percentage

**Example:**
```
Input: "আপনার একাউন্ট বন্ধ হয়ে যাবে। এখনই OTP দিন।"
Output: Fraud - 92% confidence
```

## Limitations

- Rule-based system (no machine learning)
- Works best with clear Bengali audio
- May miss new or evolving fraud patterns
- Language-dependent (Bengali only)
- Not suitable as sole security solution

## Project Structure

```
fraud-detector/
├── backend/
│   ├── main.py          # FastAPI app
│   ├── classifier.py    # Fraud detection logic
│   ├── transcriber.py   # Audio transcription
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   └── page.tsx     # Main UI
│   └── lib/
│       └── api.ts       # API calls
└── README.md
```

## Installation

```bash
git clone https://github.com/[username]/fraud-detector.git
cd fraud-detector
```

Follow Quick Start section above.

## API Endpoints

### POST /classify

Classify Bengali text for fraud

**Request:**
```json
{
  "text": "Bengali text here"
}
```

**Response:**
```json
{
  "prediction": "Fraud",
  "confidence": 92.5
}
```

### POST /analyze-audio

Analyze audio file and transcribe to Bengali

**Request:** Multipart form data with audio file

**Response:**
```json
{
  "transcript": "Bengali transcribed text",
  "prediction": "Fraud",
  "confidence": 88.3
}
```

### GET /health

Health check endpoint

**Response:**
```json
{
  "status": "ok"
}
```

## Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Frontend (.env.production)

```
NEXT_PUBLIC_API_URL=https://[your-render-url].onrender.com
```

## Deployment

**Backend:** Deployed on Render  
**Frontend:** Deployed on Vercel

Refer to respective platform documentation for deployment instructions.

## Known Issues

- Whisper works best with clear audio (8kHz+)
- May incorrectly flag legitimate messages containing keywords
- No support for English, Hindi, or other languages

## Future Improvements

- User feedback system to improve detection
- Fraud pattern database
- Multi-language support
- Fine-tuned Bengali ASR model
- Browser extension

## Disclaimer

This tool is provided for educational purposes. Always verify suspicious calls independently. Contact your bank or service provider directly for verification. Do not rely solely on this tool for security decisions.

## License

MIT License

## Contact

**GitHub:** [fahimkarim01/fraud-detector](https://github.com/fahimkarim01/fraud-detector)  
**Issues:** [Report an issue](https://github.com/fahimkarim01/fraud-detector/issues)

For bugs or suggestions, open an issue on GitHub.
