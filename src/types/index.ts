export interface IAnalysisResponse {
    response: string;
    usage: IUsage;
}

export interface IUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export interface IChatMessage {
    code: string;
    language: string;
    message?: string;
}