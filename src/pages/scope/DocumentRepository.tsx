// src/pages/scope/DocumentRepository.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Archive,
    Upload,
    Download,
    FileText,
    Calendar,
    User,
    Tag,
    Search,
    Filter,
    MoreVertical,
    Users,
    Clock,
    Building,
    Trash2,
    X,
    Settings,
    File,
    BarChart3
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

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
    discipline: 'Plomería' | 'Eléctricas' | 'Mecánicas';
    version: string;
    status: 'draft' | 'active' | 'superseded' | 'archived';
    size: number;
    uploadedBy: string;
    uploadedByCompany: string;
    uploadedAt: string;
    tags: string[];
    downloadCount: number;
    downloadHistory: DownloadRecord[];
}

// Mock data con datos realistas para el proyecto MEP
const mockDocuments: ScopeDocument[] = [
    {
        id: 'doc-001',
        title: 'Especificaciones Técnicas - Sistema HVAC Torre A',
        type: 'specification',
        discipline: 'Mecánicas',
        version: 'v2.1',
        status: 'active',
        size: 2048576,
        uploadedBy: 'Piero Fernández',
        uploadedByCompany: 'Sistemas Mecánicos',
        uploadedAt: '2025-06-01T10:30:00Z',
        tags: ['hvac', 'especificaciones', 'torre-a', 'sistemas-mecanicos'],
        downloadCount: 16,
        downloadHistory: [
            {
                id: 'dl-001',
                userId: '1',
                userName: 'Alexandra Torres',
                userCompany: 'Gestión de Proyectos MEP',
                downloadDate: '2025-06-10T14:30:00Z',
                ipAddress: '192.168.1.45'
            },
            {
                id: 'dl-002',
                userId: '3',
                userName: 'Bryan Vargas',
                userCompany: 'Plomería',
                downloadDate: '2025-06-09T11:15:00Z',
                ipAddress: '192.168.1.67'
            },
            {
                id: 'dl-003',
                userId: '4',
                userName: 'Ing. Carlos Mendoza',
                userCompany: 'Supervisión de Obra',
                downloadDate: '2025-06-08T16:45:00Z',
                ipAddress: '192.168.1.89'
            },
            {
                id: 'dl-004',
                userId: '5',
                userName: 'Ana Lucía Quispe',
                userCompany: 'Control de Calidad',
                downloadDate: '2025-06-07T09:20:00Z',
                ipAddress: '192.168.1.123'
            },
            {
                id: 'dl-005',
                userId: '6',
                userName: 'Roberto Silva',
                userCompany: 'Coordinación Técnica',
                downloadDate: '2025-06-06T13:15:00Z',
                ipAddress: '192.168.1.156'
            },
            {
                id: 'dl-006',
                userId: '2',
                userName: 'Piero Fernández',
                userCompany: 'Sistemas Mecánicos',
                downloadDate: '2025-06-05T10:30:00Z',
                ipAddress: '192.168.1.78'
            },
            {
                id: 'dl-007',
                userId: '7',
                userName: 'María Elena Castillo',
                userCompany: 'Gestión de Proyectos',
                downloadDate: '2025-06-04T15:45:00Z',
                ipAddress: '192.168.1.201'
            },
            {
                id: 'dl-008',
                userId: '1',
                userName: 'Alexandra Torres',
                userCompany: 'Gestión de Proyectos MEP',
                downloadDate: '2025-06-02T08:10:00Z',
                ipAddress: '192.168.1.45'
            }
        ]
    },
    {
        id: 'doc-002',
        title: 'Requerimientos Eléctricos - Tableros Principales',
        type: 'requirement',
        discipline: 'Eléctricas',
        version: 'v1.0',
        status: 'active',
        size: 1536000,
        uploadedBy: 'Alexandra Torres',
        uploadedByCompany: 'Gestión de Proyectos MEP',
        uploadedAt: '2025-05-28T14:20:00Z',
        tags: ['electrico', 'tableros', 'requerimientos', 'principales'],
        downloadCount: 12,
        downloadHistory: [
            {
                id: 'dl-003',
                userId: '2',
                userName: 'Piero Fernández',
                userCompany: 'Sistemas Mecánicos',
                downloadDate: '2025-06-08T10:30:00Z',
                ipAddress: '192.168.1.201'
            },
            {
                id: 'dl-004',
                userId: '3',
                userName: 'Bryan Vargas',
                userCompany: 'Plomería',
                downloadDate: '2025-06-07T15:45:00Z',
                ipAddress: '192.168.1.156'
            }
        ]
    },
    {
        id: 'doc-003',
        title: 'Estándares de Instalación - Tuberías de Agua Potable',
        type: 'standard',
        discipline: 'Plomería',
        version: 'v1.2',
        status: 'active',
        size: 3072000,
        uploadedBy: 'Bryan Vargas',
        uploadedByCompany: 'Plomería',
        uploadedAt: '2025-05-25T09:45:00Z',
        tags: ['plomeria', 'estandares', 'agua-potable', 'tuberias'],
        downloadCount: 15,
        downloadHistory: [
            {
                id: 'dl-005',
                userId: '1',
                userName: 'Alexandra Torres',
                userCompany: 'Gestión de Proyectos MEP',
                downloadDate: '2025-06-10T12:00:00Z',
                ipAddress: '192.168.1.78'
            },
            {
                id: 'dl-006',
                userId: '2',
                userName: 'Piero Fernández',
                userCompany: 'Sistemas Mecánicos',
                downloadDate: '2025-06-09T09:30:00Z',
                ipAddress: '192.168.1.234'
            }
        ]
    },
    {
        id: 'doc-004',
        title: 'Manual de Instalación - Ventiladores Industriales',
        type: 'manual',
        discipline: 'Mecánicas',
        version: 'v3.0',
        status: 'draft',
        size: 4096000,
        uploadedBy: 'Piero Fernández',
        uploadedByCompany: 'Sistemas Mecánicos',
        uploadedAt: '2025-06-05T16:00:00Z',
        tags: ['mecanicas', 'manual', 'ventiladores', 'instalacion'],
        downloadCount: 3,
        downloadHistory: [
            {
                id: 'dl-007',
                userId: '1',
                userName: 'Alexandra Torres',
                userCompany: 'Gestión de Proyectos MEP',
                downloadDate: '2025-06-08T08:15:00Z',
                ipAddress: '192.168.1.145'
            }
        ]
    },
    {
        id: 'doc-005',
        title: 'Planos Eléctricos - Distribución Torre B',
        type: 'drawing',
        discipline: 'Eléctricas',
        version: 'v1.1',
        status: 'active',
        size: 5120000,
        uploadedBy: 'Alexandra Torres',
        uploadedByCompany: 'Gestión de Proyectos MEP',
        uploadedAt: '2025-06-03T11:15:00Z',
        tags: ['electrico', 'planos', 'distribucion', 'torre-b'],
        downloadCount: 7,
        downloadHistory: [
            {
                id: 'dl-008',
                userId: '2',
                userName: 'Piero Fernández',
                userCompany: 'Sistemas Mecánicos',
                downloadDate: '2025-06-09T07:45:00Z',
                ipAddress: '192.168.1.89'
            },
            {
                id: 'dl-009',
                userId: '3',
                userName: 'Bryan Vargas',
                userCompany: 'Plomería',
                downloadDate: '2025-06-08T14:20:00Z',
                ipAddress: '192.168.1.112'
            }
        ]
    }
];

const DocumentRepository: React.FC = () => {
    const { user } = useAuth();
    
    const getDisciplineForUser = (): ScopeDocument['discipline'] => {
        if (!user) return 'Plomería';
        switch (user.department) {
            case 'Sistemas Mecánicos': return 'Mecánicas';
            case 'Plomería': return 'Plomería';
            default: return 'Plomería'; // Default para admin
        }
    };

    const [documents, setDocuments] = useState<ScopeDocument[]>(mockDocuments);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterDiscipline, setFilterDiscipline] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<ScopeDocument | null>(null);
    const [showDownloadHistory, setShowDownloadHistory] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        title: '',
        type: 'specification' as ScopeDocument['type'],
        discipline: getDisciplineForUser(),
        version: 'v1.0',
        tags: '',
        file: null as File | null
    });

    const canDeleteDocument = (document: ScopeDocument) => {
        if (!user) return false;
        if (user.role === 'admin') return true;
        return document.uploadedBy === user.name;
    };

    const handleUpload = () => {
        if (!uploadForm.file || !uploadForm.title.trim()) return;

        const newDocument: ScopeDocument = {
            id: `doc-${Date.now()}`,
            title: uploadForm.title.trim(),
            type: uploadForm.type,
            discipline: uploadForm.discipline as ScopeDocument['discipline'],
            version: uploadForm.version,
            status: 'draft',
            size: uploadForm.file.size,
            uploadedBy: user?.name || 'Usuario',
            uploadedByCompany: user?.department || 'Empresa',
            uploadedAt: new Date().toISOString(),
            tags: uploadForm.tags ? uploadForm.tags.split(',').map(tag => tag.trim()) : [],
            downloadCount: 0,
            downloadHistory: []
        };

        setDocuments(prev => [newDocument, ...prev]);
        setShowUploadModal(false);
        setUploadForm({
            title: '',
            type: 'specification',
            discipline: getDisciplineForUser(),
            version: 'v1.0',
            tags: '',
            file: null
        });
    };

    const handleDownload = (doc: ScopeDocument) => {
        if (!user) return;

        const downloadRecord: DownloadRecord = {
            id: `dl-${Date.now()}`,
            userId: user.id,
            userName: user.name,
            userCompany: user.department,
            downloadDate: new Date().toISOString(),
            ipAddress: '192.168.1.' + Math.floor(Math.random() * 255)
        };

        setDocuments(prev => prev.map(document => 
            document.id === doc.id 
                ? {
                    ...document,
                    downloadCount: document.downloadCount + 1,
                    downloadHistory: [downloadRecord, ...document.downloadHistory]
                }
                : document
        ));

        // Simular descarga
        const blob = new Blob(['Contenido del documento simulado'], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = window.document.createElement('a');
        a.href = url;
        a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
        window.document.body.appendChild(a);
        a.click();
        window.document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDelete = (documentId: string) => {
        if (window.confirm('¿Está seguro de que desea eliminar este documento?')) {
            setDocuments(prev => prev.filter(doc => doc.id !== documentId));
        }
    };

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
                    <button 
                        onClick={() => setShowUploadModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
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
                                <option value="Plomería">Plomería</option>
                                <option value="Eléctricas">Eléctricas</option>
                                <option value="Mecánicas">Mecánicas</option>
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
                                        <button 
                                            onClick={() => handleDownload(document)}
                                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                            title="Descargar documento"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                        {canDeleteDocument(document) && (
                                            <button 
                                                onClick={() => handleDelete(document.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Eliminar documento"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => showDownloadHistoryModal(document)}
                                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                            title="Ver historial"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
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

            {/* Upload Document Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header del Modal */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                        <Upload className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Subir Nuevo Documento</h2>
                                </div>
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Contenido del Modal */}
                        <div className="p-6 space-y-6">
                            {/* Información Básica */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                                    Información del Documento
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Título */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Título del Documento *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={uploadForm.title}
                                            onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                                            placeholder="Ej: Manual de Instalación HVAC"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    {/* Tipo */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tipo de Documento *
                                        </label>
                                        <select
                                            required
                                            value={uploadForm.type}
                                            onChange={(e) => setUploadForm(prev => ({ ...prev, type: e.target.value as ScopeDocument['type'] }))}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        >
                                            <option value="specification">📋 Especificación</option>
                                            <option value="requirement">📄 Requerimiento</option>
                                            <option value="standard">⚡ Estándar</option>
                                            <option value="drawing">📐 Plano</option>
                                            <option value="manual">📖 Manual</option>
                                        </select>
                                    </div>

                                    {/* Disciplina */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Disciplina *
                                        </label>
                                        <select
                                            required
                                            value={uploadForm.discipline}
                                            onChange={(e) => setUploadForm(prev => ({ ...prev, discipline: e.target.value as ScopeDocument['discipline'] }))}
                                            disabled={user?.role !== 'admin'}
                                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                                user?.role !== 'admin' ? 'bg-gray-100 text-gray-600' : ''
                                            }`}
                                        >
                                            <option value="Plomería">🔧 Plomería</option>
                                            <option value="Eléctricas">⚡ Eléctricas</option>
                                            <option value="Mecánicas">⚙️ Mecánicas</option>
                                        </select>
                                        {user?.role !== 'admin' && (
                                            <p className="text-xs text-blue-600 mt-1 flex items-center">
                                                <User className="w-3 h-3 mr-1" />
                                                Disciplina asignada: {getDisciplineForUser()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Detalles Técnicos */}
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Settings className="w-5 h-5 mr-2 text-blue-600" />
                                    Detalles Técnicos
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Versión */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Versión
                                        </label>
                                        <input
                                            type="text"
                                            value={uploadForm.version}
                                            onChange={(e) => setUploadForm(prev => ({ ...prev, version: e.target.value }))}
                                            placeholder="Ej: v1.0, Rev.A"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    {/* Etiquetas */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Etiquetas
                                        </label>
                                        <input
                                            type="text"
                                            value={uploadForm.tags}
                                            onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                                            placeholder="Ej: crítico, revisión, aprobado"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Archivo */}
                            <div className="bg-green-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Upload className="w-5 h-5 mr-2 text-green-600" />
                                    Archivo del Documento
                                </h3>
                                
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                    <input
                                        type="file"
                                        required
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg"
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label 
                                        htmlFor="file-upload" 
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <div className="bg-blue-100 p-3 rounded-full mb-3">
                                            <Upload className="w-8 h-8 text-blue-600" />
                                        </div>
                                        {uploadForm.file ? (
                                            <div className="text-green-600">
                                                <p className="font-medium flex items-center">
                                                    <File className="w-4 h-4 mr-2" />
                                                    {uploadForm.file.name}
                                                </p>
                                                <p className="text-sm text-gray-600">{(uploadForm.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-lg font-medium text-gray-700">Haz clic para seleccionar archivo</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Formatos: PDF, DOC, DOCX, XLS, XLSX, DWG (Max 50MB)
                                                </p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowUploadModal(false)}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleUpload}
                                    disabled={!uploadForm.title.trim() || !uploadForm.file}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    <Upload className="w-4 h-4" />
                                    <span>Subir Documento</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Download History Modal */}
            {showDownloadHistory && selectedDocument && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        {/* Header del Modal */}
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 rounded-t-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                        <BarChart3 className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Historial de Descargas</h2>
                                        <p className="text-purple-100 text-sm">{selectedDocument.title}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowDownloadHistory(false)}
                                    className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Contenido del Modal */}
                        <div className="p-6 overflow-y-auto max-h-[80vh]">
                            {/* Estadísticas */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                                    <div className="flex items-center justify-center mb-2">
                                        <Download className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="text-3xl font-bold text-blue-600">
                                        {selectedDocument.downloadCount}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Total Descargas</div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                                    <div className="flex items-center justify-center mb-2">
                                        <Users className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="text-3xl font-bold text-green-600">
                                        {getUniqueDownloaders(selectedDocument.downloadHistory)}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Usuarios Únicos</div>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
                                    <div className="flex items-center justify-center mb-2">
                                        <Clock className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="text-lg font-bold text-purple-600">
                                        {getLastDownload(selectedDocument.downloadHistory) 
                                            ? formatDate(getLastDownload(selectedDocument.downloadHistory)!.downloadDate)
                                            : 'N/A'
                                        }
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Última Descarga</div>
                                </div>
                            </div>

                            {/* Lista de Descargas */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Users className="w-5 h-5 mr-2 text-gray-600" />
                                    Detalle de Descargas ({selectedDocument.downloadHistory.length})
                                </h3>
                                
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {selectedDocument.downloadHistory
                                        .sort((a, b) => new Date(b.downloadDate).getTime() - new Date(a.downloadDate).getTime())
                                        .map((download, index) => (
                                        <div key={download.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-full">
                                                        <User className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 flex items-center">
                                                            {download.userName}
                                                            <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                                #{index + 1}
                                                            </span>
                                                        </p>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                                                <Building className="w-3 h-3 mr-1" />
                                                                {download.userCompany}
                                                            </span>
                                                            {download.ipAddress && (
                                                                <span className="text-xs text-gray-500 flex items-center">
                                                                    🌐 {download.ipAddress}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-900 flex items-center justify-end">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        {formatDate(download.downloadDate)}
                                                    </p>
                                                    <p className="text-xs text-gray-500 flex items-center justify-end">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {formatDateTime(download.downloadDate).split(' ')[1]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Resumen por Usuario */}
                            {selectedDocument.downloadHistory.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                        <BarChart3 className="w-5 h-5 mr-2 text-gray-600" />
                                        Resumen por Usuario
                                    </h4>
                                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
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
                                                <div key={userId} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="bg-blue-100 p-2 rounded-full">
                                                            <User className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <span className="text-sm font-medium text-gray-900">{userInfo.name}</span>
                                                            <div className="text-xs text-gray-500 flex items-center">
                                                                <Building className="w-3 h-3 mr-1" />
                                                                {userInfo.company}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-sm font-bold text-blue-600 flex items-center">
                                                            <Download className="w-4 h-4 mr-1" />
                                                            {userInfo.count} descarga{userInfo.count !== 1 ? 's' : ''}
                                                        </span>
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
                                className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
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