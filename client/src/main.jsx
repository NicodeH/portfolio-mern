// Import React's StrictMode for highlighting potential problems in development
import { StrictMode } from 'react'
// Import the function to create a root for rendering the React app
import { createRoot } from 'react-dom/client'
// Import the main CSS file (includes Tailwind and custom styles)
import './index.css'
// Import the main App component (the root of your application)
import App from '@/App.jsx'
import { Toaster } from "react-hot-toast";



// Find the HTML element with id 'root' and render the React app inside it
createRoot(document.getElementById('root')).render(
  // StrictMode helps catch errors and potential issues in development
  <StrictMode>
    <App/>
    <Toaster/>
  </StrictMode>,
)
