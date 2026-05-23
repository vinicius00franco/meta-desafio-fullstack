import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css'
import './styles/variaveis.css'
import { Checkout } from './pages/Checkout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Checkout />
  </StrictMode>,
)
