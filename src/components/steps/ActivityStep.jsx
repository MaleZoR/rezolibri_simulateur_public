import { useState } from 'react'
import { motion } from 'framer-motion'
import { Info, ArrowRight, Target, LayoutDashboard } from 'lucide-react'
import './Steps.css'

import pictoAmpoule from '../../assets/4- PICTOGRAMMES/ampoule violet.png'
import NumberInput from '../ui/NumberInput'

export default function ActivityStep({ data, updateData, onNext }) {
  const [mode, setMode] = useState('libre') // 'libre' or 'objectif'
  const [targetIncome, setTargetIncome] = useState(3000)

  // Simulation parameters for inverse calculation
  const fixedCharges = 114 // Default: Platform + Mobile + RC + Bank
  const taxRate = 0.256 // Standard rate 25.6%
  const marginPerEtp = 395 // Fixed by network

  const requiredEtp = parseFloat(((targetIncome + fixedCharges) / (marginPerEtp * (1 - taxRate))).toFixed(1))

  const handleObjectiveChange = (val) => {
    setTargetIncome(val)
    const newEtp = parseFloat(((val + fixedCharges) / (marginPerEtp * (1 - taxRate))).toFixed(1))
    updateData({ etp: newEtp })
  }

  const caMensuel = data.etp * marginPerEtp
  const caAnnuel = caMensuel * 12

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="step-content"
    >
      <div className="mode-switcher-container">
        <div className="mode-switcher">
          <button 
            className={`mode-btn ${mode === 'libre' ? 'active' : ''}`}
            onClick={() => setMode('libre')}
          >
            <LayoutDashboard size={16} style={{ marginRight: '6px' }} /> Simulation Libre
          </button>
          <button 
            className={`mode-btn ${mode === 'objectif' ? 'active' : ''}`}
            onClick={() => setMode('objectif')}
          >
            <Target size={16} style={{ marginRight: '6px' }} /> Objectif de Revenu
          </button>
        </div>
      </div>

      {mode === 'libre' ? (
        <div className="simulation-libre-view">
          <div className="info-box glass-info">
            <p className="title"><Info size={18} /> <strong>Qu'est-ce qu'un ETP ?</strong></p>
            <p>1 ETP (L'Équivalent Temps Plein) représente un intérimaire travaillant 151,67 heures par mois. C'est l'étalon de mesure de votre force de frappe.</p>
          </div>

          <div className="input-group main-input">
            <div className="label-container">
              <label>Intérimaires gérés <span className="avg-network-badge">Moyenne Réseau : 8</span></label>
            </div>
            
            <div className="slider-wrapper">
              <input 
                type="range" 
                min="0.5" 
                max="50" 
                step="0.5"
                value={data.etp} 
                onChange={(e) => updateData({ etp: parseFloat(e.target.value) })}
                className="full-slider"
                style={{
                  background: `linear-gradient(to right, var(--accent-fuchsia) 0%, var(--accent-fuchsia) ${data.etp * 2}%, #eee ${data.etp * 2}%, #eee 100%)`
                }}
              />
              
              <div className="number-input-container">
                <NumberInput 
                  value={data.etp} 
                  onChange={(val) => updateData({ etp: val })} 
                  min={0.5} 
                  max={100} 
                  step={0.5}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="objective-mode-view">
          <div className="objective-input-wrapper">
            <h3>Quel est votre objectif de revenu net mensuel ?</h3>
            <NumberInput 
              value={targetIncome} 
              onChange={handleObjectiveChange} 
              min={1000} 
              max={20000} 
              suffix="€" 
            />
            
            <motion.div 
              className="objective-result-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              C'est possible ! Tu dois piloter :
              <strong>{requiredEtp} Intérimaires (ETP)</strong>
            </motion.div>
          </div>
        </div>
      )}

      <div className="results-grid">
        <motion.div 
          className="result-card premium"
          whileHover={{ y: -5 }}
        >
          <span className="label">CA MENSUEL ESTIMÉ</span>
          <div className="value">{caMensuel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €</div>
          <span className="sub">Mensuel</span>
        </motion.div>
        
        <motion.div 
          className="result-card premium highlighted"
          whileHover={{ y: -5 }}
        >
          <span className="label">CA ANNUEL ESTIMÉ</span>
          <div className="value">{caAnnuel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €</div>
          <span className="sub">Annuel</span>
        </motion.div>
      </div>

      <div className="acre-premium-card">
        <label className="acre-content" htmlFor="acre-toggle">
          <div className="acre-picto">
            <img src={pictoAmpoule} alt="Optimisation" />
          </div>
          <div className="acre-text">
            <h4>Activation du dispositif ACRE</h4>
            <p>Bénéficiez d'une réduction stratégique de vos cotisations la première année.</p>
          </div>
          <div className="acre-action">
            <label className="switch-premium">
              <input 
                type="checkbox" 
                id="acre-toggle"
                checked={data.isAcre} 
                onChange={(e) => updateData({ isAcre: e.target.checked })}
              />
              <span className="slider-premium"></span>
            </label>
          </div>
        </label>
      </div>

      <div className="step-actions">
        <button className="btn-primary pulse-on-hover" onClick={onNext}>
          Passer aux Charges <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}
