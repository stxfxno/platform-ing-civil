// src/pages/messages/FormalCommunications.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Mail,
    Search,
    FileText,
    Clock,
    ArrowLeft,
    Plus,
    Reply,
    Paperclip
} from 'lucide-react';

interface FormalCommunication {
    id: string;
    subject: string;
    type: 'email' | 'letter' | 'directive' | 'field_note' | 'memo';
    from: string;
    to: string[];
    date: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'sent' | 'delivered' | 'read' | 'responded';
    hasAttachments: boolean;
    responseRequired: boolean;
    responseDeadline?: string;
}

const mockCommunications: FormalCommunication[] = [
    {
        id: '1',
        subject: 'Aprobación de Especificaciones HVAC - Revisión Final',
        type: 'email',
        from: 'Ing. Luis Torres',
        to: ['Cliente', 'Supervisor'],
        date: '2025-05-23',
        priority: 'high',
        status: 'delivered',
        hasAttachments: true,
        responseRequired: true,
        responseDeadline: '2025-05-25'
    },
    {
        id: '2',
        subject: 'Directiva de Seguridad - Trabajo en Altura',
        type: 'directive',
        from: 'Depto. Seguridad',
        to: ['Todos los Contratistas'],
        date: '2025-05-22',
        priority: 'urgent',
        status: 'read',
        hasAttachments: false,
        responseRequired: false
    },
    {
        id: '3',
        subject: 'Nota de Campo - Interferencia Estructural Zona B',
        type: 'field_note',
        from: 'Ing. Ana López',
        to: ['Residente', 'Estructuras'],
        date: '2025-05-21',
        priority: 'medium',
        status: 'responded',
        hasAttachments: true,
        responseRequired: true,
        responseDeadline: '2025-05-24'
    },
    {
        id: '4',
        subject: 'Memo - Cambio de Cronograma Instalaciones Eléctricas',
        type: 'memo',
        from: 'Ing. María González',
        to: ['Equipo MEP', 'Planificación'],
        date: '2025-05-20',
        priority: 'high',
        status: 'read',
        hasAttachments: false,
        responseRequired: false
    },
    {
        id: '5',
        subject: 'Carta Formal - Solicitud de Extensión de Plazo',
        type: 'letter',
        from: 'Gerencia Proyecto',
        to: ['Cliente'],
        date: '2025-05-19',
        priority: 'urgent',
        status: 'sent',
        hasAttachments: true,
        responseRequired: true,
        responseDeadline: '2025-05-26'
    }
];

const FormalCommunications: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'email': return <Mail className="w-5 h-5 text-blue-600" />;
            case 'letter': return <FileText className="w-5 h-5 text-green-600" />;
            case 'directive': return <FileText className="w-5 h-5 text-red-600" />;
            case 'field_note': return <FileText className="w-5 h-5 text-yellow-600" />;
            case 'memo': return <FileText className="w-5 h-5 text-purple-600" />;
            default: return <Mail className="w-5 h-5 text-gray-600" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'email': return 'bg-blue-100 text-blue-800';
            case 'letter': return 'bg-green-100 text-green-800';
            case 'directive': return 'bg-red-100 text-red-800';
            case 'field_note': return 'bg-yellow-100 text-yellow-800';
            case 'memo': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'email': return 'Email';
            case 'letter': return 'Carta';
            case 'directive': return 'Directiva';
            case 'field_note': return 'Nota de Campo';
            case 'memo': return 'Memo';
            default: return type;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'text-red-600 bg-red-50';
            case 'high': return 'text-orange-600 bg-orange-50';
            case 'medium': return 'text-yellow-600 bg-yellow-50';
            case 'low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'responded': return 'bg-green-100 text-green-800';
            case 'read': return 'bg-blue-100 text-blue-800';
            case 'delivered': return 'bg-yellow-100 text-yellow-800';
            case 'sent': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'responded': return 'Respondido';
            case 'read': return 'Leído';
            case 'delivered': return 'Entregado';
            case 'sent': return 'Enviado';
            default: return status;
        }
    };

    const isOverdue = (deadline?: string) => {
        if (!deadline) return false;
        return new Date(deadline) < new Date();
    };

    const filteredCommunications = mockCommunications.filter(comm => {
        const matchesSearch = comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            comm.from.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || comm.type === filterType;
        const matchesStatus = filterStatus === 'all' || comm.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || comm.priority === filterPriority;
        
        return matchesSearch && matchesType && matchesStatus && matchesPriority;
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
                        <h1 className="text-2xl font-bold text-gray-900">Comunicaciones Formales</h1>
                        <p className="text-gray-600">Archivo de comunicaciones oficiales y correspondencia</p>
                    </div>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Nueva Comunicación</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar comunicaciones..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todos los tipos</option>
                            <option value="email">Email</option>
                            <option value="letter">Carta</option>
                            <option value="directive">Directiva</option>
                            <option value="field_note">Nota de Campo</option>
                            <option value="memo">Memo</option>
                        </select>

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="sent">Enviado</option>
                            <option value="delivered">Entregado</option>
                            <option value="read">Leído</option>
                            <option value="responded">Respondido</option>
                        </select>

                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todas las prioridades</option>
                            <option value="urgent">Urgente</option>
                            <option value="high">Alta</option>
                            <option value="medium">Media</option>
                            <option value="low">Baja</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Communications List */}
            <div className="space-y-4">
                {filteredCommunications.map((comm) => (
                    <div key={comm.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4">
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    {getTypeIcon(comm.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{comm.subject}</h3>
                                        {comm.hasAttachments && (
                                            <Paperclip className="w-4 h-4 text-gray-400" />
                                        )}
                                        {comm.responseRequired && isOverdue(comm.responseDeadline) && (
                                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                                Vencida
                                            </span>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">De:</span>
                                            <p className="font-medium text-gray-900">{comm.from}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Para:</span>
                                            <p className="font-medium text-gray-900">{comm.to.join(', ')}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Fecha:</span>
                                            <p className="font-medium text-gray-900">{comm.date}</p>
                                        </div>
                                        {comm.responseDeadline && (
                                            <div>
                                                <span className="text-gray-500">Respuesta hasta:</span>
                                                <p className={`font-medium ${isOverdue(comm.responseDeadline) ? 'text-red-600' : 'text-gray-900'}`}>
                                                    {comm.responseDeadline}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                                <div className="flex items-center space-x-2">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(comm.type)}`}>
                                        {getTypeLabel(comm.type)}
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(comm.status)}`}>
                                        {getStatusLabel(comm.status)}
                                    </span>
                                </div>
                                <div className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(comm.priority)}`}>
                                    Prioridad: {comm.priority.charAt(0).toUpperCase() + comm.priority.slice(1)}
                                </div>
                            </div>
                        </div>

                        {/* Response Required Alert */}
                        {comm.responseRequired && comm.status !== 'responded' && (
                            <div className={`p-3 rounded-lg mb-4 ${isOverdue(comm.responseDeadline) ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                                <div className="flex items-center space-x-2">
                                    <Clock className={`w-4 h-4 ${isOverdue(comm.responseDeadline) ? 'text-red-600' : 'text-yellow-600'}`} />
                                    <span className={`text-sm font-medium ${isOverdue(comm.responseDeadline) ? 'text-red-800' : 'text-yellow-800'}`}>
                                        {isOverdue(comm.responseDeadline) ? 'Respuesta vencida' : 'Respuesta requerida'}
                                        {comm.responseDeadline && ` - Fecha límite: ${comm.responseDeadline}`}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="flex items-center space-x-4">
                                
                            </div>
                            <div className="flex items-center space-x-2">
                                {comm.responseRequired && comm.status !== 'responded' && (
                                    <button className="text-green-600 hover:text-green-900 px-3 py-1 rounded border border-green-200 hover:bg-green-50 transition-colors text-sm flex items-center space-x-1">
                                        <Reply className="w-4 h-4" />
                                        <span>Responder</span>
                                    </button>
                                )}
                                {comm.hasAttachments && (
                                    <button className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 transition-colors text-sm flex items-center space-x-1">
                                        <Paperclip className="w-4 h-4" />
                                        <span>Descargar</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCommunications.length === 0 && (
                <div className="text-center py-12">
                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron comunicaciones con los filtros aplicados</p>
                </div>
            )}
        </div>
    );
};

export default FormalCommunications;