import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle2, Lock, FileText, Sparkles, Calendar } from 'lucide-react'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import './Steps.css'
import { generateBusinessPlan } from '../../utils/pdfGenerator'
import { sendBusinessPlanEmail } from '../../services/emailService'

// Official Rezolibri Pictograms
import pictoExpert from '../../assets/4- PICTOGRAMMES/Recruteur actif.png'
import pictoMain from '../../assets/4- PICTOGRAMMES/main violet.png'
import pictoAmpoule from '../../assets/4- PICTOGRAMMES/ampoule violet.png'

export default function ResultStep({ data, updateData, onPrev }) {
  const [submitted, setSubmitted] = useState(false)
  
  const caMensuel = data.etp * 395 
  const tauxCharges = data.isAcre ? 12.8 : 25.6
  const cotisationsSociales = Math.round(caMensuel * (tauxCharges / 100))
  const chargesMensuelles = [...data.chargesFixes, ...data.chargesVariables].reduce((acc, curr) => acc + (parseFloat(curr.value) || 0), 0)
  const revenuNet = Math.round(caMensuel - cotisationsSociales - chargesMensuelles)
  
  const handleLeadChange = (field, val) => {
    updateData({ lead: { ...data.lead, [field]: val } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    
    const end = Date.now() + 3 * 1000;
    const colors = ['#470066', '#e6007e', '#c8ff00'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        // Déclenchement de l'usine à BP
        generateBusinessPlan(data).then(({ pdfBlob, pdfBase64 }) => {
          // 1. Fiabilisation du Téléchargement
          const url = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.download = `BP_2026_${data.lead.nom.toUpperCase()}.pdf`;
          document.body.appendChild(link);
          link.click();
          
          setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }, 100);

          // 2. Envoi de l'Email (en tâche de fond)
          sendBusinessPlanEmail(data, pdfBase64);
        });
      }
    }());
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="step-content result-step-container"
    >
      <div className="step-header">
        <div className="info-box glass-info lime-edge">
          <h5><Sparkles size={18} /> Simulation Terminée</h5>
          <p>
            Ton Business Plan 2026 est prêt. <br/>
            Débloque ton analyse complète pour lancer ton agence d'emploi.
          </p>
        </div>
        <h2>Ton compte d'exploitation</h2>
      </div>

      <div className="result-main-flow">
        {/* Recapitualtif Premium Horizontal (Cohérence avec Etape des Charges) */}
        <div className="recap-list-premium">
          <div className="recap-row-card">
            <div className="recap-icon-box">
              <img src={pictoExpert} alt="Activite" className="recap-picto" />
            </div>
            <div className="recap-details">
              <span className="recap-label">Volume d'activité prévu</span>
              <span className="recap-value">{data.etp} Intérimaires (ETP)</span>
            </div>
          </div>

          <div className="recap-row-card">
            <div className="recap-icon-box">
              <img src={pictoMain} alt="Fiscalite" className="recap-picto" />
            </div>
            <div className="recap-details">
              <span className="recap-label">Taux de cotisations sociales</span>
              <span className="recap-value">{tauxCharges}% {data.isAcre ? ' (ACRE)' : ''}</span>
            </div>
          </div>

          <div className="recap-row-card">
            <div className="recap-icon-box">
              <img src={pictoAmpoule} alt="Charges" className="recap-picto" />
            </div>
            <div className="recap-details">
              <span className="recap-label">Frais de fonctionnement</span>
              <span className="recap-value">{chargesMensuelles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} € / mois</span>
            </div>
          </div>
        </div>

        {/* Cœur du résultat (Flou/Débloqué) */}
        <div className={`final-result-card ${submitted ? 'unlocked' : 'locked'}`}>
          <div className="result-badge-top">
            {submitted ? <CheckCircle2 size={16} /> : <Lock size={16} />} 
            {submitted ? 'COMPTE D\'EXPLOITATION DÉBLOQUÉ' : 'VOTRE REVENU NET ESTIMÉ'}
          </div>
          
          <div className="net-value-container">
            <span className={`net-value ${!submitted ? 'blur-text' : ''}`}>
              {submitted ? `${revenuNet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €` : '8 314 11 €'}
            </span>
            <span className="net-unit">/ mois net</span>
          </div>
          
          <div className="net-explanation-badge">
            <span>✨ Net de cotisations et frais de fonctionnement</span>
          </div>
        </div>

        {!submitted ? (
          <motion.div 
            className="lead-capture-premium highlighted-box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="form-header-premium">
              <div className="bp-badge">
                <FileText size={18} /> Business Plan 2026 inclus
              </div>
              <h3>Accéder aux détails du projet</h3>
              <p>Reçois ton compte d'exploitation complet et tes prévisionnels détaillés par email.</p>
            </div>

            <form className="form-grid-premium" onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="input-group-premium">
                  <label>Prénom</label>
                  <input type="text" placeholder="Jean" value={data.lead.prenom} onChange={(e) => handleLeadChange('prenom', e.target.value)} required />
                </div>
                <div className="input-group-premium">
                  <label>Nom</label>
                  <input type="text" placeholder="Dupont" value={data.lead.nom} onChange={(e) => handleLeadChange('nom', e.target.value)} required />
                </div>
              </div>

              <div className="input-group-premium full">
                <label>Email Professionnel</label>
                <input type="email" placeholder="contact@votre-agence.fr" value={data.lead.email} onChange={(e) => handleLeadChange('email', e.target.value)} required />
              </div>

              <div className="input-row">
                <div className="input-group-premium">
                  <label>Téléphone</label>
                  <input type="tel" placeholder="06 12 34 56 78" value={data.lead.telephone} onChange={(e) => handleLeadChange('telephone', e.target.value)} required />
                </div>
                <div className="input-group-premium">
                  <label>Département</label>
                  <input type="text" placeholder="75" value={data.lead.departement} onChange={(e) => handleLeadChange('departement', e.target.value)} required />
                </div>
              </div>

              <div className="checkbox-group-premium">
                <label className="checkbox-item">
                  <input type="checkbox" defaultChecked />
                  <span className="check-text">🚀 Je veux valider ces chiffres lors d'un rdv avec un expert</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={data.lead.acceptedPolicy} onChange={(e) => handleLeadChange('acceptedPolicy', e.target.checked)} required />
                  <span className="check-text small">J'accepte la politique de confidentialité de Rézolibri.</span>
                </label>
              </div>

              <button type="submit" className="btn-final-impact pulse">
                Recevoir mon Business Plan <Send size={20} />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            className="success-feedback-premium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="success-icon-wrapper">
              <CheckCircle2 size={48} />
            </div>
            <h3>Félicitations {data.lead.prenom} !</h3>
            <p>Ton Business Plan 2026 personnalisé est en cours de téléchargement automatique et vient d'être envoyé sur ton adresse email.</p>
            
            <div className="success-actions-premium">
              <button className="btn-final-impact pulse" onClick={() => window.open('https://calendly.com/stephanie-laval/60min', '_blank')}>
                Prendre rendez-vous avec un expert <Calendar size={20} />
              </button>
              
              <button className="btn-secondary-soft" onClick={() => window.location.href='https://rezolibri.fr'}>
                Retour sur rezolibri.fr
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {!submitted && (
        <div className="step-actions">
          <button className="btn-secondary-soft" onClick={onPrev}>
            <ArrowLeft size={18} /> Modifier mes paramètres
          </button>
        </div>
      )}
    </motion.div>
  )
}
