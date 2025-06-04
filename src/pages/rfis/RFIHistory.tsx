// src/pages/rfis/RFIHistory.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    History,
    Search,
    Filter,
    Calendar,
    User,
    FileQuestion,
    Clock,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Eye,
    MessageSquare,
    Paperclip,
    X,
    Globe,
    EyeOff,
    Download,
    Users,
    Building
} from 'lucide-react';
import type { RFI } from '../../types/rfi';
import { MEP_DISCIPLINES } from '../../types/common';
import rfisData from '../../data/rfis.json';

interface HistoryFilters {
    status: string[];
    discipline: string[];
    dateRange: string;
    searchTerm: string;
}

interface ViewModalData {
    isOpen: boolean;
    rfi: RFI | null;
}

interface DownloadHistoryModalData {
    isOpen: boolean;
    rfi: RFI | null;
}

interface DownloadRecord {
    id: string;
    userId: string;
    userName: string;
    userCompany: string;
    downloadDate: string;
    documentType: 'rfi_pdf' | 'attachment' | 'response_doc';
    documentName: string;
    ipAddress?: string;
    userAgent?: string;
}

// Función para generar historial de descargas mock para RFIs
const generateDownloadHistory = (rfiId: string, attachmentCount: number): DownloadRecord[] => {
    const users = [
        { id: 'user-001', name: 'Ing. Roberto Vega', company: 'HVAC Solutions S.A.C.' },
        { id: 'user-002', name: 'Ing. María Santos', company: 'Climatización Perú' },
        { id: 'user-003', name: 'Ing. Fernando Morales', company: 'MEP Contractors Inc.' },
        { id: 'user-004', name: 'Ing. Patricia Campos', company: 'Ingeniería Térmica SAC' },
        { id: 'user-005', name: 'Ing. Jorge Ramírez', company: 'Electro Instalaciones Perú' },
        { id: 'user-006', name: 'Ing. Carmen López', company: 'Sistemas Eléctricos SAC' },
        { id: 'user-007', name: 'Ing. Rosa Medina', company: 'Plomería Industrial SAC' },
        { id: 'user-008', name: 'Ing. Felipe Castro', company: 'Instalaciones Hidráulicas' }
    ];

    const documentTypes = [
        { type: 'rfi_pdf' as const, name: 'RFI Completo.pdf' },
        { type: 'response_doc' as const, name: 'Respuesta Técnica.pdf' },
        ...(attachmentCount > 0 ? Array.from({ length: attachmentCount }, (_, i) => ({
            type: 'attachment' as const,
            name: `Adjunto_${i + 1}.pdf`
        })) : [])
    ];

    const downloads: DownloadRecord[] = [];
    const downloadCount = Math.floor(Math.random() * 15) + 3; // 3-17 descargas

    for (let i = 0; i < downloadCount; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const doc = documentTypes[Math.floor(Math.random() * documentTypes.length)];

        downloads.push({
            id: `dl-${rfiId}-${i}`,
            userId: user.id,
            userName: user.name,
            userCompany: user.company,
            downloadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            documentType: doc.type,
            documentName: doc.name,
            ipAddress: `192.168.1.${Math.floor(Math.random() * 254) + 1}`
        });
    }

    return downloads.sort((a, b) => new Date(b.downloadDate).getTime() - new Date(a.downloadDate).getTime());
};

const RFIHistory: React.FC = () => {
    const [filters, setFilters] = useState<HistoryFilters>({
        status: [],
        discipline: [],
        dateRange: 'all',
        searchTerm: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
    const [allRFIs, setAllRFIs] = useState<RFI[]>([]);
    const [viewModal, setViewModal] = useState<ViewModalData>({
        isOpen: false,
        rfi: null
    });
    const [downloadHistoryModal, setDownloadHistoryModal] = useState<DownloadHistoryModalData>({
        isOpen: false,
        rfi: null
    });

    // Agregar historial de descargas a cada RFI
    const [rfiDownloadHistory, setRfiDownloadHistory] = useState<Record<string, DownloadRecord[]>>({});

    // Cargar RFIs del localStorage y combinar con las mock
    React.useEffect(() => {
        try {
            const storedRFIs = JSON.parse(localStorage.getItem('civil_eng_rfis') || '[]');
            const mockRFIs: RFI[] = rfisData.rfis as RFI[];

            // Combinar RFIs almacenadas localmente con las mock
            const combinedRFIs = [...storedRFIs, ...mockRFIs];
            setAllRFIs(combinedRFIs);

            // Generar historial de descargas para cada RFI
            const downloadHistoryData: Record<string, DownloadRecord[]> = {};
            combinedRFIs.forEach(rfi => {
                const attachmentCount = rfi.attachments?.length || 0;
                downloadHistoryData[rfi.id] = generateDownloadHistory(rfi.id, attachmentCount);
            });
            setRfiDownloadHistory(downloadHistoryData);

            console.log('RFIs cargadas en historial:', combinedRFIs.length);
        } catch (error) {
            console.error('Error al cargar RFIs del localStorage:', error);
            setAllRFIs(rfisData.rfis as RFI[]);
        }
    }, []);

    const rfis: RFI[] = allRFIs;
    const users = rfisData.users;

    // Status configuration
    const statusConfig = {
        open: { label: 'Abierta', color: 'bg-blue-100 text-blue-800', icon: AlertTriangle },
        in_review: { label: 'En Revisión', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
        responded: { label: 'Respondida', color: 'bg-green-100 text-green-800', icon: CheckCircle },
        closed: { label: 'Cerrada', color: 'bg-gray-100 text-gray-800', icon: XCircle }
    };

    // Filter RFIs based on current filters
    const filteredRFIs = useMemo(() => {
        return rfis.filter(rfi => {
            // Search term filter
            if (filters.searchTerm) {
                const searchLower = filters.searchTerm.toLowerCase();
                const matchesSearch =
                    rfi.title.toLowerCase().includes(searchLower) ||
                    rfi.rfiNumber.toLowerCase().includes(searchLower) ||
                    rfi.description.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }

            // Status filter
            if (filters.status.length > 0 && !filters.status.includes(rfi.status)) {
                return false;
            }

            // Discipline filter
            if (filters.discipline.length > 0 && !filters.discipline.includes(rfi.discipline)) {
                return false;
            }

            // Date range filter
            if (filters.dateRange !== 'all') {
                const rfiDate = new Date(rfi.createdAt);
                const now = new Date();
                const daysAgo = Math.floor((now.getTime() - rfiDate.getTime()) / (1000 * 60 * 60 * 24));

                switch (filters.dateRange) {
                    case '7': if (daysAgo > 7) return false; break;
                    case '30': if (daysAgo > 30) return false; break;
                    case '90': if (daysAgo > 90) return false; break;
                }
            }

            return true;
        }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [rfis, filters]);

    const toggleFilter = (filterType: keyof HistoryFilters, value: string) => {
        if (filterType === 'dateRange' || filterType === 'searchTerm') {
            setFilters(prev => ({ ...prev, [filterType]: value }));
        } else {
            setFilters(prev => {
                const currentValues = prev[filterType] as string[];
                const newValues = currentValues.includes(value)
                    ? currentValues.filter(v => v !== value)
                    : [...currentValues, value];
                return { ...prev, [filterType]: newValues };
            });
        }
    };

    const handleViewRFI = (rfi: RFI) => {
        setViewModal({
            isOpen: true,
            rfi: rfi
        });
    };

    const handleShowDownloadHistory = (rfi: RFI) => {
        setDownloadHistoryModal({
            isOpen: true,
            rfi: rfi
        });
    };

    const closeViewModal = () => {
        setViewModal({
            isOpen: false,
            rfi: null
        });
    };

    const closeDownloadHistoryModal = () => {
        setDownloadHistoryModal({
            isOpen: false,
            rfi: null
        });
    };

    const getUserName = (userId: string) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : userId;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatRelativeDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
        return `Hace ${Math.floor(diffDays / 30)} meses`;
    };

    const getStatusIcon = (status: string) => {
        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config?.icon || FileQuestion;
        return <Icon className="w-4 h-4" />;
    };

    const getPrivacyIcon = (privacy: string) => {
        return privacy === 'privado' ? <EyeOff className="w-4 h-4" /> : <Globe className="w-4 h-4" />;
    };

    const getPrivacyColor = (privacy: string) => {
        return privacy === 'privado' ? 'text-yellow-600 bg-yellow-50' : 'text-green-600 bg-green-50';
    };

    // Funciones para obtener estadísticas de descarga
    const getTotalDownloads = (rfiId: string): number => {
        return rfiDownloadHistory[rfiId]?.length || 0;
    };

    const getUniqueDownloaders = (rfiId: string): number => {
        const downloads = rfiDownloadHistory[rfiId] || [];
        const uniqueUsers = new Set(downloads.map(d => d.userId));
        return uniqueUsers.size;
    };

    const getLastDownload = (rfiId: string): DownloadRecord | null => {
        const downloads = rfiDownloadHistory[rfiId] || [];
        return downloads.length > 0 ? downloads[0] : null;
    };

    const getDocumentTypeLabel = (type: string): string => {
        switch (type) {
            case 'rfi_pdf': return 'RFI Completo';
            case 'attachment': return 'Adjunto';
            case 'response_doc': return 'Documento de Respuesta';
            default: return type;
        }
    };

    const getDocumentTypeIcon = (type: string): string => {
        switch (type) {
            case 'rfi_pdf': return '📄';
            case 'attachment': return '📎';
            case 'response_doc': return '📋';
            default: return '📁';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        to="/rfis"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-purple-500 rounded-lg">
                            <History className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Historial de RFIs</h1>
                            <p className="text-gray-600">{filteredRFIs.length} registros encontrados</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-1 text-sm rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                        >
                            Lista
                        </button>
                        <button
                            onClick={() => setViewMode('timeline')}
                            className={`px-3 py-1 text-sm rounded ${viewMode === 'timeline' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                        >
                            Timeline
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar en el historial..."
                            value={filters.searchTerm}
                            onChange={(e) => toggleFilter('searchTerm', e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`px-4 py-2 border rounded-lg transition-colors flex items-center space-x-2 ${showFilters ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filtros</span>
                    </button>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <select
                        value={filters.dateRange}
                        onChange={(e) => toggleFilter('dateRange', e.target.value)}
                        className="text-sm border border-gray-300 rounded px-3 py-1"
                    >
                        <option value="all">Todas las fechas</option>
                        <option value="7">Últimos 7 días</option>
                        <option value="30">Últimos 30 días</option>
                        <option value="90">Últimos 90 días</option>
                    </select>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <div className="border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                                <div className="space-y-2">
                                    {Object.entries(statusConfig).map(([key, config]) => (
                                        <label key={key} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.status.includes(key)}
                                                onChange={() => toggleFilter('status', key)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{config.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Discipline Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Disciplina</label>
                                <div className="space-y-2">
                                    {Object.values(MEP_DISCIPLINES).map((discipline) => (
                                        <label key={discipline.key} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.discipline.includes(discipline.key)}
                                                onChange={() => toggleFilter('discipline', discipline.key)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{discipline.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content based on view mode */}
            {viewMode === 'list' ? (
                // List View
                <div className="space-y-4">
                    {filteredRFIs.map((rfi) => {
                        const privacy = (rfi as any).privacy || 'publico';
                        const totalDownloads = getTotalDownloads(rfi.id);
                        const uniqueDownloaders = getUniqueDownloaders(rfi.id);
                        const lastDownload = getLastDownload(rfi.id);

                        return (
                            <div key={rfi.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="text-sm font-mono text-gray-600">{rfi.rfiNumber}</span>
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[rfi.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-800'}`}>
                                                {statusConfig[rfi.status as keyof typeof statusConfig]?.label || rfi.status}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {MEP_DISCIPLINES[rfi.discipline as keyof typeof MEP_DISCIPLINES]?.label || rfi.discipline}
                                            </span>
                                            <div className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${getPrivacyColor(privacy)}`}>
                                                {getPrivacyIcon(privacy)}
                                                <span>{privacy === 'privado' ? 'Privado' : 'Público'}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-medium text-gray-900 mb-2">{rfi.title}</h3>

                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{rfi.description}</p>

                                        <div className="flex items-center space-x-6 text-xs text-gray-500 mb-3">
                                            <div className="flex items-center space-x-1">
                                                <User className="w-3 h-3" />
                                                <span>Por: {getUserName(rfi.requestedBy)}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <User className="w-3 h-3" />
                                                <span>Para: {getUserName(rfi.assignedTo)}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{formatDate(rfi.createdAt)}</span>
                                            </div>
                                            {rfi.attachments && rfi.attachments.length > 0 && (
                                                <div className="flex items-center space-x-1">
                                                    <Paperclip className="w-3 h-3" />
                                                    <span>{rfi.attachments.length}</span>
                                                </div>
                                            )}
                                            {rfi.comments && rfi.comments.length > 0 && (
                                                <div className="flex items-center space-x-1">
                                                    <MessageSquare className="w-3 h-3" />
                                                    <span>{rfi.comments.length}</span>
                                                </div>
                                            )}
                                            {rfi.location && (
                                                <div className="flex items-center space-x-1">
                                                    <span>📍</span>
                                                    <span>{rfi.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Download Statistics */}
                                        <div className="flex items-center space-x-6 text-sm mb-3">
                                            <span className="flex items-center text-blue-600">
                                                <Download className="w-4 h-4 mr-1" />
                                                <strong>{totalDownloads}</strong> descargas
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
                                                onClick={() => handleShowDownloadHistory(rfi)}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                                            >
                                                Ver historial de descargas
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleViewRFI(rfi)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Ver detalles"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleShowDownloadHistory(rfi)}
                                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                            title="Historial de descargas"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                // Timeline View
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>

                        <div className="space-y-8">
                            {filteredRFIs.map((rfi) => {
                                const privacy = (rfi as any).privacy || 'publico';
                                const totalDownloads = getTotalDownloads(rfi.id);
                                const uniqueDownloaders = getUniqueDownloaders(rfi.id);

                                return (
                                    <div key={rfi.id} className="relative flex items-start space-x-4">
                                        {/* Timeline dot */}
                                        <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${statusConfig[rfi.status as keyof typeof statusConfig]?.color || 'bg-gray-100'}`}>
                                            {getStatusIcon(rfi.status)}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-gray-900">{rfi.rfiNumber}</span>
                                                    <span className="text-xs text-gray-500">
                                                        {MEP_DISCIPLINES[rfi.discipline as keyof typeof MEP_DISCIPLINES]?.label}
                                                    </span>
                                                    <div className={`inline-flex items-center space-x-1 px-1 py-0.5 text-xs rounded ${getPrivacyColor(privacy)}`}>
                                                        {getPrivacyIcon(privacy)}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xs text-gray-500">{formatRelativeDate(rfi.createdAt)}</span>
                                                    <button
                                                        onClick={() => handleViewRFI(rfi)}
                                                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                        title="Ver detalles"
                                                    >
                                                        <Eye className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleShowDownloadHistory(rfi)}
                                                        className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                                                        title="Historial de descargas"
                                                    >
                                                        <Download className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>

                                            <h4 className="text-sm font-medium text-gray-900 mb-1">{rfi.title}</h4>

                                            <p className="text-xs text-gray-600 mb-2">{rfi.description.substring(0, 150)}...</p>

                                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                <span>{getUserName(rfi.requestedBy)} → {getUserName(rfi.assignedTo)}</span>
                                                {rfi.location && <span>📍 {rfi.location}</span>}
                                                {rfi.attachments && rfi.attachments.length > 0 && (
                                                    <span>📎 {rfi.attachments.length}</span>
                                                )}
                                                {rfi.comments && rfi.comments.length > 0 && (
                                                    <span>💬 {rfi.comments.length}</span>
                                                )}
                                                <span className="text-blue-600">📥 {totalDownloads}</span>
                                                <span className="text-green-600">👥 {uniqueDownloaders}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredRFIs.length === 0 && (
                <div className="text-center py-12">
                    <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay registros en el historial</h3>
                    <p className="text-gray-500">
                        {filters.searchTerm || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== 'all')
                            ? 'Intenta ajustar los filtros de búsqueda'
                            : 'El historial se poblará automáticamente con las RFIs del proyecto'}
                    </p>
                </div>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <History className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Total Registros</p>
                            <p className="text-lg font-semibold text-gray-900">{filteredRFIs.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Respondidas</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {filteredRFIs.filter(rfi => rfi.status === 'responded' || rfi.status === 'closed').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">En Proceso</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {filteredRFIs.filter(rfi => rfi.status === 'open' || rfi.status === 'in_review').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Download className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Total Descargas</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {filteredRFIs.reduce((sum, rfi) => sum + getTotalDownloads(rfi.id), 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Modal */}
            {viewModal.isOpen && viewModal.rfi && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Eye className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Detalles de RFI - Historial</h2>
                                    <p className="text-sm text-gray-600">{viewModal.rfi.rfiNumber}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeViewModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información General</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Título:</span>
                                            <p className="text-sm text-gray-900 mt-1">{viewModal.rfi.title}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Estado:</span>
                                            <div className="mt-1">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[viewModal.rfi.status as keyof typeof statusConfig]?.color}`}>
                                                    {statusConfig[viewModal.rfi.status as keyof typeof statusConfig]?.label}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Prioridad:</span>
                                            <div className="mt-1">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${['critical', 'urgente'].includes(viewModal.rfi.priority.toLowerCase()) ? 'bg-red-100 text-red-800' :
                                                    ['high', 'alta'].includes(viewModal.rfi.priority.toLowerCase()) ? 'bg-orange-100 text-orange-800' :
                                                        ['medium', 'media'].includes(viewModal.rfi.priority.toLowerCase()) ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'
                                                    }`}>
                                                    {['critical', 'urgente'].includes(viewModal.rfi.priority.toLowerCase()) ? 'Urgente' :
                                                        ['high', 'alta'].includes(viewModal.rfi.priority.toLowerCase()) ? 'Alta' :
                                                            ['medium', 'media'].includes(viewModal.rfi.priority.toLowerCase()) ? 'Media' :
                                                                ['low', 'baja'].includes(viewModal.rfi.priority.toLowerCase()) ? 'Baja' :
                                                                    viewModal.rfi.priority}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Visibilidad:</span>
                                            <div className="mt-1">
                                                <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${getPrivacyColor((viewModal.rfi as any).privacy || 'publico')}`}>
                                                    {getPrivacyIcon((viewModal.rfi as any).privacy || 'publico')}
                                                    <span>{(viewModal.rfi as any).privacy === 'privado' ? 'Privado' : 'Público'}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Disciplina:</span>
                                            <p className="text-sm text-gray-900 mt-1">
                                                {MEP_DISCIPLINES[viewModal.rfi.discipline as keyof typeof MEP_DISCIPLINES]?.label || viewModal.rfi.discipline}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Ubicación:</span>
                                            <p className="text-sm text-gray-900 mt-1">{viewModal.rfi.location || 'No especificada'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Asignación y Fechas</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Solicitado por:</span>
                                            <p className="text-sm text-gray-900 mt-1">{getUserName(viewModal.rfi.requestedBy)}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Asignado a:</span>
                                            <p className="text-sm text-gray-900 mt-1">{getUserName(viewModal.rfi.assignedTo)}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Fecha de creación:</span>
                                            <p className="text-sm text-gray-900 mt-1">{formatDate(viewModal.rfi.createdAt)}</p>
                                        </div>
                                        {viewModal.rfi.dueDate && (
                                            <div>
                                                <span className="text-sm font-medium text-gray-500">Fecha límite:</span>
                                                <p className="text-sm text-gray-900 mt-1">{formatDate(viewModal.rfi.dueDate)}</p>
                                            </div>
                                        )}
                                        {viewModal.rfi.responseDate && (
                                            <div>
                                                <span className="text-sm font-medium text-gray-500">Fecha de respuesta:</span>
                                                <p className="text-sm text-gray-900 mt-1">{formatDate(viewModal.rfi.responseDate)}</p>
                                            </div>
                                        )}
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Categoría:</span>
                                            <p className="text-sm text-gray-900 mt-1">{viewModal.rfi.category || 'No especificada'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Download Statistics in View Modal */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Estadísticas de Descarga</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <Download className="w-5 h-5 text-blue-600 mr-2" />
                                            <span className="text-2xl font-bold text-blue-900">{getTotalDownloads(viewModal.rfi.id)}</span>
                                        </div>
                                        <p className="text-sm text-blue-700">Total Descargas</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <Users className="w-5 h-5 text-green-600 mr-2" />
                                            <span className="text-2xl font-bold text-green-900">{getUniqueDownloaders(viewModal.rfi.id)}</span>
                                        </div>
                                        <p className="text-sm text-green-700">Usuarios Únicos</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <Clock className="w-5 h-5 text-purple-600 mr-2" />
                                            <span className="text-xs font-medium text-purple-900">
                                                {getLastDownload(viewModal.rfi.id) ?
                                                    formatDateTime(getLastDownload(viewModal.rfi.id)!.downloadDate) :
                                                    'Sin descargas'
                                                }
                                            </span>
                                        </div>
                                        <p className="text-sm text-purple-700">Última Descarga</p>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={() => {
                                            closeViewModal();
                                            handleShowDownloadHistory(viewModal.rfi);
                                        }}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                                    >
                                        Ver historial completo de descargas
                                    </button>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Descripción</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{viewModal.rfi.description}</p>
                                </div>
                            </div>

                            {/* Response */}
                            {viewModal.rfi.response && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Respuesta</h3>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{viewModal.rfi.response}</p>
                                        {viewModal.rfi.responseBy && (
                                            <div className="mt-3 pt-3 border-t border-green-200">
                                                <p className="text-xs text-gray-600">
                                                    Respondido por: {getUserName(viewModal.rfi.responseBy)} • {formatDate(viewModal.rfi.responseDate!)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Attachments */}
                            {viewModal.rfi.attachments && viewModal.rfi.attachments.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Archivos Adjuntos</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {viewModal.rfi.attachments.map((attachment, index) => (
                                            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <Paperclip className="w-4 h-4 text-gray-400 mr-3" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                                                    <p className="text-xs text-gray-500">{formatDate(attachment.uploadedAt)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                            {/* Email Data if sent as email */}
                            {(viewModal.rfi as any).emailData && (viewModal.rfi as any).emailData.sentAsEmail && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Información del Correo</h3>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <span className="font-medium text-blue-900">Para:</span>
                                                <p className="text-blue-800">{(viewModal.rfi as any).emailData.para}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-blue-900">Asunto:</span>
                                                <p className="text-blue-800">{(viewModal.rfi as any).emailData.asunto}</p>
                                            </div>
                                            {(viewModal.rfi as any).emailData.cc && (viewModal.rfi as any).emailData.cc.length > 0 && (
                                                <div className="md:col-span-2">
                                                    <span className="font-medium text-blue-900">CC:</span>
                                                    <p className="text-blue-800">{(viewModal.rfi as any).emailData.cc.join(', ')}</p>
                                                </div>
                                            )}
                                            {(viewModal.rfi as any).emailData.otherEmails && (
                                                <div className="md:col-span-2">
                                                    <span className="font-medium text-blue-900">Otros emails:</span>
                                                    <p className="text-blue-800">{(viewModal.rfi as any).emailData.otherEmails}</p>
                                                </div>
                                            )}
                                            <div className="md:col-span-2">
                                                <span className="font-medium text-blue-900">Enviado:</span>
                                                <p className="text-blue-800">{formatDate((viewModal.rfi as any).emailData.sentAt)}</p>
                                            </div>
                                        </div>
                                        {(viewModal.rfi as any).emailData.texto && (
                                            <div className="mt-3 pt-3 border-t border-blue-200">
                                                <span className="font-medium text-blue-900">Mensaje del correo:</span>
                                                <p className="text-blue-800 mt-1 whitespace-pre-wrap">{(viewModal.rfi as any).emailData.texto}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Metadata for created RFIs */}
                            <div className="border-t border-gray-200 pt-4">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Información del Registro</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-500">
                                    <div>
                                        <span className="font-medium">ID:</span> {viewModal.rfi.id}
                                    </div>
                                    <div>
                                        <span className="font-medium">Creado:</span> {formatDate(viewModal.rfi.createdAt)}
                                    </div>
                                    <div>
                                        <span className="font-medium">Última actualización:</span> {formatDate(viewModal.rfi.updatedAt)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={closeViewModal}
                                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Download History Modal */}
            {downloadHistoryModal.isOpen && downloadHistoryModal.rfi && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Historial de Descargas - RFI</h3>
                                <p className="text-sm text-gray-600">{downloadHistoryModal.rfi.rfiNumber} - {downloadHistoryModal.rfi.title}</p>
                            </div>
                            <button
                                onClick={closeDownloadHistoryModal}
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
                                    <p className="text-2xl font-bold text-blue-900">{getTotalDownloads(downloadHistoryModal.rfi.id)}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-5 h-5 text-green-600" />
                                        <span className="text-sm text-green-600">Usuarios Únicos</span>
                                    </div>
                                    <p className="text-2xl font-bold text-green-900">
                                        {getUniqueDownloaders(downloadHistoryModal.rfi.id)}
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-5 h-5 text-purple-600" />
                                        <span className="text-sm text-purple-600">Última Descarga</span>
                                    </div>
                                    <p className="text-sm font-medium text-purple-900">
                                        {getLastDownload(downloadHistoryModal.rfi.id) ?
                                            formatDateTime(getLastDownload(downloadHistoryModal.rfi.id)!.downloadDate) :
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

                                {(!rfiDownloadHistory[downloadHistoryModal.rfi.id] || rfiDownloadHistory[downloadHistoryModal.rfi.id].length === 0) ? (
                                    <div className="p-8 text-center">
                                        <Download className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">No hay registros de descarga para esta RFI</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-200">
                                        {rfiDownloadHistory[downloadHistoryModal.rfi.id].map((record, index) => (
                                            <div key={record.id} className="p-4 hover:bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <span className="text-lg">{getDocumentTypeIcon(record.documentType)}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center space-x-2">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {record.userName}
                                                                </p>
                                                                <span className="text-xs text-gray-500">#{index + 1}</span>
                                                                <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-800">
                                                                    {getDocumentTypeLabel(record.documentType)}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-4 mt-1">
                                                                <span className="flex items-center text-xs text-gray-500">
                                                                    <Building className="w-3 h-3 mr-1" />
                                                                    {record.userCompany}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    📄 {record.documentName}
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
                            {rfiDownloadHistory[downloadHistoryModal.rfi.id] && rfiDownloadHistory[downloadHistoryModal.rfi.id].length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Resumen por Usuario</h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="space-y-2">
                                            {Object.entries(
                                                rfiDownloadHistory[downloadHistoryModal.rfi.id].reduce((acc, record) => {
                                                    if (!acc[record.userId]) {
                                                        acc[record.userId] = {
                                                            name: record.userName,
                                                            company: record.userCompany,
                                                            count: 0,
                                                            lastDownload: record.downloadDate,
                                                            documents: new Set()
                                                        };
                                                    }
                                                    acc[record.userId].count++;
                                                    acc[record.userId].documents.add(record.documentType);
                                                    if (new Date(record.downloadDate) > new Date(acc[record.userId].lastDownload)) {
                                                        acc[record.userId].lastDownload = record.downloadDate;
                                                    }
                                                    return acc;
                                                }, {} as Record<string, { name: string; company: string; count: number; lastDownload: string; documents: Set<string> }>)
                                            ).map(([userId, userInfo]) => (
                                                <div key={userId} className="flex items-center justify-between p-2 bg-white rounded border">
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-900">{userInfo.name}</span>
                                                        <span className="text-xs text-gray-500 ml-2">({userInfo.company})</span>
                                                        <div className="flex items-center space-x-1 mt-1">
                                                            {Array.from(userInfo.documents).map(docType => (
                                                                <span key={docType} className="inline-flex px-1 py-0.5 text-xs rounded bg-gray-100 text-gray-600">
                                                                    {getDocumentTypeIcon(docType)} {getDocumentTypeLabel(docType)}
                                                                </span>
                                                            ))}
                                                        </div>
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

                            {/* Document Type Summary */}
                            {rfiDownloadHistory[downloadHistoryModal.rfi.id] && rfiDownloadHistory[downloadHistoryModal.rfi.id].length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Descargas por Tipo de Documento</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {Object.entries(
                                            rfiDownloadHistory[downloadHistoryModal.rfi.id].reduce((acc, record) => {
                                                acc[record.documentType] = (acc[record.documentType] || 0) + 1;
                                                return acc;
                                            }, {} as Record<string, number>)
                                        ).map(([docType, count]) => (
                                            <div key={docType} className="bg-white border rounded-lg p-3 text-center">
                                                <div className="text-2xl mb-1">{getDocumentTypeIcon(docType)}</div>
                                                <div className="text-sm font-medium text-gray-900">{getDocumentTypeLabel(docType)}</div>
                                                <div className="text-lg font-bold text-blue-600">{count}</div>
                                                <div className="text-xs text-gray-500">descargas</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                            <button
                                onClick={closeDownloadHistoryModal}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RFIHistory;