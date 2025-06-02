// src/pages/scope/ScopeMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Target, 
    FileText, 
    Package, 
    MessageSquare, 
    HelpCircle,
    Users,
    Calendar,
    CheckCircle,
    Clock,
    //AlertTriangle,
    Archive,
    //Eye
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
        title: 'Clarificación del Alcance',
        description: 'Sección para registrar y formalizar las clarificaciones y acuerdos sobre el alcance con cada subcontratista MEP.',
        path: '/alcance/clarificaciones',
        icon: MessageSquare,
        color: 'bg-yellow-500',
        stats: {
            count: 24,
            label: 'Clarificaciones pendientes',
            trend: 'down'
        }
    },
    {
        title: 'Módulo de Preguntas y Respuestas (Q&A)',
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

const recentBidPackages = [
    {
        id: 'BP-001',
        name: 'Sistema HVAC - Torres A y B',
        discipline: 'HVAC',
        status: 'active',
        deadline: '2025-06-15',
        applicants: 5,
        documents: 12
    },
    {
        id: 'BP-002',
        name: 'Instalaciones Eléctricas - Nivel Sótano',
        discipline: 'Eléctrico',
        status: 'preparation',
        deadline: '2025-06-20',
        applicants: 0,
        documents: 8
    },
    {
        id: 'BP-003',
        name: 'Sistema Contra Incendios - Completo',
        discipline: 'Protección Contra Incendios',
        status: 'evaluation',
        deadline: '2025-05-30',
        applicants: 3,
        documents: 15
    },
    {
        id: 'BP-004',
        name: 'Plomería y Sanitarios - Pisos 1-5',
        discipline: 'Plomería',
        status: 'closed',
        deadline: '2025-05-15',
        applicants: 7,
        documents: 10
    }
];

const pendingClarifications = [
    {
        id: 'CL-001',
        title: 'Especificaciones de ductos en zona técnica',
        contractor: 'HVAC Solutions S.A.C.',
        discipline: 'HVAC',
        priority: 'high',
        createdAt: '2025-05-20',
        status: 'pending'
    },
    {
        id: 'CL-002',
        title: 'Ubicación de tableros eléctricos principales',
        contractor: 'Electro Instalaciones Perú',
        discipline: 'Eléctrico',
        priority: 'medium',
        createdAt: '2025-05-19',
        status: 'in_review'
    },
    {
        id: 'CL-003',
        title: 'Materiales para tuberías de agua helada',
        contractor: 'MEP Contractors Inc.',
        discipline: 'Mecánico',
        priority: 'low',
        createdAt: '2025-05-18',
        status: 'responded'
    }
];

const ScopeMenu: React.FC = () => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'preparation': return 'bg-blue-100 text-blue-800';
            case 'evaluation': return 'bg-yellow-100 text-yellow-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            case 'pending': return 'bg-red-100 text-red-800';
            case 'in_review': return 'bg-yellow-100 text-yellow-800';
            case 'responded': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Activo';
            case 'preparation': return 'Preparación';
            case 'evaluation': return 'Evaluación';
            case 'closed': return 'Cerrado';
            case 'pending': return 'Pendiente';
            case 'in_review': return 'En Revisión';
            case 'responded': return 'Respondida';
            default: return status;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600';
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
                {/* Recent Bid Packages */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Paquetes de Licitación Recientes</h2>
                        <Link
                            to="/alcance/licitaciones"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Ver todos →
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentBidPackages.map((pkg) => (
                            <div key={pkg.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="text-sm font-medium text-gray-500">{pkg.id}</span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(pkg.status)}`}>
                                                {getStatusLabel(pkg.status)}
                                            </span>
                                        </div>
                                        <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                                        <p className="text-sm text-gray-600">{pkg.discipline}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            {pkg.applicants} licitantes
                                        </span>
                                        <span className="flex items-center">
                                            <FileText className="w-4 h-4 mr-1" />
                                            {pkg.documents} docs
                                        </span>
                                    </div>
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {new Date(pkg.deadline).toLocaleDateString('es-PE', {
                                            day: '2-digit',
                                            month: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending Clarifications */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Clarificaciones Pendientes</h2>
                        <Link
                            to="/alcance/clarificaciones"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Ver todas →
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {pendingClarifications.map((clarification) => (
                            <div key={clarification.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="text-sm font-medium text-gray-500">{clarification.id}</span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(clarification.status)}`}>
                                                {getStatusLabel(clarification.status)}
                                            </span>
                                            <span className={`text-xs font-medium ${getPriorityColor(clarification.priority)}`}>
                                                ● {clarification.priority.toUpperCase()}
                                            </span>
                                        </div>
                                        <h4 className="font-medium text-gray-900">{clarification.title}</h4>
                                        <p className="text-sm text-gray-600">{clarification.contractor}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                                    <span>{clarification.discipline}</span>
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {new Date(clarification.createdAt).toLocaleDateString('es-PE', {
                                            day: '2-digit',
                                            month: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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