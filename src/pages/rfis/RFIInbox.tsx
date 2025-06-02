// src/pages/rfis/RFIInbox.tsx
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Search,
    Filter,
    SortAsc,
    FileQuestion,
    Calendar,
    User,
    Clock,
    AlertTriangle,
    CheckCircle,
    Eye,
    Edit,
    MessageSquare,
    Paperclip,
    Trash2,
    Reply,
    Send,
    X,
    Check,
    EyeOff,
    Globe
} from 'lucide-react';
import type { RFI } from '../../types/rfi';
import { MEP_DISCIPLINES } from '../../types/common';
import rfisData from '../../data/rfis.json';

interface RFIFilters {
    status: string[];
    priority: string[];
    discipline: string[];
    assignedTo: string[];
    searchTerm: string;
}

interface ReplyModalData {
    isOpen: boolean;
    rfi: RFI | null;
    response: string;
    responseStatus: string;
    followUpPriority: string;
    notifyOthers: boolean;
    attachFiles: boolean;
    isSubmitting: boolean;
    showSuccess: boolean;
}

interface ViewModalData {
    isOpen: boolean;
    rfi: RFI | null;
}

interface EditModalData {
    isOpen: boolean;
    rfi: RFI | null;
    formData: {
        title: string;
        description: string;
        priority: string;
        dueDate: string;
        privacy: string;
        location: string;
        category: string;
    };
    isSubmitting: boolean;
}

const RFIInbox: React.FC = () => {
    const navigate = useNavigate();
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
    const [replyModal, setReplyModal] = useState<ReplyModalData>({
        isOpen: false,
        rfi: null,
        response: '',
        responseStatus: 'responded',
        followUpPriority: 'none',
        notifyOthers: false,
        attachFiles: false,
        isSubmitting: false,
        showSuccess: false
    });
    const [viewModal, setViewModal] = useState<ViewModalData>({
        isOpen: false,
        rfi: null
    });
    const [editModal, setEditModal] = useState<EditModalData>({
        isOpen: false,
        rfi: null,
        formData: {
            title: '',
            description: '',
            priority: '',
            dueDate: '',
            privacy: '',
            location: '',
            category: ''
        },
        isSubmitting: false
    });
    const [allRFIs, setAllRFIs] = useState<RFI[]>([]);

    // Cargar RFIs del localStorage y combinar con las mock
    React.useEffect(() => {
        try {
            const storedRFIs = JSON.parse(localStorage.getItem('civil_eng_rfis') || '[]');
            const mockRFIs: RFI[] = rfisData.rfis as RFI[];

            // Combinar RFIs almacenadas localmente con las mock
            const combinedRFIs = [...storedRFIs, ...mockRFIs];
            setAllRFIs(combinedRFIs);

            console.log('RFIs cargadas:', combinedRFIs.length);
        } catch (error) {
            console.error('Error al cargar RFIs del localStorage:', error);
            setAllRFIs(rfisData.rfis as RFI[]);
        }
    }, []);

    const rfis: RFI[] = allRFIs;
    const users = rfisData.users;

    // Status configuration
    const statusConfig = {
        open: { label: 'Abierta', color: 'bg-blue-100 text-blue-800' },
        in_review: { label: 'En Revisión', color: 'bg-yellow-100 text-yellow-800' },
        responded: { label: 'Respondida', color: 'bg-green-100 text-green-800' },
        closed: { label: 'Cerrada', color: 'bg-gray-100 text-gray-800' }
    };

    const priorityConfig = {
        urgente: { label: 'Urgente', color: 'bg-red-100 text-red-800' },
        alta: { label: 'Alta', color: 'bg-orange-100 text-orange-800' },
        media: { label: 'Media', color: 'bg-yellow-100 text-yellow-800' },
        baja: { label: 'Baja', color: 'bg-green-100 text-green-800' },
        // Compatibilidad con prioridades anteriores
        critical: { label: 'Crítica', color: 'bg-red-100 text-red-800' },
        high: { label: 'Alta', color: 'bg-orange-100 text-orange-800' },
        medium: { label: 'Media', color: 'bg-yellow-100 text-yellow-800' },
        low: { label: 'Baja', color: 'bg-green-100 text-green-800' }
    };

    // Filter and sort RFIs
    const filteredAndSortedRFIs = useMemo(() => {
        const filtered = rfis.filter(rfi => {
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
            let aValue: string | number | undefined = a[sortField as keyof RFI] as string | number | undefined;
            let bValue: string | number | undefined = b[sortField as keyof RFI] as string | number | undefined;

            if (sortField === 'priority') {
                const priorityOrder = {
                    urgente: 4, critical: 4,
                    alta: 3, high: 3,
                    media: 2, medium: 2,
                    baja: 1, low: 1
                };
                aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
                bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
            }

            // Provide fallback values if undefined
            const aComp = aValue !== undefined ? aValue : '';
            const bComp = bValue !== undefined ? bValue : '';

            if (aComp < bComp) return sortDirection === 'asc' ? -1 : 1;
            if (aComp > bComp) return sortDirection === 'asc' ? 1 : -1;
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

    const handleDeleteRFI = (rfiId: string) => {
        const rfi = rfis.find(r => r.id === rfiId);
        if (confirm(`¿Está seguro de que desea eliminar la RFI "${rfi?.rfiNumber}"? Esta acción no se puede deshacer.`)) {
            try {
                // Eliminar del localStorage
                const storedRFIs = JSON.parse(localStorage.getItem('civil_eng_rfis') || '[]');
                const updatedStoredRFIs = storedRFIs.filter((r: any) => r.id !== rfiId);
                localStorage.setItem('civil_eng_rfis', JSON.stringify(updatedStoredRFIs));

                // Actualizar estado local
                setAllRFIs(prev => prev.filter(r => r.id !== rfiId));

                console.log('RFI eliminada:', rfiId);
                alert('RFI eliminada correctamente');
            } catch (error) {
                console.error('Error al eliminar RFI:', error);
                alert('Error al eliminar la RFI');
            }
        }
    };

    const handleViewRFI = (rfi: RFI) => {
        setViewModal({
            isOpen: true,
            rfi: rfi
        });
    };

    const handleEditRFI = (rfi: RFI) => {
        console.log('Editando RFI:', rfi);
        setEditModal({
            isOpen: true,
            rfi: rfi,
            formData: {
                title: rfi.title || '',
                description: rfi.description || '',
                priority: rfi.priority || 'media',
                dueDate: rfi.dueDate || '',
                privacy: (rfi as any).privacy || 'publico',
                location: rfi.location || '',
                category: rfi.category || ''
            },
            isSubmitting: false
        });
    };

    const handleReplyRFI = (rfi: RFI) => {
        setReplyModal({
            isOpen: true,
            rfi: rfi,
            response: '',
            responseStatus: 'responded',
            followUpPriority: 'none',
            notifyOthers: false,
            attachFiles: false,
            isSubmitting: false,
            showSuccess: false
        });
    };

    const handleSubmitEdit = async () => {
        if (!editModal.formData.title.trim() || !editModal.formData.description.trim()) {
            alert('El título y la descripción son obligatorios');
            return;
        }

        setEditModal(prev => ({ ...prev, isSubmitting: true }));

        try {
            const updatedRFI: RFI = {
                ...editModal.rfi!,
                title: editModal.formData.title.trim(),
                description: editModal.formData.description.trim(),
                priority: editModal.formData.priority as RFI['priority'],
                dueDate: editModal.formData.dueDate || undefined,
                location: editModal.formData.location.trim() || undefined,
                category: editModal.formData.category || undefined,
                updatedAt: new Date().toISOString(),
                // Agregar el campo privacy como propiedad extendida
                ...({ privacy: editModal.formData.privacy } as any)
            };

            // Actualizar en localStorage si es una RFI guardada localmente
            const storedRFIs = JSON.parse(localStorage.getItem('civil_eng_rfis') || '[]');
            const rfiIndex = storedRFIs.findIndex((r: any) => r.id === editModal.rfi!.id);
            if (rfiIndex !== -1) {
                storedRFIs[rfiIndex] = updatedRFI;
                localStorage.setItem('civil_eng_rfis', JSON.stringify(storedRFIs));
                console.log('RFI actualizada en localStorage:', updatedRFI);
            }

            // Actualizar estado local
            setAllRFIs(prev => prev.map(rfi =>
                rfi.id === editModal.rfi!.id ? updatedRFI : rfi
            ));

            // Simular delay de red y cerrar modal
            setTimeout(() => {
                setEditModal({
                    isOpen: false,
                    rfi: null,
                    formData: {
                        title: '',
                        description: '',
                        priority: '',
                        dueDate: '',
                        privacy: 'publico',
                        location: '',
                        category: ''
                    },
                    isSubmitting: false
                });
                alert('RFI actualizada correctamente');
            }, 1000);
        } catch (error) {
            console.error('Error al actualizar RFI:', error);
            setEditModal(prev => ({ ...prev, isSubmitting: false }));
            alert('Error al actualizar la RFI');
        }
    };

    const handleSubmitReply = async () => {
        if (!replyModal.response.trim()) {
            alert('Por favor, escriba una respuesta');
            return;
        }

        if (replyModal.response.trim().length < 10) {
            alert('La respuesta debe tener al menos 10 caracteres');
            return;
        }

        setReplyModal(prev => ({ ...prev, isSubmitting: true }));

        // Simular envío y actualizar RFI
        try {
            const updatedRFI: RFI = {
                ...replyModal.rfi!,
                status: replyModal.responseStatus as RFI['status'],
                response: replyModal.response,
                responseDate: new Date().toISOString(),
                responseBy: 'user-current',
                updatedAt: new Date().toISOString(),
            };

            // Actualizar en localStorage si es una RFI guardada localmente
            const storedRFIs = JSON.parse(localStorage.getItem('civil_eng_rfis') || '[]');
            const rfiIndex = storedRFIs.findIndex((r: any) => r.id === replyModal.rfi!.id);
            if (rfiIndex !== -1) {
                storedRFIs[rfiIndex] = updatedRFI;
                localStorage.setItem('civil_eng_rfis', JSON.stringify(storedRFIs));
            }

            // Actualizar estado local
            setAllRFIs(prev => prev.map(rfi =>
                rfi.id === replyModal.rfi!.id ? updatedRFI : rfi
            ));

            setTimeout(() => {
                setReplyModal(prev => ({
                    ...prev,
                    isSubmitting: false,
                    showSuccess: true
                }));

                setTimeout(() => {
                    setReplyModal({
                        isOpen: false,
                        rfi: null,
                        response: '',
                        responseStatus: 'responded',
                        followUpPriority: 'none',
                        notifyOthers: false,
                        attachFiles: false,
                        isSubmitting: false,
                        showSuccess: false
                    });
                }, 2000);
            }, 1500);
        } catch (error) {
            console.error('Error al responder RFI:', error);
            setReplyModal(prev => ({ ...prev, isSubmitting: false }));
            alert('Error al enviar la respuesta');
        }
    };

    const closeReplyModal = () => {
        if (replyModal.isSubmitting) return;

        setReplyModal({
            isOpen: false,
            rfi: null,
            response: '',
            responseStatus: 'responded',
            followUpPriority: 'none',
            notifyOthers: false,
            attachFiles: false,
            isSubmitting: false,
            showSuccess: false
        });
    };

    const closeViewModal = () => {
        setViewModal({
            isOpen: false,
            rfi: null
        });
    };

    const closeEditModal = () => {
        if (editModal.isSubmitting) return;

        setEditModal({
            isOpen: false,
            rfi: null,
            formData: {
                title: '',
                description: '',
                priority: '',
                dueDate: '',
                privacy: '',
                location: '',
                category: ''
            },
            isSubmitting: false
        });
    };

    const handleReplyModalChange = (field: string, value: string | boolean) => {
        setReplyModal(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleEditModalChange = (field: string, value: string) => {
        setEditModal(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                [field]: value
            }
        }));
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

    const getPrivacyIcon = (privacy: string) => {
        return privacy === 'privado' ? <EyeOff className="w-4 h-4" /> : <Globe className="w-4 h-4" />;
    };

    const getPrivacyColor = (privacy: string) => {
        return privacy === 'privado' ? 'text-yellow-600 bg-yellow-50' : 'text-green-600 bg-green-50';
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
                        className={`px-4 py-2 border rounded-lg transition-colors flex items-center space-x-2 ${showFilters ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
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
                                    Visibilidad
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
                                const privacy = (rfi as any).privacy || 'publico';

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
                                                    {rfi.attachments && rfi.attachments.length > 0 && (
                                                        <div className="flex items-center text-xs text-gray-500">
                                                            <Paperclip className="w-3 h-3 mr-1" />
                                                            {rfi.attachments.length}
                                                        </div>
                                                    )}
                                                    {rfi.comments && rfi.comments.length > 0 && (
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
                                            <div className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${getPrivacyColor(privacy)}`}>
                                                {getPrivacyIcon(privacy)}
                                                <span>{privacy === 'privado' ? 'Privado' : 'Público'}</span>
                                            </div>
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
                                                <button
                                                    onClick={() => handleViewRFI(rfi)}
                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                                                    title="Ver"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleReplyRFI(rfi)}
                                                    className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                                                    title="Responder"
                                                >
                                                    <Reply className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEditRFI(rfi)}
                                                    className="text-gray-600 hover:text-gray-900 p-1 rounded transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteRFI(rfi.id)}
                                                    className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
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
                                    <h2 className="text-lg font-semibold text-gray-900">Detalles de RFI</h2>
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
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityConfig[viewModal.rfi.priority as keyof typeof priorityConfig]?.color}`}>
                                                    {priorityConfig[viewModal.rfi.priority as keyof typeof priorityConfig]?.label}
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

                            {/* Tags */}
                            {viewModal.rfi.tags && viewModal.rfi.tags.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Etiquetas</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {viewModal.rfi.tags.map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                                <button
                                    onClick={() => {
                                        closeViewModal();
                                        handleEditRFI(viewModal.rfi!);
                                    }}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    <span>Editar</span>
                                </button>
                                <button
                                    onClick={() => {
                                        closeViewModal();
                                        handleReplyRFI(viewModal.rfi!);
                                    }}
                                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                                >
                                    <Reply className="w-4 h-4" />
                                    <span>Responder</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal.isOpen && editModal.rfi && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <Edit className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Editar RFI</h2>
                                    <p className="text-sm text-gray-600">{editModal.rfi.rfiNumber}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeEditModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                disabled={editModal.isSubmitting}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                {/* Título */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Título *
                                    </label>
                                    <input
                                        type="text"
                                        value={editModal.formData.title}
                                        onChange={(e) => handleEditModalChange('title', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Título de la RFI"
                                        disabled={editModal.isSubmitting}
                                    />
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Descripción *
                                    </label>
                                    <textarea
                                        value={editModal.formData.description}
                                        onChange={(e) => handleEditModalChange('description', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Descripción detallada de la solicitud"
                                        disabled={editModal.isSubmitting}
                                    />
                                </div>

                                {/* Prioridad y Visibilidad */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prioridad
                                        </label>
                                        <select
                                            value={editModal.formData.priority}
                                            onChange={(e) => handleEditModalChange('priority', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            disabled={editModal.isSubmitting}
                                        >
                                            <option value="">Seleccionar prioridad</option>
                                            <option value="baja">Baja</option>
                                            <option value="media">Media</option>
                                            <option value="alta">Alta</option>
                                            <option value="urgente">Urgente</option>
                                            <option value="low">Baja (Legacy)</option>
                                            <option value="medium">Media (Legacy)</option>
                                            <option value="high">Alta (Legacy)</option>
                                            <option value="critical">Crítica (Legacy)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Visibilidad
                                        </label>
                                        <select
                                            value={editModal.formData.privacy}
                                            onChange={(e) => handleEditModalChange('privacy', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            disabled={editModal.isSubmitting}
                                        >
                                            <option value="publico">Público</option>
                                            <option value="privado">Privado</option>
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {editModal.formData.privacy === 'publico'
                                                ? 'Visible para todos los miembros del proyecto'
                                                : 'Solo visible para el responsable asignado y el solicitante'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Fecha límite y Categoría */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Fecha límite
                                        </label>
                                        <input
                                            type="date"
                                            value={editModal.formData.dueDate}
                                            onChange={(e) => handleEditModalChange('dueDate', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            min={new Date().toISOString().split('T')[0]}
                                            disabled={editModal.isSubmitting}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Categoría
                                        </label>
                                        <select
                                            value={editModal.formData.category}
                                            onChange={(e) => handleEditModalChange('category', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            disabled={editModal.isSubmitting}
                                        >
                                            <option value="">Seleccionar categoría</option>
                                            <option value="Clarificación Técnica">Clarificación Técnica</option>
                                            <option value="Especificaciones">Especificaciones</option>
                                            <option value="Materiales">Materiales</option>
                                            <option value="Instalación">Instalación</option>
                                            <option value="Coordinación">Coordinación</option>
                                            <option value="Normativa">Normativa</option>
                                            <option value="Cambio de Diseño">Cambio de Diseño</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Ubicación */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ubicación
                                    </label>
                                    <input
                                        type="text"
                                        value={editModal.formData.location}
                                        onChange={(e) => handleEditModalChange('location', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Ej: Piso 3, Área A, Zona MEP"
                                        disabled={editModal.isSubmitting}
                                    />
                                </div>

                                {/* Información adicional */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-blue-900 mb-2">Información de la RFI</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
                                        <div>
                                            <span className="font-medium">Número:</span> {editModal.rfi.rfiNumber}
                                        </div>
                                        <div>
                                            <span className="font-medium">Estado:</span> {statusConfig[editModal.rfi.status as keyof typeof statusConfig]?.label || editModal.rfi.status}
                                        </div>
                                        <div>
                                            <span className="font-medium">Solicitado por:</span> {getUserName(editModal.rfi.requestedBy)}
                                        </div>
                                        <div>
                                            <span className="font-medium">Asignado a:</span> {getUserName(editModal.rfi.assignedTo)}
                                        </div>
                                        <div>
                                            <span className="font-medium">Disciplina:</span> {MEP_DISCIPLINES[editModal.rfi.discipline as keyof typeof MEP_DISCIPLINES]?.label || editModal.rfi.discipline}
                                        </div>
                                        <div>
                                            <span className="font-medium">Creado:</span> {formatDate(editModal.rfi.createdAt)}
                                        </div>
                                    </div>
                                    <div className="mt-3 text-xs text-blue-700">
                                        * Solo se pueden editar ciertos campos. Los campos críticos como asignación y disciplina requieren permisos adicionales.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={closeEditModal}
                                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    disabled={editModal.isSubmitting}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSubmitEdit}
                                    disabled={editModal.isSubmitting || !editModal.formData.title.trim() || !editModal.formData.description.trim()}
                                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                                >
                                    {editModal.isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                                            <span>Guardando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>Guardar Cambios</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reply Modal */}
            {replyModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {replyModal.showSuccess ? (
                            // Success State
                            <div className="p-8 text-center">
                                <div className="animate-bounce mb-6">
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                                        <Check className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje enviado correctamente!</h2>
                                <p className="text-gray-600">
                                    La respuesta a la RFI {replyModal.rfi?.rfiNumber} ha sido enviada exitosamente.
                                </p>
                            </div>
                        ) : (
                            // Reply Form
                            <>
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Reply className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">Responder RFI</h2>
                                            <p className="text-sm text-gray-600">{replyModal.rfi?.rfiNumber}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeReplyModal}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        disabled={replyModal.isSubmitting}
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="p-6 space-y-6">
                                    {/* RFI Info */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-medium text-gray-900 mb-3">Información de la RFI</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div><span className="font-medium">Título:</span> {replyModal.rfi?.title}</div>
                                                <div><span className="font-medium">Número:</span> {replyModal.rfi?.rfiNumber}</div>
                                                <div><span className="font-medium">Solicitado por:</span> {getUserName(replyModal.rfi?.requestedBy || '')}</div>
                                                <div><span className="font-medium">Fecha:</span> {formatDate(replyModal.rfi?.createdAt || '')}</div>
                                                <div><span className="font-medium">Prioridad:</span>
                                                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${priorityConfig[replyModal.rfi?.priority as keyof typeof priorityConfig]?.color || 'bg-gray-100 text-gray-800'}`}>
                                                        {priorityConfig[replyModal.rfi?.priority as keyof typeof priorityConfig]?.label || replyModal.rfi?.priority}
                                                    </span>
                                                </div>
                                                <div><span className="font-medium">Ubicación:</span> {replyModal.rfi?.location || 'No especificada'}</div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <span className="font-medium text-sm">Descripción:</span>
                                            <p className="text-sm text-gray-700 mt-1 bg-white p-3 rounded border">{replyModal.rfi?.description}</p>
                                        </div>
                                    </div>

                                    {/* Response Form */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Escriba su respuesta *
                                        </label>
                                        <textarea
                                            value={replyModal.response}
                                            onChange={(e) => handleReplyModalChange('response', e.target.value)}
                                            rows={8}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                                            placeholder="Proporcione una respuesta detallada a la consulta..."
                                            disabled={replyModal.isSubmitting}
                                        />
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-xs text-gray-500">
                                                Mínimo 10 caracteres. Se enviará automáticamente por correo al solicitante.
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {replyModal.response.length} caracteres
                                            </p>
                                        </div>
                                    </div>

                                    {/* Response Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Estado de respuesta
                                            </label>
                                            <select
                                                value={replyModal.responseStatus}
                                                onChange={(e) => handleReplyModalChange('responseStatus', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                disabled={replyModal.isSubmitting}
                                            >
                                                <option value="responded">Respondida</option>
                                                <option value="needs_clarification">Necesita aclaración</option>
                                                <option value="closed">Cerrada</option>
                                                <option value="in_review">En revisión</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Prioridad de seguimiento
                                            </label>
                                            <select
                                                value={replyModal.followUpPriority}
                                                onChange={(e) => handleReplyModalChange('followUpPriority', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                disabled={replyModal.isSubmitting}
                                            >
                                                <option value="none">Sin seguimiento</option>
                                                <option value="low">Seguimiento bajo</option>
                                                <option value="medium">Seguimiento medio</option>
                                                <option value="high">Seguimiento alto</option>
                                                <option value="urgent">Seguimiento urgente</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Additional Options */}
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="notify-others"
                                                checked={replyModal.notifyOthers}
                                                onChange={(e) => handleReplyModalChange('notifyOthers', e.target.checked)}
                                                className="h-4 w-4 text-primary-600 rounded"
                                                disabled={replyModal.isSubmitting}
                                            />
                                            <label htmlFor="notify-others" className="ml-2 text-sm text-gray-700">
                                                Notificar a otros miembros del equipo
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="attach-files"
                                                checked={replyModal.attachFiles}
                                                onChange={(e) => handleReplyModalChange('attachFiles', e.target.checked)}
                                                className="h-4 w-4 text-primary-600 rounded"
                                                disabled={replyModal.isSubmitting}
                                            />
                                            <label htmlFor="attach-files" className="ml-2 text-sm text-gray-700">
                                                Incluir archivos adjuntos en la respuesta
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="schedule-meeting"
                                                className="h-4 w-4 text-primary-600 rounded"
                                                disabled={replyModal.isSubmitting}
                                            />
                                            <label htmlFor="schedule-meeting" className="ml-2 text-sm text-gray-700">
                                                Programar reunión de seguimiento
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                                    <div className="text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span>La respuesta se enviará por correo electrónico automáticamente</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={closeReplyModal}
                                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                            disabled={replyModal.isSubmitting}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSubmitReply}
                                            disabled={replyModal.isSubmitting || !replyModal.response.trim() || replyModal.response.trim().length < 10}
                                            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
                                        >
                                            {replyModal.isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                                                    <span>Enviando...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    <span>Enviar Respuesta</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RFIInbox;