import { useRef } from 'react'
import { Plus, Minus } from 'lucide-react'
import './NumberInput.css'

export default function NumberInput({ value, onChange, min = 0, max = 1000000, suffix = "", step = 1 }) {
  const inputRef = useRef(null)

  const handleIncrement = (e) => {
    e.stopPropagation()
    const nextVal = Math.min(max, parseFloat((parseFloat(value) + step).toFixed(2)))
    onChange(nextVal)
  }

  const handleDecrement = (e) => {
    e.stopPropagation()
    const nextVal = Math.max(min, parseFloat((parseFloat(value) - step).toFixed(2)))
    onChange(nextVal)
  }

  const handleChange = (e) => {
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
    <div className="number-input-wrapper">
      <button className="num-btn dec" onClick={handleDecrement} type="button">
        <Minus size={16} />
      </button>
      <div className="input-with-unit" onClick={() => inputRef.current?.focus()}>
        <input 
          ref={inputRef}
          type="number" 
          step={step}
          value={value} 
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
          className="num-field"
        />
        {suffix && <span className="input-euro">{suffix}</span>}
      </div>
      <button className="num-btn inc" onClick={handleIncrement} type="button">
        <Plus size={16} />
      </button>
    </div>
  )
}
