// src/pages/scope/BidPackages.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Package,
    Plus,
    Calendar,
    Users,
    FileText,
    DollarSign,
    Clock,
    CheckCircle,
    AlertTriangle,
    Eye,
    Edit,
    MoreVertical,
    Download,
    Send,
    MessageCircle
} from 'lucide-react';

interface BidPackage {
    id: string;
    packageId: string;
    title: string;
    discipline: string;
    description: string;
    status: 'preparation' | 'active' | 'evaluation' | 'closed';
    deadline: string;
    publishDate: string;
    estimatedValue: number;
    currency: string;
    documentsCount: number;
    applicantsCount: number;
    questionsCount: number;
    createdBy: string;
    createdAt: string;
}

// Mock data
const mockBidPackages: BidPackage[] = [
    {
        id: 'bp-001',
        packageId: 'BP-2025-001',
        title: 'Sistema HVAC - Torres A y B',
        discipline: 'HVAC',
        description: 'Suministro e instalación completa del sistema HVAC para las torres A y B del proyecto, incluyendo equipos principales, ductos, difusores y controles.',
        status: 'active',
        deadline: '2025-06-15',
        publishDate: '2025-05-01',
        estimatedValue: 450000,
        currency: 'USD',
        documentsCount: 12,
        applicantsCount: 5,
        questionsCount: 8,
        createdBy: 'Ing. Carlos Mendoza',
        createdAt: '2025-04-28T10:00:00Z'
    },
    {
        id: 'bp-002',
        packageId: 'BP-2025-002',
        title: 'Instalaciones Eléctricas - Nivel Sótano',
        discipline: 'Eléctrico',
        description: 'Instalación completa del sistema eléctrico en nivel sótano, incluyendo tableros principales, cableado, luminarias y sistemas de emergencia.',
        status: 'preparation',
        deadline: '2025-06-20',
        publishDate: '2025-05-10',
        estimatedValue: 320000,
        currency: 'USD',
        documentsCount: 8,
        applicantsCount: 0,
        questionsCount: 0,
        createdBy: 'Ing. María González',
        createdAt: '2025-05-05T14:30:00Z'
    },
    {
        id: 'bp-003',
        packageId: 'BP-2025-003',
        title: 'Sistema Contra Incendios - Completo',
        discipline: 'Protección Contra Incendios',
        description: 'Suministro e instalación del sistema completo de protección contra incendios, incluyendo rociadores, detectores, alarmas y sistema de supresión.',
        status: 'evaluation',
        deadline: '2025-05-30',
        publishDate: '2025-04-15',
        estimatedValue: 280000,
        currency: 'USD',
        documentsCount: 15,
        applicantsCount: 3,
        questionsCount: 12,
        createdBy: 'Ing. Sofia Ramírez',
        createdAt: '2025-04-10T09:15:00Z'
    },
    {
        id: 'bp-004',
        packageId: 'BP-2025-004',
        title: 'Plomería - Pisos 1-5',
        discipline: 'Plomería',
        description: 'Instalación completa de sistemas de plomería para pisos 1 al 5, incluyendo tuberías, accesorios, bombas y equipos de tratamiento.',
        status: 'closed',
        deadline: '2025-05-15',
        publishDate: '2025-03-20',
        estimatedValue: 180000,
        currency: 'USD',
        documentsCount: 10,
        applicantsCount: 7,
        questionsCount: 15,
        createdBy: 'Ing. Ana López',
        createdAt: '2025-03-15T16:45:00Z'
    },
    {
        id: 'bp-005',
        packageId: 'BP-2025-005',
        title: 'Equipos Mecánicos - Sala de Máquinas',
        discipline: 'Mecánico',
        description: 'Suministro e instalación de equipos mecánicos principales en sala de máquinas, incluyendo chillers, bombas, torres de enfriamiento y sistemas auxiliares.',
        status: 'preparation',
        deadline: '2025-07-01',
        publishDate: '2025-06-01',
        estimatedValue: 650000,
        currency: 'USD',
        documentsCount: 18,
        applicantsCount: 0,
        questionsCount: 0,
        createdBy: 'Ing. Carlos Pérez',
        createdAt: '2025-05-20T11:20:00Z'
    }
];

const BidPackages: React.FC = () => {
    const [bidPackages] = useState<BidPackage[]>(mockBidPackages);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'preparation': return 'bg-blue-100 text-blue-800';
            case 'active': return 'bg-green-100 text-green-800';
            case 'evaluation': return 'bg-yellow-100 text-yellow-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'preparation': return 'Preparación';
            case 'active': return 'Activo';
            case 'evaluation': return 'Evaluación';
            case 'closed': return 'Cerrado';
            default: return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'preparation': return <Clock className="w-4 h-4" />;
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'evaluation': return <AlertTriangle className="w-4 h-4" />;
            case 'closed': return <Package className="w-4 h-4" />;
            default: return <Package className="w-4 h-4" />;
        }
    };

    const formatCurrency = (amount: number, currency: string): string => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getDaysRemaining = (deadline: string): number => {
        const today = new Date();
        const dueDate = new Date(deadline);
        const diffTime = dueDate.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const filteredPackages = bidPackages.filter(pkg => 
        selectedStatus === 'all' || pkg.status === selectedStatus
    );

    const statusCounts = {
        all: bidPackages.length,
        preparation: bidPackages.filter(p => p.status === 'preparation').length,
        active: bidPackages.filter(p => p.status === 'active').length,
        evaluation: bidPackages.filter(p => p.status === 'evaluation').length,
        closed: bidPackages.filter(p => p.status === 'closed').length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-500 rounded-lg">
                        <Package className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Paquetes de Licitación</h1>
                        <p className="text-gray-600">Gestión de paquetes MEP para subcontratistas</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Nuevo Paquete</span>
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
                        <Package className="w-8 h-8 text-gray-500" />
                    </div>
                </div>
            
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Preparación</p>
                            <p className="text-2xl font-bold text-blue-600">{statusCounts.preparation}</p>
                        </div>
                        <Clock className="w-8 h-8 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Activos</p>
                            <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Evaluación</p>
                            <p className="text-2xl font-bold text-yellow-600">{statusCounts.evaluation}</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Cerrados</p>
                            <p className="text-2xl font-bold text-gray-600">{statusCounts.closed}</p>
                        </div>
                        <Package className="w-8 h-8 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Status Filter */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => setSelectedStatus('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedStatus === 'all'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Todos ({statusCounts.all})
                    </button>
                    <button
                        onClick={() => setSelectedStatus('preparation')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedStatus === 'preparation'
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                    >
                        Preparación ({statusCounts.preparation})
                    </button>
                    <button
                        onClick={() => setSelectedStatus('active')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedStatus === 'active'
                                ? 'bg-green-600 text-white'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                    >
                        Activos ({statusCounts.active})
                    </button>
                    <button
                        onClick={() => setSelectedStatus('evaluation')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedStatus === 'evaluation'
                                ? 'bg-yellow-600 text-white'
                                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                    >
                        Evaluación ({statusCounts.evaluation})
                    </button>
                    <button
                        onClick={() => setSelectedStatus('closed')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedStatus === 'closed'
                                ? 'bg-gray-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Cerrados ({statusCounts.closed})
                    </button>
                </div>
            </div>

            {/* Bid Packages List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPackages.map((pkg) => {
                    const daysRemaining = getDaysRemaining(pkg.deadline);
                    const isUrgent = daysRemaining <= 7 && pkg.status === 'active';
                    
                    return (
                        <div key={pkg.id} className={`bg-white rounded-lg border-2 transition-all hover:shadow-lg ${
                            isUrgent ? 'border-red-200 bg-red-50' : 'border-gray-200'
                        }`}>
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="text-sm font-medium text-gray-500">{pkg.packageId}</span>
                                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(pkg.status)}`}>
                                                {getStatusIcon(pkg.status)}
                                                <span className="ml-1">{getStatusLabel(pkg.status)}</span>
                                            </span>
                                            {isUrgent && (
                                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                                    Urgente
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{pkg.title}</h3>
                                        <p className="text-sm text-gray-600 mb-3">{pkg.discipline}</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-center mb-1">
                                            <FileText className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <p className="text-lg font-semibold text-gray-900">{pkg.documentsCount}</p>
                                        <p className="text-xs text-gray-500">Documentos</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-center mb-1">
                                            <Users className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <p className="text-lg font-semibold text-gray-900">{pkg.applicantsCount}</p>
                                        <p className="text-xs text-gray-500">Licitantes</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-center mb-1">
                                            <MessageCircle className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <p className="text-lg font-semibold text-gray-900">{pkg.questionsCount}</p>
                                        <p className="text-xs text-gray-500">Preguntas</p>
                                    </div>
                                </div>

                                {/* Value and Deadline */}
                                <div className="flex items-center justify-between mb-4 p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-900">
                                            Valor Estimado: {formatCurrency(pkg.estimatedValue, pkg.currency)}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-900">
                                            {formatDate(pkg.deadline)}
                                        </span>
                                    </div>
                                </div>

                                {/* Deadline Warning */}
                                {pkg.status === 'active' && (
                                    <div className={`p-3 rounded-lg mb-4 ${
                                        daysRemaining <= 3 
                                            ? 'bg-red-50 border border-red-200' 
                                            : daysRemaining <= 7 
                                                ? 'bg-yellow-50 border border-yellow-200'
                                                : 'bg-green-50 border border-green-200'
                                    }`}>
                                        <div className="flex items-center space-x-2">
                                            <Clock className={`w-4 h-4 ${
                                                daysRemaining <= 3 
                                                    ? 'text-red-600' 
                                                    : daysRemaining <= 7 
                                                        ? 'text-yellow-600'
                                                        : 'text-green-600'
                                            }`} />
                                            <span className={`text-sm font-medium ${
                                                daysRemaining <= 3 
                                                    ? 'text-red-800' 
                                                    : daysRemaining <= 7 
                                                        ? 'text-yellow-800'
                                                        : 'text-green-800'
                                            }`}>
                                                {daysRemaining > 0 
                                                    ? `${daysRemaining} días restantes`
                                                    : daysRemaining === 0
                                                        ? 'Vence hoy'
                                                        : `Vencido hace ${Math.abs(daysRemaining)} días`
                                                }
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="text-xs text-gray-500">
                                        Creado por {pkg.createdBy}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {pkg.status === 'preparation' && (
                                            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1">
                                                <Send className="w-3 h-3" />
                                                <span>Publicar</span>
                                            </button>
                                        )}
                                        <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-1">
                                            <Download className="w-3 h-3" />
                                            <span>Descargar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredPackages.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay paquetes</h3>
                    <p className="text-gray-500 mb-4">
                        No se encontraron paquetes de licitación con el estado seleccionado.
                    </p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto">
                        <Plus className="w-4 h-4" />
                        <span>Crear Primer Paquete</span>
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

export default BidPackages;