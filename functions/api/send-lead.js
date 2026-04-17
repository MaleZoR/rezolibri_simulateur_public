export async function onRequestPost(context) {
  const { request, env } = context;

  // 1. Validation de la clé API Resend (stockée dans les variables Cloudflare)
  const RESEND_API_KEY = env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'Configuration serveur manquante (API KEY)' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await request.json();
    const { lead, etp, pdfBase64 } = data;

    // 2. Nettoyage du Base64 pour Resend (enlever le préfixe data:application/pdf;base64,)
    const cleanBase64 = pdfBase64.split(',')[1];

    // 3. Appel à l'API Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Simulateur Rézolibri <contact@rezolibri.fr>',
        to: [lead.email, 'mickael@rezolibri.fr'], // Envoi au prospect et au gérant
        subject: `📈 Ton Business Plan 2026 - ${lead.prenom}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #470066;">
            <h2>Félicitations ${lead.prenom} !</h2>
            <p>Ton projet d'agence d'emploi avance. Voici ton Business Plan 2026 personnalisé basé sur une simulation de <strong>${etp} ETP</strong>.</p>
            <p><strong>Détails du Lead :</strong></p>
            <ul>
              <li>Nom : ${lead.prenom} ${lead.nom}</li>
              <li>Tél : ${lead.telephone}</li>
              <li>Département : ${lead.departement}</li>
            </ul>
            <p>Ton document est disponible en pièce jointe de cet e-mail.</p>
            <br/>
            <p>L'équipe Rézolibri</p>
          </div>
        `,
        attachments: [
          {
            filename: `Business_Plan_2026_${lead.nom.toUpperCase()}.pdf`,
            content: cleanBase64
          }
        ]
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Erreur Resend');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
