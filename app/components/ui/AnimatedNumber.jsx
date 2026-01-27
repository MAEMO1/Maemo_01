'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function AnimatedNumber({
  value,
  duration = 2000,
  className = '',
  style = {},
}) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  // Parse the value to extract number and format
  const parseValue = useCallback((val) => {
    const str = String(val);
    // Match patterns like: €847K, +34%, 92%, $1.2M, etc.
    const match = str.match(/^([^\d]*)([\d.,]+)([^\d]*)$/);
    if (match) {
      const prefix = match[1] || '';
      const numStr = match[2].replace(',', '.');
      const suffix = match[3] || '';
      const num = parseFloat(numStr);
      const hasDecimal = numStr.includes('.');
      const decimalPlaces = hasDecimal ? (numStr.split('.')[1] || '').length : 0;
      return { prefix, num, suffix, decimalPlaces, original: str };
    }
    return { prefix: '', num: 0, suffix: '', decimalPlaces: 0, original: str };
  }, []);

  const animateValue = useCallback(() => {
    const { prefix, num, suffix, decimalPlaces, original } = parseValue(value);

    // If no valid number found, just show the original
    if (num === 0 && !original.includes('0')) {
      setDisplayValue(original);
      return;
    }

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentNum = num * easeProgress;
      const formatted = decimalPlaces > 0
        ? currentNum.toFixed(decimalPlaces)
        : Math.round(currentNum).toString();

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [parseValue, value, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, animateValue]);

  return (
    <span ref={ref} className={className} style={style}>
      {displayValue}
    </span>
  );
}
