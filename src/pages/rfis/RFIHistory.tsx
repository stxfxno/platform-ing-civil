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
    Paperclip
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

const RFIHistory: React.FC = () => {
    const [filters, setFilters] = useState<HistoryFilters>({
        status: [],
        discipline: [],
        dateRange: 'all',
        searchTerm: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');

    const rfis: RFI[] = rfisData.rfis as RFI[];
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
                        className={`px-4 py-2 border rounded-lg transition-colors flex items-center space-x-2 ${
                            showFilters ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
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
                    {filteredRFIs.map((rfi) => (
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
                                    </div>
                                    
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{rfi.title}</h3>
                                    
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{rfi.description}</p>
                                    
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
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
                                        {rfi.attachments.length > 0 && (
                                            <div className="flex items-center space-x-1">
                                                <Paperclip className="w-3 h-3" />
                                                <span>{rfi.attachments.length}</span>
                                            </div>
                                        )}
                                        {rfi.comments.length > 0 && (
                                            <div className="flex items-center space-x-1">
                                                <MessageSquare className="w-3 h-3" />
                                                <span>{rfi.comments.length}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Timeline View
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>
                        
                        <div className="space-y-8">
                            {filteredRFIs.map((rfi) => (  //index
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
                                            </div>
                                            <span className="text-xs text-gray-500">{formatRelativeDate(rfi.createdAt)}</span>
                                        </div>
                                        
                                        <h4 className="text-sm font-medium text-gray-900 mb-1">{rfi.title}</h4>
                                        
                                        <p className="text-xs text-gray-600 mb-2">{rfi.description.substring(0, 150)}...</p>
                                        
                                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                                            <span>{getUserName(rfi.requestedBy)} → {getUserName(rfi.assignedTo)}</span>
                                            {rfi.location && <span>📍 {rfi.location}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                            <FileQuestion className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Este Mes</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {filteredRFIs.filter(rfi => {
                                    const rfiDate = new Date(rfi.createdAt);
                                    const now = new Date();
                                    return rfiDate.getMonth() === now.getMonth() && rfiDate.getFullYear() === now.getFullYear();
                                }).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RFIHistory;