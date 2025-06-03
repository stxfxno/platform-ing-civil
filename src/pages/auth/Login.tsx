// src/pages/auth/Login.tsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Building, Lock, Mail, AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
    const { login, isAuthenticated, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Redirect if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const success = await login(formData.email, formData.password);
            if (!success) {
                setError('Credenciales inválidas.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        if (error) setError('');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-slate-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-center items-center p-12 relative">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                            radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
                        `,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>
                
                <div className="relative max-w-md text-center space-y-8">
                    {/* Simple Logo */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl">
                        <Building className="h-8 w-8 text-slate-900" />
                    </div>
                    
                    {/* Brand Text */}
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Plataforma Civil
                        </h1>
                        <p className="text-xl text-slate-300 font-light">
                            Sistema Integral de Gestión de Proyectos MEP
                        </p>
                        <div className="mt-6 w-16 h-0.5 bg-slate-600 mx-auto"></div>
                    </div>

                    {/* Features */}
                    <div className="space-y-6 mt-12">
                        <div className="text-left">
                            <h3 className="text-white font-medium mb-2">Gestión Integral</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Controle todos los aspectos de sus proyectos MEP desde una sola plataforma
                            </p>
                        </div>
                        <div className="text-left">
                            <h3 className="text-white font-medium mb-2">Colaboración Eficiente</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Facilite la comunicación entre equipos y subcontratistas
                            </p>
                        </div>
                        <div className="text-left">
                            <h3 className="text-white font-medium mb-2">Control de Calidad</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Mantenga los más altos estándares en cada fase del proyecto
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    {/* Mobile Logo */}
                    <div className="text-center mb-8 lg:hidden">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl mb-4">
                            <Building className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Plataforma Civil</h1>
                        <p className="text-slate-600 text-sm mt-1">Sistema de Gestión MEP</p>
                    </div>

                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Iniciar Sesión</h2>
                        <p className="text-slate-600">Ingrese sus credenciales para continuar</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors text-slate-900 placeholder-slate-400"
                                    placeholder="usuario@empresa.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors text-slate-900 placeholder-slate-400"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                                    <span>Iniciando sesión...</span>
                                </>
                            ) : (
                                <>
                                    <span>Iniciar Sesión</span>
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>

                        {/* Demo Fill Button 
                        <button
                            type="button"
                            onClick={handleDemoFill}
                            className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors text-sm"
                        >
                            Llenar datos de demostración
                        </button>*/}
                    </form>


                    {/* Footer */}
                    <div className="text-center mt-8 pt-6 border-t border-slate-200">
                        <p className="text-slate-500 text-sm">
                            ¿Problemas para acceder?{' '}
                            <button className="text-slate-700 hover:text-slate-900 font-medium">
                                Contactar soporte
                            </button>
                        </p>
                        <p className="text-slate-400 text-xs mt-4">
                            © 2025 Plataforma Civil. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;