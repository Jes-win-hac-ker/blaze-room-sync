import React, { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Message } from '../contexts/ChatContext';
import { UserAvatar } from './UserAvatar';
import { useChatContext } from '../contexts/ChatContext';
import { cn } from '../lib/utils';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { currentUser, editMessage, deleteMessage } = useChatContext();
  const [showActions, setShowActions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.text);

  const isOwnMessage = message.authorId === currentUser?.id;
  const timeAgo = formatDistanceToNow(message.timestamp, { addSuffix: true });
  const fullTime = format(message.timestamp, 'PPpp');

  const handleEdit = () => {
    if (editText.trim() && editText !== message.text) {
      editMessage(message.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(message.text);
    }
  };

  const mockUser = {
    id: message.authorId,
    name: message.authorName,
    avatar: message.authorAvatar,
    status: 'online' as const,
  };

  return (
    <div
      className={cn(
        "group flex gap-3 px-4 py-2 hover:bg-muted/30 transition-colors",
        isOwnMessage && "bg-muted/20"
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <UserAvatar user={mockUser} size="md" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-medium text-foreground text-sm">
            {message.authorName}
          </span>
          <span 
            className="text-xs text-muted-foreground cursor-help"
            title={fullTime}
          >
            {timeAgo}
          </span>
          {message.edited && (
            <span className="text-xs text-muted-foreground">(edited)</span>
          )}
        </div>
        
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleEdit}
              className="flex-1 bg-input border border-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
          </div>
        ) : (
          <div className="text-sm text-foreground leading-relaxed break-words">
            {message.text}
          </div>
        )}
      </div>

      {/* Message Actions */}
      {showActions && isOwnMessage && !isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Edit message"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteMessage(message.id)}
            className="p-1 hover:bg-destructive/20 rounded text-muted-foreground hover:text-destructive transition-colors"
            title="Delete message"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};