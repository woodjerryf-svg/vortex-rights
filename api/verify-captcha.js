// api/verify-captcha.js — Vercel Serverless Function
// Valide le token Cloudflare Turnstile côté serveur
// Variable d'environnement requise : TURNSTILE_SECRET_KEY

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://www.vortexrights.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token } = req.body || {};

  if (!token) {
    return res.status(400).json({ success: false, error: 'Token manquant' });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // En dev sans secret configuré, on laisse passer avec warning
    console.warn('TURNSTILE_SECRET_KEY non configurée — validation skippée en dev');
    return res.status(200).json({ success: true, dev: true });
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', token);

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      }
    );

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(403).json({
        success: false,
        error: 'Captcha invalide',
        codes: data['error-codes'],
      });
    }
  } catch (err) {
    console.error('Turnstile verify error:', err);
    return res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
}