import { motion } from 'framer-motion'
import { Info, ArrowRight } from 'lucide-react'
import './Steps.css'

import NumberInput from '../ui/NumberInput'

export default function ActivityStep({ data, updateData, onNext }) {
  const caMensuel = data.etp * 395
  const caAnnuel = caMensuel * 12

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="step-content"
    >
      <div className="info-box glass-info">
        <p className="title"><Info size={18} /> <strong>Comprendre l'ETP</strong></p>
        <p>1 ETP = 1 consultant à temps plein (151,67 heures facturées / mois).</p>
        <div className="examples-grid">
          <div className="example-tag">1 Temps Plein = 1 ETP</div>
          <div className="example-tag">2 Mi-Temps = 1 ETP</div>
        </div>
      </div>

      <div className="input-group main-input">
        <div className="label-container">
          <label>Consultants gérés</label>
          <span className="avg-badge">Moyenne Réseau : 8</span>
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

      <div className="toggle-section-premium">
        <div className="toggle-card">
          <div className="toggle-info">
            <p className="title">Bénéficier de l'ACRE</p>
            <p className="desc">Exonération partielle de charges la 1ère année</p>
          </div>
          <label className="switch-premium">
            <input 
              type="checkbox" 
              checked={data.isAcre} 
              onChange={(e) => updateData({ isAcre: e.target.checked })}
            />
            <span className="slider-premium"></span>
          </label>
        </div>
        
        {data.isAcre && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="acre-detail-active"
          >
            🔥 <strong>Taux réduit à 12,8%</strong> au lieu de 25,6%
          </motion.div>
        )}
      </div>

      <div className="step-actions center">
        <button className="btn-primary pulse-on-hover" onClick={onNext}>
          Passer aux Charges <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}
