FRAUD_KEYWORDS = {
    "otp": 3,
    "পাসওয়ার্ড": 3,
    "বিকাশ": 2,
    "নগদ": 2,
    "ভেরিফাই": 2,
    "পিন": 2,
    "একাউন্ট বন্ধ": 2,
    "পুরস্কার": 2,
    "লটারি": 2,
    "জিতেছেন": 2,
    "টাকা পাঠান": 2,
    "লোন": 1,
    "ফ্রি": 1,
    "এখনই": 1,
    "জরুরি": 1,
    "সুবিধা": 1,
    "অফার": 1,
    "ক্লিক করুন": 1,
    "লিংক": 1,
    "নম্বর দিন": 1,
    "অ্যাকাউন্ট": 2,
    "ওটিপি": 3,
}

SAFE_PHRASES = [
    "শেয়ার করবেন না",
    "কাউকে বলবেন না",
    "কখনো দিবেন না",
    "কখনো দিন না",
    "দিয়ে দেবেন না",
    "সতর্ক থাকুন",
    "প্রতারণা থেকে বাঁচুন",
    "নিরাপত্তার জন্য",
    "সাবধান",
    "জাল",
]

FRAUD_PHRASES = [
    ("otp দিন", 3),
    ("ওটিপি দিন", 3),
    ("পিন নম্বর দিন", 3),
    ("পাসওয়ার্ড দিন", 3),
    ("নম্বর দিন", 2),
    ("বন্ধ হয়ে যাবে", 3),
    ("একাউন্ট ভেরিফাই", 2),
    ("পিন নম্বর", 2),
    ("টাকা জিতেছেন", 3),
    ("এখনই কল করুন", 2),
    ("লিংকে ক্লিক করুন", 2),
    ("পুরস্কার জিতেছেন", 3),
    ("বিশেষ অফার", 1),
]

MAX_SCORE = 10


def classify_text(text: str) -> dict:
    text = text.strip().replace('\n', ' ').replace('\r', ' ')
    lowered = text.lower()

    fraud_score = 0

    for keyword, weight in FRAUD_KEYWORDS.items():
        if keyword.lower() in lowered:
            fraud_score += weight

    for phrase, weight in FRAUD_PHRASES:
        if phrase.lower() in lowered:
            fraud_score += weight

    for safe_phrase in SAFE_PHRASES:
        if safe_phrase in lowered:
            fraud_score -= 2

    fraud_score = max(fraud_score, 0)
    fraud_score = min(fraud_score, MAX_SCORE)

    if fraud_score >= 3:
        confidence = min(round((fraud_score / 5) * 100, 1), 95)
        return {"prediction": "Fraud", "confidence": confidence}

    confidence = round((1 - fraud_score / 10) * 100, 1)
    return {"prediction": "Normal", "confidence": confidence}
