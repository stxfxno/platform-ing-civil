
// src/types/.ts
import type { BaseEntity, FileAttachment } from './common';

export interface MeetingMinute extends BaseEntity {
    meetingId: string;
    title: string;
    meetingType: 'coordination' | 'technical' | 'progress' | 'safety' | 'planning';
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    organizer: string;
    attendees: Attendee[];
    agenda: AgendaItem[];
    decisions: Decision[];
    actionItems: ActionItem[];
    attachments: FileAttachment[];
    nextMeetingDate?: string;
    nextMeetingLocation?: string;
    status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Attendee {
    userId: string;
    name: string;
    company: string;
    role: string;
    status: 'attended' | 'absent' | 'excused';
}

export interface AgendaItem {
    id: string;
    order: number;
    topic: string;
    presenter: string;
    duration: number;
    status: 'pending' | 'discussed' | 'deferred';
}

export interface Decision {
    id: string;
    decision: string;
    rationale?: string;
    impact: string;
    approvedBy: string;
    effectiveDate: string;
    relatedItems: string[];
}

export interface ActionItem {
    id: string;
    action: string;
    assignedTo: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: 'pending' | 'in_progress' | 'completed' | 'overdue';
    dependencies?: string[];
    relatedDocuments?: string[];
}

export interface FormalCommunication extends BaseEntity {
    communicationId: string;
    type: 'email' | 'letter' | 'directive' | 'field_note' | 'memo' | 'notice';
    subject: string;
    content: string;
    from: string;
    to: string[];
    cc: string[];
    attachments: FileAttachment[];
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'draft' | 'sent' | 'delivered' | 'read' | 'responded';
    deliveryDate?: string;
    responseRequired: boolean;
    responseDeadline?: string;
    relatedProject?: string;
    tags: string[];
}

export interface DirectMessage extends BaseEntity {
    messageId: string;
    conversationId: string;
    senderId: string;
    recipientIds: string[];
    content: string;
    messageType: 'text' | 'file' | 'image' | 'voice' | 'system';
    attachments: FileAttachment[];
    isRead: boolean;
    readBy: MessageRead[];
    relatedTo?: {
        type: 'rfi' | 'activity' | 'document' | 'meeting';
        id: string;
    };
    parentMessageId?: string;
    editedAt?: string;
    deletedAt?: string;
}

export interface MessageRead {
    userId: string;
    readAt: string;
}

export interface Conversation {
    id: string;
    title?: string;
    type: 'direct' | 'group' | 'project' | 'system';
    participants: string[];
    lastMessageAt: string;
    lastMessageId: string;
    isArchived: boolean;
    isPinned: boolean;
    unreadCount: number;
    relatedTo?: {
        type: 'rfi' | 'activity' | 'document' | 'meeting' | 'project';
        id: string;
    };
    createdAt: string;
    createdBy: string;
}

export interface SystemNotification extends BaseEntity {
    notificationId: string;
    type: 'rfi_new' | 'rfi_response' | 'activity_due' | 'document_updated' | 'meeting_reminder' | 'system_alert';
    title: string;
    message: string;
    severity: 'info' | 'warning' | 'error' | 'success';
    recipientIds: string[];
    isRead: boolean;
    readBy: NotificationRead[];
    actionUrl?: string;
    actionLabel?: string;
    expiryDate?: string;
    relatedTo?: {
        type: string;
        id: string;
    };
    metadata?: Record<string, unknown>;
}

export interface NotificationRead {
    userId: string;
    readAt: string;
}
