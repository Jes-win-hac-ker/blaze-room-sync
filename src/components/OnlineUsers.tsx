import React from 'react';
import { Users } from 'lucide-react';
import { useChatContext } from '../contexts/ChatContext';
import { UserAvatar } from './UserAvatar';

export const OnlineUsers: React.FC = () => {
  const { onlineUsers } = useChatContext();

  return (
    <div className="p-3 border-t border-border">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Online — {onlineUsers.length}
        </h3>
      </div>
      
      <div className="space-y-2">
        {onlineUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-3 px-2 py-1 rounded hover:bg-chat-sidebar-hover transition-colors">
            <UserAvatar user={user} size="sm" showStatus />
            <span className="text-sm text-foreground truncate">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};