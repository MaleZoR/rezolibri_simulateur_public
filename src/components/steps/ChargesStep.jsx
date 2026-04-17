import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Plus, Info, Landmark, Smartphone, ShieldCheck, CreditCard, Fuel, Coffee, TrainFront, Edit2 } from 'lucide-react'
import './Steps.css'
import NumberInput from '../ui/NumberInput'
import pictoExpert from '../../assets/4- PICTOGRAMMES/Recruteur actif.png'

const getIcon = (label) => {
  const l = label.toLowerCase()
  if (l.includes('plateforme') || l.includes('rezolibri')) return <img src={pictoExpert} alt="Rézolibri" className="picto-charge" />
  if (l.includes('mobile')) return <Smartphone size={24} />
  if (l.includes('protection') || l.includes('assurance')) return <ShieldCheck size={24} />
  if (l.includes('bancaire') || l.includes('qonto')) return <CreditCard size={24} />
  if (l.includes('carburant')) return <Fuel size={24} />
  if (l.includes('coworking')) return <Coffee size={24} />
  if (l.includes('transport')) return <TrainFront size={24} />
  return <Plus size={24} />
}

export default function ChargesStep({ data, updateData, onNext, onPrev }) {
  const totalCharges = [...data.chargesFixes, ...data.chargesVariables].reduce((acc, curr) => acc + (parseFloat(curr.value) || 0), 0)

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

  const handleLabelChange = (id, newLabel) => {
    const isFixe = data.chargesFixes.find(f => f.id === id)
    if (isFixe) return // Sécurité

    const newVars = data.chargesVariables.map(c => c.id === id ? { ...c, label: newLabel } : c)
    updateData({ chargesVariables: newVars })
  }

  const removeCharge = (id) => {
    const newVars = data.chargesVariables.filter(c => c.id !== id)
    updateData({ chargesVariables: newVars })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="step-content"
    >
      <div className="step-header">
        <div className="info-box glass-info lime-edge">
          <h5><Info size={18} /> L'avantage Rézolibri</h5>
          <p>
            Indépendant, mais jamais seul ! <br/>
            Bénéficiez de la force d'un collectif pour réussir votre aventure entrepreneuriale.
          </p>
        </div>
        <h2>Les bénéfices du réseau</h2>
      </div>
      <p className="step-sub">Ajustez vos ressources pour une réussite sereine au quotidien.</p>

      <div className="charges-dashboard">
        <div className="charges-group">
          <h3 className="group-title">CHARGES FIXES</h3>
          <div className="charges-list-rows">
            {data.chargesFixes.map(charge => (
              <div key={charge.id} className="charge-item-row">
                <div className="charge-info-side">
                  <div className="charge-icon-box">{getIcon(charge.label)}</div>
                  <div className="charge-name-block">
                    <span className="charge-name">{charge.label}</span>
                    {charge.partner && <span className="partner-badge">Partenaire {charge.partner}</span>}
                    {charge.locked && <span className="locked-badge">Inclus</span>}
                  </div>
                </div>
                <div className="charge-action-side">
                  <Info size={14} className="row-info-icon" />
                  <NumberInput 
                    value={charge.value} 
                    onChange={(val) => handleFixeChange(charge.id, val)}
                    readOnly={charge.locked}
                    suffix="€"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="charges-group">
          <h3 className="group-title">DÉPENSES COMPLÉMENTAIRES</h3>
          <div className="charges-list-rows">
            {data.chargesVariables.map(charge => (
              <div key={charge.id} className="charge-item-row editable">
                <div className="charge-info-side">
                  <div className="charge-icon-box">{getIcon(charge.label)}</div>
                  <div className="editable-label-wrapper">
                    <input 
                      className="charge-name-input" 
                      value={charge.label} 
                      onChange={(e) => handleLabelChange(charge.id, e.target.value)}
                      placeholder="Nom de la charge..."
                    />
                    <Edit2 size={12} className="edit-icon-mini" />
                  </div>
                </div>
                <div className="charge-action-side">
                  <NumberInput 
                    value={charge.value} 
                    onChange={(val) => handleVariableChange(charge.id, val)}
                    suffix="€"
                  />
                  <button className="btn-remove-charge" onClick={() => removeCharge(charge.id)}>×</button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="btn-add-row" onClick={addCharge}>
            <Plus size={14} /> Ajouter une charge
          </button>
        </div>

        <div className="total-charges-summary">
          <span className="total-label">Investissement mensuel total</span>
          <span className="total-value">{totalCharges.toLocaleString()} €</span>
        </div>
      </div>

      <motion.div 
        className="comparison-block-lime"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="comp-header">
          <h3>Indépendant, mais jamais seul !</h3>
          <p>Voici ce que vous économisez grâce à la mutualisation Rézolibri</p>
        </div>
        
        <div className="comp-grid">
          <div className="comp-item solo">
            <span className="label">Agence Solo</span>
            <span className="value">3 500 €</span>
          </div>
          <div className="comp-divider">VS</div>
          <div className="comp-item rezo">
            <span className="label">Expert Rézolibri</span>
            <span className="value">{totalCharges.toLocaleString()} €</span>
          </div>
        </div>

        <div className="economy-pill">
          💰 ÉCONOMIE : {(3500 - totalCharges).toLocaleString()} € / MOIS
        </div>
      </motion.div>

      <div className="step-actions">
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
