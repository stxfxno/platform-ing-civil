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
    Clock
} from 'lucide-react';

interface UploadedFile {
    name: string;
    size: number;
    type: string;
    uploadDate: string;
    status: 'uploading' | 'processing' | 'completed' | 'error';
    activities?: number;
    duration?: number;
}

const MasterScheduleUpload: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
        {
            name: 'Cronograma_MEP_Master_v2.1.mpp',
            size: 2048000,
            type: 'application/vnd.ms-project',
            uploadDate: '2025-05-20',
            status: 'completed',
            activities: 247,
            duration: 180
        },
        {
            name: 'Schedule_Update_May2025.xml',
            size: 1536000,
            type: 'application/xml',
            uploadDate: '2025-05-18',
            status: 'completed',
            activities: 198,
            duration: 165
        }
    ]);

    const [dragOver, setDragOver] = useState(false);

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
        // Aquí iría la lógica de carga de archivos
        console.log('Files dropped:', e.dataTransfer.files);
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
                            <p className="text-2xl font-bold text-gray-900">3</p>
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
                            <p className="text-2xl font-bold text-gray-900">247</p>
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
                            <p className="text-2xl font-bold text-gray-900">180</p>
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
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragOver 
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
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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

            {/* Uploaded Files */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Cronogramas Cargados</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Ver Historial Completo
                    </button>
                </div>

                <div className="space-y-4">
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${getStatusColor(file.status)}`}>
                                        {getStatusIcon(file.status)}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{file.name}</h4>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span>{formatFileSize(file.size)}</span>
                                            <span>•</span>
                                            <span>{new Date(file.uploadDate).toLocaleDateString('es-PE')}</span>
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
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(file.status)}`}>
                                        {file.status === 'completed' ? 'Completado' :
                                         file.status === 'processing' ? 'Procesando' :
                                         file.status === 'uploading' ? 'Cargando' : 'Error'}
                                    </span>
                                    <button className="p-2 text-gray-400 hover:text-gray-600">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {file.status === 'completed' && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Importación:</span>
                                            <span className="ml-2 font-medium text-green-600">Exitosa</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Actividades:</span>
                                            <span className="ml-2 font-medium">{file.activities}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Estado:</span>
                                            <span className="ml-2 font-medium text-blue-600">Activo</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Integration Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Integración</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Sincronización Automática</h3>
                        <div className="space-y-3">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded" defaultChecked />
                                <span className="ml-2 text-sm text-gray-700">Actualizar automáticamente cada 24 horas</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded" />
                                <span className="ml-2 text-sm text-gray-700">Notificar cambios críticos</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded" defaultChecked />
                                <span className="ml-2 text-sm text-gray-700">Mantener historial de versiones</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Mapeo de Campos</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Disciplina:</span>
                                <span className="font-medium">Campo Personalizado 1</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subcontratista:</span>
                                <span className="font-medium">Recurso Asignado</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Prioridad:</span>
                                <span className="font-medium">Campo Personalizado 2</span>
                            </div>
                        </div>
                        <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Configurar Mapeo →
                        </button>
                    </div>
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
        </div>
    );
};

export default MasterScheduleUpload;