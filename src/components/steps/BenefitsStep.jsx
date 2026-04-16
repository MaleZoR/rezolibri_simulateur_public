import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, GraduationCap, Gavel, Cpu, Users, Globe, BarChart3, Zap } from 'lucide-react'
import './Steps.css'

const benefits = [
  { 
    icon: <GraduationCap size={28} />, 
    title: 'Académie Rézolibri', 
    desc: 'Formation intensive de 15 jours certifiante pour maîtriser les outils et la méthode.' 
  },
  { 
    icon: <Gavel size={28} />, 
    title: 'Support Juridique', 
    desc: 'Protection totale et conformité RGPD/RGPD sur tous vos contrats de recrutement.' 
  },
  { 
    icon: <Cpu size={28} />, 
    title: 'Matching IA Exclusif', 
    desc: 'Accès à notre algorithme de matching candidat-mission pour gagner 2x plus de temps.' 
  },
  { 
    icon: <Users size={28} />, 
    title: 'Réseau Co-Recrutement', 
    desc: 'Le "Uber" du recrutement : partagez vos mandats et gagnez des commissions sur le réseau.' 
  },
  { 
    icon: <Globe size={28} />, 
    title: 'Sourcing Premium', 
    desc: 'Licences LinkedIn Recruiter et jobboards incluses sans surcoût.' 
  },
  { 
    icon: <Zap size={28} />, 
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
            <div className="icon-box">
              {benefit.icon}
            </div>
            <h4>{benefit.title}</h4>
            <p className="desc">{benefit.desc}</p>
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
