import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggleButton from './components/ThemeToggleButton';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { initBugfender } from './lib/bugfender';
import './styles/globals.css';
import '@flaticon/flaticon-uicons/css/all/all.css';

// Inicializar servicios
initBugfender();

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Header />
            <main className="flex-grow">
              <Routes />
            </main>
            <Footer />
            <ThemeToggleButton fixed size="lg" />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;