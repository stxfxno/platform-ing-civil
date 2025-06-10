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
    Share2,
    Users,
    Clock,
    Building
} from 'lucide-react';

interface DownloadRecord {
    id: string;
    userId: string;
    userName: string;
    userCompany: string;
    downloadDate: string;
    ipAddress?: string;
    userAgent?: string;
}

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
    downloadHistory: DownloadRecord[];
}

// Mock data con historial de descargas
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
        downloadCount: 15,
        downloadHistory: [
            {
                id: 'dl-001',
                userId: 'user-001',
                userName: 'Ing. Roberto Vega',
                userCompany: 'HVAC Solutions S.A.C.',
                downloadDate: '2025-05-23T14:30:00Z',
                ipAddress: '192.168.1.45'
            },
            {
                id: 'dl-002',
                userId: 'user-002',
                userName: 'Ing. María Santos',
                userCompany: 'Climatización Perú',
                downloadDate: '2025-05-23T11:15:00Z',
                ipAddress: '192.168.1.67'
            },
            {
                id: 'dl-003',
                userId: 'user-003',
                userName: 'Ing. Fernando Morales',
                userCompany: 'MEP Contractors Inc.',
                downloadDate: '2025-05-22T16:45:00Z',
                ipAddress: '192.168.1.89'
            },
            {
                id: 'dl-004',
                userId: 'user-001',
                userName: 'Ing. Roberto Vega',
                userCompany: 'HVAC Solutions S.A.C.',
                downloadDate: '2025-05-21T09:20:00Z',
                ipAddress: '192.168.1.45'
            },
            {
                id: 'dl-005',
                userId: 'user-004',
                userName: 'Ing. Patricia Campos',
                userCompany: 'Ingeniería Térmica SAC',
                downloadDate: '2025-05-20T13:10:00Z',
                ipAddress: '192.168.1.123'
            }
        ]
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
        downloadCount: 8,
        downloadHistory: [
            {
                id: 'dl-006',
                userId: 'user-005',
                userName: 'Ing. Jorge Ramírez',
                userCompany: 'Electro Instalaciones Perú',
                downloadDate: '2025-05-23T10:30:00Z',
                ipAddress: '192.168.1.201'
            },
            {
                id: 'dl-007',
                userId: 'user-006',
                userName: 'Ing. Carmen López',
                userCompany: 'Sistemas Eléctricos SAC',
                downloadDate: '2025-05-22T15:45:00Z',
                ipAddress: '192.168.1.156'
            },
            {
                id: 'dl-008',
                userId: 'user-005',
                userName: 'Ing. Jorge Ramírez',
                userCompany: 'Electro Instalaciones Perú',
                downloadDate: '2025-05-19T08:20:00Z',
                ipAddress: '192.168.1.201'
            }
        ]
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
        downloadCount: 12,
        downloadHistory: [
            {
                id: 'dl-009',
                userId: 'user-007',
                userName: 'Ing. Rosa Medina',
                userCompany: 'Plomería Industrial SAC',
                downloadDate: '2025-05-23T12:00:00Z',
                ipAddress: '192.168.1.78'
            },
            {
                id: 'dl-010',
                userId: 'user-008',
                userName: 'Ing. Felipe Castro',
                userCompany: 'Instalaciones Hidráulicas',
                downloadDate: '2025-05-22T09:30:00Z',
                ipAddress: '192.168.1.234'
            }
        ]
    },
    {
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
        downloadCount: 3,
        downloadHistory: [
            {
                id: 'dl-011',
                userId: 'user-009',
                userName: 'Ing. Manuel Ochoa',
                userCompany: 'Fire Protection Corp.',
                downloadDate: '2025-05-23T08:15:00Z',
                ipAddress: '192.168.1.145'
            }
        ]
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
        downloadCount: 1,
        downloadHistory: [
            {
                id: 'dl-012',
                userId: 'user-003',
                userName: 'Ing. Fernando Morales',
                userCompany: 'MEP Contractors Inc.',
                downloadDate: '2025-05-23T07:45:00Z',
                ipAddress: '192.168.1.89'
            }
        ]
    }
];

const DocumentRepository: React.FC = () => {
    const [documents] = useState<ScopeDocument[]>(mockDocuments);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterDiscipline, setFilterDiscipline] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<ScopeDocument | null>(null);
    const [showDownloadHistory, setShowDownloadHistory] = useState(false);

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

    const formatDateTime = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getUniqueDownloaders = (downloadHistory: DownloadRecord[]): number => {
        const uniqueUsers = new Set(downloadHistory.map(record => record.userId));
        return uniqueUsers.size;
    };

    const getLastDownload = (downloadHistory: DownloadRecord[]): DownloadRecord | null => {
        if (downloadHistory.length === 0) return null;
        return downloadHistory.reduce((latest, current) => 
            new Date(current.downloadDate) > new Date(latest.downloadDate) ? current : latest
        );
    };

    const showDownloadHistoryModal = (document: ScopeDocument) => {
        setSelectedDocument(document);
        setShowDownloadHistory(true);
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
                            <p className="text-sm text-gray-600">Total Descargas</p>
                            <p className="text-2xl font-bold text-purple-600">
                                {documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}
                            </p>
                        </div>
                        <Download className="w-8 h-8 text-purple-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Usuarios involucrados</p>
                            <p className="text-2xl font-bold text-orange-600">
                                {new Set(documents.flatMap(d => d.downloadHistory.map(h => h.userId))).size}
                            </p>
                        </div>
                        <Users className="w-8 h-8 text-orange-500" />
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
                    {filteredDocuments.map((document) => {
                        const uniqueDownloaders = getUniqueDownloaders(document.downloadHistory);
                        const lastDownload = getLastDownload(document.downloadHistory);

                        return (
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

                                            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                                                <span className="flex items-center">
                                                    <User className="w-4 h-4 mr-1" />
                                                    {document.uploadedBy}
                                                </span>
                                                <span className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {formatDate(document.uploadedAt)}
                                                </span>
                                            </div>

                                            {/* Download Statistics */}
                                            <div className="flex items-center space-x-6 text-sm mb-3">
                                                <span className="flex items-center text-blue-600">
                                                    <Download className="w-4 h-4 mr-1" />
                                                    <strong>{document.downloadCount}</strong> descargas
                                                </span>
                                                <span className="flex items-center text-green-600">
                                                    <Users className="w-4 h-4 mr-1" />
                                                    <strong>{uniqueDownloaders}</strong> usuarios únicos
                                                </span>
                                                {lastDownload && (
                                                    <span className="flex items-center text-gray-600">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        Último: {formatDateTime(lastDownload.downloadDate)}
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => showDownloadHistoryModal(document)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                                                >
                                                    Ver historial completo
                                                </button>
                                            </div>

                                            {/* Tags */}
                                            {document.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
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
                        );
                    })}
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

            {/* Download History Modal */}
            {showDownloadHistory && selectedDocument && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Historial de Descargas</h3>
                                <p className="text-sm text-gray-600">{selectedDocument.title}</p>
                            </div>
                            <button
                                onClick={() => setShowDownloadHistory(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            {/* Summary Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Download className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm text-blue-600">Total Descargas</span>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-900">{selectedDocument.downloadCount}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-5 h-5 text-green-600" />
                                        <span className="text-sm text-green-600">Usuarios Únicos</span>
                                    </div>
                                    <p className="text-2xl font-bold text-green-900">
                                        {getUniqueDownloaders(selectedDocument.downloadHistory)}
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-5 h-5 text-purple-600" />
                                        <span className="text-sm text-purple-600">Última Descarga</span>
                                    </div>
                                    <p className="text-sm font-medium text-purple-900">
                                        {getLastDownload(selectedDocument.downloadHistory) ? 
                                            formatDateTime(getLastDownload(selectedDocument.downloadHistory)!.downloadDate) : 
                                            'Sin descargas'
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Download History Table */}
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-900">Registro de Descargas</h4>
                                </div>
                                
                                {selectedDocument.downloadHistory.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <Download className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">No hay registros de descarga para este documento</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-200">
                                        {selectedDocument.downloadHistory
                                            .sort((a, b) => new Date(b.downloadDate).getTime() - new Date(a.downloadDate).getTime())
                                            .map((record, index) => (
                                            <div key={record.id} className="p-4 hover:bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <User className="w-4 h-4 text-blue-600" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center space-x-2">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {record.userName}
                                                                </p>
                                                                <span className="text-xs text-gray-500">#{index + 1}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-4 mt-1">
                                                                <span className="flex items-center text-xs text-gray-500">
                                                                    <Building className="w-3 h-3 mr-1" />
                                                                    {record.userCompany}
                                                                </span>
                                                                {record.ipAddress && (
                                                                    <span className="text-xs text-gray-500">
                                                                        IP: {record.ipAddress}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            {formatDateTime(record.downloadDate)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* User Summary */}
                            {selectedDocument.downloadHistory.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Resumen por Usuario</h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="space-y-2">
                                            {Object.entries(
                                                selectedDocument.downloadHistory.reduce((acc, record) => {
                                                    if (!acc[record.userId]) {
                                                        acc[record.userId] = {
                                                            name: record.userName,
                                                            company: record.userCompany,
                                                            count: 0,
                                                            lastDownload: record.downloadDate
                                                        };
                                                    }
                                                    acc[record.userId].count++;
                                                    if (new Date(record.downloadDate) > new Date(acc[record.userId].lastDownload)) {
                                                        acc[record.userId].lastDownload = record.downloadDate;
                                                    }
                                                    return acc;
                                                }, {} as Record<string, { name: string; company: string; count: number; lastDownload: string }>)
                                            ).map(([userId, userInfo]) => (
                                                <div key={userId} className="flex items-center justify-between p-2 bg-white rounded border">
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-900">{userInfo.name}</span>
                                                        <span className="text-xs text-gray-500 ml-2">({userInfo.company})</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-sm font-medium text-blue-600">{userInfo.count} descargas</span>
                                                        <div className="text-xs text-gray-500">
                                                            Última: {formatDate(userInfo.lastDownload)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                            <button
                                onClick={() => setShowDownloadHistory(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
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

export default DocumentRepository;