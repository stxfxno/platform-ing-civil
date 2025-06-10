// src/pages/scope/QAModule.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    HelpCircle,
    Plus,
    Calendar,
    User,
    Building,
    CheckCircle,
    Clock,
    Filter,
    Search,
    Globe,
    Lock,
    Send,
    X,
} from 'lucide-react';

interface QAItem {
    id: string;
    questionId: string;
    question: string;
    askedBy: string;
    company: string;
    discipline: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'answered' | 'clarified';
    bidPackageId?: string;
    bidPackageName?: string;
    answer?: string;
    answeredBy?: string;
    answeredAt?: string;
    isPublic: boolean;
    createdAt: string;
    category: string;
}

// Mock data
const mockQAItems: QAItem[] = [
    {
        id: 'qa-001',
        questionId: 'Q-2025-001',
        question: '¿Cuál es el cronograma específico para la instalación de los equipos HVAC principales? ¿Existen restricciones de horario para el izaje de equipos?',
        askedBy: 'Ing. Roberto Vega',
        company: 'HVAC Solutions S.A.C.',
        discipline: 'HVAC',
        priority: 'high',
        status: 'answered',
        bidPackageId: 'BP-2025-001',
        bidPackageName: 'Sistema HVAC - Torres A y B',
        answer: 'El cronograma de instalación de equipos HVAC está programado para la semana del 10-17 de junio. Los izajes deben realizarse únicamente de lunes a viernes entre 7:00 AM y 5:00 PM, previa coordinación con la administración del edificio y obtención de permisos municipales.',
        answeredBy: 'Ing. Carlos Mendoza',
        answeredAt: '2025-05-22T14:30:00Z',
        isPublic: true,
        createdAt: '2025-05-20T09:15:00Z',
        category: 'Cronograma'
    },
    {
        id: 'qa-002',
        questionId: 'Q-2025-002',
        question: '¿Los tableros eléctricos principales incluyen los medidores de energía o estos se suministran por separado? ¿Cuáles son las especificaciones técnicas exactas de los medidores?',
        askedBy: 'Ing. Patricia Campos',
        company: 'Electro Instalaciones Perú',
        discipline: 'Eléctrico',
        priority: 'medium',
        status: 'pending',
        bidPackageId: 'BP-2025-002',
        bidPackageName: 'Instalaciones Eléctricas - Nivel Sótano',
        isPublic: true,
        createdAt: '2025-05-21T16:45:00Z',
        category: 'Especificaciones'
    },
    {
        id: 'qa-003',
        questionId: 'Q-2025-003',
        question: '¿Existe alguna preferencia del cliente por marcas específicas para los detectores de incendio? ¿Se requiere compatibilidad con algún sistema existente?',
        askedBy: 'Ing. Manuel Ochoa',
        company: 'Fire Protection Corp.',
        discipline: 'Protección Contra Incendios',
        priority: 'medium',
        status: 'answered',
        bidPackageId: 'BP-2025-003',
        bidPackageName: 'Sistema Contra Incendios - Completo',
        answer: 'El cliente requiere detectores compatibles con el panel central existente marca Notifier. Se acepta cualquier marca que tenga protocolo de comunicación compatible (Notifier, System Sensor, o Honeywell). Ver especificación técnica FP-DET-001 para detalles completos.',
        answeredBy: 'Ing. Sofia Ramírez',
        answeredAt: '2025-05-21T11:20:00Z',
        isPublic: true,
        createdAt: '2025-05-19T13:30:00Z',
        category: 'Materiales'
    },
    {
        id: 'qa-004',
        questionId: 'Q-2025-004',
        question: '¿Las tuberías de agua fría requieren aislamiento térmico en todas las zonas o solo en áreas específicas? ¿Cuál es el espesor mínimo requerido?',
        askedBy: 'Ing. Rosa Medina',
        company: 'Plomería Industrial SAC',
        discipline: 'Plomería',
        priority: 'low',
        status: 'answered',
        bidPackageId: 'BP-2025-004',
        bidPackageName: 'Plomería y Sanitarios - Pisos 1-5',
        answer: 'El aislamiento térmico es requerido únicamente en tuberías expuestas en áreas con aire acondicionado para prevenir condensación. Espesor mínimo: 1/2" para tuberías hasta 2" y 3/4" para tuberías mayores. Ver plano de detalles PL-DET-003.',
        answeredBy: 'Ing. Ana López',
        answeredAt: '2025-05-20T15:45:00Z',
        isPublic: true,
        createdAt: '2025-05-18T10:20:00Z',
        category: 'Instalación'
    },
    {
        id: 'qa-005',
        questionId: 'Q-2025-005',
        question: '¿Cuáles son los requisitos específicos para las pruebas de presión de los equipos mecánicos? ¿Se requiere presencia de inspector independiente?',
        askedBy: 'Ing. Fernando Morales',
        company: 'MEP Contractors Inc.',
        discipline: 'Mecánico',
        priority: 'high',
        status: 'answered',
        bidPackageId: 'BP-2025-005',
        bidPackageName: 'Equipos Mecánicos - Sala de Máquinas',
        answer: 'Las pruebas de presión deben realizarse según ASME B31.1. Se requiere inspector independiente certificado para sistemas de presión superior a 150 PSI. El contratista debe proveer todos los equipos de prueba y generar certificados. Ver procedimiento PT-MEC-001.',
        answeredBy: 'Ing. Carlos Pérez',
        answeredAt: '2025-05-22T09:30:00Z',
        isPublic: false,
        createdAt: '2025-05-21T14:10:00Z',
        category: 'Pruebas'
    },
    {
        id: 'qa-006',
        questionId: 'Q-2025-006',
        question: '¿El proyecto incluye la instalación de sistema de automatización BMS o solo el pre-cableado? ¿Cuáles son los puntos de integración requeridos?',
        askedBy: 'Ing. Carmen López',
        company: 'Automatización Total SAC',
        discipline: 'Automatización',
        priority: 'high',
        status: 'pending',
        isPublic: true,
        createdAt: '2025-05-23T11:00:00Z',
        category: 'Alcance'
    }
];

const QAModule: React.FC = () => {
    const [qaItems, setQaItems] = useState<QAItem[]>(mockQAItems);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showPublicOnly,] = useState(false);

    // Estados para modales
    const [showNewQuestionModal, setShowNewQuestionModal] = useState(false);
    const [showResponseModal, setShowResponseModal] = useState(false);
    const [selectedQAForResponse, setSelectedQAForResponse] = useState<QAItem | null>(null);

    // Estados para formularios
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        discipline: '',
        category: '',
        priority: 'medium' as const,
        bidPackageId: '',
        isPublic: true,
        company: 'Mi Empresa SAC',
        askedBy: ''
    });

    const [response, setResponse] = useState({
        answer: '',
        answeredBy: 'Ing. Carlos Rodríguez'
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'answered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return 'Pendiente';
            case 'answered': return 'Respondida';
            default: return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'answered': return <CheckCircle className="w-4 h-4" />;
            default: return <HelpCircle className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-50';
            case 'medium': return 'text-yellow-600 bg-yellow-50';
            case 'low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'high': return 'Alta';
            case 'medium': return 'Media';
            case 'low': return 'Baja';
            default: return priority;
        }
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleCreateQuestion = () => {
        if (!newQuestion.question.trim() || !newQuestion.discipline || !newQuestion.category) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        const newQA: QAItem = {
            id: `qa-${Date.now()}`,
            questionId: `Q-2025-${String(qaItems.length + 1).padStart(3, '0')}`,
            question: newQuestion.question,
            askedBy: newQuestion.askedBy,
            company: newQuestion.company,
            discipline: newQuestion.discipline,
            priority: newQuestion.priority,
            status: 'pending',
            bidPackageId: newQuestion.bidPackageId || undefined,
            bidPackageName: newQuestion.bidPackageId ? `Paquete ${newQuestion.bidPackageId}` : undefined,
            isPublic: newQuestion.isPublic,
            createdAt: new Date().toISOString(),
            category: newQuestion.category
        };

        setQaItems([newQA, ...qaItems]);
        setNewQuestion({
            question: '',
            discipline: '',
            category: '',
            priority: 'medium',
            bidPackageId: '',
            isPublic: true,
            company: 'Mi Empresa SAC',
            askedBy: 'Usuario Actual'
        });
        setShowNewQuestionModal(false);
        alert('Pregunta creada exitosamente');
    };

    const handleSubmitResponse = () => {
        if (!response.answer.trim() || !selectedQAForResponse) {
            alert('Por favor ingresa una respuesta');
            return;
        }

        const updatedItems = qaItems.map(item => {
            if (item.id === selectedQAForResponse.id) {
                return {
                    ...item,
                    status: 'answered' as const,
                    answer: response.answer,
                    answeredBy: response.answeredBy,
                    answeredAt: new Date().toISOString()
                };
            }
            return item;
        });

        setQaItems(updatedItems);
        setResponse({ answer: '', answeredBy: 'Ing. Carlos Rodríguez' });
        setShowResponseModal(false);
        setSelectedQAForResponse(null);
        alert('Respuesta enviada exitosamente');
    };

    const openResponseModal = (qaItem: QAItem) => {
        setSelectedQAForResponse(qaItem);
        setShowResponseModal(true);
    };

    const filteredQAItems = qaItems.filter(item => {
        const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
        const matchesDiscipline = selectedDiscipline === 'all' || item.discipline === selectedDiscipline;
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesVisibility = !showPublicOnly || item.isPublic;

        return matchesSearch && matchesStatus && matchesDiscipline && matchesCategory && matchesVisibility;
    });

    const statusCounts = {
        all: qaItems.length,
        pending: qaItems.filter(q => q.status === 'pending').length,
        answered: qaItems.filter(q => q.status === 'answered').length,
        clarified: qaItems.filter(q => q.status === 'clarified').length
    };

    const categories = [...new Set(qaItems.map(item => item.category))];
    const disciplines = [...new Set(qaItems.map(item => item.discipline))];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-500 rounded-lg">
                        <HelpCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Preguntas y Respuestas</h1>
                        <p className="text-gray-600">Módulo Q&A para procesos de licitación</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setShowNewQuestionModal(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Nueva Pregunta</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Preguntas</p>
                            <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
                        </div>
                        <HelpCircle className="w-8 h-8 text-gray-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pendientes</p>
                            <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Respondidas</p>
                            <p className="text-2xl font-bold text-green-600">{statusCounts.answered}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Públicas</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {qaItems.filter(q => q.isPublic).length}
                            </p>
                        </div>
                        <Globe className="w-8 h-8 text-blue-500" />
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
                                placeholder="Buscar preguntas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="pending">Pendiente</option>
                                <option value="answered">Respondida</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Disciplina</label>
                            <select
                                value={selectedDiscipline}
                                onChange={(e) => setSelectedDiscipline(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="all">Todas las disciplinas</option>
                                {disciplines.map(discipline => (
                                    <option key={discipline} value={discipline}>{discipline}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="all">Todas las categorías</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Q&A Items List */}
            <div className="space-y-4">
                {filteredQAItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            {item.questionId}
                                        </span>
                                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                                            {getStatusIcon(item.status)}
                                            <span className="ml-1">{getStatusLabel(item.status)}</span>
                                        </span>
                                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                                            {getPriorityLabel(item.priority)}
                                        </span>
                                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${item.isPublic
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {item.isPublic ? <Globe className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                                            {item.isPublic ? 'Pública' : 'Privada'}
                                        </span>
                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                            {item.category}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                        <span className="flex items-center">
                                            <Building className="w-4 h-4 mr-1" />
                                            {item.company}
                                        </span>
                                        <span>{item.discipline}</span>
                                        {item.bidPackageName && (
                                            <>
                                                <span>•</span>
                                                <span>{item.bidPackageName}</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                            </div>

                            {/* Question */}
                            <div className="mb-4">
                                <div className="flex items-start space-x-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <HelpCircle className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-900 mb-1">Pregunta</h3>
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {item.question}
                                        </p>
                                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                            <span className="flex items-center">
                                                <User className="w-3 h-3 mr-1" />
                                                {item.askedBy}
                                            </span>
                                            <span className="flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {formatDate(item.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Answer */}
                            {item.answer && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-green-900 mb-1">Respuesta</h4>
                                            <p className="text-green-800 text-sm leading-relaxed mb-2">
                                                {item.answer}
                                            </p>
                                            <div className="flex items-center space-x-4 text-xs text-green-600">
                                                <span className="flex items-center">
                                                    <User className="w-3 h-3 mr-1" />
                                                    {item.answeredBy}
                                                </span>
                                                <span className="flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {item.answeredAt && formatDate(item.answeredAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span>ID: {item.questionId}</span>
                                    <span>•</span>
                                    <span>{item.discipline}</span>
                                    {item.bidPackageName && (
                                        <>
                                            <span>•</span>
                                            <span>{item.bidPackageName}</span>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    {item.status === 'pending' && (
                                        <button
                                            onClick={() => openResponseModal(item)}
                                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                                        >
                                            <Send className="w-3 h-3" />
                                            <span>Responder</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredQAItems.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay preguntas</h3>
                    <p className="text-gray-500 mb-4">
                        No se encontraron preguntas que coincidan con los filtros aplicados.
                    </p>
                    <button
                        onClick={() => setShowNewQuestionModal(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 mx-auto"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Primera Pregunta</span>
                    </button>
                </div>
            )}

            {/* Modal para Nueva Pregunta */}
            {showNewQuestionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Nueva Pregunta</h2>
                            <button
                                onClick={() => setShowNewQuestionModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Pregunta */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pregunta *
                                </label>
                                <textarea
                                    value={newQuestion.question}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="Describe tu pregunta de manera clara y específica..."
                                />
                            </div>

                            {/* Información del solicitante */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Solicitado por
                                    </label>
                                    <input
                                        type="text"
                                        value={newQuestion.askedBy}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, askedBy: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Nombre del solicitante"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Empresa
                                    </label>
                                    <input
                                        type="text"
                                        value={newQuestion.company}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, company: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Nombre de la empresa"
                                    />
                                </div>
                            </div>

                            {/* Disciplina y Categoría */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Disciplina *
                                    </label>
                                    <select
                                        value={newQuestion.discipline}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, discipline: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    >
                                        <option value="">Seleccionar disciplina</option>
                                        <option value="HVAC">HVAC</option>
                                        <option value="Eléctrico">Eléctrico</option>
                                        <option value="Plomería">Plomería</option>
                                        <option value="Protección Contra Incendios">Protección Contra Incendios</option>
                                        <option value="Mecánico">Mecánico</option>
                                        <option value="Automatización">Automatización</option>
                                        <option value="Estructural">Estructural</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Categoría *
                                    </label>
                                    <select
                                        value={newQuestion.category}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    >
                                        <option value="">Seleccionar categoría</option>
                                        <option value="Clarificación Técnica">Clarificación Técnica</option>
                                        <option value="Especificaciones">Especificaciones</option>
                                        <option value="Materiales">Materiales</option>
                                        <option value="Instalación">Instalación</option>
                                        <option value="Coordinación">Coordinación</option>
                                        <option value="Cronograma">Cronograma</option>
                                        <option value="Normativa">Normativa</option>
                                        <option value="Pruebas">Pruebas</option>
                                        <option value="Alcance">Alcance</option>
                                        <option value="Presupuesto">Presupuesto</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                            </div>

                            {/* Prioridad y Paquete de Licitación */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Prioridad
                                    </label>
                                    <select
                                        value={newQuestion.priority}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, priority: e.target.value as 'low' | 'medium' | 'high' })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    >
                                        <option value="low">Baja</option>
                                        <option value="medium">Media</option>
                                        <option value="high">Alta</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Paquete de Licitación
                                    </label>
                                    <input
                                        type="text"
                                        value={newQuestion.bidPackageId}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, bidPackageId: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Ej: BP-2025-001 (opcional)"
                                    />
                                </div>
                            </div>

                            {/* Visibilidad */}
                            <div>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={newQuestion.isPublic}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, isPublic: e.target.checked })}
                                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Hacer esta pregunta pública (visible para todos los participantes)
                                    </span>
                                </label>
                            </div>

                            {/* Botones */}
                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => setShowNewQuestionModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCreateQuestion}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Enviar Pregunta</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Responder Pregunta */}
            {showResponseModal && selectedQAForResponse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Responder Pregunta</h2>
                            <button
                                onClick={() => setShowResponseModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Mostrar la pregunta */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm font-medium text-gray-500">
                                    {selectedQAForResponse.questionId}
                                </span>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-600">{selectedQAForResponse.discipline}</span>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-600">{selectedQAForResponse.category}</span>
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Pregunta Original:</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {selectedQAForResponse.question}
                            </p>
                            <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                                <span className="flex items-center">
                                    <User className="w-3 h-3 mr-1" />
                                    {selectedQAForResponse.askedBy}
                                </span>
                                <span className="flex items-center">
                                    <Building className="w-3 h-3 mr-1" />
                                    {selectedQAForResponse.company}
                                </span>
                                <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {formatDate(selectedQAForResponse.createdAt)}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Respuesta */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Respuesta *
                                </label>
                                <textarea
                                    value={response.answer}
                                    onChange={(e) => setResponse({ ...response, answer: e.target.value })}
                                    rows={6}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Proporciona una respuesta clara y completa a la pregunta..."
                                />
                            </div>

                            {/* Respondido por */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Respondido por
                                </label>
                                <input
                                    type="text"
                                    value={response.answeredBy}
                                    onChange={(e) => setResponse({ ...response, answeredBy: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Nombre de quien responde"
                                />
                            </div>

                            {/* Botones */}
                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => setShowResponseModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSubmitResponse}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Enviar Respuesta</span>
                                </button>
                            </div>
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

export default QAModule;