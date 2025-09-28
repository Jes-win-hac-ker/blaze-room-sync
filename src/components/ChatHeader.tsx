import React from 'react';
import { Hash, Lock, Users, Search, Bell, HelpCircle } from 'lucide-react';
import { Room } from '../contexts/ChatContext';

interface ChatHeaderProps {
  room: Room;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ room }) => {
  return (
    <div className="h-12 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {room.isPrivate ? (
          <Lock className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Hash className="w-5 h-5 text-muted-foreground" />
        )}
        
        <div>
          <h2 className="font-semibold text-foreground">{room.name}</h2>
          {room.description && (
            <p className="text-xs text-muted-foreground">{room.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{room.memberCount}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-muted rounded transition-colors">
            <Search className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded transition-colors">
            <Bell className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded transition-colors">
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};