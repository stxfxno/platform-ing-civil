// src/components/common/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'white' | 'gray';
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'medium',
    color = 'primary',
    text
}) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    };

    const colorClasses = {
        primary: 'border-primary-600',
        white: 'border-white',
        gray: 'border-gray-600'
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]} 
          border-2 border-t-transparent 
          rounded-full 
          animate-spin
        `}
            />
            {text && (
                <p className="mt-3 text-sm text-gray-600">{text}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;