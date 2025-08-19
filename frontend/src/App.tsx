import './App.css';
import EmailGenerator from './components/EmailGenerator/EmailGenerator';
import EmailHistory from './components/EmailHistory/EmailHistory';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage/AuthPage';
import Layout from './components/Layout/Layout';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/email-generator" /> : <Navigate to="/auth" />} 
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<Layout />}>
          <Route 
            path="/email-generator" 
            element={isLoggedIn ? <EmailGenerator /> : <Navigate to="/auth" />} 
          />
        <Route 
          path="/email-history" 
          element={isLoggedIn ? <EmailHistory /> : <Navigate to="/auth" />}
        />
        </Route>
      </Routes>
    </Router>
  );
}


export default App
