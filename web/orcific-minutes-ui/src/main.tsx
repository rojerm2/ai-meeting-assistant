import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore: CSS import declaration is handled by the bundler
import './index.css'
import App from './App'

const rootElement = document.getElementById('root') as HTMLElement
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
