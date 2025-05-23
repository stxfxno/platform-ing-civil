// src/types/rfi.ts
// src/types/rfi.ts
import type { BaseEntity, User, FileAttachment } from './common';

export interface RFI extends BaseEntity {
    rfiNumber: string;
    title: string;
    description: string;
    discipline: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: 'draft' | 'open' | 'in_review' | 'responded' | 'closed' | 'cancelled';
    category: string;
    location?: string;
    drawingReference?: string;
    assignedTo: string;
    assignedUser?: User;
    requestedBy: string;
    requestedUser?: User;
    dueDate?: string;
    responseDate?: string;
    response?: string;
    responseBy?: string;
    responseUser?: User;
    attachments: FileAttachment[];
    comments: RFIComment[];
    estimatedCost?: number;
    impactLevel?: 'low' | 'medium' | 'high';
    tags: string[];
}

export interface RFIComment extends BaseEntity {
    rfiId: string;
    comment: string;
    author: string;
    authorUser?: User;
    isInternal: boolean;
    attachments?: FileAttachment[];
}

export interface RFIFilter {
    status?: string[];
    priority?: string[];
    discipline?: string[];
    assignedTo?: string[];
    dateRange?: {
        start: string;
        end: string;
    };
    searchTerm?: string;
}

export interface RFIStats {
    total: number;
    open: number;
    inReview: number;
    responded: number;
    overdue: number;
    byPriority: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
    byDiscipline: Record<string, number>;
}

// Estados disponibles para RFIs
export const RFI_STATUSES = {
    DRAFT: { key: 'draft', label: 'Borrador', color: 'gray' },
    OPEN: { key: 'open', label: 'Abierta', color: 'blue' },
    IN_REVIEW: { key: 'in_review', label: 'En Revisión', color: 'yellow' },
    RESPONDED: { key: 'responded', label: 'Respondida', color: 'green' },
    CLOSED: { key: 'closed', label: 'Cerrada', color: 'gray' },
    CANCELLED: { key: 'cancelled', label: 'Cancelada', color: 'red' },
} as const;

// Categorías de RFI
export const RFI_CATEGORIES = [
    'Clarificación Técnica',
    'Especificaciones',
    'Materiales',
    'Instalación',
    'Coordinación',
    'Normativa',
    'Cambio de Diseño',
    'Otro'
] as const;