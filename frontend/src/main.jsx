import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./css/style.css"; 
import { Provider } from "react-redux";
import "leaflet/dist/leaflet.css";
import store from './Redux/store.js'
import { HelmetProvider } from "react-helmet-async";
createRoot(document.getElementById('root')).render(
    <HelmetProvider>
    <Provider store ={store}>
        <App />
    </Provider>
    </HelmetProvider>
)


