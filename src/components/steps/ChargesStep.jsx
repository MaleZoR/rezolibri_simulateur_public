import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Plus, Info } from 'lucide-react'
import './Steps.css'
import NumberInput from '../ui/NumberInput'

export default function ChargesStep({ data, updateData, onNext, onPrev }) {
  const totalCharges = [...data.chargesFixes, ...data.chargesVariables].reduce((acc, curr) => acc + (curr.value || 0), 0)

  const handleFixeChange = (id, val) => {
    const newFixes = data.chargesFixes.map(c => c.id === id ? { ...c, value: val } : c)
    updateData({ chargesFixes: newFixes })
  }

  const handleVariableChange = (id, val) => {
    const newVars = data.chargesVariables.map(c => c.id === id ? { ...c, value: val } : c)
    updateData({ chargesVariables: newVars })
  }

  const addCharge = () => {
    const newCharge = { id: Date.now(), label: 'Nouvelle charge', value: 0 }
    updateData({ chargesVariables: [...data.chargesVariables, newCharge] })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="step-content"
    >
      <div className="step-header">
        <h2>Mes charges mensuelles</h2>
        <p className="muted">Renseigne tes charges pour affiner ta simulation.</p>
      </div>

      <div className="charges-section">
        <h3 className="section-subtitle">CHARGES FIXES</h3>
        <div className="charges-list">
          {data.chargesFixes.map(charge => (
            <div key={charge.id} className="charge-item">
              <div className="charge-label">
                {charge.label} {charge.partner && <span className="partner-badge">Partenaire {charge.partner}</span>}
                <Info size={14} className="muted" />
              </div>
              <div className="charge-input-new">
                <NumberInput 
                  value={charge.value} 
                  onChange={(val) => handleFixeChange(charge.id, val)}
                  readOnly={charge.locked}
                />
                <span className="unit">€</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="charges-section">
        <h3 className="section-subtitle">CHARGES VARIABLES (OPTIONNELLES)</h3>
        <div className="charges-list">
          {data.chargesVariables.map(charge => (
            <div key={charge.id} className="charge-item">
              <div className="charge-label">{charge.label}</div>
              <div className="charge-input-new">
                <NumberInput 
                  value={charge.value} 
                  onChange={(val) => handleVariableChange(charge.id, val)}
                />
                <span className="unit">€</span>
              </div>
            </div>
          ))}
          <button className="btn-add-charge" onClick={addCharge}>
            <Plus size={16} /> Ajouter une charge
          </button>
        </div>
      </div>

      <div className="total-box">
        <span>Total charges mensuelles</span>
        <span className="total-value">{totalCharges} €</span>
      </div>

      <div className="step-actions split">
        <button className="btn-secondary" onClick={onPrev}>
          <ArrowLeft size={18} /> Retour
        </button>
        <button className="btn-primary" onClick={onNext}>
          Suivant <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}
