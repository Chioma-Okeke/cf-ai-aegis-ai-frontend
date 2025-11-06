import type { IAnalysisResponse, ICodeAnalysisRequest } from "@/types";
import { BaseService } from "./base-service";

class ChatService extends BaseService {
    constructor() {
        super("/chat");
    }

    public async analyzeCode(data: ICodeAnalysisRequest, sessionId: string) {
        const res = await this.post<IAnalysisResponse, ICodeAnalysisRequest>(
            `/analyze?session=${sessionId}`,
            data
        );
        return res;
    }

    public async getChatHistory() {
        const res = await this.get<IAnalysisResponse[]>("/history");
        return res;
    }
}

export default ChatService;
