// src/pages/schedules/ContractorReports.tsx
import React, { useState, useEffect } from 'react';
import {
    FileBarChart,
    Users,
    Eye,
    Filter,
    Search,
    Plus,
    X,
    Check,
    XCircle,
    MessageSquare
} from 'lucide-react';

interface ContractorReport {
    id: string;
    week: string;
    contractor: {
        name: string;
        discipline: string;
        contact: string;
    };
    overallProgress: number;
    submittedAt: string;
    submittedBy: string;
    status: 'pending' | 'submitted' | 'approved' | 'rejected';
    activities: string[];
    issues: string[];
    nextWeekPlan: string;
    requestedAt?: string;
    requestedBy?: string;
    requestMessage?: string;
}

// Datos iniciales que se cargarán la primera vez
const initialReports: ContractorReport[] = [
    {
        id: 'rep-001',
        week: '2025-05-26/2025-06-01',
        contractor: {
            name: 'HVAC Solutions S.A.C.',
            discipline: 'HVAC',
            contact: 'Ing. Ricardo Fernández'
        },
        overallProgress: 75,
        submittedAt: '2025-05-26T16:30:00Z',
        submittedBy: 'Ricardo Fernández',
        status: 'submitted',
        activities: ['Instalación ductos HVAC - Área A (75%)'],
        issues: [],
        nextWeekPlan: 'Completar instalación ductos área A y comenzar conexiones principales'
    },
    {
        id: 'rep-002',
        week: '2025-05-26/2025-06-01',
        contractor: {
            name: 'Electro Instalaciones Perú',
            discipline: 'Eléctrico',
            contact: 'Ing. Carmen Vásquez'
        },
        overallProgress: 15,
        submittedAt: '2025-05-26T18:15:00Z',
        submittedBy: 'Carmen Vásquez',
        status: 'submitted',
        activities: ['Cableado eléctrico principal - Piso 3 (15%)'],
        issues: ['Retraso en entrega de materiales', 'Problema con permisos'],
        nextWeekPlan: 'Acelerar instalación una vez recibidos materiales'
    },
    {
        id: 'rep-003',
        week: '2025-05-26/2025-06-01',
        contractor: {
            name: 'Plomería Industrial SAC',
            discipline: 'Plomería',
            contact: 'Ing. Manuel Gutiérrez'
        },
        overallProgress: 45,
        submittedAt: '2025-05-26T14:45:00Z',
        submittedBy: 'Manuel Gutiérrez',
        status: 'approved',
        activities: ['Instalación tuberías agua fría - Zona B (45%)'],
        issues: ['Interferencia con estructura'],
        nextWeekPlan: 'Replanificar ruta de tuberías según nueva coordinación'
    }
];

const statusColors = {
    'pending': 'bg-gray-100 text-gray-800',
    'submitted': 'bg-blue-100 text-blue-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800'
};

const statusLabels = {
    'pending': 'Pendiente',
    'submitted': 'Enviado',
    'approved': 'Aprobado',
    'rejected': 'Rechazado'
};

const STORAGE_KEY = 'contractor_reports_data';

const ContractorReports: React.FC = () => {
    const [reports, setReports] = useState<ContractorReport[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterContractor, setFilterContractor] = useState<string>('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState<ContractorReport | null>(null);
    const [selectedContractor, setSelectedContractor] = useState<string>('');
    const [approvalComments, setApprovalComments] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [requestMessage, setRequestMessage] = useState('');

    // Cargar datos del localStorage al montar el componente
    useEffect(() => {
        const savedReports = localStorage.getItem(STORAGE_KEY);
        if (savedReports) {
            try {
                const parsedReports = JSON.parse(savedReports);
                setReports(parsedReports);
            } catch (error) {
                console.error('Error parsing saved reports:', error);
                // Si hay error, usar datos iniciales
                setReports(initialReports);
                saveToLocalStorage(initialReports);
            }
        } else {
            // Primera vez que se carga, usar datos iniciales
            setReports(initialReports);
            saveToLocalStorage(initialReports);
        }
    }, []);

    // Función para guardar en localStorage
    const saveToLocalStorage = (reportsData: ContractorReport[]) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reportsData));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    // Actualizar localStorage cada vez que cambie el estado de reports
    useEffect(() => {
        if (reports.length > 0) {
            saveToLocalStorage(reports);
        }
    }, [reports]);

    const stats = {
        total: reports.length,
        submitted: reports.filter(r => r.status === 'submitted').length,
        pending: reports.filter(r => r.status === 'pending').length,
        approved: reports.filter(r => r.status === 'approved').length,
        rejected: reports.filter(r => r.status === 'rejected').length
    };

    const filteredReports = reports.filter(report => {
        const matchesStatus = !filterStatus || report.status === filterStatus;
        const matchesContractor = !filterContractor || report.contractor.name.toLowerCase().includes(filterContractor.toLowerCase());
        return matchesStatus && matchesContractor;
    });

    const contractors = [
        'HVAC Solutions S.A.C.',
        'Electro Instalaciones Perú',
        'Plomería Industrial SAC',
        'Fire Protection Corp.',
        'MEP Contractors Inc.',
        'Mecánica Avanzada S.A.C.',
        'Instalaciones Técnicas Perú',
        'Sistemas Integrados MEP'
    ];

    // Función para aprobar reporte - CORREGIDA
    const handleApprove = () => {
        if (!selectedReport) return;
        
        const updatedReports = reports.map(r => 
            r.id === selectedReport.id 
                ? { ...r, status: 'approved' as const }
                : r
        );
        
        setReports(updatedReports);
        setShowApprovalModal(false);
        setSelectedReport(null);
        setApprovalComments('');
        alert('Reporte aprobado correctamente');
    };

    // Función para rechazar reporte - CORREGIDA
    const handleReject = () => {
        if (!selectedReport || !rejectionReason.trim()) return;
        
        const updatedReports = reports.map(r => 
            r.id === selectedReport.id 
                ? { ...r, status: 'rejected' as const }
                : r
        );
        
        setReports(updatedReports);
        setShowRejectionModal(false);
        setSelectedReport(null);
        setRejectionReason('');
        alert('Reporte rechazado. Se notificará al subcontratista.');
    };

    // Función MEJORADA para solicitar reporte
    const handleRequestReport = () => {
        if (!selectedContractor || !requestMessage.trim()) return;
        
        // Obtener disciplina del contratista seleccionado
        const getDisciplineFromContractor = (contractorName: string) => {
            if (contractorName.includes('HVAC')) return 'HVAC';
            if (contractorName.includes('Electro')) return 'Eléctrico';
            if (contractorName.includes('Plomería')) return 'Plomería';
            if (contractorName.includes('Fire')) return 'Protección Contra Incendios';
            if (contractorName.includes('MEP') || contractorName.includes('Mecánica')) return 'Mecánico';
            return 'General';
        };

        // Obtener contacto del contratista
        const getContactFromContractor = (contractorName: string) => {
            const contacts: { [key: string]: string } = {
                'HVAC Solutions S.A.C.': 'Ing. Ricardo Fernández',
                'Electro Instalaciones Perú': 'Ing. Carmen Vásquez',
                'Plomería Industrial SAC': 'Ing. Manuel Gutiérrez',
                'Fire Protection Corp.': 'Ing. Laura Mendoza',
                'MEP Contractors Inc.': 'Ing. Pablo Morales',
                'Mecánica Avanzada S.A.C.': 'Ing. Ana Torres',
                'Instalaciones Técnicas Perú': 'Ing. Carlos Rivera',
                'Sistemas Integrados MEP': 'Ing. Sofia Campos'
            };
            return contacts[contractorName] || 'Ing. Responsable';
        };

        // Crear nuevo reporte con estado 'pending'
        const newReport: ContractorReport = {
            id: `rep-${Date.now()}`,
            week: '2025-05-26/2025-06-01', // Semana actual por defecto
            contractor: {
                name: selectedContractor,
                discipline: getDisciplineFromContractor(selectedContractor),
                contact: getContactFromContractor(selectedContractor)
            },
            overallProgress: 0,
            submittedAt: '',
            submittedBy: '',
            status: 'pending',
            activities: [],
            issues: [],
            nextWeekPlan: '',
            requestedAt: new Date().toISOString(),
            requestedBy: 'Usuario Actual', // En una app real sería el usuario autenticado
            requestMessage: requestMessage
        };

        // Agregar a la lista de reportes
        const updatedReports = [...reports, newReport];
        setReports(updatedReports);
        
        // Mostrar mensaje de confirmación
        alert(`Solicitud enviada exitosamente a ${selectedContractor}.\n\nMensaje: "${requestMessage}"\n\nEl reporte aparecerá en la lista con estado "Pendiente".`);
        
        // Limpiar formulario y cerrar modal
        setShowRequestModal(false);
        setSelectedContractor('');
        setRequestMessage('');
    };

    // Función para limpiar todos los datos (útil para testing)
    const clearAllData = () => {
        if (confirm('¿Estás seguro de que deseas limpiar todos los datos? Esta acción no se puede deshacer.')) {
            localStorage.removeItem(STORAGE_KEY);
            setReports(initialReports);
            alert('Datos limpiados. Se han restaurado los datos iniciales.');
        }
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
                        <p className="text-gray-600">Gestión de reportes semanales MEP</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => setShowRequestModal(true)}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Solicitar Reporte
                    </button>
                    {/* Botón para limpiar datos (solo para testing) */}
                    <button 
                        onClick={clearAllData}
                        className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                        title="Limpiar todos los datos"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-sm text-gray-600">Total</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
                        <p className="text-sm text-gray-600">Pendientes</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
                        <p className="text-sm text-gray-600">Enviados</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                        <p className="text-sm text-gray-600">Aprobados</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                        <p className="text-sm text-gray-600">Rechazados</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar subcontratista..."
                            value={filterContractor}
                            onChange={(e) => setFilterContractor(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                            <option value="">Todos los estados</option>
                            <option value="pending">Pendientes</option>
                            <option value="submitted">Enviados</option>
                            <option value="approved">Aprobados</option>
                            <option value="rejected">Rechazados</option>
                        </select>
                    </div>
                    <div className="text-sm text-gray-600">
                        Mostrando {filteredReports.length} de {reports.length} reportes
                    </div>
                </div>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
                {filteredReports.map((report) => (
                    <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                                <div className="p-3 bg-orange-500 rounded-lg">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{report.contractor.name}</h3>
                                        <span className="text-sm text-gray-500">{report.contractor.discipline}</span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[report.status]}`}>
                                            {statusLabels[report.status]}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Contacto:</span>
                                            <p className="font-medium">{report.contractor.contact}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Progreso:</span>
                                            <p className="font-medium">{report.overallProgress}%</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">
                                                {report.status === 'pending' ? 'Solicitado:' : 'Enviado:'}
                                            </span>
                                            <p className="font-medium">
                                                {report.status === 'pending' && report.requestedAt ? 
                                                    new Date(report.requestedAt).toLocaleDateString('es-PE') :
                                                    report.submittedAt ? 
                                                        new Date(report.submittedAt).toLocaleDateString('es-PE') : 
                                                        'Sin enviar'
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    report.status === 'approved' ? 'bg-green-500' :
                                                    report.status === 'submitted' ? 'bg-blue-500' :
                                                    report.status === 'rejected' ? 'bg-red-500' : 'bg-gray-400'
                                                }`}
                                                style={{ width: `${report.overallProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Solicitud de reporte (para reportes pendientes) */}
                                    {report.status === 'pending' && report.requestMessage && (
                                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg mb-3">
                                            <h4 className="text-sm font-medium text-orange-800 mb-1">Solicitud enviada:</h4>
                                            <p className="text-sm text-orange-700">"{report.requestMessage}"</p>
                                            {report.requestedBy && (
                                                <p className="text-xs text-orange-600 mt-1">
                                                    Solicitado por: {report.requestedBy}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Issues */}
                                    {report.issues.length > 0 && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <h4 className="text-sm font-medium text-red-800 mb-1">Problemas:</h4>
                                            <ul className="text-sm text-red-700">
                                                {report.issues.map((issue, idx) => (
                                                    <li key={idx}>• {issue}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions - Layout vertical */}
                            <div className="flex flex-col space-y-2">
                                {/* Ver detalle - siempre disponible */}
                                <button
                                    onClick={() => {
                                        setSelectedReport(report);
                                        setShowDetailModal(true);
                                    }}
                                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Ver detalle"
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                                
                                {/* Aprobar - solo si está enviado */}
                                {report.status === 'submitted' && (
                                    <button
                                        onClick={() => {
                                            setSelectedReport(report);
                                            setShowApprovalModal(true);
                                        }}
                                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                                        title="Aprobar reporte"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                )}

                                {/* Rechazar - solo si está enviado */}
                                {report.status === 'submitted' && (
                                    <button
                                        onClick={() => {
                                            setSelectedReport(report);
                                            setShowRejectionModal(true);
                                        }}
                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                                        title="Rechazar reporte"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {filteredReports.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <FileBarChart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No hay reportes que coincidan con los filtros seleccionados</p>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Detalle del Reporte</h2>
                                <button onClick={() => {
                                    setShowDetailModal(false);
                                    setSelectedReport(null);
                                }}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Subcontratista</h3>
                                <p>{selectedReport.contractor.name} - {selectedReport.contractor.discipline}</p>
                                <p className="text-sm text-gray-600">{selectedReport.contractor.contact}</p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Estado: {statusLabels[selectedReport.status]}</h3>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className={`h-3 rounded-full ${
                                            selectedReport.status === 'approved' ? 'bg-green-500' :
                                            selectedReport.status === 'submitted' ? 'bg-blue-500' :
                                            selectedReport.status === 'rejected' ? 'bg-red-500' : 'bg-gray-400'
                                        }`}
                                        style={{ width: `${selectedReport.overallProgress}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Progreso: {selectedReport.overallProgress}%</p>
                            </div>

                            {selectedReport.status === 'pending' && selectedReport.requestMessage && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Solicitud Enviada</h3>
                                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                        <p className="text-sm text-orange-800">"{selectedReport.requestMessage}"</p>
                                        <p className="text-xs text-orange-600 mt-2">
                                            Solicitado el: {selectedReport.requestedAt ? 
                                                new Date(selectedReport.requestedAt).toLocaleString('es-PE') : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {selectedReport.activities.length > 0 && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Actividades</h3>
                                    <ul className="space-y-1">
                                        {selectedReport.activities.map((activity, idx) => (
                                            <li key={idx} className="text-sm">• {activity}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedReport.issues.length > 0 && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Problemas</h3>
                                    <ul className="space-y-1">
                                        {selectedReport.issues.map((issue, idx) => (
                                            <li key={idx} className="text-sm text-red-700">• {issue}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedReport.nextWeekPlan && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Plan Próxima Semana</h3>
                                    <p className="text-sm">{selectedReport.nextWeekPlan}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Approval Modal */}
            {showApprovalModal && selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Aprobar Reporte</h2>
                            <p className="text-gray-600 mb-4">{selectedReport.contractor.name}</p>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Comentarios (opcional)
                                </label>
                                <textarea
                                    rows={3}
                                    value={approvalComments}
                                    onChange={(e) => setApprovalComments(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Comentarios de aprobación..."
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowApprovalModal(false);
                                        setSelectedReport(null);
                                        setApprovalComments('');
                                    }}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleApprove}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                                >
                                    <Check className="w-4 h-4 mr-2" />
                                    Aprobar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Rejection Modal */}
            {showRejectionModal && selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rechazar Reporte</h2>
                            <p className="text-gray-600 mb-4">{selectedReport.contractor.name}</p>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Motivo del rechazo *
                                </label>
                                <textarea
                                    rows={3}
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Explique los motivos del rechazo..."
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowRejectionModal(false);
                                        setSelectedReport(null);
                                        setRejectionReason('');
                                    }}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleReject}
                                    disabled={!rejectionReason.trim()}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center"
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Rechazar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Request Report Modal */}
            {showRequestModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Solicitar Reporte</h2>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subcontratista *
                                </label>
                                <select
                                    value={selectedContractor}
                                    onChange={(e) => setSelectedContractor(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="">Seleccionar subcontratista...</option>
                                    {contractors.map((contractor) => (
                                        <option key={contractor} value={contractor}>
                                            {contractor}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensaje *
                                </label>
                                <textarea
                                    rows={4}
                                    value={requestMessage}
                                    onChange={(e) => setRequestMessage(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Por favor envíe su reporte semanal con el progreso de las actividades MEP asignadas. Incluya información sobre avances, problemas encontrados y plan para la próxima semana."
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowRequestModal(false);
                                        setSelectedContractor('');
                                        setRequestMessage('');
                                    }}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleRequestReport}
                                    disabled={!selectedContractor || !requestMessage.trim()}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center"
                                >
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Enviar Solicitud
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Information Panel */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Reporte de Subcontratistas - Con Persistencia</h3>
                <div className="text-sm text-orange-800 space-y-3">
                    <p>
                        <strong>Sistema mejorado</strong> que guarda automáticamente todos los cambios en el navegador
                        y permite solicitar reportes que aparecen instantáneamente en la lista.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium mb-2">Funcionalidades:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• ✅ Solicitar reportes a subcontratistas</li>
                                <li>• 💾 Guardado automático en localStorage</li>
                                <li>• 👁️ Ver detalles completos del reporte</li>
                                <li>• ✅ Aprobar reportes (con comentarios)</li>
                                <li>• ❌ Rechazar reportes (con motivos)</li>
                                <li>• 📊 Estadísticas en tiempo real</li>
                                <li>• 🔍 Filtros por estado y subcontratista</li>
                                <li>• 🔄 Botón Reset para limpiar datos</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Mejoras implementadas:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Los reportes solicitados aparecen inmediatamente</li>
                                <li>• Persistencia de datos entre sesiones</li>
                                <li>• Estados visuales claros (pendiente/enviado/etc)</li>
                                <li>• Información de solicitud en reportes pendientes</li>
                                <li>• Lista expandida de subcontratistas</li>
                                <li>• Validación completa de formularios</li>
                                <li>• Interfaz responsive y moderna</li>
                                <li>• Manejo de errores robusto</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-orange-100 border border-orange-300 rounded-lg p-3 mt-4">
                        <h4 className="font-medium text-orange-900 mb-1">Cómo probar:</h4>
                        <ol className="text-sm text-orange-800 space-y-1">
                            <li>1. Haz clic en "Solicitar Reporte"</li>
                            <li>2. Selecciona un subcontratista de la lista</li>
                            <li>3. Escribe un mensaje personalizado</li>
                            <li>4. Envía la solicitud</li>
                            <li>5. Verás que aparece inmediatamente con estado "Pendiente"</li>
                            <li>6. Los datos se mantienen al recargar la página</li>
                            <li>7. Prueba aprobar/rechazar reportes con estado "Enviado"</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractorReports;