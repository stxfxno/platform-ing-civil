// src/pages/schedules/ProgressTracking.tsx
import React, { useState } from 'react';
import { 
    TrendingUp, 
    Calendar, 
    BarChart3, 
    AlertTriangle, 
    CheckCircle, 
    Clock,
    Filter,
    RefreshCw,
    Download,
    Camera,
    MessageSquare,
    Target,
    Activity
} from 'lucide-react';

interface ProgressData {
    id: string;
    activityId: string;
    title: string;
    discipline: string;
    subcontractor: string;
    plannedProgress: number;
    actualProgress: number;
    variance: number;
    status: 'on_track' | 'delayed' | 'ahead' | 'at_risk';
    lastUpdate: string;
    issues: string[];
    photos: number;
    comments: number;
    startDate: string;
    endDate: string;
    location: string;
}

const mockProgressData: ProgressData[] = [
    {
        id: 'prog-001',
        activityId: 'HVAC-001',
        title: 'Instalación ductos HVAC - Área A',
        discipline: 'HVAC',
        subcontractor: 'HVAC Solutions S.A.C.',
        plannedProgress: 70,
        actualProgress: 75,
        variance: 5,
        status: 'ahead',
        lastUpdate: '2025-05-26T14:30:00Z',
        issues: [],
        photos: 8,
        comments: 3,
        startDate: '2025-05-26',
        endDate: '2025-05-30',
        location: 'Sótano - Área A'
    },
    {
        id: 'prog-002',
        activityId: 'ELEC-001',
        title: 'Cableado eléctrico principal - Piso 3',
        discipline: 'Eléctrico',
        subcontractor: 'Electro Instalaciones Perú',
        plannedProgress: 25,
        actualProgress: 15,
        variance: -10,
        status: 'delayed',
        lastUpdate: '2025-05-26T10:15:00Z',
        issues: ['Retraso en entrega de materiales', 'Problema con permisos'],
        photos: 2,
        comments: 7,
        startDate: '2025-05-25',
        endDate: '2025-05-31',
        location: 'Piso 3'
    },
    {
        id: 'prog-003',
        activityId: 'PLUMB-001',
        title: 'Instalación tuberías agua fría - Zona B',
        discipline: 'Plomería',
        subcontractor: 'Plomería Industrial SAC',
        plannedProgress: 60,
        actualProgress: 45,
        variance: -15,
        status: 'at_risk',
        lastUpdate: '2025-05-26T16:45:00Z',
        issues: ['Interferencia con estructura', 'Falta de personal especializado'],
        photos: 5,
        comments: 12,
        startDate: '2025-05-24',
        endDate: '2025-05-29',
        location: 'Todo el edificio - Zona B'
    },
    {
        id: 'prog-004',
        activityId: 'FIRE-001',
        title: 'Sistema contra incendios - Nivel 1',
        discipline: 'Protección Contra Incendios',
        subcontractor: 'Fire Protection Corp.',
        plannedProgress: 10,
        actualProgress: 10,
        variance: 0,
        status: 'on_track',
        lastUpdate: '2025-05-26T11:00:00Z',
        issues: [],
        photos: 1,
        comments: 1,
        startDate: '2025-05-26',
        endDate: '2025-06-03',
        location: 'Nivel 1 completo'
    }
];

const disciplineColors = {
    'HVAC': 'bg-blue-500',
    'Eléctrico': 'bg-yellow-500',
    'Plomería': 'bg-green-500',
    'Protección Contra Incendios': 'bg-red-500',
    'Mecánico': 'bg-purple-500'
};

const statusColors = {
    'on_track': 'bg-green-100 text-green-800',
    'ahead': 'bg-blue-100 text-blue-800',
    'delayed': 'bg-red-100 text-red-800',
    'at_risk': 'bg-yellow-100 text-yellow-800'
};

const statusLabels = {
    'on_track': 'En Tiempo',
    'ahead': 'Adelantado',
    'delayed': 'Retrasado',
    'at_risk': 'En Riesgo'
};

const ProgressTracking: React.FC = () => {
    const [progressData] = useState<ProgressData[]>(mockProgressData);
    const [selectedWeek] = useState('2025-05-26/2025-06-01');
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterDiscipline, setFilterDiscipline] = useState<string>('');
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<ProgressData | null>(null);

    const weekStats = {
        totalActivities: progressData.length,
        onTrack: progressData.filter(p => p.status === 'on_track').length,
        ahead: progressData.filter(p => p.status === 'ahead').length,
        delayed: progressData.filter(p => p.status === 'delayed').length,
        atRisk: progressData.filter(p => p.status === 'at_risk').length,
        avgProgress: Math.round(progressData.reduce((sum, p) => sum + p.actualProgress, 0) / progressData.length),
        totalIssues: progressData.reduce((sum, p) => sum + p.issues.length, 0)
    };

    const filteredData = progressData.filter(item => {
        const matchesStatus = !filterStatus || item.status === filterStatus;
        const matchesDiscipline = !filterDiscipline || item.discipline === filterDiscipline;
        return matchesStatus && matchesDiscipline;
    });

    const getVarianceColor = (variance: number) => {
        if (variance > 0) return 'text-green-600';
        if (variance < -5) return 'text-red-600';
        if (variance < 0) return 'text-yellow-600';
        return 'text-gray-600';
    };

    const getVarianceIcon = (variance: number) => {
        if (variance > 0) return '↗';
        if (variance < 0) return '↘';
        return '→';
    };

    const handleUpdateProgress = (activity: ProgressData) => {
        setSelectedActivity(activity);
        setShowProgressModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-500 rounded-lg">
                        <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Seguimiento del Avance Semanal</h1>
                        <p className="text-gray-600">Registro y comparación del progreso real vs. planificado</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Actualizar
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Reporte
                    </button>
                </div>
            </div>

            {/* Week Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <h2 className="text-lg font-semibold text-gray-900">Semana: {selectedWeek}</h2>
                    </div>
                    <div className="text-sm text-gray-500">
                        Última actualización: {new Date().toLocaleString('es-PE')}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Target className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-900">{weekStats.totalActivities}</p>
                        <p className="text-sm text-gray-600">Total</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">{weekStats.onTrack}</p>
                        <p className="text-sm text-gray-600">En Tiempo</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">{weekStats.ahead}</p>
                        <p className="text-sm text-gray-600">Adelantado</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                        <Clock className="w-6 h-6 text-red-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-red-600">{weekStats.delayed}</p>
                        <p className="text-sm text-gray-600">Retrasado</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-yellow-600">{weekStats.atRisk}</p>
                        <p className="text-sm text-gray-600">En Riesgo</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">{weekStats.avgProgress}%</p>
                        <p className="text-sm text-gray-600">Progreso Prom.</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-600">{weekStats.totalIssues}</p>
                        <p className="text-sm text-gray-600">Problemas</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Todos los estados</option>
                            <option value="on_track">En Tiempo</option>
                            <option value="ahead">Adelantado</option>
                            <option value="delayed">Retrasado</option>
                            <option value="at_risk">En Riesgo</option>
                        </select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <select
                            value={filterDiscipline}
                            onChange={(e) => setFilterDiscipline(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Todas las disciplinas</option>
                            <option value="HVAC">HVAC</option>
                            <option value="Eléctrico">Eléctrico</option>
                            <option value="Plomería">Plomería</option>
                            <option value="Protección Contra Incendios">Protección Contra Incendios</option>
                            <option value="Mecánico">Mecánico</option>
                        </select>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        Mostrando {filteredData.length} de {progressData.length} actividades
                    </div>
                </div>
            </div>

            {/* Progress Cards */}
            <div className="space-y-4">
                {filteredData.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4 flex-1">
                                <div className={`${disciplineColors[item.discipline as keyof typeof disciplineColors]} p-3 rounded-lg`}>
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                        <span className="text-sm font-medium text-gray-500">{item.activityId}</span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[item.status]}`}>
                                            {statusLabels[item.status]}
                                        </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <span className="text-sm text-gray-500">Subcontratista:</span>
                                            <p className="font-medium">{item.subcontractor}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Ubicación:</span>
                                            <p className="font-medium">{item.location}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Última actualización:</span>
                                            <p className="font-medium">
                                                {new Date(item.lastUpdate).toLocaleString('es-PE', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress Comparison */}
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">Progreso Planificado</span>
                                                <span className="text-sm font-medium text-gray-900">{item.plannedProgress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gray-400 h-2 rounded-full"
                                                    style={{ width: `${item.plannedProgress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">Progreso Real</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-gray-900">{item.actualProgress}%</span>
                                                    <span className={`text-sm font-medium ${getVarianceColor(item.variance)}`}>
                                                        {getVarianceIcon(item.variance)} {Math.abs(item.variance)}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${
                                                        item.status === 'ahead' ? 'bg-blue-500' :
                                                        item.status === 'on_track' ? 'bg-green-500' :
                                                        item.status === 'delayed' ? 'bg-red-500' : 'bg-yellow-500'
                                                    }`}
                                                    style={{ width: `${item.actualProgress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Issues */}
                                    {item.issues.length > 0 && (
                                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <h4 className="text-sm font-medium text-red-800 mb-2">Problemas identificados:</h4>
                                            <ul className="text-sm text-red-700 space-y-1">
                                                {item.issues.map((issue, idx) => (
                                                    <li key={idx}>• {issue}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Activity Info */}
                                    <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Camera className="w-4 h-4" />
                                            <span>{item.photos} fotos</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MessageSquare className="w-4 h-4" />
                                            <span>{item.comments} comentarios</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>
                                                {new Date(item.startDate).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit' })} - 
                                                {new Date(item.endDate).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={() => handleUpdateProgress(item)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center"
                                >
                                    <TrendingUp className="w-4 h-4 mr-2" />
                                    Actualizar
                                </button>
                                <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center">
                                    <Camera className="w-4 h-4 mr-2" />
                                    Fotos
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Progress Modal */}
            {showProgressModal && selectedActivity && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Actualizar Progreso</h2>
                            <p className="text-gray-600">{selectedActivity.title}</p>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Current Progress */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-medium text-gray-900 mb-3">Estado Actual</h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-400">{selectedActivity.plannedProgress}%</p>
                                        <p className="text-sm text-gray-600">Planificado</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-blue-600">{selectedActivity.actualProgress}%</p>
                                        <p className="text-sm text-gray-600">Actual</p>
                                    </div>
                                    <div>
                                        <p className={`text-2xl font-bold ${getVarianceColor(selectedActivity.variance)}`}>
                                            {selectedActivity.variance > 0 ? '+' : ''}{selectedActivity.variance}%
                                        </p>
                                        <p className="text-sm text-gray-600">Variación</p>
                                    </div>
                                </div>
                            </div>

                            {/* Update Form */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nuevo Progreso (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        defaultValue={selectedActivity.actualProgress}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Estado de la Actividad
                                    </label>
                                    <select 
                                        defaultValue={selectedActivity.status}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="on_track">En Tiempo</option>
                                        <option value="ahead">Adelantado</option>
                                        <option value="delayed">Retrasado</option>
                                        <option value="at_risk">En Riesgo</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Comentarios del Progreso
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Describe el progreso, problemas encontrados, próximos pasos..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Problemas o Impedimentos
                                    </label>
                                    <textarea
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Describe cualquier problema que esté afectando el progreso..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fotos del Progreso
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Arrastra fotos aquí o haz clic para seleccionar</p>
                                        <input type="file" multiple accept="image/*" className="hidden" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowProgressModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Guardar Progreso
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Summary Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen Visual del Progreso</h2>
                <div className="space-y-4">
                    {filteredData.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                            <div className="w-48 text-sm font-medium text-gray-900 truncate">
                                {item.title}
                            </div>
                            <div className="flex-1 relative">
                                {/* Planned progress bar (background) */}
                                <div className="w-full bg-gray-200 rounded-full h-6 relative">
                                    <div
                                        className="bg-gray-300 h-6 rounded-full"
                                        style={{ width: `${item.plannedProgress}%` }}
                                    ></div>
                                    {/* Actual progress bar (overlay) */}
                                    <div
                                        className={`absolute top-0 left-0 h-6 rounded-full ${
                                            item.status === 'ahead' ? 'bg-blue-500' :
                                            item.status === 'on_track' ? 'bg-green-500' :
                                            item.status === 'delayed' ? 'bg-red-500' : 'bg-yellow-500'
                                        }`}
                                        style={{ width: `${item.actualProgress}%` }}
                                    ></div>
                                    {/* Progress labels */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs font-medium text-white">
                                            {item.actualProgress}% / {item.plannedProgress}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={`text-sm font-medium ${getVarianceColor(item.variance)}`}>
                                {item.variance > 0 ? '+' : ''}{item.variance}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Items */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">Elementos de Acción</h3>
                <div className="space-y-3">
                    {filteredData
                        .filter(item => item.status === 'delayed' || item.status === 'at_risk')
                        .map((item) => (
                            <div key={item.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-yellow-200">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                                    <p className="text-sm text-gray-600">
                                        {item.status === 'delayed' ? 'Actividad retrasada' : 'Actividad en riesgo'} - 
                                        Variación: {item.variance}%
                                    </p>
                                    {item.issues.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-sm font-medium text-gray-700">Problemas:</p>
                                            <ul className="text-sm text-gray-600 list-disc list-inside">
                                                {item.issues.map((issue, idx) => (
                                                    <li key={idx}>{issue}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <button className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                                    Revisar
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Information Panel */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Seguimiento del Avance MEP</h3>
                <div className="text-sm text-blue-800 space-y-3">
                    <p>
                        <strong>Seguimiento del Avance Semanal</strong> permite registrar y comparar el progreso 
                        real de las actividades MEP contra lo planificado, identificando desviaciones tempranas.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium mb-2">Funcionalidades de seguimiento:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Registro diario/semanal de progreso</li>
                                <li>• Comparación visual real vs. planificado</li>
                                <li>• Identificación automática de desviaciones</li>
                                <li>• Documentación fotográfica del avance</li>
                                <li>• Registro de problemas e impedimentos</li>
                                <li>• Alertas tempranas de retrasos</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Beneficios del control:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Control proactivo del cronograma</li>
                                <li>• Detección temprana de problemas</li>
                                <li>• Mejora en la toma de decisiones</li>
                                <li>• Comunicación eficaz con stakeholders</li>
                                <li>• Documentación completa del proyecto</li>
                                <li>• Optimización de recursos y tiempos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressTracking;