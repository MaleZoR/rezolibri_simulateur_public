import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import './StepIndicator.css'

const steps = [
  { id: 1, label: 'Mon activité' },
  { id: 2, label: 'Mes charges' },
  { id: 3, label: 'Vos Avantages' },
  { id: 4, label: 'Mon résultat' },
]

export default function StepIndicator({ currentStep }) {
  return (
    <div className="step-indicator-wrapper">
      {steps.map((step, index) => (
        <div key={step.id} className="step-item">
          <div className="step-line-container">
            {index > 0 && (
              <div className={`step-line ${currentStep >= step.id ? 'active' : ''}`} />
            )}
            <div className={`step-node ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
              {currentStep > step.id ? (
                <Check size={14} strokeWidth={4} />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
          </div>
          <span className={`step-label ${currentStep >= step.id ? 'active' : ''}`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}
