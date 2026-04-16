import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Lock, Send, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import './Steps.css'

export default function ResultStep({ data, updateData, onPrev }) {
  const [submitted, setSubmitted] = useState(false)
  
  const caMensuel = data.etp * 395
  const tauxCharges = data.isAcre ? 12.8 : 25.6
  const cotisationsSociales = Math.round(caMensuel * (tauxCharges / 100))
  const chargesMensuelles = [...data.chargesFixes, ...data.chargesVariables].reduce((acc, curr) => acc + (curr.value || 0), 0)
  const revenuNet = caMensuel - cotisationsSociales - chargesMensuelles
  
  const handleLeadChange = (field, val) => {
    updateData({ lead: { ...data.lead, [field]: val } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    
    // Explosion de confettis pour le succès
    const end = Date.now() + 2 * 1000;
    const colors = ['#470066', '#e6007e', '#c8ff00'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
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
      className="step-content"
    >
      <div className="step-header">
        <h2>Ton potentiel de revenu</h2>
        <p className="muted">Analyse de rentabilité basée sur tes paramètres de consultant.</p>
      </div>

      <div className="result-display-flow">
        {/* 1. CA Mensuel Estimé (Grande Carte - Clair) */}
        <div className="result-card premium highlight-ca pulse-on-hover">
          <span className="label">CA MENSUEL ESTIMÉ</span>
          <div className="value">{caMensuel.toLocaleString()} €</div>
          <span className="sub">/ mois</span>
        </div>

        {/* 2. Charges & Taux (Deux Cartes côte à côte - Labels clairs, Valeurs floues) */}
        <div className="charges-summary-grid">
          <div className="result-card premium">
            <span className="label">CHARGES MENSUELLES</span>
            <div className={`value ${!submitted ? 'blur-data' : ''}`}>
              {chargesMensuelles.toLocaleString()} €
            </div>
            <span className="sub">/ mois</span>
          </div>
          <div className="result-card premium">
            <span className="label">TAUX DE CHARGES</span>
            <div className={`value ${!submitted ? 'blur-data' : ''}`}>
              {tauxCharges}%
            </div>
            <span className="sub">cotisations sociales</span>
          </div>
        </div>

        {/* 3. Le Revenu Net (Affiché après soumission) */}
        <AnimatePresence>
          {submitted && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="result-card premium highlighted success-net"
            >
              <span className="label">VOTRE REVENU NET ESTIMÉ</span>
              <div className="value">{(caMensuel - cotisationsSociales - chargesMensuelles).toLocaleString()} €</div>
              <span className="sub">Net de tout, avant impôt sur le revenu</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Formulaire d'accès (Dans le flux) */}
        {!submitted && (
          <div className="lead-capture-card-inline">
            <h3>Accéder à mon résultat complet</h3>
            <p className="muted">Gratuit et sans engagement — un conseiller te contactera pour t'accompagner.</p>
            
            <form className="form-premium grid-2cols" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Prénom <span className="req">*</span></label>
                <input type="text" value={data.lead.prenom} onChange={(e) => handleLeadChange('prenom', e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Nom <span className="req">*</span></label>
                <input type="text" value={data.lead.nom} onChange={(e) => handleLeadChange('nom', e.target.value)} required />
              </div>
              <div className="form-group form-full">
                <label>Email <span className="req">*</span></label>
                <input type="email" value={data.lead.email} onChange={(e) => handleLeadChange('email', e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Téléphone <span className="req">*</span></label>
                <input type="tel" value={data.lead.telephone} onChange={(e) => handleLeadChange('telephone', e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Département <span className="req">*</span></label>
                <input type="text" value={data.lead.departement} onChange={(e) => handleLeadChange('departement', e.target.value)} required />
              </div>
              
              <div className="form-group form-full">
                <div className="form-check">
                  <input type="checkbox" id="policy" checked={data.lead.acceptedPolicy} onChange={(e) => handleLeadChange('acceptedPolicy', e.target.checked)} required />
                  <label htmlFor="policy">J'accepte que mes données soient traitées conformément à la politique de confidentialité de Rézolibri *</label>
                </div>
              </div>

              <button type="submit" className="btn-primary form-full btn-submit">
                Envoyer <Send size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="success-message"
            style={{ marginBottom: '2rem' }}
          >
            <div className="glass-info">
              <p className="title"><CheckCircle2 size={18} /> <strong>Succès ! Tes résultats sont débloqués.</strong></p>
              <p>Un conseiller Rézolibri a bien reçu ta demande et reviendra vers toi très rapidement pour affiner ces chiffres ensemble.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="step-actions split">
        <button className="btn-secondary" onClick={onPrev}>
          <ArrowLeft size={18} /> Modifier mes charges
        </button>
        {submitted && (
          <button className="btn-primary" onClick={() => window.location.href = 'https://rezolibri.fr'}>
            Retour à l'accueil
          </button>
        )}
      </div>
    </motion.div>
  )
}
