import { createRoot } from 'react-dom/client'
import './_styles/globals.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './_redux/store'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}><App /></Provider>
  </BrowserRouter>
)
