import type { IChatHistory, IChatMessage, IChatState } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useChatStore = create<IChatState>()(
    persist(
        (set) => ({
            messages: [],
            code: "",
            language: "JavaScript",
            fixedCode: "",
            sessionId: "",
            history: [],

            addLanguage: (language: string) =>
                set(() => ({
                    language,
                })),

            addMessage: (message: IChatMessage) =>
                set((state) => ({
                    messages: [
                        ...state.messages,
                        {
                            id: crypto.randomUUID(),
                            role: message.role,
                            content: message.content,
                            timestamp: new Date().toISOString(),
                        },
                    ],
                })),

            clearChat: () =>
                set(() => ({
                    messages: [],
                })),

            addCode: (code: string) => set({ code: code }),

            addFixedCode: (code: string) => set({ fixedCode: code }),

            addSessionId: (sessionId: string) => set({ sessionId: sessionId }),

            setSessionHistory: (sessionHistory: IChatHistory[]) =>
                set({ history: sessionHistory }),

            /** When a sidebar history item is clicked, restore UI state */
            loadHistoryItem: (entry: IChatHistory) =>
                set(() => {
                    const parsedResponse = JSON.parse(entry.response.response)
                    return {
                        code: entry.original,
                        fixedCode: parsedResponse.fixedCode,
                        language: entry.language,
                        userMessage: entry.userMessage,
                        aiResponse: parsedResponse.analysis,
                        notes: parsedResponse.notes,
                        sessionId: entry.sessionId,
                    }
                }),

            clearAllData: () =>
                set({
                    sessionId: "",
                    messages: [],
                    code: "",
                    fixedCode: "",
                    history: [],
                }),
        }),
        {
            name: "aegis-chat-store", // localStorage key
            storage: createJSONStorage(() => localStorage),

            // Only persist specific fields when they have values
            partialize: (state) => ({
                sessionId: state.sessionId || undefined, // Only persist if not empty
                messages: state.messages,
                language: state.language,
            }),
        }
    )
);
