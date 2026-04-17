import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle2, Lock, FileText, Sparkles } from 'lucide-react'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import './Steps.css'

export default function ResultStep({ data, updateData, onPrev }) {
  const [submitted, setSubmitted] = useState(false)
  
  // Logic based on interim reality (395€ is the net margin per ETP after network fee)
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
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
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
          <h5><Sparkles size={18} /> Projet Viable</h5>
          <p>
            Tes paramètres indiquent un potentiel de business solide. <br/>
            Débloque ton analyse complète pour passer à l'action.
          </p>
        </div>
        <h2>Ton potentiel de revenu</h2>
      </div>

      <div className="result-main-flow">
        {/* Résultat Flashy (Flou si pas de lead) */}
        <div className={`final-result-card ${submitted ? 'unlocked' : 'locked'}`}>
          <div className="result-badge-top">
            {submitted ? <CheckCircle2 size={16} /> : <Lock size={16} />} 
            {submitted ? 'REVENU NET DÉBLOQUÉ' : 'REVENU NET ESTIMÉ'}
          </div>
          
          <div className="net-value-container">
            <span className={`net-value ${!submitted ? 'blur-text' : ''}`}>
              {revenuNet.toLocaleString()} €
            </span>
            <span className="net-unit">/ mois net</span>
          </div>
          
          <p className="net-explanation">
            Ce montant correspond à ton revenu net après cotisations sociales ({tauxCharges}%) et frais de fonctionnement.
          </p>
        </div>

        {!submitted ? (
          <motion.div 
            className="lead-capture-premium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="form-header-premium">
              <div className="bp-badge">
                <FileText size={18} /> Business Plan 2026 Inclus
              </div>
              <h3>Générer mon Business Plan complet</h3>
              <p>Reçois ton étude de marché personnalisée et tes prévisionnels détaillés par email.</p>
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
                  <span className="check-text">🚀 Je veux valider ces chiffres lors d'un rdv avec un expert Rézolibri</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={data.lead.acceptedPolicy} onChange={(e) => handleLeadChange('acceptedPolicy', e.target.checked)} required />
                  <span className="check-text small">J'accepte la politique de confidentialité de Rézolibri.</span>
                </label>
              </div>

              <button type="submit" className="btn-final-impact pulse">
                Recevoir mon Business Plan 2026 <Send size={20} />
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
            <h3>Analyse en cours d'envoi !</h3>
            <p>Ton Business Plan 2026 est en train d'être généré par nos services. Un consultant reviendra vers toi pour affiner ton projet.</p>
            
            <button className="btn-secondary" onClick={() => window.location.href='https://rezolibri.fr'}>
              Retour sur rezolibri.fr
            </button>
          </motion.div>
        )}
      </div>

      {!submitted && (
        <div className="step-actions center">
          <button className="btn-secondary-soft" onClick={onPrev}>
            <ArrowLeft size={18} /> Modifier mes paramètres
          </button>
        </div>
      )}
    </motion.div>
  )
}
