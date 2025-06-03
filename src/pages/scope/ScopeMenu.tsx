// src/pages/scope/ScopeMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Target,
    Package,
    MessageSquare,
    HelpCircle,
    Users,
    CheckCircle,
    Clock,
    Archive,
} from 'lucide-react';

interface MenuOption {
    title: string;
    description: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    stats?: {
        count: number;
        label: string;
        trend?: 'up' | 'down' | 'stable';
    };
}

const menuOptions: MenuOption[] = [
    {
        title: 'Repositorio de Documentos de Alcance',
        description: 'Centralización de los documentos que definen el alcance detallado del proyecto y las especificaciones técnicas maestras.',
        path: '/alcance/repositorio',
        icon: Archive,
        color: 'bg-blue-500',
        stats: {
            count: 156,
            label: 'Documentos activos',
            trend: 'up'
        }
    },
    /*{}
        title: 'Gestión de Paquetes de Licitación MEP',
        description: 'Creación y distribución de paquetes de documentos y requisitos específicos para la licitación de subcontratos MEP.',
        path: '/alcance/licitaciones',
        icon: Package,
        color: 'bg-green-500',
        stats: {
            count: 8,
            label: 'Paquetes activos',
            trend: 'stable'
        }
    },*/
    {
        title: 'Presupuestos',
        description: 'Sección para registrar y formalizar las clarificaciones y acuerdos sobre el alcance con cada subcontratista MEP.',
        path: '/alcance/presupuestos',
        icon: MessageSquare,
        color: 'bg-yellow-500',
        stats: {
            count: 24,
            label: 'Clarificaciones pendientes',
            trend: 'down'
        }
    },
    {
        title: 'Clarificación del Alcance y Preguntas y Respuestas (Q&A)',
        description: 'Durante el proceso de licitación, un espacio para que los licitantes hagan preguntas y reciban respuestas, garantizando equidad y transparencia.',
        path: '/alcance/qa',
        icon: HelpCircle,
        color: 'bg-purple-500',
        stats: {
            count: 47,
            label: 'Preguntas respondidas',
            trend: 'up'
        }
    }
];

const scopeStats = [
    {
        label: 'Paquetes de Licitación',
        value: 8,
        total: 12,
        icon: Package,
        color: 'text-blue-600 bg-blue-50',
        percentage: 67
    },
    {
        label: 'Documentos Aprobados',
        value: 142,
        total: 156,
        icon: CheckCircle,
        color: 'text-green-600 bg-green-50',
        percentage: 91
    },
    {
        label: 'Clarificaciones Pendientes',
        value: 24,
        total: 67,
        icon: Clock,
        color: 'text-yellow-600 bg-yellow-50',
        percentage: 36
    },
    {
        label: 'Licitantes Activos',
        value: 15,
        total: 18,
        icon: Users,
        color: 'text-purple-600 bg-purple-50',
        percentage: 83
    }
];


const ScopeMenu: React.FC = () => {

    const getTrendIcon = (trend?: string) => {
        switch (trend) {
            case 'up': return '↗';
            case 'down': return '↘';
            case 'stable': return '→';
            default: return '';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500 rounded-lg">
                    <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión del Alcance</h1>
                    <p className="text-gray-600">Documentación, licitaciones y clarificaciones del proyecto MEP</p>
                </div>
            </div>

            {/* Scope Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Alcance</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {scopeStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="relative">
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                                {stat.value}
                                                {stat.total && <span className="text-sm text-gray-500">/{stat.total}</span>}
                                            </p>
                                        </div>
                                        <div className={`p-3 rounded-lg ${stat.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="mt-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${stat.percentage}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{stat.percentage}% completado</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Menu Options */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-lg font-bold text-gray-900">{option.stats.count}</span>
                                                    {option.stats.trend && (
                                                        <span className={`text-sm ${option.stats.trend === 'up' ? 'text-green-600' :
                                                                option.stats.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                                                            }`}>
                                                            {getTrendIcon(option.stats.trend)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Information Panel */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Gestión del Alcance MEP</h3>
                <div className="text-sm text-blue-800 space-y-3">
                    <p>
                        <strong>Gestión del Alcance</strong> centraliza toda la documentación técnica, procesos de licitación
                        y comunicación con subcontratistas para garantizar claridad y transparencia en el proyecto MEP.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium mb-2">Componentes principales:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Repositorio centralizado de documentos</li>
                                <li>• Gestión de paquetes de licitación</li>
                                <li>• Sistema de clarificaciones formales</li>
                                <li>• Módulo Q&A para transparencia</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Beneficios:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Documentación siempre actualizada</li>
                                <li>• Procesos de licitación eficientes</li>
                                <li>• Comunicación trazable</li>
                                <li>• Reducción de malentendidos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScopeMenu;