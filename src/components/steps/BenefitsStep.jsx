import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import pictoAmpoule from '../../assets/4- PICTOGRAMMES/ampoule violet.png'
import pictoMain from '../../assets/4- PICTOGRAMMES/main violet.png'
import pictoCoeur from '../../assets/4- PICTOGRAMMES/coeur violet.png'
import pictoExpert from '../../assets/4- PICTOGRAMMES/Recruteur actif.png'
import './Steps.css'

const benefits = [
  { 
    icon: pictoExpert, 
    title: 'Académie Rézolibri', 
    desc: 'Formation intensive certifiante pour dominer le marché de l\'intérim dès le premier jour.' 
  },
  { 
    icon: pictoMain, 
    title: 'Support Juridique 24/7', 
    desc: 'Zéro risque : protection totale et contrats de travail 100% conformes aux dernières lois.' 
  },
  { 
    icon: pictoCoeur, 
    title: 'Matching IA "Flash"', 
    desc: 'Notre algorithme exclusif trouve le bon intérimaire en quelques secondes.' 
  },
  { 
    icon: pictoAmpoule, 
    title: 'Réseau Co-Recrutement', 
    desc: 'Partagez vos besoins, collaborez avec le réseau et multipliez vos marges.' 
  },
  { 
    icon: pictoExpert, 
    title: 'Licences LinkedIn Incluses', 
    desc: 'Économisez 8000€/an : on vous offre les meilleurs outils de sourcing du marché.' 
  },
  { 
    icon: pictoCoeur, 
    title: 'Cash-Flow Garanti', 
    desc: 'Terminé les impayés. Vos commissions sont sécurisées et payées sous 48h.' 
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
        <div className="info-box glass-info lime-edge">
          <h5><Info size={18} /> Pourquoi Rézolibri ?</h5>
          <p>
            On ne se contente pas de diviser tes charges. <br/>
            On multiplie tes chances de succès avec une infrastructure de niveau mondial.
          </p>
        </div>
        <h2>Ton arsenal de réussite</h2>
      </div>

      <div className="benefits-grid-premium">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index} 
            className="benefit-card-premium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="benefit-icon-wrapper">
              <img src={benefit.icon} alt={benefit.title} className="benefit-picto" />
            </div>
            <h3>{benefit.title}</h3>
            <p>{benefit.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={onPrev}>
          <ArrowLeft size={18} /> Retour
        </button>
        <button className="btn-primary" onClick={onNext}>
          Simulation Finale <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}
