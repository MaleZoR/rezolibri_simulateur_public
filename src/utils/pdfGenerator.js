import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

export const generateBusinessPlan = async (data) => {
  const doc = new jsPDF();
  
  // Force l'application du plugin si l'import side-effect a échoué
  if (typeof doc.autoTable !== 'function' && typeof autoTable !== 'function') {
    console.error("Erreur critique: jspdf-autotable n'est pas chargé correctement.");
  }
  const primaryColor = [71, 0, 102]; // #470066 (Violet Rézolibri)
  const secondaryColor = [200, 255, 0]; // #c8ff00 (Lime Rézolibri)
  const textColor = [51, 51, 51];
  
  // LOGO BASE64 (Généré depuis src/assets/logo-rézolibri-pdf.png)
  const logoBase64 = 'data:image/png;base64,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';

  // Helper de formatage manuel
  const formatFR = (num) => Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // CALCULS (inchangés)
  const caMensuel = Math.round(data.etp * 395);
  const tauxCharges = data.isAcre ? 12.8 : 25.6;
  const cotisationsSociales = Math.round(caMensuel * (tauxCharges / 100));
  const chargesMensuelles = Math.round([...data.chargesFixes, ...data.chargesVariables].reduce((acc, curr) => acc + (parseFloat(curr.value) || 0), 0));
  const revenuNet = Math.round(caMensuel - cotisationsSociales - chargesMensuelles);

  // --- FONCTION HEADER / FOOTER ---
  const addPageBordersAndBranding = (pageDoc, pageNumber, totalPages) => {
    // Header Logo
    pageDoc.addImage(logoBase64, 'PNG', 150, 10, 45, 12);
    
    // Footer
    pageDoc.setFont('helvetica', 'normal');
    pageDoc.setFontSize(8);
    pageDoc.setTextColor(150, 150, 150);
    pageDoc.text('www.rezolibri.fr - L\'infrastructure digitale au service des agences d\'emploi', 20, 285);
    pageDoc.text(`Page ${pageNumber} / ${totalPages}`, 180, 285);
    
    // Ligne décorative Lime footer
    pageDoc.setDrawColor(...secondaryColor);
    pageDoc.setLineWidth(0.5);
    pageDoc.line(20, 282, 190, 282);
  };

  // --- PAGE 1 : COUVERTURE PREMIUM ---
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 297, 'F');
  
  // Pattern décoratif Lime sur la couverture
  doc.setDrawColor(...secondaryColor);
  doc.setLineWidth(2);
  doc.line(20, 125, 60, 125);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(38);
  doc.text('DOSSIER VISION', 20, 100);
  const currentYear = new Date().getFullYear();
  doc.text(`EXPERT ${currentYear}`, 20, 115);
  
  doc.setFontSize(22);
  doc.setTextColor(...secondaryColor);
  doc.text(`${data.lead.prenom.toUpperCase()} ${data.lead.nom.toUpperCase()}`, 20, 145);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('SIMULATION EXPERTE RÉZOLIBRI', 20, 160);
  
  // Logo blanc (version simplifiée en texte sur fond violet)
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('RÉZOLIBRI', 150, 280);

  // --- PAGE 2 : SYNTHÈSE ---
  doc.addPage();
  doc.setTextColor(...primaryColor);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Synthèse de Performance', 20, 35);
  
  doc.setDrawColor(...secondaryColor);
  doc.setLineWidth(1.5);
  doc.line(20, 40, 50, 40);

  autoTable(doc, {
    startY: 55,
    head: [['Indicateur Clé', 'Valeur mensuelle']],
    body: [
      ['Volume d\'activité', `${data.etp} ETP (Équivalent Temps Plein)`],
      ['Chiffre d\'Affaires estimé', `${formatFR(caMensuel)} € HT`],
      ['Taux de cotisations (Urssaf)', `${tauxCharges}%`],
      ['Total des charges de structure', `${formatFR(chargesMensuelles)} € HT`],
    ],
    theme: 'striped',
    headStyles: { fillColor: primaryColor, fontSize: 12, cellPadding: 6 },
    styles: { fontSize: 11, cellPadding: 5, font: 'helvetica' }
  });

  const finalY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : 150) + 20;
  doc.setFillColor(...secondaryColor);
  doc.roundedRect(20, finalY, 170, 35, 3, 3, 'F');
  
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('VOTRE REVENU NET ESTIMÉ :', 30, finalY + 12);
  doc.setFontSize(26);
  doc.text(`${formatFR(revenuNet)} € / mois`, 30, finalY + 26);

  // --- PAGE 3 : DÉTAIL ---
  doc.addPage();
  doc.setTextColor(...primaryColor);
  doc.setFontSize(22);
  doc.text('Compte d\'Exploitation Détaillé', 20, 35);

  const chargesBody = [
    ...data.chargesFixes.map(c => [c.label, `${c.value} €`, 'Fixe']),
    ...data.chargesVariables.map(c => [c.label, `${c.value} €`, 'Variable'])
  ];

  autoTable(doc, {
    startY: 55,
    head: [['Poste de dépense', 'Montant', 'Type']],
    body: chargesBody,
    theme: 'grid',
    headStyles: { fillColor: primaryColor, fontSize: 11 },
    styles: { fontSize: 10, cellPadding: 4 },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });

  // --- DERNIÈRE PAGE : CONTACT & PROCHAINES ÉTAPES ---
  doc.addPage();
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 297, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('Prêt à donner un nouvel élan ?', 20, 60);
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('Votre avenir se construit avec l\'expertise Rézolibri.', 20, 85);

  const stepsY = 110;
  doc.setFontSize(13);
  const steps = [
    '• Validez vos projections avec nos référents réseau dédié.',
    '• Activez votre infrastructure digitale haute performance.',
    '• Rémunération nette à la hauteur de votre investissement.',
    '• Indépendant, mais soutenu par la force du collectif.'
  ];
  steps.forEach((step, idx) => doc.text(step, 20, stepsY + (idx * 12)));

  // Box Contact
  doc.setDrawColor(...secondaryColor);
  doc.setLineWidth(1);
  doc.roundedRect(20, 180, 170, 60, 3, 3, 'D');
  
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTACTS RÉZOLIBRI', 30, 195);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Email : recruteurs@rezolibri.fr', 30, 210);
  doc.text('Tél : 02 85 35 63 47', 30, 220);
  doc.text('Site : www.rezolibri.fr', 30, 230);

  // Bouton Calendly
  doc.setFillColor(...secondaryColor);
  doc.roundedRect(20, 255, 170, 18, 2, 2, 'F');
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PRENDRE RENDEZ-VOUS AVEC UN EXPERT', 55, 267);
  doc.link(20, 255, 170, 18, { url: 'https://calendly.com/stephanie-laval/60min' });

  // Ajout du branding sur toutes les pages sauf la première et la dernière
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 2; i < totalPages; i++) {
    doc.setPage(i);
    addPageBordersAndBranding(doc, i, totalPages);
  }

  // SAUVEGARDE
  const pdfBlob = doc.output('blob');
  const pdfBase64 = doc.output('datauristring');
  
  return { pdfBlob, pdfBase64 };
};
