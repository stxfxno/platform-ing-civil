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
    Users,
    CheckCircle,
    AlertTriangle,
    Activity
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
        title: 'Seguimiento del Avance Diario/Semanal',
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

const weeklyStats = [
    {
        label: 'Actividades Completadas',
        value: 18,
        total: 24,
        icon: CheckCircle,
        color: 'text-green-600 bg-green-50',
        percentage: 75
    },
    {
        label: 'En Progreso',
        value: 4,
        total: 24,
        icon: Clock,
        color: 'text-blue-600 bg-blue-50',
        percentage: 17
    },
    {
        label: 'Retrasadas',
        value: 2,
        total: 24,
        icon: AlertTriangle,
        color: 'text-red-600 bg-red-50',
        percentage: 8
    },
    {
        label: 'Subcontratistas Activos',
        value: 12,
        total: 15,
        icon: Users,
        color: 'text-purple-600 bg-purple-50',
        percentage: 80
    }
];

const currentWeekActivities = [
    {
        id: 1,
        title: 'Instalación ductos HVAC - Área A',
        subcontractor: 'HVAC Solutions S.A.C.',
        progress: 85,
        status: 'in_progress',
        dueDate: '2025-05-24',
        priority: 'high'
    },
    {
        id: 2,
        title: 'Cableado eléctrico - Piso 3',
        subcontractor: 'Electro Instalaciones Perú',
        progress: 100,
        status: 'completed',
        dueDate: '2025-05-23',
        priority: 'medium'
    },
    {
        id: 3,
        title: 'Instalación tuberías agua fría - Zona B',
        subcontractor: 'Plomería Industrial SAC',
        progress: 45,
        status: 'delayed',
        dueDate: '2025-05-22',
        priority: 'critical'
    },
    {
        id: 4,
        title: 'Sistema contra incendios - Nivel 1',
        subcontractor: 'Fire Protection Corp.',
        progress: 60,
        status: 'in_progress',
        dueDate: '2025-05-25',
        priority: 'high'
    }
];

const ScheduleMenu: React.FC = () => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'delayed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed': return 'Completada';
            case 'in_progress': return 'En Progreso';
            case 'delayed': return 'Retrasada';
            default: return status;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'text-red-600';
            case 'high': return 'text-orange-600';
            case 'medium': return 'text-yellow-600';
            case 'low': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

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

            {/* Current Week Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Semana Actual</h2>
                    <div className="text-sm text-gray-500">
                        19 - 25 Mayo 2025
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {weeklyStats.map((stat, index) => {
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
                                        <p className="text-xs text-gray-500 mt-1">{stat.percentage}% del total</p>
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

            {/* Current Week Activities */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Actividades de Esta Semana</h2>
                    <Link
                        to="/programacion-semanal/actividades"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Ver todas →
                    </Link>
                </div>

                <div className="space-y-4">
                    {currentWeekActivities.map((activity) => (
                        <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                                            {getStatusLabel(activity.status)}
                                        </span>
                                        <span className={`text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                                            ● {activity.priority.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{activity.subcontractor}</p>
                                    
                                    {/* Progress bar */}
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-1">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-300 ${
                                                        activity.status === 'completed' ? 'bg-green-500' :
                                                        activity.status === 'delayed' ? 'bg-red-500' : 'bg-blue-500'
                                                    }`}
                                                    style={{ width: `${activity.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">{activity.progress}%</span>
                                    </div>
                                </div>
                                
                                <div className="text-right ml-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {new Date(activity.dueDate).toLocaleDateString('es-PE', {
                                            day: '2-digit',
                                            month: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Acciones Rápidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        to="/programacion-semanal/actividades"
                        className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <Plus className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Nueva Actividad</span>
                    </Link>
                    <Link
                        to="/programacion-semanal/seguimiento"
                        className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <Activity className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Actualizar Progreso</span>
                    </Link>
                    <Link
                        to="/programacion-semanal/reportes-subcontratistas"
                        className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <FileBarChart className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Generar Reporte</span>
                    </Link>
                </div>
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