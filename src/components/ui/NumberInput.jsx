import { useRef } from 'react'
import { Plus, Minus } from 'lucide-react'
import './NumberInput.css'

export default function NumberInput({ value, onChange, min = 0, max = 1000000, suffix = "" }) {
  const inputRef = useRef(null)

  const handleIncrement = (e) => {
    e.stopPropagation()
    if (value < max) onChange(value + 1)
  }

  const handleDecrement = (e) => {
    e.stopPropagation()
    if (value > min) onChange(value - 1)
  }

  const handleChange = (e) => {
    const val = e.target.value === '' ? '' : parseInt(e.target.value)
    if (val === '') {
      onChange(0)
    } else if (!isNaN(val) && val >= 0 && val <= max) {
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
