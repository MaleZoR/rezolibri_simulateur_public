import { useRef } from 'react'
import { Plus, Minus } from 'lucide-react'
import './NumberInput.css'

export default function NumberInput({ value, onChange, min = 0, max = 1000000, suffix = "", step = 1, readOnly = false }) {
  const inputRef = useRef(null)

  const handleIncrement = (e) => {
    if (readOnly) return
    e.stopPropagation()
    const nextVal = Math.min(max, parseFloat((parseFloat(value) + step).toFixed(2)))
    onChange(nextVal)
  }

  const handleDecrement = (e) => {
    if (readOnly) return
    e.stopPropagation()
    const nextVal = Math.max(min, parseFloat((parseFloat(value) - step).toFixed(2)))
    onChange(nextVal)
  }

  const handleChange = (e) => {
    if (readOnly) return
    const rawVal = e.target.value
    if (rawVal === '') {
      onChange(0)
      return
    }
    const val = parseFloat(rawVal)
    if (!isNaN(val) && val >= 0 && val <= max) {
      onChange(val)
    }
  }

  return (
    <div className={`number-input-wrapper ${readOnly ? 'read-only' : ''}`}>
      <button 
        className="num-btn dec" 
        onClick={handleDecrement} 
        disabled={readOnly}
        type="button"
      >
        <Minus size={16} />
      </button>
      <div className="input-with-unit" onClick={() => !readOnly && inputRef.current?.focus()}>
        <input 
          ref={inputRef}
          type="number" 
          step={step}
          value={value} 
          onChange={handleChange}
          onFocus={(e) => !readOnly && e.target.select()}
          readOnly={readOnly}
          className="num-field"
        />
        {suffix && <span className="input-euro">{suffix}</span>}
      </div>
      <button 
        className="num-btn inc" 
        onClick={handleIncrement} 
        disabled={readOnly}
        type="button"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
