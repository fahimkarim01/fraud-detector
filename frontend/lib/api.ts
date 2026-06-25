import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function classifyText(text: string) {
  const response = await axios.post(`${API_URL}/classify`, { text });
  return response.data;
}

export async function analyzeAudio(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/analyze-audio`, formData);
  return response.data;
}
