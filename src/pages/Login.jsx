import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeNav from '../components/WelcomeNav';
import authService from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (!username) errors.username = 'Username is required';
        if (!password) errors.password = 'Password is required';
        return errors;
    };

    useEffect(() => {
        localStorage.clear();
        setUsername(''); // Reset username
        setPassword(''); // Reset password
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await authService.login(username, password);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('username', response.username);
            localStorage.setItem('email', response.email);
            alert('Successfully logged in');
            navigate('/dashboard');
        } catch (error) {
            alert('There was an error logging in!');
        }
    };

    return (
        <>
            <WelcomeNav />
            <div className="container my-5 d-flex justify-content-center">
                <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            {errors.username && <small className="text-danger">{errors.username}</small>}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;