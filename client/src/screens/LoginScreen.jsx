import React, { useState } from 'react';
import { useUser } from '../context/UserContext.jsx'; // Asume que creaste este archivo
// Nota: useNavigate es parte de react-router-dom, asegúrate de que esté importado en App.jsx
// Ya que estamos en un solo archivo, asumiré que importamos la navegación
// Si usas un sistema de navegación simple (como un estado en App.jsx), lo ajustaremos.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const LoginScreen = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { loginUser, isAuthenticated } = useUser();

    // Redirigir si ya está autenticado
    if (isAuthenticated) {
        navigate('home'); // Redirigir a la pantalla principal si ya está logueado
        return null;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                loginUser(data); // Guardar info de usuario en el contexto
                navigate('home'); // Redirigir después del login exitoso
            } else {
                setError(data.message || 'Error de login. Intenta de nuevo.');
            }
        } catch (err) {
            setError('Error al conectar con el servidor de la API.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Iniciar Sesión</h2>
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-150"
                        id="email"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-150"
                        id="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:shadow-outline disabled:opacity-50 transition duration-300 transform hover:scale-105"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Entrar'}
                    </button>
                </div>
                <p className="mt-4 text-center text-sm text-gray-600">
                    <button 
                        onClick={() => navigate('register')}
                        type="button"
                        className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                        ¿No tienes cuenta? Regístrate aquí.
                    </button>
                </p>
            </form>
        </div>
    );
};

export default LoginScreen;
