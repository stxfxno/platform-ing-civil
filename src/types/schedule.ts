// src/types/schedule.ts
import type { BaseEntity, User, FileAttachment } from './common';

export interface WeeklyActivity extends BaseEntity {
    activityId: string;
    title: string;
    description: string;
    discipline: string;
    assignedTo: string;
    subcontractor: string;
    startDate: string;
    endDate: string;
    status: 'not_started' | 'in_progress' | 'completed' | 'delayed' | 'planned';
    progress: number;
    dependencies: string[];
    location: string;
    plannedHours: number;
    actualHours: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
    tags: string[];
    equipment?: string[];
    materials?: string[];
    issues?: string[];
    permits?: string[];
}

export interface Team {
    id: string;
    name: string;
    discipline: string;
    lead: string;
    members: string[];
    contractor: string;
    specialties: string[];
    active: boolean;
}

export interface WeeklyReport extends BaseEntity {
    week: string;
    reportDate: string;
    submittedBy: string;
    activities: ActivityReport[];
    overallProgress: number;
    delays: DelayReport[];
    materialRequests: string[];
    safetyIncidents: SafetyIncident[];
    status: 'on_track' | 'delayed' | 'at_risk';
}

export interface ActivityReport {
    activityId: string;
    plannedProgress: number;
    actualProgress: number;
    issues: string[];
    comments: string;
    nextWeekPlan: string;
}

export interface DelayReport {
    reason: string;
    impact: string;
    mitigation: string;
}

export interface SafetyIncident {
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    actionsTaken: string[];
}

export interface Dependency {
    id: string;
    fromActivity: string;
    toActivity: string;
    type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
    lag: number;
    description: string;
}

export interface Material {
    id: string;
    name: string;
    category: string;
    unit: string;
    plannedQuantity: number;
    receivedQuantity: number;
    usedQuantity: number;
    status: 'available' | 'partial' | 'insufficient' | 'pending';
    supplier: string;
    deliveryDate: string;
    nextDelivery?: string;
}

export interface Equipment {
    id: string;
    name: string;
    category: string;
    status: 'available' | 'reserved' | 'in_use' | 'maintenance';
    availableFrom?: string;
    availableTo?: string;
    assignedTo?: string;
    operator: string;
    dailyRate: number;
    requirements?: string[];
}

export interface Contractor {
    id: string;
    name: string;
    discipline: string;
    contact: string;
    phone: string;
    email: string;
    teams: string[];
    activeActivities: number;
    totalActivities: number;
    performance: {
        onTimeDelivery: number;
        qualityScore: number;
        safetyScore: number;
    };
}

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

// src/types/documentation.ts
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

// src/types/messages.ts
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
    metadata?: Record<string, any>;
}

export interface NotificationRead {
    userId: string;
    readAt: string;
}

// src/types/schedules.ts
import type { BaseEntity } from './common';

export interface MasterSchedule extends BaseEntity {
    scheduleId: string;
    name: string;
    version: string;
    projectId: string;
    startDate: string;
    endDate: string;
    status: 'draft' | 'active' | 'superseded' | 'archived';
    activities: ScheduleActivity[];
    milestones: Milestone[];
    criticalPath: string[];
    lastUpdate: string;
    updatedBy: string;
    baselineDate?: string;
}

export interface ScheduleActivity {
    id: string;
    activityId: string;
    name: string;
    description: string;
    discipline: string;
    duration: number;
    startDate: string;
    endDate: string;
    actualStartDate?: string;
    actualEndDate?: string;
    progress: number;
    status: 'not_started' | 'in_progress' | 'completed' | 'delayed' | 'cancelled';
    predecessors: Predecessor[];
    successors: string[];
    resources: ActivityResource[];
    isCritical: boolean;
    totalFloat: number;
    freeFloat: number;
    earlyStart: string;
    earlyFinish: string;
    lateStart: string;
    lateFinish: string;
    constraint?: ActivityConstraint;
}

export interface Predecessor {
    activityId: string;
    type: 'FS' | 'SS' | 'FF' | 'SF';
    lag: number;
}

export interface ActivityResource {
    resourceId: string;
    resourceName: string;
    type: 'labor' | 'equipment' | 'material';
    quantity: number;
    unit: string;
    cost: number;
}

export interface ActivityConstraint {
    type: 'start_no_earlier_than' | 'start_no_later_than' | 'finish_no_earlier_than' | 'finish_no_later_than' | 'must_start_on' | 'must_finish_on';
    date: string;
    reason: string;
}

export interface Milestone {
    id: string;
    name: string;
    description: string;
    plannedDate: string;
    actualDate?: string;
    status: 'planned' | 'achieved' | 'missed' | 'at_risk';
    importance: 'low' | 'medium' | 'high' | 'critical';
    relatedActivities: string[];
    contractual: boolean;
    owner: string;
}

export interface CriticalPathAnalysis {
    id: string;
    analysisDate: string;
    totalDuration: number;
    criticalActivities: string[];
    nearCriticalActivities: NearCriticalActivity[];
    recommendations: string[];
    riskAssessment: RiskItem[];
}

export interface NearCriticalActivity {
    activityId: string;
    totalFloat: number;
    riskLevel: 'low' | 'medium' | 'high';
}

export interface RiskItem {
    id: string;
    description: string;
    probability: number;
    impact: number;
    riskScore: number;
    mitigation: string;
    affectedActivities: string[];
}