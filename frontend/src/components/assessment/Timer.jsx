import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../utils/assessmentUtils';

export const Timer = ({ timeRemaining }) => (
  <div className="flex items-center gap-2">
    <Clock className="w-5 h-5 text-red-500" />
    <span
      className={`font-mono font-bold ${
        timeRemaining < 300 ? "text-red-500" : ""
      }`}
    >
      {formatTime(timeRemaining)}
    </span>
  </div>
);
