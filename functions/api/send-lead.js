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

    // 1.5 Sécurité HoneyPot : Si le champ caché est rempli, c'est un bot
    if (lead.website) {
      console.log('Bot détecté via HoneyPot');
      return new Response(JSON.stringify({ success: true, bot: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
        from: 'Rézolibri <simulation@simu.rezolibri.fr>',
        to: [lead.email],
        reply_to: 'recruteurs@rezol        subject: `📈 Votre Dossier Vision Expert 2026 - ${lead.prenom}`,
        html: `
          <html>
            <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8f9fa;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; padding: 40px 0;">
                <tr>
                  <td align="center">
                    <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                      <!-- Header -->
                      <tr>
                        <td style="background-color: #470066; padding: 40px; text-align: center;">
                          <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px;">RÉZOLIBRI</h1>
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px; color: #333333;">
                          <h2 style="color: #470066; margin-top: 0;">Bonjour ${lead.prenom},</h2>
                          <p style="font-size: 16px; line-height: 1.6;">
                            Votre projet de création d'agence d'emploi franchit une étape décisive. 
                            Suite à votre simulation basée sur un volume de <strong>${etp} ETP</strong>, nous avons le plaisir de vous transmettre votre Dossier Vision Expert pour l'année 2026.
                          </p>
                          
                          <div style="background-color: #f4f1f7; border-radius: 8px; padding: 20px; margin: 25px 0;">
                            <h3 style="margin-top: 0; font-size: 14px; color: #470066; text-transform: uppercase;">Résumé de votre projection</h3>
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Expertise :</strong> ${lead.prenom} ${lead.nom}</p>
                            <p style="margin: 5px 0; font-size: 15px;"><strong>Zone :</strong> ${lead.departement}</p>
                          </div>
 
                          <p style="font-size: 16px; line-height: 1.6;">
                            Vous trouverez votre document prévisionnel détaillé en pièce jointe de cet email. 
                            Ce dossier contient votre compte d'exploitation et vos indicateurs de rentabilité mutualisés.
                          </p>
 
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 30px;">
                            <tr>
                              <td align="center">
                                <a href="https://calendly.com/stephanie-laval/60min" style="background-color: #c8ff00; color: #470066; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                                  AFFINER MON PROJET AVEC UN CONSULTANT
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
 
                      <!-- Footer -->
                      <tr>
                        <td style="padding: 40px; background-color: #470066; color: #ffffff; text-align: center;">
                          <p style="margin: 0; font-size: 14px; opacity: 0.8;">
                            © 2026 Rézolibri - L'infrastructure digitale au service de l'expertise intérim.
                          </p>
                          <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.6;">
                            Simulation générée via simu.rezolibri.fr
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
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

    // 4. Notification interne pour Mickael (Lead Gen)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: '🦅 Radar Rézolibri <simulation@simu.rezolibri.fr>',
        to: ['recruteurs@rezolibri.fr'],
        subject: `🔥 NOUVEAU LEAD - ${lead.prenom} ${lead.nom}`,
        html: `
          <h3>Nouveau prospect sur le simulateur !</h3>
          <p><strong>Identité :</strong> ${lead.prenom} ${lead.nom}</p>
          <p><strong>Email :</strong> ${lead.email}</p>
          <p><strong>Téléphone :</strong> ${lead.telephone}</p>
          <p><strong>Dép :</strong> ${lead.departement}</p>
          <p><strong>Potentiel :</strong> ${etp} ETP</p>
        `
      })
    });

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
