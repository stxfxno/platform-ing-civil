// src/pages/messages/MessagesMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    FileText,
    Mail,
    Bell,
    MessageCircle,
    ArrowRight,
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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Comunicaciones</h1>
                    <p className="text-gray-600">Centro de comunicaciones y seguimiento del proyecto</p>
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
        </div>
    );
};

export default MessagesMenu;