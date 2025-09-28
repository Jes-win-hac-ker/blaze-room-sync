import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  timestamp: Date;
  edited?: boolean;
  editedAt?: Date;
  isOwn?: boolean;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  lastMessage?: Message;
  unreadCount: number;
  isPrivate: boolean;
}

interface ChatContextType {
  currentUser: User | null;
  rooms: Room[];
  currentRoom: Room | null;
  messages: Message[];
  typingUsers: User[];
  onlineUsers: User[];
  setCurrentRoom: (room: Room) => void;
  sendMessage: (text: string) => void;
  editMessage: (messageId: string, newText: string) => void;
  deleteMessage: (messageId: string) => void;
  setTyping: (isTyping: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

// Mock data for demo
const mockRooms: Room[] = [
  {
    id: '1',
    name: 'general',
    description: 'General discussion',
    memberCount: 12,
    unreadCount: 3,
    isPrivate: false,
    lastMessage: {
      id: '1',
      text: 'Hey everyone! How\'s it going?',
      authorId: '2',
      authorName: 'Alice Johnson',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3dd?w=150',
      timestamp: new Date(Date.now() - 300000),
    }
  },
  {
    id: '2',
    name: 'random',
    description: 'Random stuff',
    memberCount: 8,
    unreadCount: 0,
    isPrivate: false,
  },
  {
    id: '3',
    name: 'dev-team',
    description: 'Development team discussions',
    memberCount: 5,
    unreadCount: 1,
    isPrivate: true,
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    status: 'online'
  },
  {
    id: '2',
    name: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3dd?w=150',
    status: 'online'
  },
  {
    id: '3',
    name: 'Bob Smith',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
    status: 'away'
  },
  {
    id: '4',
    name: 'Carol Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    status: 'offline'
  }
];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser } = useAuth();
  
  // Create chat user from authenticated user
  const currentUser: User = authUser ? {
    id: authUser.id,
    name: authUser.displayName || authUser.username,
    avatar: authUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    status: 'online' as const
  } : mockUsers[0];
  const [rooms] = useState<Room[]>(mockRooms);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(mockRooms[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<User[]>([]);
  const [onlineUsers] = useState<User[]>(mockUsers.filter(u => u.status === 'online'));

  // Generate mock messages for the current room
  useEffect(() => {
    if (currentRoom) {
      const mockMessages: Message[] = [
        {
          id: '1',
          text: 'Welcome to the chat! This is a demo of our multi-room chat application.',
          authorId: '2',
          authorName: 'Alice Johnson',
          authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3dd?w=150',
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: '2',
          text: 'Thanks for the warm welcome! The interface looks amazing.',
          authorId: '3',
          authorName: 'Bob Smith',
          authorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
          timestamp: new Date(Date.now() - 3000000),
        },
        {
          id: '3',
          text: 'I love the dark theme and smooth animations. Great work on the design!',
          authorId: '4',
          authorName: 'Carol Davis',
          authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          timestamp: new Date(Date.now() - 1800000),
        },
        {
          id: '4',
          text: 'The real-time features work perfectly. Can\'t wait to see the final version with Firebase!',
          authorId: '1',
          authorName: 'You',
          authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          timestamp: new Date(Date.now() - 900000),
          isOwn: true,
        },
        {
          id: '5',
          text: 'Hey everyone! How\'s it going?',
          authorId: '2',
          authorName: 'Alice Johnson',
          authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3dd?w=150',
          timestamp: new Date(Date.now() - 300000),
        }
      ];
      setMessages(mockMessages);
    }
  }, [currentRoom]);

  const sendMessage = (text: string) => {
    if (!currentRoom || !text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const editMessage = (messageId: string, newText: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, text: newText, edited: true, editedAt: new Date() }
        : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const setTyping = (isTyping: boolean) => {
    // Simulate typing indicator
    if (isTyping) {
      setTypingUsers([mockUsers[1]]);
      setTimeout(() => setTypingUsers([]), 3000);
    } else {
      setTypingUsers([]);
    }
  };

  const value: ChatContextType = {
    currentUser,
    rooms,
    currentRoom,
    messages,
    typingUsers,
    onlineUsers,
    setCurrentRoom,
    sendMessage,
    editMessage,
    deleteMessage,
    setTyping,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};