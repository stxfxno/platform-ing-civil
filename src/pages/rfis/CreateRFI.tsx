// src/pages/rfis/CreateRFI.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileQuestion,
    ArrowLeft,
    Upload,
    X,
    Send,
    Check,
    Mail,
    Loader2,
    User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface RFIFormData {
    title: string;
    description: string;
    discipline: string;
    specialty: string;
    priority: string;
    assignedTo: string;
    dueDate: string;
    location: string;
    drawingReference: string;
    category: string;
    privacy: string; // Nuevo campo
}

interface ConsultaData {
    fecha: string;
    consulta: string;
    ubicacion: string;
    para: string;
}

interface EmailData {
    sendAsEmail: boolean;
    para: string;
    asunto: string;
    cc: string[];
    otherEmails: string;
    texto: string;
}

interface AttachedFile {
    id: string;
    name: string;
    size: number;
    type: string;
}

const CreateRFI: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState<RFIFormData>({
        title: '',
        description: '',
        discipline: '',
        specialty: '',
        priority: '',
        assignedTo: '',
        dueDate: '',
        location: '',
        drawingReference: '',
        category: '',
        privacy: 'publico' // Valor por defecto
    });

    const [consultaData, setConsultaData] = useState<ConsultaData>({
        fecha: new Date().toISOString().split('T')[0],
        consulta: '',
        ubicacion: '',
        para: ''
    });

    const [emailData, setEmailData] = useState<EmailData>({
        sendAsEmail: false,
        para: '',
        asunto: '',
        cc: [],
        otherEmails: '',
        texto: ''
    });

    const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const disciplines = [
        'Mecánicas',
        'Eléctricas',
        'Plomería'
    ];

    const specialties = {
        'Mecánicas': [
            'INSTALACIONES MECANICAS',
            'SISTEMA CONTRA INCENDIOS (MECANICA)',
            'BOMBAS DE AGUA Y DESAGUE (MECANICA)',
            'INSTALACION DE GAS (MECANICA)',
            'HVAC (MECANICA)',
            'ASCENSORES (MECANICA)'
        ],
        'Eléctricas': [
            'INSTALACIONES ELECTRICAS',
            'SISTEMA CONTRA INCENDIOS (ELECTRICA)',
            'BOMBAS DE AGUA Y DESAGUE (ELECTRICA)',
            'INSTALACION DE GAS (ELECTRICA)',
            'HVAC (ELECTRICA)',
            'ASCENSORES (ELECTRICA)'
        ],
        'Plomería': [
            'INSTALACIONES SANITARIAS (PLOMERIA)',
            'SISTEMA CONTRA INCENDIOS (PLOMERIA)',
            'BOMBAS DE AGUA Y DESAGUE (PLOMERIA)',
            'INSTALACION DE GAS (PLOMERIA)'
        ]
    };

    const generalSpecialties = [
        'ESTRUCTURAS',
        'ARQUITECTURA',
        'SSOMA',
        'MODELADO BIM',
        'COSTOS Y PRESUPUESTOS'
    ];

    const allSpecialties = [
        ...Object.values(specialties).flat(),
        ...generalSpecialties
    ];

    const categories = [
        'Clarificación Técnica',
        'Especificaciones',
        'Materiales',
        'Instalación',
        'Coordinación',
        'Normativa',
        'Otro'
    ];

    const priorities = [
        { key: 'baja', label: 'Baja', days: 7 },
        { key: 'media', label: 'Media', days: 5 },
        { key: 'alta', label: 'Alta', days: 3 },
        { key: 'urgente', label: 'Urgente', days: 1 }
    ];

    const privacyOptions = [
        { key: 'publico', label: 'Público' },
        { key: 'privado', label: 'Privado' }
    ];

    // Función para calcular fecha límite automáticamente
    const calculateDueDate = (priority: string, startDate: string = consultaData.fecha) => {
        if (!priority || !startDate) return '';
        
        const priorityData = priorities.find(p => p.key === priority);
        if (!priorityData) return '';
        
        const start = new Date(startDate);
        const dueDate = new Date(start);
        dueDate.setDate(start.getDate() + priorityData.days);
        
        return dueDate.toISOString().split('T')[0];
    };

    const responsiblePersons = [
        'Ing. Carlos Mendoza - Instalaciones Mecánicas',
        'Ing. María Santos - Instalaciones Eléctricas',
        'Ing. Alberto Silva - Plomería',
        'Ing. Jorge Ramírez - Sistema Contra Incendios',
        'Ing. Ana López - HVAC',
        'Ing. Luis Torres - Bombas y Equipos',
        'Ing. Patricia Vega - Instalación de Gas',
        'Arq. Carmen López - Arquitectura',
        'Ing. Roberto Díaz - Estructuras',
        'Ing. Elena Morales - SSOMA',
        'Ing. Diego Molero - Modelado BIM',
        'Ing. Fernando Rojas - Costos y Presupuestos'
    ];

    const emailContacts = [
        'Ana Victoria Arteaga - Jefa de Administración y Finanzas',
        'Elías Midma Prado - Logística',
        'Jorge Orihuela - Arquitecto',
        'Magaly Rabanal - Arquitecta',
        'Beltrán Mayhua - Gerente de Obras',
        'Elizabeth Fernandez - Jefa de Logística',
        'José Ramírez Orozco - Ingeniero Civil',
        'Claudia Minuela - Ing. Civil',
        'Hilda Cordova - Asistente administrativo 01',
        'Michael Falconi - Gerente General',
        'Pablo Orihuela - Gerente General',
        'Delfín Estebes - Ingeniero de Campo',
        'Iván Navarrete - Administrador de Obra',
        'Luis De La Cruz - Soporte Técnico',
        'Renato Miranda - Ing. Residente',
        'Diego Puentes - Modelador MEP',
        'Joel Mayhua - Gerente General',
        'Luis Enrique Mendoza - Ingeniero Civil',
        'Mónica Delgado - Metradora',
        'Santiago Pacheco - Ing. de Producción',
        'Diego Villagómez - Ing. Estructural',
        'Luis Gamarra - Arquitecto',
        'Víctor Solano - Ing. Residente',
        'Ing. Carlos Mendoza - Instalaciones Mecánicas',
        'Ing. María Santos - Instalaciones Eléctricas',
        'Ing. Alberto Silva - Plomería',
        'Ing. Jorge Ramírez - Sistema Contra Incendios',
        'Ing. Ana López - HVAC',
        'Ing. Luis Torres - Bombas y Equipos',
        'Ing. Patricia Vega - Instalación de Gas',
        'Arq. Carmen López - Arquitectura',
        'Ing. Roberto Díaz - Estructuras',
        'Ing. Elena Morales - SSOMA',
        'Ing. Diego Molero - Modelado BIM',
        'Ing. Fernando Rojas - Costos y Presupuestos'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        // Actualizar formData
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        // Auto-calcular fecha límite cuando cambia la prioridad
        if (name === 'priority') {
            const newDueDate = calculateDueDate(value, consultaData.fecha);
            setFormData(prev => ({ ...prev, dueDate: newDueDate }));
        }

        // Auto-populate consulta fields
        if (name === 'title' || name === 'description') {
            setConsultaData(prev => ({
                ...prev,
                consulta: updatedFormData.title || updatedFormData.description || value
            }));
        }
        if (name === 'location') {
            setConsultaData(prev => ({ ...prev, ubicacion: value }));
        }
    };

    const handleConsultaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedConsultaData = { ...consultaData, [name]: value };
        setConsultaData(updatedConsultaData);

        // Si cambia la fecha de consulta y hay prioridad, recalcular fecha límite
        if (name === 'fecha' && formData.priority) {
            const newDueDate = calculateDueDate(formData.priority, value);
            setFormData(prev => ({ ...prev, dueDate: newDueDate }));
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        
        if (type === 'checkbox') {
            setEmailData(prev => ({ ...prev, [name]: checked }));
        } else {
            setEmailData(prev => ({ ...prev, [name]: value }));
        }
    };

    const toggleEmailContact = (contact: string) => {
        setEmailData(prev => ({
            ...prev,
            cc: prev.cc.includes(contact)
                ? prev.cc.filter(c => c !== contact)
                : [...prev.cc, contact]
        }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles: AttachedFile[] = Array.from(files).map((file, index) => ({
                id: `file-${Date.now()}-${index}`,
                name: file.name,
                size: file.size,
                type: file.type
            }));
            setAttachedFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (fileId: string) => {
        setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Generate RFI number
        const rfiNumber = `RFI-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;

        // Auto-populate email subject if sending as email
        if (emailData.sendAsEmail && !emailData.asunto) {
            setEmailData(prev => ({
                ...prev,
                asunto: `${rfiNumber} - ${formData.title}`
            }));
        }

        // Crear objeto RFI para guardar
        const newRFI = {
            id: `rfi-${Date.now()}`,
            rfiNumber: rfiNumber,
            title: formData.title,
            description: formData.description,
            discipline: formData.discipline,
            priority: formData.priority,
            status: 'open',
            category: formData.category,
            location: formData.location,
            drawingReference: formData.drawingReference,
            assignedTo: consultaData.para,
            requestedBy: user?.id || 'user-current',
            dueDate: formData.dueDate,
            privacy: formData.privacy,
            attachments: attachedFiles.map(file => ({
                id: file.id,
                name: file.name,
                size: file.size,
                type: file.type,
                url: `/files/${file.name}`,
                uploadedAt: new Date().toISOString(),
                uploadedBy: user?.id || 'user-current'
            })),
            comments: [],
            tags: [
                formData.discipline,
                formData.priority,
                ...(formData.specialty ? [formData.specialty] : [])
            ].filter(Boolean),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: user?.id || 'user-current',
            emailData: emailData.sendAsEmail ? {
                sentAsEmail: true,
                para: emailData.para,
                asunto: emailData.asunto,
                cc: emailData.cc,
                otherEmails: emailData.otherEmails,
                texto: emailData.texto,
                sentAt: new Date().toISOString()
            } : null
        };

        // Guardar en localStorage
        try {
            const existingRFIs = JSON.parse(localStorage.getItem('civil_eng_rfis') || '[]');
            const updatedRFIs = [newRFI, ...existingRFIs];
            localStorage.setItem('civil_eng_rfis', JSON.stringify(updatedRFIs));
            
            console.log('RFI guardada en localStorage:', newRFI);
        } catch (error) {
            console.error('Error al guardar RFI en localStorage:', error);
        }

        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                navigate('/rfis/bandeja');
            }, 2000);
        }, 1500);
    };

    const getAvailableSpecialties = () => {
        if (formData.discipline && specialties[formData.discipline as keyof typeof specialties]) {
            return [...specialties[formData.discipline as keyof typeof specialties], ...generalSpecialties];
        }
        return allSpecialties;
    };

    const isFormValid = formData.title && formData.description && formData.discipline && formData.priority && consultaData.para;

    // Success Animation
    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full mx-4">
                    <div className="animate-bounce mb-6">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                            <Check className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">¡RFI Enviada!</h2>
                    <p className="text-gray-600 mb-4">
                        Tu solicitud de información ha sido {emailData.sendAsEmail ? 'enviada por correo' : 'registrada'} exitosamente.
                    </p>
                    <div className="animate-pulse">
                        <Mail className="w-6 h-6 text-blue-500 mx-auto" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/rfis')}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-green-500 rounded-lg">
                            <FileQuestion className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Crear Nueva RFI</h1>
                            <p className="text-gray-600">Solicitud de Información</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Send Button - Top Right */}
            <div className="flex justify-end mb-6">
                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    onClick={handleSubmit}
                    className="bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Enviando...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span>Enviar</span>
                        </>
                    )}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileQuestion className="w-4 h-4 text-blue-600" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900">Información de la RFI</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Title and Description */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Título de la RFI *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Ej: Clarificación sobre instalaciones eléctricas en Piso 3"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Descripción detallada *
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Describa detalladamente la información que requiere..."
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Technical Details */}
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="text-sm font-medium text-gray-900 mb-4">Detalles Técnicos</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Disciplina *
                                            </label>
                                            <select
                                                name="discipline"
                                                value={formData.discipline}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                required
                                            >
                                                <option value="">Seleccionar disciplina</option>
                                                {disciplines.map(discipline => (
                                                    <option key={discipline} value={discipline}>{discipline}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Especialidad
                                            </label>
                                            <select
                                                name="specialty"
                                                value={formData.specialty}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            >
                                                <option value="">Seleccionar especialidad</option>
                                                {getAvailableSpecialties().map(specialty => (
                                                    <option key={specialty} value={specialty}>{specialty}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Categoría
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            >
                                                <option value="">Seleccionar categoría</option>
                                                {categories.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Prioridad *
                                            </label>
                                            <select
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                required
                                            >
                                                <option value="">Seleccionar prioridad</option>
                                                {priorities.map(priority => (
                                                    <option key={priority.key} value={priority.key}>
                                                        {priority.label} ({priority.days} días)
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Location & References */}
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="text-sm font-medium text-gray-900 mb-4">Ubicación y Referencias</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ubicación
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                placeholder="Ej: Piso 3, Área A, Zona MEP"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Referencia de Planos
                                            </label>
                                            <input
                                                type="text"
                                                name="drawingReference"
                                                value={formData.drawingReference}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                placeholder="Ej: E-001, M-102, P-203"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <input
                                    type="checkbox"
                                    name="sendAsEmail"
                                    checked={emailData.sendAsEmail}
                                    onChange={handleEmailChange}
                                    className="h-4 w-4 text-blue-600 rounded"
                                />
                                <div className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-gray-600" />
                                    <span className="text-lg font-semibold text-gray-900">Enviar por correo electrónico</span>
                                </div>
                            </div>

                            {emailData.sendAsEmail && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Para:</label>
                                            <select
                                                name="para"
                                                value={emailData.para}
                                                onChange={handleEmailChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            >
                                                <option value="">[Seleccionar destinatario]</option>
                                                {emailContacts.map(contact => (
                                                    <option key={contact} value={contact}>{contact}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Asunto:</label>
                                            <input
                                                type="text"
                                                name="asunto"
                                                value={emailData.asunto}
                                                onChange={handleEmailChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                placeholder="Asunto del correo electrónico"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">CC (Opcional):</label>
                                        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {emailContacts.map(contact => (
                                                    <label key={contact} className="flex items-center text-sm hover:bg-white p-2 rounded">
                                                        <input
                                                            type="checkbox"
                                                            checked={emailData.cc.includes(contact)}
                                                            onChange={() => toggleEmailContact(contact)}
                                                            className="mr-3 h-4 w-4 text-blue-600"
                                                        />
                                                        <span className="truncate">{contact}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Otros emails:</label>
                                        <input
                                            type="text"
                                            name="otherEmails"
                                            value={emailData.otherEmails}
                                            onChange={handleEmailChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="email1@dominio.com, email2@dominio.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje del correo:</label>
                                        <textarea
                                            name="texto"
                                            value={emailData.texto}
                                            onChange={handleEmailChange}
                                            rows={6}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="Escriba el contenido del correo aquí. Se incluirán automáticamente los detalles de la RFI..."
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Assignment & Timeline */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <User className="w-4 h-4 text-green-600" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900">Asignación y Cronograma</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fecha de Consulta
                                    </label>
                                    <input
                                        type="date"
                                        name="fecha"
                                        value={consultaData.fecha}
                                        onChange={handleConsultaChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Asignado a / Para *
                                    </label>
                                    <select
                                        name="para"
                                        value={consultaData.para}
                                        onChange={(e) => {
                                            handleConsultaChange(e);
                                            setFormData(prev => ({ ...prev, assignedTo: e.target.value }));
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    >
                                        <option value="">[Seleccione responsable]</option>
                                        {responsiblePersons.map(person => (
                                            <option key={person} value={person}>{person}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Visibilidad
                                    </label>
                                    <select
                                        name="privacy"
                                        value={formData.privacy}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    >
                                        {privacyOptions.map(option => (
                                            <option key={option.key} value={option.key}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formData.privacy === 'publico' 
                                            ? 'Visible para todos los miembros del proyecto' 
                                            : 'Solo visible para el responsable asignado y el solicitante'
                                        }
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fecha límite de respuesta
                                    </label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    {formData.priority && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Calculado automáticamente según prioridad: {priorities.find(p => p.key === formData.priority)?.days} días
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Autor
                                    </label>
                                    <input
                                        type="text"
                                        value={user?.name || 'Santiago'}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Files & Attachments */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Upload className="w-4 h-4 text-purple-600" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900">Archivos Adjuntos</h2>
                            </div>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="file-upload"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="text-sm text-blue-600 cursor-pointer hover:text-blue-700 font-medium"
                                >
                                    Seleccionar archivos
                                </label>
                                <p className="text-xs text-gray-500 mt-2">
                                    {attachedFiles.length > 0
                                        ? `${attachedFiles.length} archivo(s) seleccionado(s)`
                                        : 'PDF, DOC, JPG, PNG, DWG - Máx 10MB cada uno'
                                    }
                                </p>
                            </div>

                            {/* File List */}
                            {attachedFiles.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {attachedFiles.map(file => (
                                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <FileQuestion className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(file.id)}
                                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Form Status */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado del Formulario</h3>
                            <div className="space-y-3">
                                <div className={`flex items-center text-sm ${formData.title ? 'text-green-600' : 'text-gray-400'}`}>
                                    <div className={`w-3 h-3 rounded-full mr-3 ${formData.title ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    Título completado
                                </div>
                                <div className={`flex items-center text-sm ${formData.description ? 'text-green-600' : 'text-gray-400'}`}>
                                    <div className={`w-3 h-3 rounded-full mr-3 ${formData.description ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    Descripción agregada
                                </div>
                                <div className={`flex items-center text-sm ${formData.discipline ? 'text-green-600' : 'text-gray-400'}`}>
                                    <div className={`w-3 h-3 rounded-full mr-3 ${formData.discipline ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    Disciplina seleccionada
                                </div>
                                <div className={`flex items-center text-sm ${formData.priority ? 'text-green-600' : 'text-gray-400'}`}>
                                    <div className={`w-3 h-3 rounded-full mr-3 ${formData.priority ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    Prioridad definida
                                </div>
                                <div className={`flex items-center text-sm ${consultaData.para ? 'text-green-600' : 'text-gray-400'}`}>
                                    <div className={`w-3 h-3 rounded-full mr-3 ${consultaData.para ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    Responsable asignado
                                </div>
                                <div className={`flex items-center text-sm ${formData.privacy ? 'text-green-600' : 'text-gray-400'}`}>
                                    <div className={`w-3 h-3 rounded-full mr-3 ${formData.privacy ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    Visibilidad seleccionada
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                                <p>• Se generará un número único automáticamente</p>
                                <p>• Se enviará notificación al responsable</p>
                                <p>• Los campos marcados con * son obligatorios</p>
                                <p>• Fecha límite se calcula según la prioridad</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateRFI;