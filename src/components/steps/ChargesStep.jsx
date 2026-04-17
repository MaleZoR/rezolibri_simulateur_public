import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Plus, Info, Landmark, Smartphone, ShieldCheck, CreditCard, Fuel, Coffee, TrainFront } from 'lucide-react'
import './Steps.css'
import NumberInput from '../ui/NumberInput'

const getIcon = (label) => {
  const l = label.toLowerCase()
  if (l.includes('plateforme')) return <Landmark size={20} />
  if (l.includes('mobile')) return <Smartphone size={20} />
  if (l.includes('protection') || l.includes('assurance')) return <ShieldCheck size={20} />
  if (l.includes('bancaire') || l.includes('qonto')) return <CreditCard size={20} />
  if (l.includes('carburant')) return <Fuel size={20} />
  if (l.includes('coworking')) return <Coffee size={20} />
  if (l.includes('transport')) return <TrainFront size={20} />
  return <Plus size={20} />
}

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
        <p className="muted">Optimise tes charges pour maximiser ton revenu net.</p>
      </div>

      <div className="charges-grid">
        {data.chargesFixes.map(charge => (
          <div key={charge.id} className="charge-card">
            <div className="charge-info-top">
              <div className="charge-icon-wrapper">
                {getIcon(charge.label)}
              </div>
              <div className="charge-details-text">
                <span className="label">
                  {charge.label}
                  {charge.partner && <span className="partner-badge">{charge.partner}</span>}
                </span>
                <span className="sub">Charge fixe mensuelle</span>
              </div>
              <Info size={16} className="text-muted" style={{ cursor: 'help' }} />
            </div>
            
            <div className="charge-input-wrapper">
              <span className="muted-text">Montant</span>
              <NumberInput 
                value={charge.value} 
                onChange={(val) => handleFixeChange(charge.id, val)}
                readOnly={charge.locked}
                suffix="€"
              />
            </div>
          </div>
        ))}

        {data.chargesVariables.map(charge => (
          <div key={charge.id} className="charge-card">
            <div className="charge-info-top">
              <div className="charge-icon-wrapper">
                {getIcon(charge.label)}
              </div>
              <div className="charge-details-text">
                <span className="label">{charge.label}</span>
                <span className="sub">Charge variable (optionnel)</span>
              </div>
            </div>
            
            <div className="charge-input-wrapper">
              <span className="muted-text">Montant</span>
              <NumberInput 
                value={charge.value} 
                onChange={(val) => handleVariableChange(charge.id, val)}
                suffix="€"
              />
            </div>
          </div>
        ))}

        <button className="btn-add-charge" onClick={addCharge}>
          <Plus size={24} /> <span>Ajouter une charge</span>
        </button>
      </div>

      <div className="total-box glass">
        <span>Total des charges mensuelles estimées</span>
        <span className="total-value">{totalCharges.toLocaleString()} € <span className="small">/ mois</span></span>
      </div>

      <div className="solo-comparator">
        <div className="solo-grid">
          <div className="compare-card solo">
            <span className="val">450 €</span>
            <span className="tit">Coût en Solo (estimé)</span>
          </div>
          <div className="compare-card rezolibri">
            <span className="val">{totalCharges.toLocaleString()} €</span>
            <span className="tit">Ton coût Rézolibri</span>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="economy-badge">
            🚀 Tu économises {(450 - totalCharges).toLocaleString()} € / mois
          </div>
        </div>
      </div>

      <div className="step-actions split">
        <button className="btn-secondary" onClick={onPrev}>
          <ArrowLeft size={18} /> Retour
        </button>
        <button className="btn-primary" onClick={onNext}>
          Passer aux Avantages <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}
