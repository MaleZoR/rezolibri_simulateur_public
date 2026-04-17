import { useState } from 'react'
import { motion } from 'framer-motion'
import { Info, ArrowRight, Target, LayoutDashboard } from 'lucide-react'
import './Steps.css'

import pictoAmpoule from '../../assets/4- PICTOGRAMMES/ampoule rose.png'
import NumberInput from '../ui/NumberInput'

export default function ActivityStep({ data, updateData, onNext }) {
  const [mode, setMode] = useState('libre') // 'libre' or 'objectif'
  const [targetIncome, setTargetIncome] = useState(3000)

  // Simulation parameters for inverse calculation
  const fixedCharges = 114 // Default: Platform + Mobile + RC + Bank
  const taxRate = 0.256 // Standard rate 25.6%
  const marginPerEtp = 395 // Fixed by network

  // Calculate required ETP based on Target Income
  // Formula: Target = (ETP * Margin * (1 - TaxRate)) - Fixed
  // ETP = (Target + Fixed) / (Margin * (1 - TaxRate))
  const requiredEtp = Math.ceil((targetIncome + fixedCharges) / (marginPerEtp * (1 - taxRate)))

  const handleObjectiveChange = (val) => {
    setTargetIncome(val)
    updateData({ etp: Math.ceil((val + fixedCharges) / (marginPerEtp * (1 - taxRate))) })
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
            <p className="title"><Info size={18} /> <strong>Comprendre l'ETP</strong></p>
          <p>1 ETP = 1 intérimaire à temps plein (151,67 heures facturées / mois). Les temps partiels sont comptabilisés au prorata (ex: 0,5 ETP).</p>
          </div>

          <div className="input-group main-input">
            <div className="label-container">
              <label>Intérimaires gérés <span className="avg-network-badge">Moyenne Réseau : 8</span></label>
            </div>
            
            <div className="slider-wrapper">
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={data.etp} 
                onChange={(e) => updateData({ etp: parseInt(e.target.value) })}
                className="full-slider"
                style={{
                  background: `linear-gradient(to right, var(--accent-fuchsia) 0%, var(--accent-fuchsia) ${data.etp}%, #eee ${data.etp}%, #eee 100%)`
                }}
              />
              
              <div className="number-input-container">
                <NumberInput 
                  value={data.etp} 
                  onChange={(val) => updateData({ etp: val })} 
                  min={1} 
                  max={100} 
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="objective-mode-view">
          <div className="objective-input-wrapper">
            <h3>Quel revenu net mensuel souhaites-tu atteindre ?</h3>
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
          <div className="value">{caMensuel.toLocaleString()} €</div>
          <span className="sub">Mensuel</span>
        </motion.div>
        
        <motion.div 
          className="result-card premium highlighted"
          whileHover={{ y: -5 }}
        >
          <span className="label">CA ANNUEL ESTIMÉ</span>
          <div className="value">{caAnnuel.toLocaleString()} €</div>
          <span className="sub">Annuel</span>
        </motion.div>
      </div>

      <div className="acre-premium-card">
        <label className="acre-content" htmlFor="acre-toggle">
          <div className="acre-picto">
            <img src={pictoAmpoule} alt="ACRE" />
          </div>
          <div className="acre-text">
            <h4>Bénéficier de l'ACRE</h4>
            <p>Exonération partielle de charges la 1ère année</p>
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

      <div className="step-actions center">
        <button className="btn-primary pulse-on-hover" onClick={onNext}>
          Passer aux Charges <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}
