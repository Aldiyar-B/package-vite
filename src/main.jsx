import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import Home from './components/screens/Home'
import Programm from './components/screens/Programm'

import './assets/styles/global.css'



ReactDOM.createRoot(document.getElementById('deliveryDiv')).render(
  <React.StrictMode>
    <Programm />
  </React.StrictMode>,

)


