import React, { useState, useRef } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { useChatContext } from '../contexts/ChatContext';
import { Button } from './ui/button';

export const MessageInput: React.FC = () => {
  const { sendMessage, setTyping } = useChatContext();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
      setIsTyping(false);
      setTyping(false);
      
      // Clear typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Handle typing indicator
    if (value.trim() && !isTyping) {
      setIsTyping(true);
      setTyping(true);
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      setTyping(false);
    }, 1000);
  };

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="p-4 border-t border-border bg-card">
      <div className="flex items-end gap-3 bg-chat-input rounded-lg p-3">
        <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
          <Paperclip className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="w-full bg-transparent text-foreground placeholder-muted-foreground resize-none border-none outline-none max-h-[120px] min-h-[24px] leading-6"
            rows={1}
          />
        </div>

        <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
          <Smile className="w-5 h-5" />
        </button>

        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};