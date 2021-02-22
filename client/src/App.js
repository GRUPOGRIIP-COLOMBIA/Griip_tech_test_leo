import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Panel from './components/Panel';
import ReminderInfo from './components/ReminderInfo';

function App() {
  return (
    <Router>
      <Route path="/" render={() => <Navbar />} />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/panel" render={() => <Panel />} />
      <Route exact path="/recordatorio" render={() => <ReminderInfo />} />
      <Route path="/" render={() => <Footer />} />
    </Router>
  );
}

export default App;
