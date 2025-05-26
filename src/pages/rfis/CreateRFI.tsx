// src/pages/rfis/CreateRFI.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileQuestion,
    ArrowLeft,
    Upload,
    X,
    //Calendar,
    //User,
    AlertTriangle,
    Save,
    Send
} from 'lucide-react';
import { MEP_DISCIPLINES, SYSTEM_PRIORITIES } from '../../types/common';

interface RFIFormData {
    title: string;
    description: string;
    discipline: string;
    priority: string;
    assignedTo: string;
    dueDate: string;
    location: string;
    drawingReference: string;
    category: string;
}

interface AttachedFile {
    id: string;
    name: string;
    size: number;
    type: string;
}

const CreateRFI: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RFIFormData>({
        title: '',
        description: '',
        discipline: '',
        priority: '',
        assignedTo: '',
        dueDate: '',
        location: '',
        drawingReference: '',
        category: ''
    });
    const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDraft, setIsDraft] = useState(false);

    const categories = [
        'Clarificación Técnica',
        'Especificaciones',
        'Materiales',
        'Instalación',
        'Coordinación',
        'Normativa',
        'Otro'
    ];

    const responsiblePersons = [
        'Ing. María González - Eléctrico',
        'Ing. Carlos Pérez - Mecánico',
        'Ing. Ana López - Plomería',
        'Ing. Luis Torres - HVAC',
        'Ing. Sofia Ramírez - Protección Contra Incendios'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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

    const handleSubmit = async (e: React.FormEvent, saveDraft: boolean = false) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsDraft(saveDraft);

        // Simular envío
        setTimeout(() => {
            console.log('RFI Data:', { ...formData, attachedFiles, isDraft: saveDraft });
            setIsSubmitting(false);

            if (saveDraft) {
                alert('RFI guardada como borrador');
            } else {
                alert('RFI enviada exitosamente');
                navigate('/rfis/bandeja');
            }
        }, 1500);
    };

    const isFormValid = formData.title && formData.description && formData.discipline && formData.priority && formData.assignedTo;

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

                <div className="flex items-center space-x-3">
                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e, true)}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Borrador
                    </button>
                    <button
                        form="rfi-form"
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                {isDraft ? 'Guardando...' : 'Enviando...'}
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Enviar RFI
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Form */}
            <form id="rfi-form" onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="form-label" htmlFor="title">
                                        Título de la RFI *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Ej: Clarificación sobre instalaciones eléctricas en Piso 3"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="form-label" htmlFor="description">
                                        Descripción detallada *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className="form-input"
                                        placeholder="Describa detalladamente la información que requiere..."
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label" htmlFor="category">
                                            Categoría
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        >
                                            <option value="">Seleccionar categoría</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="form-label" htmlFor="location">
                                            Ubicación
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            placeholder="Ej: Piso 3, Área A, Zona MEP"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label" htmlFor="drawingReference">
                                        Referencia de Planos
                                    </label>
                                    <input
                                        type="text"
                                        id="drawingReference"
                                        name="drawingReference"
                                        value={formData.drawingReference}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Ej: E-001, M-102, P-203"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* File Attachments */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Archivos Adjuntos</h2>

                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 mb-2">Arrastra archivos aquí o haz clic para seleccionar</p>
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
                                        className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                                    >
                                        Seleccionar Archivos
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Formatos permitidos: PDF, DOC, JPG, PNG, DWG (Max 10MB cada uno)
                                    </p>
                                </div>

                                {/* Attached Files List */}
                                {attachedFiles.length > 0 && (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium text-gray-700">Archivos seleccionados:</h3>
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
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Assignment & Priority */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Asignación y Prioridad</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="form-label" htmlFor="discipline">
                                        Disciplina *
                                    </label>
                                    <select
                                        id="discipline"
                                        name="discipline"
                                        value={formData.discipline}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="">Seleccionar disciplina</option>
                                        {Object.values(MEP_DISCIPLINES).map(discipline => (
                                            <option key={discipline.key} value={discipline.key}>
                                                {discipline.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="form-label" htmlFor="priority">
                                        Prioridad *
                                    </label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="">Seleccionar prioridad</option>
                                        {Object.values(SYSTEM_PRIORITIES).map(priority => (
                                            <option key={priority.key} value={priority.key}>
                                                {priority.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="form-label" htmlFor="assignedTo">
                                        Asignado a *
                                    </label>
                                    <select
                                        id="assignedTo"
                                        name="assignedTo"
                                        value={formData.assignedTo}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="">Seleccionar responsable</option>
                                        {responsiblePersons.map(person => (
                                            <option key={person} value={person}>{person}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="form-label" htmlFor="dueDate">
                                        Fecha límite de respuesta
                                    </label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Preview Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-medium text-blue-900">Información importante</h3>
                                    <div className="text-sm text-blue-800 mt-1 space-y-1">
                                        <p>• La RFI se enviará automáticamente por email al responsable</p>
                                        <p>• Se generará un número único de seguimiento</p>
                                        <p>• Recibirás notificaciones sobre el estado</p>
                                        <p>• Los campos marcados con * son obligatorios</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateRFI;