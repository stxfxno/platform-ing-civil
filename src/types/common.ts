// src/types/common.ts

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'engineer' | 'contractor' | 'subcontractor';
    department: string;
    avatar?: string;
    isActive: boolean;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'planning' | 'active' | 'on-hold' | 'completed';
    progress: number;
    manager: User;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    isRead: boolean;
    createdAt: string;
    userId: string;
    actionUrl?: string;
}

export interface FileAttachment {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
    uploadedAt: string;
    uploadedBy: string;
}

export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy?: string;
}

export interface Status {
    key: string;
    label: string;
    color: string;
}

export interface Priority {
    key: string;
    label: string;
    color: string;
    order: number;
}

export interface FilterOption {
    value: string;
    label: string;
    count?: number;
}

export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

// Estados comunes del sistema
export const SYSTEM_STATUS = {
    DRAFT: { key: 'draft', label: 'Borrador', color: 'gray' },
    PENDING: { key: 'pending', label: 'Pendiente', color: 'yellow' },
    IN_PROGRESS: { key: 'in_progress', label: 'En Progreso', color: 'blue' },
    REVIEW: { key: 'review', label: 'En Revisión', color: 'purple' },
    APPROVED: { key: 'approved', label: 'Aprobado', color: 'green' },
    REJECTED: { key: 'rejected', label: 'Rechazado', color: 'red' },
    COMPLETED: { key: 'completed', label: 'Completado', color: 'green' },
    CANCELLED: { key: 'cancelled', label: 'Cancelado', color: 'gray' },
} as const;

// Prioridades del sistema
export const SYSTEM_PRIORITIES = {
    LOW: { key: 'low', label: 'Baja', color: 'green', order: 1 },
    MEDIUM: { key: 'medium', label: 'Media', color: 'yellow', order: 2 },
    HIGH: { key: 'high', label: 'Alta', color: 'orange', order: 3 },
    CRITICAL: { key: 'critical', label: 'Crítica', color: 'red', order: 4 },
} as const;

// Disciplinas MEP
export const MEP_DISCIPLINES = {
    MECHANICAL: { key: 'mechanical', label: 'Mecánico' },
    ELECTRICAL: { key: 'electrical', label: 'Eléctrico' },
    PLUMBING: { key: 'plumbing', label: 'Plomería' },
    FIRE_PROTECTION: { key: 'fire_protection', label: 'Protección Contra Incendios' },
    HVAC: { key: 'hvac', label: 'HVAC' },
    TELECOMMUNICATIONS: { key: 'telecommunications', label: 'Telecomunicaciones' },
    AUTOMATION: { key: 'automation', label: 'Automatización' },
} as const;