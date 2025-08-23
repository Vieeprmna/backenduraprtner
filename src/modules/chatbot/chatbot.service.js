import { readSheet } from './googlesheets.js';
import fetch from 'node-fetch';

export async function getFAQ(spreadsheetId, range) {
  return await readSheet(spreadsheetId, range);
}

export async function askAI(model, apiKey, prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 512,
        },
      }),
    }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);

  return data?.candidates?.[0]?.content?.parts?.[0]?.text
    || 'Maaf, saya tidak bisa menjawab sekarang.';
}
