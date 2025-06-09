// src/pages/documentation/TechnicalSpecs.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Settings,
    Search,
    Download,
    Eye,
    Edit,
    CheckCircle,
    Clock,
    FileText,
    ArrowLeft,
    Tag
} from 'lucide-react';

interface TechnicalSpec {
    id: string;
    specId: string;
    title: string;
    discipline: string;
    section: string;
    version: string;
    status: 'draft' | 'active' | 'superseded';
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
        discipline: 'Eléctrico',
        section: '26 00 00',
        version: 'v3.2',
        status: 'active',
        lastUpdate: '2025-05-20',
        author: 'Ing. María González',
        fileSize: '1.2 MB',
        tags: ['cables', 'tableros', 'iluminación']
    },
    {
        id: '2',
        specId: 'SPEC-HVAC-001',
        title: 'Especificaciones para Sistemas HVAC',
        discipline: 'HVAC',
        section: '23 00 00',
        version: 'v2.1',
        status: 'draft',
        lastUpdate: '2025-05-22',
        author: 'Ing. Luis Torres',
        fileSize: '2.1 MB',
        tags: ['ductos', 'equipos', 'control']
    },
    {
        id: '3',
        specId: 'SPEC-PLU-001',
        title: 'Especificaciones de Plomería e Instalaciones Sanitarias',
        discipline: 'Plomería',
        section: '22 00 00',
        version: 'v1.8',
        status: 'active',
        lastUpdate: '2025-05-18',
        author: 'Ing. Ana López',
        fileSize: '1.5 MB',
        tags: ['tuberías', 'válvulas', 'accesorios']
    },
    {
        id: '4',
        specId: 'SPEC-FP-001',
        title: 'Especificaciones Sistema Contra Incendios',
        discipline: 'Protección Contra Incendios',
        section: '21 00 00',
        version: 'v2.0',
        status: 'active',
        lastUpdate: '2025-05-15',
        author: 'Ing. Sofia Ramírez',
        fileSize: '1.8 MB',
        tags: ['rociadores', 'detección', 'supresión']
    },
    {
        id: '5',
        specId: 'SPEC-ELE-002',
        title: 'Especificaciones para Sistemas de Telecomunicaciones',
        discipline: 'Telecomunicaciones',
        section: '27 00 00',
        version: 'v1.5',
        status: 'superseded',
        lastUpdate: '2025-05-10',
        author: 'Ing. Carlos Mendoza',
        fileSize: '0.9 MB',
        tags: ['fibra óptica', 'cableado', 'equipos']
    }
];

const TechnicalSpecs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDiscipline, setFilterDiscipline] = useState('all');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'draft': return 'bg-blue-100 text-blue-800';
            case 'superseded': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'draft': return <Clock className="w-4 h-4 text-blue-600" />;
            case 'superseded': return <FileText className="w-4 h-4 text-gray-600" />;
            default: return <FileText className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Activa';
            case 'draft': return 'Borrador';
            case 'superseded': return 'Superseded';
            default: return status;
        }
    };

    const filteredSpecs = mockSpecs.filter(spec => {
        const matchesSearch = spec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            spec.specId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            spec.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === 'all' || spec.status === filterStatus;
        const matchesDiscipline = filterDiscipline === 'all' || spec.discipline === filterDiscipline;
        
        return matchesSearch && matchesStatus && matchesDiscipline;
    });

    const disciplines = Array.from(new Set(mockSpecs.map(s => s.discipline)));

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
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Nueva Especificación</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-500 p-2 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">
                                {mockSpecs.filter(s => s.status === 'active').length}
                            </p>
                            <p className="text-sm text-gray-600">Especificaciones Activas</p>
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
                            <span className="text-sm text-gray-500">{spec.fileSize}</span>
                            <div className="flex items-center space-x-2">
                                <button className="text-green-600 hover:text-green-900 p-2 rounded transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                                <button className="text-gray-600 hover:text-gray-900 p-2 rounded transition-colors">
                                    <Edit className="w-4 h-4" />
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
        </div>
    );
};

export default TechnicalSpecs