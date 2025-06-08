import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    DollarSign,
    Plus,
    Calendar,
    User,
    MapPin,
    AlertCircle,
    CheckCircle,
    X,
    Clock,
    Filter,
    Search,
    FileText,
    Building
} from 'lucide-react';

interface Budget {
    id: string;
    budgetNumber: string;
    title: string;
    description: string;
    requestedBy: string;
    company: string;
    subcontractor: string;
    discipline: 'mecanica' | 'electrica' | 'plomeria';
    destinatario: string;
    location: string;
    requestReason: string;
    priority: 'baja' | 'media' | 'alta' | 'urgente';
    status: 'pending' | 'approved' | 'rejected';
    dueDate: string;
    createdAt: string;
    estimatedValue?: number;
    currency: string;
}

// Mock data
const mockBudgets: Budget[] = [
    {
        id: 'budget-001',
        budgetNumber: 'PRES-2025-001',
        title: 'Sistema HVAC - Área Administrativa',
        description: 'Presupuesto para instalación completa del sistema HVAC en área administrativa incluyendo ductos, equipos principales y controles automáticos.',
        requestedBy: 'Ing. Carlos Mendoza',
        company: 'HVAC Solutions S.A.C.',
        subcontractor: 'Climatización Total SAC',
        discipline: 'mecanica',
        destinatario: 'Gerencia de Proyectos',
        location: 'Piso 3, Área Administrativa',
        requestReason: 'Expansión del sistema de climatización según nuevos requerimientos del cliente',
        priority: 'alta',
        status: 'pending',
        dueDate: '2025-06-06',
        createdAt: '2025-06-03T10:30:00Z',
        estimatedValue: 85000,
        currency: 'USD'
    },
    {
        id: 'budget-002',
        budgetNumber: 'PRES-2025-002',
        title: 'Instalaciones Eléctricas - Emergencia',
        description: 'Cotización urgente para reparación y mejoras del sistema eléctrico de emergencia tras falla detectada en inspección.',
        requestedBy: 'Ing. María González',
        company: 'Electro Instalaciones Perú',
        subcontractor: 'Sistemas Eléctricos SAC',
        discipline: 'electrica',
        destinatario: 'Ing. Roberto Silva',
        location: 'Subestación Principal',
        requestReason: 'Falla crítica detectada en sistema de respaldo eléctrico durante inspección preventiva',
        priority: 'urgente',
        status: 'approved',
        dueDate: '2025-06-04',
        createdAt: '2025-06-03T08:15:00Z',
        estimatedValue: 32000,
        currency: 'USD'
    },
    {
        id: 'budget-003',
        budgetNumber: 'PRES-2025-003',
        title: 'Sistema de Plomería - Expansión',
        description: 'Presupuesto para extensión del sistema de plomería hacia nueva área de laboratorios según especificaciones técnicas actualizadas.',
        requestedBy: 'Ing. Ana López',
        company: 'Plomería Industrial SAC',
        subcontractor: 'Instalaciones Hidráulicas Perú',
        discipline: 'plomeria',
        destinatario: 'Coordinación MEP',
        location: 'Piso 2, Área Laboratorios',
        requestReason: 'Adecuación de instalaciones para cumplir con nuevas normativas sanitarias',
        priority: 'media',
        status: 'rejected',
        dueDate: '2025-06-08',
        createdAt: '2025-06-03T14:20:00Z',
        estimatedValue: 45000,
        currency: 'USD'
    },
    {
        id: 'budget-004',
        budgetNumber: 'PRES-2025-004',
        title: 'Equipos Mecánicos - Sala de Máquinas',
        description: 'Presupuesto para instalación de nuevos equipos mecánicos en sala de máquinas incluyendo bombas y sistemas auxiliares.',
        requestedBy: 'Ing. Carlos Pérez',
        company: 'MEP Contractors Inc.',
        subcontractor: 'Mecánica Industrial Perú',
        discipline: 'mecanica',
        destinatario: 'Administración General',
        location: 'Sótano, Sala de Máquinas',
        requestReason: 'Renovación de equipos obsoletos para mejorar eficiencia energética',
        priority: 'baja',
        status: 'pending',
        dueDate: '2025-06-10',
        createdAt: '2025-06-03T16:45:00Z',
        estimatedValue: 68000,
        currency: 'USD'
    }
];

const Budgets: React.FC = () => {
    const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedPriority, setSelectedPriority] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showNewBudgetModal, setShowNewBudgetModal] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subcontractor: '',
        discipline: 'mecanica' as Budget['discipline'],
        destinatario: '',
        location: '',
        requestReason: '',
        priority: 'media' as Budget['priority']
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return 'Pendiente';
            case 'approved': return 'Aprobado';
            case 'rejected': return 'Rechazado';
            default: return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'approved': return <CheckCircle className="w-4 h-4" />;
            case 'rejected': return <X className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgente': return 'text-red-600 bg-red-50 border-red-200';
            case 'alta': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'media': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'baja': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'urgente': return 'Urgente';
            case 'alta': return 'Alta';
            case 'media': return 'Media';
            case 'baja': return 'Baja';
            default: return priority;
        }
    };

    const getDisciplineLabel = (discipline: string) => {
        switch (discipline) {
            case 'mecanica': return 'Mecánica';
            case 'electrica': return 'Eléctrica';
            case 'plomeria': return 'Plomería';
            default: return discipline;
        }
    };

    const getPriorityDays = (priority: Budget['priority']): number => {
        switch (priority) {
            case 'urgente': return 1;
            case 'alta': return 3;
            case 'media': return 5;
            case 'baja': return 7;
            default: return 5;
        }
    };

    const calculateDueDate = (priority: Budget['priority']): string => {
        const today = new Date();
        const days = getPriorityDays(priority);
        const dueDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
        return dueDate.toISOString().split('T')[0];
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount: number, currency: string): string => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    const getDaysRemaining = (dueDate: string): number => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const filteredBudgets = budgets.filter(budget => {
        const matchesSearch = budget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            budget.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            budget.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            budget.subcontractor.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = selectedStatus === 'all' || budget.status === selectedStatus;
        const matchesPriority = selectedPriority === 'all' || budget.priority === selectedPriority;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const statusCounts = {
        all: budgets.length,
        pending: budgets.filter(b => b.status === 'pending').length,
        approved: budgets.filter(b => b.status === 'approved').length,
        rejected: budgets.filter(b => b.status === 'rejected').length
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newBudget: Budget = {
            id: `budget-${Date.now()}`,
            budgetNumber: `PRES-2025-${String(budgets.length + 1).padStart(3, '0')}`,
            ...formData,
            requestedBy: 'Ing. Carlos Rodríguez', // Usuario actual
            company: 'Plataforma Civil', // Empresa actual
            dueDate: calculateDueDate(formData.priority),
            createdAt: new Date().toISOString(),
            status: 'pending',
            currency: 'USD'
        };
        
        setBudgets(prev => [newBudget, ...prev]);
        setShowNewBudgetModal(false);
        
        // Reset form
        setFormData({
            title: '',
            description: '',
            subcontractor: '',
            discipline: 'mecanica',
            destinatario: '',
            location: '',
            requestReason: '',
            priority: 'media'
        });
    };

    const handleApproveReject = (budgetId: string, action: 'approved' | 'rejected') => {
        setBudgets(prev => prev.map(budget => 
            budget.id === budgetId 
                ? { ...budget, status: action }
                : budget
        ));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-500 rounded-lg">
                        <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Presupuestos</h1>
                        <p className="text-gray-600">Gestión de solicitudes de presupuestos MEP</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setShowNewBudgetModal(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Nuevo Presupuesto</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-gray-500" />
                    </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pendientes</p>
                            <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Aprobados</p>
                            <p className="text-2xl font-bold text-green-600">{statusCounts.approved}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Rechazados</p>
                            <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
                        </div>
                        <X className="w-8 h-8 text-red-500" />
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
                                placeholder="Buscar presupuestos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="pending">Pendiente</option>
                                <option value="approved">Aprobado</option>
                                <option value="rejected">Rechazado</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                            <select
                                value={selectedPriority}
                                onChange={(e) => setSelectedPriority(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="all">Todas las prioridades</option>
                                <option value="urgente">Urgente</option>
                                <option value="alta">Alta</option>
                                <option value="media">Media</option>
                                <option value="baja">Baja</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Budgets List */}
            <div className="space-y-4">
                {filteredBudgets.map((budget) => {
                    const daysRemaining = getDaysRemaining(budget.dueDate);
                    const isOverdue = daysRemaining < 0;
                    const isDueSoon = daysRemaining <= 1 && daysRemaining >= 0;

                    return (
                        <div 
                            key={budget.id} 
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
                                                {budget.budgetNumber}
                                            </span>
                                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(budget.status)}`}>
                                                {getStatusIcon(budget.status)}
                                                <span className="ml-1">{getStatusLabel(budget.status)}</span>
                                            </span>
                                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(budget.priority)}`}>
                                                {getPriorityLabel(budget.priority)}
                                            </span>
                                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                {getDisciplineLabel(budget.discipline)}
                                            </span>
                                            {isOverdue && (
                                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                    Vencido
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
                                            {budget.title}
                                        </h3>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                            <span className="flex items-center">
                                                <Building className="w-4 h-4 mr-1" />
                                                {budget.subcontractor}
                                            </span>
                                            <span className="flex items-center">
                                                <User className="w-4 h-4 mr-1" />
                                                {budget.destinatario}
                                            </span>
                                            <span className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {budget.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                                        {budget.description}
                                    </p>
                                </div>

                                {/* Request Reason */}
                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-700 mb-1">Motivo de Solicitud:</h4>
                                    <p className="text-sm text-gray-600">
                                        {budget.requestReason}
                                    </p>
                                </div>

                                {/* Value and Timeline */}
                                <div className="flex items-center justify-between mb-4 p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-900">
                                            {budget.estimatedValue ? 
                                                `Valor Estimado: ${formatCurrency(budget.estimatedValue, budget.currency)}` :
                                                'Valor por determinar'
                                            }
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-900">
                                            Vence: {formatDate(budget.dueDate)}
                                        </span>
                                    </div>
                                </div>

                                {/* Deadline Warning */}
                                {(isOverdue || isDueSoon) && (
                                    <div className={`p-3 rounded-lg mb-4 ${
                                        isOverdue 
                                            ? 'bg-red-50 border border-red-200' 
                                            : 'bg-yellow-50 border border-yellow-200'
                                    }`}>
                                        <div className="flex items-center space-x-2">
                                            <AlertCircle className={`w-4 h-4 ${
                                                isOverdue ? 'text-red-600' : 'text-yellow-600'
                                            }`} />
                                            <span className={`text-sm font-medium ${
                                                isOverdue ? 'text-red-800' : 'text-yellow-800'
                                            }`}>
                                                {isOverdue 
                                                    ? `Vencido hace ${Math.abs(daysRemaining)} días`
                                                    : `Vence en ${daysRemaining} día${daysRemaining === 1 ? '' : 's'}`
                                                }
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Footer Info */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                                        <span className="flex items-center">
                                            <User className="w-4 h-4 mr-1" />
                                            Solicitado por {budget.requestedBy}
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {formatDate(budget.createdAt)}
                                        </span>
                                        <span className={`flex items-center px-2 py-1 rounded-full text-xs ${getPriorityColor(budget.priority)}`}>
                                            <Clock className="w-3 h-3 mr-1" />
                                            {getPriorityDays(budget.priority)} días de plazo
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {budget.status === 'pending' && (
                                            <>
                                                <button 
                                                    onClick={() => handleApproveReject(budget.id, 'approved')}
                                                    className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                                                >
                                                    <CheckCircle className="w-3 h-3" />
                                                    <span>Aprobar</span>
                                                </button>
                                                <button 
                                                    onClick={() => handleApproveReject(budget.id, 'rejected')}
                                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                                                >
                                                    <X className="w-3 h-3" />
                                                    <span>Rechazar</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredBudgets.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay presupuestos</h3>
                    <p className="text-gray-500 mb-4">
                        No se encontraron presupuestos que coincidan con los filtros aplicados.
                    </p>
                    <button 
                        onClick={() => setShowNewBudgetModal(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Crear Primer Presupuesto</span>
                    </button>
                </div>
            )}

            {/* Modal for New Budget */}
            {showNewBudgetModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Nuevo Presupuesto</h3>
                                <p className="text-sm text-gray-600">Solicitud de presupuesto MEP</p>
                            </div>
                            <button
                                onClick={() => setShowNewBudgetModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Título */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Título <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Ej: Sistema HVAC - Área Administrativa"
                                />
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripción <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Descripción detallada del presupuesto solicitado..."
                                />
                            </div>

                            {/* Subcontratista */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subcontratista <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subcontractor}
                                    onChange={(e) => setFormData(prev => ({ ...prev, subcontractor: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Ej: Climatización Total SAC"
                                />
                            </div>

                            {/* Disciplina */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Disciplina <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.discipline}
                                    onChange={(e) => setFormData(prev => ({ ...prev, discipline: e.target.value as Budget['discipline'] }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="mecanica">Mecánica</option>
                                    <option value="electrica">Eléctrica</option>
                                    <option value="plomeria">Plomería</option>
                                </select>
                            </div>

                            {/* Destinatario */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Dirigido a (Destinatario) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.destinatario}
                                    onChange={(e) => setFormData(prev => ({ ...prev, destinatario: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Ej: Gerencia de Proyectos"
                                />
                            </div>

                            {/* Ubicación */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ubicación <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Ej: Piso 3, Área Administrativa"
                                />
                            </div>

                            {/* Motivo de Solicitud */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Motivo de Solicitud <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.requestReason}
                                    onChange={(e) => setFormData(prev => ({ ...prev, requestReason: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Justificación técnica o comercial para la solicitud..."
                                />
                            </div>

                            {/* Prioridad */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prioridad de Rapidez de Respuesta <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Budget['priority'] }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="baja">Baja - 7 días</option>
                                    <option value="media">Media - 5 días</option>
                                    <option value="alta">Alta - 3 días</option>
                                    <option value="urgente">Urgente - 1 día</option>
                                </select>
                                <p className="text-sm text-gray-500 mt-1">
                                    Fecha límite: {formatDate(calculateDueDate(formData.priority))}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowNewBudgetModal(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                >
                                    <DollarSign className="w-4 h-4" />
                                    <span>Crear Presupuesto</span>
                                </button>
                            </div>
                        </form>
                    </div>
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

export default Budgets;