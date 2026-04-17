import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import pictoAmpoule from '../../assets/4- PICTOGRAMMES/ampoule violet.png'
import pictoMain from '../../assets/4- PICTOGRAMMES/main violet.png'
import pictoCoeur from '../../assets/4- PICTOGRAMMES/coeur violet.png'
import './Steps.css'

const benefits = [
  { 
    icon: pictoAmpoule, 
    title: 'Académie Rézolibri', 
    desc: 'Formation intensive de 15 jours certifiante pour maîtriser les outils et la méthode.' 
  },
  { 
    icon: pictoMain, 
    title: 'Support Juridique', 
    desc: 'Protection totale et conformité RGPD/RGPD sur tous vos contrats de recrutement.' 
  },
  { 
    icon: pictoCoeur, 
    title: 'Matching IA Exclusif', 
    desc: 'Accès à notre algorithme de matching candidat-mission pour gagner 2x plus de temps.' 
  },
  { 
    icon: pictoAmpoule, 
    title: 'Réseau Co-Recrutement', 
    desc: 'Le "Uber" du recrutement : partagez vos mandats et gagnez des commissions sur le réseau.' 
  },
  { 
    icon: pictoMain, 
    title: 'Sourcing Premium', 
    desc: 'Licences LinkedIn Recruiter et jobboards incluses sans surcoût.' 
  },
  { 
    icon: pictoCoeur, 
    title: 'Paiement Express', 
    desc: 'Encaissez vos commissions sous 48h après facturation de votre client.' 
  },
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
        <h2>Ce que Rézolibri vous apporte en plus</h2>
        <p className="muted">L'infrastructure d'un grand cabinet, la liberté du consultant indépendant.</p>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index} 
            className="benefit-card"
            whileHover={{ y: -5 }}
          >
            <div className="pilier-card">
              <div className="icon-pilier">
                <img src={benefit.icon} alt={benefit.title} className="rezopicto" />
              </div>
              <h3>{benefit.title}</h3>
              <p className="desc">{benefit.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="step-actions split">
        <button className="btn-secondary" onClick={onPrev}>
          <ArrowLeft size={18} /> Retour
        </button>
        <button className="btn-primary" onClick={onNext}>
          Calculer mon Résultat <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}
