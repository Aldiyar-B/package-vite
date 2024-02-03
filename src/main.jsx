import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import Home from './components/screens/Home'
import Programm from './components/screens/Programm'
import Calculate from './components/screens/Calculate'

import './assets/styles/global.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Home />
//   </React.StrictMode>,
// )



ReactDOM.createRoot(document.getElementById('deliveryDiv')).render(
  <React.StrictMode>
    <Programm />
  </React.StrictMode>,

)

ReactDOM.createRoot(document.getElementById('calculate')).render(
  <React.StrictMode>
    <Calculate />
  </React.StrictMode>,

)
