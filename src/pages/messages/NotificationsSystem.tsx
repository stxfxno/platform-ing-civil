// src/pages/messages/NotificationsSystem.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Bell,
    Search,
    Check,
    CheckCircle,
    AlertTriangle,
    FileQuestion,
    FileText,
    Calendar,
    ArrowLeft,
    Settings,
    X
} from 'lucide-react';

interface Notification {
    id: string;
    type: 'rfi_new' | 'rfi_response' | 'activity_due' | 'document_updated' | 'meeting_reminder' | 'system_alert';
    title: string;
    message: string;
    severity: 'info' | 'warning' | 'error' | 'success';
    isRead: boolean;
    createdAt: string;
    actionUrl?: string;
    relatedTo?: {
        type: string;
        id: string;
    };
}

const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'rfi_new',
        title: 'Nueva RFI recibida',
        message: 'RFI-2025-006 sobre instalaciones de telecomunicaciones en Piso 4',
        severity: 'info',
        isRead: false,
        createdAt: '2025-05-23T14:30:00Z',
        actionUrl: '/rfis/bandeja',
        relatedTo: { type: 'rfi', id: 'rfi-006' }
    },
    {
        id: '2',
        type: 'activity_due',
        title: 'Actividad próxima a vencer',
        message: 'Instalación de ductos HVAC - Zona B vence mañana',
        severity: 'warning',
        isRead: false,
        createdAt: '2025-05-23T12:15:00Z',
        actionUrl: '/programacion-semanal/seguimiento',
        relatedTo: { type: 'activity', id: 'act-007' }
    },
    {
        id: '3',
        type: 'rfi_response',
        title: 'RFI respondida',
        message: 'RFI-2025-001 sobre instalaciones eléctricas ha sido respondida',
        severity: 'success',
        isRead: true,
        createdAt: '2025-05-23T10:45:00Z',
        actionUrl: '/rfis/bandeja',
        relatedTo: { type: 'rfi', id: 'rfi-001' }
    },
    {
        id: '4',
        type: 'document_updated',
        title: 'Documento actualizado',
        message: 'Especificaciones técnicas HVAC v2.2 disponible para revisión',
        severity: 'info',
        isRead: false,
        createdAt: '2025-05-23T09:20:00Z',
        actionUrl: '/documentacion/especificaciones',
        relatedTo: { type: 'document', id: 'spec-hvac-001' }
    },
    {
        id: '5',
        type: 'meeting_reminder',
        title: 'Recordatorio de reunión',
        message: 'Coordinación MEP semanal en 1 hora - Sala de reuniones A',
        severity: 'warning',
        isRead: false,
        createdAt: '2025-05-23T08:00:00Z',
        actionUrl: '/mensajes/actas',
        relatedTo: { type: 'meeting', id: 'meet-003' }
    },
    {
        id: '6',
        type: 'system_alert',
        title: 'Mantenimiento programado',
        message: 'El sistema estará en mantenimiento el domingo de 2:00 AM a 6:00 AM',
        severity: 'info',
        isRead: true,
        createdAt: '2025-05-22T16:30:00Z'
    },
    {
        id: '7',
        type: 'activity_due',
        title: 'Actividad vencida',
        message: 'Pruebas hidráulicas - Piso 2 está vencida desde ayer',
        severity: 'error',
        isRead: false,
        createdAt: '2025-05-22T15:00:00Z',
        actionUrl: '/programacion-semanal/seguimiento',
        relatedTo: { type: 'activity', id: 'act-005' }
    }
];

const NotificationsSystem: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterSeverity, setFilterSeverity] = useState('all');
    const [showOnlyUnread, setShowOnlyUnread] = useState(false);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'rfi_new':
            case 'rfi_response':
                return <FileQuestion className="w-5 h-5 text-blue-600" />;
            case 'activity_due':
                return <Calendar className="w-5 h-5 text-orange-600" />;
            case 'document_updated':
                return <FileText className="w-5 h-5 text-green-600" />;
            case 'meeting_reminder':
                return <Calendar className="w-5 h-5 text-purple-600" />;
            case 'system_alert':
                return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
            default:
                return <Bell className="w-5 h-5 text-gray-600" />;
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'success': return 'border-l-green-500 bg-green-50';
            case 'warning': return 'border-l-yellow-500 bg-yellow-50';
            case 'error': return 'border-l-red-500 bg-red-50';
            case 'info': return 'border-l-blue-500 bg-blue-50';
            default: return 'border-l-gray-500 bg-gray-50';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'rfi_new': return 'Nueva RFI';
            case 'rfi_response': return 'RFI Respondida';
            case 'activity_due': return 'Actividad';
            case 'document_updated': return 'Documento';
            case 'meeting_reminder': return 'Reunión';
            case 'system_alert': return 'Sistema';
            default: return type;
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Hace unos minutos';
        if (diffInHours < 24) return `Hace ${diffInHours}h`;
        return date.toLocaleDateString();
    };

    const filteredNotifications = mockNotifications.filter(notification => {
        const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            notification.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || notification.type === filterType;
        const matchesSeverity = filterSeverity === 'all' || notification.severity === filterSeverity;
        const matchesRead = !showOnlyUnread || !notification.isRead;
        
        return matchesSearch && matchesType && matchesSeverity && matchesRead;
    });

    const unreadCount = mockNotifications.filter(n => !n.isRead).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        to="/mensajes"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Sistema de Notificaciones</h1>
                        <p className="text-gray-600">Alertas y notificaciones del proyecto</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                    {unreadCount > 0 && (
                        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Marcar todas como leídas</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <Bell className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{mockNotifications.length}</p>
                            <p className="text-sm text-gray-600">Total</p>
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
                                placeholder="Buscar notificaciones..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={showOnlyUnread}
                                onChange={(e) => setShowOnlyUnread(e.target.checked)}
                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-700">Solo no leídas</span>
                        </label>

                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todos los tipos</option>
                            <option value="rfi_new">Nueva RFI</option>
                            <option value="rfi_response">RFI Respondida</option>
                            <option value="activity_due">Actividad</option>
                            <option value="document_updated">Documento</option>
                            <option value="meeting_reminder">Reunión</option>
                            <option value="system_alert">Sistema</option>
                        </select>

                        <select
                            value={filterSeverity}
                            onChange={(e) => setFilterSeverity(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todas las prioridades</option>
                            <option value="error">Crítica</option>
                            <option value="warning">Advertencia</option>
                            <option value="success">Éxito</option>
                            <option value="info">Información</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`border-l-4 rounded-lg p-4 hover:shadow-sm transition-shadow ${getSeverityColor(notification.severity)} ${!notification.isRead ? 'ring-2 ring-blue-200' : ''}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                    {getTypeIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <h4 className="text-sm font-medium text-gray-900">
                                            {notification.title}
                                        </h4>
                                        {!notification.isRead && (
                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        )}
                                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                            {getTypeLabel(notification.type)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-2">
                                        {notification.message}
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-xs text-gray-500">
                                            {formatTime(notification.createdAt)}
                                        </span>
                                        {notification.relatedTo && (
                                            <span className="text-xs text-gray-500">
                                                ID: {notification.relatedTo.id}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {notification.actionUrl && (
                                    <Link
                                        to={notification.actionUrl}
                                        className="text-blue-600 hover:text-blue-900 text-sm px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                                    >
                                        Ver
                                    </Link>
                                )}
                                {!notification.isRead && (
                                    <button className="text-green-600 hover:text-green-900 p-1 rounded transition-colors">
                                        <Check className="w-4 h-4" />
                                    </button>
                                )}
                                <button className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredNotifications.length === 0 && (
                <div className="text-center py-12">
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No hay notificaciones con los filtros aplicados</p>
                </div>
            )}
        </div>
    );
};

export default NotificationsSystem;