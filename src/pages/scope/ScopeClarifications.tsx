// src/pages/scope/ScopeClarifications.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MessageSquare,
    Plus,
    Calendar,
    User,
    AlertCircle,
    CheckCircle,
    Clock,
    FileText,
    Send,
    Eye,
    Reply,
    Archive,
    Filter,
    Search
} from 'lucide-react';

interface ScopeClarification {
    id: string;
    clarificationId: string;
    title: string;
    description: string;
    requestedBy: string;
    assignedTo: string;
    discipline: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in_review' | 'responded' | 'closed';
    bidPackageId?: string;
    bidPackageName?: string;
    response?: string;
    responseDate?: string;
    responseBy?: string;
    createdAt: string;
    dueDate?: string;
    company: string;
}

// Mock data
const mockClarifications: ScopeClarification[] = [
    {
        id: 'cl-001',
        clarificationId: 'CL-2025-001',
        title: 'Especificaciones de ductos en zona técnica',
        description: 'Necesitamos clarificación sobre el tipo de ductos a utilizar en la zona técnica del sótano. Los planos muestran ductos rectangulares pero las especificaciones mencionan ductos circulares. ¿Cuál es la configuración correcta?',
        requestedBy: 'Ing. Roberto Vega',
        assignedTo: 'Ing. Carlos Mendoza',
        discipline: 'HVAC',
        priority: 'high',
        status: 'pending',
        bidPackageId: 'BP-2025-001',
        bidPackageName: 'Sistema HVAC - Torres A y B',
        createdAt: '2025-05-20T10:30:00Z',
        dueDate: '2025-05-27T23:59:59Z',
        company: 'HVAC Solutions S.A.C.'
    },
    {
        id: 'cl-002',
        clarificationId: 'CL-2025-002',
        title: 'Ubicación de tableros eléctricos principales',
        description: 'Los planos arquitectónicos muestran la ubicación de los tableros eléctricos principales en una posición diferente a la indicada en los planos eléctricos. Solicitamos confirmación de la ubicación definitiva.',
        requestedBy: 'Ing. Patricia Campos',
        assignedTo: 'Ing. María González',
        discipline: 'Eléctrico',
        priority: 'medium',
        status: 'in_review',
        bidPackageId: 'BP-2025-002',
        bidPackageName: 'Instalaciones Eléctricas - Nivel Sótano',
        createdAt: '2025-05-19T14:15:00Z',
        dueDate: '2025-05-26T23:59:59Z',
        company: 'Electro Instalaciones Perú'
    },
    {
        id: 'cl-003',
        clarificationId: 'CL-2025-003',
        title: 'Materiales para tuberías de agua helada',
        description: 'Las especificaciones técnicas no son claras respecto al tipo de aislamiento requerido para las tuberías de agua helada. ¿Se requiere aislamiento elastomérico o fibra de vidrio?',
        requestedBy: 'Ing. Fernando Morales',
        assignedTo: 'Ing. Carlos Pérez',
        discipline: 'Mecánico',
        priority: 'low',
        status: 'responded',
        response: 'Se requiere aislamiento elastomérico con espesor mínimo de 1" para tuberías de agua helada. Ver especificación técnica actualizada MT-HVAC-001-Rev02.',
        responseDate: '2025-05-18T16:30:00Z',
        responseBy: 'Ing. Carlos Pérez',
        createdAt: '2025-05-18T09:20:00Z',
        dueDate: '2025-05-25T23:59:59Z',
        company: 'MEP Contractors Inc.'
    },
    {
        id: 'cl-004',
        clarificationId: 'CL-2025-004',
        title: 'Sistema de detección en áreas de almacenamiento',
        description: 'Requerimos clarificación sobre el tipo de detectores de incendio a instalar en las áreas de almacenamiento de nivel sótano. ¿Son detectores de humo convencionales o direccionables?',
        requestedBy: 'Ing. Manuel Ochoa',
        assignedTo: 'Ing. Sofia Ramírez',
        discipline: 'Protección Contra Incendios',
        priority: 'high',
        status: 'responded',
        response: 'Se requieren detectores de humo direccionables con capacidad de comunicación con el panel central. Ver planos actualizados FP-101-Rev03 y especificación FP-DET-001.',
        responseDate: '2025-05-17T13:45:00Z',
        responseBy: 'Ing. Sofia Ramírez',
        createdAt: '2025-05-16T11:00:00Z',
        dueDate: '2025-05-23T23:59:59Z',
        company: 'Fire Protection Corp.'
    },
    {
        id: 'cl-005',
        clarificationId: 'CL-2025-005',
        title: 'Coordinación de penetraciones en losa',
        description: 'Necesitamos coordinar las penetraciones en losa para tuberías de plomería con el equipo estructural. ¿Existen restricciones específicas para las penetraciones en las zonas marcadas como críticas?',
        requestedBy: 'Ing. Rosa Medina',
        assignedTo: 'Ing. Ana López',
        discipline: 'Plomería',
        priority: 'medium',
        status: 'closed',
        response: 'Las penetraciones en zonas críticas requieren aprobación previa del ingeniero estructural. Se han definido ubicaciones permitidas según plano de coordinación PL-COORD-001. Clarificación cerrada.',
        responseDate: '2025-05-15T10:20:00Z',
        responseBy: 'Ing. Ana López',
        createdAt: '2025-05-14T16:30:00Z',
        dueDate: '2025-05-21T23:59:59Z',
        company: 'Plomería Industrial SAC'
    }
];

const ScopeClarifications: React.FC = () => {
    const [clarifications] = useState<ScopeClarification[]>(mockClarifications);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedPriority, setSelectedPriority] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-red-100 text-red-800';
            case 'in_review': return 'bg-yellow-100 text-yellow-800';
            case 'responded': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return 'Pendiente';
            case 'in_review': return 'En Revisión';
            case 'responded': return 'Respondida';
            case 'closed': return 'Cerrada';
            default: return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <AlertCircle className="w-4 h-4" />;
            case 'in_review': return <Clock className="w-4 h-4" />;
            case 'responded': return <CheckCircle className="w-4 h-4" />;
            case 'closed': return <Archive className="w-4 h-4" />;
            default: return <MessageSquare className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-50';
            case 'medium': return 'text-yellow-600 bg-yellow-50';
            case 'low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'high': return 'Alta';
            case 'medium': return 'Media';
            case 'low': return 'Baja';
            default: return priority;
        }
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getDaysUntilDue = (dueDate?: string): number | null => {
        if (!dueDate) return null;
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const filteredClarifications = clarifications.filter(cl => {
        const matchesSearch = cl.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cl.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cl.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cl.discipline.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = selectedStatus === 'all' || cl.status === selectedStatus;
        const matchesPriority = selectedPriority === 'all' || cl.priority === selectedPriority;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const statusCounts = {
        all: clarifications.length,
        pending: clarifications.filter(c => c.status === 'pending').length,
        in_review: clarifications.filter(c => c.status === 'in_review').length,
        responded: clarifications.filter(c => c.status === 'responded').length,
        closed: clarifications.filter(c => c.status === 'closed').length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-yellow-500 rounded-lg">
                        <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Clarificaciones del Alcance</h1>
                        <p className="text-gray-600">Gestión de clarificaciones con subcontratistas</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Nueva Clarificación</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
                        </div>
                        <MessageSquare className="w-8 h-8 text-gray-500" />
                    </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pendientes</p>
                            <p className="text-2xl font-bold text-red-600">{statusCounts.pending}</p>
                        </div>
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">En Revisión</p>
                            <p className="text-2xl font-bold text-yellow-600">{statusCounts.in_review}</p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Respondidas</p>
                            <p className="text-2xl font-bold text-green-600">{statusCounts.responded}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Cerradas</p>
                            <p className="text-2xl font-bold text-gray-600">{statusCounts.closed}</p>
                        </div>
                        <Archive className="w-8 h-8 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar clarificaciones..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filtros</span>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="pending">Pendiente</option>
                                <option value="in_review">En Revisión</option>
                                <option value="responded">Respondida</option>
                                <option value="closed">Cerrada</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                            <select
                                value={selectedPriority}
                                onChange={(e) => setSelectedPriority(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            >
                                <option value="all">Todas las prioridades</option>
                                <option value="high">Alta</option>
                                <option value="medium">Media</option>
                                <option value="low">Baja</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Clarifications List */}
            <div className="space-y-4">
                {filteredClarifications.map((clarification) => {
                    const daysUntilDue = getDaysUntilDue(clarification.dueDate);
                    const isOverdue = daysUntilDue !== null && daysUntilDue < 0;
                    const isDueSoon = daysUntilDue !== null && daysUntilDue <= 3 && daysUntilDue >= 0;

                    return (
                        <div 
                            key={clarification.id} 
                            className={`bg-white rounded-lg border-2 transition-all hover:shadow-md ${
                                isOverdue 
                                    ? 'border-red-200 bg-red-50' 
                                    : isDueSoon 
                                        ? 'border-yellow-200 bg-yellow-50'
                                        : 'border-gray-200'
                            }`}
                        >
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="text-sm font-medium text-gray-500">
                                                {clarification.clarificationId}
                                            </span>
                                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(clarification.status)}`}>
                                                {getStatusIcon(clarification.status)}
                                                <span className="ml-1">{getStatusLabel(clarification.status)}</span>
                                            </span>
                                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(clarification.priority)}`}>
                                                {getPriorityLabel(clarification.priority)}
                                            </span>
                                            {isOverdue && (
                                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                    Vencida
                                                </span>
                                            )}
                                            {isDueSoon && !isOverdue && (
                                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    Vence pronto
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {clarification.title}
                                        </h3>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                            <span>{clarification.discipline}</span>
                                            <span>•</span>
                                            <span>{clarification.company}</span>
                                            {clarification.bidPackageName && (
                                                <>
                                                    <span>•</span>
                                                    <span>{clarification.bidPackageName}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        {clarification.status === 'pending' && (
                                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                <Reply className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {clarification.description}
                                    </p>
                                </div>

                                {/* Response */}
                                {clarification.response && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span className="text-sm font-medium text-green-800">Respuesta</span>
                                            <span className="text-xs text-green-600">
                                                {clarification.responseBy} - {formatDate(clarification.responseDate!)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-green-800 leading-relaxed">
                                            {clarification.response}
                                        </p>
                                    </div>
                                )}

                                {/* Footer Info */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                                        <span className="flex items-center">
                                            <User className="w-4 h-4 mr-1" />
                                            Solicitado por {clarification.requestedBy}
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {formatDate(clarification.createdAt)}
                                        </span>
                                        {clarification.dueDate && (
                                            <span className={`flex items-center ${
                                                isOverdue 
                                                    ? 'text-red-600' 
                                                    : isDueSoon 
                                                        ? 'text-yellow-600' 
                                                        : 'text-gray-500'
                                            }`}>
                                                <Clock className="w-4 h-4 mr-1" />
                                                Vence: {formatDate(clarification.dueDate)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {clarification.status === 'pending' && (
                                            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1">
                                                <Send className="w-3 h-3" />
                                                <span>Responder</span>
                                            </button>
                                        )}
                                        {clarification.status === 'responded' && (
                                            <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-1">
                                                <Archive className="w-3 h-3" />
                                                <span>Cerrar</span>
                                            </button>
                                        )}
                                        <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-1">
                                            <FileText className="w-3 h-3" />
                                            <span>Ver Detalle</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredClarifications.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clarificaciones</h3>
                    <p className="text-gray-500 mb-4">
                        No se encontraron clarificaciones que coincidan con los filtros aplicados.
                    </p>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2 mx-auto">
                        <Plus className="w-4 h-4" />
                        <span>Nueva Clarificación</span>
                    </button>
                </div>
            )}

            {/* Back to Menu */}
            <div className="flex justify-center">
                <Link
                    to="/alcance"
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    ← Volver al Menú de Alcance
                </Link>
            </div>
        </div>
    );
};

export default ScopeClarifications;