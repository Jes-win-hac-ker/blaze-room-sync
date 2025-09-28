import React from 'react';
import { Settings, Mic, MicOff, HeadphonesIcon, LogOut } from 'lucide-react';
import { User } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { UserAvatar } from './UserAvatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isDeafened, setIsDeafened] = React.useState(false);
  const { user: authUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Use authenticated user data if available
  const displayUser = authUser ? {
    ...user,
    name: authUser.displayName || authUser.username,
    avatar: authUser.avatar || user.avatar
  } : user;

  return (
    <div className="p-3 border-t border-border bg-chat-sidebar">
      <div className="flex items-center gap-3">
        <UserAvatar 
          user={displayUser} 
          size="md" 
          showStatus 
        />
        
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-foreground truncate">
            {displayUser.name}
          </div>
          <div className="text-xs text-muted-foreground capitalize">
            {displayUser.status}
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded hover:bg-chat-sidebar-hover transition-colors text-muted-foreground"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};