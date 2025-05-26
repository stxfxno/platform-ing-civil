
// src/types/.ts
import type { BaseEntity, FileAttachment } from './common';

export interface Drawing extends BaseEntity {
    drawingNumber: string;
    title: string;
    discipline: string;
    revision: string;
    revisionDate: string;
    status: 'draft' | 'review' | 'approved' | 'superseded' | 'void';
    file: FileAttachment;
    reviewers: string[];
    comments: DrawingComment[];
    approvedBy?: string;
    approvalDate?: string;
    scale?: string;
    sheetSize: string;
    relatedDrawings: string[];
}

export interface DrawingComment extends BaseEntity {
    commentId: string;
    drawingId: string;
    comment: string;
    commentType: 'review' | 'correction' | 'approval' | 'general';
    author: string;
    status: 'open' | 'addressed' | 'closed';
    coordinateX?: number;
    coordinateY?: number;
}

export interface TechnicalSpecification extends BaseEntity {
    specId: string;
    title: string;
    discipline: string;
    section: string;
    version: string;
    status: 'draft' | 'active' | 'superseded';
    content: string;
    attachments: FileAttachment[];
    approvedBy?: string;
    approvalDate?: string;
    relatedSpecs: string[];
    applicableStandards: string[];
}

export interface Submittal extends BaseEntity {
    submittalNumber: string;
    title: string;
    discipline: string;
    contractor: string;
    status: 'received' | 'review' | 'approved' | 'rejected' | 'resubmit' | 'superseded';
    submittalType: 'shop_drawings' | 'product_data' | 'samples' | 'certificates' | 'test_reports';
    dueDate: string;
    submittedDate?: string;
    reviewDate?: string;
    documents: FileAttachment[];
    reviewComments: SubmittalComment[];
    priority: 'low' | 'medium' | 'high' | 'critical';
    relatedDrawings: string[];
    specificationSection: string;
}

export interface SubmittalComment extends BaseEntity {
    commentId: string;
    submittalId: string;
    comment: string;
    commentType: 'review' | 'correction' | 'approval' | 'rejection';
    author: string;
    status: 'open' | 'addressed' | 'closed';
}

export interface GeneralDocument extends BaseEntity {
    documentId: string;
    title: string;
    category: 'contract' | 'permit' | 'report' | 'correspondence' | 'manual' | 'other';
    description: string;
    version: string;
    status: 'active' | 'superseded' | 'archived';
    file: FileAttachment;
    accessLevel: 'public' | 'internal' | 'restricted';
    expiryDate?: string;
    tags: string[];
}
