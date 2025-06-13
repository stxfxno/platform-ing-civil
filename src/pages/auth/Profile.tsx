// src/pages/auth/Profile.tsx
import React from 'react';
import { User, Mail, Building, Shield, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Profile: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Cargando...</div>;
    }

    const getRoleDisplay = (role: string) => {
        switch (role) {
            case 'admin':
                return 'Contratista Principal';
            case 'contractor':
                return 'Contratista Principal';
            case 'subcontractor':
                return 'Subcontratista';
            case 'engineer':
                return 'Ingeniero';
            default:
                return 'Usuario';
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
            case 'contractor':
                return 'bg-blue-100 text-blue-800';
            case 'subcontractor':
                return 'bg-green-100 text-green-800';
            case 'engineer':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header with avatar */}
                    <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-primary-600" />
                            </div>
                            <div className="text-white">
                                <h2 className="text-2xl font-bold">{user.name}</h2>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                                        {getRoleDisplay(user.role)}
                                    </span>
                                    {user.isActive && (
                                        <div className="flex items-center space-x-1 text-green-200">
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-sm">Activo</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    Información Personal
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <User className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Nombre completo</p>
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Mail className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Correo electrónico</p>
                                            <p className="font-medium text-gray-900">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Building className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Departamento</p>
                                            <p className="font-medium text-gray-900">{user.department}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Rol</p>
                                            <p className="font-medium text-gray-900">{getRoleDisplay(user.role)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    Información de Cuenta
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Calendar className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Último acceso</p>
                                            <p className="font-medium text-gray-900">Hoy a las {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Estado de cuenta</p>
                                            <p className="font-medium text-green-600">Activa</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">ID de usuario</p>
                                            <p className="font-medium text-gray-900 font-mono text-sm">{user.id}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
