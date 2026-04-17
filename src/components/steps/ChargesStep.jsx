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

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="step-content"
    >
      <div className="step-header">
        <div className="info-box glass-info lime-edge">
          <h5><Info size={18} /> Optimisation des charges</h5>
          <p>
            Tes frais fixes sont mutualisés via Rézolibri. <br/>
            Moins de charges = Plus d'argent net dans ta poche à la fin du mois.
          </p>
        </div>
        <h2>Mes charges mensuelles</h2>
      </div>

      <div className="charges-list-premium">
        {[...data.chargesFixes, ...data.chargesVariables].map(charge => (
          <motion.div 
            key={charge.id} 
            className="charge-row-card"
            whileHover={{ x: 5 }}
          >
            <div className="charge-main-content">
              <div className="charge-icon-circle">
                {getIcon(charge.label)}
              </div>
              <div className="charge-text-details">
                <div className="charge-label-row">
                  {charge.locked ? (
                    <span className="charge-name">{charge.label}</span>
                  ) : (
                    <div className="editable-label-wrapper">
                      <input 
                        className="charge-name-input" 
                        value={charge.label} 
                        onChange={(e) => handleLabelChange(charge.id, e.target.value)}
                        placeholder="Nom de la charge..."
                      />
                      <Edit2 size={14} className="edit-icon" />
                    </div>
                  )}
                  {charge.locked && <span className="locked-badge">Inclus</span>}
                </div>
                <span className="charge-type">
                  {data.chargesFixes.find(f => f.id === charge.id) ? 'Charge fixe mensuelle' : 'Charge variable (optionnel)'}
                </span>
              </div>
            </div>
            
            <div className="charge-input-section">
              <NumberInput 
                value={charge.value} 
                onChange={(val) => data.chargesFixes.find(f => f.id === charge.id) ? handleFixeChange(charge.id, val) : handleVariableChange(charge.id, val)}
                readOnly={false}
                suffix="€"
              />
            </div>
          </motion.div>
        ))}

        <button className="btn-add-charge-premium" onClick={addCharge}>
          <div className="add-icon-circle"><Plus size={20} /></div>
          <span>Ajouter une charge personnalisée</span>
        </button>
      </div>

      <div className="comparison-block-lime">
        <div className="comp-header">
          <h3>Comparatif Financier Mensuel</h3>
          <p>Démonstration de la puissance du réseau</p>
        </div>
        <div className="comp-grid">
          <div className="comp-item solo">
            <span className="label">Indépendant Solo</span>
            <span className="value">450 €</span>
            <span className="sub">Moyenne du marché</span>
          </div>
          <div className="comp-divider">VS</div>
          <div className="comp-item rezolibri">
            <span className="label">Expert Rézolibri</span>
            <span className="value">{totalCharges.toLocaleString()} €</span>
            <span className="sub">Ton coût actuel</span>
          </div>
        </div>
        <div className="comp-bonus">
          <div className="economy-pill">
            🚀 Tu économises {(450 - totalCharges).toLocaleString()} € / mois
          </div>
        </div>
      </div>

      <div className="step-actions">
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
