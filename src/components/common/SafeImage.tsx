import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackType?: 'academic' | 'person' | 'building' | 'news';
  type?: 'academic' | 'person' | 'building' | 'news';
}

const LOCAL_FALLBACKS = {
  academic: '/images/classroom.jpg',
  person: '/images/staff1.jpg',
  building: '/images/campus.jpg',
  news: '/images/lab.jpg',
};

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
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const resolvedType = type || fallbackType || 'academic';
  const localFallback = fallbackSrc || LOCAL_FALLBACKS[resolvedType];
  const requestedSrc = src || localFallback;
  const showPlaceholder = !requestedSrc || failedSrc === requestedSrc || failedSrc === localFallback;

  useEffect(() => {
    setFailedSrc(null);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const broken = e.currentTarget.currentSrc || String(requestedSrc);
    if (broken !== localFallback && requestedSrc !== localFallback) {
      setFailedSrc(String(requestedSrc));
    } else {
      setFailedSrc(localFallback);
    }
    onError?.(e);
  };

  if (showPlaceholder && failedSrc === localFallback) {
    return (
      <div className={`bg-[#12355B] text-white flex flex-col items-center justify-center p-4 ${className}`}>
        <GraduationCap className="w-10 h-10 text-[#C9A227] mb-1 opacity-80" />
        <span className="text-[10px] font-semibold tracking-wider text-slate-300 uppercase">{alt || 'Apex Academy'}</span>
      </div>
    );
  }

  const currentSrc = failedSrc === requestedSrc ? localFallback : requestedSrc;

  return (
    <img
      src={currentSrc}
      alt={alt || 'School media'}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={handleError}
      {...props}
    />
  );
};
