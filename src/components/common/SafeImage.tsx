import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackType?: 'academic' | 'person' | 'building' | 'news';
  type?: 'academic' | 'person' | 'building' | 'news';
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  fallbackType,
  type,
  onError,
  ...props
}) => {
  const [errorCount, setErrorCount] = useState(0);

  const resolvedType = type || fallbackType || 'academic';

  // Default professional fallback images based on type
  const defaultFallbacks = {
    academic: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    person: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    building: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80",
    news: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
  };

  const activeFallback = fallbackSrc || defaultFallbacks[resolvedType];

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setErrorCount(prev => prev + 1);
    if (onError) {
      onError(e);
    }
  };

  if (errorCount >= 2 || (!src && !activeFallback)) {
    return (
      <div className={`bg-[#12355B] text-white flex flex-col items-center justify-center p-4 ${className}`}>
        <GraduationCap className="w-10 h-10 text-[#C9A227] mb-1 opacity-80" />
        <span className="text-[10px] font-semibold tracking-wider text-slate-300 uppercase">{alt || "Apex Academy"}</span>
      </div>
    );
  }

  const currentSrc = errorCount === 1 ? activeFallback : (src || activeFallback);

  return (
    <img
      src={currentSrc}
      alt={alt || "School Media"}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};
