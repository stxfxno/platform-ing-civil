// src/pages/dashboard/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    FileQuestion,
    Calendar,
    Target,
    Clock,
    FileText,
    MessageCircle,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    Users
} from 'lucide-react';

interface DashboardCard {
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface QuickAction {
    title: string;
    description: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

const dashboardCards: DashboardCard[] = [
    {
        title: 'RFIs Pendientes',
        value: 12,
        change: '+3 esta semana',
        changeType: 'negative',
        icon: FileQuestion,
        color: 'bg-blue-500'
    },
    {
        title: 'Actividades en Progreso',
        value: 28,
        change: '85% completadas',
        changeType: 'positive',
        icon: Calendar,
        color: 'bg-green-500'
    },
    {
        title: 'Documentos Pendientes',
        value: 7,
        change: '-2 desde ayer',
        changeType: 'positive',
        icon: FileText,
        color: 'bg-yellow-500'
    },
    {
        title: 'Mensajes Sin Leer',
        value: 5,
        change: 'Último hace 2h',
        changeType: 'neutral',
        icon: MessageCircle,
        color: 'bg-purple-500'
    }
];

const quickActions: QuickAction[] = [
    {
        title: 'Crear RFI',
        description: 'Nueva solicitud de información',
        path: '/rfis/crear',
        icon: FileQuestion,
        color: 'bg-blue-500'
    },
    {
        title: 'Programación Semanal',
        description: 'Gestionar actividades de la semana',
        path: '/programacion-semanal',
        icon: Calendar,
        color: 'bg-green-500'
    },
    {
        title: 'Revisar Documentos',
        description: 'Documentos pendientes de aprobación',
        path: '/documentacion',
        icon: FileText,
        color: 'bg-yellow-500'
    },
    {
        title: 'Cronograma Maestro',
        description: 'Ver estado general del proyecto',
        path: '/cronogramas/maestro',
        icon: Clock,
        color: 'bg-indigo-500'
    }
];

const recentActivities = [
    {
        id: 1,
        type: 'rfi',
        title: 'RFI-2025-001 respondida',
        description: 'Instalaciones eléctricas - Piso 3',
        time: 'Hace 2 horas',
        status: 'completed'
    },
    {
        id: 2,
        type: 'task',
        title: 'Actividad completada',
        description: 'Instalación ductos HVAC - Área A',
        time: 'Hace 4 horas',
        status: 'completed'
    },
    {
        id: 3,
        type: 'document',
        title: 'Documento actualizado',
        description: 'Especificaciones técnicas MEP v2.1',
        time: 'Ayer',
        status: 'updated'
    },
    {
        id: 4,
        type: 'alert',
        title: 'Fecha límite próxima',
        description: 'Entrega de submittals - 25 Mayo',
        time: '2 días',
        status: 'warning'
    }
];

const Dashboard: React.FC = () => {
    const getChangeColor = (type?: string) => {
        switch (type) {
            case 'positive': return 'text-green-600';
            case 'negative': return 'text-red-600';
            default: return 'text-gray-500';
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'rfi': return <FileQuestion className="w-4 h-4" />;
            case 'task': return <CheckCircle className="w-4 h-4" />;
            case 'document': return <FileText className="w-4 h-4" />;
            case 'alert': return <AlertTriangle className="w-4 h-4" />;
            default: return <CheckCircle className="w-4 h-4" />;
        }
    };

    const getActivityColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-50';
            case 'warning': return 'text-yellow-600 bg-yellow-50';
            case 'updated': return 'text-blue-600 bg-blue-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Resumen del estado del proyecto</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Último actualizado</p>
                    <p className="text-sm font-medium text-gray-900">
                        {new Date().toLocaleDateString('es-PE', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                                    {card.change && (
                                        <p className={`text-sm mt-1 ${getChangeColor(card.changeType)}`}>
                                            {card.change}
                                        </p>
                                    )}
                                </div>
                                <div className={`${card.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={index}
                                to={action.path}
                                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`${action.color} p-2 rounded-lg`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>


            {/* Recent Activities and Project Progress *
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities 
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3">
                                <div className={`p-2 rounded-full ${getActivityColor(activity.status)}`}>
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                                    <p className="text-sm text-gray-600">{activity.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <Link
                            to="/mensajes/notificaciones"
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                            Ver toda la actividad →
                        </Link>
                    </div>
                </div>

                {/* Project Progress 
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Progreso del Proyecto</h2>

                    {/* Overall Progress 
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Progreso General</span>
                            <span className="text-sm font-medium text-gray-900">68%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: '68%' }}
                            ></div>
                        </div>
                    </div>

                    {/* Phase Progress 
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">Fase MEP</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">85%</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">Documentación</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">72%</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">Instalaciones</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">45%</span>
                        </div>
                    </div>

                    {/* Key Metrics 
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-primary-600">24</p>
                                <p className="text-xs text-gray-500">Días restantes</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">92%</p>
                                <p className="text-xs text-gray-500">Calidad</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            */}

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Próximas Fechas Límite</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-medium text-red-800">Urgente</span>
                        </div>
                        <h4 className="font-medium text-gray-900">Entrega Submittals HVAC</h4>
                        <p className="text-sm text-gray-600">Vence: 25 Mayo 2025</p>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">Esta Semana</span>
                        </div>
                        <h4 className="font-medium text-gray-900">Revisión Planos Eléctricos</h4>
                        <p className="text-sm text-gray-600">Vence: 30 Mayo 2025</p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">Próximo</span>
                        </div>
                        <h4 className="font-medium text-gray-900">Inspección MEP Final</h4>
                        <p className="text-sm text-gray-600">Programada: 5 Junio 2025</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;