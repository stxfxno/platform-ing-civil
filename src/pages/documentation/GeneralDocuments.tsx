// src/pages/documentation/GeneralDocuments.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    Download,
    Calendar,
    User,
    FileText,
    Settings,
    Upload,
    Search,
    Eye,
    BarChart3,
    Filter,
    X,
    Building
} from 'lucide-react';

interface DownloadRecord {
    id: string;
    documentId: string;
    documentTitle: string;
    downloadedBy: string;
    downloadedAt: string;
    fileSize: string;
    ipAddress?: string;
    company?: string;
}

interface ModuleData {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    downloads: DownloadRecord[];
}

const mockData: ModuleData[] = [
    {
        id: 'planos',
        title: 'Control de Planos',
        description: 'Historial de descargas de planos técnicos MEP',
        icon: FileText,
        color: 'bg-blue-500',
        downloads: [
            {
                id: 'pl-001',
                documentId: 'E-001',
                documentTitle: 'Plano General Eléctrico - Piso 1',
                downloadedBy: 'Ing. Roberto Vega',
                downloadedAt: '2025-05-23T14:30:00Z',
                fileSize: '2.3 MB',
                ipAddress: '192.168.1.45',
                company: 'HVAC Solutions S.A.C.'
            },
            {
                id: 'pl-002',
                documentId: 'M-101',
                documentTitle: 'Ductos HVAC - Zona A Sótano',
                downloadedBy: 'Ing. María Santos',
                downloadedAt: '2025-05-23T13:15:00Z',
                fileSize: '1.8 MB',
                ipAddress: '192.168.1.67',
                company: 'Climatización Perú'
            },
            {
                id: 'pl-003',
                documentId: 'P-201',
                documentTitle: 'Sistema de Plomería - Piso 2',
                downloadedBy: 'Ing. Fernando Morales',
                downloadedAt: '2025-05-22T11:45:00Z',
                fileSize: '1.5 MB',
                ipAddress: '192.168.1.89',
                company: 'MEP Contractors Inc.'
            },
            {
                id: 'pl-004',
                documentId: 'FP-101',
                documentTitle: 'Sistema Contra Incendios - Área General',
                downloadedBy: 'Ing. Patricia Campos',
                downloadedAt: '2025-05-20T09:20:00Z',
                fileSize: '2.1 MB',
                ipAddress: '192.168.1.92',
                company: 'Ingeniería Térmica SAC'
            },
            {
                id: 'pl-005',
                documentId: 'E-003',
                documentTitle: 'Tableros Eléctricos - Piso 3',
                downloadedBy: 'Ing. Roberto Vega',
                downloadedAt: '2025-05-23T08:15:00Z',
                fileSize: '1.9 MB',
                ipAddress: '192.168.1.45',
                company: 'HVAC Solutions S.A.C.'
            },
            {
                id: 'pl-006',
                documentId: 'M-102',
                documentTitle: 'Instalaciones HVAC - Piso 4',
                downloadedBy: 'Ing. Carlos Mendoza',
                downloadedAt: '2025-05-22T16:30:00Z',
                fileSize: '2.7 MB',
                ipAddress: '192.168.1.78',
                company: 'Sistemas Térmicos SAC'
            },
            {
                id: 'pl-007',
                documentId: 'P-102',
                documentTitle: 'Red de Agua Fría - Toda la Edificación',
                downloadedBy: 'Ing. Ana López',
                downloadedAt: '2025-05-22T14:20:00Z',
                fileSize: '3.1 MB',
                ipAddress: '192.168.1.55',
                company: 'Plomería Industrial SAC'
            },
            {
                id: 'pl-008',
                documentId: 'E-004',
                documentTitle: 'Iluminación Exterior y Paisajismo',
                downloadedBy: 'Ing. María Santos',
                downloadedAt: '2025-05-21T10:45:00Z',
                fileSize: '1.6 MB',
                ipAddress: '192.168.1.67',
                company: 'Climatización Perú'
            },
            {
                id: 'pl-009',
                documentId: 'FP-102',
                documentTitle: 'Detección y Alarma Contra Incendios',
                downloadedBy: 'Ing. Fernando Morales',
                downloadedAt: '2025-05-21T09:30:00Z',
                fileSize: '2.4 MB',
                ipAddress: '192.168.1.89',
                company: 'MEP Contractors Inc.'
            },
            {
                id: 'pl-010',
                documentId: 'M-103',
                documentTitle: 'Ventilación Mecánica - Estacionamiento',
                downloadedBy: 'Ing. Patricia Campos',
                downloadedAt: '2025-05-20T15:45:00Z',
                fileSize: '1.7 MB',
                ipAddress: '192.168.1.92',
                company: 'Ingeniería Térmica SAC'
            },
            {
                id: 'pl-011',
                documentId: 'E-005',
                documentTitle: 'Fuerza y Tomacorrientes - Oficinas',
                downloadedBy: 'Ing. Jorge Ramírez',
                downloadedAt: '2025-05-20T11:20:00Z',
                fileSize: '2.0 MB',
                ipAddress: '192.168.1.134',
                company: 'Electro Instalaciones Perú'
            },
            {
                id: 'pl-012',
                documentId: 'P-103',
                documentTitle: 'Desagües Pluviales y Drenaje',
                downloadedBy: 'Ing. Roberto Vega',
                downloadedAt: '2025-05-19T14:15:00Z',
                fileSize: '2.8 MB',
                ipAddress: '192.168.1.45',
                company: 'HVAC Solutions S.A.C.'
            }
        ]
    },
    {
        id: 'especificaciones',
        title: 'Especificaciones Técnicas',
        description: 'Historial de descargas de especificaciones y estándares',
        icon: Settings,
        color: 'bg-green-500',
        downloads: [
            {
                id: 'sp-001',
                documentId: 'SPEC-HVAC-001',
                documentTitle: 'Especificaciones Técnicas HVAC - Sistema Principal',
                downloadedBy: 'Ing. Roberto Vega',
                downloadedAt: '2025-05-23T09:30:00Z',
                fileSize: '3.2 MB',
                ipAddress: '192.168.1.45',
                company: 'HVAC Solutions S.A.C.'
            },
            {
                id: 'sp-002',
                documentId: 'SPEC-ELE-001',
                documentTitle: 'Especificaciones para Instalaciones Eléctricas',
                downloadedBy: 'Ing. María Santos',
                downloadedAt: '2025-05-23T06:15:00Z',
                fileSize: '1.2 MB',
                ipAddress: '192.168.1.67',
                company: 'Climatización Perú'
            },
            {
                id: 'sp-003',
                documentId: 'SPEC-PLU-001',
                documentTitle: 'Especificaciones de Plomería e Instalaciones',
                downloadedBy: 'Ing. Fernando Morales',
                downloadedAt: '2025-05-22T11:45:00Z',
                fileSize: '1.5 MB',
                ipAddress: '192.168.1.89',
                company: 'MEP Contractors Inc.'
            },
            {
                id: 'sp-004',
                documentId: 'SPEC-FP-001',
                documentTitle: 'Especificaciones Sistema Contra Incendios',
                downloadedBy: 'Ing. Patricia Campos',
                downloadedAt: '2025-05-20T14:30:00Z',
                fileSize: '1.8 MB',
                ipAddress: '192.168.1.92',
                company: 'Ingeniería Térmica SAC'
            },
            {
                id: 'sp-005',
                documentId: 'SPEC-HVAC-002',
                documentTitle: 'Especificaciones Chillers y Torres de Enfriamiento',
                downloadedBy: 'Ing. Carlos Mendoza',
                downloadedAt: '2025-05-22T15:20:00Z',
                fileSize: '2.8 MB',
                ipAddress: '192.168.1.78',
                company: 'Sistemas Térmicos SAC'
            },
            {
                id: 'sp-006',
                documentId: 'SPEC-ELE-002',
                documentTitle: 'Especificaciones Tableros de Distribución',
                downloadedBy: 'Ing. Jorge Ramírez',
                downloadedAt: '2025-05-22T13:45:00Z',
                fileSize: '1.9 MB',
                ipAddress: '192.168.1.134',
                company: 'Electro Instalaciones Perú'
            },
            {
                id: 'sp-007',
                documentId: 'SPEC-PLU-002',
                documentTitle: 'Especificaciones Bombas y Equipos Hidroneumáticos',
                downloadedBy: 'Ing. Ana López',
                downloadedAt: '2025-05-21T16:30:00Z',
                fileSize: '2.4 MB',
                ipAddress: '192.168.1.55',
                company: 'Plomería Industrial SAC'
            },
            {
                id: 'sp-008',
                documentId: 'SPEC-FP-002',
                documentTitle: 'Especificaciones Rociadores y Válvulas',
                downloadedBy: 'Ing. Roberto Vega',
                downloadedAt: '2025-05-21T10:15:00Z',
                fileSize: '1.7 MB',
                ipAddress: '192.168.1.45',
                company: 'HVAC Solutions S.A.C.'
            },
            {
                id: 'sp-009',
                documentId: 'SPEC-HVAC-003',
                documentTitle: 'Especificaciones Ductos y Difusores',
                downloadedBy: 'Ing. María Santos',
                downloadedAt: '2025-05-20T12:20:00Z',
                fileSize: '2.1 MB',
                ipAddress: '192.168.1.67',
                company: 'Climatización Perú'
            },
            {
                id: 'sp-010',
                documentId: 'SPEC-ELE-003',
                documentTitle: 'Especificaciones Sistemas de Iluminación LED',
                downloadedBy: 'Ing. Fernando Morales',
                downloadedAt: '2025-05-20T08:45:00Z',
                fileSize: '1.6 MB',
                ipAddress: '192.168.1.89',
                company: 'MEP Contractors Inc.'
            },
            {
                id: 'sp-011',
                documentId: 'SPEC-PLU-003',
                documentTitle: 'Especificaciones Válvulas y Accesorios Especiales',
                downloadedBy: 'Ing. Patricia Campos',
                downloadedAt: '2025-05-19T14:50:00Z',
                fileSize: '2.0 MB',
                ipAddress: '192.168.1.92',
                company: 'Ingeniería Térmica SAC'
            },
            {
                id: 'sp-012',
                documentId: 'SPEC-HVAC-004',
                documentTitle: 'Especificaciones Control y Automatización BMS',
                downloadedBy: 'Ing. Carlos Mendoza',
                downloadedAt: '2025-05-19T11:30:00Z',
                fileSize: '3.5 MB',
                ipAddress: '192.168.1.78',
                company: 'Sistemas Térmicos SAC'
            },
            {
                id: 'sp-013',
                documentId: 'SPEC-ELE-004',
                documentTitle: 'Especificaciones UPS y Sistemas de Respaldo',
                downloadedBy: 'Ing. Jorge Ramírez',
                downloadedAt: '2025-05-18T15:40:00Z',
                fileSize: '2.3 MB',
                ipAddress: '192.168.1.134',
                company: 'Electro Instalaciones Perú'
            },
            {
                id: 'sp-014',
                documentId: 'SPEC-FP-003',
                documentTitle: 'Especificaciones Sistemas de Detección Temprana',
                downloadedBy: 'Ing. Ana López',
                downloadedAt: '2025-05-18T09:25:00Z',
                fileSize: '1.8 MB',
                ipAddress: '192.168.1.55',
                company: 'Plomería Industrial SAC'
            }
        ]
    },
    {
        id: 'submittals',
        title: 'Submittals (Entregables MEP)',
        description: 'Historial de descargas de submittals y documentos de entrega',
        icon: Upload,
        color: 'bg-purple-500',
        downloads: [
            {
                id: 'sb-001',
                documentId: 'SUB-ELE-001',
                documentTitle: 'Tableros Eléctricos Principales - Especificaciones',
                downloadedBy: 'Ing. Carlos Mendoza',
                downloadedAt: '2025-05-23T16:00:00Z',
                fileSize: '1.8 MB',
                ipAddress: '192.168.1.103',
                company: 'Electro Solutions'
            },
            {
                id: 'sb-002',
                documentId: 'SUB-HVAC-002',
                documentTitle: 'Equipos Manejadoras de Aire - Fichas Técnicas',
                downloadedBy: 'Ing. Ricardo Fernández',
                downloadedAt: '2025-05-23T14:30:00Z',
                fileSize: '3.2 MB',
                ipAddress: '192.168.1.106',
                company: 'Air Systems Corp'
            },
            {
                id: 'sb-003',
                documentId: 'SUB-PLU-003',
                documentTitle: 'Válvulas y Accesorios de Plomería - Muestras',
                downloadedBy: 'Ing. Manuel Gutiérrez',
                downloadedAt: '2025-05-23T13:15:00Z',
                fileSize: '2.5 MB',
                ipAddress: '192.168.1.107',
                company: 'Plomería Industrial'
            }
        ]
    }
];

const GeneralDocuments: React.FC = () => {
    const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showUserSummary, setShowUserSummary] = useState(false);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('es-PE'),
            time: date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const exportModuleReport = (moduleData: ModuleData) => {
        const csvContent = [
            ['Fecha', 'Hora', 'ID Documento', 'Título', 'Usuario', 'Empresa', 'Tamaño', 'IP'].join(','),
            ...moduleData.downloads.map(download => {
                const { date, time } = formatDateTime(download.downloadedAt);
                return [
                    date,
                    time,
                    download.documentId,
                    `"${download.documentTitle}"`,
                    `"${download.downloadedBy}"`,
                    `"${download.company || ''}"`,
                    download.fileSize,
                    download.ipAddress || ''
                ].join(',');
            })
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `historial_${moduleData.id}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getFilteredDownloads = (downloads: DownloadRecord[]) => {
        return downloads.filter(download => {
            return download.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   download.documentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   download.downloadedBy.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };

    const getUserSummary = (moduleData: ModuleData) => {
        const userStats: { [key: string]: { count: number; lastDownload: string; company: string } } = {};
        
        moduleData.downloads.forEach(download => {
            if (!userStats[download.downloadedBy]) {
                userStats[download.downloadedBy] = {
                    count: 0,
                    lastDownload: download.downloadedAt,
                    company: download.company || ''
                };
            }
            userStats[download.downloadedBy].count++;
            if (new Date(download.downloadedAt) > new Date(userStats[download.downloadedBy].lastDownload)) {
                userStats[download.downloadedBy].lastDownload = download.downloadedAt;
            }
        });

        return Object.entries(userStats)
            .map(([user, stats]) => ({ user, ...stats }))
            .sort((a, b) => b.count - a.count);
    };

    const closeModal = () => {
        setSelectedModule(null);
        setSearchTerm('');
        setShowUserSummary(false);
    };

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
                        <h1 className="text-2xl font-bold text-gray-900">Historial de Descargas</h1>
                        <p className="text-gray-600">Selecciona un módulo para ver su historial de descargas</p>
                    </div>
                </div>
            </div>

            {/* Overall Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen General</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mockData.map((module) => {
                        const Icon = module.icon;
                        return (
                            <div key={module.id} className="text-center p-4 bg-gray-50 rounded-lg">
                                <Icon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-gray-900">{module.downloads.length}</p>
                                <p className="text-sm text-gray-600">{module.title}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Module Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockData.map((module) => {
                    const Icon = module.icon;
                    const todayDownloads = module.downloads.filter(d => {
                        const today = new Date().toDateString();
                        return new Date(d.downloadedAt).toDateString() === today;
                    }).length;

                    const uniqueUsers = new Set(module.downloads.map(d => d.downloadedBy)).size;

                    return (
                        <div
                            key={module.id}
                            onClick={() => setSelectedModule(module)}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`${module.color} p-3 rounded-lg group-hover:scale-105 transition-transform`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">{module.downloads.length}</p>
                                    <p className="text-sm text-gray-500">descargas</p>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                {module.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {module.description}
                            </p>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-lg font-bold text-green-600">{todayDownloads}</p>
                                    <p className="text-xs text-gray-500">Hoy</p>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-lg font-bold text-blue-600">{uniqueUsers}</p>
                                    <p className="text-xs text-gray-500">Usuarios</p>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Última descarga:</span>
                                    <span className="text-gray-900">
                                        {module.downloads.length > 0 
                                            ? formatDateTime(module.downloads[0].downloadedAt).date
                                            : 'N/A'
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {selectedModule && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className={`${selectedModule.color} p-2 rounded-lg`}>
                                    <selectedModule.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Historial de Descargas</h2>
                                    <p className="text-gray-600">{selectedModule.title}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="p-6 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4 text-center">
                                    <Download className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-blue-600">{selectedModule.downloads.length}</p>
                                    <p className="text-sm text-blue-600">Total Descargas</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4 text-center">
                                    <User className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-green-600">
                                        {new Set(selectedModule.downloads.map(d => d.downloadedBy)).size}
                                    </p>
                                    <p className="text-sm text-green-600">Usuarios Únicos</p>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4 text-center">
                                    <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-purple-600">
                                        {selectedModule.downloads.length > 0 
                                            ? formatDateTime(selectedModule.downloads[0].downloadedAt).date.split('/')[0] + '/' + formatDateTime(selectedModule.downloads[0].downloadedAt).date.split('/')[1] + '/' + formatDateTime(selectedModule.downloads[0].downloadedAt).date.split('/')[2]
                                            : 'N/A'
                                        }
                                    </p>
                                    <p className="text-sm text-purple-600">Última Descarga</p>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                <div className="flex-1 max-w-md">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Buscar descargas..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => setShowUserSummary(!showUserSummary)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>{showUserSummary ? 'Ver Registro' : 'Resumen por Usuario'}</span>
                                    </button>
                                    <button
                                        onClick={() => exportModuleReport(selectedModule)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                    >
                                        <BarChart3 className="w-4 h-4" />
                                        <span>Exportar</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {showUserSummary ? (
                                // User Summary View
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen por Usuario</h3>
                                    <div className="space-y-3">
                                        {getUserSummary(selectedModule).map(({ user, count, lastDownload, company }, index) => (
                                            <div key={user} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                                                        #{index + 1}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{user}</div>
                                                        <div className="text-sm text-gray-500 flex items-center">
                                                            <Building className="w-3 h-3 mr-1" />
                                                            {company}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-blue-600">{count} descargas</div>
                                                    <div className="text-sm text-gray-500">Última: {formatDateTime(lastDownload).date}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                // Downloads Log View
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Registro de Descargas</h3>
                                    <div className="space-y-3">
                                        {getFilteredDownloads(selectedModule.downloads).map((download, index) => {
                                            const { date, time } = formatDateTime(download.downloadedAt);
                                            return (
                                                <div key={download.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                                                            #{index + 1}
                                                        </div>
                                                        <User className="w-5 h-5 text-gray-400" />
                                                        <div>
                                                            <div className="font-medium text-gray-900">{download.downloadedBy}</div>
                                                            <div className="text-sm text-gray-500 flex items-center">
                                                                <Building className="w-3 h-3 mr-1" />
                                                                {download.company}
                                                                {download.ipAddress && (
                                                                    <>
                                                                        <span className="mx-2">•</span>
                                                                        <span>IP: {download.ipAddress}</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-medium text-gray-900">{date}</div>
                                                        <div className="text-sm text-gray-500">{time}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end p-6 border-t border-gray-200">
                            <button
                                onClick={closeModal}
                                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeneralDocuments;