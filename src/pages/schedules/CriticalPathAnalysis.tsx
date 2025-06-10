// src/pages/schedules/CriticalPathAnalysis.tsx
import React, { useState } from 'react';
import {
    Route,
    AlertTriangle,
    Clock,
    Target,
    Activity,
    Download,
    Filter,
    ChevronRight,
} from 'lucide-react';

interface CriticalActivity {
    id: string;
    name: string;
    discipline: string;
    startDate: string;
    endDate: string;
    duration: number;
    totalFloat: number;
    freeFloat: number;
    progress: number;
    status: 'completed' | 'in_progress' | 'delayed' | 'not_started';
    predecessor: string[];
    successor: string[];
    contractor: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

const CriticalPathAnalysis: React.FC = () => {
    const [showRiskAnalysis, ] = useState(false);
    const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');

    const criticalActivities: CriticalActivity[] = [
        {
            id: 'crit-001',
            name: 'Instalación ductos principales HVAC',
            discipline: 'HVAC',
            startDate: '2025-06-01',
            endDate: '2025-06-15',
            duration: 14,
            totalFloat: 0,
            freeFloat: 0,
            progress: 85,
            status: 'in_progress',
            predecessor: ['struct-001'],
            successor: ['hvac-002', 'hvac-003'],
            contractor: 'HVAC Solutions S.A.C.',
            riskLevel: 'medium'
        },
        {
            id: 'crit-002',
            name: 'Instalación tableros eléctricos principales',
            discipline: 'Eléctrico',
            startDate: '2025-06-16',
            endDate: '2025-06-25',
            duration: 9,
            totalFloat: 0,
            freeFloat: 0,
            progress: 0,
            status: 'not_started',
            predecessor: ['crit-001'],
            successor: ['elec-003'],
            contractor: 'Electro Instalaciones Perú',
            riskLevel: 'high'
        },
        {
            id: 'crit-003',
            name: 'Conexión sistemas principales MEP',
            discipline: 'Mecánico',
            startDate: '2025-06-26',
            endDate: '2025-07-05',
            duration: 9,
            totalFloat: 0,
            freeFloat: 0,
            progress: 0,
            status: 'not_started',
            predecessor: ['crit-002'],
            successor: ['test-001'],
            contractor: 'MEP Contractors Inc.',
            riskLevel: 'critical'
        }
    ];

    const nearCriticalActivities = [
        {
            id: 'near-001',
            name: 'Instalación tuberías agua fría - Área B',
            discipline: 'Plomería',
            totalFloat: 2,
            duration: 8,
            riskLevel: 'medium',
            contractor: 'Plomería Industrial SAC'
        },
        {
            id: 'near-002',
            name: 'Cableado secundario - Pisos 4-6',
            discipline: 'Eléctrico',
            totalFloat: 3,
            duration: 12,
            riskLevel: 'low',
            contractor: 'Electro Instalaciones Perú'
        },
        {
            id: 'near-003',
            name: 'Sistema rociadores - Zona comercial',
            discipline: 'Protección Contra Incendios',
            totalFloat: 1,
            duration: 7,
            riskLevel: 'high',
            contractor: 'Fire Protection Corp.'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-500';
            case 'in_progress': return 'bg-blue-500';
            case 'delayed': return 'bg-red-500';
            case 'not_started': return 'bg-gray-300';
            default: return 'bg-gray-300';
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'low': return 'text-green-600 bg-green-50 border-green-200';
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'critical': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit'
        });
    };

    const calculatePathProgress = () => {
        const totalProgress = criticalActivities.reduce((sum, activity) => sum + activity.progress, 0);
        return Math.round(totalProgress / criticalActivities.length);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-red-500 rounded-lg">
                        <Route className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Identificación y Monitoreo de la Ruta Crítica</h1>
                        <p className="text-gray-600">Análisis de actividades críticas y gestión de riesgos del cronograma</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Reporte
                    </button>
                </div>
            </div>

            {/* Critical Path Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Duración Ruta Crítica</p>
                            <p className="text-3xl font-bold text-gray-900">32</p>
                            <p className="text-xs text-gray-500">días</p>
                        </div>
                        <div className="p-3 bg-red-100 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Critical Path Visualization */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Ruta Crítica Principal</h2>
                    <div className="flex items-center space-x-2">
                        <select
                            value={selectedTimeframe}
                            onChange={(e) => setSelectedTimeframe(e.target.value as 'week' | 'month' | 'quarter')}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="week">Esta Semana</option>
                            <option value="month">Este Mes</option>
                            <option value="quarter">Este Trimestre</option>
                        </select>
                        <button className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                            <Filter className="w-4 h-4 mr-2" />
                            Filtros
                        </button>
                    </div>
                </div>

                {/* Path Flow */}
                <div className="relative overflow-x-auto">
                    <div className="flex items-center space-x-4 min-w-full pb-4">
                        {criticalActivities.map((activity, index) => (
                            <React.Fragment key={activity.id}>
                                <div className="flex-shrink-0 w-80">
                                    <div className={`border-2 rounded-lg p-4 ${activity.riskLevel === 'critical' ? 'border-red-300 bg-red-50' :
                                        activity.riskLevel === 'high' ? 'border-orange-300 bg-orange-50' :
                                            activity.riskLevel === 'medium' ? 'border-yellow-300 bg-yellow-50' :
                                                'border-green-300 bg-green-50'}`}>

                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <Activity className="w-4 h-4 text-gray-600" />
                                                <span className="text-sm font-medium text-gray-900">{activity.discipline}</span>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded border ${getRiskColor(activity.riskLevel)}`}>
                                                {activity.riskLevel === 'critical' ? 'CRÍTICO' :
                                                    activity.riskLevel === 'high' ? 'ALTO' :
                                                        activity.riskLevel === 'medium' ? 'MEDIO' : 'BAJO'}
                                            </span>
                                        </div>

                                        <h4 className="font-medium text-gray-900 mb-2 text-sm leading-tight">
                                            {activity.name}
                                        </h4>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs text-gray-600">
                                                <span>Duración: {activity.duration} días</span>
                                                <span>Holgura: {activity.totalFloat} días</span>
                                            </div>

                                            <div className="flex items-center justify-between text-xs text-gray-600">
                                                <span>{formatDate(activity.startDate)} - {formatDate(activity.endDate)}</span>
                                                <span className="font-medium">{activity.progress}%</span>
                                            </div>

                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(activity.status)}`}
                                                    style={{ width: `${activity.progress}%` }}
                                                ></div>
                                            </div>

                                            <div className="text-xs text-gray-500 truncate">
                                                {activity.contractor}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {index < criticalActivities.length - 1 && (
                                    <div className="flex-shrink-0 flex items-center">
                                        <ChevronRight className="w-6 h-6 text-gray-400" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Path Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600">Duración Total:</span>
                            <span className="ml-2 font-medium text-gray-900">32 días</span>
                        </div>
                        <div>
                            <span className="text-gray-600">Progreso Promedio:</span>
                            <span className="ml-2 font-medium text-gray-900">{calculatePathProgress()}%</span>
                        </div>
                        <div>
                            <span className="text-gray-600">Actividades Retrasadas:</span>
                            <span className="ml-2 font-medium text-red-600">1</span>
                        </div>
                        <div>
                            <span className="text-gray-600">Riesgo General:</span>
                            <span className="ml-2 font-medium text-orange-600">ALTO</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Near Critical Activities */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Actividades Casi Críticas</h2>
                    <span className="text-sm text-gray-500">Holgura ≤ 3 días</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {nearCriticalActivities.map((activity) => (
                        <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">{activity.discipline}</span>
                                <span className={`px-2 py-1 text-xs font-medium rounded border ${getRiskColor(activity.riskLevel)}`}>
                                    {activity.riskLevel.toUpperCase()}
                                </span>
                            </div>

                            <h4 className="font-medium text-gray-900 mb-3 text-sm leading-tight">
                                {activity.name}
                            </h4>

                            <div className="space-y-2 text-xs text-gray-600">
                                <div className="flex justify-between">
                                    <span>Holgura Total:</span>
                                    <span className={`font-medium ${activity.totalFloat <= 1 ? 'text-red-600' :
                                            activity.totalFloat <= 2 ? 'text-orange-600' : 'text-yellow-600'
                                        }`}>
                                        {activity.totalFloat} días
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Duración:</span>
                                    <span className="font-medium text-gray-900">{activity.duration} días</span>
                                </div>
                                <div className="text-gray-500 truncate">
                                    {activity.contractor}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Risk Analysis Panel */}
            {showRiskAnalysis && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Análisis de Riesgos</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Risk Matrix */}
                        <div>
                            <h3 className="text-md font-medium text-gray-900 mb-3">Matriz de Riesgos</h3>
                            <div className="space-y-3">
                                {[
                                    {
                                        risk: 'Retraso en entrega de materiales HVAC',
                                        probability: 70,
                                        impact: 'Alto',
                                        mitigation: 'Proveedores alternativos identificados',
                                        level: 'high'
                                    },
                                    {
                                        risk: 'Interferencias no detectadas en BIM',
                                        probability: 40,
                                        impact: 'Crítico',
                                        mitigation: 'Revisión adicional de modelos 3D',
                                        level: 'critical'
                                    },
                                    {
                                        risk: 'Disponibilidad de personal especializado',
                                        probability: 30,
                                        impact: 'Medio',
                                        mitigation: 'Contrato con empresa de respaldo',
                                        level: 'medium'
                                    }
                                ].map((risk, index) => (
                                    <div key={index} className={`p-4 rounded-lg border ${getRiskColor(risk.level)}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-gray-900 text-sm">{risk.risk}</h4>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${risk.level === 'critical' ? 'bg-red-100 text-red-600' :
                                                    risk.level === 'high' ? 'bg-orange-100 text-orange-600' :
                                                        'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                {risk.impact}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-600 space-y-1">
                                            <div>Probabilidad: <span className="font-medium">{risk.probability}%</span></div>
                                            <div>Mitigación: <span className="text-gray-800">{risk.mitigation}</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Impact Analysis */}
                        <div>
                            <h3 className="text-md font-medium text-gray-900 mb-3">Análisis de Impacto</h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                                        <h4 className="font-medium text-red-900">Escenario Crítico</h4>
                                    </div>
                                    <p className="text-sm text-red-800 mb-2">
                                        Si todas las actividades críticas se retrasan 3 días adicionales
                                    </p>
                                    <div className="text-sm space-y-1">
                                        <div>Retraso total del proyecto: <span className="font-medium">5 días</span></div>
                                        <div>Costo adicional estimado: <span className="font-medium">$45,000</span></div>
                                        <div>Fecha de entrega: <span className="font-medium">10 Julio 2025</span></div>
                                    </div>
                                </div>

                                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                                        <h4 className="font-medium text-yellow-900">Escenario Optimista</h4>
                                    </div>
                                    <p className="text-sm text-yellow-800 mb-2">
                                        Si se implementan todas las medidas de mitigación
                                    </p>
                                    <div className="text-sm space-y-1">
                                        <div>Recuperación de retrasos: <span className="font-medium">2 días</span></div>
                                        <div>Adelanto potencial: <span className="font-medium">1 día</span></div>
                                        <div>Fecha de entrega: <span className="font-medium">4 Julio 2025</span></div>
                                    </div>
                                </div>

                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Target className="w-5 h-5 text-green-600 mr-2" />
                                        <h4 className="font-medium text-green-900">Recomendaciones</h4>
                                    </div>
                                    <ul className="text-sm text-green-800 space-y-1">
                                        <li>• Asignar recursos adicionales a actividad HVAC</li>
                                        <li>• Acelerar aprobación de materiales eléctricos</li>
                                        <li>• Programar reunión semanal de seguimiento</li>
                                        <li>• Activar plan de contingencia para tuberías</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Items */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Acciones Inmediatas Requeridas</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <h4 className="font-medium text-blue-900">Esta Semana</h4>
                        {[
                            { action: 'Revisar progreso instalación ductos HVAC', priority: 'high', due: 'Mañana' },
                            { action: 'Coordinar entrega materiales eléctricos', priority: 'critical', due: 'Miércoles' },
                            { action: 'Reunión de coordinación con subcontratistas', priority: 'medium', due: 'Viernes' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                                    <p className="text-xs text-gray-500">Vence: {item.due}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded ${item.priority === 'critical' ? 'bg-red-100 text-red-600' :
                                        item.priority === 'high' ? 'bg-orange-100 text-orange-600' :
                                            'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    {item.priority.toUpperCase()}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-blue-900">Próximas 2 Semanas</h4>
                        {[
                            { action: 'Preparar materiales para tableros eléctricos', priority: 'high', due: '5 Jun' },
                            { action: 'Validar disponibilidad equipo mecánico', priority: 'medium', due: '8 Jun' },
                            { action: 'Actualizar cronograma con nuevos hitos', priority: 'low', due: '12 Jun' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                                    <p className="text-xs text-gray-500">Vence: {item.due}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded ${item.priority === 'critical' ? 'bg-red-100 text-red-600' :
                                        item.priority === 'high' ? 'bg-orange-100 text-orange-600' :
                                            item.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-green-100 text-green-600'
                                    }`}>
                                    {item.priority.toUpperCase()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CriticalPathAnalysis;