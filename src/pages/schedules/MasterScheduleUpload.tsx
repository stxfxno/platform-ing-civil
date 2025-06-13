// src/pages/schedules/MasterScheduleUpload.tsx
import React, { useState } from 'react';
import {
    Upload,
    FileText,
    Calendar,
    AlertCircle,
    CheckCircle,
    Download,
    RefreshCw,
    Target,
    Clock,
    Edit,
    History,
    Users,
    Building,
    X,
    Globe
} from 'lucide-react';

interface DownloadRecord {
    id: string;
    userId: string;
    userName: string;
    userCompany: string;
    downloadDate: string;
    ipAddress?: string;
}

interface UploadedFile {
    name: string;
    size: number;
    type: string;
    uploadDate: string;
    status: 'uploading' | 'processing' | 'completed' | 'error';
    activities?: number;
    duration?: number;
    contractor?: string;
    discipline?: string;
    downloadCount?: number;
    downloadHistory?: DownloadRecord[];
    lastUpdated?: string;
    version?: string;
}

const MasterScheduleUpload: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
        {
            name: 'Cronograma_General_Master_v3.2.mpp',
            size: 2048000,
            type: 'application/vnd.ms-project',
            uploadDate: '2025-06-01',
            status: 'completed',
            activities: 247,
            duration: 180,
            contractor: 'Proyecto General',
            discipline: 'General',
            downloadCount: 15,
            lastUpdated: '2025-06-01T14:30:00Z',
            version: '3.2',
            downloadHistory: [
                {
                    id: 'dl-001',
                    userId: 'user-001',
                    userName: 'Ing. Carlos Mendoza',
                    userCompany: 'HVAC Solutions S.A.C.',
                    downloadDate: '2025-06-07T10:30:00Z',
                    ipAddress: '192.168.1.105'
                },
                {
                    id: 'dl-002',
                    userId: 'user-002',
                    userName: 'Ing. María Santos',
                    userCompany: 'Electro Instalaciones Perú',
                    downloadDate: '2025-06-06T16:45:00Z',
                    ipAddress: '192.168.1.108'
                },
                {
                    id: 'dl-003',
                    userId: 'user-003',
                    userName: 'Ing. Alberto Silva',
                    userCompany: 'Plomería Industrial SAC',
                    downloadDate: '2025-06-05T09:15:00Z',
                    ipAddress: '192.168.1.110'
                },
                {
                    id: 'dl-004',
                    userId: 'user-004',
                    userName: 'Arq. Patricia Rojas',
                    userCompany: 'Constructora Lima Norte',
                    downloadDate: '2025-06-04T14:20:00Z',
                    ipAddress: '192.168.1.112'
                },
                {
                    id: 'dl-005',
                    userId: 'user-005',
                    userName: 'Ing. Fernando Vargas',
                    userCompany: 'Fire Protection Corp.',
                    downloadDate: '2025-06-03T11:00:00Z',
                    ipAddress: '192.168.1.115'
                },
                {
                    id: 'dl-006',
                    userId: 'user-006',
                    userName: 'Ing. Andrea López',
                    userCompany: 'HVAC Solutions S.A.C.',
                    downloadDate: '2025-06-02T08:30:00Z',
                    ipAddress: '192.168.1.105'
                },
                {
                    id: 'dl-007',
                    userId: 'user-007',
                    userName: 'Ing. Roberto Chang',
                    userCompany: 'Supervisión Técnica',
                    downloadDate: '2025-06-01T15:45:00Z',
                    ipAddress: '192.168.1.120'
                },
                {
                    id: 'dl-008',
                    userId: 'user-002',
                    userName: 'Ing. María Santos',
                    userCompany: 'Electro Instalaciones Perú',
                    downloadDate: '2025-05-31T13:20:00Z',
                    ipAddress: '192.168.1.108'
                },
                {
                    id: 'dl-009',
                    userId: 'user-008',
                    userName: 'Ing. Luis Herrera',
                    userCompany: 'Consultores Estructurales',
                    downloadDate: '2025-05-30T10:15:00Z',
                    ipAddress: '192.168.1.125'
                },
                {
                    id: 'dl-010',
                    userId: 'user-009',
                    userName: 'Ing. Carmen Soto',
                    userCompany: 'Gerencia de Proyecto',
                    downloadDate: '2025-05-29T16:30:00Z',
                    ipAddress: '192.168.1.130'
                },
                {
                    id: 'dl-011',
                    userId: 'user-001',
                    userName: 'Ing. Carlos Mendoza',
                    userCompany: 'HVAC Solutions S.A.C.',
                    downloadDate: '2025-05-28T09:45:00Z',
                    ipAddress: '192.168.1.105'
                },
                {
                    id: 'dl-012',
                    userId: 'user-010',
                    userName: 'Ing. Diego Morales',
                    userCompany: 'Inspección y Control',
                    downloadDate: '2025-05-27T12:10:00Z',
                    ipAddress: '192.168.1.135'
                },
                {
                    id: 'dl-013',
                    userId: 'user-003',
                    userName: 'Ing. Alberto Silva',
                    userCompany: 'Plomería Industrial SAC',
                    downloadDate: '2025-05-26T14:50:00Z',
                    ipAddress: '192.168.1.110'
                },
                {
                    id: 'dl-014',
                    userId: 'user-011',
                    userName: 'Ing. Sofía Ramírez',
                    userCompany: 'Control de Calidad',
                    downloadDate: '2025-05-25T11:25:00Z',
                    ipAddress: '192.168.1.140'
                },
                {
                    id: 'dl-015',
                    userId: 'user-007',
                    userName: 'Ing. Roberto Chang',
                    userCompany: 'Supervisión Técnica',
                    downloadDate: '2025-05-24T08:00:00Z',
                    ipAddress: '192.168.1.120'
                }
            ]
        },
        {
            name: 'Cronograma_HVAC_Solutions_v2.1.mpp',
            size: 1536000,
            type: 'application/vnd.ms-project',
            uploadDate: '2025-05-28',
            status: 'completed',
            activities: 98,
            duration: 120,
            contractor: 'HVAC Solutions S.A.C.',
            discipline: 'HVAC',
            downloadCount: 8,
            lastUpdated: '2025-05-28T11:20:00Z',
            version: '2.1',
            downloadHistory: [
                {
                    id: 'dl-h001',
                    userId: 'user-004',
                    userName: 'Ing. Jorge Ramírez',
                    userCompany: 'Fire Protection Corp.',
                    downloadDate: '2025-06-07T14:20:00Z',
                    ipAddress: '192.168.1.112'
                },
                {
                    id: 'dl-h002',
                    userId: 'user-001',
                    userName: 'Ing. Carlos Mendoza',
                    userCompany: 'HVAC Solutions S.A.C.',
                    downloadDate: '2025-06-06T08:30:00Z',
                    ipAddress: '192.168.1.105'
                },
                {
                    id: 'dl-h003',
                    userId: 'user-012',
                    userName: 'Arq. Claudia Vega',
                    userCompany: 'Supervisión Arquitectónica',
                    downloadDate: '2025-06-05T15:45:00Z',
                    ipAddress: '192.168.1.145'
                },
                {
                    id: 'dl-h004',
                    userId: 'user-013',
                    userName: 'Ing. Manuel Torres',
                    userCompany: 'Control de Obra',
                    downloadDate: '2025-06-04T10:15:00Z',
                    ipAddress: '192.168.1.150'
                },
                {
                    id: 'dl-h005',
                    userId: 'user-001',
                    userName: 'Ing. Carlos Mendoza',
                    userCompany: 'HVAC Solutions S.A.C.',
                    downloadDate: '2025-06-03T09:20:00Z',
                    ipAddress: '192.168.1.105'
                },
                {
                    id: 'dl-h006',
                    userId: 'user-014',
                    userName: 'Ing. Patricia Moreno',
                    userCompany: 'Inspección Técnica',
                    downloadDate: '2025-06-02T16:30:00Z',
                    ipAddress: '192.168.1.155'
                },
                {
                    id: 'dl-h007',
                    userId: 'user-015',
                    userName: 'Ing. Andrés Castillo',
                    userCompany: 'Gerencia de Proyecto',
                    downloadDate: '2025-06-01T11:10:00Z',
                    ipAddress: '192.168.1.160'
                },
                {
                    id: 'dl-h008',
                    userId: 'user-004',
                    userName: 'Ing. Jorge Ramírez',
                    userCompany: 'Fire Protection Corp.',
                    downloadDate: '2025-05-31T14:45:00Z',
                    ipAddress: '192.168.1.112'
                }
            ]
        },
        {
            name: 'Cronograma_Electro_Instalaciones_v1.8.xml',
            size: 1024000,
            type: 'application/xml',
            uploadDate: '2025-05-25',
            status: 'completed',
            activities: 89,
            duration: 95,
            contractor: 'Electro Instalaciones Perú',
            discipline: 'Eléctrico',
            downloadCount: 12,
            lastUpdated: '2025-05-25T16:00:00Z',
            version: '1.8',
            downloadHistory: [
                {
                    id: 'dl-e001',
                    userId: 'user-002',
                    userName: 'Ing. María Santos',
                    userCompany: 'Electro Instalaciones Perú',
                    downloadDate: '2025-06-07T11:45:00Z',
                    ipAddress: '192.168.1.108'
                },
                {
                    id: 'dl-e002',
                    userId: 'user-005',
                    userName: 'Ing. Roberto Díaz',
                    userCompany: 'Construcciones Mayhua',
                    downloadDate: '2025-06-05T13:20:00Z',
                    ipAddress: '192.168.1.115'
                },
                {
                    id: 'dl-e003',
                    userId: 'user-016',
                    userName: 'Ing. Elena García',
                    userCompany: 'Supervisión Eléctrica',
                    downloadDate: '2025-06-04T09:30:00Z',
                    ipAddress: '192.168.1.165'
                },
                {
                    id: 'dl-e004',
                    userId: 'user-017',
                    userName: 'Téc. Miguel Fernández',
                    userCompany: 'Instalaciones Especiales',
                    downloadDate: '2025-06-03T14:15:00Z',
                    ipAddress: '192.168.1.170'
                },
                {
                    id: 'dl-e005',
                    userId: 'user-002',
                    userName: 'Ing. María Santos',
                    userCompany: 'Electro Instalaciones Perú',
                    downloadDate: '2025-06-02T10:40:00Z',
                    ipAddress: '192.168.1.108'
                },
                {
                    id: 'dl-e006',
                    userId: 'user-018',
                    userName: 'Ing. Ricardo Salinas',
                    userCompany: 'Control de Calidad Eléctrica',
                    downloadDate: '2025-06-01T16:25:00Z',
                    ipAddress: '192.168.1.175'
                },
                {
                    id: 'dl-e007',
                    userId: 'user-019',
                    userName: 'Ing. Verónica Luna',
                    userCompany: 'Gerencia Técnica',
                    downloadDate: '2025-05-31T12:50:00Z',
                    ipAddress: '192.168.1.180'
                },
                {
                    id: 'dl-e008',
                    userId: 'user-020',
                    userName: 'Ing. Fernando Ruiz',
                    userCompany: 'Automatización y Control',
                    downloadDate: '2025-05-30T15:35:00Z',
                    ipAddress: '192.168.1.185'
                },
                {
                    id: 'dl-e009',
                    userId: 'user-005',
                    userName: 'Ing. Roberto Díaz',
                    userCompany: 'Construcciones Mayhua',
                    downloadDate: '2025-05-29T08:20:00Z',
                    ipAddress: '192.168.1.115'
                },
                {
                    id: 'dl-e010',
                    userId: 'user-021',
                    userName: 'Arq. Lucía Mendoza',
                    userCompany: 'Diseño y Coordinación',
                    downloadDate: '2025-05-28T13:45:00Z',
                    ipAddress: '192.168.1.190'
                },
                {
                    id: 'dl-e011',
                    userId: 'user-016',
                    userName: 'Ing. Elena García',
                    userCompany: 'Supervisión Eléctrica',
                    downloadDate: '2025-05-27T11:10:00Z',
                    ipAddress: '192.168.1.165'
                },
                {
                    id: 'dl-e012',
                    userId: 'user-002',
                    userName: 'Ing. María Santos',
                    userCompany: 'Electro Instalaciones Perú',
                    downloadDate: '2025-05-26T09:55:00Z',
                    ipAddress: '192.168.1.108'
                }
            ]
        },
        {
            name: 'Cronograma_Plomeria_Industrial_v1.5.mpp',
            size: 896000,
            type: 'application/vnd.ms-project',
            uploadDate: '2025-05-22',
            status: 'completed',
            activities: 67,
            duration: 85,
            contractor: 'Plomería Industrial SAC',
            discipline: 'Plomería',
            downloadCount: 6,
            lastUpdated: '2025-05-22T09:45:00Z',
            version: '1.5',
            downloadHistory: [
                {
                    id: 'dl-008',
                    userId: 'user-003',
                    userName: 'Ing. Alberto Silva',
                    userCompany: 'Plomería Industrial SAC',
                    downloadDate: '2025-06-07T15:10:00Z',
                    ipAddress: '192.168.1.110'
                }
            ]
        },
        {
            name: 'Cronograma_Fire_Protection_v1.3.xer',
            size: 768000,
            type: 'application/x-primavera',
            uploadDate: '2025-05-20',
            status: 'completed',
            activities: 45,
            duration: 60,
            contractor: 'Fire Protection Corp.',
            discipline: 'Protección Contra Incendios',
            downloadCount: 4,
            lastUpdated: '2025-05-20T12:30:00Z',
            version: '1.3',
            downloadHistory: [
                {
                    id: 'dl-009',
                    userId: 'user-004',
                    userName: 'Ing. Jorge Ramírez',
                    userCompany: 'Fire Protection Corp.',
                    downloadDate: '2025-06-06T17:30:00Z',
                    ipAddress: '192.168.1.112'
                }
            ]
        },
        {
            name: 'Cronograma_Seguridad_Total_v1.1.xlsx',
            size: 512000,
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            uploadDate: '2025-05-18',
            status: 'completed',
            activities: 32,
            duration: 45,
            contractor: 'Seguridad Total SAC',
            discipline: 'SSOMA',
            downloadCount: 3,
            lastUpdated: '2025-05-18T10:15:00Z',
            version: '1.1',
            downloadHistory: [
                {
                    id: 'dl-010',
                    userId: 'user-006',
                    userName: 'Ing. Elena Morales',
                    userCompany: 'Seguridad Total SAC',
                    downloadDate: '2025-06-05T12:00:00Z',
                    ipAddress: '192.168.1.118'
                }
            ]
        }
    ]);

    const [dragOver, setDragOver] = useState(false);
    const [uploadingFiles, setUploadingFiles] = useState<UploadedFile[]>([]);
    const [downloadHistoryModal, setDownloadHistoryModal] = useState<{
        isOpen: boolean;
        file: UploadedFile | null;
    }>({
        isOpen: false,
        file: null
    });
    const [editModal, setEditModal] = useState<{
        isOpen: boolean;
        file: UploadedFile | null;
    }>({
        isOpen: false,
        file: null
    });

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        handleFileUpload(files);
    };

    // Función para manejar la selección de archivos
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            handleFileUpload(files);
        }
    };

    // Función principal para manejar la subida de archivos
    const handleFileUpload = (files: File[]) => {
        const supportedTypes = [
            'application/vnd.ms-project',
            'application/xml',
            'text/xml',
            'application/x-primavera',
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        const supportedExtensions = ['.mpp', '.xml', '.xer', '.csv', '.xlsx'];

        files.forEach(file => {
            const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

            if (supportedTypes.includes(file.type) || supportedExtensions.includes(fileExtension)) {
                uploadFile(file);
            } else {
                alert(`Archivo no soportado: ${file.name}. Formatos permitidos: .mpp, .xml, .xer, .csv, .xlsx`);
            }
        });
    };

    // Función para simular la subida de un archivo
    const uploadFile = (file: File) => {
        const newFile: UploadedFile = {
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream',
            uploadDate: new Date().toISOString(),
            status: 'uploading',
            downloadCount: 0,
            downloadHistory: [],
            version: '1.0'
        };

        // Agregar el archivo a la lista de archivos siendo subidos
        setUploadingFiles(prev => [...prev, newFile]);

        // Simular el proceso de subida con diferentes etapas
        setTimeout(() => {
            // Cambiar a "procesando"
            setUploadingFiles(prev =>
                prev.map(f => f.name === file.name ? { ...f, status: 'processing' } : f)
            );

            setTimeout(() => {
                // Simular datos aleatorios para el archivo completado
                const completedFile: UploadedFile = {
                    ...newFile,
                    status: 'completed',
                    activities: Math.floor(Math.random() * 150) + 50,
                    duration: Math.floor(Math.random() * 120) + 30,
                    contractor: getContractorFromFileName(file.name),
                    discipline: getDisciplineFromFileName(file.name),
                    lastUpdated: new Date().toISOString()
                };

                // Mover de uploading a uploaded
                setUploadingFiles(prev => prev.filter(f => f.name !== file.name));
                setUploadedFiles(prev => [completedFile, ...prev]);
            }, 3000); // 3 segundos para procesar
        }, 2000); // 2 segundos para subir
    };

    // Función auxiliar para extraer contratista del nombre del archivo
    const getContractorFromFileName = (fileName: string): string => {
        const name = fileName.toLowerCase();
        if (name.includes('hvac')) return 'HVAC Solutions S.A.C.';
        if (name.includes('electr')) return 'Electro Instalaciones Perú';
        if (name.includes('plomer') || name.includes('plumb')) return 'Plomería Industrial SAC';
        if (name.includes('fire') || name.includes('incendio')) return 'Fire Protection Corp.';
        if (name.includes('segur') || name.includes('ssoma')) return 'Seguridad Total SAC';
        return 'Contratista General';
    };

    // Función auxiliar para extraer disciplina del nombre del archivo
    const getDisciplineFromFileName = (fileName: string): string => {
        const name = fileName.toLowerCase();
        if (name.includes('hvac') || name.includes('climatiz')) return 'HVAC';
        if (name.includes('electr')) return 'Eléctrico';
        if (name.includes('plomer') || name.includes('plumb')) return 'Plomería';
        if (name.includes('fire') || name.includes('incendio')) return 'Protección Contra Incendios';
        if (name.includes('segur') || name.includes('ssoma')) return 'SSOMA';
        return 'General';
    };

    // Función para manejar descarga de cronograma
    const handleDownloadSchedule = (file: UploadedFile) => {
        const newDownloadRecord: DownloadRecord = {
            id: `dl-${Date.now()}`,
            userId: 'current-user',
            userName: 'Usuario Actual',
            userCompany: 'Mi Empresa',
            downloadDate: new Date().toISOString(),
            ipAddress: '192.168.1.100'
        };

        const updatedFile = {
            ...file,
            downloadCount: (file.downloadCount || 0) + 1,
            downloadHistory: [...(file.downloadHistory || []), newDownloadRecord]
        };

        setUploadedFiles(prevFiles =>
            prevFiles.map(f => f.name === file.name ? updatedFile : f)
        );

        console.log('Descargando cronograma:', file.name);
    };

    // Función para mostrar historial de descargas
    const showDownloadHistory = (file: UploadedFile) => {
        setDownloadHistoryModal({
            isOpen: true,
            file: file
        });
    };

    // Función para mostrar modal de edición
    const showEditModal = (file: UploadedFile) => {
        setEditModal({
            isOpen: true,
            file: file
        });
    };

    // Función para obtener usuarios únicos que descargaron
    const getUniqueDownloaders = (downloadHistory: DownloadRecord[] = []): number => {
        const uniqueUsers = new Set(downloadHistory.map(record => record.userId));
        return uniqueUsers.size;
    };

    // Función para obtener la última descarga
    const getLastDownload = (downloadHistory: DownloadRecord[] = []): DownloadRecord | null => {
        if (downloadHistory.length === 0) return null;
        return downloadHistory.reduce((latest, current) =>
            new Date(current.downloadDate) > new Date(latest.downloadDate) ? current : latest
        );
    };

    // Función para formatear fecha y hora
    const formatDateTime = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Función para formatear solo fecha
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-50';
            case 'processing': return 'text-blue-600 bg-blue-50';
            case 'uploading': return 'text-yellow-600 bg-yellow-50';
            case 'error': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'processing': return <RefreshCw className="w-4 h-4 animate-spin" />;
            case 'uploading': return <Upload className="w-4 h-4" />;
            case 'error': return <AlertCircle className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500 rounded-lg">
                    <Upload className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Carga e Integración del Cronograma Maestro</h1>
                    <p className="text-gray-600">Importar y sincronizar cronogramas desde MS Project, Primavera P6 y otros formatos</p>
                </div>
            </div>

            {/* Upload Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Cronogramas Activos</p>
                            <p className="text-2xl font-bold text-gray-900">6</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Actividades</p>
                            <p className="text-2xl font-bold text-gray-900">195</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Target className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Duración Proyecto</p>
                            <p className="text-2xl font-bold text-gray-900">140</p>
                            <p className="text-xs text-gray-500">días</p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Última Actualización</p>
                            <p className="text-lg font-bold text-gray-900">20 May</p>
                            <p className="text-xs text-gray-500">2025</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Area */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Cargar Nuevo Cronograma</h2>

                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragOver
                            ? 'border-blue-400 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Arrastra archivos aquí o haz clic para seleccionar
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Formatos soportados: .mpp, .xml, .xer, .csv, .xlsx
                    </p>
                    <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept=".mpp,.xml,.xer,.csv,.xlsx"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <button
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Seleccionar Archivos
                    </button>
                </div>

                {/* Supported Formats */}
                <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Formatos Soportados:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600 mr-2" />
                            <div>
                                <p className="text-sm font-medium">.mpp</p>
                                <p className="text-xs text-gray-500">MS Project</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FileText className="w-5 h-5 text-green-600 mr-2" />
                            <div>
                                <p className="text-sm font-medium">.xer</p>
                                <p className="text-xs text-gray-500">Primavera P6</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FileText className="w-5 h-5 text-orange-600 mr-2" />
                            <div>
                                <p className="text-sm font-medium">.xml</p>
                                <p className="text-xs text-gray-500">Project XML</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FileText className="w-5 h-5 text-purple-600 mr-2" />
                            <div>
                                <p className="text-sm font-medium">.xlsx</p>
                                <p className="text-xs text-gray-500">Excel</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Files Being Uploaded */}
            {uploadingFiles.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Subiendo Archivos</h2>
                    <div className="space-y-3">
                        {uploadingFiles.map((file, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-lg ${getStatusColor(file.status)}`}>
                                            {getStatusIcon(file.status)}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{file.name}</h4>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                                <span>{formatFileSize(file.size)}</span>
                                                <span>•</span>
                                                <span>
                                                    {file.status === 'uploading' && 'Subiendo...'}
                                                    {file.status === 'processing' && 'Procesando...'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {file.status === 'uploading' && (
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
                                            </div>
                                        )}
                                        {file.status === 'processing' && (
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-orange-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Uploaded Files */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Cronogramas Cargados</h2>
                </div>

                <div className="space-y-4">
                    {uploadedFiles.map((file, index) => {
                        const uniqueDownloaders = getUniqueDownloaders(file.downloadHistory);
                        const lastDownload = getLastDownload(file.downloadHistory);

                        return (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-lg ${getStatusColor(file.status)}`}>
                                            {getStatusIcon(file.status)}
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h4 className="font-medium text-gray-900">{file.name}</h4>
                                                {file.version && (
                                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                        v{file.version}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                                <span>{formatFileSize(file.size)}</span>
                                                <span>•</span>
                                                <span>{new Date(file.uploadDate).toLocaleDateString('es-PE')}</span>
                                                {file.contractor && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-blue-600">{file.contractor}</span>
                                                    </>
                                                )}
                                                {file.activities && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{file.activities} actividades</span>
                                                    </>
                                                )}
                                                {file.duration && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{file.duration} días</span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Download Statistics */}
                                            {(file.downloadCount || 0) > 0 && (
                                                <div className="flex items-center space-x-4 text-sm mt-2">
                                                    <span className="flex items-center text-blue-600">
                                                        <Download className="w-3 h-3 mr-1" />
                                                        <strong>{file.downloadCount}</strong> descargas
                                                    </span>
                                                    <span className="flex items-center text-green-600">
                                                        <Users className="w-3 h-3 mr-1" />
                                                        <strong>{uniqueDownloaders}</strong> usuarios únicos
                                                    </span>
                                                    {lastDownload && (
                                                        <span className="flex items-center text-gray-600">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            Último: {formatDate(lastDownload.downloadDate)}
                                                        </span>
                                                    )}
                                                    <button
                                                        onClick={() => showDownloadHistory(file)}
                                                        className="text-blue-600 hover:text-blue-800 text-xs underline"
                                                    >
                                                        Ver historial
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(file.status)}`}>
                                            {file.status === 'completed' ? 'Completado' :
                                                file.status === 'processing' ? 'Procesando' :
                                                    file.status === 'uploading' ? 'Cargando' : 'Error'}
                                        </span>
                                        <button
                                            onClick={() => showEditModal(file)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Editar cronograma"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => showDownloadHistory(file)}
                                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                            title="Ver historial de descargas"
                                        >
                                            <History className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDownloadSchedule(file)}
                                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                            title="Descargar cronograma"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {file.status === 'completed' && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <div className="grid grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">Importación:</span>
                                                <span className="ml-2 font-medium text-green-600">Exitosa</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Actividades:</span>
                                                <span className="ml-2 font-medium">{file.activities}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Disciplina:</span>
                                                <span className="ml-2 font-medium text-blue-600">{file.discipline}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Última actualización:</span>
                                                <span className="ml-2 font-medium text-purple-600">
                                                    {file.lastUpdated ? formatDate(file.lastUpdated) : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Acciones Rápidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                        <Upload className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Cargar Cronograma</span>
                    </button>
                    <button className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                        <RefreshCw className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Sincronizar Ahora</span>
                    </button>
                    <button className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                        <Download className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm font-medium text-blue-900">Exportar Cronograma</span>
                    </button>
                </div>
            </div>

            {/* Download History Modal */}
            {downloadHistoryModal.isOpen && downloadHistoryModal.file && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <Download className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Historial de Descargas</h2>
                                        <p className="text-blue-100 text-sm">{downloadHistoryModal.file.name}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDownloadHistoryModal({ isOpen: false, file: null })}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                            {/* Statistics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Download className="w-5 h-5 text-blue-600" />
                                                <p className="text-blue-700 font-medium text-sm">Total Descargas</p>
                                            </div>
                                            <p className="text-3xl font-bold text-blue-900">{downloadHistoryModal.file.downloadCount || 0}</p>
                                            <p className="text-blue-600 text-xs mt-1">Archivo completo</p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                            <Download className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Users className="w-5 h-5 text-green-600" />
                                                <p className="text-green-700 font-medium text-sm">Usuarios Únicos</p>
                                            </div>
                                            <p className="text-3xl font-bold text-green-900">
                                                {getUniqueDownloaders(downloadHistoryModal.file.downloadHistory)}
                                            </p>
                                            <p className="text-green-600 text-xs mt-1">Personas diferentes</p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Calendar className="w-5 h-5 text-purple-600" />
                                                <p className="text-purple-700 font-medium text-sm">Última Descarga</p>
                                            </div>
                                            <p className="text-lg font-bold text-purple-900">
                                                {getLastDownload(downloadHistoryModal.file.downloadHistory)
                                                    ? formatDateTime(getLastDownload(downloadHistoryModal.file.downloadHistory)!.downloadDate).split(' ')[0]
                                                    : 'Nunca'
                                                }
                                            </p>
                                            <p className="text-purple-600 text-xs mt-1">
                                                {getLastDownload(downloadHistoryModal.file.downloadHistory)
                                                    ? formatDateTime(getLastDownload(downloadHistoryModal.file.downloadHistory)!.downloadDate).split(' ')[1]
                                                    : 'Sin actividad'
                                                }
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* User Summary */}
                            {downloadHistoryModal.file.downloadHistory && downloadHistoryModal.file.downloadHistory.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <Users className="w-5 h-5 mr-2 text-gray-600" />
                                        Resumen por Usuario
                                    </h3>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {Object.entries(
                                                downloadHistoryModal.file.downloadHistory.reduce((acc, record) => {
                                                    if (!acc[record.userId]) {
                                                        acc[record.userId] = {
                                                            name: record.userName,
                                                            company: record.userCompany,
                                                            count: 0,
                                                            lastDownload: record.downloadDate
                                                        };
                                                    }
                                                    acc[record.userId].count++;
                                                    if (new Date(record.downloadDate) > new Date(acc[record.userId].lastDownload)) {
                                                        acc[record.userId].lastDownload = record.downloadDate;
                                                    }
                                                    return acc;
                                                }, {} as Record<string, { name: string; company: string; count: number; lastDownload: string }>)
                                            ).map(([userId, userInfo]) => (
                                                <div key={userId} className="bg-white rounded-lg border p-4 hover:shadow-sm transition-shadow">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                                                                <span className="text-blue-700 font-semibold text-sm">
                                                                    {userInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">{userInfo.name}</p>
                                                                <p className="text-sm text-gray-500">{userInfo.company}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                {userInfo.count} {userInfo.count === 1 ? 'descarga' : 'descargas'}
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {formatDateTime(userInfo.lastDownload).split(' ')[0]}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Detailed Download Log */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-gray-600" />
                                    Registro Detallado
                                </h3>

                                {(!downloadHistoryModal.file.downloadHistory || downloadHistoryModal.file.downloadHistory.length === 0) ? (
                                    <div className="bg-gray-50 rounded-xl p-12 text-center">
                                        <Download className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                        <h4 className="text-lg font-medium text-gray-900 mb-2">Sin Descargas Registradas</h4>
                                        <p className="text-gray-500">Este cronograma aún no ha sido descargado por ningún usuario.</p>
                                    </div>
                                ) : (
                                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="divide-y divide-gray-100">
                                            {downloadHistoryModal.file.downloadHistory.map((record, index) => (
                                                <div key={record.id} className="p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                                                                <span className="text-blue-700 font-semibold text-sm">
                                                                    {record.userName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center space-x-3">
                                                                    <p className="font-medium text-gray-900">{record.userName}</p>
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                                        #{index + 1}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                                                                    <span className="flex items-center">
                                                                        <Building className="w-4 h-4 mr-1" />
                                                                        {record.userCompany}
                                                                    </span>
                                                                    <span className="flex items-center">
                                                                        <FileText className="w-4 h-4 mr-1" />
                                                                        {downloadHistoryModal.file?.name || 'Archivo'}
                                                                    </span>
                                                                    {record.ipAddress && (
                                                                        <span className="flex items-center">
                                                                            <Globe className="w-4 h-4 mr-1" />
                                                                            {record.ipAddress}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="flex items-center text-sm text-gray-900 font-medium">
                                                                <Calendar className="w-4 h-4 mr-2" />
                                                                {formatDateTime(record.downloadDate)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal.isOpen && editModal.file && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Editar Cronograma - {editModal.file.name}
                            </h3>
                            <button
                                onClick={() => setEditModal({ isOpen: false, file: null })}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre del Archivo
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={editModal.file.name.replace(/\.[^/.]+$/, "")}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Versión
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={editModal.file.version}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contratista
                                    </label>
                                    <select
                                        defaultValue={editModal.file.contractor}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Proyecto General">Proyecto General</option>
                                        <option value="HVAC Solutions S.A.C.">HVAC Solutions S.A.C.</option>
                                        <option value="Electro Instalaciones Perú">Electro Instalaciones Perú</option>
                                        <option value="Plomería Industrial SAC">Plomería Industrial SAC</option>
                                        <option value="Fire Protection Corp.">Fire Protection Corp.</option>
                                        <option value="Seguridad Total SAC">Seguridad Total SAC</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Disciplina
                                    </label>
                                    <select
                                        defaultValue={editModal.file.discipline}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="General">General</option>
                                        <option value="HVAC">HVAC</option>
                                        <option value="Eléctrico">Eléctrico</option>
                                        <option value="Plomería">Plomería</option>
                                        <option value="Protección Contra Incendios">Protección Contra Incendios</option>
                                        <option value="SSOMA">SSOMA</option>
                                        <option value="Estructural">Estructural</option>
                                        <option value="Arquitectónico">Arquitectónico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Actividades
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue={editModal.file.activities}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Duración (días)
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue={editModal.file.duration}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripción
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Descripción opcional del cronograma..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex items-center space-x-3 pt-4">
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded" />
                                    <span className="ml-2 text-sm text-gray-700">Cronograma activo</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded" />
                                    <span className="ml-2 text-sm text-gray-700">Sincronización automática</span>
                                </label>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setEditModal({ isOpen: false, file: null })}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MasterScheduleUpload;