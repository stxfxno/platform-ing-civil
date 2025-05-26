// src/pages/documentation/GeneralDocuments.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Folder,
    Search,
    FileText,
    Download,
    Eye,
    Edit,
    Archive,
    User,
    ArrowLeft,
    Tag,
    Shield,
    AlertCircle
} from 'lucide-react';

interface GeneralDocument {
    id: string;
    documentId: string;
    title: string;
    category: 'contract' | 'permit' | 'report' | 'correspondence' | 'manual' | 'other';
    description: string;
    version: string;
    status: 'active' | 'superseded' | 'archived';
    accessLevel: 'public' | 'internal' | 'restricted';
    author: string;
    createdDate: string;
    lastModified: string;
    expiryDate?: string;
    fileSize: string;
    tags: string[];
}

const mockDocuments: GeneralDocument[] = [
    {
        id: '1',
        documentId: 'DOC-001',
        title: 'Contrato Principal del Proyecto MEP',
        category: 'contract',
        description: 'Contrato principal para la ejecución de trabajos MEP del proyecto',
        version: 'v1.2',
        status: 'active',
        accessLevel: 'restricted',
        author: 'Depto. Legal',
        createdDate: '2025-01-15',
        lastModified: '2025-03-10',
        expiryDate: '2025-12-31',
        fileSize: '3.2 MB',
        tags: ['contrato', 'mep', 'legal']
    },
    {
        id: '2',
        documentId: 'DOC-002',
        title: 'Permiso Municipal de Construcción',
        category: 'permit',
        description: 'Permiso municipal para construcción de instalaciones MEP',
        version: 'v1.0',
        status: 'active',
        accessLevel: 'public',
        author: 'Municipalidad',
        createdDate: '2025-02-01',
        lastModified: '2025-02-01',
        expiryDate: '2026-02-01',
        fileSize: '1.1 MB',
        tags: ['permiso', 'municipal', 'construcción']
    },
    {
        id: '3',
        documentId: 'DOC-003',
        title: 'Reporte Mensual de Avance - Mayo 2025',
        category: 'report',
        description: 'Reporte mensual del progreso del proyecto durante mayo 2025',
        version: 'v1.0',
        status: 'active',
        accessLevel: 'internal',
        author: 'Ing. Carlos Rodríguez',
        createdDate: '2025-05-20',
        lastModified: '2025-05-23',
        fileSize: '2.8 MB',
        tags: ['reporte', 'avance', 'mayo']
    },
    {
        id: '4',
        documentId: 'DOC-004',
        title: 'Correspondencia con Proveedor HVAC',
        category: 'correspondence',
        description: 'Comunicaciones oficiales con el proveedor de equipos HVAC',
        version: 'v1.0',
        status: 'active',
        accessLevel: 'internal',
        author: 'Ing. Luis Torres',
        createdDate: '2025-05-15',
        lastModified: '2025-05-22',
        fileSize: '0.8 MB',
        tags: ['correspondencia', 'hvac', 'proveedor']
    },
    {
        id: '5',
        documentId: 'DOC-005',
        title: 'Manual de Operación y Mantenimiento',
        category: 'manual',
        description: 'Manual completo de operación y mantenimiento de sistemas MEP',
        version: 'v2.1',
        status: 'superseded',
        accessLevel: 'internal',
        author: 'Equipo Técnico',
        createdDate: '2025-03-01',
        lastModified: '2025-04-15',
        fileSize: '12.5 MB',
        tags: ['manual', 'operación', 'mantenimiento']
    },
    {
        id: '6',
        documentId: 'DOC-006',
        title: 'Protocolo de Seguridad en Obra',
        category: 'other',
        description: 'Protocolos y procedimientos de seguridad para trabajos MEP',
        version: 'v1.3',
        status: 'active',
        accessLevel: 'public',
        author: 'Depto. Seguridad',
        createdDate: '2025-01-20',
        lastModified: '2025-05-10',
        fileSize: '1.9 MB',
        tags: ['seguridad', 'protocolo', 'obra']
    }
];

const GeneralDocuments: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterAccess, setFilterAccess] = useState('all');

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'contract': return <FileText className="w-5 h-5 text-blue-600" />;
            case 'permit': return <Shield className="w-5 h-5 text-green-600" />;
            case 'report': return <FileText className="w-5 h-5 text-purple-600" />;
            case 'correspondence': return <FileText className="w-5 h-5 text-orange-600" />;
            case 'manual': return <FileText className="w-5 h-5 text-indigo-600" />;
            case 'other': return <Folder className="w-5 h-5 text-gray-600" />;
            default: return <FileText className="w-5 h-5 text-gray-600" />;
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'contract': return 'Contrato';
            case 'permit': return 'Permiso';
            case 'report': return 'Reporte';
            case 'correspondence': return 'Correspondencia';
            case 'manual': return 'Manual';
            case 'other': return 'Otro';
            default: return category;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'contract': return 'bg-blue-100 text-blue-800';
            case 'permit': return 'bg-green-100 text-green-800';
            case 'report': return 'bg-purple-100 text-purple-800';
            case 'correspondence': return 'bg-orange-100 text-orange-800';
            case 'manual': return 'bg-indigo-100 text-indigo-800';
            case 'other': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'superseded': return 'bg-yellow-100 text-yellow-800';
            case 'archived': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getAccessIcon = (accessLevel: string) => {
        switch (accessLevel) {
            case 'public': return <Eye className="w-4 h-4 text-green-600" />;
            case 'internal': return <User className="w-4 h-4 text-yellow-600" />;
            case 'restricted': return <Shield className="w-4 h-4 text-red-600" />;
            default: return <Eye className="w-4 h-4 text-gray-600" />;
        }
    };

    const getAccessColor = (accessLevel: string) => {
        switch (accessLevel) {
            case 'public': return 'bg-green-50 text-green-700';
            case 'internal': return 'bg-yellow-50 text-yellow-700';
            case 'restricted': return 'bg-red-50 text-red-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    const isExpiringSoon = (expiryDate?: string) => {
        if (!expiryDate) return false;
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && diffDays > 0;
    };

    const isExpired = (expiryDate?: string) => {
        if (!expiryDate) return false;
        return new Date(expiryDate) < new Date();
    };

    const filteredDocuments = mockDocuments.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
        const matchesAccess = filterAccess === 'all' || doc.accessLevel === filterAccess;
        
        return matchesSearch && matchesCategory && matchesStatus && matchesAccess;
    });

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
                        <h1 className="text-2xl font-bold text-gray-900">Documentos Generales</h1>
                        <p className="text-gray-600">Documentos generales del proyecto y correspondencia</p>
                    </div>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                    <Folder className="w-4 h-4" />
                    <span>Subir Documento</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <Folder className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{mockDocuments.length}</p>
                            <p className="text-sm text-gray-600">Total Documentos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-500 p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">
                                {mockDocuments.filter(d => d.status === 'active').length}
                            </p>
                            <p className="text-sm text-gray-600">Activos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-yellow-500 p-2 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">
                                {mockDocuments.filter(d => isExpiringSoon(d.expiryDate)).length}
                            </p>
                            <p className="text-sm text-gray-600">Por Vencer</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-red-500 p-2 rounded-lg">
                            <Archive className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-600">
                                {mockDocuments.filter(d => isExpired(d.expiryDate)).length}
                            </p>
                            <p className="text-sm text-gray-600">Vencidos</p>
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
                                placeholder="Buscar documentos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todas las categorías</option>
                            <option value="contract">Contrato</option>
                            <option value="permit">Permiso</option>
                            <option value="report">Reporte</option>
                            <option value="correspondence">Correspondencia</option>
                            <option value="manual">Manual</option>
                            <option value="other">Otro</option>
                        </select>

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="active">Activo</option>
                            <option value="superseded">Superseded</option>
                            <option value="archived">Archivado</option>
                        </select>

                        <select
                            value={filterAccess}
                            onChange={(e) => setFilterAccess(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todos los accesos</option>
                            <option value="public">Público</option>
                            <option value="internal">Interno</option>
                            <option value="restricted">Restringido</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-gray-100 p-2 rounded-lg">
                                    {getCategoryIcon(doc.category)}
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 mb-1">
                                        <h3 className="font-semibold text-gray-900">{doc.documentId}</h3>
                                        {isExpired(doc.expiryDate) && (
                                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                                Vencido
                                            </span>
                                        )}
                                        {isExpiringSoon(doc.expiryDate) && !isExpired(doc.expiryDate) && (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                                Por vencer
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">{doc.version}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAccessColor(doc.accessLevel)}`}>
                                    {getAccessIcon(doc.accessLevel)}
                                    <span className="ml-1 capitalize">{doc.accessLevel}</span>
                                </span>
                            </div>
                        </div>

                        <h4 className="text-lg font-medium text-gray-900 mb-2">{doc.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">{doc.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                                <span className="text-gray-500">Categoría:</span>
                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getCategoryColor(doc.category)}`}>
                                    {getCategoryLabel(doc.category)}
                                </div>
                            </div>
                            <div>
                                <span className="text-gray-500">Estado:</span>
                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(doc.status)}`}>
                                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                </div>
                            </div>
                            <div>
                                <span className="text-gray-500">Autor:</span>
                                <p className="font-medium text-gray-900">{doc.author}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Modificado:</span>
                                <p className="font-medium text-gray-900">{doc.lastModified}</p>
                            </div>
                        </div>

                        {doc.expiryDate && (
                            <div className="mb-4 text-sm">
                                <span className="text-gray-500">Vencimiento:</span>
                                <p className={`font-medium ${isExpired(doc.expiryDate) ? 'text-red-600' : isExpiringSoon(doc.expiryDate) ? 'text-yellow-600' : 'text-gray-900'}`}>
                                    {doc.expiryDate}
                                </p>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {doc.tags.map((tag) => (
                                <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <span className="text-sm text-gray-500">{doc.fileSize}</span>
                            <div className="flex items-center space-x-2">
                                <button className="text-blue-600 hover:text-blue-900 p-2 rounded transition-colors">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-green-600 hover:text-green-900 p-2 rounded transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                                <button className="text-gray-600 hover:text-gray-900 p-2 rounded transition-colors">
                                    <Edit className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                    <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron documentos con los filtros aplicados</p>
                </div>
            )}
        </div>
    );
};

export default GeneralDocuments;