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
    Building
} from 'lucide-react';

interface Submittal {
    id: string;
    submittalNumber: string;
    title: string;
    discipline: string;
    contractor: string;
    status: 'received' | 'review' | 'approved' | 'rejected' | 'resubmit';
    submittalType: 'shop_drawings' | 'product_data' | 'samples' | 'certificates' | 'test_reports';
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
        title: 'Tableros Eléctricos Principales - Especificaciones',
        discipline: 'Eléctrico',
        contractor: 'Electro Instalaciones Perú',
        status: 'review',
        submittalType: 'shop_drawings',
        dueDate: '2025-05-30',
        submittedDate: '2025-05-22',
        priority: 'high',
        progress: 60
    },
    {
        id: '2',
        submittalNumber: 'SUB-HVAC-002',
        title: 'Equipos Manejadoras de Aire - Fichas Técnicas',
        discipline: 'HVAC',
        contractor: 'HVAC Solutions S.A.C.',
        status: 'approved',
        submittalType: 'product_data',
        dueDate: '2025-05-25',
        submittedDate: '2025-05-20',
        reviewDate: '2025-05-23',
        priority: 'critical',
        progress: 100
    },
    {
        id: '3',
        submittalNumber: 'SUB-PLU-003',
        title: 'Válvulas y Accesorios de Plomería - Muestras',
        discipline: 'Plomería',
        contractor: 'Plomería Industrial SAC',
        status: 'rejected',
        submittalType: 'samples',
        dueDate: '2025-05-28',
        submittedDate: '2025-05-21',
        reviewDate: '2025-05-24',
        priority: 'medium',
        progress: 0
    },
    {
        id: '4',
        submittalNumber: 'SUB-FP-004',
        title: 'Certificados de Rociadores Contra Incendios',
        discipline: 'Protección Contra Incendios',
        contractor: 'Fire Protection Corp.',
        status: 'received',
        submittalType: 'certificates',
        dueDate: '2025-06-01',
        submittedDate: '2025-05-23',
        priority: 'high',
        progress: 25
    },
    {
        id: '5',
        submittalNumber: 'SUB-ELE-005',
        title: 'Reportes de Pruebas de Cableado',
        discipline: 'Eléctrico',
        contractor: 'Electro Instalaciones Perú',
        status: 'resubmit',
        submittalType: 'test_reports',
        dueDate: '2025-05-27',
        submittedDate: '2025-05-19',
        reviewDate: '2025-05-22',
        priority: 'medium',
        progress: 40
    }
];

const SubmittalsManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDiscipline, setFilterDiscipline] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

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
            case 'shop_drawings': return 'Planos de Taller';
            case 'product_data': return 'Datos de Producto';
            case 'samples': return 'Muestras';
            case 'certificates': return 'Certificados';
            case 'test_reports': return 'Reportes de Prueba';
            default: return type;
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

    const filteredSubmittals = mockSubmittals.filter(submittal => {
        const matchesSearch = submittal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            submittal.submittalNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            submittal.contractor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || submittal.status === filterStatus;
        const matchesDiscipline = filterDiscipline === 'all' || submittal.discipline === filterDiscipline;
        const matchesPriority = filterPriority === 'all' || submittal.priority === filterPriority;
        
        return matchesSearch && matchesStatus && matchesDiscipline && matchesPriority;
    });

    const disciplines = Array.from(new Set(mockSubmittals.map(s => s.discipline)));

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
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
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
                            <p className="text-2xl font-bold text-gray-900">{mockSubmittals.length}</p>
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
                                {mockSubmittals.filter(s => s.status === 'approved').length}
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
                                {mockSubmittals.filter(s => s.status === 'review').length}
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
                                {mockSubmittals.filter(s => s.status === 'rejected').length}
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
                                <button className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors text-sm">
                                    Ver Detalles
                                </button>
                                {submittal.status === 'review' && (
                                    <button className="text-green-600 hover:text-green-900 px-3 py-1 rounded border border-green-200 hover:bg-green-50 transition-colors text-sm">
                                        Revisar
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
        </div>
    );
};

export default SubmittalsManagement;