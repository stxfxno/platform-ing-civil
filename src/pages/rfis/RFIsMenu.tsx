// src/pages/rfis/RFIsMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Plus, Inbox, History, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface MenuOption {
    title: string;
    description: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    stats?: {
        count: number;
        label: string;
    };
}

const menuOptions: MenuOption[] = [
    {
        title: 'Crear RFI',
        description: 'Formulario estandarizado para crear nuevas RFIs con campos para pregunta, disciplina, prioridad, fecha límite y responsable.',
        path: '/rfis/crear',
        icon: Plus,
        color: 'bg-green-500',
        stats: {
            count: 0,
            label: 'Nueva solicitud'
        }
    },
    {
        title: 'Bandeja de RFIs',
        description: 'Listado claro de todas las RFIs (enviadas por el usuario, recibidas por el usuario, pendientes de respuesta).',
        path: '/rfis/bandeja',
        icon: Inbox,
        color: 'bg-blue-500',
        stats: {
            count: 12,
            label: 'RFIs pendientes'
        }
    },
    {
        title: 'Historial de RFIs',
        description: 'Registro inalterable de cada RFI, sus respuestas, comentarios y cambios de estado. Trazabilidad completa para auditorías.',
        path: '/rfis/historial',
        icon: History,
        color: 'bg-purple-500',
        stats: {
            count: 245,
            label: 'RFIs totales'
        }
    }
];

const quickStats = [
    {
        label: 'RFIs Abiertas',
        value: 8,
        icon: AlertCircle,
        color: 'text-red-600 bg-red-50'
    },
    {
        label: 'En Revisión',
        value: 4,
        icon: Clock,
        color: 'text-yellow-600 bg-yellow-50'
    },
    {
        label: 'Respondidas',
        value: 15,
        icon: CheckCircle,
        color: 'text-green-600 bg-green-50'
    }
];

const RFIsMenu: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500 rounded-lg">
                    <FileQuestion className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">RFIs (Solicitudes de Información)</h1>
                    <p className="text-gray-600">Gestión completa de solicitudes de información del proyecto</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Menu Options */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {menuOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                        <Link
                            key={index}
                            to={option.path}
                            className="group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
                        >
                            <div className="flex items-start space-x-4">
                                <div className={`${option.color} p-3 rounded-lg group-hover:scale-105 transition-transform`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {option.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                        {option.description}
                                    </p>
                                    {option.stats && (
                                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">{option.stats.label}</span>
                                                <span className="text-lg font-bold text-gray-900">{option.stats.count}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Recent RFIs Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">RFIs Recientes</h2>
                    <Link
                        to="/rfis/bandeja"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Ver todas →
                    </Link>
                </div>

                <div className="space-y-3">
                    {[
                        {
                            id: 'RFI-2025-001',
                            title: 'Instalaciones eléctricas - Piso 3',
                            status: 'Pendiente',
                            priority: 'Alta',
                            date: '23 Mayo 2025',
                            statusColor: 'text-yellow-600 bg-yellow-50'
                        },
                        {
                            id: 'RFI-2025-002',
                            title: 'Especificaciones HVAC - Zona A',
                            status: 'En Revisión',
                            priority: 'Media',
                            date: '22 Mayo 2025',
                            statusColor: 'text-blue-600 bg-blue-50'
                        },
                        {
                            id: 'RFI-2025-003',
                            title: 'Ductos de ventilación - Sótano',
                            status: 'Respondida',
                            priority: 'Baja',
                            date: '21 Mayo 2025',
                            statusColor: 'text-green-600 bg-green-50'
                        }
                    ].map((rfi, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-medium text-gray-900">{rfi.id}</span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${rfi.statusColor}`}>
                                        {rfi.status}
                                    </span>
                                </div>
                                <h4 className="text-sm font-medium text-gray-900 mt-1">{rfi.title}</h4>
                                <p className="text-xs text-gray-500">Prioridad: {rfi.priority} • {rfi.date}</p>
                            </div>
                            <Link
                                to={`/rfis/bandeja`}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Ver
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Information Panel */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">¿Qué es una RFI?</h3>
                <div className="text-sm text-blue-800 space-y-2">
                    <p>
                        <strong>RFI (Request for Information)</strong> es una solicitud formal de información o clarificación
                        sobre aspectos técnicos, especificaciones, o detalles del proyecto que requieren respuesta oficial.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium mb-2">Características principales:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Comunicación formal y documentada</li>
                                <li>• Trazabilidad completa del proceso</li>
                                <li>• Asignación de responsables y fechas límite</li>
                                <li>• Categorización por disciplina y prioridad</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Flujo típico:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Creación de solicitud</li>
                                <li>• Asignación a responsable</li>
                                <li>• Revisión y respuesta</li>
                                <li>• Cierre y archivo</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RFIsMenu;