import type { IChatMessage, IChatState } from '@/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useChatStore = create<IChatState>()(
    persist(
        (set) => ({
            messages: [],
            code: '',
            language: 'JavaScript',
            fixedCode: "",
            sessionId: "",

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

            addCode: (code: string) => set({ code: code }),

            addFixedCode: (code: string) => set({ fixedCode: code }),

            addSessionId: (sessionId: string) => set({ sessionId: sessionId }),

            
            clearAllData: () => set({ 
                sessionId: "",
                messages: [],
                code: '',
                fixedCode: "",
            }),
        }),
        {
            name: 'aegis-chat-store', // localStorage key
            storage: createJSONStorage(() => localStorage),
            
            // Only persist specific fields when they have values
            partialize: (state) => ({
                sessionId: state.sessionId || undefined, // Only persist if not empty
                messages: state.messages, 
                language: state.language,
            }),
        }
    )
)