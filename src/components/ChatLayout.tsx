import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';
import { useChatContext } from '../contexts/ChatContext';

export const ChatLayout: React.FC = () => {
  const { currentRoom } = useChatContext();

  return (
    <div className="flex h-screen bg-chat-main text-foreground">
      <Sidebar />
      {currentRoom ? (
        <ChatArea />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Welcome to ChatApp</h2>
            <p className="text-muted-foreground">Select a room to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
};