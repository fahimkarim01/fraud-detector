'use client';

import { useState } from 'react';
import { classifyText, analyzeAudio } from '@/lib/api';

export default function Home() {
  const [textInput, setTextInput] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisType, setAnalysisType] = useState<'text' | 'audio' | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'audio'>('text');
  const [infoExpanded, setInfoExpanded] = useState(false);
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  const t = {
    bn: {
      title: '🛡️ বাংলা ফ্রড ডিটেক্টর',
      subtitle: 'জালিয়াতি কল এবং এসএমএস থেকে রক্ষা পান',
      toggleLang: '🌐 English',
      howItWorks: 'ℹ️ এটি কীভাবে কাজ করে?',
      textTab: '📱 টেক্সট পরীক্ষা করুন',
      audioTab: '🎤 অডিও পরীক্ষা করুন',
      textPlaceholder: 'এসএমএস বা কল ট্রান্সক্রিপ্ট এখানে পেস্ট করুন...',
      textAnalyze: '📱 টেক্সট পরীক্ষা করুন',
      audioUpload: 'অডিও ফাইল আপলোড করুন',
      audioFormats: 'MP3, WAV, FLAC ইত্যাদি',
      audioAnalyze: '🎤 অডিও পরীক্ষা করুন',
      analyzing: '⏳ বিশ্লেষণ করা হচ্ছে',
      wait: 'এটি কিছু সময় লাগতে পারে',
      textAnalysisLabel: '📱 টেক্সট বিশ্লেষণ',
      audioAnalysisLabel: '🎤 অডিও বিশ্লেষণ',
      transcript: '📝 ট্রান্সক্রিপ্ট',
      fraud: 'সতর্কতা: এটি জালিয়াতির সম্ভাবনা রয়েছে',
      fraudWarning: 'এই কলে সাড়া দিবেন না। কোনো তথ্য শেয়ার করবেন না।',
      safe: 'নিরাপদ বার্তা',
      safeExplain: 'এটি সাধারণ বার্তা বলে মনে হয়।',
      again: '🔄 আবার পরীক্ষা করুন',
      infoTitle: 'ℹ️ এটি কীভাবে কাজ করে?',
      infoParagraph1: 'আমাদের টুল বাংলাদেশে জালিয়াতির বিরুদ্ধে একটি সহজ সমাধান।',
      infoParagraph2: 'সমস্যা: প্রতিদিন হাজার হাজার মানুষ জালিয়াতি কলে ঠকে যান। জালিয়াতরা বিকাশ, নগদ বা ব্যাংক থেকে দাবি করে আপনার OTP, পিন বা পাসওয়ার্ড চায়।',
      infoParagraph3: 'সমাধান: এই টুল এআই ব্যবহার করে সন্দেহজনক কল বা এসএমএস শনাক্ত করে। আপনার টেক্সট বা অডিও আপলোড করুন, এবং আমরা বলে দেব এটি নিরাপদ কিনা।',
      commonScams: 'সাধারণ জালিয়াতির উদাহরণ:',
      scam1: '• আপনার একাউন্ট বন্ধ হয়ে যাবে, এখনই OTP দিন',
      scam2: '• পুরস্কার জিতেছেন, লিংক ক্লিক করুন',
      scam3: '• আপনার বিকাশ একাউন্ট ভেরিফাই করতে পাসওয়ার্ড পাঠান',
      securityTitle: 'নিরাপত্তা:',
      security: 'আপনার ডেটা কোথাও সংরক্ষিত হয় না। সবকিছু আপনার ব্রাউজারেই প্রক্রিয়া হয়।',
      learnTitle: 'শিখুন কীভাবে নিরাপদ থাকবেন:',
      learn1: '✓ কখনো OTP বা পিন কাউকে দিবেন না',
      learn2: '✓ বিকাশ/নগদ কল করলে প্রথমে যাচাই করুন',
      learn3: '✓ অপরিচিত লিংক ক্লিক করবেন না',
      footerNote: 'এই টুলটি একটি প্রোটোটাইপ। শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে।',
      github: '📄 GitHub (কোড দেখুন)',
      feedback: '💬 ফিডব্যাক',
    },
    en: {
      title: '🛡️ Bengali Fraud Detector',
      subtitle: 'Protect yourself from fraud calls and SMS',
      toggleLang: '🌐 বাংলা',
      howItWorks: 'ℹ️ How does it work?',
      textTab: '📱 Analyze Text',
      audioTab: '🎤 Analyze Audio',
      textPlaceholder: 'Paste SMS or call transcript here...',
      textAnalyze: '📱 Analyze Text',
      audioUpload: 'Upload Audio File',
      audioFormats: 'MP3, WAV, FLAC, etc.',
      audioAnalyze: '🎤 Analyze Audio',
      analyzing: '⏳ Analyzing',
      wait: 'This may take a few moments',
      textAnalysisLabel: '📱 Text Analysis',
      audioAnalysisLabel: '🎤 Audio Analysis',
      transcript: '📝 Transcript',
      fraud: 'Warning: Fraud detected',
      fraudWarning: 'Do not respond to this call. Do not share any information.',
      safe: 'Safe message',
      safeExplain: 'This message appears to be normal.',
      again: '🔄 Analyze Again',
      infoTitle: 'ℹ️ How It Works',
      infoParagraph1: 'Our tool is a simple solution against fraud in Bangladesh.',
      infoParagraph2: 'Problem: Every day, thousands of people lose money to fraud calls. Fraudsters impersonate bKash, Nagad, or banks and ask for your OTP, PIN, or password.',
      infoParagraph3: 'Solution: This tool uses AI to detect suspicious calls or SMS. Upload your text or audio, and we will tell you if it is safe or not.',
      commonScams: 'Common fraud examples:',
      scam1: '• Your account will be closed. Send OTP now.',
      scam2: '• You won a prize. Click this link.',
      scam3: '• Verify your bKash account by sending your password.',
      securityTitle: 'Security:',
      security: 'Your data is not stored anywhere. Everything is processed in your browser.',
      learnTitle: 'Learn how to stay safe:',
      learn1: '✓ Never share your OTP or PIN with anyone',
      learn2: '✓ Verify if a call from bKash/Nagad is real first',
      learn3: '✓ Do not click unknown links',
      footerNote: 'This tool is a prototype. For educational purposes only.',
      github: '📄 GitHub (View Code)',
      feedback: '💬 Feedback',
    }
  };

  async function handleAnalyzeText() {
    if (!textInput.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await classifyText(textInput);
      setResult(data);
      setAnalysisType('text');
    } catch (err: any) {
      setError(err?.response?.data?.detail || err.message || (lang === 'bn' ? 'কিছু ভুল হয়েছে। আবার চেষ্টা করুন।' : 'Something went wrong. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAnalyzeAudio() {
    if (!audioFile) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeAudio(audioFile);
      setResult(data);
      setAnalysisType('audio');
    } catch (err: any) {
      setError(err?.response?.data?.detail || err.message || (lang === 'bn' ? 'অডিও বিশ্লেষণে ত্রুটি হয়েছে।' : 'Audio analysis failed.'));
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setTextInput('');
    setAudioFile(null);
    setResult(null);
    setError(null);
    setAnalysisType(null);
    setActiveTab('text');
  }

  const isFraud = result?.prediction === 'Fraud';

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {lang === 'bn' ? 'EN' : 'বাংলা'}
      </button>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
              {t[lang].title}
            </h1>
            <p className="text-lg text-gray-600">
              {t[lang].subtitle}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {lang === 'bn' ? '⚡ প্রাথমিক সংস্করণ (Beta)' : '⚡ Initial Version (Beta)'}
            </p>
          </div>
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => setInfoExpanded(!infoExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold text-gray-900">{t[lang].howItWorks}</h2>
            <span className={`text-xl text-gray-600 transition-transform duration-300 ${infoExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {infoExpanded && (
            <div className="px-6 py-6 bg-blue-50 border-t border-gray-200 space-y-3 text-gray-700 leading-relaxed">
              <h3 className="text-lg font-semibold mb-3">{t[lang].infoTitle}</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>{t[lang].infoParagraph1}</p>
                <p>{t[lang].infoParagraph2}</p>
                <p>{t[lang].infoParagraph3}</p>
                <div>
                  <p className="font-semibold mb-2">{t[lang].commonScams}</p>
                  <p>{t[lang].scam1}</p>
                  <p>{t[lang].scam2}</p>
                  <p>{t[lang].scam3}</p>
                </div>
                <div>
                  <p className="font-semibold">{t[lang].securityTitle}</p>
                  <p>{t[lang].security}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {!result && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 px-6 py-4 font-semibold text-center transition ${
                  activeTab === 'text'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t[lang].textTab}
              </button>
              <button
                onClick={() => setActiveTab('audio')}
                className={`flex-1 px-6 py-4 font-semibold text-center transition ${
                  activeTab === 'audio'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t[lang].audioTab}
              </button>
            </div>

            
            <div className="p-6">
              {activeTab === 'text' && (
                <div>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-base"
                    rows={6}
                    placeholder={t[lang].textPlaceholder}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                  <div className="mb-4 text-sm text-gray-500">
                    {textInput.length} {lang === 'bn' ? 'অক্ষর' : 'characters'}
                  </div>
                  <button
                    onClick={handleAnalyzeText}
                    disabled={isLoading || !textInput.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg text-base transition h-12"
                  >
                    {t[lang].textAnalyze}
                  </button>
                </div>
              )}

              {activeTab === 'audio' && (
                <div>
                  <div className="relative mb-6">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="audioInput"
                    />
                    <label
                      htmlFor="audioInput"
                      className="block w-full p-8 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 text-center cursor-pointer hover:bg-blue-100 transition"
                    >
                      {audioFile ? (
                        <div>
                          <p className="text-2xl text-green-600 font-bold mb-2">✓</p>
                          <p className="text-gray-900 font-semibold break-words">{audioFile.name}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-4xl mb-3">🎤</p>
                          <p className="text-gray-900 font-semibold">{t[lang].audioUpload}</p>
                          <p className="text-sm text-gray-600 mt-1">{t[lang].audioFormats}</p>
                        </div>
                      )}
                    </label>
                  </div>
                  <button
                    onClick={handleAnalyzeAudio}
                    disabled={isLoading || !audioFile}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg text-base transition h-12"
                  >
                    {t[lang].audioAnalyze}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        
        {isLoading && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold text-gray-900 mb-2">
              {t[lang].analyzing}
              <span className="inline-block w-6">
                <span className="animate-bounce inline-block">.</span>
                <span className="animate-bounce inline-block" style={{ animationDelay: '0.1s' }}>.</span>
                <span className="animate-bounce inline-block" style={{ animationDelay: '0.2s' }}>.</span>
              </span>
            </p>
            <p className="text-gray-600">{t[lang].wait}</p>
          </div>
        )}

        
        {result && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            
            <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-600">
                {analysisType === 'audio' ? t[lang].audioAnalysisLabel : t[lang].textAnalysisLabel}
              </p>
            </div>

            <div className="p-8">
              
              {analysisType === 'audio' && result.transcript && (
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">{t[lang].transcript}</h3>
                  <div className="bg-gray-100 rounded-lg p-4 text-gray-800">
                    {result.transcript}
                  </div>
                </div>
              )}

              
              <div className={`rounded-lg p-8 text-center ${
                isFraud
                  ? 'bg-red-50 border-2 border-red-300'
                  : 'bg-green-50 border-2 border-green-300'
              }`}>
                {isFraud ? (
                  <div>
                    <p className="text-4xl mb-3">⚠️</p>
                    <p className="text-2xl font-bold text-red-700 mb-4">
                      {t[lang].fraud}
                    </p>
                    <p className="text-4xl font-bold text-red-600 mb-6">
                      {result.confidence}%
                    </p>
                    <p className="text-red-700 font-semibold">
                      {t[lang].fraudWarning}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-4xl mb-3">✅</p>
                    <p className="text-2xl font-bold text-green-700 mb-4">
                      {t[lang].safe}
                    </p>
                    <p className="text-4xl font-bold text-green-600 mb-6">
                      {result.confidence}%
                    </p>
                    <p className="text-green-700 font-semibold">
                      {t[lang].safeExplain}
                    </p>
                  </div>
                )}
              </div>

              
              <button
                onClick={handleReset}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-base transition h-12"
              >
                {t[lang].again}
              </button>
            </div>
          </div>
        )}
      </div>

      
      {error && (
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <p className="text-red-700 font-semibold pt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 font-bold text-xl flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      
      <footer className="max-w-4xl mx-auto px-4 mt-16 pt-8 sm:px-6 lg:px-8 border-t border-gray-200 text-center text-sm text-gray-600">
        <div className="space-y-3">
          <p className="font-semibold">{t[lang].learnTitle}</p>
          <p>{t[lang].learn1}</p>
          <p>{t[lang].learn2}</p>
          <p>{t[lang].learn3}</p>
          <p className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded mb-4">
            {lang === 'bn' 
              ? '⚠️ এটি একটি প্রোটোটাইপ এবং শিক্ষামূলক উদ্দেশ্যে নির্মিত। ভুল সনাক্তকরণ থাকতে পারে।'
              : '⚠️ This is a prototype for educational purposes. May contain detection errors.'
            }
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/YOUR_USERNAME/fraud-detector" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {t[lang].github}
            </a>
            <a href="https://github.com/YOUR_USERNAME/fraud-detector/issues" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {t[lang].feedback}
            </a>
          </div>
        </div>
      </footer>

      <div className="py-8"></div>
    </div>
  );
}
