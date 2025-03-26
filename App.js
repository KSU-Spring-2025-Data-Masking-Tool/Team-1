import React, { useState, useEffect } from 'react';  
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';  
import axios from 'axios';  

function Login() {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();  

  const handleLogin = async (e) => {  
    e.preventDefault();  
    try {  
      const response = await axios.post('http://localhost:5000/api/login', {  
        username,  
        password  
      });  
      localStorage.setItem('token', response.data.access_token);  
      navigate('/connect');  
    } catch (error) {  
      alert('Login failed! Check your credentials.');  
    }  
  };  

  return (  
    <div style={{ padding: '20px' }}>  
      <h1>Data Masking Tool Login</h1>  
      <form onSubmit={handleLogin}>  
        <input  
          type="text"  
          placeholder="Username"  
          value={username}  
          onChange={(e) => setUsername(e.target.value)}  
          style={{ display: 'block', margin: '10px 0' }}  
        />  
        <input  
          type="password"  
          placeholder="Password"  
          value={password}  
          onChange={(e) => setPassword(e.target.value)}  
          style={{ display: 'block', margin: '10px 0' }}  
        />  
        <button type="submit" style={{ margin: '10px 0' }}>Login</button>  
      </form>  
    </div>  
  );  
}  

function ConnectPage() {  
  return <h1>Connect to Database (Work in Progress)</h1>;  
}  

const router = createBrowserRouter([  
  { path: '/', element: <Login /> },  
  { path: '/connect', element: <ConnectPage /> },  
]);  

export default function App() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);  

  useEffect(() => {  
    const token = localStorage.getItem('token');  
    if (token) setIsLoggedIn(true);  
  }, []);  

  return (  
    <div className="App">  
      <RouterProvider router={router} />  
    </div>  
  );  
}  
