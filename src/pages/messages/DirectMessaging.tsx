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
        title: 'Grupo de Contratista y Encargados - 3 Especialistas MEP',
        type: 'group',
        participants: ['Ing. Carlos Mendoza (HVAC)', 'Ing. María González (Eléctrico)', 'Ing. Ana López (Plomería)', 'Supervisor General'],
        lastMessage: 'Revisión de coordinación semanal completada',
        lastMessageAt: '2025-05-23T14:30:00Z',
        lastMessageBy: 'Supervisor General',
        unreadCount: 0,
        isActive: false
    },
    {
        id: '2',
        title: 'Grupo General de Todos',
        type: 'group',
        participants: ['Todo el equipo MEP', 'Subcontratistas', 'Supervisores', 'Cliente'],
        lastMessage: 'Nueva directiva de seguridad publicada - revisar antes del viernes',
        lastMessageAt: '2025-05-23T13:45:00Z',
        lastMessageBy: 'Depto. Seguridad',
        unreadCount: 0,
        isActive: false
    },
    {
        id: '3',
        title: 'Grupo de Especialista HVAC',
        type: 'group',
        participants: ['Ing. Carlos Mendoza', 'Luis Vargas', 'Ana Reyes', 'Miguel Torres'],
        lastMessage: 'Las pruebas de balanceo están programadas para mañana',
        lastMessageAt: '2025-05-23T12:20:00Z',
        lastMessageBy: 'Ing. Carlos Mendoza',
        unreadCount: 0,
        isActive: false
    },
    {
        id: '4',
        title: 'Grupo de Especialista Eléctrico',
        type: 'group',
        participants: ['Ing. María González', 'Roberto Díaz', 'Carmen López', 'Jorge Ramírez'],
        lastMessage: 'Tableros principales listos para inspección',
        lastMessageAt: '2025-05-23T11:15:00Z',
        lastMessageBy: 'Ing. María González',
        unreadCount: 0,
        isActive: false
    },
    {
        id: '5',
        title: 'Grupo de Especialista Plomería',
        type: 'group',
        participants: ['Ing. Ana López', 'Alberto Silva', 'Rosa Medina', 'Felipe Castro'],
        lastMessage: 'Material adicional llegará el viernes',
        lastMessageAt: '2025-05-23T10:30:00Z',
        lastMessageBy: 'Alberto Silva',
        unreadCount: 0,
        isActive: false
    },
    {
        id: '6',
        type: 'direct',
        participants: ['Ing. Luis Torres'],
        lastMessage: '¿Podemos revisar las especificaciones HVAC mañana?',
        lastMessageAt: '2025-05-23T09:45:00Z',
        lastMessageBy: 'Ing. Luis Torres',
        unreadCount: 0,
        isActive: false
    },
    {
        id: '7',
        type: 'direct',
        participants: ['Ing. Sofia Ramírez'],
        lastMessage: 'Los certificados de rociadores están listos',
        lastMessageAt: '2025-05-23T09:30:00Z',
        lastMessageBy: 'Ing. Sofia Ramírez',
        unreadCount: 0,
        isActive: false
    },
    {
        id: '8',
        type: 'direct',
        participants: ['Carlos Mendoza'],
        lastMessage: 'Confirmación de entrega de equipos para el lunes',
        lastMessageAt: '2025-05-23T08:15:00Z',
        lastMessageBy: 'Carlos Mendoza',
        unreadCount: 0,
        isActive: false
    },
    {
        id: '9',
        type: 'direct',
        participants: ['Supervisor de Obra'],
        lastMessage: 'Reporte semanal enviado',
        lastMessageAt: '2025-05-22T17:20:00Z',
        lastMessageBy: 'Supervisor de Obra',
        unreadCount: 0,
        isActive: false
    },
    {
        id: '10',
        type: 'direct',
        participants: ['Cliente Técnico'],
        lastMessage: 'Aprobación de cambios recibida',
        lastMessageAt: '2025-05-22T16:45:00Z',
        lastMessageBy: 'Cliente Técnico',
        unreadCount: 0,
        isActive: false
    }
];

const mockMessages: Message[] = [
    {
        id: '1',
        senderId: 'supervisor',
        senderName: 'Supervisor General',
        content: 'Buenos días equipo, necesitamos revisar las interferencias detectadas en el piso 3 zona norte.',
        timestamp: '2025-05-23T08:30:00Z',
        hasAttachments: false,
        isRead: true
    },
    {
        id: '2',
        senderId: 'carlos-mendoza',
        senderName: 'Ing. Carlos Mendoza (HVAC)',
        content: 'Ya revisé los planos. El ducto principal de retorno está chocando con la tubería de agua helada.',
        timestamp: '2025-05-23T08:35:00Z',
        hasAttachments: false,
        isRead: true
    },
    {
        id: '3',
        senderId: 'maria-gonzalez',
        senderName: 'Ing. María González (Eléctrico)',
        content: 'Confirmo, las bandejas eléctricas también tienen conflicto en esa zona. Adjunto el clash detection.',
        timestamp: '2025-05-23T08:42:00Z',
        hasAttachments: true,
        isRead: true
    },
    {
        id: '4',
        senderId: 'ana-lopez',
        senderName: 'Ing. Ana López (Plomería)',
        content: 'Puedo subir la tubería de agua helada 20cm, eso liberaría espacio para el ducto.',
        timestamp: '2025-05-23T08:45:00Z',
        hasAttachments: false,
        isRead: true
    },
    {
        id: '5',
        senderId: 'carlos-mendoza',
        senderName: 'Ing. Carlos Mendoza (HVAC)',
        content: 'Perfecto Ana 👍 Con esos 20cm ya no hay interferencia. ¿Necesitas modificar el soporte?',
        timestamp: '2025-05-23T08:47:00Z',
        hasAttachments: false,
        isRead: true
    },
    {
        id: '6',
        senderId: 'ana-lopez',
        senderName: 'Ing. Ana López (Plomería)',
        content: 'Sí, pero es menor. Solo ajustar las abrazaderas. Lo tengo listo para mañana.',
        timestamp: '2025-05-23T08:50:00Z',
        hasAttachments: false,
        isRead: true
    },
    {
        id: '7',
        senderId: 'maria-gonzalez',
        senderName: 'Ing. María González (Eléctrico)',
        content: '¿Y las bandejas eléctricas? Necesito confirmar la altura final para coordinar los pases.',
        timestamp: '2025-05-23T08:52:00Z',
        hasAttachments: false,
        isRead: true
    },
    {
        id: '8',
        senderId: 'carlos-mendoza',
        senderName: 'Ing. Carlos Mendoza (HVAC)',
        content: 'Con el ducto a 2.80m y la tubería a 2.60m, tu bandeja queda bien a 2.40m ¿ok?',
        timestamp: '2025-05-23T08:55:00Z',
        hasAttachments: false,
        isRead: true
    },
    {
        id: '9',
        senderId: 'maria-gonzalez',
        senderName: 'Ing. María González (Eléctrico)',
        content: 'Perfecto, esa altura me funciona. Actualizo los planos hoy.',
        timestamp: '2025-05-23T08:57:00Z',
        hasAttachments: false,
        isRead: true
    },
    {
        id: '10',
        senderId: 'supervisor',
        senderName: 'Supervisor General',
        content: 'Excelente coordinación equipo! 🎯 Carlos, ¿puedes mandar el plano actualizado al RFI-2025-001?',
        timestamp: '2025-05-23T09:00:00Z',
        hasAttachments: false,
        isRead: true
    },
    {
        id: '11',
        senderId: 'carlos-mendoza',
        senderName: 'Ing. Carlos Mendoza (HVAC)',
        content: 'Claro, lo subo en 30 min junto con el isométrico actualizado.',
        timestamp: '2025-05-23T09:02:00Z',
        hasAttachments: false,
        isRead: true
    },
    {
        id: '12',
        senderId: 'supervisor',
        senderName: 'Supervisor General',
        content: 'Perfecto. Reunión de seguimiento mañana 10:00 AM para cerrar este tema. Confirmen asistencia 📅',
        timestamp: '2025-05-23T09:05:00Z',
        hasAttachments: false,
        isRead: false
    },
    {
        id: '13',
        senderId: 'ana-lopez',
        senderName: 'Ing. Ana López (Plomería)',
        content: 'Confirmado ✅',
        timestamp: '2025-05-23T09:06:00Z',
        hasAttachments: false,
        isRead: false
    },
    {
        id: '14',
        senderId: 'maria-gonzalez',
        senderName: 'Ing. María González (Eléctrico)',
        content: 'Confirmado ✅',
        timestamp: '2025-05-23T09:07:00Z',
        hasAttachments: false,
        isRead: false
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

            {/* Chat Interface */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" style={{ height: 'auto' }}>
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
                                                <span className="text-xs text-gray-500">
                                                    {formatTime(conversation.lastMessageAt)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 truncate">
                                                <span className="font-medium">{conversation.lastMessageBy}:</span> {conversation.lastMessage}
                                            </p>
                                            {conversation.type === 'group' && (
                                                <p className="text-xs text-blue-600 mt-1">
                                                    👥 {conversation.participants.length} participantes
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
                                                    {activeConversation.type === 'group' 
                                                        ? `${activeConversation.participants.length} participantes`
                                                        : 'Conversación privada'
                                                    }
                                                </p>
                                                {activeConversation.type === 'group' && (
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {activeConversation.participants.slice(0, 3).join(', ')}
                                                        {activeConversation.participants.length > 3 && ` y ${activeConversation.participants.length - 3} más`}
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