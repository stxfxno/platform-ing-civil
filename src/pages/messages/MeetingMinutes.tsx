import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FileText,
    Search,
    Calendar,
    Users,
    ArrowLeft,
    Plus,
    Eye,
    Edit,
    Download,
    Save,
    X,
    Trash2,
    UserPlus,
    CheckSquare
} from 'lucide-react';

interface MeetingMinute {
    id: string;
    title: string;
    date: string;
    time: string;
    type: 'coordination' | 'technical' | 'progress' | 'safety';
    attendees: string[];
    decisions: Decision[];
    actionItems: ActionItem[];
    status: 'scheduled' | 'completed' | 'cancelled';
    organizer: string;
    location: string;
    objective: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

interface Decision {
    id: string;
    description: string;
    responsible: string;
    priority: 'high' | 'medium' | 'low';
}

interface ActionItem {
    id: string;
    description: string;
    responsible: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    status: 'pending' | 'in-progress' | 'completed';
}

const initialMockMeetings: MeetingMinute[] = [
    {
        id: '1',
        title: 'Coordinación MEP Semanal - Semana 21',
        date: '2025-05-23',
        time: '10:00',
        type: 'coordination',
        attendees: ['Ing. Carlos Rodríguez', 'Ing. María González', 'Ing. Ana López', 'Supervisor General'],
        decisions: [
            { id: 'd1', description: 'Modificar altura de ductos HVAC en zona norte', responsible: 'Ing. Carlos Rodríguez', priority: 'high' },
            { id: 'd2', description: 'Coordinar pases eléctricos con estructura', responsible: 'Ing. María González', priority: 'medium' }
        ],
        actionItems: [
            { id: 'a1', description: 'Actualizar planos isométricos HVAC', responsible: 'Ing. Carlos Rodríguez', dueDate: '2025-05-25', priority: 'high', status: 'in-progress' },
            { id: 'a2', description: 'Revisar interferencias estructurales', responsible: 'Ing. Ana López', dueDate: '2025-05-24', priority: 'medium', status: 'completed' }
        ],
        status: 'completed',
        organizer: 'Ing. Carlos Rodríguez',
        location: 'Sala de Reuniones A',
        objective: 'Coordinar actividades MEP semanales y resolver interferencias',
        notes: 'Se identificaron conflictos en zona norte que requieren atención inmediata',
        createdAt: '2025-05-23T10:00:00Z',
        updatedAt: '2025-05-23T12:00:00Z'
    }
];

const MeetingMinutes: React.FC = () => {
    const [meetings, setMeetings] = useState<MeetingMinute[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingMinute | null>(null);
    const [editingMeeting, setEditingMeeting] = useState<Partial<MeetingMinute>>({});

    // Cargar datos del localStorage al inicializar
    useEffect(() => {
        const savedMeetings = localStorage.getItem('meetingMinutes');
        if (savedMeetings) {
            setMeetings(JSON.parse(savedMeetings));
        } else {
            setMeetings(initialMockMeetings);
            localStorage.setItem('meetingMinutes', JSON.stringify(initialMockMeetings));
        }
    }, []);

    // Guardar en localStorage cuando cambian las reuniones
    useEffect(() => {
        if (meetings.length > 0) {
            localStorage.setItem('meetingMinutes', JSON.stringify(meetings));
        }
    }, [meetings]);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'coordination': return 'bg-blue-100 text-blue-800';
            case 'technical': return 'bg-green-100 text-green-800';
            case 'progress': return 'bg-purple-100 text-purple-800';
            case 'safety': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'coordination': return 'Coordinación';
            case 'technical': return 'Técnica';
            case 'progress': return 'Avance';
            case 'safety': return 'Seguridad';
            default: return type;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'scheduled': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed': return 'Completada';
            case 'scheduled': return 'Programada';
            case 'cancelled': return 'Cancelada';
            default: return status;
        }
    };

    const createNewMeeting = () => {
        const newMeeting: MeetingMinute = {
            id: Date.now().toString(),
            title: editingMeeting.title || '',
            date: editingMeeting.date || '',
            time: editingMeeting.time || '',
            type: editingMeeting.type || 'coordination',
            attendees: editingMeeting.attendees || [],
            decisions: editingMeeting.decisions || [],
            actionItems: editingMeeting.actionItems || [],
            status: editingMeeting.status || 'scheduled',
            organizer: editingMeeting.organizer || '',
            location: editingMeeting.location || '',
            objective: editingMeeting.objective || '',
            notes: editingMeeting.notes || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setMeetings([newMeeting, ...meetings]);
        resetModal();
    };

    const updateMeeting = () => {
        if (!selectedMeeting) return;

        const updatedMeetings = meetings.map(meeting =>
            meeting.id === selectedMeeting.id
                ? { ...meeting, ...editingMeeting, updatedAt: new Date().toISOString() }
                : meeting
        );

        setMeetings(updatedMeetings);
        resetModal();
    };

    const deleteMeeting = (id: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta acta?')) {
            setMeetings(meetings.filter(meeting => meeting.id !== id));
        }
    };

    const resetModal = () => {
        setShowModal(false);
        setSelectedMeeting(null);
        setEditingMeeting({});
        setModalMode('create');
    };

    const openModal = (mode: 'create' | 'edit' | 'view', meeting?: MeetingMinute) => {
        setModalMode(mode);
        if (meeting) {
            setSelectedMeeting(meeting);
            setEditingMeeting(meeting);
        } else {
            setEditingMeeting({
                title: '',
                date: new Date().toISOString().split('T')[0],
                time: '10:00',
                type: 'coordination',
                attendees: [],
                decisions: [],
                actionItems: [],
                status: 'scheduled',
                organizer: '',
                location: '',
                objective: '',
                notes: ''
            });
        }
        setShowModal(true);
    };

    const downloadMinutes = (meeting: MeetingMinute) => {
        const content = generateMinutesDocument(meeting);
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Acta_${meeting.title.replace(/\s+/g, '_')}_${meeting.date}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const generateMinutesDocument = (meeting: MeetingMinute) => {
        return `
ACTA DE REUNIÓN
===============

Título: ${meeting.title}
Fecha: ${meeting.date}
Hora: ${meeting.time}
Lugar: ${meeting.location}
Tipo: ${getTypeLabel(meeting.type)}
Organizador: ${meeting.organizer}
Estado: ${getStatusLabel(meeting.status)}

OBJETIVO:
${meeting.objective}

ASISTENTES:
${meeting.attendees.map(attendee => `• ${attendee}`).join('\n')}

DECISIONES TOMADAS:
${meeting.decisions.map((decision, index) =>
            `${index + 1}. ${decision.description}
   Responsable: ${decision.responsible}
   Prioridad: ${decision.priority.toUpperCase()}`
        ).join('\n\n')}

TAREAS ASIGNADAS:
${meeting.actionItems.map((action, index) =>
            `${index + 1}. ${action.description}
   Responsable: ${action.responsible}
   Fecha límite: ${action.dueDate}
   Estado: ${action.status}
   Prioridad: ${action.priority.toUpperCase()}`
        ).join('\n\n')}

NOTAS ADICIONALES:
${meeting.notes}

Documento generado el: ${new Date().toLocaleString()}
        `;
    };

    const addAttendee = () => {
        const newAttendee = prompt('Nombre del asistente:');
        if (newAttendee && newAttendee.trim()) {
            setEditingMeeting({
                ...editingMeeting,
                attendees: [...(editingMeeting.attendees || []), newAttendee.trim()]
            });
        }
    };

    const removeAttendee = (index: number) => {
        const updatedAttendees = editingMeeting.attendees?.filter((_, i) => i !== index) || [];
        setEditingMeeting({ ...editingMeeting, attendees: updatedAttendees });
    };

    const addDecision = () => {
        const description = prompt('Descripción de la decisión:');
        const responsible = prompt('Responsable:');
        if (description && responsible) {
            const newDecision: Decision = {
                id: Date.now().toString(),
                description: description.trim(),
                responsible: responsible.trim(),
                priority: 'medium'
            };
            setEditingMeeting({
                ...editingMeeting,
                decisions: [...(editingMeeting.decisions || []), newDecision]
            });
        }
    };

    const addActionItem = () => {
        const description = prompt('Descripción de la tarea:');
        const responsible = prompt('Responsable:');
        const dueDate = prompt('Fecha límite (YYYY-MM-DD):');
        if (description && responsible && dueDate) {
            const newAction: ActionItem = {
                id: Date.now().toString(),
                description: description.trim(),
                responsible: responsible.trim(),
                dueDate: dueDate,
                priority: 'medium',
                status: 'pending'
            };
            setEditingMeeting({
                ...editingMeeting,
                actionItems: [...(editingMeeting.actionItems || []), newAction]
            });
        }
    };

    const filteredMeetings = meetings.filter(meeting => {
        const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || meeting.type === filterType;
        const matchesStatus = filterStatus === 'all' || meeting.status === filterStatus;

        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        to="/mensajes"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Actas de Reunión</h1>
                        <p className="text-gray-600">Registro de reuniones y seguimiento de acuerdos</p>
                    </div>
                </div>
                <button
                    onClick={() => openModal('create')}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Nueva Reunión</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{meetings.length}</p>
                            <p className="text-sm text-gray-600">Total Reuniones</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar reuniones..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todos los tipos</option>
                            <option value="coordination">Coordinación</option>
                            <option value="technical">Técnica</option>
                            <option value="progress">Avance</option>
                            <option value="safety">Seguridad</option>
                        </select>

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="scheduled">Programada</option>
                            <option value="completed">Completada</option>
                            <option value="cancelled">Cancelada</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Meetings List */}
            <div className="space-y-4">
                {filteredMeetings.map((meeting) => (
                    <div key={meeting.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="bg-primary-100 p-3 rounded-lg">
                                    <FileText className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <div className="flex items-center space-x-1 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">{meeting.date} - {meeting.time}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-gray-600">
                                            <Users className="w-4 h-4" />
                                            <span className="text-sm">{meeting.attendees.length} asistentes</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Organizada por: {meeting.organizer}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(meeting.type)}`}>
                                    {getTypeLabel(meeting.type)}
                                </span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                                    {getStatusLabel(meeting.status)}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <p className="text-2xl font-bold text-blue-600">{meeting.decisions.length}</p>
                                <p className="text-sm text-blue-600">Decisiones</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">
                                    {meeting.actionItems.filter(a => a.status === 'completed').length}
                                </p>
                                <p className="text-sm text-green-600">Tareas Completadas</p>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                <p className="text-2xl font-bold text-yellow-600">
                                    {meeting.actionItems.filter(a => a.status !== 'completed').length}
                                </p>
                                <p className="text-sm text-yellow-600">Tareas Pendientes</p>
                            </div>
                        </div>

                        {/* Progress Bar for Action Items */}
                        {meeting.actionItems.length > 0 && (
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Progreso de Tareas</span>
                                    <span className="text-sm text-gray-500">
                                        {Math.round((meeting.actionItems.filter(a => a.status === 'completed').length / meeting.actionItems.length) * 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${(meeting.actionItems.filter(a => a.status === 'completed').length / meeting.actionItems.length) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="text-sm text-gray-500">
                                {meeting.status === 'completed' ? 'Reunión completada' :
                                    meeting.status === 'scheduled' ? 'Próxima reunión' : 'Reunión cancelada'}
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => openModal('view', meeting)}
                                    className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors text-sm flex items-center space-x-1"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Ver</span>
                                </button>
                                <button
                                    onClick={() => openModal('edit', meeting)}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 transition-colors text-sm flex items-center space-x-1"
                                >
                                    <Edit className="w-4 h-4" />
                                    <span>Editar</span>
                                </button>
                                <button
                                    onClick={() => downloadMinutes(meeting)}
                                    className="text-green-600 hover:text-green-900 px-3 py-1 rounded border border-green-200 hover:bg-green-50 transition-colors text-sm flex items-center space-x-1"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Descargar</span>
                                </button>
                                <button
                                    onClick={() => deleteMeeting(meeting.id)}
                                    className="text-red-600 hover:text-red-900 px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors text-sm flex items-center space-x-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMeetings.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron reuniones con los filtros aplicados</p>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {modalMode === 'create' ? 'Nueva Reunión' :
                                    modalMode === 'edit' ? 'Editar Reunión' : 'Ver Acta de Reunión'}
                            </h2>
                            <button
                                onClick={resetModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {modalMode === 'view' ? (
                                // View Mode
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                            <p className="text-gray-900">{selectedMeeting?.title}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
                                            <p className="text-gray-900">{selectedMeeting?.date} - {selectedMeeting?.time}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Lugar</label>
                                            <p className="text-gray-900">{selectedMeeting?.location}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Organizador</label>
                                            <p className="text-gray-900">{selectedMeeting?.organizer}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
                                        <p className="text-gray-900">{selectedMeeting?.objective}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Asistentes</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {selectedMeeting?.attendees.map((attendee, index) => (
                                                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                                    <Users className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm">{attendee}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Decisiones</label>
                                        <div className="space-y-2">
                                            {selectedMeeting?.decisions.map((decision) => (
                                                <div key={decision.id} className="p-3 bg-blue-50 border border-blue-200 rounded">
                                                    <p className="font-medium text-gray-900">{decision.description}</p>
                                                    <p className="text-sm text-gray-600">Responsable: {decision.responsible}</p>
                                                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${decision.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                            decision.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-green-100 text-green-800'
                                                        }`}>
                                                        Prioridad: {decision.priority}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tareas Asignadas</label>
                                        <div className="space-y-2">
                                            {selectedMeeting?.actionItems.map((action) => (
                                                <div key={action.id} className="p-3 bg-gray-50 border border-gray-200 rounded">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900">{action.description}</p>
                                                            <p className="text-sm text-gray-600">Responsable: {action.responsible}</p>
                                                            <p className="text-sm text-gray-600">Fecha límite: {action.dueDate}</p>
                                                        </div>
                                                        <div className="flex flex-col items-end space-y-1">
                                                            <span className={`px-2 py-1 text-xs rounded-full ${action.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                    action.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                {action.status}
                                                            </span>
                                                            <span className={`px-2 py-1 text-xs rounded-full ${action.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                                    action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-green-100 text-green-800'
                                                                }`}>
                                                                {action.priority}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Notas Adicionales</label>
                                        <p className="text-gray-900 bg-gray-50 p-3 rounded border">{selectedMeeting?.notes}</p>
                                    </div>
                                </div>
                            ) : (
                                // Create/Edit Mode
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                                            <input
                                                type="text"
                                                value={editingMeeting.title || ''}
                                                onChange={(e) => setEditingMeeting({ ...editingMeeting, title: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                placeholder="Título de la reunión"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                                            <select
                                                value={editingMeeting.type || 'coordination'}
                                                onChange={(e) => setEditingMeeting({ ...editingMeeting, type: e.target.value as any })}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            >
                                                <option value="coordination">Coordinación</option>
                                                <option value="technical">Técnica</option>
                                                <option value="progress">Avance</option>
                                                <option value="safety">Seguridad</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
                                            <input
                                                type="date"
                                                value={editingMeeting.date || ''}
                                                onChange={(e) => setEditingMeeting({ ...editingMeeting, date: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Hora *</label>
                                            <input
                                                type="time"
                                                value={editingMeeting.time || ''}
                                                onChange={(e) => setEditingMeeting({ ...editingMeeting, time: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Lugar</label>
                                            <input
                                                type="text"
                                                value={editingMeeting.location || ''}
                                                onChange={(e) => setEditingMeeting({ ...editingMeeting, location: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                placeholder="Lugar de la reunión"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Organizador *</label>
                                            <input
                                                type="text"
                                                value={editingMeeting.organizer || ''}
                                                onChange={(e) => setEditingMeeting({ ...editingMeeting, organizer: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                placeholder="Nombre del organizador"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                                        <select
                                            value={editingMeeting.status || 'scheduled'}
                                            onChange={(e) => setEditingMeeting({ ...editingMeeting, status: e.target.value as any })}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        >
                                            <option value="scheduled">Programada</option>
                                            <option value="completed">Completada</option>
                                            <option value="cancelled">Cancelada</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
                                        <textarea
                                            value={editingMeeting.objective || ''}
                                            onChange={(e) => setEditingMeeting({ ...editingMeeting, objective: e.target.value })}
                                            rows={3}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Objetivo de la reunión"
                                        />
                                    </div>

                                    {/* Asistentes */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700">Asistentes</label>
                                            <button
                                                type="button"
                                                onClick={addAttendee}
                                                className="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1"
                                            >
                                                <UserPlus className="w-4 h-4" />
                                                <span>Agregar</span>
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {editingMeeting.attendees?.map((attendee, index) => (
                                                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                                    <Users className="w-4 h-4 text-gray-500" />
                                                    <span className="flex-1 text-sm">{attendee}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeAttendee(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Decisiones */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700">Decisiones</label>
                                            <button
                                                type="button"
                                                onClick={addDecision}
                                                className="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1"
                                            >
                                                <Plus className="w-4 h-4" />
                                                <span>Agregar</span>
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {editingMeeting.decisions?.map((decision) => (
                                                <div key={decision.id} className="p-3 bg-blue-50 border border-blue-200 rounded">
                                                    <p className="font-medium text-gray-900">{decision.description}</p>
                                                    <p className="text-sm text-gray-600">Responsable: {decision.responsible}</p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${decision.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                                decision.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-green-100 text-green-800'
                                                            }`}>
                                                            Prioridad: {decision.priority}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const updatedDecisions = editingMeeting.decisions?.filter(d => d.id !== decision.id) || [];
                                                                setEditingMeeting({ ...editingMeeting, decisions: updatedDecisions });
                                                            }}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tareas */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700">Tareas Asignadas</label>
                                            <button
                                                type="button"
                                                onClick={addActionItem}
                                                className="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1"
                                            >
                                                <CheckSquare className="w-4 h-4" />
                                                <span>Agregar</span>
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {editingMeeting.actionItems?.map((action) => (
                                                <div key={action.id} className="p-3 bg-gray-50 border border-gray-200 rounded">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900">{action.description}</p>
                                                            <p className="text-sm text-gray-600">Responsable: {action.responsible}</p>
                                                            <p className="text-sm text-gray-600">Fecha límite: {action.dueDate}</p>
                                                        </div>
                                                        <div className="flex flex-col items-end space-y-1">
                                                            <select
                                                                value={action.status}
                                                                onChange={(e) => {
                                                                    const updatedActions = editingMeeting.actionItems?.map(a =>
                                                                        a.id === action.id ? { ...a, status: e.target.value as any } : a
                                                                    ) || [];
                                                                    setEditingMeeting({ ...editingMeeting, actionItems: updatedActions });
                                                                }}
                                                                className="text-xs border rounded px-2 py-1"
                                                            >
                                                                <option value="pending">Pendiente</option>
                                                                <option value="in-progress">En progreso</option>
                                                                <option value="completed">Completada</option>
                                                            </select>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updatedActions = editingMeeting.actionItems?.filter(a => a.id !== action.id) || [];
                                                                    setEditingMeeting({ ...editingMeeting, actionItems: updatedActions });
                                                                }}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Notas Adicionales</label>
                                        <textarea
                                            value={editingMeeting.notes || ''}
                                            onChange={(e) => setEditingMeeting({ ...editingMeeting, notes: e.target.value })}
                                            rows={4}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Notas adicionales de la reunión"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between p-6 border-t border-gray-200">
                            <div>
                                {modalMode === 'view' && selectedMeeting && (
                                    <button
                                        onClick={() => downloadMinutes(selectedMeeting)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Descargar Acta</span>
                                    </button>
                                )}
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={resetModal}
                                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    {modalMode === 'view' ? 'Cerrar' : 'Cancelar'}
                                </button>
                                {modalMode !== 'view' && (
                                    <button
                                        onClick={modalMode === 'create' ? createNewMeeting : updateMeeting}
                                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                                        disabled={!editingMeeting.title || !editingMeeting.date || !editingMeeting.organizer}
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>{modalMode === 'create' ? 'Crear Reunión' : 'Guardar Cambios'}</span>
                                    </button>
                                )}
                                {modalMode === 'view' && (
                                    <button
                                        onClick={() => setModalMode('edit')}
                                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span>Editar</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeetingMinutes;