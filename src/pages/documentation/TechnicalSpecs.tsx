// src/pages/documentation/TechnicalSpecs.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Settings,
    Search,
    Download,
    Edit,
    CheckCircle,
    ArrowLeft,
    Tag,
    Upload,
    X,
    Save,
    Trash2,
    FileText
} from 'lucide-react';

interface TechnicalSpec {
    id: string;
    specId: string;
    title: string;
    discipline: 'Mecanicas' | 'Plomeria' | 'Electricas';
    subcontractor: string;
    section: string;
    version: string;
    lastUpdate: string;
    author: string;
    fileSize: string;
    tags: string[];
}

const mockSpecs: TechnicalSpec[] = [
    {
        id: '1',
        specId: 'SPEC-ELE-001',
        title: 'Especificaciones Técnicas para Instalaciones Eléctricas',
        discipline: 'Electricas',
        subcontractor: 'Electro Instalaciones SAC',
        section: '26 00 00',
        version: 'v3.2',
        lastUpdate: '2025-05-20',
        author: 'Ing. María González',
        fileSize: '1.2 MB',
        tags: ['cables', 'tableros', 'iluminación']
    },
    {
        id: '2',
        specId: 'SPEC-HVAC-001',
        title: 'Especificaciones para Sistemas HVAC',
        discipline: 'Mecanicas',
        subcontractor: 'Climatización Total SAC',
        section: '23 00 00',
        version: 'v2.1',
        lastUpdate: '2025-05-22',
        author: 'Ing. Luis Torres',
        fileSize: '2.1 MB',
        tags: ['ductos', 'equipos', 'control']
    },
    {
        id: '3',
        specId: 'SPEC-PLU-001',
        title: 'Especificaciones de Plomería e Instalaciones Sanitarias',
        discipline: 'Plomeria',
        subcontractor: 'Plomería Industrial EIRL',
        section: '22 00 00',
        version: 'v1.8',
        lastUpdate: '2025-05-18',
        author: 'Ing. Ana López',
        fileSize: '1.5 MB',
        tags: ['tuberías', 'válvulas', 'accesorios']
    },
    {
        id: '4',
        specId: 'SPEC-FP-001',
        title: 'Especificaciones Sistema Contra Incendios',
        discipline: 'Mecanicas',
        subcontractor: 'Protección Contra Incendios SAC',
        section: '21 00 00',
        version: 'v2.0',
        lastUpdate: '2025-05-15',
        author: 'Ing. Sofia Ramírez',
        fileSize: '1.8 MB',
        tags: ['rociadores', 'detección', 'supresión']
    },
    {
        id: '5',
        specId: 'SPEC-ELE-002',
        title: 'Especificaciones para Sistemas de Telecomunicaciones',
        discipline: 'Electricas',
        subcontractor: 'Electro Instalaciones SAC',
        section: '27 00 00',
        version: 'v1.5',
        lastUpdate: '2025-05-10',
        author: 'Ing. Carlos Mendoza',
        fileSize: '0.9 MB',
        tags: ['fibra óptica', 'cableado', 'equipos']
    }
];

const TechnicalSpecs: React.FC = () => {
    // Estado para las especificaciones (copia local de mockSpecs que se puede modificar)
    const [specs, setSpecs] = useState<TechnicalSpec[]>(mockSpecs);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDiscipline, setFilterDiscipline] = useState('all');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    // Formulario para nueva especificación
    const [uploadForm, setUploadForm] = useState({
        specId: '',
        title: '',
        discipline: 'Mecanicas' as TechnicalSpec['discipline'],
        subcontractor: '',
        section: '',
        version: 'v1.0',
        author: '',
        tags: '',
        documento: null as File | null
    });

    // Formulario para editar especificación
    const [editForm, setEditForm] = useState<TechnicalSpec>({
        id: '',
        specId: '',
        title: '',
        discipline: 'Mecanicas',
        subcontractor: '',
        section: '',
        version: '',
        lastUpdate: '',
        author: '',
        fileSize: '',
        tags: []
    });

    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Verificar si ya existe una especificación con el mismo ID
        const existingSpec = specs.find(s => s.specId === uploadForm.specId);
        if (existingSpec) {
            alert('Ya existe una especificación con ese ID. Por favor, usa un ID diferente.');
            return;
        }
        
        // Crear nueva especificación con ID único
        const newSpec: TechnicalSpec = {
            id: Date.now().toString(),
            specId: uploadForm.specId,
            title: uploadForm.title,
            discipline: uploadForm.discipline,
            subcontractor: uploadForm.subcontractor,
            section: uploadForm.section,
            version: uploadForm.version,
            lastUpdate: new Date().toISOString().split('T')[0],
            author: uploadForm.author,
            fileSize: uploadForm.documento ? `${(uploadForm.documento.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB',
            tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        };

        // Agregar la nueva especificación al estado
        setSpecs(prev => [...prev, newSpec]);
        
        // Cerrar modal y limpiar formulario
        setShowUploadModal(false);
        resetUploadForm();
        
        console.log('Especificación creada exitosamente:', newSpec);
    };

    const handleEdit = (spec: TechnicalSpec) => {
        setEditForm(spec);
        setShowEditModal(true);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Verificar si ya existe otra especificación con el mismo ID (excluyendo la actual)
        const existingSpec = specs.find(s => s.specId === editForm.specId && s.id !== editForm.id);
        if (existingSpec) {
            alert('Ya existe otra especificación con ese ID. Por favor, usa un ID diferente.');
            return;
        }
        
        // Actualizar la especificación en el estado
        setSpecs(prev => prev.map(spec => 
            spec.id === editForm.id ? { ...editForm, lastUpdate: new Date().toISOString().split('T')[0] } : spec
        ));
        
        setShowEditModal(false);
        console.log('Especificación editada exitosamente:', editForm);
    };

    const handleDelete = (specId: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta especificación?')) {
            setSpecs(prev => prev.filter(spec => spec.id !== specId));
            console.log('Especificación eliminada:', specId);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setUploadForm(prev => ({ ...prev, documento: file }));
    };

    const resetUploadForm = () => {
        setUploadForm({
            specId: '',
            title: '',
            discipline: 'Mecanicas',
            subcontractor: '',
            section: '',
            version: 'v1.0',
            author: '',
            tags: '',
            documento: null
        });
    };

    const filteredSpecs = specs.filter(spec => {
        const matchesSearch = spec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            spec.specId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            spec.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesDiscipline = filterDiscipline === 'all' || spec.discipline === filterDiscipline;
        
        return matchesSearch && matchesDiscipline;
    });

    const disciplines = Array.from(new Set(specs.map(s => s.discipline)));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        to="/documentacion"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Especificaciones Técnicas</h1>
                        <p className="text-gray-600">Gestión de especificaciones y estándares técnicos</p>
                    </div>
                </div>
                <button 
                    onClick={() => setShowUploadModal(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                    <Settings className="w-4 h-4" />
                    <span>Nueva Especificación</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{specs.length}</p>
                            <p className="text-sm text-gray-600">Total Especificaciones</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-500 p-2 rounded-lg">
                            <Settings className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">
                                {specs.filter(s => s.discipline === 'Mecanicas').length}
                            </p>
                            <p className="text-sm text-gray-600">Mecánicas</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-yellow-500 p-2 rounded-lg">
                            <Settings className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">
                                {specs.filter(s => s.discipline === 'Plomeria').length}
                            </p>
                            <p className="text-sm text-gray-600">Plomería</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-purple-500 p-2 rounded-lg">
                            <Settings className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">
                                {specs.filter(s => s.discipline === 'Electricas').length}
                            </p>
                            <p className="text-sm text-gray-600">Eléctricas</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar especificaciones..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <select
                            value={filterDiscipline}
                            onChange={(e) => setFilterDiscipline(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todas las disciplinas</option>
                            {disciplines.map(discipline => (
                                <option key={discipline} value={discipline}>{discipline}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Specifications List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSpecs.map((spec) => (
                    <div key={spec.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary-100 p-2 rounded-lg">
                                    <Settings className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{spec.specId}</h3>
                                    <p className="text-sm text-gray-600">{spec.section}</p>
                                </div>
                            </div>
                        </div>

                        <h4 className="text-lg font-medium text-gray-900 mb-2">{spec.title}</h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                                <span className="text-gray-500">Disciplina:</span>
                                <p className="font-medium text-gray-900">{spec.discipline}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Subcontrata:</span>
                                <p className="font-medium text-gray-900">{spec.subcontractor}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Autor:</span>
                                <p className="font-medium text-gray-900">{spec.author}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Actualizado:</span>
                                <p className="font-medium text-gray-900">{spec.lastUpdate}</p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {spec.tags.map((tag) => (
                                <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">{spec.fileSize}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button 
                                    className="text-green-600 hover:text-green-900 p-2 rounded transition-colors"
                                    title="Descargar"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => handleEdit(spec)}
                                    className="text-gray-600 hover:text-gray-900 p-2 rounded transition-colors"
                                    title="Editar"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => handleDelete(spec.id)}
                                    className="text-red-600 hover:text-red-900 p-2 rounded transition-colors"
                                    title="Eliminar"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSpecs.length === 0 && (
                <div className="text-center py-12">
                    <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron especificaciones con los filtros aplicados</p>
                </div>
            )}

            {/* Modal para Nueva Especificación */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">Nueva Especificación</h2>
                                <button
                                    onClick={() => {
                                        setShowUploadModal(false);
                                        resetUploadForm();
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleUploadSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ID Especificación <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={uploadForm.specId}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, specId: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Ej: SPEC-ELE-001"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Título <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={uploadForm.title}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Título de la especificación"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Disciplina <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={uploadForm.discipline}
                                        onChange={(e) => setUploadForm(prev => ({ 
                                            ...prev, 
                                            discipline: e.target.value as TechnicalSpec['discipline'] 
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    >
                                        <option value="Mecanicas">Mecánicas</option>
                                        <option value="Plomeria">Plomería</option>
                                        <option value="Electricas">Eléctricas</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subcontrata <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={uploadForm.subcontractor}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, subcontractor: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Nombre de la subcontrata"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Sección <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={uploadForm.section}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, section: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Ej: 26 00 00"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Autor <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={uploadForm.author}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, author: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Nombre del autor"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={uploadForm.tags}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="cables, tableros, iluminación (separados por coma)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Documento <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        accept=".pdf,.doc,.docx"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Formatos aceptados: PDF, DOC, DOCX
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowUploadModal(false);
                                            resetUploadForm();
                                        }}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                                    >
                                        <Upload className="w-4 h-4" />
                                        <span>Crear Especificación</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Editar Especificación */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">Editar Especificación</h2>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ID Especificación <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.specId}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, specId: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Título <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Disciplina <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={editForm.discipline}
                                        onChange={(e) => setEditForm(prev => ({ 
                                            ...prev, 
                                            discipline: e.target.value as TechnicalSpec['discipline'] 
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    >
                                        <option value="Mecanicas">Mecánicas</option>
                                        <option value="Plomeria">Plomería</option>
                                        <option value="Electricas">Eléctricas</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subcontrata <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.subcontractor}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, subcontractor: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Sección <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.section}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, section: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Versión <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.version}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, version: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Autor <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.author}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, author: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.tags.join(', ')}
                                        onChange={(e) => setEditForm(prev => ({ 
                                            ...prev, 
                                            tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="cables, tableros, iluminación (separados por coma)"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Guardar Cambios</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TechnicalSpecs