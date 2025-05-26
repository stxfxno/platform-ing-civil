// src/pages/schedules/DependenciesCoordination.tsx
import React, { useState } from 'react';
import { 
    Network, 
    GitBranch, 
    AlertTriangle, 
    Clock, 
    CheckCircle,
    ArrowRight,
    Filter,
    Search,
    Settings,
    Zap,
    Target,
    Users
} from 'lucide-react';

interface Dependency {
    id: string;
    fromActivity: {
        id: string;
        title: string;
        discipline: string;
        status: string;
        endDate: string;
        progress: number;
    };
    toActivity: {
        id: string;
        title: string;
        discipline: string;
        status: string;
        startDate: string;
        progress: number;
    };
    type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
    lag: number;
    description: string;
    status: 'active' | 'at_risk' | 'blocked' | 'resolved';
    impact: 'low' | 'medium' | 'high' | 'critical';
    coordinator: string;
}

const mockDependencies: Dependency[] = [
    {
        id: 'dep-001',
        fromActivity: {
            id: 'STRUCT-001',
            title: 'Finalización estructura - Área A',
            discipline: 'Estructura',
            status: 'completed',
            endDate: '2025-05-25',
            progress: 100
        },
        toActivity: {
            id: 'HVAC-001',
            title: 'Instalación ductos HVAC - Área A',
            discipline: 'HVAC',
            status: 'in_progress',
            startDate: '2025-05-26',
            progress: 65
        },
        type: 'finish_to_start',
        lag: 0,
        description: 'Estructura debe estar completa antes de instalación ductos',
        status: 'resolved',
        impact: 'critical',
        coordinator: 'Ing. Carlos Mendoza'
    },
    {
        id: 'dep-002',
        fromActivity: {
            id: 'HVAC-001',
            title: 'Instalación ductos HVAC - Área A',
            discipline: 'HVAC',
            status: 'in_progress',
            endDate: '2025-05-30',
            progress: 65
        },
        toActivity: {
            id: 'HVAC-002',
            title: 'Instalación unidades manejadoras',
            discipline: 'HVAC',
            status: 'planned',
            startDate: '2025-06-02',
            progress: 0
        },
        type: 'finish_to_start',
        lag: 2,
        description: 'Ductos principales deben estar antes de unidades manejadoras',
        status: 'active',
        impact: 'high',
        coordinator: 'Ing. Carlos Mendoza'
    },
    {
        id: 'dep-003',
        fromActivity: {
            id: 'ELEC-001',
            title: 'Cableado eléctrico principal',
            discipline: 'Eléctrico',
            status: 'delayed',
            endDate: '2025-05-31',
            progress: 25
        },
        toActivity: {
            id: 'ELEC-002',
            title: 'Instalación tableros principales',
            discipline: 'Eléctrico',
            status: 'not_started',
            startDate: '2025-06-03',
            progress: 0
        },
        type: 'finish_to_start',
        lag: 1,
        description: 'Cableado básico antes de tableros principales',
        status: 'at_risk',
        impact: 'critical',
        coordinator: 'Ing. María Santos'
    },
    {
        id: 'dep-004',
        fromActivity: {
            id: 'PLUMB-001',
            title: 'Instalación tuberías principales',
            discipline: 'Plomería',
            status: 'in_progress',
            endDate: '2025-05-29',
            progress: 45
        },
        toActivity: {
            id: 'FIRE-001',
            title: 'Sistema contra incendios',
            discipline: 'Protección Contra Incendios',
            status: 'not_started',
            startDate: '2025-05-30',
            progress: 0
        },
        type: 'finish_to_start',
        lag: 0,
        description: 'Tuberías principales requeridas para sistema contra incendios',
        status: 'blocked',
        impact: 'high',
        coordinator: 'Ing. Alberto Silva'
    },
    {
        id: 'dep-005',
        fromActivity: {
            id: 'MECH-001',
            title: 'Instalación equipos mecánicos',
            discipline: 'Mecánico',
            status: 'planned',
            endDate: '2025-06-05',
            progress: 0
        },
        toActivity: {
            id: 'HVAC-002',
            title: 'Instalación unidades manejadoras',
            discipline: 'HVAC',
            status: 'planned',
            startDate: '2025-06-02',
            progress: 0
        },
        type: 'start_to_start',
        lag: -3,
        description: 'Coordinación para instalación simultánea de equipos',
        status: 'active',
        impact: 'medium',
        coordinator: 'Ing. Fernando Rojas'
    }
];

const disciplineColors = {
    'HVAC': 'bg-blue-500',
    'Eléctrico': 'bg-yellow-500',
    'Plomería': 'bg-green-500',
    'Protección Contra Incendios': 'bg-red-500',
    'Mecánico': 'bg-purple-500',
    'Estructura': 'bg-gray-500'
};

const statusColors = {
    'active': 'bg-blue-100 text-blue-800',
    'at_risk': 'bg-yellow-100 text-yellow-800',
    'blocked': 'bg-red-100 text-red-800',
    'resolved': 'bg-green-100 text-green-800'
};

const statusLabels = {
    'active': 'Activa',
    'at_risk': 'En Riesgo',
    'blocked': 'Bloqueada',
    'resolved': 'Resuelta'
};

const impactColors = {
    'low': 'text-green-600',
    'medium': 'text-yellow-600',
    'high': 'text-orange-600',
    'critical': 'text-red-600'
};

const impactLabels = {
    'low': 'Bajo',
    'medium': 'Medio',
    'high': 'Alto',
    'critical': 'Crítico'
};

const dependencyTypes = {
    'finish_to_start': 'Fin a Inicio',
    'start_to_start': 'Inicio a Inicio',
    'finish_to_finish': 'Fin a Fin',
    'start_to_finish': 'Inicio a Fin'
};

const DependenciesCoordination: React.FC = () => {
    const [dependencies] = useState<Dependency[]>(mockDependencies);
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterImpact, setFilterImpact] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedView, setSelectedView] = useState<'list' | 'network'>('list');

    const stats = {
        total: dependencies.length,
        active: dependencies.filter(d => d.status === 'active').length,
        atRisk: dependencies.filter(d => d.status === 'at_risk').length,
        blocked: dependencies.filter(d => d.status === 'blocked').length,
        resolved: dependencies.filter(d => d.status === 'resolved').length,
        critical: dependencies.filter(d => d.impact === 'critical').length
    };

    const filteredDependencies = dependencies.filter(dep => {
        const matchesStatus = !filterStatus || dep.status === filterStatus;
        const matchesImpact = !filterImpact || dep.impact === filterImpact;
        const matchesSearch = !searchTerm || 
            dep.fromActivity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dep.toActivity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dep.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesStatus && matchesImpact && matchesSearch;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'resolved': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'active': return <Clock className="w-4 h-4 text-blue-600" />;
            case 'at_risk': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
            case 'blocked': return <Zap className="w-4 h-4 text-red-600" />;
            default: return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const getDependencyIcon = (type: string) => {
        switch (type) {
            case 'finish_to_start': return <ArrowRight className="w-4 h-4" />;
            case 'start_to_start': return <GitBranch className="w-4 h-4" />;
            default: return <ArrowRight className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-500 rounded-lg">
                        <Network className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dependencias y Coordinación</h1>
                        <p className="text-gray-600">Visualización y gestión de dependencias entre tareas MEP</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex bg-gray-200 rounded-lg p-1">
                        <button
                            onClick={() => setSelectedView('list')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                selectedView === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                            }`}
                        >
                            Lista
                        </button>
                        <button
                            onClick={() => setSelectedView('network')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                selectedView === 'network' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                            }`}
                        >
                            Red
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado de Dependencias</h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Network className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-sm text-gray-600">Total</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
                        <p className="text-sm text-gray-600">Activas</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-yellow-600">{stats.atRisk}</p>
                        <p className="text-sm text-gray-600">En Riesgo</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                        <Zap className="w-6 h-6 text-red-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
                        <p className="text-sm text-gray-600">Bloqueadas</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                        <p className="text-sm text-gray-600">Resueltas</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <Target className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-600">{stats.critical}</p>
                        <p className="text-sm text-gray-600">Críticas</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            {selectedView === 'list' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <Search className="w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Buscar dependencias..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="">Todos los estados</option>
                                <option value="active">Activas</option>
                                <option value="at_risk">En Riesgo</option>
                                <option value="blocked">Bloqueadas</option>
                                <option value="resolved">Resueltas</option>
                            </select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <select
                                value={filterImpact}
                                onChange={(e) => setFilterImpact(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="">Todos los impactos</option>
                                <option value="critical">Crítico</option>
                                <option value="high">Alto</option>
                                <option value="medium">Medio</option>
                                <option value="low">Bajo</option>
                            </select>
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                            Mostrando {filteredDependencies.length} de {dependencies.length} dependencias
                        </div>
                    </div>
                </div>
            )}

            {/* Dependencies List View */}
            {selectedView === 'list' && (
                <div className="space-y-4">
                    {filteredDependencies.map((dep) => (
                        <div key={dep.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    {getStatusIcon(dep.status)}
                                    <div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[dep.status]}`}>
                                            {statusLabels[dep.status]}
                                        </span>
                                        <span className={`ml-2 text-xs font-medium ${impactColors[dep.impact]}`}>
                                            ● {impactLabels[dep.impact].toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">
                                        {dependencyTypes[dep.type]}
                                    </span>
                                    {dep.lag !== 0 && (
                                        <span className="text-sm font-medium text-blue-600">
                                            {dep.lag > 0 ? '+' : ''}{dep.lag}d
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 mb-4">
                                {/* From Activity */}
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className={`${disciplineColors[dep.fromActivity.discipline as keyof typeof disciplineColors]} w-3 h-3 rounded-full`}></div>
                                        <h4 className="font-medium text-gray-900">{dep.fromActivity.title}</h4>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p>ID: {dep.fromActivity.id} | {dep.fromActivity.discipline}</p>
                                        <p>Fin: {new Date(dep.fromActivity.endDate).toLocaleDateString('es-PE')}</p>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="mt-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    dep.fromActivity.status === 'completed' ? 'bg-green-500' :
                                                    dep.fromActivity.status === 'delayed' ? 'bg-red-500' : 'bg-blue-500'
                                                }`}
                                                style={{ width: `${dep.fromActivity.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500">{dep.fromActivity.progress}%</span>
                                    </div>
                                </div>

                                {/* Dependency Arrow */}
                                <div className="flex items-center justify-center w-12">
                                    <div className="p-2 bg-purple-100 rounded-full">
                                        {getDependencyIcon(dep.type)}
                                    </div>
                                </div>

                                {/* To Activity */}
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className={`${disciplineColors[dep.toActivity.discipline as keyof typeof disciplineColors]} w-3 h-3 rounded-full`}></div>
                                        <h4 className="font-medium text-gray-900">{dep.toActivity.title}</h4>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p>ID: {dep.toActivity.id} | {dep.toActivity.discipline}</p>
                                        <p>Inicio: {new Date(dep.toActivity.startDate).toLocaleDateString('es-PE')}</p>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="mt-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    dep.toActivity.status === 'completed' ? 'bg-green-500' :
                                                    dep.toActivity.status === 'delayed' ? 'bg-red-500' : 'bg-blue-500'
                                                }`}
                                                style={{ width: `${dep.toActivity.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500">{dep.toActivity.progress}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <p className="text-sm text-gray-700 mb-2">{dep.description}</p>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-4 text-gray-500">
                                        <span className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            {dep.coordinator}
                                        </span>
                                        <span>ID: {dep.id}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="px-3 py-1 text-purple-600 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                                            Gestionar
                                        </button>
                                        <button className="px-3 py-1 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Network View */}
            {selectedView === 'network' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="text-center py-12">
                        <Network className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Vista de Red de Dependencias</h3>
                        <p className="text-gray-600 mb-6">
                            Visualización interactiva de la red completa de dependencias entre actividades MEP
                        </p>
                        
                        {/* Network Diagram Placeholder */}
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Structural Activities */}
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-700">Estructura</h4>
                                    <div className="bg-gray-500 text-white p-3 rounded-lg text-sm">
                                        STRUCT-001
                                        <div className="text-xs opacity-75">100% Completado</div>
                                    </div>
                                </div>

                                {/* MEP Activities */}
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-700">MEP Principal</h4>
                                    <div className="space-y-2">
                                        <div className="bg-blue-500 text-white p-3 rounded-lg text-sm">
                                            HVAC-001
                                            <div className="text-xs opacity-75">65% En Progreso</div>
                                        </div>
                                        <div className="bg-yellow-500 text-white p-3 rounded-lg text-sm">
                                            ELEC-001
                                            <div className="text-xs opacity-75">25% Retrasado</div>
                                        </div>
                                        <div className="bg-green-500 text-white p-3 rounded-lg text-sm">
                                            PLUMB-001
                                            <div className="text-xs opacity-75">45% En Progreso</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Secondary Activities */}
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-700">MEP Secundario</h4>
                                    <div className="space-y-2">
                                        <div className="bg-blue-400 text-white p-3 rounded-lg text-sm">
                                            HVAC-002
                                            <div className="text-xs opacity-75">0% Planificado</div>
                                        </div>
                                        <div className="bg-yellow-400 text-white p-3 rounded-lg text-sm">
                                            ELEC-002
                                            <div className="text-xs opacity-75">0% No Iniciado</div>
                                        </div>
                                        <div className="bg-red-500 text-white p-3 rounded-lg text-sm">
                                            FIRE-001
                                            <div className="text-xs opacity-75">0% Bloqueado</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Connection Lines Representation */}
                            <div className="mt-8 flex items-center justify-center space-x-8">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <ArrowRight className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-gray-600">Dependencia Resuelta</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <ArrowRight className="w-4 h-4 text-yellow-600" />
                                    <span className="text-sm text-gray-600">En Riesgo</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <ArrowRight className="w-4 h-4 text-red-600" />
                                    <span className="text-sm text-gray-600">Bloqueada</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500">
                            Esta vista estará disponible en futuras versiones con visualización interactiva completa
                        </p>
                    </div>
                </div>
            )}

            {/* Critical Dependencies Alert */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-red-900 mb-2">Dependencias Críticas</h3>
                        <p className="text-red-800 mb-3">
                            Se han identificado dependencias críticas que requieren atención inmediata para evitar retrasos en el proyecto.
                        </p>
                        <div className="space-y-2">
                            {dependencies
                                .filter(d => d.status === 'blocked' || (d.status === 'at_risk' && d.impact === 'critical'))
                                .map((dep) => (
                                    <div key={dep.id} className="bg-red-100 border border-red-200 rounded-lg p-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-red-900">
                                                    {dep.fromActivity.title} → {dep.toActivity.title}
                                                </h4>
                                                <p className="text-sm text-red-700">{dep.description}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[dep.status]}`}>
                                                    {statusLabels[dep.status]}
                                                </span>
                                                <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                                                    Resolver
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Coordination Matrix */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Matrix de Coordinación por Disciplina</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-3 font-medium text-gray-700">Desde / Hacia</th>
                                <th className="text-center p-3 font-medium text-gray-700">HVAC</th>
                                <th className="text-center p-3 font-medium text-gray-700">Eléctrico</th>
                                <th className="text-center p-3 font-medium text-gray-700">Plomería</th>
                                <th className="text-center p-3 font-medium text-gray-700">Protección CI</th>
                                <th className="text-center p-3 font-medium text-gray-700">Mecánico</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="p-3 font-medium text-gray-900">Estructura</td>
                                <td className="text-center p-3">
                                    <div className="w-4 h-4 bg-green-500 rounded-full mx-auto" title="Dependencia resuelta"></div>
                                </td>
                                <td className="text-center p-3">
                                    <div className="w-4 h-4 bg-green-500 rounded-full mx-auto" title="Dependencia resuelta"></div>
                                </td>
                                <td className="text-center p-3">
                                    <div className="w-4 h-4 bg-green-500 rounded-full mx-auto" title="Dependencia resuelta"></div>
                                </td>
                                <td className="text-center p-3">-</td>
                                <td className="text-center p-3">-</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="p-3 font-medium text-gray-900">HVAC</td>
                                <td className="text-center p-3">-</td>
                                <td className="text-center p-3">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto" title="Dependencia activa"></div>
                                </td>
                                <td className="text-center p-3">-</td>
                                <td className="text-center p-3">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto" title="Dependencia activa"></div>
                                </td>
                                <td className="text-center p-3">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto" title="Dependencia activa"></div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="p-3 font-medium text-gray-900">Eléctrico</td>
                                <td className="text-center p-3">-</td>
                                <td className="text-center p-3">-</td>
                                <td className="text-center p-3">-</td>
                                <td className="text-center p-3">
                                    <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto" title="En riesgo"></div>
                                </td>
                                <td className="text-center p-3">-</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="p-3 font-medium text-gray-900">Plomería</td>
                                <td className="text-center p-3">-</td>
                                <td className="text-center p-3">-</td>
                                <td className="text-center p-3">-</td>
                                <td className="text-center p-3">
                                    <div className="w-4 h-4 bg-red-500 rounded-full mx-auto" title="Bloqueada"></div>
                                </td>
                                <td className="text-center p-3">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Resuelta</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Activa</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>En Riesgo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Bloqueada</span>
                    </div>
                </div>
            </div>

            {/* Action Plan */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Plan de Acción para Coordinación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-blue-900 mb-3">Acciones Inmediatas</h4>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-blue-800">Resolver bloqueo en sistema contra incendios</span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-blue-800">Coordinar progreso eléctrico para evitar retrasos</span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-blue-800">Sincronizar instalación equipos mecánicos</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium text-blue-900 mb-3">Próximas Reuniones</h4>
                        <div className="space-y-2 text-sm text-blue-800">
                            <div className="p-3 bg-white rounded-lg border border-blue-200">
                                <div className="font-medium">Coordinación HVAC-Mecánico</div>
                                <div className="text-xs opacity-75">Mañana 10:00 AM - Sala de Reuniones</div>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-blue-200">
                                <div className="font-medium">Revisión Dependencias Críticas</div>
                                <div className="text-xs opacity-75">Miércoles 2:00 PM - Virtual</div>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-blue-200">
                                <div className="font-medium">Seguimiento Semanal</div>
                                <div className="text-xs opacity-75">Viernes 9:00 AM - Oficina de Obra</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Information Panel */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Gestión de Dependencias MEP</h3>
                <div className="text-sm text-purple-800 space-y-3">
                    <p>
                        <strong>Dependencias y Coordinación</strong> proporciona una vista integral de las interdependencias 
                        entre actividades MEP, facilitando la coordinación eficaz y la identificación temprana de conflictos.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium mb-2">Funcionalidades de coordinación:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Mapeo completo de dependencias MEP</li>
                                <li>• Visualización de impactos críticos</li>
                                <li>• Alertas automáticas de conflictos</li>
                                <li>• Matrix de coordinación por disciplina</li>
                                <li>• Seguimiento del estado de dependencias</li>
                                <li>• Planificación de reuniones de coordinación</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Beneficios operacionales:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Reducción de interferencias en obra</li>
                                <li>• Optimización de secuencias de trabajo</li>
                                <li>• Mejora en la comunicación entre equipos</li>
                                <li>• Prevención de retrasos en cadena</li>
                                <li>• Mayor eficiencia en la ejecución</li>
                                <li>• Minimización de re-trabajos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DependenciesCoordination;