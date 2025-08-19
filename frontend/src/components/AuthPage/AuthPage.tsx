import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'register';

const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<AuthMode>('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (mode === 'register' && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (mode === 'login') {
          authService.login(username, password)
            .then(data => {
              const token = data.token;
              localStorage.setItem('token', token);
              navigate('/email-generator');
            })
            .catch(err => {
              setError(err.message);
            });
        } else {
            authService.register(username, password)
              .then(data => {
                console.log('Registration successful:', data);
              })
              .catch(err => {
                setError(err.message);
              });
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            required
                            onChange={e => setUsername(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            required
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                        />
                    </label>
                </div>
                {mode === 'register' && (
                    <div style={{ marginBottom: 16 }}>
                        <label>
                            Confirm Password:
                            <input
                                type="password"
                                value={confirmPassword}
                                required
                                onChange={e => setConfirmPassword(e.target.value)}
                                style={{ width: '100%', padding: 8, marginTop: 4 }}
                            />
                        </label>
                    </div>
                )}
                {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
                <button type="submit" style={{ width: '100%', padding: 10 }}>
                    {mode === 'login' ? 'Login' : 'Register'}
                </button>
            </form>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
                {mode === 'login' ? (
                    <>
                        Don't have an account?{' '}
                        <button type="button" onClick={() => setMode('register')} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
                            Register
                        </button>
                    </>
                ) : (
                    <>
                        Already have an account?{' '}
                        <button type="button" onClick={() => setMode('login')} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
                            Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPage;