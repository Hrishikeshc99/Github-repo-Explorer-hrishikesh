import { useState, useEffect } from 'react';
import { RateLimitResponse } from '@/types/github';

export function useRateLimit() {
  const [rateLimit, setRateLimit] = useState<{
    remaining: number;
    limit: number;
  } | null>(null);

  const fetchRateLimit = async () => {
    try {
      const response = await fetch('https://api.github.com/rate_limit');
      if (response.ok) {
        const data: RateLimitResponse = await response.json();
        setRateLimit({
          remaining: data.rate.remaining,
          limit: data.rate.limit,
        });
      }
    } catch (err) {
      console.error('Failed to fetch rate limit:', err);
    }
  };

  useEffect(() => {
    fetchRateLimit();
    const interval = setInterval(fetchRateLimit, 60000);
    return () => clearInterval(interval);
  }, []);

  return rateLimit;
}
