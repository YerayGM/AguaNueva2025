import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router';
import Navbar from './components/Navbar';
import { initBugfender } from './lib/bugfender';

const App: React.FC = () => {
  useEffect(() => {
    initBugfender();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes />
    </Router>
  );
};

export default App;
