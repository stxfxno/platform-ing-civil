// src/pages/schedules/ProjectOverview.tsx
import React, { useState } from 'react';
import { 
    BarChart3, 
    Calendar, 
    TrendingUp, 
    AlertTriangle,
    CheckCircle,
    Clock,
    Users,
    Target,
    Filter,
    Download,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

interface Activity {
    id: string;
    name: string;
    discipline: string;
    startDate: string;
    endDate: string;
    progress: number;
    status: 'completed' | 'in_progress' | 'not_started' | 'delayed';
    contractor: string;
    isCritical: boolean;
}

const ProjectOverview: React.FC = () => {
    const [selectedView, setSelectedView] = useState<'gantt' | 'calendar'>('gantt');
    const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');

    const activities: Activity[] = [
        {
            id: 'act-001',
            name: 'Instalación ductos HVAC - Área A',
            discipline: 'HVAC',
            startDate: '2025-06-01',
            endDate: '2025-06-12',
            progress: 85,
            status: 'in_progress',
            contractor: 'HVAC Solutions S.A.C.',
            isCritical: true
        },
        {
            id: 'act-002',
            name: 'Cableado eléctrico - Pisos 1-3',
            discipline: 'Eléctrico',
            startDate: '2025-05-25',
            endDate: '2025-06-08',
            progress: 65,
            status: 'in_progress',
            contractor: 'Electro Instalaciones Perú',
            isCritical: false
        },
        {
            id: 'act-003',
            name: 'Tuberías agua fría - Sótano',
            discipline: 'Plomería',
            startDate: '2025-05-20',
            endDate: '2025-06-05',
            progress: 45,
            status: 'delayed',
            contractor: 'Plomería Industrial SAC',
            isCritical: true
        },
        {
            id: 'act-004',
            name: 'Sistema contra incendios - Nivel 1',
            discipline: 'Protección Contra Incendios',
            startDate: '2025-06-10',
            endDate: '2025-06-25',
            progress: 0,
            status: 'not_started',
            contractor: 'Fire Protection Corp.',
            isCritical: false
        },
        {
            id: 'act-005',
            name: 'Tableros eléctricos principales',
            discipline: 'Eléctrico',
            startDate: '2025-06-15',
            endDate: '2025-06-30',
            progress: 0,
            status: 'not_started',
            contractor: 'Electro Instalaciones Perú',
            isCritical: true
        }
    ];

    const disciplines = [
        { value: 'all', label: 'Todas las Disciplinas' },
        { value: 'hvac', label: 'HVAC' },
        { value: 'eléctrico', label: 'Eléctrico' },
        { value: 'plomería', label: 'Plomería' },
        { value: 'protección contra incendios', label: 'Protección Contra Incendios' }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-500';
            case 'in_progress': return 'bg-blue-500';
            case 'delayed': return 'bg-red-500';
            case 'not_started': return 'bg-gray-300';
            default: return 'bg-gray-300';
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-50';
            case 'in_progress': return 'text-blue-600 bg-blue-50';
            case 'delayed': return 'text-red-600 bg-red-50';
            case 'not_started': return 'text-gray-600 bg-gray-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', { 
            day: '2-digit', 
            month: '2-digit'
        });
    };

    const calculateProjectProgress = () => {
        const totalProgress = activities.reduce((sum, activity) => sum + activity.progress, 0);
        return Math.round(totalProgress / activities.length);
    };

    const filteredActivities = activities.filter(activity => 
        selectedDiscipline === 'all' || activity.discipline.toLowerCase() === selectedDiscipline
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-500 rounded-lg">
                        <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Visualización General del Proyecto</h1>
                        <p className="text-gray-600">Vista integral del cronograma y progreso del proyecto MEP</p>
                    </div>
                </div>
                
                <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Progreso General</p>
                            <p className="text-3xl font-bold text-gray-900">{calculateProjectProgress()}%</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${calculateProjectProgress()}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setSelectedView('gantt')}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                    selectedView === 'gantt' 
                                        ? 'bg-white text-gray-900 shadow-sm' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Gantt
                            </button>
                            <button
                                onClick={() => setSelectedView('calendar')}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                    selectedView === 'calendar' 
                                        ? 'bg-white text-gray-900 shadow-sm' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Calendario
                            </button>
                        </div>

                        <select 
                            value={selectedDiscipline}
                            onChange={(e) => setSelectedDiscipline(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        >
                            {disciplines.map(discipline => (
                                <option key={discipline.value} value={discipline.value}>
                                    {discipline.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium text-gray-900">Mayo 2025</span>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <button className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                            <Filter className="w-4 h-4 mr-2" />
                            Filtros
                        </button>
                    </div>
                </div>
            </div>

            {/* Gantt Chart View */}
            {selectedView === 'gantt' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Diagrama de Gantt</h2>
                    
                    <div className="space-y-4">
                        {filteredActivities.map((activity) => (
                            <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <h4 className="text-md font-medium text-gray-900">{activity.name}</h4>
                                            {activity.isCritical && (
                                                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded">
                                                    Crítica
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                            <span>{activity.discipline}</span>
                                            <span>•</span>
                                            <span>{activity.contractor}</span>
                                            <span>•</span>
                                            <span>{formatDate(activity.startDate)} - {formatDate(activity.endDate)}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-3 py-1 text-sm font-medium rounded ${getStatusTextColor(activity.status)}`}>
                                            {activity.status === 'completed' ? 'Completada' :
                                             activity.status === 'in_progress' ? 'En Progreso' :
                                             activity.status === 'delayed' ? 'Retrasada' : 'No Iniciada'}
                                        </span>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-gray-900">{activity.progress}%</div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div 
                                        className={`h-4 rounded-full transition-all duration-300 ${getStatusColor(activity.status)}`}
                                        style={{ width: `${activity.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Calendar View */}
            {selectedView === 'calendar' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Vista de Calendario</h2>
                    
                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                {day}
                            </div>
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 35 }, (_, i) => {
                            const dayNumber = i - 2;
                            const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
                            const hasActivity = isCurrentMonth && [1, 5, 10, 15, 20, 25, 30].includes(dayNumber);
                            
                            return (
                                <div 
                                    key={i} 
                                    className={`h-24 border border-gray-200 p-2 ${
                                        isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                                    }`}
                                >
                                    {isCurrentMonth && (
                                        <>
                                            <div className={`text-sm ${hasActivity ? 'font-semibold' : 'text-gray-600'}`}>
                                                {dayNumber}
                                            </div>
                                            {hasActivity && (
                                                <div className="mt-1 space-y-1">
                                                    <div className="w-full h-2 bg-blue-500 rounded"></div>
                                                    <div className="text-xs text-blue-600 truncate">
                                                        Actividad MEP
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Performance by Discipline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento por Disciplina</h2>
                    
                    <div className="space-y-4">
                        {[
                            { name: 'HVAC', progress: 85, status: 'on_track', color: 'bg-green-500' },
                            { name: 'Eléctrico', progress: 65, status: 'on_track', color: 'bg-blue-500' },
                            { name: 'Plomería', progress: 45, status: 'delayed', color: 'bg-red-500' },
                            { name: 'Protección Contra Incendios', progress: 20, status: 'not_started', color: 'bg-gray-400' }
                        ].map((discipline, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">{discipline.name}</span>
                                    <span className="text-sm font-medium text-gray-900">{discipline.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className={`h-3 rounded-full transition-all duration-300 ${discipline.color}`}
                                        style={{ width: `${discipline.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Recursos</h2>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-blue-600">8</p>
                            <p className="text-sm text-gray-600">Equipos Activos</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-green-600">1,240</p>
                            <p className="text-sm text-gray-600">Horas Trabajadas</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[
                            { team: 'Equipo HVAC Principal', members: 4, utilization: 95, color: 'bg-green-100 text-green-800' },
                            { team: 'Equipo Eléctrico A', members: 3, utilization: 80, color: 'bg-blue-100 text-blue-800' },
                            { team: 'Equipo Plomería A', members: 3, utilization: 60, color: 'bg-yellow-100 text-yellow-800' }
                        ].map((team, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">{team.team}</h4>
                                    <p className="text-xs text-gray-500">{team.members} miembros</p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-2 py-1 text-xs font-medium rounded ${team.color}`}>
                                        {team.utilization}%
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                        <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Generar Reporte</span>
                    </button>
                    <button className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                        <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Ver Calendario</span>
                    </button>
                    <button className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                        <AlertTriangle className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Analizar Riesgos</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;