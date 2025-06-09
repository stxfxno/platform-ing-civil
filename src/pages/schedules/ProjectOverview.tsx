// src/pages/schedules/ProjectOverview.tsx
import React, { useState } from 'react';
import { 
    BarChart3, 
    Calendar, 
    AlertTriangle,
    CheckCircle,
    Clock,
    Target,
    Filter,
    ChevronLeft,
    ChevronRight,
    Edit2,
    Save,
    X
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
    hoursWorked?: number;
    estimatedHours?: number;
}

interface MonthlyProgress {
    month: string;
    year: number;
    contractor: string;
    hoursWorked: number;
    progressPercentage: number;
    activitiesCompleted: number;
}

interface ContractorSummary {
    name: string;
    totalHours: number;
    estimatedHours: number;
    activitiesCount: number;
    completedActivities: number;
    averageProgress: number;
    disciplines: Set<string>;
}

const ProjectOverview: React.FC = () => {
    const [selectedView, setSelectedView] = useState<'gantt' | 'calendar'>('gantt');
    const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [editingActivity, setEditingActivity] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<Partial<Activity>>({});
    const [activitiesData, setActivitiesData] = useState<Activity[]>([
        {
            id: 'act-001',
            name: 'Instalación ductos HVAC - Área A',
            discipline: 'HVAC',
            startDate: '2025-06-01',
            endDate: '2025-06-08',
            progress: 100,
            status: 'completed',
            contractor: 'Electro Instalaciones Perú',
            isCritical: true,
            hoursWorked: 120,
            estimatedHours: 120
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
            isCritical: false,
            hoursWorked: 78,
            estimatedHours: 120
        },
        {
            id: 'act-003',
            name: 'Tuberías agua fría - Sótano',
            discipline: 'Plomería',
            startDate: '2025-05-20',
            endDate: '2025-06-05',
            progress: 10,
            status: 'delayed',
            contractor: 'Plomería Industrial SAC',
            isCritical: true,
            hoursWorked: 16,
            estimatedHours: 160
        },
        {
            id: 'act-004',
            name: 'Mecanismos de protección - Área B',
            discipline: 'Protección de mecanismos',
            startDate: '2025-06-10',
            endDate: '2025-06-25',
            progress: 0,
            status: 'not_started',
            contractor: 'Mecanicas SAC',
            isCritical: false,
            hoursWorked: 0,
            estimatedHours: 200
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
            isCritical: true,
            hoursWorked: 0,
            estimatedHours: 80
        }
    ]);

    // Datos de progreso mensual por subcontrata (últimos 3 meses)
    const monthlyProgressData: MonthlyProgress[] = [
        // Abril 2025
        { month: 'Abril', year: 2025, contractor: 'HVAC Solutions S.A.C.', hoursWorked: 160, progressPercentage: 25, activitiesCompleted: 1 },
        { month: 'Abril', year: 2025, contractor: 'Electro Instalaciones Perú', hoursWorked: 120, progressPercentage: 20, activitiesCompleted: 0 },
        { month: 'Abril', year: 2025, contractor: 'Plomería Industrial SAC', hoursWorked: 80, progressPercentage: 15, activitiesCompleted: 0 },
        { month: 'Abril', year: 2025, contractor: 'Fire Protection Corp.', hoursWorked: 0, progressPercentage: 0, activitiesCompleted: 0 },
        
        // Mayo 2025
        { month: 'Mayo', year: 2025, contractor: 'HVAC Solutions S.A.C.', hoursWorked: 180, progressPercentage: 60, activitiesCompleted: 2 },
        { month: 'Mayo', year: 2025, contractor: 'Electro Instalaciones Perú', hoursWorked: 140, progressPercentage: 35, activitiesCompleted: 1 },
        { month: 'Mayo', year: 2025, contractor: 'Plomería Industrial SAC', hoursWorked: 120, progressPercentage: 25, activitiesCompleted: 0 },
        { month: 'Mayo', year: 2025, contractor: 'Fire Protection Corp.', hoursWorked: 40, progressPercentage: 5, activitiesCompleted: 0 },
        
        // Junio 2025
        { month: 'Junio', year: 2025, contractor: 'HVAC Solutions S.A.C.', hoursWorked: 120, progressPercentage: 100, activitiesCompleted: 1 },
        { month: 'Junio', year: 2025, contractor: 'Electro Instalaciones Perú', hoursWorked: 78, progressPercentage: 65, activitiesCompleted: 0 },
        { month: 'Junio', year: 2025, contractor: 'Plomería Industrial SAC', hoursWorked: 16, progressPercentage: 10, activitiesCompleted: 0 },
        { month: 'Junio', year: 2025, contractor: 'Fire Protection Corp.', hoursWorked: 0, progressPercentage: 0, activitiesCompleted: 0 },
    ];

    const activities: Activity[] = activitiesData;

    const disciplines = [
        'all',
        'HVAC',
        'Eléctrico',
        'Plomería',
        'Protección Contra Incendios'
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-500';
            case 'in_progress': return 'bg-blue-500';
            case 'delayed': return 'bg-red-500';
            case 'not_started': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600';
            case 'in_progress': return 'text-blue-600';
            case 'delayed': return 'text-red-600';
            case 'not_started': return 'text-gray-600';
            default: return 'text-gray-600';
        }
    };

    const formatDate = (dateString: string) => {
        const monthNames = [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ];
        const date = new Date(dateString);
        return `${date.getDate()} ${monthNames[date.getMonth()]}`;
    };

    const getCurrentDateString = () => {
        const monthNames = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        const weekDays = [
            'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
        ];
        const today = new Date();
        const dayName = weekDays[today.getDay()];
        const day = today.getDate();
        const monthName = monthNames[today.getMonth()];
        const year = today.getFullYear();
        
        return `${dayName}, ${day} de ${monthName} de ${year}`;
    };

    // Calendar grid helper functions
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const generateCalendarGrid = () => {
        const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
        const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
        const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
        
        const grid = [];
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            grid.push(null);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            grid.push(day);
        }
        
        // Add empty cells to complete the grid
        while (grid.length < totalCells) {
            grid.push(null);
        }
        
        return grid;
    };

    const getActivitiesForDay = (day: number) => {
        if (!day) return [];
        
        const targetDate = new Date(selectedYear, selectedMonth, day);
        return filteredActivities.filter(activity => {
            const startDate = new Date(activity.startDate);
            const endDate = new Date(activity.endDate);
            return targetDate >= startDate && targetDate <= endDate;
        });
    };

    const isToday = (day: number) => {
        if (!day) return false;
        const today = new Date();
        return (
            today.getDate() === day &&
            today.getMonth() === selectedMonth &&
            today.getFullYear() === selectedYear
        );
    };

    const calculateProjectProgress = () => {
        const totalProgress = activities.reduce((sum, activity) => sum + activity.progress, 0);
        return Math.round(totalProgress / activities.length);
    };

    const filteredActivities = activities.filter(activity =>
        selectedDiscipline === 'all' || activity.discipline.toLowerCase() === selectedDiscipline.toLowerCase()
    );

    const handleEditActivity = (activityId: string) => {
        const activity = activities.find(a => a.id === activityId);
        if (activity) {
            setEditingActivity(activityId);
            setEditValues(activity);
        }
    };

    const handleSaveActivity = () => {
        if (editingActivity && editValues) {
            setActivitiesData(prev => prev.map(activity => 
                activity.id === editingActivity 
                    ? { ...activity, ...editValues }
                    : activity
            ));
            setEditingActivity(null);
            setEditValues({});
        }
    };

    const handleCancelEdit = () => {
        setEditingActivity(null);
        setEditValues({});
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            if (selectedMonth === 0) {
                setSelectedMonth(11);
                setSelectedYear(prev => prev - 1);
            } else {
                setSelectedMonth(prev => prev - 1);
            }
        } else {
            if (selectedMonth === 11) {
                setSelectedMonth(0);
                setSelectedYear(prev => prev + 1);
            } else {
                setSelectedMonth(prev => prev + 1);
            }
        }
    };

    const getMonthName = (monthIndex: number) => {
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return monthNames[monthIndex];
    };

    const isActivityInCurrentMonth = (activity: Activity) => {
        const startDate = new Date(activity.startDate);
        const endDate = new Date(activity.endDate);
        const currentMonthStart = new Date(selectedYear, selectedMonth, 1);
        const currentMonthEnd = new Date(selectedYear, selectedMonth + 1, 0);
        
        return (startDate <= currentMonthEnd && endDate >= currentMonthStart);
    };

    const currentMonthActivities = filteredActivities.filter(isActivityInCurrentMonth);

    // Funciones para calcular datos de subcontratas
    const getContractorSummary = (): ContractorSummary[] => {
        const contractors = activities.reduce((acc, activity) => {
            if (!acc[activity.contractor]) {
                acc[activity.contractor] = {
                    name: activity.contractor,
                    totalHours: 0,
                    estimatedHours: 0,
                    activitiesCount: 0,
                    completedActivities: 0,
                    averageProgress: 0,
                    disciplines: new Set<string>()
                };
            }
            
            acc[activity.contractor].totalHours += activity.hoursWorked || 0;
            acc[activity.contractor].estimatedHours += activity.estimatedHours || 0;
            acc[activity.contractor].activitiesCount += 1;
            acc[activity.contractor].disciplines.add(activity.discipline);
            
            if (activity.status === 'completed') {
                acc[activity.contractor].completedActivities += 1;
            }
            
            return acc;
        }, {} as Record<string, ContractorSummary>);

        // Calcular progreso promedio
        Object.keys(contractors).forEach(contractor => {
            const contractorActivities = activities.filter(a => a.contractor === contractor);
            const totalProgress = contractorActivities.reduce((sum, a) => sum + a.progress, 0);
            contractors[contractor].averageProgress = Math.round(totalProgress / contractorActivities.length);
        });

        return Object.values(contractors);
    };

    const getMonthlyHoursByContractor = () => {
        const months = ['Abril', 'Mayo', 'Junio'];
        const contractors = Array.from(new Set(activities.map(a => a.contractor)));
        
        return months.map(month => ({
            month,
            data: contractors.map(contractor => {
                const monthData = monthlyProgressData.find(
                    mp => mp.month === month && mp.contractor === contractor
                );
                return {
                    contractor,
                    hours: monthData?.hoursWorked || 0,
                    progress: monthData?.progressPercentage || 0
                };
            })
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="space-y-6">
                {/* Header with Current Date */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                            <BarChart3 className="w-7 h-7 text-blue-600 ml-3" />
                            Vista General del Proyecto
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            <Calendar className="inline w-4 h-4 mr-1" />
                            {getCurrentDateString()}
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setSelectedView('gantt')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedView === 'gantt'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <BarChart3 className="w-4 h-4 inline mr-2" />
                            Gantt
                        </button>
                        <button
                            onClick={() => setSelectedView('calendar')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedView === 'calendar'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Calendario
                        </button>
                    </div>
                </div>
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <Target className="h-8 w-8 text-blue-600" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Progreso General</p>
                                <p className="text-2xl font-bold text-gray-900">{calculateProjectProgress()}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Actividades Completadas</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {activities.filter(a => a.status === 'completed').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <Clock className="h-8 w-8 text-orange-600" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">En Progreso</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {activities.filter(a => a.status === 'in_progress').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <AlertTriangle className="h-8 w-8 text-red-600" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Retrasadas</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {activities.filter(a => a.status === 'delayed').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <Filter className="h-5 w-5 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">Filtros:</span>
                            <select
                                value={selectedDiscipline}
                                onChange={(e) => setSelectedDiscipline(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {disciplines.map(discipline => (
                                    <option key={discipline} value={discipline}>
                                        {discipline === 'all' ? 'Todas las disciplinas' : discipline}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Calendar View */}
                {selectedView === 'calendar' && (
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Vista de Calendario - {getMonthName(selectedMonth)} {selectedYear}
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => navigateMonth('prev')}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => navigateMonth('next')}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 mb-4">
                                {/* Day Headers */}
                                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                                    <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 border-b border-gray-200">
                                        {day}
                                    </div>
                                ))}
                                
                                {/* Calendar Days */}
                                {generateCalendarGrid().map((day, index) => {
                                    const dayActivities = day ? getActivitiesForDay(day) : [];
                                    const hasActivities = dayActivities.length > 0;
                                    const isTodayDate = day ? isToday(day) : false;
                                    
                                    return (
                                        <div 
                                            key={index} 
                                            className={`
                                                relative h-24 border border-gray-200 p-1 overflow-hidden
                                                ${day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'}
                                                ${isTodayDate ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                                            `}
                                        >
                                            {day && (
                                                <>
                                                    <div className={`
                                                        text-sm font-medium mb-1
                                                        ${isTodayDate ? 'text-blue-600' : 'text-gray-900'}
                                                    `}>
                                                        {day}
                                                    </div>
                                                    
                                                    {hasActivities && (
                                                        <div className="space-y-1">
                                                            {dayActivities.slice(0, 2).map(activity => (
                                                                <div 
                                                                    key={activity.id}
                                                                    className={`
                                                                        text-xs px-1 py-0.5 rounded truncate
                                                                        ${getStatusColor(activity.status)} text-white
                                                                    `}
                                                                    title={`${activity.name} - ${activity.contractor}`}
                                                                >
                                                                    {activity.name.length > 15 
                                                                        ? activity.name.substring(0, 15) + '...' 
                                                                        : activity.name
                                                                    }
                                                                </div>
                                                            ))}
                                                            
                                                            {dayActivities.length > 2 && (
                                                                <div className="text-xs text-gray-500 px-1">
                                                                    +{dayActivities.length - 2} más
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            
                            {/* Calendar Legend */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Leyenda</h3>
                                <div className="flex flex-wrap gap-4 text-xs">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                        <span>Completada</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                                        <span>En Progreso</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                                        <span>Retrasada</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-gray-500 rounded mr-2"></div>
                                        <span>No Iniciada</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-4 h-3 border-2 border-blue-500 rounded mr-2"></div>
                                        <span>Hoy</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Activity Summary for Current Month */}
                            {currentMonthActivities.length > 0 && (
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                                        Actividades en {getMonthName(selectedMonth)} {selectedYear} ({currentMonthActivities.length})
                                    </h3>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {currentMonthActivities.map(activity => (
                                            <div key={activity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                                                <div className="flex-1">
                                                    <span className="font-medium">{activity.name}</span>
                                                    <span className="text-gray-600 ml-2">({activity.discipline})</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusTextColor(activity.status)}`}>
                                                        {activity.status === 'completed' && 'Completada'}
                                                        {activity.status === 'in_progress' && 'En Progreso'}
                                                        {activity.status === 'delayed' && 'Retrasada'}
                                                        {activity.status === 'not_started' && 'No Iniciada'}
                                                    </span>
                                                    <span className="text-gray-600 text-xs">{activity.progress}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Gantt Chart View */}
                {selectedView === 'gantt' && (
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Cronograma de Actividades (Gantt)</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="min-w-full">
                                {/* Gantt Header */}
                                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b text-sm font-medium text-gray-700">
                                    <div className="col-span-4">Actividad</div>
                                    <div className="col-span-2">Contratista</div>
                                    <div className="col-span-2">Fechas</div>
                                    <div className="col-span-2">Progreso</div>
                                    <div className="col-span-1">Estado</div>
                                    <div className="col-span-1">Acciones</div>
                                </div>

                                {/* Gantt Rows */}
                                <div className="divide-y divide-gray-200">
                                    {filteredActivities.map(activity => (
                                        <div key={activity.id} className="px-6 py-4">
                                            {editingActivity === activity.id ? (
                                                // Edit Mode
                                                <div className="grid grid-cols-12 gap-4 items-center">
                                                    <div className="col-span-4">
                                                        <input
                                                            type="text"
                                                            value={editValues.name || activity.name}
                                                            onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <span className="text-sm text-gray-600">{activity.contractor}</span>
                                                    </div>
                                                    <div className="col-span-2 space-y-1">
                                                        <input
                                                            type="date"
                                                            value={editValues.startDate || activity.startDate}
                                                            onChange={(e) => setEditValues(prev => ({ ...prev, startDate: e.target.value }))}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        <input
                                                            type="date"
                                                            value={editValues.endDate || activity.endDate}
                                                            onChange={(e) => setEditValues(prev => ({ ...prev, endDate: e.target.value }))}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            value={editValues.progress !== undefined ? editValues.progress : activity.progress}
                                                            onChange={(e) => setEditValues(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                                                            className="w-full"
                                                        />
                                                        <span className="text-xs text-gray-600">
                                                            {editValues.progress !== undefined ? editValues.progress : activity.progress}%
                                                        </span>
                                                    </div>
                                                    <div className="col-span-1">
                                                        <select
                                                            value={editValues.status || activity.status}
                                                            onChange={(e) => setEditValues(prev => ({ ...prev, status: e.target.value as Activity['status'] }))}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="not_started">No Iniciada</option>
                                                            <option value="in_progress">En Progreso</option>
                                                            <option value="completed">Completada</option>
                                                            <option value="delayed">Retrasada</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-span-1 flex space-x-1">
                                                        <button
                                                            onClick={handleSaveActivity}
                                                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                // View Mode
                                                <div className="grid grid-cols-12 gap-4 items-center">
                                                    <div className="col-span-4">
                                                        <h3 className="font-medium text-gray-900">{activity.name}</h3>
                                                        <span className="text-sm text-gray-600">{activity.discipline}</span>
                                                        {activity.isCritical && (
                                                            <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                                                Crítica
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="col-span-2">
                                                        <span className="text-sm text-gray-600">{activity.contractor}</span>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <div className="text-sm text-gray-600">
                                                            <div>{formatDate(activity.startDate)} - {formatDate(activity.endDate)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                                                            <div
                                                                className={`h-3 rounded-full transition-all duration-300 ${getStatusColor(activity.status)}`}
                                                                style={{ width: `${activity.progress}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs text-gray-600">{activity.progress}%</span>
                                                    </div>
                                                    <div className="col-span-1">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusTextColor(activity.status)}`}>
                                                            {activity.status === 'completed' && 'Completada'}
                                                            {activity.status === 'in_progress' && 'En Progreso'}
                                                            {activity.status === 'delayed' && 'Retrasada'}
                                                            {activity.status === 'not_started' && 'No Iniciada'}
                                                        </span>
                                                    </div>
                                                    <div className="col-span-1">
                                                        <button
                                                            onClick={() => handleEditActivity(activity.id)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Editar actividad"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sección de Progreso por Subcontrata */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Progreso por Subcontrata</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {getContractorSummary().map((contractor: ContractorSummary) => (
                                <div key={contractor.name} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-medium text-gray-900">{contractor.name}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            contractor.averageProgress >= 80 ? 'bg-green-100 text-green-800' :
                                            contractor.averageProgress >= 50 ? 'bg-blue-100 text-blue-800' :
                                            contractor.averageProgress >= 25 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {contractor.averageProgress}% promedio
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Horas trabajadas:</span>
                                            <span className="font-medium">{contractor.totalHours}h</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Horas estimadas:</span>
                                            <span className="font-medium">{contractor.estimatedHours}h</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Actividades:</span>
                                            <span className="font-medium">{contractor.completedActivities}/{contractor.activitiesCount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Disciplinas:</span>
                                            <span className="font-medium">{contractor.disciplines.size}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Barra de progreso */}
                                    <div className="mt-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    contractor.averageProgress >= 80 ? 'bg-green-500' :
                                                    contractor.averageProgress >= 50 ? 'bg-blue-500' :
                                                    contractor.averageProgress >= 25 ? 'bg-yellow-500' :
                                                    'bg-red-500'
                                                }`}
                                                style={{ width: `${contractor.averageProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Vista Mensual de Progresos (3 meses) */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Progreso Mensual - Últimos 3 Meses</h2>
                    </div>
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Subcontrata</th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-900">Abril 2025</th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-900">Mayo 2025</th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-900">Junio 2025</th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-900">Tendencia</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {Array.from(new Set(activities.map(a => a.contractor))).map(contractor => {
                                        const monthlyData = getMonthlyHoursByContractor();
                                        const aprilData = monthlyData[0].data.find(d => d.contractor === contractor);
                                        const mayData = monthlyData[1].data.find(d => d.contractor === contractor);
                                        const juneData = monthlyData[2].data.find(d => d.contractor === contractor);
                                        
                                        const trend = juneData && mayData ? 
                                            (juneData.progress > mayData.progress ? '↗️' : 
                                             juneData.progress < mayData.progress ? '↘️' : '➡️') : '➡️';
                                        
                                        return (
                                            <tr key={contractor} className="hover:bg-gray-50">
                                                <td className="py-3 px-4 font-medium text-gray-900">
                                                    {contractor.length > 25 ? contractor.substring(0, 25) + '...' : contractor}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <div className="text-sm">
                                                        <div className="font-medium">{aprilData?.progress || 0}%</div>
                                                        <div className="text-gray-500">{aprilData?.hours || 0}h</div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <div className="text-sm">
                                                        <div className="font-medium">{mayData?.progress || 0}%</div>
                                                        <div className="text-gray-500">{mayData?.hours || 0}h</div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <div className="text-sm">
                                                        <div className="font-medium">{juneData?.progress || 0}%</div>
                                                        <div className="text-gray-500">{juneData?.hours || 0}h</div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-center text-xl">{trend}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Resumen de Horas Trabajadas */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Resumen de Horas Trabajadas</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {/* Totales generales */}
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <Clock className="h-8 w-8 text-blue-600" />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-600">Total Horas Trabajadas</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {activities.reduce((sum, a) => sum + (a.hoursWorked || 0), 0)}h
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-green-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <Target className="h-8 w-8 text-green-600" />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-600">Total Horas Estimadas</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {activities.reduce((sum, a) => sum + (a.estimatedHours || 0), 0)}h
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-yellow-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-600">Eficiencia General</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {Math.round((activities.reduce((sum, a) => sum + (a.hoursWorked || 0), 0) / 
                                                       activities.reduce((sum, a) => sum + (a.estimatedHours || 0), 0)) * 100) || 0}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-purple-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <CheckCircle className="h-8 w-8 text-purple-600" />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-600">Subcontratas Activas</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {Array.from(new Set(activities.map(a => a.contractor))).length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Horas mensuales por subcontrata */}
                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Horas Mensuales por Subcontrata</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Subcontrata</th>
                                            <th className="text-center py-3 px-4 font-medium text-gray-900">Abril</th>
                                            <th className="text-center py-3 px-4 font-medium text-gray-900">Mayo</th>
                                            <th className="text-center py-3 px-4 font-medium text-gray-900">Junio</th>
                                            <th className="text-center py-3 px-4 font-medium text-gray-900">Total</th>
                                            <th className="text-center py-3 px-4 font-medium text-gray-900">Promedio</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {Array.from(new Set(activities.map(a => a.contractor))).map(contractor => {
                                            const aprilHours = monthlyProgressData.find(m => m.month === 'Abril' && m.contractor === contractor)?.hoursWorked || 0;
                                            const mayHours = monthlyProgressData.find(m => m.month === 'Mayo' && m.contractor === contractor)?.hoursWorked || 0;
                                            const juneHours = monthlyProgressData.find(m => m.month === 'Junio' && m.contractor === contractor)?.hoursWorked || 0;
                                            const totalHours = aprilHours + mayHours + juneHours;
                                            const avgHours = Math.round(totalHours / 3);
                                            
                                            return (
                                                <tr key={contractor} className="hover:bg-gray-50">
                                                    <td className="py-3 px-4 font-medium text-gray-900">
                                                        {contractor.length > 30 ? contractor.substring(0, 30) + '...' : contractor}
                                                    </td>
                                                    <td className="py-3 px-4 text-center">{aprilHours}h</td>
                                                    <td className="py-3 px-4 text-center">{mayHours}h</td>
                                                    <td className="py-3 px-4 text-center">{juneHours}h</td>
                                                    <td className="py-3 px-4 text-center font-semibold">{totalHours}h</td>
                                                    <td className="py-3 px-4 text-center text-gray-600">{avgHours}h</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;
