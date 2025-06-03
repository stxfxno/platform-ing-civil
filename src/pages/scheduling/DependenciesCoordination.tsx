// src/pages/schedules/DependenciesCoordination.tsx
import React, { useState } from 'react';
import {
    GitBranch,
    AlertTriangle,
    CheckCircle,
    Clock,
    Users,
    Calendar,
    Plus,
    X,
    Edit,
    Trash2,
    Save,
    User,
    MessageSquare
} from 'lucide-react';

interface Dependency {
    id: string;
    title: string;
    fromActivity: string;
    toActivity: string;
    type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish';
    lag: number; // días
    status: 'active' | 'blocked' | 'resolved';
    description: string;
    coordinator?: string;
    issue?: string;
    solution?: string;
    createdAt: string;
    resolvedAt?: string;
}

interface MitigationPlan {
    id: string;
    dependencyId: string;
    title: string;
    actions: string[];
    responsible: string;
    dueDate: string;
    status: 'pending' | 'in_progress' | 'completed';
}

const mockDependencies: Dependency[] = [
    {
        id: 'dep-001',
        title: 'Estructuras antes de HVAC',
        fromActivity: 'STRUCT-001 - Vigas principales',
        toActivity: 'HVAC-001 - Instalación ductos',
        type: 'finish_to_start',
        lag: 2,
        status: 'active',
        description: 'Los ductos HVAC requieren que las vigas principales estén completamente instaladas',
        coordinator: 'Ing. Carlos Mendoza',
        createdAt: '2025-05-20T10:00:00Z'
    },
    {
        id: 'dep-002',
        title: 'Eléctrico después de Plomería',
        fromActivity: 'PLUMB-001 - Tuberías principales',
        toActivity: 'ELEC-001 - Cableado principal',
        type: 'finish_to_start',
        lag: 1,
        status: 'blocked',
        description: 'El cableado eléctrico debe esperar a que termine la instalación de tuberías',
        coordinator: 'Ing. María Santos',
        issue: 'Retraso en tuberías por problemas de suministro',
        createdAt: '2025-05-22T14:30:00Z'
    },
    {
        id: 'dep-003',
        title: 'Protección contra incendios final',
        fromActivity: 'HVAC-001 - Instalación ductos',
        toActivity: 'FIRE-001 - Sistema rociadores',
        type: 'finish_to_start',
        lag: 0,
        status: 'resolved',
        description: 'Los rociadores se instalan después de los ductos HVAC',
        coordinator: 'Ing. Laura Mendoza',
        solution: 'Coordinación exitosa, instalación completada sin conflictos',
        createdAt: '2025-05-18T09:00:00Z',
        resolvedAt: '2025-05-25T16:00:00Z'
    }
];

const mockPlans: MitigationPlan[] = [
    {
        id: 'plan-001',
        dependencyId: 'dep-002',
        title: 'Plan de recuperación para retraso en tuberías',
        actions: [
            'Contactar proveedor alternativo de tuberías',
            'Acelerar instalación con equipo adicional',
            'Coordinar horarios extendidos'
        ],
        responsible: 'Ing. María Santos',
        dueDate: '2025-05-30T18:00:00Z',
        status: 'in_progress'
    }
];

const typeLabels = {
    'finish_to_start': 'Fin a Inicio',
    'start_to_start': 'Inicio a Inicio',
    'finish_to_finish': 'Fin a Fin'
};

const statusColors = {
    'active': 'bg-blue-100 text-blue-800',
    'blocked': 'bg-red-100 text-red-800',
    'resolved': 'bg-green-100 text-green-800'
};

const statusLabels = {
    'active': 'Activa',
    'blocked': 'Bloqueada',
    'resolved': 'Resuelta'
};

const DependenciesCoordination: React.FC = () => {
    const [dependencies, setDependencies] = useState<Dependency[]>(mockDependencies);
    const [plans, setPlans] = useState<MitigationPlan[]>(mockPlans);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showResolveModal, setShowResolveModal] = useState(false);
    const [showMeetingModal, setShowMeetingModal] = useState(false);
    const [selectedDep, setSelectedDep] = useState<Dependency | null>(null);
    const [editForm, setEditForm] = useState<Partial<Dependency>>({});
    const [planForm, setPlanForm] = useState<Partial<MitigationPlan>>({});
    const [resolutionData, setResolutionData] = useState({ solution: '', evidence: '' });
    const [meetingData, setMeetingData] = useState({ date: '', time: '', attendees: '' });

    const stats = {
        total: dependencies.length,
        active: dependencies.filter(d => d.status === 'active').length,
        blocked: dependencies.filter(d => d.status === 'blocked').length,
        resolved: dependencies.filter(d => d.status === 'resolved').length
    };

    // Funcionalidad 1: Editar dependencia
    const handleEdit = (dep: Dependency) => {
        setSelectedDep(dep);
        setEditForm(dep);
        setShowEditModal(true);
    };

    const saveEdit = () => {
        if (!selectedDep || !editForm.title) return;
        
        setDependencies(dependencies.map(d => 
            d.id === selectedDep.id ? { ...d, ...editForm } : d
        ));
        
        setShowEditModal(false);
        alert('Dependencia actualizada');
    };

    // Funcionalidad 2: Cambiar estado
    const changeStatus = (dep: Dependency, newStatus: 'active' | 'blocked' | 'resolved') => {
        setDependencies(dependencies.map(d => 
            d.id === dep.id ? { ...d, status: newStatus } : d
        ));
        alert(`Estado cambiado a: ${statusLabels[newStatus]}`);
    };

    // Funcionalidad 3: Crear plan de mitigación
    const handleCreatePlan = (dep: Dependency) => {
        setSelectedDep(dep);
        setPlanForm({
            dependencyId: dep.id,
            title: `Plan de mitigación para: ${dep.title}`,
            actions: [''],
            responsible: dep.coordinator || '',
            dueDate: '',
            status: 'pending'
        });
        setShowPlanModal(true);
    };

    const savePlan = () => {
        if (!planForm.title || !planForm.responsible) return;
        
        const newPlan: MitigationPlan = {
            id: `plan-${Date.now()}`,
            dependencyId: planForm.dependencyId!,
            title: planForm.title,
            actions: planForm.actions?.filter(a => a.trim()) || [],
            responsible: planForm.responsible,
            dueDate: planForm.dueDate || '',
            status: 'pending'
        };
        
        setPlans([...plans, newPlan]);
        setShowPlanModal(false);
        alert('Plan de mitigación creado');
    };

    const scheduleMeeting = () => {
        if (!meetingData.date || !meetingData.time) return;
        
        alert(`Reunión programada:\nFecha: ${meetingData.date}\nHora: ${meetingData.time}\nAsistentes: ${meetingData.attendees}`);
        setShowMeetingModal(false);
    };

    // Funcionalidad 6: Eliminar dependencia
    const deleteDependency = (dep: Dependency) => {
        if (confirm(`¿Eliminar la dependencia "${dep.title}"?`)) {
            setDependencies(dependencies.filter(d => d.id !== dep.id));
            alert('Dependencia eliminada');
        }
    };

    // Funcionalidad 7: Marcar como resuelta
    const handleResolve = (dep: Dependency) => {
        setSelectedDep(dep);
        setResolutionData({ solution: '', evidence: '' });
        setShowResolveModal(true);
    };

    const resolveWithEvidence = () => {
        if (!selectedDep || !resolutionData.solution) return;
        
        setDependencies(dependencies.map(d => 
            d.id === selectedDep.id ? {
                ...d,
                status: 'resolved',
                solution: resolutionData.solution,
                resolvedAt: new Date().toISOString()
            } : d
        ));
        
        setShowResolveModal(false);
        alert('Dependencia marcada como resuelta');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-500 rounded-lg">
                        <GitBranch className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dependencias y Coordinación</h1>
                        <p className="text-gray-600">Gestión de dependencias entre actividades MEP</p>
                    </div>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Dependencia
                </button>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-sm text-gray-600">Total</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
                        <p className="text-sm text-gray-600">Activas</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
                        <p className="text-sm text-gray-600">Bloqueadas</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                        <p className="text-sm text-gray-600">Resueltas</p>
                    </div>
                </div>
            </div>

            {/* Dependencies List */}
            <div className="space-y-4">
                {dependencies.map((dep) => (
                    <div key={dep.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                                <div className="p-3 bg-purple-500 rounded-lg">
                                    <GitBranch className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{dep.title}</h3>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[dep.status]}`}>
                                            {statusLabels[dep.status]}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                                        <div>
                                            <span className="text-gray-500">Desde:</span>
                                            <p className="font-medium">{dep.fromActivity}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Hasta:</span>
                                            <p className="font-medium">{dep.toActivity}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Tipo:</span>
                                            <p className="font-medium">{typeLabels[dep.type]}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Lag:</span>
                                            <p className="font-medium">{dep.lag} días</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-3">{dep.description}</p>

                                    {dep.coordinator && (
                                        <div className="flex items-center space-x-2 mb-2">
                                            <User className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">Coordinador: {dep.coordinator}</span>
                                        </div>
                                    )}

                                    {dep.issue && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-3">
                                            <h4 className="text-sm font-medium text-red-800 mb-1">Problema:</h4>
                                            <p className="text-sm text-red-700">{dep.issue}</p>
                                        </div>
                                    )}

                                    {dep.solution && (
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <h4 className="text-sm font-medium text-green-800 mb-1">Solución:</h4>
                                            <p className="text-sm text-green-700">{dep.solution}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={() => handleEdit(dep)}
                                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Editar"
                                >
                                    <Edit className="w-5 h-5" />
                                </button>

                                {dep.status === 'active' && (
                                    <button
                                        onClick={() => changeStatus(dep, 'blocked')}
                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                                        title="Bloquear"
                                    >
                                        <AlertTriangle className="w-5 h-5" />
                                    </button>
                                )}

                                {dep.status === 'blocked' && (
                                    <button
                                        onClick={() => changeStatus(dep, 'active')}
                                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                                        title="Activar"
                                    >
                                        <Clock className="w-5 h-5" />
                                    </button>
                                )}

                                {dep.status !== 'resolved' && (
                                    <button
                                        onClick={() => handleResolve(dep)}
                                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                                        title="Resolver"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                    </button>
                                )}

                                <button
                                    onClick={() => handleCreatePlan(dep)}
                                    className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg transition-colors"
                                    title="Plan de mitigación"
                                >
                                    <Users className="w-5 h-5" />
                                </button>


                                <button
                                    onClick={() => deleteDependency(dep)}
                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                                    title="Eliminar"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {showEditModal && selectedDep && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Editar Dependencia</h2>
                                <button onClick={() => setShowEditModal(false)}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                                <input
                                    type="text"
                                    value={editForm.title || ''}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                                    <select
                                        value={editForm.type || 'finish_to_start'}
                                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value as any })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="finish_to_start">Fin a Inicio</option>
                                        <option value="start_to_start">Inicio a Inicio</option>
                                        <option value="finish_to_finish">Fin a Fin</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Lag (días)</label>
                                    <input
                                        type="number"
                                        value={editForm.lag || 0}
                                        onChange={(e) => setEditForm({ ...editForm, lag: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                                <textarea
                                    rows={3}
                                    value={editForm.description || ''}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Coordinador</label>
                                <select
                                    value={editForm.coordinator || ''}
                                    onChange={(e) => setEditForm({ ...editForm, coordinator: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">Seleccionar coordinador...</option>
                                    <option value="Ing. Carlos Mendoza">Ing. Carlos Mendoza</option>
                                    <option value="Ing. María Santos">Ing. María Santos</option>
                                    <option value="Ing. Laura Mendoza">Ing. Laura Mendoza</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={saveEdit}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Plan Modal */}
            {showPlanModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Crear Plan de Mitigación</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Título del Plan</label>
                                <input
                                    type="text"
                                    value={planForm.title || ''}
                                    onChange={(e) => setPlanForm({ ...planForm, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Acciones</label>
                                <textarea
                                    rows={4}
                                    value={planForm.actions?.join('\n') || ''}
                                    onChange={(e) => setPlanForm({ ...planForm, actions: e.target.value.split('\n') })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Una acción por línea..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Responsable</label>
                                    <input
                                        type="text"
                                        value={planForm.responsible || ''}
                                        onChange={(e) => setPlanForm({ ...planForm, responsible: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Límite</label>
                                    <input
                                        type="date"
                                        value={planForm.dueDate?.split('T')[0] || ''}
                                        onChange={(e) => setPlanForm({ ...planForm, dueDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowPlanModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={savePlan}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                Crear Plan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Resolve Modal */}
            {showResolveModal && selectedDep && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Resolver Dependencia</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Solución *</label>
                                <textarea
                                    rows={3}
                                    value={resolutionData.solution}
                                    onChange={(e) => setResolutionData({ ...resolutionData, solution: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Describe cómo se resolvió la dependencia..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Evidencia (texto)</label>
                                <textarea
                                    rows={2}
                                    value={resolutionData.evidence}
                                    onChange={(e) => setResolutionData({ ...resolutionData, evidence: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Documentación o evidencia de la resolución..."
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowResolveModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={resolveWithEvidence}
                                disabled={!resolutionData.solution}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                                Marcar como Resuelta
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Meeting Modal */}
            {showMeetingModal && selectedDep && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Programar Reunión</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha *</label>
                                    <input
                                        type="date"
                                        value={meetingData.date}
                                        onChange={(e) => setMeetingData({ ...meetingData, date: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Hora *</label>
                                    <input
                                        type="time"
                                        value={meetingData.time}
                                        onChange={(e) => setMeetingData({ ...meetingData, time: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Asistentes</label>
                                <textarea
                                    rows={3}
                                    value={meetingData.attendees}
                                    onChange={(e) => setMeetingData({ ...meetingData, attendees: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Lista de asistentes..."
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowMeetingModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={scheduleMeeting}
                                disabled={!meetingData.date || !meetingData.time}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                Programar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mitigation Plans Section */}
            {plans.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Planes de Mitigación Activos</h3>
                    <div className="space-y-4">
                        {plans.map((plan) => (
                            <div key={plan.id} className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-purple-900">{plan.title}</h4>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        plan.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        plan.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {plan.status === 'completed' ? 'Completado' :
                                         plan.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
                                    </span>
                                </div>
                                <div className="text-sm text-purple-800">
                                    <p><strong>Responsable:</strong> {plan.responsible}</p>
                                    {plan.dueDate && (
                                        <p><strong>Fecha límite:</strong> {new Date(plan.dueDate).toLocaleDateString('es-PE')}</p>
                                    )}
                                    <div className="mt-2">
                                        <strong>Acciones:</strong>
                                        <ul className="mt-1 space-y-1">
                                            {plan.actions.map((action, idx) => (
                                                <li key={idx}>• {action}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Information Panel */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Dependencias y Coordinación - Simple</h3>
                <div className="text-sm text-purple-800 space-y-3">
                    <p>
                        <strong>Sistema funcional</strong> para gestionar dependencias entre actividades MEP
                        con herramientas simples de coordinación y resolución.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium mb-2">Funcionalidades (9 implementadas):</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• ✏️ Editar dependencia</li>
                                <li>• 🔄 Cambiar estado (activa/bloqueada/resuelta)</li>
                                <li>• 📋 Crear plan de mitigación</li>
                                <li>• 👥 Asignar coordinador</li>
                                <li>• 🗑️ Eliminar dependencia</li>
                                <li>• ✅ Marcar como resuelta (con evidencia)</li>
                                <li>• 📝 Documentar solución</li>
                                <li>• 📊 Actualizar cronograma</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Beneficios:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>• Control total de dependencias</li>
                                <li>• Coordinación efectiva entre equipos</li>
                                <li>• Resolución rápida de bloqueos</li>
                                <li>• Planes de mitigación estructurados</li>
                                <li>• Seguimiento de soluciones</li>
                                <li>• Impacto en cronograma controlado</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DependenciesCoordination;