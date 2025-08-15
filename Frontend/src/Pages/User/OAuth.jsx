import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    // Redirect to the OAuth2 login endpoint (Spring Boot)
    window.location.href = 'http://localhost:8080/oauth2/authorization/google'; // Or your provider
  };

  const handleLogout = () => {
    // Implement logout logic (e.g., clearing tokens, redirecting)
    setIsAuthenticated(false);
    setUser(null);
  }

  // Check if the user is already authenticated (e.g., check for a token in local storage).
  // This would typically happen in a useEffect hook.
  React.useEffect(() => {
    // Example: Check local storage for a token
    const token = localStorage.getItem('access_token');
    if (token) {
      // Verify token, fetch user details, etc.
      setIsAuthenticated(true);
      // ...
    }
  }, []);

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Login with Google</button>
      ) : (
        <div>
          <p>Welcome, {user ? user.name : 'User'}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;