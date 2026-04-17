/**
 * Service d'envoi d'email via Cloudflare Pages Functions
 * Appel l'API interne /api/send-lead
 */
export const sendBusinessPlanEmail = async (data, pdfBase64) => {
  try {
    const payload = {
      lead: data.lead,
      etp: data.etp,
      pdfBase64: pdfBase64 // Sera nettoyé côté serveur
    };

    const response = await fetch('/api/send-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de l\'envoi API');
    }

    const result = await response.json();
    console.log('Lead et BP envoyés avec succès via Cloudflare !', result);
    return true;
  } catch (err) {
    console.error('Erreur Backend Cloudflare :', err);
    // On ne bloque pas l'utilisateur si le mail échoue (le download a déjà eu lieu)
    return false;
  }
};
