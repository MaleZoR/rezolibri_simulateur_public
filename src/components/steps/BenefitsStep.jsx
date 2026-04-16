import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import './Steps.css'

const benefits = [
  { icon: '🎓', label: 'Académie Rézolibri : Formation intensive et certification' },
  { icon: '⚖️', label: 'Support juridique et conformité recrutement' },
  { icon: '🚀', label: 'Accès exclusif à la plateforme de matching IA' },
  { icon: '🤝', label: 'Réseau de co-recrutement et partage de mandats' },
  { icon: '🖥️', label: 'Outils de sourcing premium inclus' },
  { icon: '📊', label: 'Tableau de bord de performance temps réel' },
  { icon: '💰', label: 'Paiement express des commissions' },
]

export default function BenefitsStep({ onNext, onPrev }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="step-content"
    >
      <div className="step-header">
        <h2>Ce que Slash t'apporte en plus</h2>
        <p className="muted">Inclus dans ton abonnement plateforme Slash.</p>
      </div>

      <div className="benefits-list">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-item">
            <span className="benefit-icon">{benefit.icon}</span>
            <span className="benefit-label">{benefit.label}</span>
            <span className="benefit-status">Inclus</span>
          </div>
        ))}
      </div>

      <div className="step-actions split">
        <button className="btn-secondary" onClick={onPrev}>
          <ArrowLeft size={18} /> Retour
        </button>
        <button className="btn-primary" onClick={onNext}>
          Voir mon résultat <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}
