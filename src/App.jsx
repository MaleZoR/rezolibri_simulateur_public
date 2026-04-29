import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Network, Award, ChevronLeft, Info } from 'lucide-react'
import ActivityStep from './components/steps/ActivityStep'
import ChargesStep from './components/steps/ChargesStep'
import BenefitsStep from './components/steps/BenefitsStep'
import ResultStep from './components/steps/ResultStep'
import StepIndicator from './components/StepIndicator'
import logo from './assets/1- LOGO/Horizontal/1. RVB (à prioriser)/SVG/LG-Rezolibri-RVB-Horizontal-Couleurs.svg'
import pictoAmpoule from './assets/4- PICTOGRAMMES/ampoule violet.png'
import pictoMain from './assets/4- PICTOGRAMMES/main violet.png'
import pictoCoeur from './assets/4- PICTOGRAMMES/coeur violet.png'
import FeedbackHub from './components/feedback/FeedbackHub'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState({
    etp: 10,
    isAcre: false,
    chargesFixes: [
      { id: 1, label: 'Accès Plateforme Rézolibri', value: 79, locked: true },
      { id: 2, label: 'Forfait Mobile & Cloud', value: 15, locked: false },
      { id: 3, label: 'Protection RC Pro Expert', value: 11, locked: false, partner: 'Orus' },
      { id: 4, label: 'Solution Bancaire Pro', value: 9, locked: false, partner: 'Qonto' },
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

  useEffect(() => {
    const yOffset = -50; 
    const element = document.querySelector('.simulator-wrapper');
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [currentStep])

  const updateData = (newData) => {
    setData(prev => ({ ...prev, ...newData }))
  }

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-top">
          <div className="logo-wrapper">
            <img src={logo} alt="Rézolibri" className="main-logo" />
          </div>
          <button 
            className="btn-back-site" 
            onClick={() => window.location.href = 'https://rezolibri.fr'}
          >
            <ChevronLeft size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Retour au site
          </button>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="main-title"
          >
            Révélez votre potentiel, <br/>
            <span className="highlight">boostez votre avenir pro</span>
          </motion.h1>
          <p className="main-subtitle">
            Indépendant, mais jamais seul ! Rejoignez Rézolibri et dynamisez votre carrière de recruteur 
            avec un réseau et des outils performants.
          </p>
        </div>
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
                <BenefitsStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />
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
          *Simulation basée sur les indicateurs de performance du réseau Rézolibri et fournie à titre indicatif uniquement.
        </p>
      </main>

      <footer className="extra-content">
        <h2 className="section-title">Les piliers de réussite d'un expert Rézolibri</h2>
        
        <div className="rezolibri-piliers">
          <div className="pilier-card">
            <div className="icon-pilier">
              <img src={pictoAmpoule} alt="Expertise" className="rezopicto" />
            </div>
            <h3>Expertise Recrutement</h3>
            <p>Maximisez vos revenus sur chaque placement réussi avec une rétrocession ultra-compétitive. Liberté totale, sans plafond.</p>
          </div>
          <div className="pilier-card">
            <div className="icon-pilier">
              <img src={pictoMain} alt="Croissance" className="rezopicto" />
            </div>
            <h3>Croissance Réseau</h3>
            <p>Bénéficiez de la puissance du collectif Rézolibri en parrainant de nouveaux experts et percevez des bonus sur la durée.</p>
          </div>
          <div className="pilier-card">
            <div className="icon-pilier">
              <img src={pictoCoeur} alt="Coaching" className="rezopicto" />
            </div>
            <h3>Co-Coaching Business</h3>
            <p>Partagez vos opportunités avec le réseau et profitez de l'intelligence collective pour débloquer des commissions bonus.</p>
          </div>
        </div>

        <div className="cta-section">
          <h3>Prêt à vivre l'aventure Rézolibri ?</h3>
          <p>Rejoignez un réseau d'experts passionnés et donnez une nouvelle dimension à votre carrière de recruteur indépendant.</p>
          <button className="btn-devenir" onClick={() => window.location.href = 'https://www.rezolibri.fr/espace-recruteurs/'}>
            Nous rejoindre
          </button>
        </div>
      </footer>
      <FeedbackHub currentStep={currentStep} />
    </div>
  )
}

export default App
