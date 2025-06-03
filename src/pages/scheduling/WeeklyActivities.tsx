// src/pages/schedules/WeeklyActivities.tsx
import React, { useState, useEffect } from 'react';
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
    Activity,
    Edit,
    Copy,
    Trash2,
    Download,
    X,
    Save,
    Upload
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

interface ActivityTemplate {
    id: string;
    name: string;
    discipline: string;
    title: string;
    description: string;
    plannedHours: number;
    priority: string;
    equipment: string[];
    materials: string[];
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

const mockTemplates: ActivityTemplate[] = [
    {
        id: 'tmpl-001',
        name: 'Instalación HVAC Estándar',
        discipline: 'hvac',
        title: 'Instalación ductos HVAC',
        description: 'Instalación de ductos principales del sistema HVAC',
        plannedHours: 80,
        priority: 'high',
        equipment: ['Grúa pequeña', 'Herramientas ductos'],
        materials: ['Ductos galvanizados', 'Soportería', 'Tornillería']
    },
    {
        id: 'tmpl-002',
        name: 'Cableado Eléctrico Básico',
        discipline: 'electrical',
        title: 'Cableado eléctrico principal',
        description: 'Instalación del cableado eléctrico principal',
        plannedHours: 60,
        priority: 'medium',
        equipment: ['Escaleras', 'Herramientas eléctricas'],
        materials: ['Cable THW', 'Conduit EMT', 'Cajas eléctricas']
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

const STORAGE_KEY = 'weekly_activities_data';

const WeeklyActivities: React.FC = () => {

    

    const [activities, setActivities] = useState<WeeklyActivityData[]>(mockActivities);
    const [selectedWeek] = useState('2025-05-26/2025-06-01');
    const [filterDiscipline, setFilterDiscipline] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showDependenciesModal, setShowDependenciesModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showTemplatesModal, setShowTemplatesModal] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<WeeklyActivityData | null>(null);
    const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [editFormData, setEditFormData] = useState<Partial<WeeklyActivityData>>({});

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

    // Funciones para las nuevas funcionalidades
    const handleEditActivity = (activity: WeeklyActivityData) => {
        setSelectedActivity(activity);
        setEditFormData(activity);
        setShowEditModal(true);
        setActionMenuOpen(null);
    };

    const handleDuplicateActivity = (activity: WeeklyActivityData) => {
        setSelectedActivity(activity);
        setEditFormData({
            ...activity,
            id: `act-${Date.now()}`,
            activityId: `${activity.activityId}-COPY`,
            title: `${activity.title} (Copia)`,
            status: 'planned',
            progress: 0,
            actualHours: 0
        });
        setShowDuplicateModal(true);
        setActionMenuOpen(null);
    };


    const handleDeleteActivity = (activity: WeeklyActivityData) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar la actividad "${activity.title}"?`)) {
            const updatedActivities = activities.filter(a => a.id !== activity.id);
            setActivities(updatedActivities);
        }
        setActionMenuOpen(null);
    };

    const handleExportActivity = (activity: WeeklyActivityData) => {
        // Simular exportación a PDF
        alert(`Exportando actividad "${activity.title}" a PDF...`);
        setActionMenuOpen(null);
    };

    // Cargar datos del localStorage al montar el componente
    useEffect(() => {
        const savedActivities = localStorage.getItem(STORAGE_KEY);
        if (savedActivities) {
            try {
                const parsedActivities = JSON.parse(savedActivities);
                setActivities(parsedActivities);
            } catch (error) {
                console.error('Error parsing saved activities:', error);
                // Si hay error, usar datos iniciales
                setActivities(mockActivities);
                saveToLocalStorage(mockActivities);
            }
        } else {
            // Primera vez que se carga, usar datos iniciales
            setActivities(mockActivities);
            saveToLocalStorage(mockActivities);
        }
    }, []);

    // Función para guardar en localStorage
    const saveToLocalStorage = (activitiesData: WeeklyActivityData[]) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activitiesData));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    // Actualizar localStorage cada vez que cambien las actividades
    useEffect(() => {
        if (activities.length > 0) {
            saveToLocalStorage(activities);
        }
    }, [activities]);

    const handleSaveEdit = () => {
        if (editFormData.id) {
            const updatedActivities = activities.map(a => 
                a.id === editFormData.id ? { ...a, ...editFormData } as WeeklyActivityData : a
            );
            setActivities(updatedActivities);
            setShowEditModal(false);
            setEditFormData({});
        }
    };

    const handleSaveDuplicate = () => {
        if (editFormData) {
            const updatedActivities = [...activities, editFormData as WeeklyActivityData];
            setActivities(updatedActivities);
            setShowDuplicateModal(false);
            setEditFormData({});
        }
    };

    const handleCreateFromTemplate = () => {
        const template = mockTemplates.find(t => t.id === selectedTemplate);
        if (template) {
            const newActivity: WeeklyActivityData = {
                id: `act-${Date.now()}`,
                activityId: `${template.discipline.toUpperCase()}-${Date.now()}`,
                title: template.title,
                description: template.description,
                discipline: template.discipline as WeeklyActivityData["discipline"],
                assignedTo: '',
                subcontractor: '',
                startDate: '',
                endDate: '',
                status: 'planned',
                progress: 0,
                priority: template.priority as WeeklyActivityData["priority"],
                plannedHours: template.plannedHours,
                actualHours: 0,
                location: '',
                equipment: template.equipment,
                materials: template.materials
            };
            setEditFormData(newActivity);
            setShowTemplatesModal(false);
            setShowCreateModal(true);
        }
    };

    const renderActionMenu = (activity: WeeklyActivityData) => (
        <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-1">
                <button
                    onClick={() => handleEditActivity(activity)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    <Edit className="w-4 h-4 mr-3" />
                    Editar actividad
                </button>
                <button
                    onClick={() => handleDuplicateActivity(activity)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    <Copy className="w-4 h-4 mr-3" />
                    Duplicar actividad
                </button>
                <button
                    onClick={() => handleExportActivity(activity)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    <Download className="w-4 h-4 mr-3" />
                    Exportar detalle
                </button>
                <hr className="my-1" />
                <button
                    onClick={() => handleDeleteActivity(activity)}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                    <Trash2 className="w-4 h-4 mr-3" />
                    Eliminar actividad
                </button>
            </div>
        </div>
    );

    const renderActivityForm = (formData: Partial<WeeklyActivityData>, setFormData: (data: Partial<WeeklyActivityData>) => void) => (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID de Actividad</label>
                    <input
                        type="text"
                        value={formData.activityId || ''}
                        onChange={(e) => setFormData({ ...formData, activityId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Ej: HVAC-002"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Disciplina</label>
                    <select 
                        value={formData.discipline || ''}
                        onChange={(e) => setFormData({ ...formData, discipline: e.target.value as WeeklyActivityData["discipline"] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
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
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Título descriptivo de la actividad"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Descripción detallada de la actividad"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subcontratista</label>
                    <select 
                        value={formData.subcontractor || ''}
                        onChange={(e) => setFormData({ ...formData, subcontractor: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Seleccionar subcontratista</option>
                        <option value="HVAC Solutions S.A.C.">HVAC Solutions S.A.C.</option>
                        <option value="Electro Instalaciones Perú">Electro Instalaciones Perú</option>
                        <option value="Plomería Industrial SAC">Plomería Industrial SAC</option>
                        <option value="Fire Protection Corp.">Fire Protection Corp.</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                    <input
                        type="text"
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                        value={formData.startDate || ''}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
                    <input
                        type="date"
                        value={formData.endDate || ''}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                    <select 
                        value={formData.priority || ''}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as WeeklyActivityData["priority"] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
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
                        value={formData.plannedHours || ''}
                        onChange={(e) => setFormData({ ...formData, plannedHours: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="80"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado Inicial</label>
                    <select 
                        value={formData.status || ''}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as WeeklyActivityData['status'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );

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
                        onClick={() => setShowTemplatesModal(true)}
                        className="px-4 py-2 text-green-600 bg-green-100 rounded-lg hover:bg-green-200 transition-colors flex items-center"
                    >
                        <Copy className="w-4 h-4 mr-2" />
                        Plantillas
                    </button>
                    <button
                        onClick={() => setShowImportModal(true)}
                        className="px-4 py-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors flex items-center"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Importar
                    </button>
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
                                        <button 
                                            onClick={() => setActionMenuOpen(actionMenuOpen === activity.id ? null : activity.id)}
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                        {actionMenuOpen === activity.id && renderActionMenu(activity)}
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

                        <div className="p-6">
                            {renderActivityForm(editFormData, setEditFormData)}
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setEditFormData({});
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={() => {
                                    if (editFormData) {
                                        const newActivity = {
                                            ...editFormData,
                                            id: `act-${Date.now()}`,
                                            progress: 0,
                                            actualHours: 0
                                        } as WeeklyActivityData;
                                        setActivities([...activities, newActivity]);
                                        setShowCreateModal(false);
                                        setEditFormData({});
                                    }
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Crear Actividad
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Activity Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Editar Actividad</h2>
                            <p className="text-gray-600">{selectedActivity?.title}</p>
                        </div>

                        <div className="p-6">
                            {renderActivityForm(editFormData, setEditFormData)}
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditFormData({});
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Duplicate Activity Modal */}
            {showDuplicateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Duplicar Actividad</h2>
                            <p className="text-gray-600">Crear copia de: {selectedActivity?.title}</p>
                        </div>

                        <div className="p-6">
                            {renderActivityForm(editFormData, setEditFormData)}
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowDuplicateModal(false);
                                    setEditFormData({});
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSaveDuplicate}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                Crear Copia
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dependencies Management Modal */}
            {showDependenciesModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Gestionar Dependencias</h2>
                            <p className="text-gray-600">{selectedActivity?.title}</p>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Dependencias Actuales</h3>
                                    {selectedActivity?.dependencies && selectedActivity.dependencies.length > 0 ? (
                                        <div className="space-y-2">
                                            {selectedActivity.dependencies.map((dep, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <span className="font-medium">{dep}</span>
                                                    <button className="text-red-600 hover:text-red-800">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No hay dependencias configuradas</p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Agregar Nueva Dependencia</h3>
                                    <div className="flex space-x-3">
                                        <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                            <option value="">Seleccionar actividad...</option>
                                            {activities
                                                .filter(a => a.id !== selectedActivity?.id)
                                                .map(activity => (
                                                    <option key={activity.id} value={activity.activityId}>
                                                        {activity.activityId} - {activity.title}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                            Agregar
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Validación de Conflictos</h3>
                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                                            <div>
                                                <h4 className="font-medium text-blue-900">Verificación Automática</h4>
                                                <p className="text-blue-800 text-sm mt-1">
                                                    El sistema verificará automáticamente conflictos de:
                                                </p>
                                                <ul className="text-blue-800 text-sm mt-2 space-y-1">
                                                    <li>• Superposición de fechas y recursos</li>
                                                    <li>• Disponibilidad de ubicaciones</li>
                                                    <li>• Capacidad de equipos asignados</li>
                                                    <li>• Conflictos en cronograma maestro</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDependenciesModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cerrar
                            </button>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                Guardar Dependencias
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Templates Modal */}
            {showTemplatesModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Plantillas de Actividades</h2>
                            <p className="text-gray-600">Selecciona una plantilla para crear una nueva actividad</p>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                {mockTemplates.map((template) => (
                                    <div 
                                        key={template.id}
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                            selectedTemplate === template.id 
                                                ? 'border-green-500 bg-green-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setSelectedTemplate(template.id)}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`${getDisciplineInfo(template.discipline).color} p-2 rounded-lg`}>
                                                <Activity className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">{template.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                                    <span>Disciplina: {getDisciplineInfo(template.discipline).label}</span>
                                                    <span>Horas: {template.plannedHours}h</span>
                                                    <span>Prioridad: {getPriorityInfo(template.priority).label}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowTemplatesModal(false);
                                    setSelectedTemplate('');
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleCreateFromTemplate}
                                disabled={!selectedTemplate}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Usar Plantilla
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Import Modal */}
            {showImportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Importar Actividades</h2>
                            <p className="text-gray-600">Carga actividades masivamente desde archivo Excel o CSV</p>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Arrastra tu archivo aquí</h3>
                                    <p className="text-gray-600 mb-4">o haz clic para seleccionar</p>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Seleccionar Archivo
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Formatos soportados: .xlsx, .csv (máx. 10MB)
                                    </p>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-medium text-blue-900 mb-2">Formato Requerido</h4>
                                    <p className="text-blue-800 text-sm mb-2">El archivo debe contener las siguientes columnas:</p>
                                    <div className="text-blue-800 text-xs space-y-1">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p>• ID_Actividad</p>
                                                <p>• Titulo</p>
                                                <p>• Descripcion</p>
                                                <p>• Disciplina</p>
                                            </div>
                                            <div>
                                                <p>• Subcontratista</p>
                                                <p>• Fecha_Inicio</p>
                                                <p>• Fecha_Fin</p>
                                                <p>• Horas_Planificadas</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-3 text-blue-600 text-sm hover:text-blue-800">
                                        Descargar plantilla de ejemplo →
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowImportModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Importar Actividades
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Click outside to close action menus */}
            {actionMenuOpen && (
                <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setActionMenuOpen(null)}
                />
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
                            <h4 className="font-medium mb-2">Funcionalidades implementadas:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• ✅ Crear, editar y duplicar actividades</li>
                                <li>• ✅ Gestión de dependencias entre tareas</li>
                                <li>• ✅ Plantillas predefinidas de actividades</li>
                                <li>• ✅ Importación masiva desde Excel/CSV</li>
                                <li>• ✅ Validación automática de conflictos</li>
                                <li>• ✅ Exportación de detalles individuales</li>
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