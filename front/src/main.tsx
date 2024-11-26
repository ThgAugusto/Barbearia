import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './assets/styles/index.css'
import { Router } from './routes/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={Router} />
  </StrictMode>,
)