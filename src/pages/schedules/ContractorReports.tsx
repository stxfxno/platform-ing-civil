// src/pages/schedules/ContractorReports.tsx
import React, { useState } from 'react';
import {
    FileBarChart,
    Users,
    Calendar,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Clock,
    Download,
    Eye,
    MessageSquare,
    Filter,
    Search,
    Plus,
    Building2,
} from 'lucide-react';

interface ContractorReport {
    id: string;
    week: string;
    contractor: {
        id: string;
        name: string;
        discipline: string;
        contact: string;
        performance: {
            onTime: number;
            quality: number;
            safety: number;
        };
    };
    activities: ActivityReport[];
    overallProgress: number;
    submittedAt: string;
    submittedBy: string;
    status: 'pending' | 'submitted' | 'reviewed' | 'approved';
    delays: DelayReport[];
    materialRequests: string[];
    safetyIncidents: SafetyIncident[];
    nextWeekPlanning: string;
}

interface ActivityReport {
    id: string;
    activityId: string;
    title: string;
    plannedProgress: number;
    actualProgress: number;
    variance: number;
    issues: string[];
    comments: string;
    photos: number;
    hoursWorked: number;
    crewSize: number;
}

interface DelayReport {
    reason: string;
    impact: string;
    mitigation: string;
    estimatedDelay: number;
}

interface SafetyIncident {
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    actionsTaken: string[];
}

const mockReports: ContractorReport[] = [
    {
        id: 'rep-001',
        week: '2025-05-26/2025-06-01',
        contractor: {
            id: 'cont-001',
            name: 'HVAC Solutions S.A.C.',
            discipline: 'HVAC',
            contact: 'Ing. Ricardo Fernández',
            performance: {
                onTime: 87,
                quality: 92,
                safety: 88
            }
        },
        activities: [
            {
                id: 'act-rep-001',
                activityId: 'HVAC-001',
                title: 'Instalación ductos HVAC - Área A',
                plannedProgress: 70,
                actualProgress: 75,
                variance: 5,
                issues: [],
                comments: 'Progreso por encima de lo planificado debido a optimización de procesos',
                photos: 8,
                hoursWorked: 52,
                crewSize: 4
            }
        ],
        overallProgress: 75,
        submittedAt: '2025-05-26T16:30:00Z',
        submittedBy: 'Ricardo Fernández',
        status: 'submitted',
        delays: [],
        materialRequests: ['Ductos galvanizados 10" - 50 metros'],
        safetyIncidents: [],
        nextWeekPlanning: 'Completar instalación ductos área A y comenzar conexiones principales'
    },
    {
        id: 'rep-002',
        week: '2025-05-26/2025-06-01',
        contractor: {
            id: 'cont-002',
            name: 'Electro Instalaciones Perú',
            discipline: 'Eléctrico',
            contact: 'Ing. Carmen Vásquez',
            performance: {
                onTime: 95,
                quality: 89,
                safety: 94
            }
        },
        activities: [
            {
                id: 'act-rep-002',
                activityId: 'ELEC-001',
                title: 'Cableado eléctrico principal - Piso 3',
                plannedProgress: 25,
                actualProgress: 15,
                variance: -10,
                issues: ['Retraso en entrega de conduit EMT', 'Problema con permisos municipales'],
                comments: 'Retraso significativo por problemas externos, coordinando solución',
                photos: 3,
                hoursWorked: 28,
                crewSize: 3
            }
        ],
        overallProgress: 15,
        submittedAt: '2025-05-26T18:15:00Z',
        submittedBy: 'Carmen Vásquez',
        status: 'reviewed',
        delays: [
            {
                reason: 'Retraso en materiales',
                impact: 'Retraso de 3-4 días en cronograma',
                mitigation: 'Proveedor alternativo contactado, entrega programada para mañana',
                estimatedDelay: 3
            }
        ],
        materialRequests: ['Conduit EMT 3/4" - 200 metros', 'Cable THW 12 AWG - 500 metros'],
        safetyIncidents: [],
        nextWeekPlanning: 'Acelerar instalación una vez recibidos materiales, trabajar horas extra si es necesario'
    },
    {
        id: 'rep-003',
        week: '2025-05-26/2025-06-01',
        contractor: {
            id: 'cont-003',
            name: 'Plomería Industrial SAC',
            discipline: 'Plomería',
            contact: 'Ing. Manuel Gutiérrez',
            performance: {
                onTime: 70,
                quality: 85,
                safety: 90
            }
        },
        activities: [
            {
                id: 'act-rep-003',
                activityId: 'PLUMB-001',
                title: 'Instalación tuberías agua fría - Zona B',
                plannedProgress: 60,
                actualProgress: 45,
                variance: -15,
                issues: ['Interferencia con estructura no prevista', 'Falta personal especializado en soldadura'],
                comments: 'Problemas técnicos requieren replanificación de ruta de tuberías',
                photos: 12,
                hoursWorked: 65,
                crewSize: 5
            }
        ],
        overallProgress: 45,
        submittedAt: '2025-05-26T14:45:00Z',
        submittedBy: 'Manuel Gutiérrez',
        status: 'approved',
        delays: [
            {
                reason: 'Interferencias estructurales',
                impact: 'Retraso estimado de 5-7 días',
                mitigation: 'Coordinación con estructurista para modificar ruta, soldador especializado en camino',
                estimatedDelay: 6
            }
        ],
        materialRequests: ['Tubería CPVC 4" - 100 metros', 'Válvulas de compuerta 4" - 8 unidades'],
        safetyIncidents: [
            {
                type: 'Incidente menor',
                severity: 'low',
                description: 'Corte menor en mano durante manipulación de tubería',
                actionsTaken: ['Atención médica inmediata', 'Refuerzo en uso de EPP', 'Capacitación adicional de seguridad']
            }
        ],
        nextWeekPlanning: 'Replanificar ruta de tuberías según nueva coordinación, incrementar equipo de trabajo'
    },
    {
        id: 'rep-004',
        week: '2025-05-26/2025-06-01',
        contractor: {
            id: 'cont-004',
            name: 'Fire Protection Corp.',
            discipline: 'Protección Contra Incendios',
            contact: 'Ing. Laura Mendoza',
            performance: {
                onTime: 90,
                quality: 96,
                safety: 92
            }
        },
        activities: [],
        overallProgress: 0,
        submittedAt: '',
        submittedBy: '',
        status: 'pending',
        delays: [],
        materialRequests: [],
        safetyIncidents: [],
        nextWeekPlanning: ''
    }
];

const disciplineColors = {
    'HVAC': 'bg-blue-500',
    'Eléctrico': 'bg-yellow-500',
    'Plomería': 'bg-green-500',
    'Protección Contra Incendios': 'bg-red-500',
    'Mecánico': 'bg-purple-500'
};

const statusColors = {
    'pending': 'bg-gray-100 text-gray-800',
    'submitted': 'bg-blue-100 text-blue-800',
    'reviewed': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800'
};

const statusLabels = {
    'pending': 'Pendiente',
    'submitted': 'Enviado',
    'reviewed': 'Revisado',
    'approved': 'Aprobado'
};

const ContractorReports: React.FC = () => {
    const [reports] = useState<ContractorReport[]>(mockReports);
    const [selectedWeek] = useState('2025-05-26/2025-06-01');
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterContractor, setFilterContractor] = useState<string>('');
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState<ContractorReport | null>(null);

    const stats = {
        total: reports.length,
        submitted: reports.filter(r => r.status === 'submitted').length,
        pending: reports.filter(r => r.status === 'pending').length,
        reviewed: reports.filter(r => r.status === 'reviewed').length,
        approved: reports.filter(r => r.status === 'approved').length,
        avgProgress: Math.round(reports.reduce((sum, r) => sum + r.overallProgress, 0) / reports.length),
        totalDelays: reports.reduce((sum, r) => sum + r.delays.length, 0)
    };

    const filteredReports = reports.filter(report => {
        const matchesStatus = !filterStatus || report.status === filterStatus;
        const matchesContractor = !filterContractor || report.contractor.name.toLowerCase().includes(filterContractor.toLowerCase());
        return matchesStatus && matchesContractor;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'submitted': return <FileBarChart className="w-4 h-4 text-blue-600" />;
            case 'reviewed': return <Eye className="w-4 h-4 text-yellow-600" />;
            case 'pending': return <Clock className="w-4 h-4 text-gray-600" />;
            default: return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const handleViewReport = (report: ContractorReport) => {
        setSelectedReport(report);
        setShowReportModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-orange-500 rounded-lg">
                        <FileBarChart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Reporte de Subcontratistas</h1>
                        <p className="text-gray-600">Reportes de avance y coordinación con subcontratistas MEP</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Todo
                    </button>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        Solicitar Reporte
                    </button>
                </div>
            </div>

            {/* Week Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <h2 className="text-lg font-semibold text-gray-900">Semana: {selectedWeek}</h2>
                    </div>
                    <div className="text-sm text-gray-500">
                        Última actualización: {new Date().toLocaleString('es-PE')}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Building2 className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-sm text-gray-600">Subcontratistas</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <FileBarChart className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
                        <p className="text-sm text-gray-600">Enviados</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
                        <p className="text-sm text-gray-600">Pendientes</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Eye className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-yellow-600">{stats.reviewed}</p>
                        <p className="text-sm text-gray-600">Revisados</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                        <p className="text-sm text-gray-600">Aprobados</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">{stats.avgProgress}%</p>
                        <p className="text-sm text-gray-600">Progreso Prom.</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-red-600">{stats.totalDelays}</p>
                        <p className="text-sm text-gray-600">Retrasos</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar subcontratista..."
                            value={filterContractor}
                            onChange={(e) => setFilterContractor(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                            <option value="">Todos los estados</option>
                            <option value="pending">Pendientes</option>
                            <option value="submitted">Enviados</option>
                            <option value="reviewed">Revisados</option>
                            <option value="approved">Aprobados</option>
                        </select>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        Mostrando {filteredReports.length} de {reports.length} reportes
                    </div>
                </div>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
                {filteredReports.map((report) => (
                    <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4 flex-1">
                                <div className={`${disciplineColors[report.contractor.discipline as keyof typeof disciplineColors]} p-3 rounded-lg`}>
                                    <Users className="w-6 h-6 text-white" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{report.contractor.name}</h3>
                                        <span className="text-sm font-medium text-gray-500">{report.contractor.discipline}</span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[report.status]}`}>
                                            {statusLabels[report.status]}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Contacto:</span>
                                            <p className="font-medium">{report.contractor.contact}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Progreso General:</span>
                                            <p className="font-medium">{report.overallProgress}%</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Actividades:</span>
                                            <p className="font-medium">{report.activities.length}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Última Actualización:</span>
                                            <p className="font-medium">
                                                {report.submittedAt ?
                                                    new Date(report.submittedAt).toLocaleDateString('es-PE', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }) : 'Sin reportar'
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">Progreso Semanal</span>
                                            <span className="text-sm font-medium">{report.overallProgress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${report.status === 'approved' ? 'bg-green-500' :
                                                        report.status === 'submitted' ? 'bg-blue-500' :
                                                            report.status === 'reviewed' ? 'bg-yellow-500' : 'bg-gray-400'
                                                    }`}
                                                style={{ width: `${report.overallProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Performance Metrics */}
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                                            <p className="text-lg font-bold text-gray-900">{report.contractor.performance.onTime}%</p>
                                            <p className="text-xs text-gray-600">Puntualidad</p>
                                        </div>
                                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                                            <p className="text-lg font-bold text-gray-900">{report.contractor.performance.quality}%</p>
                                            <p className="text-xs text-gray-600">Calidad</p>
                                        </div>
                                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                                            <p className="text-lg font-bold text-gray-900">{report.contractor.performance.safety}%</p>
                                            <p className="text-xs text-gray-600">Seguridad</p>
                                        </div>
                                    </div>

                                    {/* Issues and Delays */}
                                    {report.delays.length > 0 && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <h4 className="text-sm font-medium text-red-800 mb-2">Retrasos Reportados:</h4>
                                            <ul className="text-sm text-red-700 space-y-1">
                                                {report.delays.map((delay, idx) => (
                                                    <li key={idx}>• {delay.reason} - {delay.estimatedDelay} días</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Safety Incidents */}
                                    {report.safetyIncidents.length > 0 && (
                                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                            <h4 className="text-sm font-medium text-yellow-800 mb-2">Incidentes de Seguridad:</h4>
                                            <ul className="text-sm text-yellow-700 space-y-1">
                                                {report.safetyIncidents.map((incident, idx) => (
                                                    <li key={idx}>• {incident.type} - {incident.severity} - {incident.description}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Material Requests */}
                                    {report.materialRequests.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Solicitudes de Material:</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {report.materialRequests.map((material, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                        {material}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col space-y-2">
                                {getStatusIcon(report.status)}
                                <button
                                    onClick={() => handleViewReport(report)}
                                    className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm flex items-center"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Ver Detalle
                                </button>
                                {report.status === 'submitted' && (
                                    <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                                        Aprobar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Report Detail Modal */}
            {showReportModal && selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Reporte Detallado</h2>
                                    <p className="text-gray-600">{selectedReport.contractor.name} - {selectedReport.week}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[selectedReport.status]}`}>
                                    {statusLabels[selectedReport.status]}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Activities Detail */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividades Reportadas</h3>
                                <div className="space-y-4">
                                    {selectedReport.activities.map((activity) => (
                                        <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                                                <span className="text-sm font-medium text-gray-500">{activity.activityId}</span>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Progreso Planificado:</span>
                                                    <p className="font-medium">{activity.plannedProgress}%</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Progreso Real:</span>
                                                    <p className="font-medium">{activity.actualProgress}%</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Variación:</span>
                                                    <p className={`font-medium ${activity.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {activity.variance > 0 ? '+' : ''}{activity.variance}%
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Horas Trabajadas:</span>
                                                    <p className="font-medium">{activity.hoursWorked}h</p>
                                                </div>
                                            </div>

                                            {/* Progress Bars */}
                                            <div className="space-y-2 mb-3">
                                                <div>
                                                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                        <span>Planificado</span>
                                                        <span>{activity.plannedProgress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-gray-400 h-2 rounded-full" style={{ width: `${activity.plannedProgress}%` }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                        <span>Real</span>
                                                        <span>{activity.actualProgress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full ${activity.variance >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                                            style={{ width: `${activity.actualProgress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {activity.comments && (
                                                <div className="bg-gray-50 rounded-lg p-3">
                                                    <h5 className="text-sm font-medium text-gray-700 mb-1">Comentarios:</h5>
                                                    <p className="text-sm text-gray-600">{activity.comments}</p>
                                                </div>
                                            )}

                                            {activity.issues.length > 0 && (
                                                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                    <h5 className="text-sm font-medium text-red-800 mb-1">Problemas:</h5>
                                                    <ul className="text-sm text-red-700 space-y-1">
                                                        {activity.issues.map((issue, idx) => (
                                                            <li key={idx}>• {issue}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Performance Summary */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluación de Desempeño</h3>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">{selectedReport.contractor.performance.onTime}%</div>
                                        <div className="text-sm text-gray-600 mb-2">Puntualidad</div>
                                        <div className="w-full bg-blue-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${selectedReport.contractor.performance.onTime}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-3xl font-bold text-green-600 mb-2">{selectedReport.contractor.performance.quality}%</div>
                                        <div className="text-sm text-gray-600 mb-2">Calidad</div>
                                        <div className="w-full bg-green-200 rounded-full h-2">
                                            <div
                                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${selectedReport.contractor.performance.quality}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                        <div className="text-3xl font-bold text-yellow-600 mb-2">{selectedReport.contractor.performance.safety}%</div>
                                        <div className="text-sm text-gray-600 mb-2">Seguridad</div>
                                        <div className="w-full bg-yellow-200 rounded-full h-2">
                                            <div
                                                className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${selectedReport.contractor.performance.safety}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delays Detail */}
                            {selectedReport.delays.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis de Retrasos</h3>
                                    <div className="space-y-4">
                                        {selectedReport.delays.map((delay, idx) => (
                                            <div key={idx} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="font-medium text-red-900 mb-2">Causa del Retraso</h4>
                                                        <p className="text-red-800">{delay.reason}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-red-900 mb-2">Impacto Estimado</h4>
                                                        <p className="text-red-800">{delay.impact}</p>
                                                        <span className="inline-block mt-1 px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full">
                                                            {delay.estimatedDelay} días de retraso
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <h4 className="font-medium text-red-900 mb-2">Plan de Mitigación</h4>
                                                    <p className="text-red-800">{delay.mitigation}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Safety Incidents Detail */}
                            {selectedReport.safetyIncidents.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Incidentes de Seguridad</h3>
                                    <div className="space-y-4">
                                        {selectedReport.safetyIncidents.map((incident, idx) => (
                                            <div key={idx} className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="font-medium text-yellow-900">{incident.type}</h4>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${incident.severity === 'high' ? 'bg-red-200 text-red-800' :
                                                            incident.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                                                                'bg-green-200 text-green-800'
                                                        }`}>
                                                        {incident.severity === 'high' ? 'Alto' :
                                                            incident.severity === 'medium' ? 'Medio' : 'Bajo'}
                                                    </span>
                                                </div>
                                                <p className="text-yellow-800 mb-3">{incident.description}</p>
                                                <div>
                                                    <h5 className="font-medium text-yellow-900 mb-2">Acciones Tomadas:</h5>
                                                    <ul className="text-yellow-800 space-y-1">
                                                        {incident.actionsTaken.map((action, actionIdx) => (
                                                            <li key={actionIdx}>• {action}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Material Requests Detail */}
                            {selectedReport.materialRequests.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Solicitudes de Materiales</h3>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedReport.materialRequests.map((material, idx) => (
                                                <div key={idx} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <span className="text-blue-800">{material}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Next Week Planning */}
                            {selectedReport.nextWeekPlanning && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Planificación Próxima Semana</h3>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <p className="text-blue-800">{selectedReport.nextWeekPlanning}</p>
                                    </div>
                                </div>
                            )}

                            {/* Report Metadata */}
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Información del Reporte</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Enviado por:</span>
                                        <p className="font-medium">{selectedReport.submittedBy}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Fecha de envío:</span>
                                        <p className="font-medium">
                                            {new Date(selectedReport.submittedAt).toLocaleDateString('es-PE', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Contacto:</span>
                                        <p className="font-medium">{selectedReport.contractor.contact}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Estado:</span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[selectedReport.status]}`}>
                                            {statusLabels[selectedReport.status]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cerrar
                            </button>
                            {selectedReport.status === 'submitted' && (
                                <>
                                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                                        Solicitar Correcciones
                                    </button>
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                        Aprobar Reporte
                                    </button>
                                </>
                            )}
                            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center">
                                <Download className="w-4 h-4 mr-2" />
                                Exportar PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {/* This would be implemented for contractors to upload their reports */}

            {/* Quick Actions */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Acciones Rápidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button className="flex items-center p-3 bg-white rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                        <MessageSquare className="w-5 h-5 text-orange-600 mr-3" />
                        <span className="text-sm font-medium text-orange-900">Enviar Recordatorio</span>
                    </button>
                    <button className="flex items-center p-3 bg-white rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                        <Calendar className="w-5 h-5 text-orange-600 mr-3" />
                        <span className="text-sm font-medium text-orange-900">Programar Reunión</span>
                    </button>
                    <button className="flex items-center p-3 bg-white rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                        <FileBarChart className="w-5 h-5 text-orange-600 mr-3" />
                        <span className="text-sm font-medium text-orange-900">Generar Consolidado</span>
                    </button>
                    <button className="flex items-center p-3 bg-white rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                        <TrendingUp className="w-5 h-5 text-orange-600 mr-3" />
                        <span className="text-sm font-medium text-orange-900">Análisis de Tendencias</span>
                    </button>
                </div>
            </div>

            {/* Information Panel */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Sistema de Reportes de Subcontratistas</h3>
                <div className="text-sm text-orange-800 space-y-3">
                    <p>
                        <strong>Reporte de Subcontratistas</strong> facilita la comunicación directa con los subcontratistas MEP
                        para el reporte de avance, identificación de problemas y coordinación de actividades semanales.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium mb-2">Funcionalidades de reporte:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Formularios de reporte estandarizados</li>
                                <li>• Seguimiento de progreso por actividad</li>
                                <li>• Documentación de problemas y retrasos</li>
                                <li>• Solicitudes de materiales y recursos</li>
                                <li>• Registro de incidentes de seguridad</li>
                                <li>• Planificación de próximas actividades</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Beneficios de comunicación:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Comunicación directa y estructurada</li>
                                <li>• Transparencia en el avance real</li>
                                <li>• Identificación temprana de problemas</li>
                                <li>• Mejora en la coordinación general</li>
                                <li>• Histórico completo de reportes</li>
                                <li>• Evaluación de desempeño objetiva</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractorReports;