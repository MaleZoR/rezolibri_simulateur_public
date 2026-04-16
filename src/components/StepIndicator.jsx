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
  const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="step-indicator-container">
      <div className="progress-track-bg">
        <motion.div 
          className="progress-track-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progressWidth}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="steps-wrapper">
        {steps.map((step) => (
          <div key={step.id} className="step-column">
            <motion.div 
              className={`step-circle ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="circle-inner">
                {currentStep > step.id ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              {currentStep === step.id && (
                <motion.div 
                  className="pulse-ring"
                  layoutId="pulse"
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
            <span className={`step-text ${currentStep >= step.id ? 'active' : ''}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
