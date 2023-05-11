"use client";

import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { ReactNode, createContext, useState } from "react";

interface MessagesContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  isMessageUpdating: boolean;
  setIsMessageUpdating: (isUpdating: boolean) => void;
};

export const MessagesContext = createContext<MessagesContextType> ({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      text: 'Hello, how can I help you?',
      isUserMessage: false
    }
  ]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter(message => message.id !== id));
  };

  const updateMessage = (
    id: string, 
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prev) => 
      prev.map((message) => {
        if (message.id !== id) {
          return { ...message, id: updateFn(message.text) };
        }

        return message;
      })
    );
  };

  return (
    <MessagesContext.Provider value={{
      messages,
      addMessage,
      removeMessage,
      updateMessage,
      isMessageUpdating,
      setIsMessageUpdating
    }}>
      {children}
    </MessagesContext.Provider>
  );
};