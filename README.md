# 🛡️ Bengali Fraud Detector

> **AI-powered fraud detection for Bengali phone calls and SMS messages**

A free, open-source web app that transcribes Bengali audio recordings and classifies them as fraud or legitimate — using a fine-tuned Bengali ASR model and keyword-based fraud analysis.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-fraud--detector--bd.vercel.app-blue?style=for-the-badge&logo=vercel)](https://fraud-detector-bd.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)
[![ASR Model](https://img.shields.io/badge/ASR%20Space-HuggingFace-FFD21E?style=for-the-badge&logo=huggingface)](https://huggingface.co/spaces/fahimakrim/bengali-asr-api)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📱 **Text Analysis** | Paste any Bengali SMS or message and detect fraud instantly |
| 🎤 **Audio Analysis** | Upload Bengali MP3/WAV call recordings for transcription + fraud check |
| 🧠 **BanglaASR Model** | Uses `bangla-speech-processing/BanglaASR` — fine-tuned Whisper for Bengali (4.58% WER) |
| ⚡ **Instant Results** | Fraud prediction with confidence score percentage |
| 🔒 **Privacy First** | No data stored or logged — analysis is stateless |
| 🇧🇩 **Bengali-Native** | Built specifically for the Bengali language and common local fraud patterns |
| 💸 **100% Free** | Deployed on free tiers: Vercel + Render + Hugging Face Spaces |

---

## 🏗️ Architecture

```
User (Browser)
     │
     ▼
┌─────────────────┐
│  Frontend        │  Next.js + TypeScript + Tailwind CSS
│  Vercel          │  https://fraud-detector-bd.vercel.app/
└────────┬────────┘
         │ HTTP POST (text or audio file)
         ▼
┌─────────────────┐
│  Backend API     │  FastAPI + Python 3.11
│  Render          │  /classify  /analyze-audio  /health
└────────┬────────┘
         │
    ┌────┴────────────────────┐
    │                         │
    ▼                         ▼
┌────────────┐      ┌──────────────────────┐
│ classifier │      │ transcriber.py        │
│ .py        │      │ (gradio_client)       │
│            │      └──────────┬───────────┘
│ Rule-based │                 │ HTTP (Gradio API)
│ keyword    │                 ▼
│ matching   │      ┌──────────────────────┐
│ (local,    │      │  HF Space             │
│  no API)   │      │  fahimakrim/          │
└────────────┘      │  bengali-asr-api      │
                    │                      │
                    │  bangla-speech-       │
                    │  processing/BanglaASR │
                    │  (Whisper fine-tuned) │
                    └──────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js, TypeScript, Tailwind CSS | UI / user interaction |
| **Backend** | FastAPI, Python 3.11 | REST API, orchestration |
| **ASR Model** | `bangla-speech-processing/BanglaASR` | Bengali speech-to-text |
| **ASR Hosting** | Hugging Face Spaces (CPU Free) | Runs the model for free |
| **ASR Client** | `gradio_client` | Calls the HF Space API |
| **Fraud Logic** | Rule-based keyword classifier | Detects fraud patterns |
| **Frontend Host** | Vercel (Free) | Hosts the Next.js app |
| **Backend Host** | Render (Free) | Hosts the FastAPI server |

---

## 🚀 Live Deployment

| Service | URL |
|---|---|
| **Frontend** | https://fraud-detector-bd.vercel.app/ |
| **ASR Space** | https://huggingface.co/spaces/fahimakrim/bengali-asr-api |

---

## 📖 Usage

### Text Analysis
1. Go to [fraud-detector-bd.vercel.app](https://fraud-detector-bd.vercel.app/)
2. Paste a Bengali message in the text box
3. Click **"📱 টেক্সট পরীক্ষা করুন"**
4. Instantly see: **Fraud / Normal** + confidence score

### Audio Analysis
1. Upload a Bengali MP3 or WAV file (max 5MB)
2. Click **"🎤 অডিও পরীক্ষা করুন"**
3. The app will:
   - Send audio → HF Space → BanglaASR model → transcript
   - Run fraud classifier on the transcript
   - Show: transcript + **Fraud / Normal** + confidence score

> ⚠️ **Note:** The first audio request may take 60–90 seconds if the HF Space is cold-starting. Subsequent requests are faster.

**Example:**
```
Input:  "আপনার একাউন্ট বন্ধ হয়ে যাবে। এখনই OTP দিন।"
Output: 🚨 Fraud — 92% confidence
```

---

## 🧠 How Fraud Detection Works

The classifier uses a weighted keyword scoring system tuned for common Bengali fraud patterns:

| Fraud Signal | Examples |
|---|---|
| **Credential theft** | OTP, PIN, পাসওয়ার্ড, গোপন নম্বর |
| **Urgency pressure** | এখনই, তাড়াতাড়ি, একাউন্ট বন্ধ |
| **Prize / lottery scams** | পুরস্কার, জিতেছেন, লটারি |
| **Financial threats** | লোন, ব্যাংক, টাকা পাঠান |
| **Authority impersonation** | পুলিশ, র‍্যাব, ম্যানেজার |

Safety phrases (e.g., "আপনার অনুমতি") reduce false positives.

---

## 📁 Project Structure

```
fraud-detector/
├── backend/
│   ├── main.py            # FastAPI app — /classify, /analyze-audio, /health
│   ├── classifier.py      # Bengali fraud keyword classifier (runs locally)
│   ├── transcriber.py     # Calls HF Space via gradio_client
│   ├── requirements.txt   # Python dependencies
│   ├── Procfile           # Render startup command
│   └── .python-version    # Python 3.11.9
├── frontend/
│   ├── app/
│   │   └── page.tsx       # Main UI page
│   └── lib/
│       └── api.ts         # API call helpers
└── README.md
```

---

## ⚙️ Local Development

### Prerequisites
- Node.js 18+
- Python 3.11+

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

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App available at `http://localhost:3000`

### Environment Variables

**Frontend** — create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Frontend** — create `frontend/.env.production`:
```env
NEXT_PUBLIC_API_URL=https://your-render-url.onrender.com
```

---

## 📡 API Reference

### `GET /health`
Health check.
```json
{ "status": "ok", "message": "Fraud Detector API is running" }
```

### `POST /classify`
Classify Bengali text for fraud.

**Request:**
```json
{ "text": "আপনার একাউন্ট বন্ধ হয়ে যাবে। এখনই OTP দিন।" }
```
**Response:**
```json
{ "prediction": "Fraud", "confidence": 92.5 }
```

### `POST /analyze-audio`
Upload Bengali audio for transcription + fraud classification.

**Request:** `multipart/form-data` with field `file` (MP3 or WAV, max 5MB)

**Response:**
```json
{
  "transcript": "আপনার একাউন্ট বন্ধ হয়ে যাবে",
  "prediction": "Fraud",
  "confidence": 88.3
}
```

---

## ⚠️ Limitations

- Audio analysis requires the HF Space to be awake — first request after idle has a cold-start delay (~60–90s)
- Rule-based classifier may miss new or evolving fraud patterns
- Works best with clear Bengali audio (16kHz+)
- Bengali language only — no English, Hindi, or mixed-language support
- Not intended as a sole security solution — always verify independently

---

## 🔮 Future Improvements

- [ ] ML-based fraud classifier (replace keyword rules)
- [ ] Real-time audio streaming transcription
- [ ] Multi-language support (English, Hindi)
- [ ] Browser extension
- [ ] Fraud pattern community database
- [ ] User feedback loop to improve detection accuracy

---

## ⚖️ Disclaimer

This tool is provided for educational and awareness purposes only. Always verify suspicious communications independently by contacting your bank or service provider directly. Do not rely solely on this tool for security decisions.

---

## 📄 License

[MIT License](LICENSE)

---

## 👤 Author

**Md. Fahim Karim**
GitHub: [@fahimkarim01](https://github.com/fahimkarim01)

---

## 📬 Contact

**GitHub:** [fahimkarim01/fraud-detector](https://github.com/fahimkarim01/fraud-detector)
**Issues:** [Report an issue](https://github.com/fahimkarim01/fraud-detector/issues)

For bugs or suggestions, open an issue on GitHub.
