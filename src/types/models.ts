export interface User {
  id: string;
  name: string;
  avatar: string;
  status?: string;
  lastSeen?: string;
}

export interface Message {
  id: string;
  text: string;
  time: string;
  isSent: boolean;
  senderId: string;
  senderName?: string;
  chatId: string;
}

export interface Group {
  id: string;
  name: string;
  avatar: string;
  participants: User[];
  adminId: string;
  createdAt: string;
  description?: string;
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isGroup?: boolean;
  groupInfo?: Group;
}

export interface Call {
  id: string;
  userId: string;
  type: 'incoming' | 'outgoing' | 'missed';
  callType: 'audio' | 'video';
  time: string;
  duration?: string;
}

export interface Status {
  id: string;
  userId: string;
  type: 'text' | 'image' | 'video';
  content: string;
  time: string;
  viewedBy: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
