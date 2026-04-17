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
    title: 'Académie Rezolibri', 
    desc: 'Bénéficiez d\'un parcours d\'excellence pour maîtriser tous les leviers du recrutement expert.' 
  },
  { 
    icon: pictoMain, 
    title: 'Conformité & Juridique', 
    desc: 'Une sérénité totale avec une gestion 100% conforme des contrats et des obligations légales.' 
  },
  { 
    icon: pictoCoeur, 
    title: 'Algorithme Libri-Match', 
    desc: 'Notre interface intelligente connecte instantanément les meilleurs profils à vos besoins.' 
  },
  { 
    icon: pictoAmpoule, 
    title: 'Collaborative Hiring', 
    desc: 'Exploitez la force de proposition du réseau pour décupler vos opportunités de business.' 
  },
  { 
    icon: pictoExpert, 
    title: 'Outils Sourcing Premium', 
    desc: 'Accédez aux meilleures licences du marché sans surcoût. Nous gérons l\'investissement pour vous.' 
  },
  { 
    icon: pictoCoeur, 
    title: 'Sécurité de Trésorerie', 
    desc: 'Vos commissions sont garanties et versées avec une rapidité exemplaire. Finis les délais.' 
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
          <h5><Info size={18} /> L'écosystème Rezolibri</h5>
          <p>
            Nous ne nous contentons pas de réduire vos frais. <br/>
            Nous bâtissons avec vous une infrastructure de pointe pour porter votre succès.
          </p>
        </div>
        <h2>Votre arsenal de performance</h2>
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
