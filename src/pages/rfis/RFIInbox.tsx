// src/pages/rfis/RFIInbox.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    Search,
    Filter,
    SortAsc,
    MoreHorizontal,
    FileQuestion,
    Calendar,
    User,
    Clock,
    AlertTriangle,
    CheckCircle,
    Eye,
    Edit,
    MessageSquare,
    Paperclip
} from 'lucide-react';
import type { RFI } from '../../types/rfi';
import { MEP_DISCIPLINES, SYSTEM_PRIORITIES } from '../../types/common';
import rfisData from '../../data/rfis.json';

interface RFIFilters {
    status: string[];
    priority: string[];
    discipline: string[];
    assignedTo: string[];
    searchTerm: string;
}

const RFIInbox: React.FC = () => {
    const [filters, setFilters] = useState<RFIFilters>({
        status: [],
        priority: [],
        discipline: [],
        assignedTo: [],
        searchTerm: ''
    });
    const [sortField, setSortField] = useState<string>('createdAt');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRFIs, setSelectedRFIs] = useState<string[]>([]);

    const rfis: RFI[] = rfisData.rfis as RFI[];
    const users = rfisData.users;

    // Status configuration
    const statusConfig = {
        open: { label: 'Abierta', color: 'bg-blue-100 text-blue-800' },
        in_review: { label: 'En Revisión', color: 'bg-yellow-100 text-yellow-800' },
        responded: { label: 'Respondida', color: 'bg-green-100 text-green-800' },
        closed: { label: 'Cerrada', color: 'bg-gray-100 text-gray-800' }
    };

    const priorityConfig = {
        critical: { label: 'Crítica', color: 'bg-red-100 text-red-800' },
        high: { label: 'Alta', color: 'bg-orange-100 text-orange-800' },
        medium: { label: 'Media', color: 'bg-yellow-100 text-yellow-800' },
        low: { label: 'Baja', color: 'bg-green-100 text-green-800' }
    };

    // Filter and sort RFIs
    const filteredAndSortedRFIs = useMemo(() => {
        let filtered = rfis.filter(rfi => {
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

            // Priority filter
            if (filters.priority.length > 0 && !filters.priority.includes(rfi.priority)) {
                return false;
            }

            // Discipline filter
            if (filters.discipline.length > 0 && !filters.discipline.includes(rfi.discipline)) {
                return false;
            }

            // Assigned to filter
            if (filters.assignedTo.length > 0 && !filters.assignedTo.includes(rfi.assignedTo)) {
                return false;
            }

            return true;
        });

        // Sort
        filtered.sort((a, b) => {
            let aValue: any = a[sortField as keyof RFI];
            let bValue: any = b[sortField as keyof RFI];

            if (sortField === 'priority') {
                const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
                bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [rfis, filters, sortField, sortDirection]);

    const handleFilterChange = (filterType: keyof RFIFilters, value: string | string[]) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const toggleFilter = (filterType: keyof RFIFilters, value: string) => {
        setFilters(prev => {
            const currentValues = prev[filterType] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [filterType]: newValues };
        });
    };

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const toggleSelectRFI = (rfiId: string) => {
        setSelectedRFIs(prev =>
            prev.includes(rfiId)
                ? prev.filter(id => id !== rfiId)
                : [...prev, rfiId]
        );
    };

    const selectAllRFIs = () => {
        setSelectedRFIs(
            selectedRFIs.length === filteredAndSortedRFIs.length
                ? []
                : filteredAndSortedRFIs.map(rfi => rfi.id)
        );
    };

    const getUserName = (userId: string) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : userId;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getDaysUntilDue = (dueDateString?: string) => {
        if (!dueDateString) return null;
        const today = new Date();
        const dueDate = new Date(dueDateString);
        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
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
                        <div className="p-3 bg-blue-500 rounded-lg">
                            <FileQuestion className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Bandeja de RFIs</h1>
                            <p className="text-gray-600">{filteredAndSortedRFIs.length} solicitudes de información</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Link
                        to="/rfis/crear"
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Nueva RFI
                    </Link>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar RFIs por número, título o descripción..."
                            value={filters.searchTerm}
                            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
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

                {/* Filters Panel */}
                {showFilters && (
                    <div className="border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                            {/* Priority Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                                <div className="space-y-2">
                                    {Object.entries(priorityConfig).map(([key, config]) => (
                                        <label key={key} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.priority.includes(key)}
                                                onChange={() => toggleFilter('priority', key)}
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

                            {/* Assigned To Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Asignado a</label>
                                <div className="space-y-2">
                                    {users.map((user) => (
                                        <label key={user.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.assignedTo.includes(user.id)}
                                                onChange={() => toggleFilter('assignedTo', user.id)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{user.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* RFIs Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedRFIs.length === filteredAndSortedRFIs.length && filteredAndSortedRFIs.length > 0}
                                    onChange={selectAllRFIs}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-700">
                                    {selectedRFIs.length > 0 ? `${selectedRFIs.length} seleccionadas` : 'Seleccionar todas'}
                                </span>
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleSort('createdAt')}
                                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                            >
                                <SortAsc className="w-4 h-4" />
                                <span>Ordenar por fecha</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button onClick={() => handleSort('rfiNumber')} className="flex items-center space-x-1">
                                        <span>RFI</span>
                                        <SortAsc className="w-3 h-3" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Título
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button onClick={() => handleSort('status')} className="flex items-center space-x-1">
                                        <span>Estado</span>
                                        <SortAsc className="w-3 h-3" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button onClick={() => handleSort('priority')} className="flex items-center space-x-1">
                                        <span>Prioridad</span>
                                        <SortAsc className="w-3 h-3" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Asignado a
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha límite
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAndSortedRFIs.map((rfi) => {
                                const daysUntilDue = getDaysUntilDue(rfi.dueDate);
                                const isOverdue = daysUntilDue !== null && daysUntilDue < 0;
                                const isDueSoon = daysUntilDue !== null && daysUntilDue <= 3 && daysUntilDue >= 0;

                                return (
                                    <tr key={rfi.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRFIs.includes(rfi.id)}
                                                    onChange={() => toggleSelectRFI(rfi.id)}
                                                    className="mr-3"
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{rfi.rfiNumber}</div>
                                                    <div className="text-xs text-gray-500">{formatDate(rfi.createdAt)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-xs">
                                                <div className="text-sm font-medium text-gray-900 truncate">{rfi.title}</div>
                                                <div className="text-xs text-gray-500 truncate">{rfi.location}</div>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    {rfi.attachments.length > 0 && (
                                                        <div className="flex items-center text-xs text-gray-500">
                                                            <Paperclip className="w-3 h-3 mr-1" />
                                                            {rfi.attachments.length}
                                                        </div>
                                                    )}
                                                    {rfi.comments.length > 0 && (
                                                        <div className="flex items-center text-xs text-gray-500">
                                                            <MessageSquare className="w-3 h-3 mr-1" />
                                                            {rfi.comments.length}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[rfi.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-800'}`}>
                                                {statusConfig[rfi.status as keyof typeof statusConfig]?.label || rfi.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityConfig[rfi.priority as keyof typeof priorityConfig]?.color || 'bg-gray-100 text-gray-800'}`}>
                                                {priorityConfig[rfi.priority as keyof typeof priorityConfig]?.label || rfi.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                                                    <User className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {getUserName(rfi.assignedTo)}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {MEP_DISCIPLINES[rfi.discipline as keyof typeof MEP_DISCIPLINES]?.label || rfi.discipline}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {rfi.dueDate ? (
                                                <div className="flex items-center">
                                                    <Calendar className={`w-4 h-4 mr-2 ${isOverdue ? 'text-red-500' : isDueSoon ? 'text-yellow-500' : 'text-gray-400'}`} />
                                                    <div>
                                                        <div className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : isDueSoon ? 'text-yellow-600 font-medium' : 'text-gray-900'}`}>
                                                            {formatDate(rfi.dueDate)}
                                                        </div>
                                                        {daysUntilDue !== null && (
                                                            <div className={`text-xs ${isOverdue ? 'text-red-500' : isDueSoon ? 'text-yellow-500' : 'text-gray-500'}`}>
                                                                {isOverdue ? `Vencida hace ${Math.abs(daysUntilDue)} días` : 
                                                                 daysUntilDue === 0 ? 'Vence hoy' :
                                                                 `${daysUntilDue} días restantes`}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500">Sin fecha límite</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredAndSortedRFIs.length === 0 && (
                    <div className="text-center py-12">
                        <FileQuestion className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron RFIs</h3>
                        <p className="text-gray-500 mb-4">
                            {filters.searchTerm || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f)
                                ? 'Intenta ajustar los filtros de búsqueda'
                                : 'Aún no hay RFIs creadas en el sistema'}
                        </p>
                        {!filters.searchTerm && !Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f) && (
                            <Link
                                to="/rfis/crear"
                                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                <FileQuestion className="w-4 h-4 mr-2" />
                                Crear primera RFI
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FileQuestion className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Total RFIs</p>
                            <p className="text-lg font-semibold text-gray-900">{filteredAndSortedRFIs.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Pendientes</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {filteredAndSortedRFIs.filter(rfi => rfi.status === 'open' || rfi.status === 'in_review').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Vencidas</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {filteredAndSortedRFIs.filter(rfi => {
                                    const days = getDaysUntilDue(rfi.dueDate);
                                    return days !== null && days < 0;
                                }).length}
                            </p>
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
                                {filteredAndSortedRFIs.filter(rfi => rfi.status === 'responded' || rfi.status === 'closed').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RFIInbox;