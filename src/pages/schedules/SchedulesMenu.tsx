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
    AlertCircle,
    CheckCircle,
    Target,
    Activity,
    Flag,
    Zap,
    Users,
    FileText,
    Download,
    RefreshCw,
    Eye,
    Settings
} from 'lucide-react';

interface MenuOption {
    title: string;
    description: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    stats?: {
        count: number | string;
        label: string;
        trend?: 'up' | 'down' | 'stable';
    };
}

const menuOptions: MenuOption[] = [
    {
        title: 'Carga e Integración del Cronograma Maestro',
        description: 'Herramientas para cargar, actualizar e integrar el cronograma maestro del proyecto con todas las actividades MEP planificadas.',
        path: '/cronogramas/maestro',
        icon: Upload,
        color: 'bg-blue-500',
        stats: {
            count: '2.1',
            label: 'Versión actual',
            trend: 'up'
        }
    },
    {
        title: 'Visualización General del Proyecto',
        description: 'Vista panorámica del estado del proyecto con indicadores de progreso, hitos cumplidos y desviaciones del cronograma planificado.',
        path: '/cronogramas/general',
        icon: BarChart3,
        color: 'bg-green-500',
        stats: {
            count: '74%',
            label: 'Progreso general',
            trend: 'up'
        }
    },
    {
        title: 'Identificación y Monitoreo de la Ruta Crítica',
        description: 'Análisis automático de la ruta crítica del proyecto con alertas tempranas sobre posibles retrasos en actividades críticas.',
        path: '/cronogramas/ruta-critica',
        icon: Route,
        color: 'bg-red-500',
        stats: {
            count: 12,
            label: 'Actividades críticas',
            trend: 'stable'
        }
    },
    {
        title: 'Seguimiento de Fechas Importantes',
        description: 'Monitoreo de hitos clave, entregas importantes y fechas contractuales con sistema de alertas y notificaciones automáticas.',
        path: '/cronogramas/fechas-importantes',
        icon: Flag,
        color: 'bg-purple-500',
        stats: {
            count: 8,
            label: 'Hitos próximos',
            trend: 'stable'
        }
    }
];

const projectStats = [
    {
        label: 'Progreso General',
        value: 74,
        target: 78,
        icon: TrendingUp,
        color: 'text-green-600 bg-green-50',
        unit: '%'
    },
    {
        label: 'Actividades Completadas',
        value: 145,
        target: 186,
        icon: CheckCircle,
        color: 'text-blue-600 bg-blue-50',
        unit: ''
    },
    {
        label: 'Días Restantes',
        value: 42,
        target: 38,
        icon: Clock,
        color: 'text-yellow-600 bg-yellow-50',
        unit: ''
    },
    {
        label: 'Actividades Críticas',
        value: 12,
        target: 15,
        icon: AlertCircle,
        color: 'text-red-600 bg-red-50',
        unit: ''
    }
];

const upcomingMilestones = [
    {
        id: 'M001',
        title: 'Finalización Instalaciones HVAC Torre A',
        date: '2025-06-15',
        discipline: 'HVAC',
        status: 'on_track',
        progress: 85,
        daysRemaining: 23,
        contractor: 'HVAC Solutions S.A.C.',
        importance: 'critical'
    },
    {
        id: 'M002',
        title: 'Pruebas Sistema Eléctrico Principal',
        date: '2025-06-08',
        discipline: 'Eléctrico',
        status: 'at_risk',
        progress: 60,
        daysRemaining: 16,
        contractor: 'Electro Instalaciones Perú',
        importance: 'high'
    },
    {
        id: 'M003',
        title: 'Entrega Final Sistema Contra Incendios',
        date: '2025-06-30',
        discipline: 'Protección Contra Incendios',
        status: 'on_track',
        progress: 70,
        daysRemaining: 38,
        contractor: 'Fire Protection Corp.',
        importance: 'high'
    },
    {
        id: 'M004',
        title: 'Certificación MEP Completa',
        date: '2025-07-15',
        discipline: 'General',
        status: 'planned',
        progress: 45,
        daysRemaining: 53,
        contractor: 'Coordinación General',
        importance: 'critical'
    }
];

const criticalActivities = [
    {
        id: 'CA001',
        name: 'Instalación Chiller Principal',
        startDate: '2025-05-25',
        endDate: '2025-06-05',
        discipline: 'Mecánico',
        slack: 0,
        progress: 30,
        responsible: 'HVAC Solutions S.A.C.',
        riskLevel: 'critical',
        impact: 'Retraso directo en fecha de entrega'
    },
    {
        id: 'CA002',
        name: 'Conexión Subestación Eléctrica',
        startDate: '2025-05-28',
        endDate: '2025-06-10',
        discipline: 'Eléctrico',
        slack: 1,
        progress: 15,
        responsible: 'Electro Instalaciones Perú',
        riskLevel: 'high',
        impact: 'Afecta energización general'
    },
    {
        id: 'CA003',
        name: 'Pruebas Hidráulicas Sistema Principal',
        startDate: '2025-06-01',
        endDate: '2025-06-12',
        discipline: 'Plomería',
        slack: 0,
        progress: 0,
        responsible: 'Plomería Industrial SAC',
        riskLevel: 'critical',
        impact: 'Certificación del sistema'
    },
    {
        id: 'CA004',
        name: 'Instalación Central de Detección Incendios',
        startDate: '2025-06-05',
        endDate: '2025-06-18',
        discipline: 'Protección Contra Incendios',
        slack: 2,
        progress: 0,
        responsible: 'Fire Protection Corp.',
        riskLevel: 'medium',
        impact: 'Certificado de bomberos'
    }
];

const scheduleMetrics = [
    {
        label: 'Eficiencia del Cronograma',
        value: 89,
        benchmark: 85,
        unit: '%',
        trend: 'up',
        description: 'Actividades completadas a tiempo'
    },
    {
        label: 'Desviación de Fechas',
        value: 5.2,
        benchmark: 7.0,
        unit: 'días',
        trend: 'down',
        description: 'Promedio de retraso por actividad'
    },
    {
        label: 'Float Promedio',
        value: 3.8,
        benchmark: 5.0,
        unit: 'días',
        trend: 'down',
        description: 'Holgura disponible en actividades'
    },
    {
        label: 'Actividades en Ruta Crítica',
        value: 15,
        benchmark: 12,
        unit: '%',
        trend: 'up',
        description: 'Porcentaje del total de actividades'
    }
];

const SchedulesMenu: React.FC = () => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'on_track': return 'bg-green-100 text-green-800';
            case 'at_risk': return 'bg-yellow-100 text-yellow-800';
            case 'delayed': return 'bg-red-100 text-red-800';
            case 'planned': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'on_track': return 'En Tiempo';
            case 'at_risk': return 'En Riesgo';
            case 'delayed': return 'Retrasado';
            case 'planned': return 'Planificado';
            default: return status;
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

    const getSlackColor = (slack: number) => {
        if (slack === 0) return 'text-red-600';
        if (slack <= 2) return 'text-yellow-600';
        return 'text-green-600';
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'critical': return 'bg-red-100 text-red-800 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getImportanceIcon = (importance: string) => {
        switch (importance) {
            case 'critical': return <Flag className="w-4 h-4 text-red-600" />;
            case 'high': return <Flag className="w-4 h-4 text-orange-600" />;
            case 'medium': return <Flag className="w-4 h-4 text-yellow-600" />;
            default: return <Flag className="w-4 h-4 text-gray-600" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-500 rounded-lg">
                        <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Cronogramas</h1>
                        <p className="text-gray-600">Gestión y monitoreo del cronograma maestro del proyecto</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Actualizar
                    </button>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                    </button>
                </div>
            </div>

            {/* Project Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Estado General del Proyecto</h2>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        Última actualización: 23 Mayo 2025, 14:30
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {projectStats.map((stat, index) => {
                        const Icon = stat.icon;
                        const isOnTarget = stat.value >= stat.target;
                        const percentage = Math.min((stat.value / stat.target) * 100, 100);
                        
                        return (
                            <div key={index} className="relative">
                                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                            <div className="flex items-baseline mt-1">
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {stat.value}{stat.unit}
                                                </p>
                                                <span className="text-sm text-gray-500 ml-2">
                                                    / {stat.target}{stat.unit}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`p-3 rounded-lg ${stat.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    {/* Progress indicator */}
                                    <div className="mt-3">
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                            <span>Meta: {stat.target}{stat.unit}</span>
                                            <span className={isOnTarget ? 'text-green-600' : 'text-yellow-600'}>
                                                {isOnTarget ? '✓ En meta' : '△ Bajo meta'}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    isOnTarget ? 'bg-green-500' : 'bg-yellow-500'
                                                }`}
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Schedule Metrics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Métricas del Cronograma</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {scheduleMetrics.map((metric, index) => {
                        const isGood = metric.trend === 'up' ? metric.value >= metric.benchmark : metric.value <= metric.benchmark;
                        return (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                                    <span className={`text-sm ${
                                        metric.trend === 'up' ? 'text-green-600' :
                                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                                    }`}>
                                        {getTrendIcon(metric.trend)}
                                    </span>
                                </div>
                                <div className="flex items-baseline">
                                    <span className={`text-xl font-bold ${isGood ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {metric.value}{metric.unit}
                                    </span>
                                    <span className="text-sm text-gray-500 ml-2">
                                        vs {metric.benchmark}{metric.unit}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
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

            {/* Two Column Layout for Milestones and Critical Path */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Milestones */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Próximos Hitos</h2>
                        <Link
                            to="/cronogramas/fechas-importantes"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                        >
                            Ver todos <Eye className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {upcomingMilestones.map((milestone) => (
                            <div key={milestone.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="text-sm font-medium text-gray-500">{milestone.id}</span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(milestone.status)}`}>
                                                {getStatusLabel(milestone.status)}
                                            </span>
                                            {getImportanceIcon(milestone.importance)}
                                        </div>
                                        <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                            <span>{milestone.discipline}</span>
                                            <span>•</span>
                                            <span>{milestone.contractor}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Progress bar */}
                                <div className="mb-3">
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-gray-600">Progreso</span>
                                        <span className="font-medium">{milestone.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                milestone.status === 'on_track' ? 'bg-green-500' :
                                                milestone.status === 'at_risk' ? 'bg-yellow-500' : 
                                                milestone.status === 'delayed' ? 'bg-red-500' : 'bg-blue-500'
                                            }`}
                                            style={{ width: `${milestone.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {new Date(milestone.date).toLocaleDateString('es-PE', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    <span className={`font-medium ${
                                        milestone.daysRemaining <= 7 ? 'text-red-600' :
                                        milestone.daysRemaining <= 21 ? 'text-yellow-600' : 'text-green-600'
                                    }`}>
                                        {milestone.daysRemaining} días restantes
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Critical Path Activities */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Actividades Críticas</h2>
                        <Link
                            to="/cronogramas/ruta-critica"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                        >
                            Ver ruta completa <Route className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {criticalActivities.map((activity) => (
                            <div key={activity.id} className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${getRiskColor(activity.riskLevel)}`}>
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="text-sm font-medium text-gray-500">{activity.id}</span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                activity.slack === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                Slack: {activity.slack} días
                                            </span>
                                            <span className={`text-xs font-medium uppercase ${getSlackColor(activity.slack)}`}>
                                                {activity.riskLevel}
                                            </span>
                                        </div>
                                        <h4 className="font-medium text-gray-900">{activity.name}</h4>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                            <span>{activity.discipline}</span>
                                            <span>•</span>
                                            <span>{activity.responsible}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{activity.impact}</p>
                                    </div>
                                    <div className={`p-2 rounded-lg ${activity.slack === 0 ? 'bg-red-50' : 'bg-yellow-50'}`}>
                                        <Zap className={`w-4 h-4 ${getSlackColor(activity.slack)}`} />
                                    </div>
                                </div>
                                
                                {/* Progress bar */}
                                <div className="mb-3">
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-gray-600">Progreso</span>
                                        <span className="font-medium">{activity.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                activity.slack === 0 ? 'bg-red-500' : 'bg-yellow-500'
                                            }`}
                                            style={{ width: `${activity.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {new Date(activity.startDate).toLocaleDateString('es-PE', {
                                            day: '2-digit',
                                            month: '2-digit'
                                        })} - {new Date(activity.endDate).toLocaleDateString('es-PE', {
                                            day: '2-digit',
                                            month: '2-digit'
                                        })}
                                    </span>
                                    <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                                        Ver detalles
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Critical Path Alert */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-red-900 mb-2">Alerta de Ruta Crítica</h3>
                        <p className="text-red-800 mb-3">
                            Se han identificado <strong>2 actividades críticas</strong> con slack cero que requieren atención inmediata. 
                            Cualquier retraso en estas actividades impactará directamente la fecha de entrega del proyecto.
                        </p>
                        <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-3">
                            <h4 className="font-medium text-red-900 mb-2">Actividades de Mayor Riesgo:</h4>
                            <ul className="text-sm text-red-800 space-y-1">
                                <li>• <strong>Instalación Chiller Principal</strong> - 0 días de holgura, 30% progreso</li>
                                <li>• <strong>Pruebas Hidráulicas Sistema Principal</strong> - 0 días de holgura, sin iniciar</li>
                            </ul>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/cronogramas/ruta-critica"
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Ver Análisis Completo
                            </Link>
                            <Link
                                to="/programacion-semanal/seguimiento"
                                className="px-4 py-2 bg-white text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                Actualizar Progreso
                            </Link>
                            <button className="px-4 py-2 bg-white text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors flex items-center">
                                <Settings className="w-4 h-4 mr-2" />
                                Configurar Alertas
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Rendimiento</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Schedule Performance Index */}
                    <div className="text-center">
                        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-3">
                            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="#e5e7eb"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="#10b981"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${0.91 * 251.2} 251.2`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-gray-900">0.91</span>
                            </div>
                        </div>
                        <h3 className="font-medium text-gray-900">SPI (Schedule Performance Index)</h3>
                        <p className="text-sm text-gray-600 mt-1">Por encima de 0.8 es aceptable</p>
                        <p className="text-xs text-green-600 mt-1">✓ Rendimiento bueno</p>
                    </div>

                    {/* Cost Performance Index */}
                    <div className="text-center">
                        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-3">
                            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="#e5e7eb"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="#f59e0b"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${0.87 * 251.2} 251.2`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-gray-900">0.87</span>
                            </div>
                        </div>
                        <h3 className="font-medium text-gray-900">CPI (Cost Performance Index)</h3>
                        <p className="text-sm text-gray-600 mt-1">Relación costo vs avance</p>
                        <p className="text-xs text-yellow-600 mt-1">△ Monitorear de cerca</p>
                    </div>

                    {/* Overall Health */}
                    <div className="text-center">
                        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-3">
                            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="#e5e7eb"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="#3b82f6"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${0.83 * 251.2} 251.2`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-gray-900">83%</span>
                            </div>
                        </div>
                        <h3 className="font-medium text-gray-900">Salud General del Proyecto</h3>
                        <p className="text-sm text-gray-600 mt-1">Índice compuesto de rendimiento</p>
                        <p className="text-xs text-blue-600 mt-1">◉ Proyecto saludable</p>
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
                        <span className="text-sm font-medium text-blue-900">Actualizar Cronograma</span>
                    </Link>
                    <Link
                        to="/cronogramas/general"
                        className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <BarChart3 className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Generar Reporte</span>
                    </Link>
                    <Link
                        to="/cronogramas/ruta-critica"
                        className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <Route className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Analizar Críticas</span>
                    </Link>
                    <Link
                        to="/cronogramas/fechas-importantes"
                        className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <Flag className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Revisar Hitos</span>
                    </Link>
                </div>
            </div>

            {/* Team Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento por Equipo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { team: 'HVAC Solutions S.A.C.', discipline: 'HVAC', performance: 92, activities: 8, onTime: 87 },
                        { team: 'Electro Instalaciones Perú', discipline: 'Eléctrico', performance: 88, activities: 6, onTime: 95 },
                        { team: 'Plomería Industrial SAC', discipline: 'Plomería', performance: 76, activities: 5, onTime: 70 },
                        { team: 'Fire Protection Corp.', discipline: 'Protección Contra Incendios', performance: 94, activities: 3, onTime: 90 },
                        { team: 'MEP Contractors Inc.', discipline: 'Mecánico', performance: 85, activities: 4, onTime: 88 },
                        { team: 'Coordinación General', discipline: 'Gestión', performance: 91, activities: 12, onTime: 85 }
                    ].map((team, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className={`p-2 rounded-lg ${
                                    team.performance >= 90 ? 'bg-green-100' :
                                    team.performance >= 80 ? 'bg-blue-100' :
                                    team.performance >= 70 ? 'bg-yellow-100' : 'bg-red-100'
                                }`}>
                                    <Users className={`w-4 h-4 ${
                                        team.performance >= 90 ? 'text-green-600' :
                                        team.performance >= 80 ? 'text-blue-600' :
                                        team.performance >= 70 ? 'text-yellow-600' : 'text-red-600'
                                    }`} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 text-sm">{team.team}</h4>
                                    <p className="text-xs text-gray-500">{team.discipline}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Rendimiento</span>
                                    <span className={`font-medium ${
                                        team.performance >= 90 ? 'text-green-600' :
                                        team.performance >= 80 ? 'text-blue-600' :
                                        team.performance >= 70 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>{team.performance}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            team.performance >= 90 ? 'bg-green-500' :
                                            team.performance >= 80 ? 'bg-blue-500' :
                                            team.performance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: `${team.performance}%` }}
                                    ></div>
                                </div>
                                
                                <div className="flex justify-between text-xs text-gray-500 pt-1">
                                    <span>{team.activities} actividades</span>
                                    <span>{team.onTime}% a tiempo</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Information Panel */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Gestión de Cronogramas MEP</h3>
                <div className="text-sm text-blue-800 space-y-3">
                    <p>
                        <strong>Gestión de Cronogramas</strong> proporciona herramientas avanzadas para el control y monitoreo 
                        del cronograma maestro, con análisis automático de ruta crítica y seguimiento de hitos clave.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium mb-2">Funcionalidades avanzadas:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Análisis automático de ruta crítica</li>
                                <li>• Integración con cronograma maestro</li>
                                <li>• Alertas tempranas de retrasos</li>
                                <li>• Seguimiento de hitos contractuales</li>
                                <li>• Métricas de rendimiento (SPI/CPI)</li>
                                <li>• Análisis de tendencias y proyecciones</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Beneficios del control:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Cumplimiento de fechas contractuales</li>
                                <li>• Optimización de recursos</li>
                                <li>• Reducción de tiempos muertos</li>
                                <li>• Mejor coordinación interdisciplinaria</li>
                                <li>• Detección temprana de problemas</li>
                                <li>• Toma de decisiones basada en datos</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-1">Recomendación:</h4>
                        <p className="text-sm">
                            Revisar semanalmente las actividades críticas y actualizar el progreso para mantener 
                            la precisión del análisis de ruta crítica.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulesMenu;