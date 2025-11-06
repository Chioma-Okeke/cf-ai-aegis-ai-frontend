import type { IChatMessage, IChatState } from '@/types'
import { create } from 'zustand'

export const useChatStore = create<IChatState>((set) => ({
    messages: [],

    code: '',

    language: 'JavaScript',

    addLanguage: (language: string) => set(() => ({
        language
    })),

    addMessage: (message: IChatMessage) => set((state) => ({
        messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          role: message.role,
          content: message.content,
          timestamp: new Date().toISOString()
        },
      ]
    })),

    clearChat: () => set(() => ({
        messages: []
    })),

    addCode: (code: string) => set({code: code})
}))