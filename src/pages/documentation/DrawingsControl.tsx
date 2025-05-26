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
    ArrowLeft
} from 'lucide-react';

interface Drawing {
    id: string;
    drawingNumber: string;
    title: string;
    discipline: string;
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
        discipline: 'Eléctrico',
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
        discipline: 'HVAC',
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
        discipline: 'Plomería',
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
        discipline: 'Protección Contra Incendios',
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
        discipline: 'Eléctrico',
        revision: 'Rev-01',
        revisionDate: '2025-05-15',
        status: 'superseded',
        author: 'Ing. María González',
        fileSize: '1.2 MB'
    }
];

const DrawingsControl: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDiscipline, setFilterDiscipline] = useState('all');

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

    const filteredDrawings = mockDrawings.filter(drawing => {
        const matchesSearch = drawing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            drawing.drawingNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || drawing.status === filterStatus;
        const matchesDiscipline = filterDiscipline === 'all' || drawing.discipline === filterDiscipline;
        
        return matchesSearch && matchesStatus && matchesDiscipline;
    });

    const disciplines = Array.from(new Set(mockDrawings.map(d => d.discipline)));

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
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
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
                            <p className="text-2xl font-bold text-gray-900">{mockDrawings.length}</p>
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
                                {mockDrawings.filter(d => d.status === 'approved').length}
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
                                {mockDrawings.filter(d => d.status === 'review').length}
                            </p>
                            <p className="text-sm text-gray-600">En Revisión</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <Edit className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-600">
                                {mockDrawings.filter(d => d.status === 'draft').length}
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
                                            <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="text-green-600 hover:text-green-900 p-1 rounded">
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                                                <Edit className="w-4 h-4" />
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
        </div>
    );
};

export default DrawingsControl;