import { useState, useEffect } from 'react';

export function useLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, 30);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setTimeout(() => setLoading(false), 500);
    }
  }, [progress, loading]);

  return { loading, progress };
}