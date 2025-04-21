import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Box } from '@mui/material';
import axios from 'axios';

function Login({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        axios.post('http://127.0.0.1:8000/api/login/', { username, password })
            .then(response => {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setError('');
            })
            .catch(error => {
                setError('Yaroqsiz foydalanuvchi nomi yoki parol');
                console.error('Login error:', error);
            });
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 8 }}>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />
                {error && (
                    <Typography color="error">
                        {error}
                    </Typography>
                )}
                <Button variant="contained" onClick={handleLogin}>
                    Login
                </Button>
            </Box>
        </Paper>
    );
}

export default Login;