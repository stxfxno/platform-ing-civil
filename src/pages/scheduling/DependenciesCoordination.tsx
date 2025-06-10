// src/pages/scheduling/DependenciesCoordination.tsx
import React, { useState } from 'react';
import {
    GitBranch,
    ArrowDown,
    CheckCircle,
    Clock,
    Calendar,
    User,
    AlertTriangle,
} from 'lucide-react';

interface Activity {
    id: string;
    title: string;
    discipline: string;
    progress: number;
    responsible: string;
    status: 'not_started' | 'in_progress' | 'completed' | 'delayed';
    estimatedDuration: string;
    actualStart?: string;
    estimatedEnd?: string;
}

interface Dependency {
    id: string;
    title: string;
    description: string;
    prerequisiteActivities: Activity[];
    dependentActivity: Activity;
    status: 'active' | 'blocked' | 'completed';
    coordinator: string;
    notes?: string;
    createdAt: string;
}

const mockDependencies: Dependency[] = [
    {
        id: 'dep-001',
        title: 'Estructura antes de instalaciones MEP',
        description: 'Las instalaciones MEP requieren que la estructura esté completamente terminada',
        prerequisiteActivities: [
            {
                id: 'struct-001',
                title: 'Instalación de vigas principales - Piso 3',
                discipline: 'Estructural',
                progress: 85,
                responsible: 'Ing. Roberto Martinez',
                status: 'in_progress',
                estimatedDuration: '5 días',
                actualStart: '2025-05-20',
                estimatedEnd: '2025-05-25'
            },
            {
                id: 'struct-002',
                title: 'Instalación de losa de piso - Piso 3',
                discipline: 'Estructural',
                progress: 70,
                responsible: 'Ing. Roberto Martinez',
                status: 'in_progress',
                estimatedDuration: '3 días',
                actualStart: '2025-05-22',
                estimatedEnd: '2025-05-26'
            }
        ],
        dependentActivity: {
            id: 'mep-001',
            title: 'Instalación ductos HVAC - Piso 3',
            discipline: 'HVAC',
            progress: 0,
            responsible: 'Ing. Carlos Mendoza',
            status: 'not_started',
            estimatedDuration: '8 días',
            estimatedEnd: '2025-06-05'
        },
        status: 'active',
        coordinator: 'Ing. María González',
        notes: 'Esperando finalización de estructura para inicio de MEP',
        createdAt: '2025-05-20T10:00:00Z'
    },
    {
        id: 'dep-002',
        title: 'Instalaciones básicas antes de acabados',
        description: 'Los acabados requieren que las instalaciones eléctricas y de plomería estén completadas',
        prerequisiteActivities: [
            {
                id: 'elec-001',
                title: 'Cableado eléctrico principal - Área A',
                discipline: 'Eléctrico',
                progress: 95,
                responsible: 'Ing. Ana López',
                status: 'in_progress',
                estimatedDuration: '4 días',
                actualStart: '2025-05-18',
                estimatedEnd: '2025-05-24'
            },
            {
                id: 'plumb-001',
                title: 'Tuberías de agua y desagüe - Área A',
                discipline: 'Plomería',
                progress: 100,
                responsible: 'Ing. Luis Torres',
                status: 'completed',
                estimatedDuration: '6 días',
                actualStart: '2025-05-15',
                estimatedEnd: '2025-05-22'
            }
        ],
        dependentActivity: {
            id: 'finish-001',
            title: 'Instalación de acabados interiores - Área A',
            discipline: 'Acabados',
            progress: 15,
            responsible: 'Ing. Sofia Ramirez',
            status: 'in_progress',
            estimatedDuration: '12 días',
            actualStart: '2025-05-23',
            estimatedEnd: '2025-06-08'
        },
        status: 'active',
        coordinator: 'Ing. María González',
        notes: 'Plomería completada, esperando finalización de eléctrico',
        createdAt: '2025-05-18T14:00:00Z'
    },
    {
        id: 'dep-003',
        title: 'Protección contra incendios después de MEP',
        description: 'El sistema contra incendios se instala después de las principales instalaciones MEP',
        prerequisiteActivities: [
            {
                id: 'hvac-002',
                title: 'Instalación unidades manejadoras - Azotea',
                discipline: 'HVAC',
                progress: 100,
                responsible: 'Ing. Carlos Mendoza',
                status: 'completed',
                estimatedDuration: '6 días',
                actualStart: '2025-05-10',
                estimatedEnd: '2025-05-18'
            },
            {
                id: 'elec-002',
                title: 'Tableros eléctricos principales - Todos los pisos',
                discipline: 'Eléctrico',
                progress: 100,
                responsible: 'Ing. Ana López',
                status: 'completed',
                estimatedDuration: '8 días',
                actualStart: '2025-05-08',
                estimatedEnd: '2025-05-18'
            }
        ],
        dependentActivity: {
            id: 'fire-001',
            title: 'Sistema de rociadores contra incendios',
            discipline: 'Protección contra Incendios',
            progress: 80,
            responsible: 'Ing. Laura Mendoza',
            status: 'in_progress',
            estimatedDuration: '10 días',
            actualStart: '2025-05-19',
            estimatedEnd: '2025-05-31'
        },
        status: 'active',
        coordinator: 'Ing. Laura Mendoza',
        notes: 'Progreso según cronograma, instalación avanzada',
        createdAt: '2025-05-08T09:00:00Z'
    }
];

// Función para obtener color según el progreso
const getProgressColor = (progress: number, status: string) => {
    if (status === 'completed') return 'bg-green-500';
    if (status === 'delayed') return 'bg-red-500';
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-gray-400';
};

// Función para obtener color del estado
const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed': return 'text-green-600 bg-green-100';
        case 'in_progress': return 'text-blue-600 bg-blue-100';
        case 'delayed': return 'text-red-600 bg-red-100';
        case 'not_started': return 'text-gray-600 bg-gray-100';
        default: return 'text-gray-600 bg-gray-100';
    }
};

// Función para obtener etiqueta del estado
const getStatusLabel = (status: string) => {
    switch (status) {
        case 'completed': return 'Completada';
        case 'in_progress': return 'En Progreso';
        case 'delayed': return 'Retrasada';
        case 'not_started': return 'No Iniciada';
        default: return status;
    }
};

// Componente para mostrar una actividad
const ActivityCard: React.FC<{ activity: Activity; isPrerequisite?: boolean }> = ({ 
    activity, 
    isPrerequisite = false 
}) => {
    return (
        <div className={`p-4 rounded-lg border-2 ${
            isPrerequisite 
                ? 'border-blue-200 bg-blue-50' 
                : 'border-green-200 bg-green-50'
        }`}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{activity.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{activity.discipline}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                    {getStatusLabel(activity.status)}
                </span>
            </div>

            {/* Barra de progreso */}
            <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-700">Progreso</span>
                    <span className="text-xs text-gray-600">{activity.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(activity.progress, activity.status)}`}
                        style={{ width: `${activity.progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Información adicional */}
            <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{activity.responsible}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Duración: {activity.estimatedDuration}</span>
                </div>
                {activity.actualStart && (
                    <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Inicio: {new Date(activity.actualStart).toLocaleDateString('es-PE')}</span>
                    </div>
                )}
                {activity.estimatedEnd && (
                    <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Fin estimado: {new Date(activity.estimatedEnd).toLocaleDateString('es-PE')}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// Componente principal
const DependenciesCoordination: React.FC = () => {
    const [dependencies] = useState<Dependency[]>(mockDependencies);

    // Calcular estadísticas
    const stats = {
        total: dependencies.length,
        active: dependencies.filter(d => d.status === 'active').length,
        blocked: dependencies.filter(d => d.status === 'blocked').length,
        completed: dependencies.filter(d => d.status === 'completed').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-500 rounded-lg">
                        <GitBranch className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dependencias entre Actividades</h1>
                        <p className="text-gray-600">Visualización de dependencias y flujo de actividades MEP</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-sm text-gray-600">Predecesoras culminadas</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
                        <p className="text-sm text-gray-600">Predecesoras en ejecución</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
                        <p className="text-sm text-gray-600">Bloqueadas</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                        <p className="text-sm text-gray-600">Completadas</p>
                    </div>
                </div>
            </div>

            {/* Dependencies List */}
            <div className="space-y-6">
                {dependencies.map((dependency) => (
                    <div key={dependency.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        {/* Encabezado de la dependencia */}
                        <div className="mb-6">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{dependency.title}</h3>
                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                    dependency.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                    dependency.status === 'blocked' ? 'bg-red-100 text-red-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {dependency.status === 'active' ? 'Activa' :
                                     dependency.status === 'blocked' ? 'Bloqueada' : 'Completada'}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-3">{dependency.description}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <User className="w-4 h-4" />
                                    <span>Coordinador: {dependency.coordinator}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Creada: {new Date(dependency.createdAt).toLocaleDateString('es-PE')}</span>
                                </div>
                            </div>

                            {dependency.notes && (
                                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-start space-x-2">
                                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                                        <p className="text-sm text-yellow-800">{dependency.notes}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Flujo visual de dependencias */}
                        <div className="space-y-4">
                            {/* Título de actividades prerequisito */}
                            <div className="text-center">
                                <h4 className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                                    Actividades Prerequisito (deben completarse primero)
                                </h4>
                            </div>

                            {/* Actividades prerequisito */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {dependency.prerequisiteActivities.map((activity) => (
                                    <ActivityCard 
                                        key={activity.id} 
                                        activity={activity} 
                                        isPrerequisite={true}
                                    />
                                ))}
                            </div>

                            {/* Flecha indicando dependencia */}
                            <div className="flex justify-center">
                                <div className="flex flex-col items-center space-y-2">
                                    <ArrowDown className="w-8 h-8 text-purple-500" />
                                    <span className="text-sm font-medium text-gray-600">Permite iniciar</span>
                                </div>
                            </div>

                            {/* Título de actividad dependiente */}
                            <div className="text-center">
                                <h4 className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                                    Actividad Dependiente (puede iniciar después)
                                </h4>
                            </div>

                            {/* Actividad dependiente */}
                            <div className="flex justify-center">
                                <div className="w-full md:w-1/2">
                                    <ActivityCard activity={dependency.dependentActivity} />
                                </div>
                            </div>

                            {/* Indicador de estado general */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {dependency.status === 'completed' ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        ) : dependency.status === 'blocked' ? (
                                            <AlertTriangle className="w-5 h-5 text-red-500" />
                                        ) : (
                                            <Clock className="w-5 h-5 text-blue-500" />
                                        )}
                                        <span className="text-sm font-medium text-gray-700">
                                            Estado de la dependencia: {
                                                dependency.status === 'active' ? 'En seguimiento activo' :
                                                dependency.status === 'blocked' ? 'Bloqueada - requiere atención' :
                                                'Completada exitosamente'
                                            }
                                        </span>
                                    </div>
                                    
                                    {/* Progreso general de la dependencia */}
                                    <div className="text-right">
                                        <div className="text-xs text-gray-600 mb-1">Progreso general</div>
                                        <div className="text-lg font-bold text-gray-900">
                                            {Math.round(
                                                (dependency.prerequisiteActivities.reduce((sum, act) => sum + act.progress, 0) + 
                                                 dependency.dependentActivity.progress) / 
                                                (dependency.prerequisiteActivities.length + 1)
                                            )}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {dependencies.length === 0 && (
                <div className="text-center py-12">
                    <GitBranch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No hay dependencias registradas</p>
                </div>
            )}
        </div>
    );
};

export default DependenciesCoordination;