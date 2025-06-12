import React from 'react';

interface BioProps {
    name: string;
    title?: string;
    description?: string;
    avatar?: string;
    className?: string;
}

export const Bio: React.FC<BioProps> = ({
    name,
    title,
    description,
    avatar,
    className = ""
}) => {
    return (
        <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
            <div className="flex items-center space-x-4">
                {avatar && (
                    <img
                        className="h-16 w-16 rounded-full"
                        src={avatar}
                        alt={name}
                    />
                )}
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                    {title && (
                        <p className="text-sm text-gray-600">{title}</p>
                    )}
                </div>
            </div>
            {description && (
                <p className="mt-4 text-gray-700">{description}</p>
            )}
        </div>
    );
};

export default Bio; 