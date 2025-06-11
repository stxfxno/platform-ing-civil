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
    const [selectedView, setSelectedView] = useState<'calendar' | 'timeline'>('calendar');
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedType, setSelectedType] = useState<string>('all');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        type: 'milestone' as ImportantDate['type'],
        priority: 'medium' as ImportantDate['priority'],
        assignedTo: '',
        location: '',
        notificationEnabled: true,
        notificationAdvance: 3
    });

    // Make importantDates a state so we can add to it
    const [importantDates, setImportantDates] = useState<ImportantDate[]>([
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
    ]);

    // Add new date function
    const addNewDate = () => {
        if (formData.title && formData.date) {
            const newDate: ImportantDate = {
                id: `date-${Date.now()}`,
                title: formData.title,
                description: formData.description,
                date: formData.date,
                type: formData.type,
                status: 'upcoming',
                priority: formData.priority,
                assignedTo: formData.assignedTo,
                location: formData.location,
                relatedActivities: [],
                notifications: {
                    enabled: formData.notificationEnabled,
                    advance: formData.notificationAdvance,
                    recipients: []
                }
            };
            
            setImportantDates([...importantDates, newDate]);
            setShowAddForm(false);
            setShowSuccessMessage(true);
            
            // Reset form
            setFormData({
                title: '',
                description: '',
                date: '',
                type: 'milestone',
                priority: 'medium',
                assignedTo: '',
                location: '',
                notificationEnabled: true,
                notificationAdvance: 3
            });
            
            setTimeout(() => setShowSuccessMessage(false), 3000);
        }
    };

    const cancelAddForm = () => {
        setShowAddForm(false);
        setFormData({
            title: '',
            description: '',
            date: '',
            type: 'milestone',
            priority: 'medium',
            assignedTo: '',
            location: '',
            notificationEnabled: true,
            notificationAdvance: 3
        });
    };

    const dateTypes = [
        { value: 'all', label: 'Todas las Fechas', icon: Calendar },
        { value: 'milestone', label: 'Hitos', icon: Target },
        { value: 'deadline', label: 'Fechas Límite', icon: Clock },
        { value: 'inspection', label: 'Inspecciones', icon: CheckCircle },
        { value: 'delivery', label: 'Entregas', icon: FileText },
        { value: 'meeting', label: 'Reuniones', icon: Users },
        { value: 'permit', label: 'Permisos', icon: Star }
    ];

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

    const getDaysUntil = (dateString: string) => {
        const today = new Date();
        const targetDate = new Date(dateString);
        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Funciones para navegación de calendario
    const goToPreviousMonth = () => {
        setSelectedMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() - 1);
            return newDate;
        });
    };

    const goToNextMonth = () => {
        setSelectedMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + 1);
            return newDate;
        });
    };

    // Función para generar días del calendario
    const generateCalendarDays = () => {
        const year = selectedMonth.getFullYear();
        const month = selectedMonth.getMonth();
        
        // Primer día del mes
        const firstDay = new Date(year, month, 1);
        // Último día del mes
        const lastDay = new Date(year, month + 1, 0);
        // Día de la semana del primer día (0 = domingo, 1 = lunes, etc.)
        const startingDayOfWeek = firstDay.getDay();
        // Total de días en el mes
        const daysInMonth = lastDay.getDate();
        
        const days = [];
        
        // Agregar días vacíos del mes anterior
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        
        // Agregar días del mes actual
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }
        
        // Completar la grilla con días del siguiente mes si es necesario
        while (days.length < 42) { // 6 semanas * 7 días
            days.push(null);
        }
        
        return days;
    };

    const filteredDates = importantDates.filter(date =>
        selectedType === 'all' || date.type === selectedType
    );

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
                        <div className="text-sm text-gray-500 mb-1">
                            {new Date().toLocaleDateString('es-ES', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </div>
                        <p className="text-gray-600">Monitoreo de hitos, fechas límite e inspecciones críticas</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Fecha
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
                            <p className="text-sm font-medium text-gray-600">Actividades Críticas</p>
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
                            <p className="text-sm font-medium text-gray-600">Actividades Altas</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {filteredDates.filter(date => date.type === 'milestone').length}
                            </p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Target className="w-6 h-6 text-green-600" />
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
                        <button 
                            onClick={goToPreviousMonth}
                            className="p-2 text-gray-400 hover:text-gray-600"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium text-gray-900">
                            {selectedMonth.toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })}
                        </span>
                        <button 
                            onClick={goToNextMonth}
                            className="p-2 text-gray-400 hover:text-gray-600"
                        >
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
                        {generateCalendarDays().map((day, i) => {
                            const year = selectedMonth.getFullYear();
                            const month = selectedMonth.getMonth();
                            const isCurrentMonth = day !== null;
                            const currentDate = day ? 
                                `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` 
                                : '';
                            const dayEvents = isCurrentMonth ? 
                                filteredDates.filter(date => date.date === currentDate) : [];

                            return (
                                <div
                                    key={i}
                                    className={`h-32 border border-gray-200 p-2 ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                                        }`}
                                >
                                    {isCurrentMonth && day && (
                                        <>
                                            <div className={`text-sm mb-2 ${dayEvents.length > 0 ? 'font-semibold text-blue-600' : 'text-gray-600'}`}>
                                                {day}
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

            {/* Complete Add Date Form */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Agregar Nueva Fecha Importante</h3>
                        <div className="space-y-4">
                            {/* Título */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Ej: Entrega Final Submittals HVAC"
                                    required
                                />
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Descripción detallada de la actividad o fecha importante"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Fecha */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fecha *
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                {/* Tipo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipo *
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({...formData, type: e.target.value as ImportantDate['type']})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    >
                                        <option value="milestone">Hito</option>
                                        <option value="deadline">Fecha Límite</option>
                                        <option value="inspection">Inspección</option>
                                        <option value="delivery">Entrega</option>
                                        <option value="meeting">Reunión</option>
                                        <option value="permit">Permiso</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Prioridad */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Prioridad
                                    </label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({...formData, priority: e.target.value as ImportantDate['priority']})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="low">Baja</option>
                                        <option value="medium">Media</option>
                                        <option value="high">Alta</option>
                                        <option value="critical">Crítica</option>
                                    </select>
                                </div>

                                {/* Responsable */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Responsable
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.assignedTo}
                                        onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Ej: HVAC Solutions S.A.C."
                                    />
                                </div>
                            </div>

                            {/* Ubicación */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ubicación
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Ej: Oficina de Proyecto, Sótano Principal"
                                />
                            </div>

                            {/* Configuración de Notificaciones */}
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Configuración de Notificaciones</h4>
                                
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Habilitar notificaciones</p>
                                        <p className="text-xs text-gray-500">Recibir recordatorios antes de la fecha</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={formData.notificationEnabled}
                                            onChange={(e) => setFormData({...formData, notificationEnabled: e.target.checked})}
                                            className="sr-only peer" 
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                    </label>
                                </div>

                                {formData.notificationEnabled && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Días de anticipación
                                        </label>
                                        <select
                                            value={formData.notificationAdvance}
                                            onChange={(e) => setFormData({...formData, notificationAdvance: parseInt(e.target.value)})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value={1}>1 día antes</option>
                                            <option value={3}>3 días antes</option>
                                            <option value={5}>5 días antes</option>
                                            <option value={7}>7 días antes</option>
                                            <option value={15}>15 días antes</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-3 pt-6 border-t">
                                <button
                                    onClick={cancelAddForm}
                                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={addNewDate}
                                    disabled={!formData.title || !formData.date}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                >
                                    Agregar Fecha
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Fecha agregada
                </div>
            )}
        </div>
    );
};

export default ImportantDatesTracking;