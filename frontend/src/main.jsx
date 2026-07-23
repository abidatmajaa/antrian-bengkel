import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AOS from 'aos'
import 'aos/dist/aos.css'

import App from './App.jsx'

AOS.init({
  duration: 600,
  once: true,
  easing: 'ease-out-quart',
  offset: 60,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
