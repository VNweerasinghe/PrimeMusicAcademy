import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';
import FloatingWhatsApp from './components/FloatingWhatsApp';
const Home = lazy(() => import('./pages/Home'));
const Tutors = lazy(() => import('./pages/Tutors'));
const Courses = lazy(() => import('./pages/Courses'));
const Schedule = lazy(() => import('./pages/Schedule'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
import './styles/main.css';
import './styles/navigation.css';
import './styles/forms.css';
import './styles/buttons.css';
import './styles/pages.css';
import './styles/business.css';
import './styles/floating-whatsapp.css';

const Router = process.env.GITHUB_PAGES ? HashRouter : BrowserRouter;

const App = () => {
  return (
    <Router>
      <FloatingWhatsApp />
      <Suspense fallback={<div className="route-loading" role="status">Loading page…</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/tutors" component={Tutors} />
          <Route path="/courses" component={Courses} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
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