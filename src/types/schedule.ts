// src/types/schedule.ts
import type { BaseEntity } from './common';

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

