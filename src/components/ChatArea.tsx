import React from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChatContext } from '../contexts/ChatContext';

export const ChatArea: React.FC = () => {
  const { currentRoom } = useChatContext();

  if (!currentRoom) return null;

  return (
    <div className="flex-1 flex flex-col bg-background">
      <ChatHeader room={currentRoom} />
      <MessageList />
      <MessageInput />
    </div>
  );
};