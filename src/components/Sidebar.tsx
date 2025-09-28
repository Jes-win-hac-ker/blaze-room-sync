import React from 'react';
import { Hash, Lock, Users } from 'lucide-react';
import { useChatContext } from '../contexts/ChatContext';
import { UserProfile } from './UserProfile';
import { OnlineUsers } from './OnlineUsers';
import { cn } from '../lib/utils';

export const Sidebar: React.FC = () => {
  const { rooms, currentRoom, setCurrentRoom, currentUser } = useChatContext();

  return (
    <div className="w-64 bg-chat-sidebar border-r border-border flex flex-col">
      {/* Server Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-bold text-foreground">ChatApp</h1>
        <p className="text-sm text-muted-foreground">Multi-room Chat</p>
      </div>

      {/* Rooms List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Channels
            </h3>
          </div>
          
          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setCurrentRoom(room)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-left transition-colors",
                  "hover:bg-chat-sidebar-hover text-muted-foreground hover:text-foreground",
                  currentRoom?.id === room.id && "bg-chat-sidebar-hover text-foreground"
                )}
              >
                {room.isPrivate ? (
                  <Lock className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <Hash className="w-4 h-4 flex-shrink-0" />
                )}
                <span className="flex-1 truncate text-sm">{room.name}</span>
                {room.unreadCount > 0 && (
                  <span className="bg-destructive text-destructive-foreground text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                    {room.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Online Users */}
        <OnlineUsers />
      </div>

      {/* User Profile */}
      {currentUser && <UserProfile user={currentUser} />}
    </div>
  );
};