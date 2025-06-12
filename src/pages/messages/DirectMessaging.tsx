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
    Hash,
    User,
    X,
    CheckCircle
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
    conversationId: string;
}

interface Contact {
    id: string;
    name: string;
    role: string;
    department: string;
    isOnline: boolean;
}

const mockContacts: Contact[] = [
    { id: 'carlos-mendoza', name: 'Ing. Carlos Mendoza', role: 'Especialista HVAC', department: 'MEP', isOnline: true },
    { id: 'maria-gonzalez', name: 'Ing. María González', role: 'Especialista Eléctrico', department: 'MEP', isOnline: true },
    { id: 'ana-lopez', name: 'Ing. Ana López', role: 'Especialista Plomería', department: 'MEP', isOnline: false },
    { id: 'luis-torres', name: 'Ing. Luis Torres', role: 'Supervisor Técnico', department: 'Supervisión', isOnline: true },
    { id: 'sofia-ramirez', name: 'Ing. Sofia Ramírez', role: 'Especialista Fire Protection', department: 'Seguridad', isOnline: false },
    { id: 'roberto-medina', name: 'Ing. Roberto Medina', role: 'Coordinador de Seguridad', department: 'Seguridad', isOnline: true },
    { id: 'patricia-silva', name: 'Ing. Patricia Silva', role: 'Arquitecta', department: 'Diseño', isOnline: true },
    { id: 'supervisor-general', name: 'Supervisor General', role: 'Supervisor de Obra', department: 'Supervisión', isOnline: true },
    { id: 'cliente-tecnico', name: 'Cliente Técnico', role: 'Representante del Cliente', department: 'Cliente', isOnline: false },
    { id: 'supervisor-obra', name: 'Supervisor de Obra', role: 'Jefe de Obra', department: 'Supervisión', isOnline: true }
];

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

const mockMessages: { [conversationId: string]: Message[] } = {
    '1': [
        {
            id: '1-1',
            senderId: 'supervisor-general',
            senderName: 'Supervisor General',
            content: 'Buenos días equipo, necesitamos revisar las interferencias detectadas en el piso 3 zona norte.',
            timestamp: '2025-05-23T08:30:00Z',
            hasAttachments: false,
            isRead: true,
            conversationId: '1'
        },
        {
            id: '1-2',
            senderId: 'carlos-mendoza',
            senderName: 'Ing. Carlos Mendoza (HVAC)',
            content: 'Ya revisé los planos. El ducto principal de retorno está chocando con la tubería de agua helada.',
            timestamp: '2025-05-23T08:35:00Z',
            hasAttachments: false,
            isRead: true,
            conversationId: '1'
        },
        {
            id: '1-3',
            senderId: 'maria-gonzalez',
            senderName: 'Ing. María González (Eléctrico)',
            content: 'Confirmo, las bandejas eléctricas también tienen conflicto en esa zona. Adjunto el clash detection.',
            timestamp: '2025-05-23T08:42:00Z',
            hasAttachments: true,
            isRead: true,
            conversationId: '1'
        },
        {
            id: '1-4',
            senderId: 'ana-lopez',
            senderName: 'Ing. Ana López (Plomería)',
            content: 'Puedo subir la tubería de agua helada 20cm, eso liberaría espacio para el ducto.',
            timestamp: '2025-05-23T08:45:00Z',
            hasAttachments: false,
            isRead: true,
            conversationId: '1'
        }
    ],
    '2': [
        {
            id: '2-1',
            senderId: 'depto-seguridad',
            senderName: 'Depto. Seguridad',
            content: 'Nueva directiva de seguridad publicada - revisar antes del viernes',
            timestamp: '2025-05-23T13:45:00Z',
            hasAttachments: true,
            isRead: true,
            conversationId: '2'
        },
        {
            id: '2-2',
            senderId: 'supervisor-general',
            senderName: 'Supervisor General',
            content: '¿Hay cambios significativos en los protocolos de EPP?',
            timestamp: '2025-05-23T13:50:00Z',
            hasAttachments: false,
            isRead: true,
            conversationId: '2'
        },
        {
            id: '2-3',
            senderId: 'depto-seguridad',
            senderName: 'Depto. Seguridad',
            content: 'Sí, nuevos requisitos para trabajo en altura y manejo de químicos. Capacitación obligatoria.',
            timestamp: '2025-05-23T13:52:00Z',
            hasAttachments: false,
            isRead: false,
            conversationId: '2'
        }
    ],
    '3': [
        {
            id: '3-1',
            senderId: 'carlos-mendoza',
            senderName: 'Ing. Carlos Mendoza',
            content: 'Las pruebas de balanceo están programadas para mañana',
            timestamp: '2025-05-23T12:20:00Z',
            hasAttachments: false,
            isRead: true,
            conversationId: '3'
        },
        {
            id: '3-2',
            senderId: 'luis-vargas',
            senderName: 'Luis Vargas',
            content: '¿A qué hora empezamos? Necesito preparar los instrumentos.',
            timestamp: '2025-05-23T12:25:00Z',
            hasAttachments: false,
            isRead: true,
            conversationId: '3'
        },
        {
            id: '3-3',
            senderId: 'carlos-mendoza',
            senderName: 'Ing. Carlos Mendoza',
            content: 'A las 7:00 AM. Ya coordiné con facilities para el acceso temprano.',
            timestamp: '2025-05-23T12:30:00Z',
            hasAttachments: false,
            isRead: false,
            conversationId: '3'
        }
    ],
    '6': [
        {
            id: '6-1',
            senderId: 'luis-torres',
            senderName: 'Ing. Luis Torres',
            content: '¿Podemos revisar las especificaciones HVAC mañana?',
            timestamp: '2025-05-23T09:45:00Z',
            hasAttachments: false,
            isRead: true,
            conversationId: '6'
        },
        {
            id: '6-2',
            senderId: 'current-user',
            senderName: 'Tú',
            content: 'Claro, ¿tienes alguna duda específica o es revisión general?',
            timestamp: '2025-05-23T09:50:00Z',
            hasAttachments: false,
            isRead: true,
            conversationId: '6'
        },
        {
            id: '6-3',
            senderId: 'luis-torres',
            senderName: 'Ing. Luis Torres',
            content: 'Principalmente sobre los caudales en zona de servidores. Creo que necesitamos ajustar.',
            timestamp: '2025-05-23T09:55:00Z',
            hasAttachments: false,
            isRead: false,
            conversationId: '6'
        }
    ]
};

const DirectMessaging: React.FC = () => {
    const [selectedConversation, setSelectedConversation] = useState<string>('1');
    const [searchTerm, setSearchTerm] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [showNewConversationModal, setShowNewConversationModal] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
    const [contactSearchTerm, setContactSearchTerm] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [groupName, setGroupName] = useState('');
    const [messages, setMessages] = useState(mockMessages);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConversation) return;
        
        const newMsg: Message = {
            id: `${selectedConversation}-${Date.now()}`,
            senderId: 'current-user',
            senderName: 'Tú',
            content: newMessage.trim(),
            timestamp: new Date().toISOString(),
            hasAttachments: false,
            isRead: true,
            conversationId: selectedConversation
        };
        
        setMessages(prev => ({
            ...prev,
            [selectedConversation]: [...(prev[selectedConversation] || []), newMsg]
        }));
        
        setNewMessage('');
    };

    const handleCreateConversation = () => {
        if (selectedContacts.length === 0) return;
        
        const isGroup = selectedContacts.length > 1;
        
        // Validar nombre de grupo si es necesario
        if (isGroup && !groupName.trim()) {
            alert('Por favor ingresa un nombre para el grupo');
            return;
        }
        
        const message = isGroup ? 'Grupo creado' : 'Chat creado';
        
        setSuccessMessage(message);
        setShowSuccessPopup(true);
        setShowNewConversationModal(false);
        setSelectedContacts([]);
        setContactSearchTerm('');
        setGroupName('');
        
        setTimeout(() => {
            setShowSuccessPopup(false);
        }, 3000);
    };

    const toggleContactSelection = (contactId: string) => {
        setSelectedContacts(prev => 
            prev.includes(contactId) 
                ? prev.filter(id => id !== contactId)
                : [...prev, contactId]
        );
    };

    const filteredContacts = mockContacts.filter(contact =>
        contact.name.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
        contact.role.toLowerCase().includes(contactSearchTerm.toLowerCase())
    );

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
                <button 
                    onClick={() => setShowNewConversationModal(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
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
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {(messages[selectedConversation] || []).map((message: Message) => (
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
                                                <div className={`rounded-lg p-3 ${
                                                    message.senderId === 'current-user' 
                                                        ? 'bg-primary-500 text-white ml-8' 
                                                        : 'bg-gray-100'
                                                }`}>
                                                    <p className={`text-sm ${
                                                        message.senderId === 'current-user' 
                                                            ? 'text-white' 
                                                            : 'text-gray-900'
                                                    }`}>
                                                        {message.content}
                                                    </p>
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
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSendMessage();
                                                }
                                            }}
                                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                        <button 
                                            onClick={handleSendMessage}
                                            className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors"
                                        >
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

            {/* Modal Nueva Conversación */}
            {showNewConversationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {selectedContacts.length > 1 ? 'Nuevo Grupo' : 'Nueva Conversación'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowNewConversationModal(false);
                                    setSelectedContacts([]);
                                    setContactSearchTerm('');
                                    setGroupName('');
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4">
                            {/* Búsqueda de contactos */}
                            <div className="mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Buscar contactos..."
                                        value={contactSearchTerm}
                                        onChange={(e) => setContactSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                            </div>

                            {/* Nombre del grupo (solo si hay más de 1 contacto seleccionado) */}
                            {selectedContacts.length > 1 && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre del grupo *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresa el nombre del grupo..."
                                        value={groupName}
                                        onChange={(e) => setGroupName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                            )}

                            {/* Contactos seleccionados */}
                            {selectedContacts.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">Seleccionados ({selectedContacts.length}):</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedContacts.map(contactId => {
                                            const contact = mockContacts.find(c => c.id === contactId);
                                            return (
                                                <span key={contactId} className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 rounded-md text-sm">
                                                    {contact?.name}
                                                    <button
                                                        onClick={() => toggleContactSelection(contactId)}
                                                        className="ml-1 text-primary-600 hover:text-primary-800"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Lista de contactos */}
                            <div className="max-h-60 overflow-y-auto space-y-1">
                                {filteredContacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        onClick={() => toggleContactSelection(contact.id)}
                                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                            selectedContacts.includes(contact.id)
                                                ? 'bg-primary-50 border border-primary-200'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex-shrink-0">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                contact.isOnline ? 'bg-green-100' : 'bg-gray-100'
                                            }`}>
                                                <User className={`w-4 h-4 ${
                                                    contact.isOnline ? 'text-green-600' : 'text-gray-600'
                                                }`} />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {contact.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {contact.role} - {contact.department}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {contact.isOnline && (
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setShowNewConversationModal(false);
                                    setSelectedContacts([]);
                                    setContactSearchTerm('');
                                    setGroupName('');
                                }}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateConversation}
                                disabled={selectedContacts.length === 0}
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Crear {selectedContacts.length > 1 ? 'Grupo' : 'Chat'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Popup de éxito */}
            {showSuccessPopup && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>{successMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DirectMessaging;