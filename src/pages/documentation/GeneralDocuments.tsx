// src/pages/documentation/GeneralDocuments.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    Folder,
} from 'lucide-react';

interface GeneralDocument {
    id: string;
    documentId: string;
    title: string;
    category: 'contract' | 'permit' | 'report' | 'correspondence' | 'manual' | 'other';
    description: string;
    version: string;
    status: 'active' | 'superseded' | 'archived';
    accessLevel: 'public' | 'internal' | 'restricted';
    author: string;
    createdDate: string;
    lastModified: string;
    expiryDate?: string;
    fileSize: string;
    tags: string[];
}


const GeneralDocuments: React.FC = () => {

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        to="/documentacion"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Descargas</h1>
                        <p className="text-gray-600">Historial de descargas de todos los documentos</p>
                    </div>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                    <Folder className="w-4 h-4" />
                    <span>Subir Documento</span>
                </button>
            </div>

            
        </div>
    );
};

export default GeneralDocuments;