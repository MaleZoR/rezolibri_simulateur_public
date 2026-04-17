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
  
  // CALCULS
  const caMensuel = data.etp * 395;
  const tauxCharges = data.isAcre ? 12.8 : 25.6;
  const cotisationsSociales = Math.round(caMensuel * (tauxCharges / 100));
  const chargesMensuelles = [...data.chargesFixes, ...data.chargesVariables].reduce((acc, curr) => acc + (parseFloat(curr.value) || 0), 0);
  const revenuNet = Math.round(caMensuel - cotisationsSociales - chargesMensuelles);

  // --- PAGE 1 : COUVERTURE ---
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 297, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(40);
  doc.text('BUSINESS PLAN', 20, 100);
  doc.text('PROJET 2026', 20, 115);
  
  doc.setFontSize(20);
  doc.setTextColor(...secondaryColor);
  doc.text(`${data.lead.prenom.toUpperCase()} ${data.lead.nom.toUpperCase()}`, 20, 140);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('SIMULATION PERSONNALISÉE RÉZOLIBRI', 20, 155);
  
  // Bas de page couverture
  doc.setFontSize(10);
  doc.text('© 2026 Rézolibri - Tous droits réservés', 20, 280);

  // --- PAGE 2 : SYNTHÈSE FINANCIÈRE ---
  doc.addPage();
  doc.setTextColor(...primaryColor);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Synthèse de Performance', 20, 30);
  
  doc.setDrawColor(...secondaryColor);
  doc.setLineWidth(1);
  doc.line(20, 35, 100, 35);

  // Box Résumé
  autoTable(doc, {
    startY: 50,
    head: [['Indicateur', 'Valeur mensuelle']],
    body: [
      ['Volume d\'activité', `${data.etp} ETP (Équivalent Temps Plein)`],
      ['Chiffre d\'Affaires estimé', `${caMensuel.toLocaleString()} €`],
      ['Taux de cotisations (Urssaf)', `${tauxCharges}%`],
      ['Total des charges de structure', `${chargesMensuelles.toLocaleString()} €`],
    ],
    theme: 'striped',
    headStyles: { fillColor: primaryColor },
    styles: { fontSize: 11, cellPadding: 5 }
  });

  // Highlight Revenu Net
  const finalY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : 150) + 20;
  doc.setFillColor(...secondaryColor);
  doc.roundedRect(20, finalY, 170, 30, 5, 5, 'F');
  doc.setTextColor(...primaryColor);
  doc.setFontSize(16);
  doc.text('VOTRE REVENU NET ESTIMÉ :', 30, finalY + 12);
  doc.setFontSize(22);
  doc.text(`${revenuNet.toLocaleString()} € / mois`, 30, finalY + 24);

  // --- PAGE 3 : DÉTAIL DES CHARGES ---
  doc.addPage();
  doc.setTextColor(...primaryColor);
  doc.setFontSize(22);
  doc.text('Détail du Compte d\'Exploitation', 20, 30);

  const chargesBody = [
    ...data.chargesFixes.map(c => [c.label, `${c.value} €`, 'Fixe']),
    ...data.chargesVariables.map(c => [c.label, `${c.value} €`, 'Variable'])
  ];

  autoTable(doc, {
    startY: 50,
    head: [['Poste de dépense', 'Montant', 'Type']],
    body: chargesBody,
    theme: 'grid',
    headStyles: { fillColor: primaryColor },
    styles: { fontSize: 10 }
  });

  // --- DERNIÈRE PAGE : PROCHAINES ÉTAPES ---
  doc.addPage();
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 297, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.text('Prêt à lancer votre agence ?', 20, 60);
  
  doc.setFontSize(14);
  doc.text('1. Validez ces chiffres avec un expert Rézolibri.', 20, 90);
  doc.text('2. Choisissez votre implantation géographique.', 20, 105);
  doc.text('3. Profitez de l\'infrastructure 100% digitale.', 20, 120);

  doc.setFillColor(...secondaryColor);
  doc.roundedRect(20, 140, 100, 15, 2, 2, 'F');
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('PRENDRE RENDEZ-VOUS', 30, 150);

  // SAUVEGARDE / RETOUR
  const pdfBlob = doc.output('blob');
  const pdfBase64 = doc.output('datauristring'); // Utilisé par EmailJS
  
  return { pdfBlob, pdfBase64 };
};
