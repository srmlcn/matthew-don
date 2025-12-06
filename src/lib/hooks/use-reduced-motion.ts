/**
 * Use Reduced Motion Hook
 * 
 * React hook that detects if the user prefers reduced motion.
 * Respects the prefers-reduced-motion media query.
 * 
 * @example
 * const shouldReduceMotion = useReducedMotion();
 * 
 * return (
 *   <motion.div
 *     animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
 *   />
 * );
 */

'use client';

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') {
      return;
    }
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setReducedMotion(mediaQuery.matches);
    
    // Update when preference changes
    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
    
    // Fallback for older browsers
    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }, []);
  
  return reducedMotion;
}
