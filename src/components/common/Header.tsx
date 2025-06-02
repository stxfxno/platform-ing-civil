// src/components/common/Header.tsx
import React, { useState } from 'react';
import { Bell, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { Notification } from '../../types/common';


// Mock notifications
const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'Nueva RFI recibida',
        message: 'RFI-2025-001 sobre instalaciones eléctricas',
        type: 'info',
        isRead: false,
        createdAt: '2025-05-23T09:30:00Z',
        userId: '1',
        actionUrl: '/rfis/bandeja'
    },
    {
        id: '2',
        title: 'Actividad vencida',
        message: 'Instalación de ductos MEP - Piso 3',
        type: 'warning',
        isRead: false,
        createdAt: '2025-05-23T08:15:00Z',
        userId: '1',
        actionUrl: '/programacion-semanal/seguimiento'
    },
    {
        id: '3',
        title: 'Documento aprobado',
        message: 'Especificaciones técnicas HVAC v2.1',
        type: 'success',
        isRead: true,
        createdAt: '2025-05-22T16:45:00Z',
        userId: '1',
        actionUrl: '/documentacion/especificaciones'
    }
];

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const unreadCount = mockNotifications.filter(n => !n.isRead).length;

    const getNotificationIcon = (type: string) => {
        const colors = {
            info: 'text-blue-500',
            success: 'text-green-500',
            warning: 'text-yellow-500',
            error: 'text-red-500'
        };
        return colors[type as keyof typeof colors] || 'text-gray-500';
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Hace unos minutos';
        if (diffInHours < 24) return `Hace ${diffInHours}h`;
        return date.toLocaleDateString();
    };

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Search bar */}
                <div className="flex-1 max-w-md">

                </div>

                {/* Right side - Notifications and User menu */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {mockNotifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''
                                                }`}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div className={`w-2 h-2 rounded-full mt-2 ${getNotificationIcon(notification.type)}`} />
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-gray-900">
                                                        {notification.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        {formatTime(notification.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center border-t border-gray-200">
                                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                        Ver todas las notificaciones
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-3 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.department}</p>
                            </div>
                        </button>

                        {/* User dropdown */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="py-1">
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <User className="w-4 h-4 mr-3" />
                                        Mi Perfil
                                    </button>
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <Settings className="w-4 h-4 mr-3" />
                                        Configuración
                                    </button>
                                    <hr className="my-1" />
                                    <button
                                        onClick={logout}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut className="w-4 h-4 mr-3" />
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;