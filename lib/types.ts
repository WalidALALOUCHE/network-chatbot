export interface User {
  _id?: string;
  email: string;
  name: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Message {
  _id?: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  userId: string;
  conversationId: string;
}

export interface Conversation {
  _id?: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  preview: string;
  messageCount: number;
} 