// src/pages/schedules/ContractorReports.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
    MessageSquare,
    Edit,
    Download,
    FileText,
    Trash2
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
    attachments?: string[]; // Archivos adjuntos
    requestedAt?: string;
    requestedBy?: string;
    requestMessage?: string;
    requestProblem?: string;
}

// Datos iniciales que se cargarán la primera vez
const initialReports: ContractorReport[] = [
    {
        id: 'rep-001',
        week: '2025-05-26/2025-06-01',
        contractor: {
            name: 'Fernández Mecánicas S.A.C.',
            discipline: 'Mecánicas',
            contact: 'Ing. Piero Fernández'
        },
        overallProgress: 75,
        submittedAt: '2025-05-26T16:30:00Z',
        submittedBy: 'Piero Fernández',
        status: 'submitted',
        activities: ['Instalación ductos HVAC - Área A (75%)', 'Conexiones de aire acondicionado - Piso 2 (60%)'],
        issues: [],
        nextWeekPlan: 'Completar instalación ductos área A y comenzar conexiones principales',
        attachments: ['/files/documento_prueba.docx']
    },
    {
        id: 'rep-002',
        week: '2025-05-26/2025-06-01',
        contractor: {
            name: 'Vargas Plomería Industrial',
            discipline: 'Plomería',
            contact: 'Ing. Bryan Vargas'
        },
        overallProgress: 45,
        submittedAt: '2025-05-26T14:45:00Z',
        submittedBy: 'Bryan Vargas',
        status: 'approved',
        activities: ['Instalación tuberías agua fría - Zona B (45%)', 'Sistema de desagüe - Piso 1 (30%)'],
        issues: ['Interferencia con estructura en zona B'],
        nextWeekPlan: 'Replanificar ruta de tuberías según nueva coordinación',
        attachments: ['/files/documento_prueba.docx']
    },
    {
        id: 'rep-003',
        week: '2025-05-26/2025-06-01',
        contractor: {
            name: 'Electro Instalaciones Torres',
            discipline: 'Eléctricas',
            contact: 'Ing. Carlos Torres'
        },
        overallProgress: 35,
        submittedAt: '2025-05-26T18:15:00Z',
        submittedBy: 'Carlos Torres',
        status: 'submitted',
        activities: ['Cableado eléctrico principal - Piso 3 (35%)', 'Instalación tableros eléctricos (25%)'],
        issues: ['Retraso en entrega de materiales', 'Coordinación pendiente con MEP'],
        nextWeekPlan: 'Acelerar instalación una vez recibidos materiales y coordinar interfaces',
        attachments: ['/files/documento_prueba.docx']
    },
    {
        id: 'rep-004',
        week: '2025-06-02/2025-06-08',
        contractor: {
            name: 'Fernández Mecánicas S.A.C.',
            discipline: 'Mecánicas',
            contact: 'Ing. Piero Fernández'
        },
        overallProgress: 85,
        submittedAt: '2025-06-02T17:00:00Z',
        submittedBy: 'Piero Fernández',
        status: 'approved',
        activities: ['Finalización ductos HVAC - Área A (100%)', 'Conexiones principales HVAC (70%)'],
        issues: [],
        nextWeekPlan: 'Completar conexiones y realizar pruebas de funcionamiento',
        attachments: ['/files/documento_prueba.docx']
    },
    {
        id: 'rep-005',
        week: '2025-06-02/2025-06-08',
        contractor: {
            name: 'Vargas Plomería Industrial',
            discipline: 'Plomería',
            contact: 'Ing. Bryan Vargas'
        },
        overallProgress: 60,
        submittedAt: '2025-06-02T15:30:00Z',
        submittedBy: 'Bryan Vargas',
        status: 'submitted',
        activities: ['Tuberías agua fría - Zona B completa (100%)', 'Sistema agua caliente - Inicio (20%)'],
        issues: ['Espera de aprobación para cambio de ruta'],
        nextWeekPlan: 'Continuar con sistema agua caliente según nueva ruta aprobada',
        attachments: ['/files/documento_prueba.docx']
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
    const { user } = useAuth();
    const [reports, setReports] = useState<ContractorReport[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterContractor, setFilterContractor] = useState<string>('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState<ContractorReport | null>(null);
    const [selectedContractor, setSelectedContractor] = useState<string>('');
    const [approvalComments, setApprovalComments] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [requestMessage, setRequestMessage] = useState('');
    const [requestProblem, setRequestProblem] = useState('');
    const [requestProgress, setRequestProgress] = useState(0);
    const [requestFiles, setRequestFiles] = useState<File[]>([]);
    
    // Estados para edición
    const [editProgress, setEditProgress] = useState(0);
    const [editFiles, setEditFiles] = useState<File[]>([]);
    const [editExistingFiles, setEditExistingFiles] = useState<string[]>([]);

    // Mapeo de departamentos del usuario a nombres de empresa
    const getUserContractorName = (userDepartment: string): string => {
        switch (userDepartment) {
            case 'Mecánicas':
                return 'Fernández Mecánicas S.A.C.';
            case 'Plomería':
                return 'Vargas Plomería Industrial';
            case 'Eléctricas':
                return 'Electro Instalaciones Torres';
            default:
                return '';
        }
    };

    // Filtrar reportes según el rol del usuario
    const getFilteredReportsByRole = (allReports: ContractorReport[]): ContractorReport[] => {
        console.log('Usuario actual:', user);
        console.log('Todos los reportes:', allReports);
        
        if (!user) return [];
        
        if (user.role === 'admin') {
            // El admin puede ver todos los reportes
            console.log('Usuario admin, mostrando todos los reportes');
            return allReports;
        } else if (user.role === 'subcontractor') {
            // Los subcontratistas solo pueden ver sus propios reportes
            const userContractorName = getUserContractorName(user.department);
            console.log('Usuario subcontratista:', user.department);
            console.log('Nombre de empresa esperado:', userContractorName);
            
            const filteredReports = allReports.filter(report => {
                console.log(`Comparando: "${report.contractor.name}" === "${userContractorName}"`);
                return report.contractor.name === userContractorName;
            });
            
            console.log('Reportes filtrados para subcontratista:', filteredReports);
            return filteredReports;
        }
        
        return [];
    };

    // Cargar datos del localStorage al montar el componente
    useEffect(() => {
        const savedReports = localStorage.getItem(STORAGE_KEY);
        console.log('Datos guardados en localStorage:', savedReports);
        
        if (savedReports) {
            try {
                const parsedReports = JSON.parse(savedReports);
                console.log('Reportes parseados:', parsedReports);
                // Verificar si hay datos válidos, si no usar los iniciales
                if (parsedReports && Array.isArray(parsedReports) && parsedReports.length > 0) {
                    setReports(parsedReports);
                } else {
                    console.log('No hay reportes válidos, usando datos iniciales');
                    setReports(initialReports);
                    saveToLocalStorage(initialReports);
                }
            } catch (error) {
                console.error('Error parsing saved reports:', error);
                // Si hay error, usar datos iniciales
                setReports(initialReports);
                saveToLocalStorage(initialReports);
            }
        } else {
            // Primera vez que se carga, usar datos iniciales
            console.log('Primera carga, usando datos iniciales');
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

    // Obtener reportes filtrados por rol
    const roleFilteredReports = getFilteredReportsByRole(reports);
    
    // Debug para ver los reportes filtrados por rol
    useEffect(() => {
        console.log('🔍 DEBUGGING - Usuario:', user);
        console.log('🔍 DEBUGGING - Reportes totales:', reports.length);
        console.log('🔍 DEBUGGING - Reportes filtrados por rol:', roleFilteredReports.length);
        console.log('🔍 DEBUGGING - roleFilteredReports:', roleFilteredReports);
    }, [user, reports, roleFilteredReports]);

    const stats = {
        total: roleFilteredReports.length,
        submitted: roleFilteredReports.filter(r => r.status === 'submitted').length,
        pending: roleFilteredReports.filter(r => r.status === 'pending').length,
        approved: roleFilteredReports.filter(r => r.status === 'approved').length,
        rejected: roleFilteredReports.filter(r => r.status === 'rejected').length
    };

    const filteredReports = roleFilteredReports.filter(report => {
        const matchesStatus = !filterStatus || report.status === filterStatus;
        const matchesContractor = !filterContractor || report.contractor.name.toLowerCase().includes(filterContractor.toLowerCase());
        return matchesStatus && matchesContractor;
    });

    // Obtener lista de contratistas disponibles según el rol
    const getAvailableContractors = (): string[] => {
        if (!user) return [];
        
        if (user.role === 'admin') {
            // El admin puede ver todos los contratistas
            return Array.from(new Set(reports.map(r => r.contractor.name)));
        } else if (user.role === 'subcontractor') {
            // Los subcontratistas solo ven su propia empresa
            const userContractorName = getUserContractorName(user.department);
            return userContractorName ? [userContractorName] : [];
        }
        
        return [];
    };

    const availableContractors = getAvailableContractors();

    // Lista de contratistas dinámica basada en permisos
    const contractors = availableContractors;

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
            if (contractorName.includes('Mecánicas')) return 'Mecánicas';
            if (contractorName.includes('Plomería')) return 'Plomería';
            if (contractorName.includes('Electro')) return 'Eléctricas';
            return 'General';
        };

        // Obtener contacto del contratista
        const getContactFromContractor = (contractorName: string) => {
            const contacts: { [key: string]: string } = {
                'Fernández Mecánicas S.A.C.': 'Ing. Piero Fernández',
                'Vargas Plomería Industrial': 'Ing. Bryan Vargas',
                'Electro Instalaciones Torres': 'Ing. Carlos Torres'
            };
            return contacts[contractorName] || 'Ing. Responsable';
        };

        // Procesar archivos (en una app real, aquí se subirían al servidor)
        const fileNames = requestFiles.map(file => file.name);
        const attachments = fileNames.length > 0 ? fileNames : ['/files/documento_prueba.docx'];

        // Crear nuevo reporte con estado 'submitted' (ya no 'pending')
        const newReport: ContractorReport = {
            id: `rep-${Date.now()}`,
            week: '2025-06-02/2025-06-08', // Semana actual actualizada
            contractor: {
                name: selectedContractor,
                discipline: getDisciplineFromContractor(selectedContractor),
                contact: getContactFromContractor(selectedContractor)
            },
            overallProgress: requestProgress,
            submittedAt: new Date().toISOString(),
            submittedBy: getContactFromContractor(selectedContractor),
            status: 'submitted', // Cambiado de 'pending' a 'submitted'
            activities: [],
            issues: requestProblem.trim() ? [requestProblem.trim()] : [], // Incluir problema si se proporcionó
            nextWeekPlan: '',
            attachments: attachments,
            requestedAt: new Date().toISOString(),
            requestedBy: 'Usuario Actual', // En una app real sería el usuario autenticado
            requestMessage: requestMessage,
            requestProblem: requestProblem
        };

        // Agregar a la lista de reportes
        const updatedReports = [...reports, newReport];
        setReports(updatedReports);
        saveToLocalStorage(updatedReports);
        
        // Mostrar mensaje de confirmación
        alert(`Solicitud enviada exitosamente a ${selectedContractor}.\n\nMensaje: "${requestMessage}"${requestProblem.trim() ? `\n\nProblema reportado: "${requestProblem.trim()}"` : ''}\n\nEl reporte aparece como "Enviado" y puede ser aprobado o rechazado.`);
        
        // Limpiar formulario y cerrar modal
        setShowRequestModal(false);
        setSelectedContractor('');
        setRequestMessage('');
        setRequestProblem('');
        setRequestProgress(0);
        setRequestFiles([]);
    };

    // Función para editar reporte
    const handleEditReport = () => {
        if (!selectedReport) return;
        
        // Procesar archivos nuevos
        const newFileNames = editFiles.map(file => file.name);
        const allAttachments = [...editExistingFiles, ...newFileNames];
        
        const updatedReports = reports.map(r => 
            r.id === selectedReport.id 
                ? { 
                    ...r, 
                    overallProgress: editProgress,
                    attachments: allAttachments.length > 0 ? allAttachments : ['/files/documento_prueba.docx']
                }
                : r
        );
        
        setReports(updatedReports);
        setShowEditModal(false);
        setSelectedReport(null);
        setEditProgress(0);
        setEditFiles([]);
        setEditExistingFiles([]);
        alert('Reporte actualizado correctamente');
    };

    // Función para abrir modal de edición
    const openEditModal = (report: ContractorReport) => {
        setSelectedReport(report);
        setEditProgress(report.overallProgress);
        setEditExistingFiles(report.attachments || []);
        setEditFiles([]);
        setShowEditModal(true);
    };

    // Función para limpiar todos los datos (útil para testing)
    const clearAllData = () => {
        if (confirm('¿Estás seguro de que deseas limpiar todos los datos? Esta acción no se puede deshacer.')) {
            localStorage.removeItem(STORAGE_KEY);
            setReports(initialReports);
            saveToLocalStorage(initialReports);
            alert('Datos limpiados. Se han restaurado los datos iniciales.');
        }
    };

    // Función para forzar datos iniciales (para debugging)
    const forceInitialData = () => {
        setReports(initialReports);
        saveToLocalStorage(initialReports);
        alert('Datos iniciales restaurados exitosamente');
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
                        <p className="text-gray-600">
                            Gestión de reportes semanales MEP
                            {user?.role === 'admin' ? ' - Vista Administrador' : 
                             user?.role === 'subcontractor' ? ` - ${user.department}` : ''}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {/* Botón solicitar reporte - solo para admin */}
                    {user?.role === 'admin' && (
                        <button 
                            onClick={() => setShowRequestModal(true)}
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Solicitar Reporte
                        </button>
                    )}
                    
                    {/* Botón para limpiar datos - para desarrollo */}
                    <button 
                        onClick={clearAllData}
                        className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                        title="Limpiar todos los datos"
                    >
                        Reset
                    </button>
                    
                    {/* Botón temporal para restaurar datos iniciales (debugging) */}
                    <button 
                        onClick={forceInitialData}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        title="Restaurar datos iniciales"
                    >
                        Restaurar Datos
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
                        Mostrando {filteredReports.length} de {roleFilteredReports.length} reportes
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

                                    {/* Solicitud de reporte (para reportes enviados que fueron solicitados) */}
                                    {report.status === 'submitted' && report.requestMessage && (
                                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-3">
                                            <h4 className="text-sm font-medium text-blue-800 mb-1">Reporte solicitado:</h4>
                                            <p className="text-sm text-blue-700">"{report.requestMessage}"</p>
                                            {report.requestedBy && (
                                                <p className="text-xs text-blue-600 mt-1">
                                                    Solicitado por: {report.requestedBy} el {report.requestedAt ? 
                                                        new Date(report.requestedAt).toLocaleDateString('es-PE') : 'N/A'}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Issues */}
                                    {report.issues.length > 0 && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-3">
                                            <h4 className="text-sm font-medium text-red-800 mb-1">Problemas:</h4>
                                            <ul className="text-sm text-red-700">
                                                {report.issues.map((issue, idx) => (
                                                    <li key={idx}>• {issue}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Archivos adjuntos */}
                                    {report.attachments && report.attachments.length > 0 && (
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-800 mb-2">Archivos adjuntos:</h4>
                                            <div className="space-y-1">
                                                {report.attachments.map((file, idx) => (
                                                    <div key={idx} className="flex items-center text-sm text-gray-600">
                                                        <FileText className="w-4 h-4 mr-2" />
                                                        <a 
                                                            href={file.startsWith('/') ? file : `#`}
                                                            className="text-blue-600 hover:text-blue-800 truncate"
                                                            title={file}
                                                        >
                                                            {file.includes('/') ? file.split('/').pop() : file}
                                                        </a>
                                                        <Download className="w-3 h-3 ml-1 text-gray-400" />
                                                    </div>
                                                ))}
                                            </div>
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
                                
                                {/* Editar - solo si está enviado o aprobado Y el usuario tiene permisos */}
                                {(report.status === 'submitted' || report.status === 'approved') && (
                                    (user?.role === 'admin' || 
                                     (user?.role === 'subcontractor' && report.contractor.name === getUserContractorName(user.department))
                                    )
                                ) && (
                                    <button
                                        onClick={() => openEditModal(report)}
                                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                                        title="Editar progreso y archivos"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                )}
                                
                                {/* Aprobar - solo admin y si está enviado */}
                                {report.status === 'submitted' && user?.role === 'admin' && (
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

                                {/* Rechazar - solo admin y si está enviado */}
                                {report.status === 'submitted' && user?.role === 'admin' && (
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
                        {roleFilteredReports.length === 0 ? (
                            <div>
                                <p className="text-lg font-medium mb-2">No hay reportes disponibles</p>
                                {user?.role === 'subcontractor' ? (
                                    <p className="text-sm">
                                        No se han encontrado reportes para {user.department}. 
                                        Los reportes aparecerán aquí cuando el administrador los solicite.
                                    </p>
                                ) : (
                                    <p className="text-sm">
                                        Usa el botón "Solicitar Reporte" para comenzar a gestionar reportes de subcontratistas.
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p>No hay reportes que coincidan con los filtros seleccionados</p>
                        )}
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

                            {selectedReport.status === 'submitted' && selectedReport.requestMessage && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Reporte Solicitado</h3>
                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm text-blue-800">"{selectedReport.requestMessage}"</p>
                                        <p className="text-xs text-blue-600 mt-2">
                                            Solicitado el: {selectedReport.requestedAt ? 
                                                new Date(selectedReport.requestedAt).toLocaleString('es-PE') : 'N/A'}
                                        </p>
                                        <p className="text-xs text-blue-600">
                                            Por: {selectedReport.requestedBy}
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

                            {selectedReport.attachments && selectedReport.attachments.length > 0 && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Archivos Adjuntos</h3>
                                    <div className="space-y-2">
                                        {selectedReport.attachments.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                                <div className="flex items-center text-sm">
                                                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                                                    <span className="truncate">{file.includes('/') ? file.split('/').pop() : file}</span>
                                                </div>
                                                <a 
                                                    href={file.startsWith('/') ? file : `#`}
                                                    className="text-blue-600 hover:text-blue-800 p-1"
                                                    title="Descargar archivo"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
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
                                    rows={3}
                                    value={requestMessage}
                                    onChange={(e) => setRequestMessage(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Por favor envíe su reporte semanal con el progreso de las actividades MEP asignadas."
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Problema o Incidencia (opcional)
                                </label>
                                <textarea
                                    rows={3}
                                    value={requestProblem}
                                    onChange={(e) => setRequestProblem(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Describa cualquier problema o incidencia que necesite ser reportada..."
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Si hay algún problema específico que el subcontratista debe incluir en su reporte
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Progreso Reportado (%)
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={requestProgress}
                                        onChange={(e) => setRequestProgress(parseInt(e.target.value))}
                                        className="flex-1"
                                    />
                                    <span className="text-sm font-medium text-gray-700 w-12">{requestProgress}%</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Archivos Adjuntos
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                    onChange={(e) => setRequestFiles(Array.from(e.target.files || []))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                                {requestFiles.length > 0 && (
                                    <div className="mt-2 space-y-1">
                                        {requestFiles.map((file, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-gray-600">
                                                <FileText className="w-4 h-4 mr-2" />
                                                <span className="truncate">{file.name}</span>
                                                <button
                                                    onClick={() => setRequestFiles(requestFiles.filter((_, i) => i !== idx))}
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Si no se adjuntan archivos, se incluirá un documento por defecto
                                </p>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowRequestModal(false);
                                        setSelectedContractor('');
                                        setRequestMessage('');
                                        setRequestProblem('');
                                        setRequestProgress(0);
                                        setRequestFiles([]);
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

            {/* Edit Report Modal */}
            {showEditModal && selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Editar Reporte</h2>
                                <button 
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setSelectedReport(null);
                                        setEditProgress(0);
                                        setEditFiles([]);
                                        setEditExistingFiles([]);
                                    }}
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Subcontratista</h3>
                                <p>{selectedReport.contractor.name} - {selectedReport.contractor.discipline}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Progreso (%)
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={editProgress}
                                        onChange={(e) => setEditProgress(parseInt(e.target.value))}
                                        className="flex-1"
                                    />
                                    <span className="text-sm font-medium text-gray-700 w-12">{editProgress}%</span>
                                </div>
                                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full bg-blue-500"
                                        style={{ width: `${editProgress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Archivos Existentes
                                </label>
                                {editExistingFiles.length > 0 ? (
                                    <div className="space-y-1 mb-3">
                                        {editExistingFiles.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                <div className="flex items-center text-sm">
                                                    <FileText className="w-4 h-4 mr-2" />
                                                    <span className="truncate">{file.includes('/') ? file.split('/').pop() : file}</span>
                                                </div>
                                                <button
                                                    onClick={() => setEditExistingFiles(editExistingFiles.filter((_, i) => i !== idx))}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 mb-3">No hay archivos existentes</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Agregar Nuevos Archivos
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                    onChange={(e) => setEditFiles(Array.from(e.target.files || []))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                                {editFiles.length > 0 && (
                                    <div className="mt-2 space-y-1">
                                        {editFiles.map((file, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-gray-600">
                                                <FileText className="w-4 h-4 mr-2" />
                                                <span className="truncate">{file.name}</span>
                                                <button
                                                    onClick={() => setEditFiles(editFiles.filter((_, i) => i !== idx))}
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setSelectedReport(null);
                                        setEditProgress(0);
                                        setEditFiles([]);
                                        setEditExistingFiles([]);
                                    }}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleEditReport}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContractorReports;