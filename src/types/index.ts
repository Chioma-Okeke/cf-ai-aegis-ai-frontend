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
    role: "user" | "assistant";
}

export interface IChatState {
    messages: IChatMessage[];
    addMessage: (message: IChatMessage) => void;
    clearChat: () => void;
    addCode: (code: string) => void;
    code: string;
    language?: string;
    addLanguage: (language: string) => void;
}
