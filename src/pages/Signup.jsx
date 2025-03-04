import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeNav from '../components/WelcomeNav';
import authService from '../services/authService';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    const handleSignup = async (event) => {
        event.preventDefault();

        if (username.length < 4) {
            setErrorMessage('Username must be at least 4 characters long!');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('Invalid email format!');
            return;
        }

        if (password.length < 5) {
            setErrorMessage('Password must be at least 5 characters long!');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await authService.register(username, email, password);
            alert(response);
            navigate('/login');
        } catch (error) {
            setErrorMessage('There was an error during registration!');
        }
    };

    return (
        <>
            <WelcomeNav />
            <div className="container my-5 d-flex justify-content-center">
                <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                    <h2 className="text-center mb-4">Signup</h2>
                    <form onSubmit={handleSignup}>
                        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
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
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;