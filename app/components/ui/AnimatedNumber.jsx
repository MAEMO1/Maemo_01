'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function AnimatedNumber({
  value,
  duration = 2000,
  delay = 300,
  className = '',
  style = {},
}) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const checkIntervalRef = useRef(null);

  const parseValue = useCallback((val) => {
    const str = String(val);
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

    if (num === 0 && !original.includes('0')) {
      setDisplayValue(original);
      return;
    }

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

  // Check if element is truly visible (opacity must be nearly 1)
  const isElementVisible = useCallback(() => {
    if (!ref.current) return false;

    const rect = ref.current.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (!inViewport) return false;

    // Check computed opacity - wait until fully visible (> 0.9)
    let el = ref.current;
    while (el) {
      const computedStyle = window.getComputedStyle(el);
      const opacity = parseFloat(computedStyle.opacity);
      if (opacity < 0.9) return false;
      el = el.parentElement;
    }

    return true;
  }, []);

  useEffect(() => {
    if (hasAnimated) return;

    // Poll for visibility
    checkIntervalRef.current = setInterval(() => {
      if (isElementVisible() && !hasAnimated) {
        setHasAnimated(true);

        // Clear interval first
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current);
        }

        // Add delay before starting animation for better visual effect
        setTimeout(() => {
          animateValue();
        }, delay);
      }
    }, 50);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [hasAnimated, isElementVisible, animateValue, delay]);

  return (
    <span ref={ref} className={className} style={style}>
      {displayValue}
    </span>
  );
}
