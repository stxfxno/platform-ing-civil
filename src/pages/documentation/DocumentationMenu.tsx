// src/pages/documentation/DocumentationMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    FileText,
    Settings,
    Upload,
    Folder,
    ArrowRight,
} from 'lucide-react';

interface DocumentationOption {
    title: string;
    description: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    stats: {
        total: number;
        pending: number;
        approved: number;
    };
}

const documentationOptions: DocumentationOption[] = [
    {
        title: 'Control de Planos',
        description: 'Gestión y control de versiones de planos técnicos MEP',
        path: '/documentacion/planos',
        icon: FileText,
        color: 'bg-blue-500',
        stats: {
            total: 156,
            pending: 12,
            approved: 144
        }
    },
    {
        title: 'Especificaciones Técnicas',
        description: 'Gestión de especificaciones y estándares técnicos',
        path: '/documentacion/especificaciones',
        icon: Settings,
        color: 'bg-green-500',
        stats: {
            total: 48,
            pending: 3,
            approved: 45
        }
    },
    {
        title: 'Submittals (Entregables MEP)',
        description: 'Gestión de submittals y documentos de entrega',
        path: '/documentacion/entregables',
        icon: Upload,
        color: 'bg-purple-500',
        stats: {
            total: 89,
            pending: 15,
            approved: 74
        }
    },
    {
        title: 'Descargas',
        description: 'Descargas de todos los documentos del proyecto',
        path: '/documentacion/generales',
        icon: Folder,
        color: 'bg-orange-500',
        stats: {
            total: 234,
            pending: 8,
            approved: 226
        }
    }
];

const DocumentationMenu: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Documentación</h1>
                    <p className="text-gray-600">Gestión integral de documentos del proyecto MEP</p>
                </div>
            </div>
            
            {/* Opciones de Documentación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentationOptions.map((option) => {
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
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
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
                                    <p className="text-lg font-bold text-yellow-600">{option.stats.pending}</p>
                                    <p className="text-xs text-yellow-600">Pendientes</p>
                                </div>
                                <div className="text-center p-2 bg-green-50 rounded">
                                    <p className="text-lg font-bold text-green-600">{option.stats.approved}</p>
                                    <p className="text-xs text-green-600">Aprobados</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default DocumentationMenu;