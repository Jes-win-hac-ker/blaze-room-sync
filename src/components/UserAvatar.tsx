import React from 'react';
import { User } from '../contexts/ChatContext';
import { cn } from '../lib/utils';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const statusClasses = {
  online: 'bg-chat-online',
  away: 'bg-chat-away',
  offline: 'bg-chat-offline',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  user, 
  size = 'md', 
  showStatus = false,
  className 
}) => {
  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <img
        src={user.avatar}
        alt={user.name}
        className={cn(
          'rounded-full object-cover',
          sizeClasses[size]
        )}
      />
      {showStatus && (
        <div
          className={cn(
            'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-chat-sidebar',
            statusClasses[user.status]
          )}
        />
      )}
    </div>
  );
};