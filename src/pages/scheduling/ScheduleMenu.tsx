// src/pages/schedule/ScheduleMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Calendar, 
    Plus, 
    TrendingUp, 
    Network, 
    FileBarChart,
    Clock,
    CheckCircle,
    AlertTriangle,
    BarChart3
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
        title: 'Creación y Gestión de Actividades Semanales',
        description: 'Herramientas para desglosar el cronograma maestro en tareas semanales detalladas, especialmente para partidas MEP. Asignación de tareas a subcontratistas y equipos específicos.',
        path: '/programacion-semanal/actividades',
        icon: Plus,
        color: 'bg-green-500',
        stats: {
            count: 24,
            label: 'Actividades esta semana',
            trend: 'up'
        }
    },
    {
        title: 'Seguimiento del Avance Semanal',
        description: 'Registro del progreso real de las actividades. Comparación visual del avance real vs. planificado. Identificación de retrasos y posibles desviaciones para las actividades MEP.',
        path: '/programacion-semanal/seguimiento',
        icon: TrendingUp,
        color: 'bg-blue-500',
        stats: {
            count: 82,
            label: '% Progreso promedio',
            trend: 'up'
        }
    },
    {
        title: 'Dependencias y Coordinación',
        description: 'Visualización de dependencias entre las tareas MEP y otras disciplinas para una mejor coordinación en obra.',
        path: '/programacion-semanal/dependencias',
        icon: Network,
        color: 'bg-purple-500',
        stats: {
            count: 15,
            label: 'Dependencias activas',
            trend: 'stable'
        }
    },
    {
        title: 'Reporte de Subcontratistas',
        description: 'Facilidad para que los subcontratistas MEP reporten el avance de sus tareas asignadas directamente en el módulo.',
        path: '/programacion-semanal/reportes-subcontratistas',
        icon: FileBarChart,
        color: 'bg-orange-500',
        stats: {
            count: 8,
            label: 'Reportes pendientes',
            trend: 'down'
        }
    }
];

const projectStats = [
    {
        label: 'Actividades Completadas',
        value: 145,
        total: 195,
        icon: CheckCircle,
        color: 'text-green-600 bg-green-50',
        percentage: 74
    },
    {
        label: 'Semanas Restantes',
        value: 13,
        total: 16,
        icon: Clock,
        color: 'text-blue-600 bg-blue-50',
        percentage: 28
    },
    {
        label: 'Actividades en Retraso',
        value: 3,
        total: 5,
        icon: AlertTriangle,
        color: 'text-red-600 bg-red-50',
        percentage: 60
    },
    {
        label: 'Actividades Críticas',
        value: 12,
        total: 15,
        icon: AlertTriangle,
        color: 'text-red-600 bg-red-50',
        percentage: 80
    },
    {
        label: 'Progreso General',
        value: 74,
        total: 100,
        icon: BarChart3,
        color: 'text-purple-600 bg-purple-50',
        percentage: 74
    }
];

const ScheduleMenu: React.FC = () => {
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
                <div className="p-3 bg-green-500 rounded-lg">
                    <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Programación Semanal</h1>
                    <p className="text-gray-600">Gestión y seguimiento de actividades MEP semanales</p>
                </div>
            </div>

            {/* Project Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Estado General del Proyecto</h2>
                    <div className="text-sm text-gray-500">
                        Última actualización: 25 Mayo 2025, 14:38
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    {projectStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="relative">
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                                {stat.value}
                                                {stat.total && stat.label !== 'Progreso General' && (
                                                    <span className="text-sm text-gray-500">/{stat.total}</span>
                                                )}
                                                {stat.label === 'Progreso General' && (
                                                    <span className="text-sm text-gray-500">%</span>
                                                )}
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
                                        <p className="text-xs text-gray-500 mt-1">
                                            {stat.label === 'Días Restantes' 
                                                ? `${Math.round((stat.total - stat.value) / stat.total * 100)}% del cronograma`
                                                : `${stat.percentage}% del total`
                                            }
                                        </p>
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
                                                        <span className={`text-sm ${
                                                            option.stats.trend === 'up' ? 'text-green-600' :
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
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Gestión de Programación Semanal MEP</h3>
                <div className="text-sm text-green-800 space-y-3">
                    <p>
                        <strong>Programación Semanal</strong> permite el desglose detallado del cronograma maestro en actividades 
                        específicas para cada semana, optimizando la coordinación de disciplinas MEP en obra.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium mb-2">Funcionalidades principales:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Desglose de actividades por disciplina MEP</li>
                                <li>• Asignación directa a subcontratistas</li>
                                <li>• Seguimiento de progreso en tiempo real</li>
                                <li>• Identificación automática de retrasos</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Beneficios:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Mayor control del cronograma</li>
                                <li>• Mejor coordinación entre disciplinas</li>
                                <li>• Comunicación directa con subcontratistas</li>
                                <li>• Reportes automáticos de avance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleMenu;