import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/index.jsx'
import { Provider } from 'react-redux'
import store from "./redux/store.js";



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* // <StrictMode> */}
    <Suspense fallback={
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <p className='text-4xl'>Loading ...</p>
      </div>

    }>

      <RouterProvider router={routes} />


    </Suspense>
  </Provider >
  // </StrictMode>
)


// <StrictMode>
{/* <App /> */ }
{/* </StrictMode>, */ }