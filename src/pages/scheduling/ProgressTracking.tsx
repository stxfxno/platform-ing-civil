// src/pages/scheduling/ProgressTracking.tsx
import React, { useState } from 'react';
import {
    TrendingUp,
    Calendar,
    BarChart3,
    AlertTriangle,
    CheckCircle,
    Clock,
    Filter,
    Camera,
    MessageSquare,
    Target,
    Activity,
    Save,
    User,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight
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
    status: 'on_track' | 'delayed' | 'ahead' | 'at_risk' | 'completed';
    lastUpdate: string;
    issues: Issue[];
    photos: Photo[];
    comments: Comment[];
    startDate: string;
    endDate: string;
    location: string;
}

interface Comment {
    id: string;
    activityId: string;
    text: string;
    author: string;
    timestamp: string;
    isPublic: boolean;
}

interface Issue {
    id: string;
    activityId: string;
    title: string;
    description: string;
    category: 'material' | 'personal' | 'equipo' | 'clima' | 'coordinacion' | 'otro';
    impact: 'bajo' | 'medio' | 'alto' | 'critico';
    status: 'nuevo' | 'en_proceso' | 'resuelto' | 'escalado';
    reportedBy: string;
    reportedAt: string;
    resolvedAt?: string;
}

interface Photo {
    id: string;
    activityId: string;
    url: string;
    filename: string;
    type: 'antes' | 'durante' | 'despues' | 'problema' | 'completado';
    timestamp: string;
    description?: string;
    uploadedBy: string;
}

interface WeekData {
    weekNumber: number;
    dateRange: string;
    ppcDay: string;
    ppcPercentage: number;
    activities: ProgressData[];
}

// Datos para las 3 semanas
const weeklyData: Record<number, WeekData> = {
    14: {
        weekNumber: 14,
        dateRange: '12 Mayo - 18 Mayo 2025',
        ppcDay: 'Sábado',
        ppcPercentage: 100,
        activities: [
            {
                id: 'prog-014-001',
                activityId: 'HVAC-014',
                title: 'Instalación ductos HVAC - Área C',
                discipline: 'HVAC',
                subcontractor: 'HVAC Solutions S.A.C.',
                plannedProgress: 100,
                actualProgress: 100,
                variance: 0,
                status: 'completed',
                lastUpdate: '2025-05-18T16:00:00Z',
                issues: [],
                photos: [
                    {
                        id: 'photo-014-001',
                        activityId: 'HVAC-014',
                        url: '/images/hvac-completed.jpg',
                        filename: 'hvac-area-c-completado.jpg',
                        type: 'completado',
                        timestamp: '2025-05-18T15:30:00Z',
                        description: 'Instalación 100% completada',
                        uploadedBy: 'Carlos Mendoza'
                    }
                ],
                comments: [
                    {
                        id: 'comment-014-001',
                        activityId: 'HVAC-014',
                        text: 'Actividad completada exitosamente. Pruebas pasaron satisfactoriamente.',
                        author: 'Ing. Carlos Mendoza',
                        timestamp: '2025-05-18T16:00:00Z',
                        isPublic: true
                    }
                ],
                startDate: '2025-05-12',
                endDate: '2025-05-18',
                location: 'Sótano - Área C'
            },
            {
                id: 'prog-014-002',
                activityId: 'ELEC-014',
                title: 'Cableado eléctrico secundario - Piso 2',
                discipline: 'Eléctrico',
                subcontractor: 'Electro Instalaciones Perú',
                plannedProgress: 100,
                actualProgress: 100,
                variance: 0,
                status: 'completed',
                lastUpdate: '2025-05-18T14:30:00Z',
                issues: [],
                photos: [],
                comments: [
                    {
                        id: 'comment-014-002',
                        activityId: 'ELEC-014',
                        text: 'Instalación eléctrica completada según especificaciones.',
                        author: 'Ing. María Santos',
                        timestamp: '2025-05-18T14:30:00Z',
                        isPublic: true
                    }
                ],
                startDate: '2025-05-12',
                endDate: '2025-05-18',
                location: 'Piso 2'
            },
            {
                id: 'prog-014-003',
                activityId: 'PLUMB-014',
                title: 'Sistema contra incendios - Nivel 2',
                discipline: 'Protección Contra Incendios',
                subcontractor: 'Fire Protection Corp.',
                plannedProgress: 100,
                actualProgress: 95,
                variance: -5,
                status: 'on_track',
                lastUpdate: '2025-05-18T17:00:00Z',
                issues: [],
                photos: [],
                comments: [
                    {
                        id: 'comment-014-003',
                        activityId: 'PLUMB-014',
                        text: 'Quedan ajustes menores en válvulas. Completaremos el lunes.',
                        author: 'Ing. Sofia Herrera',
                        timestamp: '2025-05-18T17:00:00Z',
                        isPublic: true
                    }
                ],
                startDate: '2025-05-12',
                endDate: '2025-05-18',
                location: 'Nivel 2'
            }
        ]
    },
    15: {
        weekNumber: 15,
        dateRange: '19 Mayo - 25 Mayo 2025',
        ppcDay: 'Viernes',
        ppcPercentage: 95,
        activities: [
            {
                id: 'prog-015-001',
                activityId: 'HVAC-015',
                title: 'Instalación unidades manejadoras - Azotea',
                discipline: 'HVAC',
                subcontractor: 'HVAC Solutions S.A.C.',
                plannedProgress: 95,
                actualProgress: 95,
                variance: 0,
                status: 'completed',
                lastUpdate: '2025-05-24T13:45:00Z',
                issues: [],
                photos: [
                    {
                        id: 'photo-015-001',
                        activityId: 'HVAC-015',
                        url: '/images/hvac-unidades-manejadoras.jpg',
                        filename: 'hvac-unidades-manejadoras.jpg',
                        type: 'completado',
                        timestamp: '2025-05-24T12:00:00Z',
                        description: 'Unidades manejadoras instaladas y verificadas',
                        uploadedBy: 'Carlos Mendoza'
                    }
                ],
                comments: [
                    {
                        id: 'comment-015-001',
                        activityId: 'HVAC-015',
                        text: 'Instalación finalizada sin observaciones. Inspección aprobada.',
                        author: 'Ing. Carlos Mendoza',
                        timestamp: '2025-05-24T13:45:00Z',
                        isPublic: true
                    }
                ],
                startDate: '2025-05-19',
                endDate: '2025-05-25',
                location: 'Azotea'
            },
            {
                id: 'prog-015-002',
                activityId: 'ELEC-015',
                title: 'Conexionado de tableros secundarios - Piso 3',
                discipline: 'Eléctrico',
                subcontractor: 'Electro Instalaciones Perú',
                plannedProgress: 95,
                actualProgress: 95,
                variance: 0,
                status: 'completed',
                lastUpdate: '2025-05-24T15:30:00Z',
                issues: [],
                photos: [],
                comments: [
                    {
                        id: 'comment-015-002',
                        activityId: 'ELEC-015',
                        text: 'Tableros secundarios conectados correctamente. En espera de prueba general.',
                        author: 'Ing. María Santos',
                        timestamp: '2025-05-24T15:30:00Z',
                        isPublic: true
                    }
                ],
                startDate: '2025-05-19',
                endDate: '2025-05-25',
                location: 'Piso 3'
            },
            {
                id: 'prog-015-003',
                activityId: 'PLUMB-015',
                title: 'Tuberías principales agua potable - Todo edificio',
                discipline: 'Plomería',
                subcontractor: 'Plomería Industrial SAC',
                plannedProgress: 95,
                actualProgress: 90,
                variance: -5,
                status: 'on_track',
                lastUpdate: '2025-05-23T18:00:00Z',
                issues: [
                    {
                        id: 'issue-015-001',
                        activityId: 'PLUMB-015',
                        title: 'Retraso en soldadura especializada',
                        description: 'Soldador especializado enfermo, buscando reemplazo urgente',
                        category: 'personal',
                        impact: 'medio',
                        status: 'en_proceso',
                        reportedBy: 'Alberto Silva',
                        reportedAt: '2025-05-23T10:00:00Z'
                    }
                ],
                photos: [],
                comments: [
                    {
                        id: 'comment-015-003',
                        activityId: 'PLUMB-015',
                        text: 'Trabajando en solución para recuperar el retraso. Coordinando recursos adicionales.',
                        author: 'Ing. Alberto Silva',
                        timestamp: '2025-05-23T18:00:00Z',
                        isPublic: true
                    }
                ],
                startDate: '2025-05-19',
                endDate: '2025-05-25',
                location: 'Todo el edificio'
            },
            {
                id: 'prog-015-004',
                activityId: 'FIRE-015',
                title: 'Colocación de gabinetes contra incendios - Nivel 1',
                discipline: 'Protección Contra Incendios',
                subcontractor: 'Fire Protection Corp.',
                plannedProgress: 95,
                actualProgress: 85,
                variance: -10,
                status: 'delayed',
                lastUpdate: '2025-05-24T11:00:00Z',
                issues: [
                    {
                        id: 'issue-015-004',
                        activityId: 'FIRE-015',
                        title: 'Retraso en recepción de gabinetes',
                        description: 'El proveedor entregó parcialmente los gabinetes, restando 2 para finalizar.',
                        category: 'material',
                        impact: 'medio',
                        status: 'en_proceso',
                        reportedBy: 'Sofia Herrera',
                        reportedAt: '2025-05-22T08:00:00Z'
                    }
                ],
                photos: [],
                comments: [
                    {
                        id: 'comment-015-004',
                        activityId: 'FIRE-015',
                        text: 'Entrega parcial de gabinetes. Se espera completar instalación el lunes.',
                        author: 'Ing. Sofia Herrera',
                        timestamp: '2025-05-24T11:00:00Z',
                        isPublic: true
                    }
                ],
                startDate: '2025-05-19',
                endDate: '2025-05-25',
                location: 'Nivel 1'
            },
            {
                id: 'prog-015-005',
                activityId: 'GEN-015',
                title: 'Señalización de rutas de evacuación - Todos los pisos',
                discipline: 'General',
                subcontractor: 'Seguridad Total SAC',
                plannedProgress: 95,
                actualProgress: 80,
                variance: -15,
                status: 'at_risk',
                lastUpdate: '2025-05-24T09:30:00Z',
                issues: [
                    {
                        id: 'issue-015-005',
                        activityId: 'GEN-015',
                        title: 'Inconveniente en instalación de señalética fotoluminiscente',
                        description: 'Algunas señales no se adhirieron correctamente en muros rugosos. Se está usando otro adhesivo.',
                        category: 'técnico',
                        impact: 'bajo',
                        status: 'en_proceso',
                        reportedBy: 'Luis Quispe',
                        reportedAt: '2025-05-23T08:00:00Z'
                    }
                ],
                photos: [],
                comments: [
                    {
                        id: 'comment-015-005',
                        activityId: 'GEN-015',
                        text: 'Señalización en proceso. Se están haciendo ajustes en la fijación de algunos elementos.',
                        author: 'Ing. Luis Quispe',
                        timestamp: '2025-05-24T09:30:00Z',
                        isPublic: true
                    }
                ],
                startDate: '2025-05-19',
                endDate: '2025-05-25',
                location: 'Todos los pisos'
            }
        ]
    },
    16: {
        weekNumber: 16,
        dateRange: '26 Mayo - 01 Junio 2025',
        ppcDay: 'Lunes',
        ppcPercentage: 20,
        activities: [
            {
                id: 'prog-016-001',
                activityId: 'HVAC-016',
                title: 'Balanceo sistema HVAC - Todo edificio',
                discipline: 'HVAC',
                subcontractor: 'HVAC Solutions S.A.C.',
                plannedProgress: 20,
                actualProgress: 0,
                variance: -20,
                status: 'delayed',
                lastUpdate: '2025-05-26T08:00:00Z',
                issues: [
                    {
                        id: 'issue-016-001',
                        activityId: 'HVAC-016',
                        title: 'Esperando finalización actividades previas',
                        description: 'No se puede iniciar balanceo hasta completar instalaciones',
                        category: 'coordinacion',
                        impact: 'alto',
                        status: 'nuevo',
                        reportedBy: 'Carlos Mendoza',
                        reportedAt: '2025-05-26T08:00:00Z'
                    }
                ],
                photos: [],
                comments: [
                    {
                        id: 'comment-016-001',
                        activityId: 'HVAC-016',
                        text: 'Actividad programada para iniciar una vez completadas las dependencias.',
                        author: 'Ing. Carlos Mendoza',
                        timestamp: '2025-05-26T08:00:00Z',
                        isPublic: true
                    }
                ],
                startDate: '2025-05-26',
                endDate: '2025-06-01',
                location: 'Todo el edificio'
            },
            {
                id: 'prog-016-002',
                activityId: 'ELEC-016',
                title: 'Pruebas sistema eléctrico integral',
                discipline: 'Eléctrico',
                subcontractor: 'Electro Instalaciones Perú',
                plannedProgress: 15,
                actualProgress: 0,
                variance: -15,
                status: 'delayed',
                lastUpdate: '2025-05-26T08:30:00Z',
                issues: [],
                photos: [],
                comments: [
                    {
                        id: 'comment-016-002',
                        activityId: 'ELEC-016',
                        text: 'Pruebas programadas para miércoles una vez completados tableros.',
                        author: 'Ing. María Santos',
                        timestamp: '2025-05-26T08:30:00Z',
                        isPublic: true
                    }
                ],
                startDate: '2025-05-26',
                endDate: '2025-06-01',
                location: 'Todo el edificio'
            },
            {
                id: 'prog-016-003',
                activityId: 'FIRE-016',
                title: 'Pruebas hidráulicas sistema contra incendios',
                discipline: 'Protección Contra Incendios',
                subcontractor: 'Fire Protection Corp.',
                plannedProgress: 25,
                actualProgress: 0,
                variance: -25,
                status: 'delayed',
                lastUpdate: '2025-05-26T09:00:00Z',
                issues: [],
                photos: [],
                comments: [
                    {
                        id: 'comment-016-003',
                        activityId: 'FIRE-016',
                        text: 'Equipo de pruebas llegará el martes. Iniciamos miércoles.',
                        author: 'Ing. Sofia Herrera',
                        timestamp: '2025-05-26T09:00:00Z',
                        isPublic: true
                    }
                ],
                startDate: '2025-05-26',
                endDate: '2025-06-01',
                location: 'Todo el edificio'
            }
        ]
    }
};

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
    'at_risk': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-gray-100 text-gray-800'
};

const statusLabels = {
    'on_track': 'En Tiempo',
    'ahead': 'Adelantado',
    'delayed': 'Retrasado',
    'at_risk': 'En Riesgo',
    'completed': 'Completado'
};

const issueCategories = {
    'material': 'Material',
    'personal': 'Personal',
    'equipo': 'Equipo',
    'clima': 'Clima',
    'coordinacion': 'Coordinación',
    'otro': 'Otro'
};

const issueImpacts = {
    'bajo': 'Bajo',
    'medio': 'Medio',
    'alto': 'Alto',
    'critico': 'Crítico'
};

const photoTypes = {
    'antes': 'Antes',
    'durante': 'Durante',
    'despues': 'Después',
    'problema': 'Problema',
    'completado': 'Completado'
};

const ProgressTracking: React.FC = () => {
    const [currentWeek, setCurrentWeek] = useState<number>(15);
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterDiscipline, setFilterDiscipline] = useState<string>('');
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<ProgressData | null>(null);
    const [activeTab, setActiveTab] = useState<'progress' | 'comments' | 'issues' | 'photos'>('progress');

    // Form states
    const [newProgress, setNewProgress] = useState(0);
    const [newStatus, setNewStatus] = useState('');
    const [newComment, setNewComment] = useState('');
    const [newIssue, setNewIssue] = useState<{
        title: string;
        description: string;
        category: Issue['category'];
        impact: Issue['impact'];
    }>({
        title: '',
        description: '',
        category: 'material',
        impact: 'medio'
    });
    const [selectedPhotoType, setSelectedPhotoType] = useState<keyof typeof photoTypes>('durante');
    const [photoDescription, setPhotoDescription] = useState('');
    const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

    const currentWeekData = weeklyData[currentWeek];
    const progressData = currentWeekData.activities;

    // Función para obtener color de progreso según nueva escala
    const getProgressColor = (progress: number) => {
        if (progress >= 95) return 'bg-blue-500'; // EXCELENTE
        if (progress >= 80) return 'bg-green-400'; // BUENO
        if (progress >= 65) return 'bg-orange-500'; // MALO
        return 'bg-red-500'; // CRÍTICO
    };

    // Función para obtener color de PPC
    const getPPCColor = (percentage: number) => {
        if (percentage >= 95) return 'bg-blue-500 text-white'; // EXCELENTE
        if (percentage >= 80) return 'bg-green-400 text-white'; // BUENO
        if (percentage >= 65) return 'bg-orange-500 text-white'; // MALO
        return 'bg-red-500 text-white'; // CRÍTICO
    };

    const weekStats = {
        totalActivities: progressData.length,
        onTrack: progressData.filter(p => p.status === 'on_track').length,
        ahead: progressData.filter(p => p.status === 'ahead').length,
        delayed: progressData.filter(p => p.status === 'delayed').length,
        atRisk: progressData.filter(p => p.status === 'at_risk').length,
        completed: progressData.filter(p => p.status === 'completed').length,
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
        setNewProgress(activity.actualProgress);
        setNewStatus(activity.status);
        setShowProgressModal(true);
    };

    const handleWeekChange = (direction: 'prev' | 'next') => {
        if (direction === 'prev' && currentWeek > 14) {
            setCurrentWeek(currentWeek - 1);
        } else if (direction === 'next' && currentWeek < 16) {
            setCurrentWeek(currentWeek + 1);
        }
    };

    const getWeekStatusIcon = (weekNum: number) => {
        if (weekNum < currentWeek) return <CheckCircle className="w-5 h-5 text-green-600" />;
        if (weekNum === currentWeek) return <Clock className="w-5 h-5 text-blue-600" />;
        return <Calendar className="w-5 h-5 text-gray-400" />;
    };

    // Agregar comentarios
    const handleAddComment = () => {
        if (!selectedActivity || !newComment.trim()) return;

        const comment: Comment = {
            id: `comment-${Date.now()}`,
            activityId: selectedActivity.activityId,
            text: newComment,
            author: 'Usuario Actual',
            timestamp: new Date().toISOString(),
            isPublic: true
        };

        // Aquí actualizarías el estado global o localStorage
        setNewComment('');
        alert('Comentario agregado exitosamente');
    };

    // Reportar problemas
    const handleReportIssue = () => {
        if (!selectedActivity || !newIssue.title.trim()) return;

        const issue: Issue = {
            id: `issue-${Date.now()}`,
            activityId: selectedActivity.activityId,
            title: newIssue.title,
            description: newIssue.description,
            category: newIssue.category,
            impact: newIssue.impact,
            status: 'nuevo',
            reportedBy: 'Usuario Actual',
            reportedAt: new Date().toISOString()
        };

        // Aquí actualizarías el estado global o localStorage
        setNewIssue({ title: '', description: '', category: 'material', impact: 'medio' });
        alert('Problema reportado exitosamente');
    };

    const handleSaveProgress = () => {
        if (!selectedActivity) return;

        // Aquí actualizarías el estado global o localStorage
        setShowProgressModal(false);
        setActiveTab('progress');
        alert('Progreso actualizado exitosamente');
    };

    const renderProgressTab = () => (
        <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Estado Actual</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-gray-400">{selectedActivity?.plannedProgress}%</p>
                        <p className="text-sm text-gray-600">Planificado</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-blue-600">{selectedActivity?.actualProgress}%</p>
                        <p className="text-sm text-gray-600">Actual</p>
                    </div>
                    <div>
                        <p className={`text-2xl font-bold ${getVarianceColor(selectedActivity?.variance || 0)}`}>
                            {selectedActivity && selectedActivity.variance > 0 ? '+' : ''}{selectedActivity?.variance}%
                        </p>
                        <p className="text-sm text-gray-600">Variación</p>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nuevo Progreso (%)
                </label>
                <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProgress}
                    onChange={(e) => setNewProgress(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado de la Actividad
                </label>
                <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="on_track">En Tiempo</option>
                    <option value="ahead">Adelantado</option>
                    <option value="delayed">Retrasado</option>
                    <option value="at_risk">En Riesgo</option>
                    <option value="completed">Completado</option>
                </select>
            </div>
        </div>
    );

    const renderCommentsTab = () => (
        <div className="space-y-4">
            <div className="max-h-60 overflow-y-auto space-y-3">
                {selectedActivity?.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                                {!comment.isPublic && (
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                        Privado
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-gray-500">
                                {new Date(comment.timestamp).toLocaleString('es-PE')}
                            </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                ))}
                {(!selectedActivity?.comments || selectedActivity.comments.length === 0) && (
                    <p className="text-gray-500 text-center py-4">No hay comentarios aún</p>
                )}
            </div>

            <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Agregar Comentario
                        </label>
                        <textarea
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe el progreso, observaciones, próximos pasos..."
                        />
                    </div>
                    <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Agregar Comentario
                    </button>
                </div>
            </div>
        </div>
    );

    const renderIssuesTab = () => (
        <div className="space-y-4">
            <div className="max-h-60 overflow-y-auto space-y-3">
                {selectedActivity?.issues.map((issue) => (
                    <div key={issue.id} className="border border-red-200 bg-red-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-red-900">{issue.title}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${issue.impact === 'critico' ? 'bg-red-200 text-red-800' :
                                issue.impact === 'alto' ? 'bg-orange-200 text-orange-800' :
                                    issue.impact === 'medio' ? 'bg-yellow-200 text-yellow-800' :
                                        'bg-green-200 text-green-800'
                                }`}>
                                {issueImpacts[issue.impact]}
                            </span>
                        </div>
                        <p className="text-sm text-red-800 mb-2">{issue.description}</p>
                        <div className="text-xs text-red-600">
                            <span>Categoría: {issueCategories[issue.category]}</span> •
                            <span> Reportado por: {issue.reportedBy}</span> •
                            <span> {new Date(issue.reportedAt).toLocaleString('es-PE')}</span>
                        </div>
                    </div>
                ))}
                {(!selectedActivity?.issues || selectedActivity.issues.length === 0) && (
                    <p className="text-gray-500 text-center py-4">No hay problemas reportados</p>
                )}
            </div>

            <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Título del Problema
                        </label>
                        <input
                            type="text"
                            value={newIssue.title}
                            onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Retraso en entrega de materiales"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descripción
                        </label>
                        <textarea
                            rows={2}
                            value={newIssue.description}
                            onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe el problema detalladamente..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categoría
                            </label>
                            <select
                                value={newIssue.category}
                                onChange={(e) => setNewIssue({ ...newIssue, category: e.target.value as Issue['category'] })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {Object.entries(issueCategories).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Impacto
                            </label>
                            <select
                                value={newIssue.impact}
                                onChange={(e) => setNewIssue({ ...newIssue, impact: e.target.value as Issue['impact'] })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {Object.entries(issueImpacts).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={handleReportIssue}
                        disabled={!newIssue.title.trim()}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Reportar Problema
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPhotosTab = () => (
        <div className="space-y-4">
            <div className="max-h-60 overflow-y-auto">
                {selectedActivity?.photos && selectedActivity.photos.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                        {selectedActivity.photos.map((photo) => (
                            <div key={photo.id} className="relative group">
                                <img
                                    src={photo.url}
                                    alt={photo.description || photo.filename}
                                    className="w-full h-24 object-cover rounded-lg"
                                    onError={(e) => {
                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkM5Ljc5IDEzLjc5IDkuNzkgMTAuMjEgMTIgOCIgc3Ryb2tlPSIjOUI5QkEwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
                                    }}
                                />
                                <div className="absolute bottom-1 left-1 right-1">
                                    <span className={`px-1 py-0.5 text-xs rounded ${photo.type === 'antes' ? 'bg-gray-800 text-white' :
                                        photo.type === 'durante' ? 'bg-blue-800 text-white' :
                                            photo.type === 'despues' ? 'bg-green-800 text-white' :
                                                photo.type === 'problema' ? 'bg-red-800 text-white' :
                                                    'bg-purple-800 text-white'
                                        }`}>
                                        {photoTypes[photo.type]}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">No hay fotos subidas aún</p>
                )}
            </div>

            <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo de Foto
                        </label>
                        <select
                            value={selectedPhotoType}
                            onChange={(e) => setSelectedPhotoType(e.target.value as keyof typeof photoTypes)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {Object.entries(photoTypes).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descripción (Opcional)
                        </label>
                        <input
                            type="text"
                            value={photoDescription}
                            onChange={(e) => setPhotoDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe lo que muestra la foto..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Seleccionar Fotos
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">Arrastra fotos aquí o haz clic para seleccionar</p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={() => alert('Funcionalidad de subida de fotos simulada')}
                                className="hidden"
                                id="photoUpload"
                            />
                            <label
                                htmlFor="photoUpload"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                            >
                                Seleccionar Fotos
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

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
                        <p className="text-gray-600">Registro y seguimiento del progreso de actividades MEP</p>
                    </div>
                </div>
            </div>

            {/* Week Selector */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => handleWeekChange('prev')}
                            disabled={currentWeek <= 14}
                            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center space-x-6">
                            {[14, 15, 16].map((weekNum) => (
                                <button
                                    key={weekNum}
                                    onClick={() => setCurrentWeek(weekNum)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${currentWeek === weekNum
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {getWeekStatusIcon(weekNum)}
                                    <span className="font-medium">Semana {weekNum}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handleWeekChange('next')}
                            disabled={currentWeek >= 16}
                            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="text-sm text-gray-500">
                        {currentWeekData.dateRange}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-4">
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

                    {/* PPC Semanal */}
                    <div className={`text-center p-4 rounded-lg ${getPPCColor(currentWeekData.ppcPercentage)}`}>
                        <Calendar className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{currentWeekData.ppcPercentage}%</p>
                        <p className="text-sm">PPC {currentWeekData.ppcDay}</p>
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
                            <option value="completed">Completado</option>
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
                {filteredData.map((item) => {
                    const disciplineInfo = disciplineColors[item.discipline as keyof typeof disciplineColors];
                    const statusInfo = statusColors[item.status];
                    const statusLabel = statusLabels[item.status];

                    return (
                        <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start space-x-4 flex-1">
                                    <div className={`${disciplineInfo} p-3 rounded-lg`}>
                                        <Activity className="w-6 h-6 text-white" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                            <span className="text-sm font-medium text-gray-500">{item.activityId}</span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo}`}>
                                                {statusLabel}
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
                                                        className={`h-2 rounded-full ${getProgressColor(item.actualProgress)}`}
                                                        style={{ width: `${item.actualProgress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Issues Alert */}
                                        {item.issues.length > 0 && (
                                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                <h4 className="text-sm font-medium text-red-800 mb-2">
                                                    {item.issues.length} problema{item.issues.length > 1 ? 's' : ''} reportado{item.issues.length > 1 ? 's' : ''}:
                                                </h4>
                                                <ul className="text-sm text-red-700 space-y-1">
                                                    {item.issues.slice(0, 2).map((issue) => (
                                                        <li key={issue.id}>• {issue.title}</li>
                                                    ))}
                                                    {item.issues.length > 2 && (
                                                        <li>• y {item.issues.length - 2} más...</li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Activity Info */}
                                        <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Camera className="w-4 h-4" />
                                                <span>{item.photos.length} fotos</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <MessageSquare className="w-4 h-4" />
                                                <span>{item.comments.length} comentarios</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <AlertTriangle className="w-4 h-4" />
                                                <span>{item.issues.length} problemas</span>
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
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleUpdateProgress(item)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center"
                                    >
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Actualizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Update Progress Modal */}
            {showProgressModal && selectedActivity && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Actualizar Progreso</h2>
                            <p className="text-gray-600">{selectedActivity.title}</p>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-8 px-6">
                                {[
                                    { key: 'progress', label: 'Progreso', icon: BarChart3 },
                                    { key: 'comments', label: 'Comentarios', icon: MessageSquare },
                                    { key: 'issues', label: 'Problemas', icon: AlertTriangle },
                                    { key: 'photos', label: 'Fotos', icon: Camera }
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.key}
                                            onClick={() => setActiveTab(tab.key as 'progress' | 'comments' | 'issues' | 'photos')}
                                            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.key
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{tab.label}</span>
                                            {tab.key === 'comments' && selectedActivity.comments.length > 0 && (
                                                <span className="bg-blue-100 text-blue-600 text-xs rounded-full px-2 py-1">
                                                    {selectedActivity.comments.length}
                                                </span>
                                            )}
                                            {tab.key === 'issues' && selectedActivity.issues.length > 0 && (
                                                <span className="bg-red-100 text-red-600 text-xs rounded-full px-2 py-1">
                                                    {selectedActivity.issues.length}
                                                </span>
                                            )}
                                            {tab.key === 'photos' && selectedActivity.photos.length > 0 && (
                                                <span className="bg-green-100 text-green-600 text-xs rounded-full px-2 py-1">
                                                    {selectedActivity.photos.length}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="p-6">
                            {activeTab === 'progress' && renderProgressTab()}
                            {activeTab === 'comments' && renderCommentsTab()}
                            {activeTab === 'issues' && renderIssuesTab()}
                            {activeTab === 'photos' && renderPhotosTab()}
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowProgressModal(false);
                                    setActiveTab('progress');
                                    setNewComment('');
                                    setNewIssue({ title: '', description: '', category: 'material', impact: 'medio' });
                                    setPhotoDescription('');
                                    setEditingIssue(null);
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cerrar
                            </button>
                            {activeTab === 'progress' && (
                                <button
                                    onClick={handleSaveProgress}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Guardar Progreso
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ProgressTracking;