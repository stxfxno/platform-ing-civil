
// src/types/.ts
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