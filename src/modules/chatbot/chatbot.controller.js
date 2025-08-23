import { getFAQ, askAI } from './chatbot.service.js';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const FAQ_RANGE = 'FAQ!A:B';
const API_KEY = process.env.API_KEY;
const MODEL = process.env.MODEL;

export async function getFaqHandler(req, res) {
  try {
    const faqData = await getFAQ(SPREADSHEET_ID, FAQ_RANGE);
    res.json({ data: faqData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal membaca data FAQ' });
  }
}

export async function chatHandler(req, res) {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Pertanyaan diperlukan' });

    const faqData = await getFAQ(SPREADSHEET_ID, FAQ_RANGE);
    const filteredFaq = faqData.filter(row => row.length === 2 && row[0] && row[1]);
    const faqContext = filteredFaq.map(row => `Q: ${row[0]}\nA: ${row[1]}`).join('\n\n');

    const prompt = `
anda adalah asisten digital UrPartnerId yang memberikan informasi lengkap dan ramah tentang layanan pembuatan website,
paket belajar, maintenance, kolaborasi partner, dan alur kerja. Jawab pertanyaan user dengan jelas, sesuai dengan knowledge
base UrPartnerId berikut:

${faqContext}

Pertanyaan user: ${question}

Jika user bertanya tentang pembuatan website, konsultasi, harga, atau layanan untuk pemilik usaha, anggap sebagai klien dan fokus pada penjelasan untuk klien.
Jika user bertanya tentang pendaftaran partner, penugasan proyek, kolaborasi dengan profesional IT, anggap sebagai partner dan jawab sesuai kebutuhan mereka.
Berikan jawaban yang informatif dan ramah, tanpa menanyakan user harus pilih klien atau partner.

`;

    const answer = await askAI(MODEL, API_KEY, prompt);
    res.json({ reply: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
}
