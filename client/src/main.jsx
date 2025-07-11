import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Navbar from './Components/Navbar';
  

createRoot(document.getElementById('root')).render(
  <PrimeReactProvider>
    <Navbar/>
    <App />
  </PrimeReactProvider>
)
