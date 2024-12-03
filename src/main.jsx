import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/index.jsx'

createRoot(document.getElementById('root')).render(
  <Suspense>
    <RouterProvider router={routes} />
  </Suspense>
)


// <StrictMode>
{/* <App /> */ }
{/* </StrictMode>, */ }