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

      <div className="result-preview-container">
        {/* L'overlay de capture de lead */}
        <AnimatePresence>
          {!submitted && (
            <motion.div 
              className="blur-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="lead-capture-card">
                <span className="badge-lock"><Lock size={14} /> Accès sécurisé</span>
                <h3>Débloque ton étude <br/> complète</h3>
                <p className="muted">Accède instantanément au détail de tes revenus nets, charges sociales et frais de fonctionnement.</p>
                
                <form className="form-premium" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Prénom</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Thomas"
                      value={data.lead.prenom} 
                      onChange={(e) => handleLeadChange('prenom', e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Nom</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Muller"
                      value={data.lead.nom} 
                      onChange={(e) => handleLeadChange('nom', e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group form-full">
                    <label>E-mail professionnel</label>
                    <input 
                      type="email" 
                      placeholder="thomas.m@entreprise.fr"
                      value={data.lead.email} 
                      onChange={(e) => handleLeadChange('email', e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input 
                      type="tel" 
                      placeholder="06 00 00 00 00"
                      value={data.lead.telephone} 
                      onChange={(e) => handleLeadChange('telephone', e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Département</label>
                    <input 
                      type="text" 
                      placeholder="Ex: 69"
                      value={data.lead.departement} 
                      onChange={(e) => handleLeadChange('departement', e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group form-full">
                    <div className="form-check">
                      <input 
                        type="checkbox" 
                        id="policy" 
                        checked={data.lead.acceptedPolicy} 
                        onChange={(e) => handleLeadChange('acceptedPolicy', e.target.checked)} 
                        required 
                      />
                      <label htmlFor="policy">Je souhaite recevoir mon étude détaillée par email et être accompagné par un expert.</label>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary form-full btn-submit pulse-on-hover">
                    Débloquer mes résultats <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Le Dashboard Flouté */}
        <div className={`res-dashboard ${!submitted ? 'blur-data' : ''}`}>
          <div className="results-grid">
            <div className="result-card premium highlighted">
              <span className="label">REVENU NET ESTIMÉ</span>
              <div className="value">{revenuNet.toLocaleString()} €</div>
              <span className="sub">Mensuel (Net de tout)</span>
            </div>
            
            <div className="result-card premium">
              <span className="label">CHIFFRE D'AFFAIRES</span>
              <div className="value">{caMensuel.toLocaleString()} €</div>
              <span className="sub">CA Mensuel Brut</span>
            </div>

            <div className="result-card premium">
              <span className="label">CHARGES SOCIALES</span>
              <div className="value">{cotisationsSociales.toLocaleString()} €</div>
              <span className="sub">URSSAF ({tauxCharges}%)</span>
            </div>

            <div className="result-card premium">
              <span className="label">FRAIS DE FONCTIONNEMENT</span>
              <div className="value">{(chargesMensuelles).toLocaleString()} €</div>
              <span className="sub">Abonnements & Logiciels</span>
            </div>
          </div>
        </div>
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
