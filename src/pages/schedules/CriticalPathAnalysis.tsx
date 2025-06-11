// src/pages/schedules/CriticalPathAnalysis.tsx
import React, { useState } from 'react';
import {
    Route,
    AlertTriangle,
    Clock,
    Target,
    Activity,
    Download,
    ChevronRight,
    Edit,
    Save,
    X,
    Plus,
    ChevronLeft,
} from 'lucide-react';

interface CriticalActivity {
    id: string;
    name: string;
    discipline: string;
    startDate: string;
    endDate: string;
    duration: number;
    totalFloat: number;
    freeFloat: number;
    progress: number;
    status: 'completed' | 'in_progress' | 'delayed' | 'not_started';
    predecessor: string[];
    successor: string[];
    contractor: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

const CriticalPathAnalysis: React.FC = () => {
    const [showRiskAnalysis, ] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 10)); // June 2025
    const [editingActivity, setEditingActivity] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<CriticalActivity>>({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newActivity, setNewActivity] = useState<Partial<CriticalActivity>>({});
    const [activities, setActivities] = useState<CriticalActivity[]>([]);
    const [editedActivities, setEditedActivities] = useState<{[key: string]: Partial<CriticalActivity>}>({});

    // Generate activities based on current month
    const getActivitiesForMonth = (month: Date): CriticalActivity[] => {
        const monthIndex = month.getMonth();
        
        // Get base activities for the month
        let baseActivities: CriticalActivity[] = [];
        
        if (monthIndex === 4) { // May 2025 (previous month - completed)
            baseActivities = [
                {
                    id: 'may-001',
                    name: 'Preparación y marcado de estructuras',
                    discipline: 'Estructural',
                    startDate: '2025-05-01',
                    endDate: '2025-05-10',
                    duration: 10,
                    totalFloat: 0,
                    freeFloat: 0,
                    progress: 100,
                    status: 'completed',
                    predecessor: [],
                    successor: ['may-002'],
                    contractor: 'Estructuras y Construcción SAC',
                    riskLevel: 'low'
                },
                {
                    id: 'may-002',
                    name: 'Instalación de anclajes principales',
                    discipline: 'Mecánico',
                    startDate: '2025-05-11',
                    endDate: '2025-05-20',
                    duration: 9,
                    totalFloat: 0,
                    freeFloat: 0,
                    progress: 100,
                    status: 'completed',
                    predecessor: ['may-001'],
                    successor: ['may-003'],
                    contractor: 'MEP Contractors Inc.',
                    riskLevel: 'low'
                },
                {
                    id: 'may-003',
                    name: 'Pruebas de resistencia estructural',
                    discipline: 'Control de Calidad',
                    startDate: '2025-05-21',
                    endDate: '2025-05-31',
                    duration: 11,
                    totalFloat: 0,
                    freeFloat: 0,
                    progress: 100,
                    status: 'completed',
                    predecessor: ['may-002'],
                    successor: ['crit-001'],
                    contractor: 'QA Solutions Perú',
                    riskLevel: 'low'
                }
            ];
        } else if (monthIndex === 5) { // June 2025 (current month)
            baseActivities = [
                {
                    id: 'crit-001',
                    name: 'Instalación ductos principales HVAC',
                    discipline: 'HVAC',
                    startDate: '2025-06-01',
                    endDate: '2025-06-15',
                    duration: 14,
                    totalFloat: 0,
                    freeFloat: 0,
                    progress: 85,
                    status: 'in_progress',
                    predecessor: ['may-003'],
                    successor: ['crit-002'],
                    contractor: 'HVAC Solutions S.A.C.',
                    riskLevel: 'medium'
                },
                {
                    id: 'crit-002',
                    name: 'Instalación tableros eléctricos principales',
                    discipline: 'Eléctrico',
                    startDate: '2025-06-16',
                    endDate: '2025-06-25',
                    duration: 9,
                    totalFloat: 0,
                    freeFloat: 0,
                    progress: 0,
                    status: 'not_started',
                    predecessor: ['crit-001'],
                    successor: ['crit-003'],
                    contractor: 'Electro Instalaciones Perú',
                    riskLevel: 'high'
                },
                {
                    id: 'crit-003',
                    name: 'Conexión sistemas principales MEP',
                    discipline: 'Mecánico',
                    startDate: '2025-06-26',
                    endDate: '2025-06-30',
                    duration: 5,
                    totalFloat: 0,
                    freeFloat: 0,
                    progress: 0,
                    status: 'not_started',
                    predecessor: ['crit-002'],
                    successor: ['jul-001'],
                    contractor: 'MEP Contractors Inc.',
                    riskLevel: 'critical'
                }
            ];
        } else if (monthIndex === 6) { // July 2025 (next month)
            baseActivities = [
                {
                    id: 'jul-001',
                    name: 'Pruebas de sistemas integrados',
                    discipline: 'Comisionado',
                    startDate: '2025-07-01',
                    endDate: '2025-07-10',
                    duration: 10,
                    totalFloat: 0,
                    freeFloat: 0,
                    progress: 0,
                    status: 'not_started',
                    predecessor: ['crit-003'],
                    successor: ['jul-002'],
                    contractor: 'Commissioning Experts SAC',
                    riskLevel: 'medium'
                },
                {
                    id: 'jul-002',
                    name: 'Certificación de sistemas HVAC',
                    discipline: 'HVAC',
                    startDate: '2025-07-11',
                    endDate: '2025-07-20',
                    duration: 9,
                    totalFloat: 0,
                    freeFloat: 0,
                    progress: 0,
                    status: 'not_started',
                    predecessor: ['jul-001'],
                    successor: ['jul-003'],
                    contractor: 'HVAC Solutions S.A.C.',
                    riskLevel: 'medium'
                },
                {
                    id: 'jul-003',
                    name: 'Entrega final de documentación',
                    discipline: 'Documentación',
                    startDate: '2025-07-21',
                    endDate: '2025-07-31',
                    duration: 11,
                    totalFloat: 0,
                    freeFloat: 0,
                    progress: 0,
                    status: 'not_started',
                    predecessor: ['jul-002'],
                    successor: [],
                    contractor: 'Gestión Documental Perú',
                    riskLevel: 'low'
                }
            ];
        }
        
        // Apply any edits to base activities
        const editedBaseActivities = baseActivities.map(activity => {
            const edits = editedActivities[activity.id];
            return edits ? { ...activity, ...edits } : activity;
        });
        
        // Merge with user-added activities for this month
        const monthKey = `${month.getFullYear()}-${month.getMonth()}`;
        const userActivities = activities.filter(activity => {
            const activityDate = new Date(activity.startDate || '');
            return `${activityDate.getFullYear()}-${activityDate.getMonth()}` === monthKey;
        });
        
        return [...editedBaseActivities, ...userActivities];
    };

    const criticalActivities = getActivitiesForMonth(currentMonth);

    // Helper functions for month navigation
    const getMonthName = (date: Date) => {
        return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newMonth = new Date(currentMonth);
        if (direction === 'prev') {
            newMonth.setMonth(newMonth.getMonth() - 1);
        } else {
            newMonth.setMonth(newMonth.getMonth() + 1);
        }
        setCurrentMonth(newMonth);
    };

    // Edit functions
    const startEdit = (activity: CriticalActivity) => {
        setEditingActivity(activity.id);
        setEditForm(activity);
    };

    const saveEdit = () => {
        if (editForm && editingActivity) {
            if (editingActivity.startsWith('user-')) {
                // Update user-added activities
                const updatedActivities = activities.map(activity => 
                    activity.id === editingActivity 
                        ? { ...activity, ...editForm } as CriticalActivity
                        : activity
                );
                setActivities(updatedActivities);
            } else {
                // For base activities, store the edits in editedActivities state
                setEditedActivities(prev => ({
                    ...prev,
                    [editingActivity]: editForm
                }));
            }
            console.log('Saving activity:', editForm);
        }
        setEditingActivity(null);
        setEditForm({});
    };

    const cancelEdit = () => {
        setEditingActivity(null);
        setEditForm({});
    };

    const nearCriticalActivities = [
        {
            id: 'near-001',
            name: 'Instalación tuberías agua fría - Área B',
            discipline: 'Plomería',
            totalFloat: 2,
            startDate: '2025-06-10',
            endDate: '2025-06-18',
            contractor: 'Plomería Industrial SAC'
        },
        {
            id: 'near-002',
            name: 'Cableado secundario - Pisos 4-6',
            discipline: 'Eléctrico',
            totalFloat: 4,
            startDate: '2025-06-12',
            endDate: '2025-06-24',
            contractor: 'Electro Instalaciones Perú'
        },
        {
            id: 'near-003',
            name: 'Sistema rociadores - Zona comercial',
            discipline: 'Protección Contra Incendios',
            totalFloat: 1,
            startDate: '2025-06-15',
            endDate: '2025-06-22',
            contractor: 'Fire Protection Corp.'
        },
        {
            id: 'near-004',
            name: 'Instalación ductos de ventilación secundarios',
            discipline: 'HVAC',
            totalFloat: 3,
            startDate: '2025-06-20',
            endDate: '2025-06-28',
            contractor: 'HVAC Solutions S.A.C.'
        },
        {
            id: 'near-005',
            name: 'Montaje de tableros de distribución auxiliares',
            discipline: 'Eléctrico',
            totalFloat: 5,
            startDate: '2025-06-18',
            endDate: '2025-06-30',
            contractor: 'Electro Instalaciones Perú'
        },
        {
            id: 'near-006',
            name: 'Instalación válvulas de control principales',
            discipline: 'Mecánico',
            totalFloat: 2,
            startDate: '2025-06-25',
            endDate: '2025-07-02',
            contractor: 'MEP Contractors Inc.'
        }
    ];

    // Function to get risk level based on totalFloat (holgura)
    const getRiskLevelByFloat = (totalFloat: number): 'low' | 'medium' | 'high' => {
        if (totalFloat === 1) return 'high';
        if (totalFloat >= 2 && totalFloat <= 3) return 'medium';
        if (totalFloat >= 4 && totalFloat <= 5) return 'low';
        return 'low'; // fallback
    };

    const getProgressBarColor = (progress: number) => {
        if (progress >= 90) return 'bg-green-500';
        if (progress >= 80) return 'bg-yellow-500';
        if (progress >= 65) return 'bg-orange-500';
        if (progress >= 50) return 'bg-red-500';
        return 'bg-gray-300';
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'low': return 'text-green-600 bg-green-50 border-green-200';
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'critical': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit'
        });
    };

    const calculatePathProgress = () => {
        const totalProgress = criticalActivities.reduce((sum, activity) => sum + activity.progress, 0);
        return Math.round(totalProgress / criticalActivities.length);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-red-500 rounded-lg">
                        <Route className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Identificación y Monitoreo de la Ruta Crítica</h1>
                        <p className="text-gray-600">Análisis de actividades críticas y gestión de riesgos del cronograma</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Reporte
                    </button>
                </div>
            </div>

            {/* Critical Path Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Duración Ruta Crítica</p>
                            <p className="text-3xl font-bold text-gray-900">32</p>
                            <p className="text-xs text-gray-500">días</p>
                        </div>
                        <div className="p-3 bg-red-100 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Actividades Críticas Mecánicas</p>
                            <p className="text-3xl font-bold text-gray-900">15</p>
                            <p className="text-xs text-gray-500">actividades</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Activity className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Actividades Críticas Plomería</p>
                            <p className="text-3xl font-bold text-gray-900">25</p>
                            <p className="text-xs text-gray-500">actividades</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Activity className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Actividades Críticas Eléctricas</p>
                            <p className="text-3xl font-bold text-gray-900">20</p>
                            <p className="text-xs text-gray-500">actividades</p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Activity className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Critical Path Visualization */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Ruta Crítica Principal</h2>
                    <div className="flex items-center space-x-2">
                        {/* Month Navigation */}
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => navigateMonth('prev')}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-md transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium text-gray-900 min-w-[140px] text-center">
                                {getMonthName(currentMonth)}
                            </span>
                            <button
                                onClick={() => navigateMonth('next')}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-md transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Actividad
                        </button>
                    </div>
                </div>

                {/* Path Flow */}
                <div className="relative overflow-x-auto">
                    <div className="flex items-center space-x-4 min-w-full pb-4">
                        {criticalActivities.map((activity, index) => (
                            <React.Fragment key={activity.id}>
                                <div className="flex-shrink-0 w-80">
                                    <div className={`border-2 rounded-lg p-4 ${activity.riskLevel === 'critical' ? 'border-red-300 bg-red-50' :
                                        activity.riskLevel === 'high' ? 'border-orange-300 bg-orange-50' :
                                            activity.riskLevel === 'medium' ? 'border-yellow-300 bg-yellow-50' :
                                                'border-green-300 bg-green-50'}`}>

                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded">
                                                        {index + 1}
                                                    </span>
                                                    <Activity className="w-4 h-4 text-gray-600" />
                                                </div>
                                                {editingActivity === activity.id ? (
                                                    <input
                                                        type="text"
                                                        value={editForm.discipline || ''}
                                                        onChange={(e) => setEditForm({...editForm, discipline: e.target.value})}
                                                        className="text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 w-20"
                                                    />
                                                ) : (
                                                    <span className="text-sm font-medium text-gray-900">{activity.discipline}</span>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {editingActivity === activity.id ? (
                                                    <select
                                                        value={editForm.riskLevel || ''}
                                                        onChange={(e) => setEditForm({...editForm, riskLevel: e.target.value as 'low' | 'medium' | 'high' | 'critical'})}
                                                        className="text-xs font-medium rounded border px-2 py-1"
                                                    >
                                                        <option value="low">BAJO</option>
                                                        <option value="medium">MEDIO</option>
                                                        <option value="high">ALTO</option>
                                                        <option value="critical">CRÍTICO</option>
                                                    </select>
                                                ) : (
                                                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getRiskColor(activity.riskLevel)}`}>
                                                        {activity.riskLevel === 'critical' ? 'CRÍTICO' :
                                                            activity.riskLevel === 'high' ? 'ALTO' :
                                                                activity.riskLevel === 'medium' ? 'MEDIO' : 'BAJO'}
                                                    </span>
                                                )}
                                                
                                                {editingActivity === activity.id ? (
                                                    <div className="flex space-x-1">
                                                        <button
                                                            onClick={saveEdit}
                                                            className="p-1 text-green-600 hover:bg-green-100 rounded"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => startEdit(activity)}
                                                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {editingActivity === activity.id ? (
                                            <textarea
                                                value={editForm.name || ''}
                                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                                className="w-full font-medium text-gray-900 mb-2 text-sm leading-tight border border-gray-300 rounded px-2 py-1 resize-none"
                                                rows={2}
                                            />
                                        ) : (
                                            <h4 className="font-medium text-gray-900 mb-2 text-sm leading-tight">
                                                {activity.name}
                                            </h4>
                                        )}

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs text-gray-600">
                                                <span>Holgura: {activity.totalFloat} días</span>
                                            </div>

                                            <div className="flex items-center justify-between text-xs text-gray-600">
                                                <span>{formatDate(activity.startDate)} - {formatDate(activity.endDate)}</span>
                                                <span className="font-medium">
                                                    {editingActivity === activity.id ? (
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            value={editForm.progress || ''}
                                                            onChange={(e) => setEditForm({...editForm, progress: parseInt(e.target.value)})}
                                                            className="w-12 border border-gray-300 rounded px-1"
                                                        />
                                                    ) : activity.progress}%
                                                </span>
                                            </div>

                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(activity.progress)}`}
                                                    style={{ width: `${activity.progress}%` }}
                                                ></div>
                                            </div>

                                            <div className="text-xs text-gray-500 truncate">
                                                {editingActivity === activity.id ? (
                                                    <input
                                                        type="text"
                                                        value={editForm.contractor || ''}
                                                        onChange={(e) => setEditForm({...editForm, contractor: e.target.value})}
                                                        className="w-full border border-gray-300 rounded px-1"
                                                    />
                                                ) : activity.contractor}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {index < criticalActivities.length - 1 && (
                                    <div className="flex-shrink-0 flex items-center">
                                        <ChevronRight className="w-6 h-6 text-gray-400" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Path Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600">Total de actividades de la ruta critica:</span>
                            <span className="ml-2 font-medium text-gray-900">32 días</span>
                        </div>
                        <div>
                            <span className="text-gray-600">Progreso de la ruta:</span>
                            <span className="ml-2 font-medium text-gray-900">{calculatePathProgress()}%</span>
                        </div>
                        <div>
                            <span className="text-gray-600">Actividades en retraso:</span>
                            <span className="ml-2 font-medium text-red-600">1</span>
                        </div>
                        <div>
                            <span className="text-gray-600">Riesgo General:</span>
                            <span className="ml-2 font-medium text-orange-600">ALTO</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Near Critical Activities */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Actividades Casi Críticas</h2>
                    <span className="text-sm text-gray-500">Holgura ≤ 5 días</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nearCriticalActivities.map((activity) => {
                        const riskLevel = getRiskLevelByFloat(activity.totalFloat);
                        return (
                            <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-600">{activity.discipline}</span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getRiskColor(riskLevel)}`}>
                                        {riskLevel === 'high' ? 'ALTO' : riskLevel === 'medium' ? 'MEDIO' : 'BAJO'}
                                    </span>
                                </div>

                                <h4 className="font-medium text-gray-900 mb-3 text-sm leading-tight">
                                    {activity.name}
                                </h4>

                                <div className="space-y-2 text-xs text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Holgura:</span>
                                        <span className={`font-medium ${activity.totalFloat === 1 ? 'text-red-600' :
                                                activity.totalFloat <= 3 ? 'text-orange-600' : 'text-yellow-600'
                                            }`}>
                                            {activity.totalFloat} días
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Duración:</span>
                                        <span className="font-medium text-gray-900">
                                            {formatDate(activity.startDate)} - {formatDate(activity.endDate)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Subcontrata:</span>
                                        <p className="font-medium text-gray-900 truncate mt-1">{activity.contractor}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Risk Analysis Panel */}
            {showRiskAnalysis && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Análisis de Riesgos</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Risk Matrix */}
                        <div>
                            <h3 className="text-md font-medium text-gray-900 mb-3">Matriz de Riesgos</h3>
                            <div className="space-y-3">
                                {[
                                    {
                                        risk: 'Retraso en entrega de materiales HVAC',
                                        probability: 70,
                                        impact: 'Alto',
                                        mitigation: 'Proveedores alternativos identificados',
                                        level: 'high'
                                    },
                                    {
                                        risk: 'Interferencias no detectadas en BIM',
                                        probability: 40,
                                        impact: 'Crítico',
                                        mitigation: 'Revisión adicional de modelos 3D',
                                        level: 'critical'
                                    },
                                    {
                                        risk: 'Disponibilidad de personal especializado',
                                        probability: 30,
                                        impact: 'Medio',
                                        mitigation: 'Contrato con empresa de respaldo',
                                        level: 'medium'
                                    }
                                ].map((risk, index) => (
                                    <div key={index} className={`p-4 rounded-lg border ${getRiskColor(risk.level)}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-gray-900 text-sm">{risk.risk}</h4>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${risk.level === 'critical' ? 'bg-red-100 text-red-600' :
                                                    risk.level === 'high' ? 'bg-orange-100 text-orange-600' :
                                                        'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                {risk.impact}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-600 space-y-1">
                                            <div>Probabilidad: <span className="font-medium">{risk.probability}%</span></div>
                                            <div>Mitigación: <span className="text-gray-800">{risk.mitigation}</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Impact Analysis */}
                        <div>
                            <h3 className="text-md font-medium text-gray-900 mb-3">Análisis de Impacto</h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                                        <h4 className="font-medium text-red-900">Escenario Crítico</h4>
                                    </div>
                                    <p className="text-sm text-red-800 mb-2">
                                        Si todas las actividades críticas se retrasan 3 días adicionales
                                    </p>
                                    <div className="text-sm space-y-1">
                                        <div>Retraso total del proyecto: <span className="font-medium">5 días</span></div>
                                        <div>Costo adicional estimado: <span className="font-medium">$45,000</span></div>
                                        <div>Fecha de entrega: <span className="font-medium">10 Julio 2025</span></div>
                                    </div>
                                </div>

                                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                                        <h4 className="font-medium text-yellow-900">Escenario Optimista</h4>
                                    </div>
                                    <p className="text-sm text-yellow-800 mb-2">
                                        Si se implementan todas las medidas de mitigación
                                    </p>
                                    <div className="text-sm space-y-1">
                                        <div>Recuperación de retrasos: <span className="font-medium">2 días</span></div>
                                        <div>Adelanto potencial: <span className="font-medium">1 día</span></div>
                                        <div>Fecha de entrega: <span className="font-medium">4 Julio 2025</span></div>
                                    </div>
                                </div>

                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Target className="w-5 h-5 text-green-600 mr-2" />
                                        <h4 className="font-medium text-green-900">Recomendaciones</h4>
                                    </div>
                                    <ul className="text-sm text-green-800 space-y-1">
                                        <li>• Asignar recursos adicionales a actividad HVAC</li>
                                        <li>• Acelerar aprobación de materiales eléctricos</li>
                                        <li>• Programar reunión semanal de seguimiento</li>
                                        <li>• Activar plan de contingencia para tuberías</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Items */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Acciones Inmediatas Requeridas</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <h4 className="font-medium text-blue-900">Este mes</h4>
                        {[
                            { action: 'Revisar progreso instalación ductos HVAC', due: '11/06/2025' },
                            { action: 'Coordinar entrega materiales eléctricos', due: '12/06/2025' },
                            { action: 'Reunión de coordinación con subcontratistas', due: '14/06/2025' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                                    <p className="text-xs text-gray-500">Fecha de culminación: {item.due}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-blue-900">Próximo Mes</h4>
                        {[
                            { action: 'Preparar materiales para tableros eléctricos', due: '05/07/2025' },
                            { action: 'Validar disponibilidad equipo mecánico', due: '08/07/2025' },
                            { action: 'Actualizar cronograma con nuevos hitos', due: '12/07/2025' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                                    <p className="text-xs text-gray-500">Fecha de culminación: {item.due}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add New Activity Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Agregar Nueva Actividad Crítica</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre de la Actividad
                                </label>
                                <input
                                    type="text"
                                    value={newActivity.name || ''}
                                    onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ej: Instalación de sistema eléctrico"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Disciplina
                                </label>
                                <select
                                    value={newActivity.discipline || ''}
                                    onChange={(e) => setNewActivity({...newActivity, discipline: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Seleccionar disciplina</option>
                                    <option value="HVAC">HVAC</option>
                                    <option value="Eléctrico">Eléctrico</option>
                                    <option value="Mecánico">Mecánico</option>
                                    <option value="Plomería">Plomería</option>
                                    <option value="Estructural">Estructural</option>
                                    <option value="Protección Contra Incendios">Protección Contra Incendios</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fecha de Inicio
                                </label>
                                <input
                                    type="date"
                                    value={newActivity.startDate || ''}
                                    onChange={(e) => setNewActivity({...newActivity, startDate: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fecha de Fin
                                </label>
                                <input
                                    type="date"
                                    value={newActivity.endDate || ''}
                                    onChange={(e) => setNewActivity({...newActivity, endDate: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contratista
                                </label>
                                <input
                                    type="text"
                                    value={newActivity.contractor || ''}
                                    onChange={(e) => setNewActivity({...newActivity, contractor: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ej: Empresa Constructora SAC"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nivel de Riesgo
                                </label>
                                <select
                                    value={newActivity.riskLevel || ''}
                                    onChange={(e) => setNewActivity({...newActivity, riskLevel: e.target.value as 'low' | 'medium' | 'high' | 'critical'})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Seleccionar riesgo</option>
                                    <option value="low">Bajo</option>
                                    <option value="medium">Medio</option>
                                    <option value="high">Alto</option>
                                    <option value="critical">Crítico</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Progreso (%)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={newActivity.progress || 0}
                                    onChange={(e) => setNewActivity({...newActivity, progress: parseInt(e.target.value)})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 pt-6">
                            <button
                                onClick={() => {
                                    setShowAddForm(false);
                                    setNewActivity({});
                                }}
                                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    if (newActivity.name && newActivity.discipline && newActivity.startDate && newActivity.endDate) {
                                        // Calculate duration from dates
                                        const start = new Date(newActivity.startDate);
                                        const end = new Date(newActivity.endDate);
                                        const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                                        
                                        const activityToAdd: CriticalActivity = {
                                            id: `user-${Date.now()}`,
                                            name: newActivity.name,
                                            discipline: newActivity.discipline,
                                            startDate: newActivity.startDate,
                                            endDate: newActivity.endDate,
                                            duration: duration,
                                            totalFloat: 0,
                                            freeFloat: 0,
                                            progress: newActivity.progress || 0,
                                            status: (newActivity.progress || 0) > 0 ? 'in_progress' : 'not_started',
                                            predecessor: [],
                                            successor: [],
                                            contractor: newActivity.contractor || '',
                                            riskLevel: newActivity.riskLevel || 'medium'
                                        };
                                        
                                        setActivities([...activities, activityToAdd]);
                                        setShowAddForm(false);
                                        setNewActivity({});
                                    }
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Agregar Actividad
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CriticalPathAnalysis;