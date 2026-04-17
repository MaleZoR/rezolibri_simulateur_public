import emailjs from '@emailjs/browser';

// --- CONFIGURATION EMAILJS (MICKAEL : REMPLACER CES VALEURS) ---
const SERVICE_ID = 'YOUR_SERVICE_ID'; // ex: 'service_abc123'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // ex: 'template_xyz456'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // dispo dans ton compte EmailJS

export const sendBusinessPlanEmail = async (data, pdfBase64) => {
  try {
    const templateParams = {
      to_name: `${data.lead.prenom} ${data.lead.nom}`,
      to_email: data.lead.email,
      from_name: 'Rézolibri',
      message: `Votre Business Plan 2026 est prêt ! ETP: ${data.etp}, Département: ${data.lead.departement}`,
      // L'attachement dans EmailJS se fait via le template or via la variable content
      // IMPORTANT: Pour envoyer un PDF généré, il faut utiliser l'API "File Upload" de EmailJS 
      // ou passer le base64 si le template est configuré pour.
      content: pdfBase64, 
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log('Email envoyé avec succès !', response.status, response.text);
    return true;
  } catch (err) {
    console.error('Erreur lors de l\'envoi de l\'email :', err);
    return false;
  }
};
