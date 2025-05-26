// src/types/scope.ts
import type { BaseEntity, FileAttachment } from './common';

export interface ScopeDocument extends BaseEntity {
    documentId: string;
    title: string;
    type: 'specification' | 'requirement' | 'standard' | 'drawing' | 'manual';
    discipline: string;
    version: string;
    status: 'draft' | 'active' | 'superseded' | 'archived';
    attachments: FileAttachment[];
    approvedBy?: string;
    approvalDate?: string;
    expiryDate?: string;
    tags: string[];
}

export interface BidPackage extends BaseEntity {
    packageId: string;
    title: string;
    discipline: string;
    description: string;
    documents: string[];
    deadline: string;
    status: 'preparation' | 'active' | 'evaluation' | 'closed';
    questions: QAItem[];
    applicants: BidApplicant[];
    estimatedValue: number;
    currency: string;
}

export interface QAItem extends BaseEntity {
    questionId: string;
    bidPackageId?: string;
    question: string;
    askedBy: string;
    discipline: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'answered' | 'clarified';
    answer?: string;
    answeredBy?: string;
    answeredAt?: string;
    attachments: FileAttachment[];
    isPublic: boolean;
}

export interface BidApplicant {
    id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    submissionDate: string;
    documentsSubmitted: string[];
    status: 'registered' | 'documents_pending' | 'complete' | 'disqualified';
    qualificationScore?: number;
}

export interface ScopeClarification extends BaseEntity {
    clarificationId: string;
    title: string;
    description: string;
    requestedBy: string;
    assignedTo: string;
    discipline: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in_review' | 'responded' | 'closed';
    bidPackageId?: string;
    attachments: FileAttachment[];
    response?: string;
    responseDate?: string;
    responseBy?: string;
}
