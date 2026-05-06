'use client';

import { useEffect, useRef } from 'react';

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const animate = () => {
      const { mx, my, rx, ry } = pos.current;
      pos.current.rx = rx + (mx - rx) * 0.12;
      pos.current.ry = ry + (my - ry) * 0.12;
      ring.style.transform = `translate(${pos.current.rx}px, ${pos.current.ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };

    const interactiveEls = document.querySelectorAll('a, button, [data-cursor]');
    const onEnter = () => {
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(254,84,1,0.5)';
    };
    const onLeave = () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(1,156,255,0.5)';
    };

    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);
    const rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
