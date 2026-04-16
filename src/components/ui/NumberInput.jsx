import { Plus, Minus } from 'lucide-react'
import './NumberInput.css'

export default function NumberInput({ value, onChange, min = 0, max = 1000000 }) {
  const handleIncrement = () => {
    if (value < max) onChange(value + 1)
  }

  const handleDecrement = () => {
    if (value > min) onChange(value - 1)
  }

  const handleChange = (e) => {
    const val = parseInt(e.target.value) || 0
    if (val >= min && val <= max) onChange(val)
  }

  return (
    <div className="number-input-wrapper">
      <button className="num-btn dec" onClick={handleDecrement} type="button">
        <Minus size={16} />
      </button>
      <input 
        type="number" 
        value={value} 
        onChange={handleChange}
        className="num-field"
      />
      <button className="num-btn inc" onClick={handleIncrement} type="button">
        <Plus size={16} />
      </button>
    </div>
  )
}
