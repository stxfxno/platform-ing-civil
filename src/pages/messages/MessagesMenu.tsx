// src/pages/messages/MessagesMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    FileText,
    Mail,
    Bell,
    MessageCircle,
    ArrowRight,
    Users,
    Clock,
    AlertTriangle
} from 'lucide-react';

interface MessageOption {
    title: string;
    description: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    stats: {
        total: number;
        unread: number;
        urgent: number;
    };
}

const messageOptions: MessageOption[] = [
    {
        title: 'Actas de Reunión',
        description: 'Plantillas y repositorio para registrar acuerdos, decisiones y tareas de reuniones MEP',
        path: '/mensajes/actas',
        icon: FileText,
        color: 'bg-blue-500',
        stats: {
            total: 24,
            unread: 3,
            urgent: 1
        }
    },
    {
        title: 'Comunicaciones Formales',
        description: 'Archivo de comunicaciones importantes: correos oficiales, notas de campo y directivas',
        path: '/mensajes/comunicaciones',
        icon: Mail,
        color: 'bg-green-500',
        stats: {
            total: 156,
            unread: 12,
            urgent: 4
        }
    },
    {
        title: 'Sistema de Notificaciones',
        description: 'Alertas automáticas para eventos críticos: RFIs, cambios en planos y tareas vencidas',
        path: '/mensajes/notificaciones',
        icon: Bell,
        color: 'bg-yellow-500',
        stats: {
            total: 89,
            unread: 15,
            urgent: 7
        }
    },
    {
        title: 'Mensajería y Conversaciones',
        description: 'Comunicación contextualizada vinculada a RFIs, documentos y tareas específicas',
        path: '/mensajes/chat',
        icon: MessageCircle,
        color: 'bg-purple-500',
        stats: {
            total: 67,
            unread: 8,
            urgent: 2
        }
    }
];

const MessagesMenu: React.FC = () => {
    const getTotalStats = () => {
        return messageOptions.reduce((acc, option) => ({
            total: acc.total + option.stats.total,
            unread: acc.unread + option.stats.unread,
            urgent: acc.urgent + option.stats.urgent
        }), { total: 0, unread: 0, urgent: 0 });
    };

    const totalStats = getTotalStats();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mensajes Pendientes</h1>
                    <p className="text-gray-600">Centro de comunicaciones y seguimiento del proyecto</p>
                </div>
            </div>

            {/* Resumen General */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total de Mensajes</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{totalStats.total}</p>
                        </div>
                        <div className="bg-blue-500 p-3 rounded-lg">
                            <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Sin Leer</p>
                            <p className="text-3xl font-bold text-yellow-600 mt-2">{totalStats.unread}</p>
                        </div>
                        <div className="bg-yellow-500 p-3 rounded-lg">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Urgentes</p>
                            <p className="text-3xl font-bold text-red-600 mt-2">{totalStats.urgent}</p>
                        </div>
                        <div className="bg-red-500 p-3 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Opciones de Mensajería */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {messageOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                        <Link
                            key={option.path}
                            to={option.path}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`${option.color} p-3 rounded-lg group-hover:scale-105 transition-transform`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex items-center space-x-1">
                                    {option.stats.urgent > 0 && (
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            {option.stats.urgent} urgente{option.stats.urgent > 1 ? 's' : ''}
                                        </span>
                                    )}
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                {option.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {option.description}
                            </p>

                            {/* Estadísticas */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-lg font-bold text-gray-900">{option.stats.total}</p>
                                    <p className="text-xs text-gray-500">Total</p>
                                </div>
                                <div className="text-center p-2 bg-yellow-50 rounded">
                                    <p className="text-lg font-bold text-yellow-600">{option.stats.unread}</p>
                                    <p className="text-xs text-yellow-600">Sin Leer</p>
                                </div>
                                <div className="text-center p-2 bg-red-50 rounded">
                                    <p className="text-lg font-bold text-red-600">{option.stats.urgent}</p>
                                    <p className="text-xs text-red-600">Urgentes</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Actividad Reciente */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="bg-blue-500 p-2 rounded-full">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Nueva acta de reunión</p>
                            <p className="text-xs text-gray-600">Coordinación MEP - Semana 21</p>
                        </div>
                        <span className="text-xs text-gray-500">Hace 2h</span>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="bg-red-500 p-2 rounded-full">
                            <AlertTriangle className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Notificación urgente</p>
                            <p className="text-xs text-gray-600">RFI-2025-001 requiere respuesta inmediata</p>
                        </div>
                        <span className="text-xs text-gray-500">Hace 1h</span>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="bg-green-500 p-2 rounded-full">
                            <Mail className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Comunicación formal</p>
                            <p className="text-xs text-gray-600">Aprobación de especificaciones HVAC</p>
                        </div>
                        <span className="text-xs text-gray-500">Hace 3h</span>
                    </div>
                </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="flex items-center space-x-3 p-4 border border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Nueva Acta</span>
                    </button>
                    
                    <button className="flex items-center space-x-3 p-4 border border-dashed border-gray-300 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all">
                        <Mail className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Enviar Comunicado</span>
                    </button>
                    
                    <Link 
                        to="/mensajes/notificaciones" 
                        className="flex items-center space-x-3 p-4 border border-dashed border-gray-300 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all"
                    >
                        <Bell className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm font-medium text-gray-700">Ver Alertas</span>
                    </Link>
                    
                    <button className="flex items-center space-x-3 p-4 border border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">Nuevo Chat</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagesMenu;