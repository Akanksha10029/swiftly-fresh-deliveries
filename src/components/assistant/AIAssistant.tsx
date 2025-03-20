
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting
      setMessages([
        {
          id: 'greeting',
          text: "Hi there! I'm your shopping assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      fetchChatHistory();
    }
  }, [isAuthenticated, isOpen]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const fetchChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true })
        .limit(50);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        const formattedMessages: Message[] = data.map((msg) => ({
          id: msg.id,
          text: msg.message,
          isUser: !msg.is_ai,
          timestamp: new Date(msg.created_at),
        }));
        
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    try {
      // Save message to database if authenticated
      if (isAuthenticated) {
        await supabase.from('chat_history').insert([
          {
            user_id: user?.id,
            message: userMessage.text,
            is_ai: false,
          },
        ]);
      }
      
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { message: input, user_id: user?.id },
      });
      
      if (error) throw error;
      
      // Add AI response to messages
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      // Save AI response to database if authenticated
      if (isAuthenticated) {
        await supabase.from('chat_history').insert([
          {
            user_id: user?.id,
            message: aiMessage.text,
            is_ai: true,
          },
        ]);
      }
    } catch (error) {
      console.error('Error with AI assistant:', error);
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "I'm sorry, I couldn't process your request. Please try again later.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md h-[80vh] max-h-[600px] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 bg-primary/10">
              <AvatarImage src="/assistant-avatar.png" alt="AI Assistant" />
              <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">Shopping Assistant</h3>
              <p className="text-xs text-gray-500">Online and ready to help</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={isProcessing}
              className="flex-1"
            />
            <Button size="icon" disabled={isProcessing} onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {isProcessing && (
            <p className="text-xs text-gray-500 mt-2">Assistant is typing...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
