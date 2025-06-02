// src/pages/schedules/WeeklyActivities.tsx
import React, { useState } from 'react';
import {
    Plus,
    Calendar,
    Filter,
    Search,
    MoreVertical,
    CheckCircle,
    Clock,
    AlertTriangle,
    Target,
    Activity
} from 'lucide-react';

interface WeeklyActivityData {
    id: string;
    activityId: string;
    title: string;
    description: string;
    discipline: 'hvac' | 'electrical' | 'plumbing' | 'fire_protection' | 'mechanical';
    assignedTo: string;
    subcontractor: string;
    startDate: string;
    endDate: string;
    status: 'not_started' | 'in_progress' | 'completed' | 'delayed' | 'planned';
    progress: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
    plannedHours: number;
    actualHours: number;
    location: string;
    equipment?: string[];
    materials?: string[];
    dependencies?: string[];
}

const mockActivities: WeeklyActivityData[] = [
    {
        id: 'act-001',
        activityId: 'HVAC-001',
        title: 'Instalación ductos HVAC - Área A',
        description: 'Instalación de ductos principales del sistema HVAC en el área A del sótano',
        discipline: 'hvac',
        assignedTo: 'team-hvac-001',
        subcontractor: 'HVAC Solutions S.A.C.',
        startDate: '2025-05-26',
        endDate: '2025-05-30',
        status: 'in_progress',
        progress: 65,
        priority: 'high',
        plannedHours: 80,
        actualHours: 52,
        location: 'Sótano - Área A',
        equipment: ['Grúa pequeña', 'Herramientas ductos'],
        materials: ['Ductos galvanizados 12"', 'Soportería', 'Tornillería'],
        dependencies: ['structural-001']
    },
    {
        id: 'act-002',
        activityId: 'ELEC-001',
        title: 'Cableado eléctrico principal - Piso 3',
        description: 'Instalación del cableado eléctrico principal en el tercer piso',
        discipline: 'electrical',
        assignedTo: 'team-elec-001',
        subcontractor: 'Electro Instalaciones Perú',
        startDate: '2025-05-27',
        endDate: '2025-05-31',
        status: 'planned',
        progress: 0,
        priority: 'medium',
        plannedHours: 60,
        actualHours: 0,
        location: 'Piso 3',
        equipment: ['Escaleras', 'Herramientas eléctricas'],
        materials: ['Cable THW 12 AWG', 'Conduit EMT', 'Cajas eléctricas']
    },
    {
        id: 'act-003',
        activityId: 'PLUMB-001',
        title: 'Instalación tuberías agua fría - Zona B',
        description: 'Sistema de tuberías de agua fría para la zona B del edificio',
        discipline: 'plumbing',
        assignedTo: 'team-plumb-001',
        subcontractor: 'Plomería Industrial SAC',
        startDate: '2025-05-25',
        endDate: '2025-05-29',
        status: 'delayed',
        progress: 35,
        priority: 'critical',
        plannedHours: 70,
        actualHours: 48,
        location: 'Todo el edificio - Zona B',
        equipment: ['Soldadora', 'Herramientas plomería'],
        materials: ['Tubería CPVC 4"', 'Válvulas', 'Accesorios'],
        dependencies: ['struct-002', 'hvac-001']
    },
    {
        id: 'act-004',
        activityId: 'FIRE-001',
        title: 'Sistema contra incendios - Nivel 1',
        description: 'Instalación del sistema de rociadores para el primer nivel',
        discipline: 'fire_protection',
        assignedTo: 'team-fire-001',
        subcontractor: 'Fire Protection Corp.',
        startDate: '2025-05-28',
        endDate: '2025-06-03',
        status: 'not_started',
        progress: 0,
        priority: 'high',
        plannedHours: 90,
        actualHours: 0,
        location: 'Nivel 1 completo',
        equipment: ['Grúa telescópica', 'Herramientas especializadas'],
        materials: ['Rociadores', 'Tuberías Schedule 40', 'Válvulas de control']
    }
];

const disciplineOptions = [
    { value: 'hvac', label: 'HVAC', color: 'bg-blue-500' },
    { value: 'electrical', label: 'Eléctrico', color: 'bg-yellow-500' },
    { value: 'plumbing', label: 'Plomería', color: 'bg-green-500' },
    { value: 'fire_protection', label: 'Protección Contra Incendios', color: 'bg-red-500' },
    { value: 'mechanical', label: 'Mecánico', color: 'bg-purple-500' }
];

const statusOptions = [
    { value: 'not_started', label: 'No Iniciada', color: 'bg-gray-100 text-gray-800' },
    { value: 'planned', label: 'Planificada', color: 'bg-blue-100 text-blue-800' },
    { value: 'in_progress', label: 'En Progreso', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Completada', color: 'bg-green-100 text-green-800' },
    { value: 'delayed', label: 'Retrasada', color: 'bg-red-100 text-red-800' }
];

const priorityOptions = [
    { value: 'low', label: 'Baja', color: 'text-green-600' },
    { value: 'medium', label: 'Media', color: 'text-yellow-600' },
    { value: 'high', label: 'Alta', color: 'text-orange-600' },
    { value: 'critical', label: 'Crítica', color: 'text-red-600' }
];

const WeeklyActivities: React.FC = () => {
    const [activities] = useState<WeeklyActivityData[]>(mockActivities);
    const [selectedWeek] = useState('2025-05-26/2025-06-01');
    const [filterDiscipline, setFilterDiscipline] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const getDisciplineInfo = (discipline: string) => {
        return disciplineOptions.find(d => d.value === discipline) || disciplineOptions[0];
    };

    const getStatusInfo = (status: string) => {
        return statusOptions.find(s => s.value === status) || statusOptions[0];
    };

    const getPriorityInfo = (priority: string) => {
        return priorityOptions.find(p => p.value === priority) || priorityOptions[0];
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'in_progress': return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'delayed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
            default: return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const filteredActivities = activities.filter(activity => {
        const matchesDiscipline = !filterDiscipline || activity.discipline === filterDiscipline;
        const matchesStatus = !filterStatus || activity.status === filterStatus;
        const matchesSearch = !searchTerm ||
            activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.subcontractor.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesDiscipline && matchesStatus && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-500 rounded-lg">
                        <Target className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Creación y Gestión de Actividades Semanales</h1>
                        <p className="text-gray-600">Desglose detallado del cronograma maestro en tareas semanales MEP</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nueva Actividad
                    </button>
                </div>
            </div>

            {/* Week Selector and Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <h2 className="text-lg font-semibold text-gray-900">Semana: {selectedWeek}</h2>
                        <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                            <option value="2025-05-26/2025-06-01">26 Mayo - 01 Junio 2025</option>
                            <option value="2025-06-02/2025-06-08">02 Junio - 08 Junio 2025</option>
                            <option value="2025-06-09/2025-06-15">09 Junio - 15 Junio 2025</option>
                        </select>
                    </div>
                </div>

                {/* Stats Grid 
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{weekStats.total}</p>
                        <p className="text-sm text-gray-600">Total</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{weekStats.completed}</p>
                        <p className="text-sm text-gray-600">Completadas</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">{weekStats.inProgress}</p>
                        <p className="text-sm text-gray-600">En Progreso</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{weekStats.delayed}</p>
                        <p className="text-sm text-gray-600">Retrasadas</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{weekStats.notStarted}</p>
                        <p className="text-sm text-gray-600">Sin Iniciar</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">{weekStats.totalHours}h</p>
                        <p className="text-sm text-gray-600">Horas Plan.</p>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                        <p className="text-2xl font-bold text-indigo-600">{weekStats.avgProgress}%</p>
                        <p className="text-sm text-gray-600">Progreso Prom.</p>
                    </div>
                </div>*/}
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar actividades..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                            value={filterDiscipline}
                            onChange={(e) => setFilterDiscipline(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="">Todas las disciplinas</option>
                            {disciplineOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="">Todos los estados</option>
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        Mostrando {filteredActivities.length} de {activities.length} actividades
                    </div>
                </div>
            </div>

            {/* Activities List */}
            <div className="space-y-4">
                {filteredActivities.map((activity) => {
                    const disciplineInfo = getDisciplineInfo(activity.discipline);
                    const statusInfo = getStatusInfo(activity.status);
                    const priorityInfo = getPriorityInfo(activity.priority);

                    return (
                        <div key={activity.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start space-x-4 flex-1">
                                    <div className={`${disciplineInfo.color} p-3 rounded-lg`}>
                                        <Activity className="w-6 h-6 text-white" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                                            <span className="text-sm font-medium text-gray-500">{activity.activityId}</span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </span>
                                            <span className={`text-xs font-medium ${priorityInfo.color}`}>
                                                ● {priorityInfo.label.toUpperCase()}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 mb-3">{activity.description}</p>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">Subcontratista:</span>
                                                <p className="font-medium">{activity.subcontractor}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Ubicación:</span>
                                                <p className="font-medium">{activity.location}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Fechas:</span>
                                                <p className="font-medium">
                                                    {new Date(activity.startDate).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit' })} -
                                                    {new Date(activity.endDate).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit' })}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Horas:</span>
                                                <p className="font-medium">{activity.actualHours}/{activity.plannedHours}h</p>
                                            </div>
                                        </div>

                                        {/* Equipment and Materials */}
                                        {(activity.equipment || activity.materials) && (
                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {activity.equipment && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">Equipos:</span>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {activity.equipment.map((eq, idx) => (
                                                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                                    {eq}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {activity.materials && (
                                                    <div>
                                                        <span className="text-sm text-gray-500">Materiales:</span>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {activity.materials.map((mat, idx) => (
                                                                <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                                    {mat}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(activity.status)}
                                    <div className="relative">
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                        {/* Dropdown menu would go here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Create Activity Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Nueva Actividad Semanal</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">ID de Actividad</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="Ej: HVAC-002"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Disciplina</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                        <option value="">Seleccionar disciplina</option>
                                        {disciplineOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Título de la Actividad</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Título descriptivo de la actividad"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Descripción detallada de la actividad"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subcontratista</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                        <option value="">Seleccionar subcontratista</option>
                                        <option value="hvac-solutions">HVAC Solutions S.A.C.</option>
                                        <option value="electro-instalaciones">Electro Instalaciones Perú</option>
                                        <option value="plomeria-industrial">Plomería Industrial SAC</option>
                                        <option value="fire-protection">Fire Protection Corp.</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="Ubicación específica en obra"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                        {priorityOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Horas Planificadas</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="80"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado Inicial</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                        {statusOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                Crear Actividad
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Information Panel */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Gestión de Actividades Semanales</h3>
                <div className="text-sm text-blue-800 space-y-3">
                    <p>
                        <strong>Creación y Gestión de Actividades Semanales</strong> permite desglosar el cronograma maestro
                        en tareas específicas y detalladas para cada semana, optimizando la planificación y ejecución de trabajos MEP.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium mb-2">Características principales:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Desglose detallado por disciplina MEP</li>
                                <li>• Asignación directa a subcontratistas</li>
                                <li>• Seguimiento de recursos y materiales</li>
                                <li>• Gestión de dependencias entre tareas</li>
                                <li>• Control de progreso en tiempo real</li>
                                <li>• Alertas automáticas de retrasos</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Beneficios:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Mayor control del cronograma</li>
                                <li>• Optimización de recursos</li>
                                <li>• Mejor coordinación en obra</li>
                                <li>• Reducción de tiempos muertos</li>
                                <li>• Comunicación directa con equipos</li>
                                <li>• Trazabilidad completa de actividades</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyActivities;