// src/pages/schedules/ImportantDatesTracking.tsx
import React, { useState } from 'react';
import {
    Calendar,
    AlertTriangle,
    CheckCircle,
    Clock,
    Target,
    Bell,
    Plus,
    Filter,
    Download,
    ChevronLeft,
    ChevronRight,
    Users,
    FileText,
    MapPin,
    Star
} from 'lucide-react';

interface ImportantDate {
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'milestone' | 'deadline' | 'inspection' | 'delivery' | 'meeting' | 'permit';
    status: 'upcoming' | 'today' | 'completed' | 'missed' | 'at_risk';
    priority: 'low' | 'medium' | 'high' | 'critical';
    assignedTo: string;
    location?: string;
    relatedActivities: string[];
    notifications: NotificationSetting;
    attachments?: string[];
    contractor?: string;
}

interface NotificationSetting {
    enabled: boolean;
    advance: number; // días de anticipación
    recipients: string[];
}

const ImportantDatesTracking: React.FC = () => {
    const [selectedView, setSelectedView] = useState<'calendar' | 'list' | 'timeline'>('calendar');
    const [selectedMonth,] = useState(new Date()); //setSelectedMonth
    const [selectedType, setSelectedType] = useState<string>('all');
    const [, setShowAddModal] = useState(false); //showAddModal

    const importantDates: ImportantDate[] = [
        {
            id: 'date-001',
            title: 'Entrega Final Submittals HVAC',
            description: 'Entrega de todos los submittals del sistema HVAC para aprobación final',
            date: '2025-05-28',
            type: 'deadline',
            status: 'upcoming',
            priority: 'critical',
            assignedTo: 'HVAC Solutions S.A.C.',
            location: 'Oficina de Proyecto',
            relatedActivities: ['hvac-001', 'hvac-002', 'hvac-003'],
            notifications: {
                enabled: true,
                advance: 7,
                recipients: ['ing-luis-torres', 'coordinator-01']
            },
            attachments: ['checklist-submittals.pdf'],
            contractor: 'HVAC Solutions S.A.C.'
        },
        {
            id: 'date-002',
            title: 'Inspección Eléctrica - Tableros Principales',
            description: 'Inspección oficial de tableros eléctricos principales por parte de autoridades competentes',
            date: '2025-06-02',
            type: 'inspection',
            status: 'upcoming',
            priority: 'high',
            assignedTo: 'Ing. María González',
            location: 'Subestación Principal, Sótano',
            relatedActivities: ['elec-001', 'elec-002'],
            notifications: {
                enabled: true,
                advance: 3,
                recipients: ['ing-maria-gonzalez', 'inspector-municipal']
            },
            contractor: 'Electro Instalaciones Perú'
        },
        {
            id: 'date-003',
            title: 'Entrega Equipos Principales HVAC',
            description: 'Llegada y descarga de unidades manejadoras de aire y chillers principales',
            date: '2025-06-05',
            type: 'delivery',
            status: 'upcoming',
            priority: 'critical',
            assignedTo: 'Coordinador de Obra',
            location: 'Área de Descarga - Sótano',
            relatedActivities: ['hvac-004', 'hvac-005'],
            notifications: {
                enabled: true,
                advance: 1,
                recipients: ['coordinator-01', 'hvac-team-lead']
            },
            contractor: 'HVAC Solutions S.A.C.'
        },
        {
            id: 'date-004',
            title: 'Hito: Finalización Fase MEP Sótano',
            description: 'Completar todas las instalaciones MEP del nivel sótano',
            date: '2025-06-15',
            type: 'milestone',
            status: 'upcoming',
            priority: 'critical',
            assignedTo: 'Jefe de Proyecto',
            location: 'Sótano - Todas las áreas',
            relatedActivities: ['hvac-001', 'elec-001', 'plumb-001', 'fire-001'],
            notifications: {
                enabled: true,
                advance: 5,
                recipients: ['project-manager', 'all-coordinators']
            }
        },
        {
            id: 'date-005',
            title: 'Reunión de Coordinación Semanal',
            description: 'Reunión semanal de coordinación con todos los subcontratistas MEP',
            date: '2025-05-30',
            type: 'meeting',
            status: 'upcoming',
            priority: 'medium',
            assignedTo: 'Coordinador General',
            location: 'Sala de Reuniones - Oficina Temporal',
            relatedActivities: [],
            notifications: {
                enabled: true,
                advance: 1,
                recipients: ['all-contractors', 'coordination-team']
            }
        },
        {
            id: 'date-006',
            title: 'Vencimiento Permiso de Construcción',
            description: 'Renovación requerida del permiso de construcción municipal',
            date: '2025-07-01',
            type: 'permit',
            status: 'upcoming',
            priority: 'high',
            assignedTo: 'Departamento Legal',
            location: 'Municipalidad',
            relatedActivities: [],
            notifications: {
                enabled: true,
                advance: 15,
                recipients: ['legal-department', 'project-manager']
            }
        }
    ];

    const dateTypes = [
        { value: 'all', label: 'Todas las Fechas', icon: Calendar },
        { value: 'milestone', label: 'Hitos', icon: Target },
        { value: 'deadline', label: 'Fechas Límite', icon: Clock },
        { value: 'inspection', label: 'Inspecciones', icon: CheckCircle },
        { value: 'delivery', label: 'Entregas', icon: FileText },
        { value: 'meeting', label: 'Reuniones', icon: Users },
        { value: 'permit', label: 'Permisos', icon: Star }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-50 border-green-200';
            case 'today': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'upcoming': return 'text-gray-600 bg-gray-50 border-gray-200';
            case 'at_risk': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'missed': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'text-red-600 bg-red-100';
            case 'high': return 'text-orange-600 bg-orange-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'milestone': return <Target className="w-4 h-4" />;
            case 'deadline': return <Clock className="w-4 h-4" />;
            case 'inspection': return <CheckCircle className="w-4 h-4" />;
            case 'delivery': return <FileText className="w-4 h-4" />;
            case 'meeting': return <Users className="w-4 h-4" />;
            case 'permit': return <Star className="w-4 h-4" />;
            default: return <Calendar className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatDateLong = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const getDaysUntil = (dateString: string) => {
        const today = new Date();
        const targetDate = new Date(dateString);
        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredDates = importantDates.filter(date =>
        selectedType === 'all' || date.type === selectedType
    );

    const upcomingDates = filteredDates
        .filter(date => date.status === 'upcoming' || date.status === 'today')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const criticalDates = filteredDates.filter(date =>
        date.priority === 'critical' && (date.status === 'upcoming' || date.status === 'today')
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-500 rounded-lg">
                        <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Seguimiento de Fechas Importantes</h1>
                        <p className="text-gray-600">Monitoreo de hitos, fechas límite e inspecciones críticas</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Fecha
                    </button>
                    <button className="flex items-center px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Bell className="w-4 h-4 mr-2" />
                        Notificaciones
                    </button>
                    <button className="flex items-center px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Próximas 7 Días</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {upcomingDates.filter(date => getDaysUntil(date.date) <= 7).length}
                            </p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Fechas Críticas</p>
                            <p className="text-3xl font-bold text-gray-900">{criticalDates.length}</p>
                        </div>
                        <div className="p-3 bg-red-100 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Hitos del Mes</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {filteredDates.filter(date => date.type === 'milestone').length}
                            </p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Target className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Inspecciones</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {filteredDates.filter(date => date.type === 'inspection').length}
                            </p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-yellow-600" />
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
                                onClick={() => setSelectedView('calendar')}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${selectedView === 'calendar'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Calendario
                            </button>
                            <button
                                onClick={() => setSelectedView('list')}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${selectedView === 'list'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Lista
                            </button>
                            <button
                                onClick={() => setSelectedView('timeline')}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${selectedView === 'timeline'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Timeline
                            </button>
                        </div>

                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        >
                            {dateTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium text-gray-900">
                            {selectedMonth.toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })}
                        </span>
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

            {/* Calendar View */}
            {selectedView === 'calendar' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Vista de Calendario</h2>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                            <div key={day} className="text-center text-sm font-medium text-gray-500 py-3">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 35 }, (_, i) => {
                            const dayNumber = i - 2; // Ajustar para empezar en el día correcto
                            const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
                            const currentDate = `2025-05-${dayNumber.toString().padStart(2, '0')}`;
                            const dayEvents = filteredDates.filter(date => date.date === currentDate);

                            return (
                                <div
                                    key={i}
                                    className={`h-32 border border-gray-200 p-2 ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                                        }`}
                                >
                                    {isCurrentMonth && (
                                        <>
                                            <div className={`text-sm mb-2 ${dayEvents.length > 0 ? 'font-semibold' : 'text-gray-600'}`}>
                                                {dayNumber}
                                            </div>
                                            <div className="space-y-1">
                                                {dayEvents.slice(0, 2).map((event, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`p-1 rounded text-xs truncate ${event.priority === 'critical' ? 'bg-red-100 text-red-700' :
                                                                event.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                                                    'bg-blue-100 text-blue-700'
                                                            }`}
                                                        title={event.title}
                                                    >
                                                        <div className="flex items-center">
                                                            {getTypeIcon(event.type)}
                                                            <span className="ml-1 truncate">{event.title}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                                {dayEvents.length > 2 && (
                                                    <div className="text-xs text-gray-500">
                                                        +{dayEvents.length - 2} más
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* List View */}
            {selectedView === 'list' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Lista de Fechas Importantes</h2>

                    <div className="space-y-4">
                        {filteredDates
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            .map((date) => (
                                <div key={date.id} className={`border rounded-lg p-4 ${getStatusColor(date.status)}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <div className={`p-2 rounded-lg ${getPriorityColor(date.priority)}`}>
                                                    {getTypeIcon(date.type)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{date.title}</h3>
                                                    <p className="text-sm text-gray-600">{date.description}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    <span>{formatDateLong(date.date)}</span>
                                                </div>
                                                {date.location && (
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <MapPin className="w-4 h-4 mr-2" />
                                                        <span>{date.location}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Users className="w-4 h-4 mr-2" />
                                                    <span>{date.assignedTo}</span>
                                                </div>
                                            </div>

                                            {date.relatedActivities.length > 0 && (
                                                <div className="mt-3 flex items-center">
                                                    <span className="text-sm text-gray-500 mr-2">Actividades relacionadas:</span>
                                                    <span className="text-sm font-medium text-blue-600">
                                                        {date.relatedActivities.length} actividades
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-right ml-4">
                                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(date.priority)}`}>
                                                {date.priority === 'critical' ? 'CRÍTICO' :
                                                    date.priority === 'high' ? 'ALTO' :
                                                        date.priority === 'medium' ? 'MEDIO' : 'BAJO'}
                                            </span>
                                            <div className="mt-2 text-sm text-gray-500">
                                                {getDaysUntil(date.date) >= 0
                                                    ? `${getDaysUntil(date.date)} días restantes`
                                                    : `${Math.abs(getDaysUntil(date.date))} días de retraso`
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* Timeline View */}
            {selectedView === 'timeline' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline de Fechas</h2>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                        <div className="space-y-8">
                            {filteredDates
                                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                .map((date) => (
                                    <div key={date.id} className="relative flex items-start">
                                        <div className={`absolute left-6 w-4 h-4 rounded-full border-2 border-white z-10 ${date.priority === 'critical' ? 'bg-red-500' :
                                                date.priority === 'high' ? 'bg-orange-500' :
                                                    date.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}></div>

                                        <div className="ml-16 flex-1">
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center space-x-2">
                                                        {getTypeIcon(date.type)}
                                                        <h3 className="font-medium text-gray-900">{date.title}</h3>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(date.priority)}`}>
                                                        {date.priority.toUpperCase()}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-gray-600 mb-3">{date.description}</p>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center">
                                                            <Calendar className="w-4 h-4 mr-2" />
                                                            <span>{formatDate(date.date)}</span>
                                                        </div>
                                                        {date.location && (
                                                            <div className="flex items-center">
                                                                <MapPin className="w-4 h-4 mr-2" />
                                                                <span>{date.location}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center">
                                                            <Users className="w-4 h-4 mr-2" />
                                                            <span>{date.assignedTo}</span>
                                                        </div>
                                                        {date.notifications.enabled && (
                                                            <div className="flex items-center">
                                                                <Bell className="w-4 h-4 mr-2" />
                                                                <span>Notificación {date.notifications.advance} días antes</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Critical Dates Alert */}
            {criticalDates.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                        <h3 className="text-lg font-semibold text-red-900">Fechas Críticas Próximas</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {criticalDates.slice(0, 4).map((date) => (
                            <div key={date.id} className="bg-white rounded-lg p-4 border border-red-200">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900">{date.title}</h4>
                                    <span className="text-sm font-medium text-red-600">
                                        {getDaysUntil(date.date)} días
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{date.description.substring(0, 100)}...</p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{formatDate(date.date)}</span>
                                    <span>{date.assignedTo}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Notifications Panel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Centro de Notificaciones</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium text-gray-900 mb-3">Recordatorios Activos</h3>
                        <div className="space-y-3">
                            {importantDates
                                .filter(date => date.notifications.enabled && getDaysUntil(date.date) <= date.notifications.advance)
                                .slice(0, 3)
                                .map((date) => (
                                    <div key={date.id} className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <Bell className="w-4 h-4 text-blue-600 mr-3" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-blue-900">{date.title}</p>
                                            <p className="text-xs text-blue-700">
                                                {getDaysUntil(date.date)} días restantes - {formatDate(date.date)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-900 mb-3">Configuración de Alertas</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Email automático</p>
                                    <p className="text-xs text-gray-600">Enviar recordatorios por email</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Notificaciones push</p>
                                    <p className="text-xs text-gray-600">Alertas en tiempo real</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Resumen semanal</p>
                                    <p className="text-xs text-gray-600">Reporte de fechas próximas</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportantDatesTracking;