import React, { useEffect, useRef } from 'react';
import { useChatContext } from '../contexts/ChatContext';
import { MessageItem } from './MessageItem';
import { TypingIndicator } from './TypingIndicator';

export const MessageList: React.FC = () => {
  const { messages, typingUsers } = useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {messages.length > 0 ? (
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-0 py-2 space-y-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
        >
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">No messages yet</p>
            <p className="text-sm text-muted-foreground">Be the first to say something!</p>
          </div>
        </div>
      )}
      
      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <div className="px-4 py-2">
          <TypingIndicator users={typingUsers} />
        </div>
      )}
    </div>
  );
};