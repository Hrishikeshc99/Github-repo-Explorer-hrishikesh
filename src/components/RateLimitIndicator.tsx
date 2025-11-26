import React from 'react';
import { useRateLimit } from '@/hooks/useRateLimit';

export default function RateLimitIndicator() {
  const rateLimit = useRateLimit();

  if (!rateLimit) {
    return null;
  }

  const percentage = (rateLimit.remaining / rateLimit.limit) * 100;
  const isLow = percentage < 20;

  return (
    <div className={`rate-limit-indicator ${isLow ? 'rate-limit-low' : ''}`}>
      <span>
        API Requests: {rateLimit.remaining} / {rateLimit.limit}
      </span>
    </div>
  );
}
