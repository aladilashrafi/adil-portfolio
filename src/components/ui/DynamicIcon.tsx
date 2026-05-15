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

  // 1. Handle Raw SVG String
  if (name && name.trim().startsWith('<svg')) {
    return (
      <span
        className={`${className} inline-block [&_svg]:w-full [&_svg]:h-full [&_svg]:block [&_svg_*]:fill-current [&_svg_*]:stroke-current`}
        style={sizeStyle}
        dangerouslySetInnerHTML={{ __html: name }}
      />
    );
  }

  // 2. Handle Lucide Icon Name
  if (name) {
    // Normalize name to kebab-case (e.g., "RocketLaunch" or "Rocket Launch" -> "rocket-launch")
    const iconName = name
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
  }

  // 3. Fallback: Unicode or plain text
  return (
    <span className={className} style={sizeStyle}>
      {name || ''}
    </span>
  );
};

export default DynamicIcon;
