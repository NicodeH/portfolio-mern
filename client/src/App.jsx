import { BrowserRouter, Route, Routes } from "react-router-dom" // Import routing components

import Home from '@/pages/Home'        // Import the Home page component
import NotFound from '@/pages/NotFound' // Import the NotFound (404) page component
import Projects from "@/pages/Projects.jsx"; // Import the Projects page 
import ProjectForm from "@/pages/ProjectForm"; // Import the project form template

import { ThemeToggle } from "@/components/ThemeToggle.jsx";
import { Navbar } from "@/components/Navbar.jsx";
import { Footer } from "@/components/Footer.jsx"
import { StarBackground } from "@/components/StarBackground.jsx"; 
import { Login } from "./pages/Login";
import { useState } from "react";

// Main application component that sets up page routing
function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <div id="start">
      <BrowserRouter> 
        {/* Theme Toggle */}
        <ThemeToggle/>
        {/* Background effects */}
        <StarBackground/>
        {/* Navbar */}
        <Navbar token={token} setToken={setToken} />
        <Routes> 
          {/* Route for the home page ("/") */}
          <Route path="/" element={<Home />}/> 
          {/* Route for the projects page ("/projects") */}
          <Route path="/all-projects" element={<Projects />}/> 
          {/* Route to add form project ("/projects/add") */}
          <Route path="/new-project" element={<ProjectForm />}/> 
          {/* Route for a project page ("/projects") */}
          <Route path="/project/:id" element={<ProjectForm />}/> 
          {/* Route for a login form ("/login") */}
          <Route path="/login" element={<Login onLoginSucess={setToken} />} />
          {/* Catch-all route for any undefined path, shows NotFound page */}
          <Route path="*" element={<NotFound />}/> 
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ div>
  )
}

export default App // Export the App component as the default export
