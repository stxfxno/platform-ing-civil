// src/pages/schedules/SchedulesMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Clock, 
    Upload, 
    BarChart3, 
    Route, 
    Calendar,
    TrendingUp,
    AlertTriangle,
    Target,
    Activity,
    FileText,
    Users,
    CheckCircle
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
        title: 'Carga e Integración del Cronograma Maestro',
        description: 'Importar cronogramas desde MS Project, Primavera P6 y otros sistemas de planificación. Sincronización automática y control de versiones.',
        path: '/cronogramas/maestro',
        icon: Upload,
        color: 'bg-blue-500',
        stats: {
            count: 3,
            label: 'Cronogramas activos',
            trend: 'stable'
        }
    },
    {
        title: 'Visualización General del Proyecto',
        description: 'Vista integral del cronograma con diagramas de Gantt, timeline y calendarios. Análisis de progreso por disciplinas y equipos.',
        path: '/cronogramas/general',
        icon: BarChart3,
        color: 'bg-green-500',
        stats: {
            count: 247,
            label: 'Actividades totales',
            trend: 'up'
        }
    },
    {
        title: 'Identificación y Monitoreo de la Ruta Crítica',
        description: 'Análisis de la ruta crítica del proyecto, identificación de actividades sin holgura y gestión de riesgos de cronograma.',
        path: '/cronogramas/ruta-critica',
        icon: Route,
        color: 'bg-red-500',
        stats: {
            count: 12,
            label: 'Actividades críticas',
            trend: 'down'
        }
    },
    {
        title: 'Seguimiento de Fechas Importantes',
        description: 'Monitoreo de hitos, fechas límite, inspecciones y entregas críticas. Sistema de notificaciones y recordatorios automáticos.',
        path: '/cronogramas/fechas-importantes',
        icon: Calendar,
        color: 'bg-purple-500',
        stats: {
            count: 18,
            label: 'Fechas próximas',
            trend: 'up'
        }
    }
];

const projectStats = [
    {
        label: 'Progreso General',
        value: 68,
        total: 100,
        icon: TrendingUp,
        color: 'text-blue-600 bg-blue-50',
        unit: '%'
    },
    {
        label: 'Actividades Completadas',
        value: 89,
        total: 247,
        icon: CheckCircle,
        color: 'text-green-600 bg-green-50',
        unit: 'act'
    },
    {
        label: 'Actividades Críticas',
        value: 12,
        total: 247,
        icon: AlertTriangle,
        color: 'text-red-600 bg-red-50',
        unit: 'act'
    },
    {
        label: 'Equipos Activos',
        value: 8,
        total: 12,
        icon: Users,
        color: 'text-purple-600 bg-purple-50',
        unit: 'equipos'
    }
];

const recentUpdates = [
    {
        id: 'update-001',
        title: 'Cronograma maestro actualizado',
        description: 'Nueva versión 2.1 con ajustes en ruta crítica',
        timestamp: '2025-05-23T10:30:00Z',
        type: 'update',
        impact: 'medium'
    },
    {
        id: 'update-002',
        title: 'Actividad crítica completada',
        description: 'Instalación ductos HVAC - Área A finalizada',
        timestamp: '2025-05-23T09:15:00Z',
        type: 'completion',
        impact: 'high'
    },
    {
        id: 'update-003',
        title: 'Nueva fecha límite agregada',
        description: 'Inspección eléctrica programada para 2 Jun',
        timestamp: '2025-05-22T16:45:00Z',
        type: 'milestone',
        impact: 'medium'
    },
    {
        id: 'update-004',
        title: 'Retraso identificado',
        description: 'Tuberías agua fría con 2 días de retraso',
        timestamp: '2025-05-22T14:20:00Z',
        type: 'delay',
        impact: 'high'
    }
];

const upcomingMilestones = [
    {
        id: 'mil-001',
        title: 'Entrega Submittals HVAC',
        date: '2025-05-28',
        status: 'upcoming',
        priority: 'critical',
        daysLeft: 5
    },
    {
        id: 'mil-002',
        title: 'Inspección Eléctrica Principal',
        date: '2025-06-02',
        status: 'upcoming',
        priority: 'high',
        daysLeft: 10
    },
    {
        id: 'mil-003',
        title: 'Finalización Fase MEP Sótano',
        date: '2025-06-15',
        status: 'upcoming',
        priority: 'critical',
        daysLeft: 23
    },
    {
        id: 'mil-004',
        title: 'Pruebas Hidráulicas Completas',
        date: '2025-06-25',
        status: 'at_risk',
        priority: 'critical',
        daysLeft: 33
    }
];

const SchedulesMenu: React.FC = () => {
    const getTrendIcon = (trend?: string) => {
        switch (trend) {
            case 'up': return '↗';
            case 'down': return '↘';
            case 'stable': return '→';
            default: return '';
        }
    };

    const getUpdateIcon = (type: string) => {
        switch (type) {
            case 'update': return <FileText className="w-4 h-4 text-blue-600" />;
            case 'completion': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'milestone': return <Target className="w-4 h-4 text-purple-600" />;
            case 'delay': return <AlertTriangle className="w-4 h-4 text-red-600" />;
            default: return <Activity className="w-4 h-4 text-gray-600" />;
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Hace unos minutos';
        if (diffInHours < 24) return `Hace ${diffInHours}h`;
        return date.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit' });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'text-red-600 bg-red-50 border-red-200';
            case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'low': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming': return 'text-blue-600';
            case 'at_risk': return 'text-red-600';
            case 'completed': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500 rounded-lg">
                    <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Cronogramas</h1>
                    <p className="text-gray-600">Control integral del cronograma maestro y seguimiento de la ruta crítica</p>
                </div>
            </div>

            {/* Project Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Proyecto</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {projectStats.map((stat, index) => {
                        const Icon = stat.icon;
                        const percentage = stat.total ? Math.round((stat.value / stat.total) * 100) : stat.value;
                        
                        return (
                            <div key={index} className="relative">
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                                {stat.value}
                                                {stat.total && stat.unit !== '%' && (
                                                    <span className="text-sm text-gray-500">/{stat.total}</span>
                                                )}
                                                {stat.unit === '%' && <span className="text-sm text-gray-500">%</span>}
                                            </p>
                                        </div>
                                        <div className={`p-3 rounded-lg ${stat.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    
                                    {/* Progress bar */}
                                    {stat.total && stat.unit !== '%' && (
                                        <div className="mt-3">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{percentage}% completado</p>
                                        </div>
                                    )}
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

            {/* Two Column Layout for Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Updates */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Actualizaciones Recientes</h2>
                        <Link
                            to="/cronogramas/general"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Ver todas →
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentUpdates.map((update) => (
                            <div key={update.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex-shrink-0 mt-1">
                                    {getUpdateIcon(update.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-900">{update.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-gray-500">{formatTime(update.timestamp)}</span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                                            update.impact === 'high' ? 'bg-red-100 text-red-600' :
                                            update.impact === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                            'bg-green-100 text-green-600'
                                        }`}>
                                            {update.impact === 'high' ? 'Alto Impacto' :
                                             update.impact === 'medium' ? 'Medio Impacto' : 'Bajo Impacto'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Milestones */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Próximos Hitos</h2>
                        <Link
                            to="/cronogramas/fechas-importantes"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Ver todos →
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {upcomingMilestones.map((milestone) => (
                            <div key={milestone.id} className={`p-4 rounded-lg border ${getPriorityColor(milestone.priority)}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                                    <span className={`text-sm font-medium ${getStatusColor(milestone.status)}`}>
                                        {milestone.daysLeft} días
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        {new Date(milestone.date).toLocaleDateString('es-PE', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        milestone.priority === 'critical' ? 'bg-red-100 text-red-600' :
                                        milestone.priority === 'high' ? 'bg-orange-100 text-orange-600' :
                                        'bg-yellow-100 text-yellow-600'
                                    }`}>
                                        {milestone.priority === 'critical' ? 'CRÍTICO' :
                                         milestone.priority === 'high' ? 'ALTO' : 'MEDIO'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Acciones Rápidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Link
                        to="/cronogramas/maestro"
                        className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <Upload className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Cargar Cronograma</span>
                    </Link>
                    <Link
                        to="/cronogramas/ruta-critica"
                        className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <Route className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Ruta Crítica</span>
                    </Link>
                    <Link
                        to="/cronogramas/general"
                        className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <BarChart3 className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Vista General</span>
                    </Link>
                    <Link
                        to="/cronogramas/fechas-importantes"
                        className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Fechas Importantes</span>
                    </Link>
                </div>
            </div>

            {/* Information Panel */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Gestión de Cronogramas MEP</h3>
                <div className="text-sm text-blue-800 space-y-3">
                    <p>
                        <strong>Gestión de Cronogramas</strong> centraliza el control del cronograma maestro del proyecto, 
                        permitiendo la integración con herramientas como MS Project y Primavera P6, análisis de ruta crítica 
                        y seguimiento de fechas importantes.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium mb-2">Características principales:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Importación desde múltiples formatos</li>
                                <li>• Análisis automático de ruta crítica</li>
                                <li>• Visualizaciones interactivas</li>
                                <li>• Sistema de notificaciones</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Beneficios:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Control centralizado del cronograma</li>
                                <li>• Identificación temprana de riesgos</li>
                                <li>• Mejor coordinación de equipos</li>
                                <li>• Seguimiento automatizado</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulesMenu;