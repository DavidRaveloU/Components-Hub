// Notificación al copiar

import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface CopyNotificationProps {
  show: boolean;
}

export function CopyNotification({ show }: CopyNotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-ios-slide-in">
      <div className={cn(
        'flex items-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-lg shadow-2xl',
        'border border-gray-700'
      )}>
        <div className="p-1 bg-green-500 rounded-full">
          <Check className="w-4 h-4 text-white" />
        </div>
        <p className="text-sm font-medium">
          Color copied to clipboard!
        </p>
      </div>
    </div>
  );
}