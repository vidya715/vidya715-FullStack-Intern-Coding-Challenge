import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserStoreList from './components/User/StoreList';
import OwnerDashboard from './components/Owner/OwnerDashboard';
import { useAuth } from './hooks/useAuth'; // Example

function App() {
  const { isLoggedIn, userRole } = useAuth(); // Implement this hook

  const RequireAuth = ({ children, allowedRoles }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" />; // Create an unauthorized page
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin/dashboard"
          element={<RequireAuth allowedRoles={['admin']}>
            <AdminDashboard />
          </RequireAuth>}
        />
        <Route
          path="/stores"
          element={<RequireAuth allowedRoles={['normal']}>
            <UserStoreList />
          </RequireAuth>}
        />
        <Route
          path="/owner/dashboard"
          element={<RequireAuth allowedRoles={['owner']}>
            <OwnerDashboard />
          </RequireAuth>}
        />
        <Route path="/" element={<Navigate to={isLoggedIn ? (userRole === 'admin' ? '/admin/dashboard' : userRole === 'owner' ? '/owner/dashboard' : '/stores') : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
