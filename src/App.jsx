import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ActivityStep from './components/steps/ActivityStep'
import ChargesStep from './components/steps/ChargesStep'
import BenefitsStep from './components/steps/BenefitsStep'
import ResultStep from './components/steps/ResultStep'
import StepIndicator from './components/StepIndicator'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState({
    etp: 10,
    isAcre: true,
    chargesFixes: [
      { id: 1, label: 'Abonnement Slash', value: 99, locked: true },
      { id: 2, label: 'Abonnement téléphonique', value: 12, locked: false },
      { id: 3, label: 'Assurance RC Pro', value: 12, locked: false, partner: 'Orus' },
      { id: 4, label: 'Compte bancaire Pro', value: 12, locked: false, partner: 'Qonto' },
    ],
    chargesVariables: [
      { id: 5, label: 'Frais de carburant', value: 0 },
      { id: 6, label: 'Coworking', value: 0 },
      { id: 7, label: 'Transport / déplacement', value: 0 },
    ],
    lead: {
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      departement: '',
      acceptedPolicy: false
    }
  })

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const updateData = (newData) => {
    setData(prev => ({ ...prev, ...newData }))
  }

  return (
    <div className="app-container">
      <header className="main-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="main-title"
        >
          Simule tes revenus en tant qu'indépendant
        </motion.h1>
        <p className="main-subtitle">Estimation personnalisée en moins de 5 minutes pour ton statut d'auto entrepreneur.</p>
      </header>

      <main className="simulator-wrapper">
        <StepIndicator currentStep={currentStep} />
        
        <div className="step-container premium-card">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step1">
                <ActivityStep data={data} updateData={updateData} onNext={nextStep} />
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div key="step2">
                <ChargesStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />
              </motion.div>
            )}
            {currentStep === 3 && (
              <motion.div key="step3">
                <BenefitsStep onNext={nextStep} onPrev={prevStep} />
              </motion.div>
            )}
            {currentStep === 4 && (
              <motion.div key="step4">
                <ResultStep data={data} updateData={updateData} onPrev={prevStep} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <p className="disclaimer">
          *La simulation est basée sur la moyenne du réseau Slash Intérim et ne constitue pas un conseil fiscal ou financier.
        </p>
      </main>

      <footer className="extra-content">
        <h2 className="section-title">Les 3 sources de revenus d'un conseiller indépendant Slash</h2>
        <div className="info-cards">
          <div className="info-card">
            <div className="icon">💰</div>
            <h3>Commissions</h3>
            <p>Tu touches 50% sur la marge intérim, 70% sur les placements CDD/CDI. Sans plafond.</p>
          </div>
          <div className="info-card">
            <div className="icon">🤝</div>
            <h3>Parrainage</h3>
            <p>Intègre des personnes dans ton réseau et touche des rétrocommissions sur 5 niveaux.</p>
          </div>
          <div className="info-card">
            <div className="icon">📢</div>
            <h3>Apport d'affaires</h3>
            <p>Tu as un client sans candidat ? Transmets l'opportunité à un autre conseiller Slash.</p>
          </div>
        </div>

        <div className="cta-section">
          <h3>Prêt à te lancer ?</h3>
          <p>Rejoins le réseau Slash Intérim et développe ton activité d'indépendant avec un accompagnement personnalisé.</p>
          <button className="btn-devenir">Devenir conseiller</button>
        </div>
      </footer>
    </div>
  )
}

export default App
