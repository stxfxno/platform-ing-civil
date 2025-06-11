// src/pages/documentation/DrawingsControl.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FileText,
    Search,
    Download,
    Eye,
    Edit,
    CheckCircle,
    Clock,
    AlertCircle,
    ArrowLeft,
    Upload,
    X,
    Save,
    Trash2
} from 'lucide-react';
import { downloadFile, previewFile } from '../../utils/fileUtils'; //canPreviewInBrowser

interface Drawing {
    id: string;
    drawingNumber: string;
    title: string;
    discipline: 'Mecanicas' | 'Plomeria' | 'Electricas';
    subcontractor: string;
    revision: string;
    revisionDate: string;
    status: 'draft' | 'review' | 'approved' | 'superseded';
    author: string;
    fileSize: string;
}

const mockDrawings: Drawing[] = [
    {
        id: '1',
        drawingNumber: 'E-001',
        title: 'Plano General Eléctrico - Piso 1',
        discipline: 'Electricas',
        subcontractor: 'Electro Instalaciones SAC',
        revision: 'Rev-03',
        revisionDate: '2025-05-20',
        status: 'approved',
        author: 'Ing. María González',
        fileSize: '2.3 MB'
    },
    {
        id: '2',
        drawingNumber: 'M-101',
        title: 'Ductos HVAC - Zona A Sótano',
        discipline: 'Mecanicas',
        subcontractor: 'Climatización Total SAC',
        revision: 'Rev-02',
        revisionDate: '2025-05-22',
        status: 'review',
        author: 'Ing. Luis Torres',
        fileSize: '1.8 MB'
    },
    {
        id: '3',
        drawingNumber: 'P-201',
        title: 'Sistema de Plomería - Piso 2',
        discipline: 'Plomeria',
        subcontractor: 'Plomería Industrial EIRL',
        revision: 'Rev-01',
        revisionDate: '2025-05-19',
        status: 'draft',
        author: 'Ing. Ana López',
        fileSize: '1.5 MB'
    },
    {
        id: '4',
        drawingNumber: 'FP-101',
        title: 'Sistema Contra Incendios - Área General',
        discipline: 'Mecanicas',
        subcontractor: 'Protección Contra Incendios SAC',
        revision: 'Rev-02',
        revisionDate: '2025-05-18',
        status: 'approved',
        author: 'Ing. Sofia Ramírez',
        fileSize: '2.1 MB'
    },
    {
        id: '5',
        drawingNumber: 'E-003',
        title: 'Tableros Eléctricos - Piso 3',
        discipline: 'Electricas',
        subcontractor: 'Electro Instalaciones SAC',
        revision: 'Rev-01',
        revisionDate: '2025-05-15',
        status: 'superseded',
        author: 'Ing. María González',
        fileSize: '1.2 MB'
    }
];

const DrawingsControl: React.FC = () => {
    // Estado para los planos (copia local de mockDrawings que se puede modificar)
    const [drawings, setDrawings] = useState<Drawing[]>(mockDrawings);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDiscipline, setFilterDiscipline] = useState('all');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    // Formulario para subir plano
    const [uploadForm, setUploadForm] = useState({
        discipline: 'Mecanicas' as Drawing['discipline'],
        subcontractor: '',
        fecha: '',
        author: '',
        documento: null as File | null,
        drawingNumber: '',
        title: '',
        revision: 'Rev-01'
    });

    // Formulario para editar plano
    const [editForm, setEditForm] = useState<Drawing>({
        id: '',
        drawingNumber: '',
        title: '',
        discipline: 'Mecanicas',
        subcontractor: '',
        revision: '',
        revisionDate: '',
        status: 'draft',
        author: '',
        fileSize: ''
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'review': return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'draft': return <Edit className="w-4 h-4 text-blue-600" />;
            case 'superseded': return <AlertCircle className="w-4 h-4 text-gray-600" />;
            default: return <FileText className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'review': return 'bg-yellow-100 text-yellow-800';
            case 'draft': return 'bg-blue-100 text-blue-800';
            case 'superseded': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'approved': return 'Aprobado';
            case 'review': return 'En Revisión';
            case 'draft': return 'Borrador';
            case 'superseded': return 'Superseded';
            default: return status;
        }
    };

    const handleDownload = (drawing: Drawing) => {
        // Usar el archivo de prueba para todas las descargas
        downloadFile('documento_prueba.docx', `${drawing.drawingNumber}_${drawing.title}.docx`);
    };

    const handlePreview = (drawing: Drawing) => {
        // Usar la nueva función de vista previa que no descarga permanentemente
        previewFile('documento_prueba.docx', `${drawing.drawingNumber} - ${drawing.title}`);
    };

    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Verificar si ya existe un plano con el mismo número
        const existingDrawing = drawings.find(d => d.drawingNumber === uploadForm.drawingNumber);
        if (existingDrawing) {
            alert('Ya existe un plano con ese número. Por favor, usa un número diferente.');
            return;
        }
        
        // Crear nuevo plano con ID único
        const newDrawing: Drawing = {
            id: Date.now().toString(),
            drawingNumber: uploadForm.drawingNumber,
            title: uploadForm.title,
            discipline: uploadForm.discipline,
            subcontractor: uploadForm.subcontractor,
            revision: uploadForm.revision,
            revisionDate: uploadForm.fecha,
            status: 'draft',
            author: uploadForm.author,
            fileSize: uploadForm.documento ? `${(uploadForm.documento.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB'
        };

        // Agregar el nuevo plano al estado
        setDrawings(prev => [...prev, newDrawing]);
        
        // Cerrar modal y limpiar formulario
        setShowUploadModal(false);
        resetUploadForm();
        
        console.log('Plano subido exitosamente:', newDrawing);
    };

    const handleEdit = (drawing: Drawing) => {
        setEditForm(drawing);
        setShowEditModal(true);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Verificar si ya existe un plano con el mismo número (excluyendo el actual)
        const existingDrawing = drawings.find(d => d.drawingNumber === editForm.drawingNumber && d.id !== editForm.id);
        if (existingDrawing) {
            alert('Ya existe otro plano con ese número. Por favor, usa un número diferente.');
            return;
        }
        
        // Actualizar el plano en el estado
        setDrawings(prev => prev.map(drawing => 
            drawing.id === editForm.id ? editForm : drawing
        ));
        
        setShowEditModal(false);
        console.log('Plano editado exitosamente:', editForm);
    };

    const handleDelete = (drawingId: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este plano?')) {
            setDrawings(prev => prev.filter(drawing => drawing.id !== drawingId));
            console.log('Plano eliminado:', drawingId);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setUploadForm(prev => ({ ...prev, documento: file }));
    };

    const resetUploadForm = () => {
        setUploadForm({
            discipline: 'Mecanicas',
            subcontractor: '',
            fecha: '',
            author: '',
            documento: null,
            drawingNumber: '',
            title: '',
            revision: 'Rev-01'
        });
    };

    const filteredDrawings = drawings.filter(drawing => {
        const matchesSearch = drawing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            drawing.drawingNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || drawing.status === filterStatus;
        const matchesDiscipline = filterDiscipline === 'all' || drawing.discipline === filterDiscipline;
        
        return matchesSearch && matchesStatus && matchesDiscipline;
    });

    const disciplines = Array.from(new Set(drawings.map(d => d.discipline)));

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
                        <h1 className="text-2xl font-bold text-gray-900">Control de Planos</h1>
                        <p className="text-gray-600">Gestión y control de versiones de planos técnicos MEP</p>
                    </div>
                </div>
                <button 
                    onClick={() => setShowUploadModal(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                    <FileText className="w-4 h-4" />
                    <span>Subir Plano</span>
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
                            <p className="text-2xl font-bold text-gray-900">{drawings.length}</p>
                            <p className="text-sm text-gray-600">Total Planos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-500 p-2 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">
                                {drawings.filter(d => d.status === 'approved').length}
                            </p>
                            <p className="text-sm text-gray-600">Aprobados</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-yellow-500 p-2 rounded-lg">
                            <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">
                                {drawings.filter(d => d.status === 'review').length}
                            </p>
                            <p className="text-sm text-gray-600">En Revisión</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gray-500 p-2 rounded-lg">
                            <Edit className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-600">
                                {drawings.filter(d => d.status === 'draft').length}
                            </p>
                            <p className="text-sm text-gray-600">Borradores</p>
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
                                placeholder="Buscar planos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="approved">Aprobado</option>
                            <option value="review">En Revisión</option>
                            <option value="draft">Borrador</option>
                            <option value="superseded">Superseded</option>
                        </select>

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

            {/* Drawings Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Plano
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Disciplina
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subcontrata
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Revisión
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Autor
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredDrawings.map((drawing) => (
                                <tr key={drawing.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <FileText className="w-8 h-8 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {drawing.drawingNumber}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {drawing.title}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {drawing.fileSize}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {drawing.discipline}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {drawing.subcontractor}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{drawing.revision}</div>
                                        <div className="text-xs text-gray-500">{drawing.revisionDate}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(drawing.status)}`}>
                                            {getStatusIcon(drawing.status)}
                                            <span className="ml-1">{getStatusLabel(drawing.status)}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {drawing.author}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button 
                                                onClick={() => handlePreview(drawing)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                                                title="Vista previa"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDownload(drawing)}
                                                className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                                                title="Descargar"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(drawing)}
                                                className="text-gray-600 hover:text-gray-900 p-1 rounded transition-colors"
                                                title="Editar"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(drawing.id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredDrawings.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No se encontraron planos con los filtros aplicados</p>
                    </div>
                )}
            </div>

            {/* Modal para Subir Plano */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">Subir Plano</h2>
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
                                        Disciplina <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={uploadForm.discipline}
                                        onChange={(e) => setUploadForm(prev => ({ 
                                            ...prev, 
                                            discipline: e.target.value as Drawing['discipline'] 
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
                                        Fecha <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={uploadForm.fecha}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, fecha: e.target.value }))}
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
                                        value={uploadForm.author}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, author: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Nombre del autor"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Número de Plano <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={uploadForm.drawingNumber}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, drawingNumber: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Ej: E-001"
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
                                        placeholder="Título del plano"
                                        required
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
                                        accept=".pdf,.dwg,.dxf"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Formatos aceptados: PDF, DWG, DXF
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
                                        <span>Subir Plano</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Editar Plano */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">Editar Plano</h2>
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
                                        Número de Plano <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.drawingNumber}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, drawingNumber: e.target.value }))}
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
                                            discipline: e.target.value as Drawing['discipline'] 
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
                                        Revisión <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.revision}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, revision: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha de Revisión <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={editForm.revisionDate}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, revisionDate: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Estado <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={editForm.status}
                                        onChange={(e) => setEditForm(prev => ({ 
                                            ...prev, 
                                            status: e.target.value as Drawing['status'] 
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                    >
                                        <option value="draft">Borrador</option>
                                        <option value="review">En Revisión</option>
                                        <option value="approved">Aprobado</option>
                                        <option value="superseded">Superseded</option>
                                    </select>
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

export default DrawingsControl;