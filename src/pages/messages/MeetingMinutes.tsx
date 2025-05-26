// src/pages/messages/MeetingMinutes.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FileText,
    Search,
    Calendar,
    Users,
    CheckCircle,
    Clock,
    ArrowLeft,
    Plus,
    Eye,
    Edit
} from 'lucide-react';

interface MeetingMinute {
    id: string;
    title: string;
    date: string;
    type: 'coordination' | 'technical' | 'progress' | 'safety';
    attendees: number;
    decisions: number;
    actionItems: number;
    completedActions: number;
    status: 'scheduled' | 'completed' | 'cancelled';
    organizer: string;
}

const mockMeetings: MeetingMinute[] = [
    {
        id: '1',
        title: 'Coordinación MEP Semanal - Semana 21',
        date: '2025-05-23',
        type: 'coordination',
        attendees: 8,
        decisions: 3,
        actionItems: 5,
        completedActions: 2,
        status: 'completed',
        organizer: 'Ing. Carlos Rodríguez'
    },
    {
        id: '2',
        title: 'Revisión Técnica HVAC - Zona A',
        date: '2025-05-22',
        type: 'technical',
        attendees: 5,
        decisions: 2,
        actionItems: 4,
        completedActions: 4,
        status: 'completed',
        organizer: 'Ing. Luis Torres'
    },
    {
        id: '3',
        title: 'Seguimiento de Avance Mensual',
        date: '2025-05-25',
        type: 'progress',
        attendees: 12,
        decisions: 0,
        actionItems: 0,
        completedActions: 0,
        status: 'scheduled',
        organizer: 'Ing. María González'
    },
    {
        id: '4',
        title: 'Reunión de Seguridad - Mayo',
        date: '2025-05-20',
        type: 'safety',
        attendees: 15,
        decisions: 4,
        actionItems: 8,
        completedActions: 6,
        status: 'completed',
        organizer: 'Depto. Seguridad'
    }
];

const MeetingMinutes: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

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

    const filteredMeetings = mockMeetings.filter(meeting => {
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
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
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
                            <p className="text-2xl font-bold text-gray-900">{mockMeetings.length}</p>
                            <p className="text-sm text-gray-600">Total Reuniones</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-500 p-2 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">
                                {mockMeetings.filter(m => m.status === 'completed').length}
                            </p>
                            <p className="text-sm text-gray-600">Completadas</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-yellow-500 p-2 rounded-lg">
                            <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">
                                {mockMeetings.reduce((sum, m) => sum + (m.actionItems - m.completedActions), 0)}
                            </p>
                            <p className="text-sm text-gray-600">Tareas Pendientes</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-purple-500 p-2 rounded-lg">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">
                                {mockMeetings.reduce((sum, m) => sum + m.attendees, 0)}
                            </p>
                            <p className="text-sm text-gray-600">Total Asistentes</p>
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
                                            <span className="text-sm">{meeting.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-gray-600">
                                            <Users className="w-4 h-4" />
                                            <span className="text-sm">{meeting.attendees} asistentes</span>
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
                                <p className="text-2xl font-bold text-blue-600">{meeting.decisions}</p>
                                <p className="text-sm text-blue-600">Decisiones</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">{meeting.completedActions}</p>
                                <p className="text-sm text-green-600">Tareas Completadas</p>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                <p className="text-2xl font-bold text-yellow-600">{meeting.actionItems - meeting.completedActions}</p>
                                <p className="text-sm text-yellow-600">Tareas Pendientes</p>
                            </div>
                        </div>

                        {/* Progress Bar for Action Items */}
                        {meeting.actionItems > 0 && (
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Progreso de Tareas</span>
                                    <span className="text-sm text-gray-500">
                                        {Math.round((meeting.completedActions / meeting.actionItems) * 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(meeting.completedActions / meeting.actionItems) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="text-sm text-gray-500">
                                {meeting.status === 'completed' ? 'Reunión completada' : meeting.status === 'scheduled' ? 'Próxima reunión' : 'Reunión cancelada'}
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors text-sm flex items-center space-x-1">
                                    <Eye className="w-4 h-4" />
                                    <span>Ver Acta</span>
                                </button>
                                {meeting.status !== 'cancelled' && (
                                    <button className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 transition-colors text-sm flex items-center space-x-1">
                                        <Edit className="w-4 h-4" />
                                        <span>Editar</span>
                                    </button>
                                )}
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
        </div>
    );
};

export default MeetingMinutes;