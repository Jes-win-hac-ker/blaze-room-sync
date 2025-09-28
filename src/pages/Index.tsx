import React from 'react';
import { ChatProvider } from '../contexts/ChatContext';
import { ChatLayout } from '../components/ChatLayout';

const Index = () => {
  return (
    <ChatProvider>
      <div className="h-screen overflow-hidden dark">
        <ChatLayout />
      </div>
    </ChatProvider>
  );
};

export default Index;
