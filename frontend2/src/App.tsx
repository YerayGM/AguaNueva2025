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
import { Toaster } from 'react-hot-toast';

// Inicializar servicios
initBugfender();

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-gray-800 text-slate-800 dark:text-slate-200 transition-all duration-300">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6 max-w-7xl">
              <Routes />
            </main>
            <Footer />
            <ThemeToggleButton fixed size="lg" />
            <Toaster position="top-right" />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;