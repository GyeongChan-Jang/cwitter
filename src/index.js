import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { app } from './fBase'
import { BrowserRouter } from 'react-router-dom'

console.log(app)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
)
