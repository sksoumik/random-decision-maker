import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index-beautiful.css'
import App from './App-fixed-hand.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
