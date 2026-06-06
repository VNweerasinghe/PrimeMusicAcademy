import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tutors from './pages/Tutors';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import './styles/main.css';
import './styles/navigation.css';
import './styles/forms.css';
import './styles/buttons.css';
import './styles/pages.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tutors" component={Tutors} />
        <Route path="/courses" component={Courses} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
};

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  );
} else {
  console.error("Root element not found");
}