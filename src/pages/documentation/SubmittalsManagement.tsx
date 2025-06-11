// src/pages/documentation/SubmittalsManagement.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Upload,
    Search,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertTriangle,
    FileText,
    ArrowLeft,
    Building,
    Edit,
    Save,
    X,
    Eye,
    Trash2
} from 'lucide-react';

interface Submittal {
    id: string;
    submittalNumber: string;
    title: string;
    discipline: 'Mecanicas' | 'Plomeria' | 'Electricas';
    contractor: string;
    status: 'received' | 'review' | 'approved' | 'rejected' | 'resubmit';
    submittalType: 'reporte_avance' | 'registro_fotografico' | 'incidencias' | 'especificaciones_tecnicas' | 'planos_instalacion' | 'certificados_calidad' | 'manuales_operacion';
    dueDate: string;
    submittedDate?: string;
    reviewDate?: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    progress: number;
}

const mockSubmittals: Submittal[] = [
    {
        id: '1',
        submittalNumber: 'SUB-ELE-001',
        title: 'Reporte de Avance - Instalación Tableros Eléctricos',
        discipline: 'Electricas',
        contractor: 'Electro Instalaciones Perú',
        status: 'review',
        submittalType: 'reporte_avance',
        dueDate: '2025-06-15',
        submittedDate: '2025-06-08',
        priority: 'high',
        progress: 60
    },
    {
        id: '2',
        submittalNumber: 'SUB-HVAC-002',
        title: 'Especificaciones Técnicas - Equipos HVAC',
        discipline: 'Mecanicas',
        contractor: 'HVAC Solutions S.A.C.',
        status: 'approved',
        submittalType: 'especificaciones_tecnicas',
        dueDate: '2025-06-12',
        submittedDate: '2025-06-05',
        reviewDate: '2025-06-08',
        priority: 'critical',
        progress: 100
    },
    {
        id: '3',
        submittalNumber: 'SUB-PLU-003',
        title: 'Registro Fotográfico - Instalación Tuberías',
        discipline: 'Plomeria',
        contractor: 'Plomería Industrial SAC',
        status: 'rejected',
        submittalType: 'registro_fotografico',
        dueDate: '2025-06-10',
        submittedDate: '2025-06-03',
        reviewDate: '2025-06-06',
        priority: 'medium',
        progress: 0
    },
    {
        id: '4',
        submittalNumber: 'SUB-FP-004',
        title: 'Incidencias - Sistema Contra Incendios',
        discipline: 'Mecanicas',
        contractor: 'Fire Protection Corp.',
        status: 'received',
        submittalType: 'incidencias',
        dueDate: '2025-06-18',
        submittedDate: '2025-06-09',
        priority: 'high',
        progress: 25
    },
    {
        id: '5',
        submittalNumber: 'SUB-ELE-005',
        title: 'Certificados de Calidad - Cableado Eléctrico',
        discipline: 'Electricas',
        contractor: 'Electro Instalaciones Perú',
        status: 'resubmit',
        submittalType: 'certificados_calidad',
        dueDate: '2025-06-14',
        submittedDate: '2025-06-01',
        reviewDate: '2025-06-04',
        priority: 'medium',
        progress: 40
    }
];

const SubmittalsManagement: React.FC = () => {
    const [submittals, setSubmittals] = useState<Submittal[]>(mockSubmittals);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDiscipline, setFilterDiscipline] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedSubmittal, setSelectedSubmittal] = useState<Submittal | null>(null);
    const [newSubmittal, setNewSubmittal] = useState({
        title: '',
        contractor: '',
        discipline: 'Mecanicas' as Submittal['discipline'],
        dueDate: '',
        submittalType: 'reporte_avance' as Submittal['submittalType']
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'review': return 'bg-blue-100 text-blue-800';
            case 'received': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'resubmit': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'review': return <Clock className="w-4 h-4 text-blue-600" />;
            case 'received': return <Upload className="w-4 h-4 text-yellow-600" />;
            case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
            case 'resubmit': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
            default: return <FileText className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'approved': return 'Aprobado';
            case 'review': return 'En Revisión';
            case 'received': return 'Recibido';
            case 'rejected': return 'Rechazado';
            case 'resubmit': return 'Reenviar';
            default: return status;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'reporte_avance': return 'Reporte de Avance';
            case 'registro_fotografico': return 'Registro Fotográfico';
            case 'incidencias': return 'Incidencias';
            case 'especificaciones_tecnicas': return 'Especificaciones Técnicas';
            case 'planos_instalacion': return 'Planos de Instalación';
            case 'certificados_calidad': return 'Certificados de Calidad';
            case 'manuales_operacion': return 'Manuales de Operación';
            default: return type;
        }
    };

    const generateSubmittalNumber = (discipline: string, type: string) => {
        const disciplineCode = discipline === 'Electricas' ? 'ELE' : 
                              discipline === 'Mecanicas' ? 'MEC' : 'PLU';
        const typeCode = type.substring(0, 3).toUpperCase();
        const number = (submittals.length + 1).toString().padStart(3, '0');
        return `SUB-${disciplineCode}-${typeCode}-${number}`;
    };

    const getCurrentDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    const generatePriority = (dueDate: string): Submittal['priority'] => {
        const today = new Date();
        const due = new Date(dueDate);
        const daysUntilDue = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDue <= 3) return 'critical';
        if (daysUntilDue <= 7) return 'high';
        if (daysUntilDue <= 14) return 'medium';
        return 'low';
    };

    const handleCreateSubmittal = () => {
        if (!newSubmittal.title || !newSubmittal.contractor || !newSubmittal.dueDate) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        const submittalToAdd: Submittal = {
            id: Date.now().toString(),
            submittalNumber: generateSubmittalNumber(newSubmittal.discipline, newSubmittal.submittalType),
            title: newSubmittal.title,
            discipline: newSubmittal.discipline,
            contractor: newSubmittal.contractor,
            status: 'review', // Por defecto en revisión
            submittalType: newSubmittal.submittalType,
            dueDate: newSubmittal.dueDate,
            submittedDate: getCurrentDate(),
            priority: generatePriority(newSubmittal.dueDate),
            progress: 0
        };

        setSubmittals(prev => [...prev, submittalToAdd]);
        setShowModal(false);
        setNewSubmittal({
            title: '',
            contractor: '',
            discipline: 'Mecanicas',
            dueDate: '',
            submittalType: 'reporte_avance'
        });
    };

    const handleViewDetails = (submittal: Submittal) => {
        setSelectedSubmittal(submittal);
        setShowDetailsModal(true);
    };

    const handleReview = (submittal: Submittal) => {
        setSelectedSubmittal(submittal);
        setShowReviewModal(true);
    };

    const handleApproveReject = (action: 'approved' | 'rejected') => {
        if (selectedSubmittal) {
            setSubmittals(prev => 
                prev.map(s => 
                    s.id === selectedSubmittal.id 
                        ? { 
                            ...s, 
                            status: action, 
                            reviewDate: getCurrentDate(),
                            progress: action === 'approved' ? 100 : 0
                        }
                        : s
                )
            );
            setShowReviewModal(false);
            setSelectedSubmittal(null);
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm('¿Está seguro de que desea eliminar este submittal?')) {
            setSubmittals(prev => prev.filter(s => s.id !== id));
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'text-red-600 bg-red-50';
            case 'high': return 'text-orange-600 bg-orange-50';
            case 'medium': return 'text-yellow-600 bg-yellow-50';
            case 'low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const isOverdue = (dueDate: string) => {
        return new Date(dueDate) < new Date();
    };

    const filteredSubmittals = submittals.filter(submittal => {
        const matchesSearch = submittal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            submittal.submittalNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            submittal.contractor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || submittal.status === filterStatus;
        const matchesDiscipline = filterDiscipline === 'all' || submittal.discipline === filterDiscipline;
        const matchesPriority = filterPriority === 'all' || submittal.priority === filterPriority;
        
        return matchesSearch && matchesStatus && matchesDiscipline && matchesPriority;
    });

    const disciplines = Array.from(new Set(submittals.map(s => s.discipline)));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        to="/documentacion"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Gestión de Submittals</h1>
                        <p className="text-gray-600">Submittals y entregables MEP del proyecto</p>
                    </div>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                    <Upload className="w-4 h-4" />
                    <span>Nuevo Submittal</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <Upload className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{submittals.length}</p>
                            <p className="text-sm text-gray-600">Total</p>
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
                                {submittals.filter(s => s.status === 'approved').length}
                            </p>
                            <p className="text-sm text-gray-600">Aprobados</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-600">
                                {submittals.filter(s => s.status === 'review').length}
                            </p>
                            <p className="text-sm text-gray-600">En Revisión</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-red-500 p-2 rounded-lg">
                            <XCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-600">
                                {submittals.filter(s => s.status === 'rejected').length}
                            </p>
                            <p className="text-sm text-gray-600">Rechazados</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar submittals..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="received">Recibido</option>
                            <option value="review">En Revisión</option>
                            <option value="approved">Aprobado</option>
                            <option value="rejected">Rechazado</option>
                            <option value="resubmit">Reenviar</option>
                        </select>

                        <select
                            value={filterDiscipline}
                            onChange={(e) => setFilterDiscipline(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todas las disciplinas</option>
                            {disciplines.map(discipline => (
                                <option key={discipline} value={discipline}>{discipline}</option>
                            ))}
                        </select>

                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todas las prioridades</option>
                            <option value="critical">Crítica</option>
                            <option value="high">Alta</option>
                            <option value="medium">Media</option>
                            <option value="low">Baja</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Submittals Cards */}
            <div className="space-y-4">
                {filteredSubmittals.map((submittal) => (
                    <div key={submittal.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="bg-primary-100 p-3 rounded-lg">
                                    <Upload className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 mb-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{submittal.submittalNumber}</h3>
                                        {isOverdue(submittal.dueDate) && submittal.status !== 'approved' && (
                                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                                Vencido
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600">{submittal.title}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <span className="text-sm text-gray-500">
                                            <Building className="w-4 h-4 inline mr-1" />
                                            {submittal.contractor}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {getTypeLabel(submittal.submittalType)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(submittal.status)}`}>
                                    {getStatusIcon(submittal.status)}
                                    <span className="ml-1">{getStatusLabel(submittal.status)}</span>
                                </span>
                                <div className={`text-xs px-2 py-1 rounded-full mt-2 ${getPriorityColor(submittal.priority)}`}>
                                    Prioridad: {submittal.priority.charAt(0).toUpperCase() + submittal.priority.slice(1)}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <span className="text-sm text-gray-500">Disciplina:</span>
                                <p className="font-medium text-gray-900">{submittal.discipline}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Subcontrata:</span>
                                <p className="font-medium text-gray-900">{submittal.contractor}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Fecha Límite:</span>
                                <p className={`font-medium ${isOverdue(submittal.dueDate) && submittal.status !== 'approved' ? 'text-red-600' : 'text-gray-900'}`}>
                                    {submittal.dueDate}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Enviado:</span>
                                <p className="font-medium text-gray-900">{submittal.submittedDate || 'Pendiente'}</p>
                            </div>
                        </div>
                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                    {submittal.submittedDate ? `Enviado el ${submittal.submittedDate}` : 'Pendiente de envío'}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button 
                                    onClick={() => handleViewDetails(submittal)}
                                    className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors text-sm flex items-center space-x-1"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Ver Detalles</span>
                                </button>
                                {submittal.status === 'review' && (
                                    <button 
                                        onClick={() => handleReview(submittal)}
                                        className="text-green-600 hover:text-green-900 px-3 py-1 rounded border border-green-200 hover:bg-green-50 transition-colors text-sm flex items-center space-x-1"
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span>Revisar</span>
                                    </button>
                                )}
                                {(submittal.status === 'received' || submittal.status === 'resubmit') && (
                                    <button 
                                        onClick={() => handleDelete(submittal.id)}
                                        className="text-red-600 hover:text-red-900 px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors text-sm flex items-center space-x-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Eliminar</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSubmittals.length === 0 && (
                <div className="text-center py-12">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron submittals con los filtros aplicados</p>
                </div>
            )}

            {/* Modal para Nuevo Submittal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">Nuevo Submittal</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); handleCreateSubmittal(); }} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Título <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={newSubmittal.title}
                                        onChange={(e) => setNewSubmittal(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Título del submittal"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subcontrata <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={newSubmittal.contractor}
                                        onChange={(e) => setNewSubmittal(prev => ({ ...prev, contractor: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    >
                                        <option value="">Seleccionar subcontrata</option>
                                        <option value="Electro Instalaciones Perú">Electro Instalaciones Perú</option>
                                        <option value="HVAC Solutions S.A.C.">HVAC Solutions S.A.C.</option>
                                        <option value="Plomería Industrial SAC">Plomería Industrial SAC</option>
                                        <option value="Fire Protection Corp.">Fire Protection Corp.</option>
                                        <option value="MEP Contractors Inc.">MEP Contractors Inc.</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Especialidad <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={newSubmittal.discipline}
                                        onChange={(e) => setNewSubmittal(prev => ({ 
                                            ...prev, 
                                            discipline: e.target.value as Submittal['discipline'] 
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    >
                                        <option value="Mecanicas">Mecánicas</option>
                                        <option value="Plomeria">Plomería</option>
                                        <option value="Electricas">Eléctricas</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha Límite <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={newSubmittal.dueDate}
                                        onChange={(e) => setNewSubmittal(prev => ({ ...prev, dueDate: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        min={getCurrentDate()}
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        La prioridad se asignará automáticamente según la fecha límite
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipo de Submittal <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={newSubmittal.submittalType}
                                        onChange={(e) => setNewSubmittal(prev => ({ 
                                            ...prev, 
                                            submittalType: e.target.value as Submittal['submittalType'] 
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    >
                                        <option value="reporte_avance">Reporte de Avance</option>
                                        <option value="registro_fotografico">Registro Fotográfico</option>
                                        <option value="incidencias">Incidencias</option>
                                        <option value="especificaciones_tecnicas">Especificaciones Técnicas</option>
                                        <option value="planos_instalacion">Planos de Instalación</option>
                                        <option value="certificados_calidad">Certificados de Calidad</option>
                                        <option value="manuales_operacion">Manuales de Operación</option>
                                    </select>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        <strong>Fechas automáticas:</strong><br />
                                        • Fecha de envío: {getCurrentDate()} (hoy)<br />
                                        • Estado inicial: En Revisión
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Crear Submittal</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Ver Detalles */}
            {showDetailsModal && selectedSubmittal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">Detalles del Submittal</h2>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Número de Submittal</label>
                                        <p className="text-gray-900 font-medium">{selectedSubmittal.submittalNumber}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Estado</label>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedSubmittal.status)}`}>
                                            {getStatusIcon(selectedSubmittal.status)}
                                            <span className="ml-1">{getStatusLabel(selectedSubmittal.status)}</span>
                                        </span>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Título</label>
                                        <p className="text-gray-900">{selectedSubmittal.title}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Disciplina</label>
                                        <p className="text-gray-900">{selectedSubmittal.discipline}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Subcontrata</label>
                                        <p className="text-gray-900">{selectedSubmittal.contractor}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                                        <p className="text-gray-900">{getTypeLabel(selectedSubmittal.submittalType)}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Prioridad</label>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedSubmittal.priority)}`}>
                                            {selectedSubmittal.priority.charAt(0).toUpperCase() + selectedSubmittal.priority.slice(1)}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Fecha Límite</label>
                                        <p className="text-gray-900">{selectedSubmittal.dueDate}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Fecha de Envío</label>
                                        <p className="text-gray-900">{selectedSubmittal.submittedDate || 'No enviado'}</p>
                                    </div>
                                    {selectedSubmittal.reviewDate && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Fecha de Revisión</label>
                                            <p className="text-gray-900">{selectedSubmittal.reviewDate}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Revisar */}
            {showReviewModal && selectedSubmittal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">Revisar Submittal</h2>
                                <button
                                    onClick={() => setShowReviewModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-600 mb-2">
                                    <strong>{selectedSubmittal.submittalNumber}</strong>
                                </p>
                                <p className="text-gray-900">{selectedSubmittal.title}</p>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => handleApproveReject('approved')}
                                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Aprobar</span>
                                </button>
                                <button
                                    onClick={() => handleApproveReject('rejected')}
                                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <XCircle className="w-4 h-4" />
                                    <span>Rechazar</span>
                                </button>
                            </div>

                            <div className="mt-3">
                                <button
                                    onClick={() => setShowReviewModal(false)}
                                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmittalsManagement;