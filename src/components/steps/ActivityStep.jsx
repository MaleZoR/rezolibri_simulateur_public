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
      <div className="info-box">
        <p><strong>ETP = Équivalent Temps Plein</strong></p>
        <p>1 ETP = 1 personne à temps plein ou plusieurs à mi-temps.</p>
        <p>1 ETP correspond à 151,67 heures facturées au client.</p>
        <div className="examples">
          <p>💡 <strong>Exemples :</strong> 1 personne à temps plein sur 1 mois = 1 ETP · 2 personnes à mi-temps sur 1 mois = 1 ETP</p>
        </div>
      </div>

      <div className="input-group">
        <label>Nombre de consultants gérés — <span className="muted">moyenne du réseau : 8 consultants</span></label>
        <div className="slider-container full-width">
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={data.etp} 
            onChange={(e) => updateData({ etp: parseInt(e.target.value) })}
            className="full-slider"
          />
          <NumberInput 
            value={data.etp} 
            onChange={(val) => updateData({ etp: val })} 
            min={1} 
            max={100} 
          />
        </div>
      </div>

      <div className="results-grid">
        <div className="result-card">
          <span className="label">CA MENSUEL ESTIMÉ</span>
          <div className="value">{caMensuel.toLocaleString()} € <span className="unit">/ mois</span></div>
        </div>
        <div className="result-card">
          <span className="label">CA ANNUEL ESTIMÉ</span>
          <div className="value">{caAnnuel.toLocaleString()} € <span className="unit">/ an</span></div>
        </div>
      </div>

      <div className="toggle-group">
        <div className="toggle-header">
          <p><strong>Je bénéficie de l'ACRE</strong> <Info size={14} className="info-icon" /></p>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={data.isAcre} 
              onChange={(e) => updateData({ isAcre: e.target.checked })}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <p className="muted">Exonération partielle de charges la 1ère année — taux réduit à 12,8%</p>
        
        {data.isAcre && (
          <div className="badge-acre">
            ✅ ACRE activée — <strong>taux de cotisations : 12,8%</strong> au lieu de 25,6%
          </div>
        )}
      </div>

      <div className="step-actions">
        <button className="btn-primary" onClick={onNext}>
          Suivant <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}
