export interface IAnalysisResponse {
    response: IResponse;
    sessionId: string;
}

export interface IResponse {
    response: string;
    usage: IUsage;
}

export interface IUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export interface ICodeAnalysisRequest {
    code: string;
    language: string;
    message?: string;
}

export interface IChatMessage {
    id?: string;
    content: string;
    timestamp?: string;
    notes?: string;
    role: "user" | "assistant";
}

export interface IChatState {
    code: string;
    language?: string;
    sessionId?: string;
    fixedCode?: string;
    messages: IChatMessage[];
    clearChat: () => void;
    addCode: (code: string) => void;
    addFixedCode?: (code: string) => void;
    addLanguage: (language: string) => void;
    addSessionId?: (sessionId: string) => void;
    addMessage: (message: IChatMessage) => void;
    clearAllData?: () => void;
}
