import React from 'react';
import { Settings, Mic, MicOff, HeadphonesIcon } from 'lucide-react';
import { User } from '../contexts/ChatContext';
import { UserAvatar } from './UserAvatar';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isDeafened, setIsDeafened] = React.useState(false);

  return (
    <div className="p-3 border-t border-border bg-chat-sidebar">
      <div className="flex items-center gap-3">
        <UserAvatar 
          user={user} 
          size="md" 
          showStatus 
        />
        
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-foreground truncate">
            {user.name}
          </div>
          <div className="text-xs text-muted-foreground capitalize">
            {user.status}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded hover:bg-chat-sidebar-hover transition-colors ${
              isMuted ? 'text-destructive' : 'text-muted-foreground'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsDeafened(!isDeafened)}
            className={`p-2 rounded hover:bg-chat-sidebar-hover transition-colors ${
              isDeafened ? 'text-destructive' : 'text-muted-foreground'
            }`}
            title={isDeafened ? 'Undeafen' : 'Deafen'}
          >
            <HeadphonesIcon className="w-4 h-4" />
          </button>

          <button
            className="p-2 rounded hover:bg-chat-sidebar-hover transition-colors text-muted-foreground"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};