import type { IAnalysisResponse, IChatMessage } from "@/types";
import { BaseService } from "./base-service";

class ChatService extends BaseService {
    constructor() {
        super("/chat");
    }

    public async analyzeCode(data: IChatMessage) {
        const res = await this.post<IAnalysisResponse, IChatMessage>(
            "/analyze",
            data
        );
        return res.response;
    }

    public async getChatHistory() {
        const res = await this.get<IAnalysisResponse[]>("/history");
        return res;
    }
}

export default ChatService;
