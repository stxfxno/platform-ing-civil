// src/router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';

// RFIs
import RFIsMenu from './pages/rfis/RFIsMenu';
import CreateRFI from './pages/rfis/CreateRFI';
import RFIInbox from './pages/rfis/RFIInbox';
import RFIHistory from './pages/rfis/RFIHistory';

// Schedule (Programación Semanal)
import ScheduleMenu from './pages/schedules/ScheduleMenu';
import WeeklyActivities from './pages/schedules/WeeklyActivities';
import ProgressTracking from './pages/schedules/ProgressTracking';
import DependenciesCoordination from './pages/schedules/DependenciesCoordination';
import ContractorReports from './pages/schedules/ContractorReports';

// Scope (Alcance)
import ScopeMenu from './pages/scope/ScopeMenu';

// Schedules (Cronogramas)
import SchedulesMenu from './pages/schedules/SchedulesMenu';

// Documentation (Documentación)
import DocumentationMenu from './pages/documentation/DocumentationMenu';
import DrawingsControl from './pages/documentation/DrawingsControl';
import TechnicalSpecs from './pages/documentation/TechnicalSpecs';
import GeneralDocuments from './pages/documentation/GeneralDocuments';
import SubmittalsManagement from './pages/documentation/SubmittalsManagement';

// Mensajes
import MessagesMenu from './pages/messages/MessagesMenu';
import MeetingMinutes from './pages/messages/MeetingMinutes';
import FormalCommunications from './pages/messages/FormalCommunications';
import NotificationsSystem from './pages/messages/NotificationsSystem';
import DirectMessaging from './pages/messages/DirectMessaging';

import MasterScheduleUpload from './pages/schedules/MasterScheduleUpload';
import CriticalPathAnalysis from './pages/schedules/CriticalPathAnalysis';
import ImportantDatesTracking from './pages/schedules/ImportantDatesTracking';
import ProjectOverview from './pages/schedules/ProjectOverview';

import DocumentRepository from './pages/scope/DocumentRepository';
import BidPackages from './pages/scope/BidPackages';
import QAModule from './pages/scope/QAModule';
import ScopeClarifications from './pages/scope/ScopeClarifications';

/* Páginas placeholder temporales
const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2">Página en construcción...</p>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-900 font-medium mb-2">Próximamente disponible</h3>
            <p className="text-blue-800 text-sm">
                Esta funcionalidad está siendo desarrollada y estará disponible en futuras versiones de la plataforma.
            </p>
        </div>
    </div>
);
*/

// Wrapper component to provide AuthContext
function RootLayout({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RootLayout>
                <App />
            </RootLayout>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },

            // ==================== RFIs Routes ====================
            {
                path: 'rfis',
                children: [
                    { index: true, element: <RFIsMenu /> },
                    { path: 'crear', element: <CreateRFI /> },
                    { path: 'bandeja', element: <RFIInbox /> },
                    { path: 'historial', element: <RFIHistory /> },
                ],
            },

            // ==================== Programación Semanal Routes ====================
            {
                path: 'programacion-semanal',
                children: [
                    { index: true, element: <ScheduleMenu /> },
                    {
                        path: 'actividades',
                        element: <WeeklyActivities />
                    },
                    {
                        path: 'seguimiento',
                        element: <ProgressTracking />
                    },
                    {
                        path: 'dependencias',
                        element: <DependenciesCoordination />
                    },
                    {
                        path: 'reportes-subcontratistas',
                        element: <ContractorReports />
                    },
                ],
            },

            // ==================== Alcance Routes ====================
            {
                path: 'alcance',
                children: [
                    { index: true, element: <ScopeMenu /> },
                    {
                        path: 'repositorio',
                        element: <DocumentRepository />
                    },
                    {
                        path: 'licitaciones',
                        element: <BidPackages />
                    },
                    {
                        path: 'clarificaciones',
                        element: <ScopeClarifications />
                    },
                    {
                        path: 'qa',
                        element: <QAModule />
                    },
                ],
            },

            // ==================== Cronogramas Routes ====================
            {
                path: 'cronogramas',
                children: [
                    { index: true, element: <SchedulesMenu /> },
                    {
                        path: 'maestro',
                        element: <MasterScheduleUpload />
                    },
                    {
                        path: 'general',
                        element: <ProjectOverview />
                    },
                    {
                        path: 'ruta-critica',
                        element: <CriticalPathAnalysis />
                    },
                    {
                        path: 'fechas-importantes',
                        element: <ImportantDatesTracking />
                    },
                ],
            },

            // ==================== Documentación Routes ====================
            {
                path: 'documentacion',
                children: [
                    {
                        index: true,
                        element: <DocumentationMenu />
                    },
                    {
                        path: 'planos',
                        element: <DrawingsControl />

                    },
                    {
                        path: 'especificaciones',
                        element: <TechnicalSpecs />
                    },
                    {
                        path: 'entregables',
                        element: <SubmittalsManagement />
                    },
                    {
                        path: 'generales',
                        element: <GeneralDocuments />
                    },
                ],
            },

            // ==================== Mensajes Routes ====================
            {
                path: 'mensajes',
                children: [
                    {
                        index: true,
                        element: <MessagesMenu />
                    },
                    {
                        path: 'actas',
                        element: <MeetingMinutes />
                    },
                    {
                        path: 'comunicaciones',
                        element: <FormalCommunications />
                    },
                    {
                        path: 'notificaciones',
                        element: <NotificationsSystem />
                    },
                    {
                        path: 'chat',
                        element: <DirectMessaging />
                    },
                ],
            },
        ],
    },
    {
        path: '/login',
        element: (
            <RootLayout>
                <Login />
            </RootLayout>
        ),
    },
    {
        path: '*',
        element: (
            <RootLayout>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="max-w-md w-full text-center">
                        <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Página no encontrada</h2>
                        <p className="text-gray-600 mb-6">
                            Lo sentimos, la página que buscas no existe o ha sido movida.
                        </p>
                        <div className="space-y-3">
                            <a
                                href="/dashboard"
                                className="block w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                Ir al Dashboard
                            </a>
                            <a
                                href="/rfis"
                                className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Gestión RFIs
                            </a>
                        </div>
                    </div>
                </div>
            </RootLayout>
        ),
    },
]);