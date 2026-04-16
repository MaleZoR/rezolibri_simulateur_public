import { motion } from 'framer-motion'
import { ArrowLeft, PartyPopper } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'
import './Steps.css'

export default function ResultStep({ data, updateData, onPrev }) {
  const caMensuel = data.etp * 395
  const tauxCharges = data.isAcre ? 12.8 : 25.6
  const cotisationsSociales = Math.round(caMensuel * (tauxCharges / 100))
  const chargesMensuelles = [...data.chargesFixes, ...data.chargesVariables].reduce((acc, curr) => acc + (curr.value || 0), 0)
  
  const handleLeadChange = (field, val) => {
    updateData({ lead: { ...data.lead, [field]: val } })
  }

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="step-content"
    >
      <div className="res-grid">
        <div className="res-card main">
          <span className="label">CA MENSUEL ESTIMÉ</span>
          <div className="value">{caMensuel.toLocaleString()} €</div>
          <span className="unit">/ mois</span>
        </div>
        <div className="res-sub-grid">
          <div className="res-card small">
            <span className="label">CHARGES MENSUELLES</span>
            <div className="value">{chargesMensuelles + cotisationsSociales} €</div>
            <span className="unit">/ mois</span>
          </div>
          <div className="res-card small">
            <span className="label">TAUX DE CHARGES</span>
            <div className="value">{tauxCharges}%</div>
            <span className="unit">cotisations sociales</span>
          </div>
        </div>
      </div>

      <div className="capture-box">
        <h3>Accéder à mon résultat complet</h3>
        <p className="muted">Gratuit et sans engagement — un conseiller te contactera pour t'accompagner.</p>
        
        <form className="lead-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label>Prénom <span className="req">*</span></label>
              <input type="text" value={data.lead.prenom} onChange={(e) => handleLeadChange('prenom', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Nom <span className="req">*</span></label>
              <input type="text" value={data.lead.nom} onChange={(e) => handleLeadChange('nom', e.target.value)} required />
            </div>
          </div>
          
          <div className="form-group">
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

          <div className="form-check">
            <input 
              type="checkbox" 
              id="policy" 
              checked={data.lead.acceptedPolicy} 
              onChange={(e) => handleLeadChange('acceptedPolicy', e.target.checked)} 
              required 
            />
            <label htmlFor="policy">J'accepte que mes données soient traitées conformément à la politique de confidentialité de Rézolibri *</label>
          </div>

          <button type="submit" className="btn-submit">Envoyer</button>
        </form>
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={onPrev}>
          <ArrowLeft size={18} /> Modifier mes charges
        </button>
      </div>
    </motion.div>
  )
}
