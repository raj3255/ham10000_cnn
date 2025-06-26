import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Frontpage from './Frontpage';
import Hero from './Hero';
import Login from './Login';
import Register from './Register';
import Contact from './Contact';
import About from './About';
import Terms from './Terms';
import Privacy from './Privacy';
import Overview from './Overview';

import MainLayout from './layouts/MainLayout';
import MinimalLayout from './layouts/MinimalLayout';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 App">
        <Routes>
          {/* Minimal layout pages (no footer) */}
          <Route path="/login" element={<MinimalLayout><Login /></MinimalLayout>} />
          <Route path="/register" element={<MinimalLayout><Register /></MinimalLayout>} />
          <Route path="/" element={<MinimalLayout><Frontpage /></MinimalLayout>} />
          {/* Main layout pages */}
          <Route path="/home" element={<MainLayout><Hero /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
          <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />
          <Route path='/overview' element={<MainLayout><Overview /></MainLayout>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
