"use client";

import dynamic from 'next/dynamic';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
  className?: string;
}

/**
 * A flexible icon component that handles:
 * 1. Lucide icon names (e.g., "Rocket", "activity", "anchor")
 * 2. Raw SVG strings (starts with <svg)
 * 3. Unicode or plain text (fallback)
 */
const DynamicIcon = ({ name, className, size, strokeWidth, ...props }: IconProps) => {
  const sizeStyle = size ? { width: size, height: size } : {};

  if (!name) return null;

  const trimmedName = name.trim();

  // 1. Handle Raw SVG String
  if (trimmedName.startsWith('<svg')) {
    return (
      <span
        className={`${className} inline-block [&_svg]:w-full [&_svg]:h-full [&_svg]:block`}
        style={sizeStyle}
        dangerouslySetInnerHTML={{ __html: trimmedName }}
      />
    );
  }

  // 2. Handle URL (Image/SVG)
  const isUrl = trimmedName.startsWith('http') || trimmedName.startsWith('/') || /\.(svg|png|jpg|jpeg|webp|gif|avif)(\?.*)?$/i.test(trimmedName);
  if (isUrl) {
    return (
      <img 
        src={trimmedName} 
        alt="" 
        className={`${className} object-contain`} 
        style={sizeStyle}
      />
    );
  }

  // 3. Handle Lucide Icon Name
  // Normalize name: "RocketLaunch", "rocket-launch", "rocket launch" -> "rocket-launch"
  const iconName = trimmedName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '') as keyof typeof dynamicIconImports;

  if (dynamicIconImports[iconName]) {
    const LucideIcon = dynamic(dynamicIconImports[iconName], {
      loading: () => <div className={className} style={sizeStyle} />,
    });
    return (
      <LucideIcon 
        className={className} 
        size={size} 
        strokeWidth={strokeWidth} 
        {...(props as any)} 
      />
    );
  }

  // 4. Fallback: Unicode or plain text
  return (
    <span className={`${className} inline-flex items-center justify-center`} style={sizeStyle}>
      {trimmedName}
    </span>
  );
};

export default DynamicIcon;
