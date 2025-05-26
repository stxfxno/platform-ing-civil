// src/pages/scope/DocumentRepository.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Archive,
    Upload,
    Download,
    Eye,
    FileText,
    Calendar,
    User,
    Tag,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Share2
} from 'lucide-react';

interface ScopeDocument {
    id: string;
    title: string;
    type: 'specification' | 'requirement' | 'standard' | 'drawing' | 'manual';
    discipline: string;
    version: string;
    status: 'draft' | 'active' | 'superseded' | 'archived';
    size: number;
    uploadedBy: string;
    uploadedAt: string;
    tags: string[];
    downloadCount: number;
}

// Mock data
const mockDocuments: ScopeDocument[] = [
    {
        id: 'doc-001',
        title: 'Especificaciones Técnicas HVAC - Sistema Principal',
        type: 'specification',
        discipline: 'HVAC',
        version: 'v2.1',
        status: 'active',
        size: 2048576,
        uploadedBy: 'Ing. Carlos Mendoza',
        uploadedAt: '2025-05-20T10:30:00Z',
        tags: ['hvac', 'especificaciones', 'sistema-principal'],
        downloadCount: 15
    },
    {
        id: 'doc-002',
        title: 'Requerimientos Eléctricos - Tableros Principales',
        type: 'requirement',
        discipline: 'Eléctrico',
        version: 'v1.0',
        status: 'active',
        size: 1536000,
        uploadedBy: 'Ing. María González',
        uploadedAt: '2025-05-18T14:20:00Z',
        tags: ['eléctrico', 'tableros', 'requerimientos'],
        downloadCount: 8
    },
    {
        id: 'doc-003',
        title: 'Estándares de Instalación - Plomería',
        type: 'standard',
        discipline: 'Plomería',
        version: 'v1.2',
        status: 'active',
        size: 3072000,
        uploadedBy: 'Ing. Ana López',
        uploadedAt: '2025-05-15T09:45:00Z',
        tags: ['plomería', 'estándares', 'instalación'],
        downloadCount: 12
    },{
        id: 'doc-004',
        title: 'Manual de Operación - Sistema Contra Incendios',
        type: 'manual',
        discipline: 'Protección Contra Incendios',
        version: 'v3.0',
        status: 'draft',
        size: 4096000,
        uploadedBy: 'Ing. Sofia Ramírez',
        uploadedAt: '2025-05-22T16:00:00Z',
        tags: ['contra-incendios', 'manual', 'operación'],
        downloadCount: 3
    },
    {
        id: 'doc-005',
        title: 'Planos de Referencia - Instalaciones Mecánicas',
        type: 'drawing',
        discipline: 'Mecánico',
        version: 'v1.1',
        status: 'superseded',
        size: 5120000,
        uploadedBy: 'Ing. Carlos Pérez',
        uploadedAt: '2025-05-10T11:15:00Z',
        tags: ['mecánico', 'planos', 'instalaciones'],
        downloadCount: 20
    }
];

const DocumentRepository: React.FC = () => {
    const [documents] = useState<ScopeDocument[]>(mockDocuments);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterDiscipline, setFilterDiscipline] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'specification': return <FileText className="w-4 h-4" />;
            case 'requirement': return <FileText className="w-4 h-4" />;
            case 'standard': return <FileText className="w-4 h-4" />;
            case 'drawing': return <FileText className="w-4 h-4" />;
            case 'manual': return <FileText className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'draft': return 'bg-yellow-100 text-yellow-800';
            case 'superseded': return 'bg-gray-100 text-gray-800';
            case 'archived': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Activo';
            case 'draft': return 'Borrador';
            case 'superseded': return 'Supersedido';
            case 'archived': return 'Archivado';
            default: return status;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'specification': return 'Especificación';
            case 'requirement': return 'Requerimiento';
            case 'standard': return 'Estándar';
            case 'drawing': return 'Plano';
            case 'manual': return 'Manual';
            default: return type;
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesType = filterType === 'all' || doc.type === filterType;
        const matchesDiscipline = filterDiscipline === 'all' || doc.discipline === filterDiscipline;
        const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;

        return matchesSearch && matchesType && matchesDiscipline && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-500 rounded-lg">
                        <Archive className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Repositorio de Documentos</h1>
                        <p className="text-gray-600">Gestión centralizada de documentos de alcance</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Subir Documento</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Documentos</p>
                            <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                        </div>
                        <Archive className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Documentos Activos</p>
                            <p className="text-2xl font-bold text-green-600">
                                {documents.filter(d => d.status === 'active').length}
                            </p>
                        </div>
                        <FileText className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Borradores</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {documents.filter(d => d.status === 'draft').length}
                            </p>
                        </div>
                        <Edit className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Descargas</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}
                            </p>
                        </div>
                        <Download className="w-8 h-8 text-purple-500" />
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
                                placeholder="Buscar documentos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Todos los tipos</option>
                                <option value="specification">Especificación</option>
                                <option value="requirement">Requerimiento</option>
                                <option value="standard">Estándar</option>
                                <option value="drawing">Plano</option>
                                <option value="manual">Manual</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Disciplina</label>
                            <select
                                value={filterDiscipline}
                                onChange={(e) => setFilterDiscipline(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Todas las disciplinas</option>
                                <option value="HVAC">HVAC</option>
                                <option value="Eléctrico">Eléctrico</option>
                                <option value="Plomería">Plomería</option>
                                <option value="Mecánico">Mecánico</option>
                                <option value="Protección Contra Incendios">Protección Contra Incendios</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="active">Activo</option>
                                <option value="draft">Borrador</option>
                                <option value="superseded">Supersedido</option>
                                <option value="archived">Archivado</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Documents List */}
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Documentos ({filteredDocuments.length})
                    </h2>
                </div>

                <div className="divide-y divide-gray-200">
                    {filteredDocuments.map((document) => (
                        <div key={document.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4 flex-1">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        {getTypeIcon(document.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {document.title}
                                            </h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.status)}`}>
                                                {getStatusLabel(document.status)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                                            <span className="flex items-center">
                                                <Tag className="w-4 h-4 mr-1" />
                                                {getTypeLabel(document.type)}
                                            </span>
                                            <span>{document.discipline}</span>
                                            <span>Versión {document.version}</span>
                                            <span>{formatFileSize(document.size)}</span>
                                        </div>

                                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                                            <span className="flex items-center">
                                                <User className="w-4 h-4 mr-1" />
                                                {document.uploadedBy}
                                            </span>
                                            <span className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {formatDate(document.uploadedAt)}
                                            </span>
                                            <span className="flex items-center">
                                                <Download className="w-4 h-4 mr-1" />
                                                {document.downloadCount} descargas
                                            </span>
                                        </div>

                                        {/* Tags */}
                                        {document.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {document.tags.map((tag, index) => (
                                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                    <div className="relative">
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredDocuments.length === 0 && (
                    <div className="p-12 text-center">
                        <Archive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron documentos</h3>
                        <p className="text-gray-500">
                            No hay documentos que coincidan con los filtros aplicados.
                        </p>
                    </div>
                )}
            </div>

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

export default DocumentRepository;