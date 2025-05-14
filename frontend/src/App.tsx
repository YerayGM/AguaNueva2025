import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { initBugfender } from './lib/bugfender';
import './styles/globals.css';
import '@flaticon/flaticon-uicons/css/all/all.css';

const App: React.FC = () => {
  useEffect(() => {
    initBugfender();
    
    // Verificar preferencia de tema guardada o preferencia del sistema
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  return (
    <ErrorBoundary>
      <Router>
          <Header />
            <Routes />
          <Footer />
      </Router>
    </ErrorBoundary>
  );
};

export default App;