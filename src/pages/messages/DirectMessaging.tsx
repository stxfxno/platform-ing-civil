// src/pages/messages/DirectMessaging.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MessageCircle,
    Search,
    Send,
    Paperclip,
    Users,
    ArrowLeft,
    Plus,
    MoreVertical,
    Hash,
    User
} from 'lucide-react';

interface Conversation {
    id: string;
    title?: string;
    type: 'direct' | 'group' | 'project';
    participants: string[];
    lastMessage: string;
    lastMessageAt: string;
    lastMessageBy: string;
    unreadCount: number;
    isActive: boolean;
    relatedTo?: {
        type: 'rfi' | 'activity' | 'document';
        id: string;
        title: string;
    };
}

interface Message {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
    hasAttachments: boolean;
    isRead: boolean;
}

const mockConversations: Conversation[] = [
    {
        id: '1',
        title: 'RFI-2025-001 - Instalaciones Eléctricas',
        type: 'project',
        participants: ['Ing. María González', 'Cliente', 'Supervisor'],
        lastMessage: 'La respuesta ha sido enviada, favor revisar',
        lastMessageAt: '2025-05-23T14:30:00Z',
        lastMessageBy: 'Ing. María González',
        unreadCount: 2,
        isActive: true,
        relatedTo: {
            type: 'rfi',
            id: 'RFI-2025-001',
            title: 'Clarificación instalaciones eléctricas Piso 3'
        }
    },
    {
        id: '2',
        type: 'direct',
        participants: ['Ing. Luis Torres'],
        lastMessage: '¿Podemos revisar las especificaciones HVAC mañana?',
        lastMessageAt: '2025-05-23T13:45:00Z',
        lastMessageBy: 'Ing. Luis Torres',
        unreadCount: 1,
        isActive: false
    },
    {
        id: '3',
        title: 'Equipo Plomería',
        type: 'group',
        participants: ['Ing. Ana López', 'Alberto Silva', 'Rosa Medina', 'Felipe Castro'],
        lastMessage: 'Las pruebas hidráulicas están programadas para mañana',
        lastMessageAt: '2025-05-23T12:20:00Z',
        lastMessageBy: 'Ing. Ana López',
        unreadCount: 0,
        isActive: false
    },
    {
        id: '4',
        title: 'Actividad: Instalación Ductos HVAC',
        type: 'project',
        participants: ['Carlos Mendoza', 'Luis Vargas', 'Supervisor'],
        lastMessage: 'Material adicional llegará el viernes',
        lastMessageAt: '2025-05-23T11:15:00Z',
        lastMessageBy: 'Carlos Mendoza',
        unreadCount: 3,
        isActive: false,
        relatedTo: {
            type: 'activity',
            id: 'ACT-001',
            title: 'Instalación ductos HVAC - Área A'
        }
    },
    {
        id: '5',
        type: 'direct',
        participants: ['Ing. Sofia Ramírez'],
        lastMessage: 'Los certificados de rociadores están listos',
        lastMessageAt: '2025-05-23T10:30:00Z',
        lastMessageBy: 'Ing. Sofia Ramírez',
        unreadCount: 0,
        isActive: false
    }
];

const mockMessages: Message[] = [
    {
        id: '1',
        senderId: 'maria-gonzalez',
        senderName: 'Ing. María González',
        content: 'La respuesta ha sido enviada, favor revisar los detalles en el documento adjunto.',
        timestamp: '2025-05-23T14:30:00Z',
        hasAttachments: true,
        isRead: false
    },
    {
        id: '2',
        senderId: 'supervisor',
        senderName: 'Supervisor',
        content: 'Perfecto, revisaré en breve y les confirmo.',
        timestamp: '2025-05-23T14:25:00Z',
        hasAttachments: false,
        isRead: false
    },
    {
        id: '3',
        senderId: 'cliente',
        senderName: 'Cliente',
        content: '¿Cuándo podemos programar la reunión de seguimiento?',
        timestamp: '2025-05-23T14:20:00Z',
        hasAttachments: false,
        isRead: true
    },
    {
        id: '4',
        senderId: 'maria-gonzalez',
        senderName: 'Ing. María González',
        content: 'Hola equipo, he actualizado la RFI con las correcciones solicitadas.',
        timestamp: '2025-05-23T14:15:00Z',
        hasAttachments: false,
        isRead: true
    }
];

const DirectMessaging: React.FC = () => {
    const [selectedConversation, setSelectedConversation] = useState<string>('1');
    const [searchTerm, setSearchTerm] = useState('');
    const [newMessage, setNewMessage] = useState('');

    const getConversationIcon = (conversation: Conversation) => {
        if (conversation.type === 'direct') {
            return <User className="w-8 h-8 text-blue-600" />;
        } else if (conversation.type === 'group') {
            return <Users className="w-8 h-8 text-green-600" />;
        } else {
            return <Hash className="w-8 h-8 text-purple-600" />;
        }
    };

    const getConversationTitle = (conversation: Conversation) => {
        if (conversation.title) {
            return conversation.title;
        } else if (conversation.type === 'direct') {
            return conversation.participants[0];
        } else {
            return `Grupo con ${conversation.participants.length} miembros`;
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Ahora';
        if (diffInHours < 24) return `${diffInHours}h`;
        return date.toLocaleDateString();
    };

    const formatMessageTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    };

    const filteredConversations = mockConversations.filter(conv =>
        getConversationTitle(conv).toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.participants.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const activeConversation = mockConversations.find(c => c.id === selectedConversation);
    const totalUnread = mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

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
                        <h1 className="text-2xl font-bold text-gray-900">Mensajería Directa</h1>
                        <p className="text-gray-600">Comunicación contextualizada del proyecto</p>
                    </div>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Nueva Conversación</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{mockConversations.length}</p>
                            <p className="text-sm text-gray-600">Conversaciones</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-yellow-500 p-2 rounded-lg">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">{totalUnread}</p>
                            <p className="text-sm text-gray-600">Sin Leer</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-500 p-2 rounded-lg">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">
                                {mockConversations.filter(c => c.type === 'group').length}
                            </p>
                            <p className="text-sm text-gray-600">Grupos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-purple-500 p-2 rounded-lg">
                            <Hash className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">
                                {mockConversations.filter(c => c.relatedTo).length}
                            </p>
                            <p className="text-sm text-gray-600">Vinculadas</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Interface */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
                <div className="flex h-full">
                    {/* Conversations List */}
                    <div className="w-1/3 border-r border-gray-200 flex flex-col">
                        {/* Search */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar conversaciones..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>

                        {/* Conversations */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredConversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    onClick={() => setSelectedConversation(conversation.id)}
                                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                                        selectedConversation === conversation.id ? 'bg-primary-50 border-primary-200' : ''
                                    }`}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            {getConversationIcon(conversation)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                                    {getConversationTitle(conversation)}
                                                </h4>
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-xs text-gray-500">
                                                        {formatTime(conversation.lastMessageAt)}
                                                    </span>
                                                    {conversation.unreadCount > 0 && (
                                                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                                                            {conversation.unreadCount}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 truncate">
                                                <span className="font-medium">{conversation.lastMessageBy}:</span> {conversation.lastMessage}
                                            </p>
                                            {conversation.relatedTo && (
                                                <p className="text-xs text-blue-600 mt-1">
                                                    📎 {conversation.relatedTo.type.toUpperCase()}: {conversation.relatedTo.id}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col">
                        {activeConversation ? (
                            <>
                                {/* Chat Header */}
                                <div className="p-4 border-b border-gray-200 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {getConversationIcon(activeConversation)}
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {getConversationTitle(activeConversation)}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {activeConversation.participants.length} participante{activeConversation.participants.length > 1 ? 's' : ''}
                                                </p>
                                                {activeConversation.relatedTo && (
                                                    <p className="text-xs text-blue-600">
                                                        Vinculado a: {activeConversation.relatedTo.title}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {mockMessages.map((message) => (
                                        <div key={message.id} className="flex space-x-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                                    <User className="w-4 h-4 text-gray-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {message.senderName}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {formatMessageTime(message.timestamp)}
                                                    </span>
                                                    {!message.isRead && (
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    )}
                                                </div>
                                                <div className="bg-gray-100 rounded-lg p-3">
                                                    <p className="text-sm text-gray-900">{message.content}</p>
                                                    {message.hasAttachments && (
                                                        <div className="flex items-center space-x-1 mt-2 text-blue-600">
                                                            <Paperclip className="w-4 h-4" />
                                                            <span className="text-xs">Archivo adjunto</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <div className="p-4 border-t border-gray-200">
                                    <div className="flex items-center space-x-2">
                                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                            <Paperclip className="w-5 h-5" />
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Escribe un mensaje..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                        <button className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors">
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Selecciona una conversación para comenzar</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectMessaging;